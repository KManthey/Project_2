# Dependencies

import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask import Flask, render_template, redirect

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/fastfood_nutritional_info.sqlite", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys())

# Save reference to the tables
Categories = Base.classes.categories
Menu_items = Base.classes.menu_items
Nutrition = Base.classes.nutrition
Restaurants = Base.classes.restaurants

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")

def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/api/v1.0/nutrition")

# Define the route to "/nutrition"

def nutrition():

    #Create the session (link) from Python to the DB
    session= Session(engine)

    # List all of the rows found in the Nutrion table and add the item, category
    # and restaurant name
    sel = [Nutrition, Menu_items.item_name, Categories.category_name, Restaurants.name]
    nutritional_info = session.query(*sel).filter(Nutrition.restaurant_id==Restaurants.id).\
    filter(Nutrition.category_id==Categories.id).\
    filter(Nutrition.item_id==Menu_items.id).all()
    
    # Close the session
    session.close

    # Create an array to store the information
    menu_item_list = []

    # Loop throught the array to extract the item deatails
    for item in nutritional_info:
     value = item[0]
     # Create a dictionary to store the item information
     item_dict = {}
     item_dict["item_id"] = value.item_id
     item_dict["restaurant_id"] = value.restaurant_id
     item_dict["category_id"] = value.category_id
     item_dict["item_name"] = item[1]
     item_dict["category"] = item[2]
     item_dict["restaurant"] = item[3]
     
     # Create a nested dictionary to store the nutritional values
     item_dict["nutritional_values"] = {}
     item_dict["nutritional_values"]["calories"] = value.calories
     item_dict["nutritional_values"]["calories_from_fat"] = value.calories_from_fat
     item_dict["nutritional_values"]["total_fat_g"] = value.total_fat_g
     item_dict["nutritional_values"]["saturated_fat_g"] = value.saturated_fat_g
     item_dict["nutritional_values"]["trans_fat_g"] = value.trans_fat_g
     item_dict["nutritional_values"]["cholesterol_mg"] = value.cholesterol_mg   
     item_dict["nutritional_values"]["sodium_mg"] = value.sodium_mg
     item_dict["nutritional_values"]["carbohydrates_g"] = value.carbohydrates_g
     item_dict["nutritional_values"]["dietary_fiber_g"] = value.dietary_fiber_g
     item_dict["nutritional_values"]["sugars_g"] = value.sugars_g
     item_dict["nutritional_values"]["protein_g"] = value.protein_g
    
     # Create a nested dictionary to store the % daily values
     item_dict["% daily values"] = {}
     item_dict["% daily values"]["total_fat_%_dv"] = value.total_fat_per_dv
     item_dict["% daily values"]["saturated_fat_%_dv"] = value.saturated_fat_per_dv
     item_dict["% daily values"]["cholesterol_%_daily_value"] = value.cholesterol_per_dv
     item_dict["% daily values"]["sodium_%_dv"] = value.sodium_per_dv
     item_dict["% daily values"]["carbohydrates_%_dv"] = value.carbohydrates_per_dv
     item_dict["% daily values"]["dietary_fiber_%_dv"] = value.dietary_fiber_per_dv
     item_dict["% daily values"]["vitamin_a_%_dv"] = value.vitamin_a_per_dv
     item_dict["% daily values"]["vitamin_c_%_dv"] = value.vitamin_c_per_dv
     item_dict["% daily values"]["calcium_%_dv"] = value.calcium_per_dv
     item_dict["% daily values"]["iron_%_dv"] = value.iron_per_dv
    
     # Append the dictionaries to the menu_item_list 
     menu_item_list.append(item_dict)
    
    return jsonify(menu_item_list)
    

if __name__ == '__main__':
    app.run(debug=True)