# Dependencies
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

engine = create_engine("sqlite:///database/fastfood_nutritional_info.sqlite", echo=False)

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
    ##return("hello")
    return render_template("index.html")

# Define the route to "/nutrition"
@app.route("/api/v1.0/nutrition")

def nutrition():

    # Create a dictionary to store the item_names_list
    item_names_dict = {}

    #Create the session (link) from Python to the DB
    session= Session(engine)

    # List all of the rows found in the Nutrion table and add the item, category
    # and restaurant name
    sel = [Nutrition, Menu_items.item_name, Categories.category_name, Restaurants.name]
    nutritional_info = session.query(*sel).filter(Nutrition.restaurant_id==Restaurants.id).\
    filter(Nutrition.category_id==Categories.id).\
    filter(Nutrition.item_id==Menu_items.id).all()
    
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

    # Append the menu_item_list to the item_names_dict 
    item_names_dict["nutrition"] = menu_item_list

    ####### Create a a list for the items name ######
    
    menu_items_name = session.query(Menu_items.item_name)

    # Create an array to store the information
    item_names_list = []

    # Loop throught the array to extract the names from the query
    for name in menu_items_name:
        for item in name:
            item_names_list.append(item)
    
    ####### Create a a list for the restaurants name ######
    
    restaurant_names = session.query(Restaurants.name)

    # Create an array to store the information
    restaurant_names_list = []

    # Loop throught the array to extract the names from the query
    for restaurant in restaurant_names:
        for name in restaurant:
            restaurant_names_list.append(name)

    ####### Create a a list for the categories name ######
    
    category_names = session.query(Categories.category_name)

    # Create an array to store the information
    category_names_list = []

    # Loop throught the array to extract the names from the query
    for category in category_names:
        for name in category:
            category_names_list.append(name)
    
    # Close the session
    session.close

    item_names_dict["names"] = item_names_list
    item_names_dict["restaurants"] = restaurant_names_list
    item_names_dict["categories"] = category_names_list

    
    return jsonify(item_names_dict)

# Define the route to "/restaurants"
@app.route("/api/v1.0/restaurants")

def restaurants(): 
    #Create the session (link) from Python to the DB
    session= Session(engine)

    sel = [Menu_items.item_name, Categories.category_name, Restaurants.name]
    nutritional_info = session.query(*sel).filter(Nutrition.restaurant_id==Restaurants.id).\
        filter(Nutrition.category_id==Categories.id).\
        filter(Nutrition.item_id==Menu_items.id).all()
    
    # Create dictionaries to store the information
    # Main restaurant dictionary
    restaurants = {}

    # Dictionaries for each restaurants
    mcdonalds_categories_dic = {}
    subway_categories_dic = {}
    starbucks_categories_dic = {}

    # Lists for Mcdonalds categories
    mc_desserts =[]
    mc_beverages = []
    mc_breakfast = []
    mc_poultry_fish_sandwich_wraps = []
    mc_salads = []
    mc_snacks_and_sides = [ ]
    mc_beef_and_pork_sandwich_wraps = []

   # Lists for Subway categories
    sb_desserts =[]
    sb_bread_toppings = []
    sb_breakfast = []
    sb_poultry_fish_sandwich_wraps = []
    sb_salads = []
    sb_beef_and_pork_sandwich_wraps = []
    sb_veggie_sandwich_wraps=[]

  # Lists for Starbucks categories
    stb_beverages = []
    stb_veggie_sandwich_wraps=[]
    stb_poultry_fish_sandwich_wraps = []
    stb_breakfast = []
    stb_salads = []
    stb_bread_toppings = []
    stb_desserts =[]
    stb_beef_and_pork_sandwich_wraps = []
    stb_other_food = []

    for item in nutritional_info:
        for restaurant in item:
           if item[2] == "mcdonalds":
               if item[1] == "desserts":
                   mc_desserts.append(item[0])
               elif item[1] == "beverages":
                   mc_beverages.append(item[0])
               elif item[1] == "breakfast":
                   mc_breakfast.append(item[0])
               elif item[1] == "poultry & fish sandwich/wraps":
                   mc_poultry_fish_sandwich_wraps.append(item[0])
               elif item[1] == "salads":
                   mc_salads.append(item[0])
               elif item[1] == "snacks & sides":
                   mc_snacks_and_sides.append(item[0])
               elif item[1] == "beef & pork sandwich/wraps":
                   mc_beef_and_pork_sandwich_wraps.append(item[0])
           elif item[2] == "subway":
                if item[1] == "desserts":
                    sb_desserts.append(item[0])
                elif item[1] == "bread & toppings":
                    sb_bread_toppings.append(item[0])
                elif item[1] == "breakfast":
                    sb_breakfast.append(item[0])
                elif item[1] == "poultry & fish sandwich/wraps":
                    sb_poultry_fish_sandwich_wraps.append(item[0])
                elif item[1] == "salads":
                    sb_salads.append(item[0])
                elif item[1] == "beef & pork sandwich/wraps":
                    sb_beef_and_pork_sandwich_wraps.append(item[0])
                elif item[1] == "veggie sandwich/wraps":
                    sb_veggie_sandwich_wraps.append(item[0])
           elif item[2] == "starbucks":
                if item[1] == "beverages":
                    stb_beverages.append(item[0])
                elif item[1] == "veggie sandwich/wraps":
                    stb_veggie_sandwich_wraps.append(item[0])
                elif item[1] == "poultry & fish sandwich/wraps":
                    stb_poultry_fish_sandwich_wraps.append(item[0])
                elif item[1] == "breakfast":
                    stb_breakfast.append(item[0])
                elif item[1] == "salads":
                    stb_salads.append(item[0])
                elif item[1] == "bread & toppings":
                    stb_bread_toppings.append(item[0])
                elif item[1] == "desserts":
                    stb_desserts.append(item[0])
                elif item[1] == "beef & pork sandwich/wraps":
                    stb_beef_and_pork_sandwich_wraps.append(item[0])
                elif item[1] == "other food":
                    stb_other_food.append(item[0])
    # Upper Case Function
    def upper_case_first_letter(str):
        return str.title()

    # List Formatting Function
    def list_formatting(lst):
        return (sorted(list(set(map(upper_case_first_letter, lst)))))

    # Add the list of categories to the McDonalds dictionary
    mcdonalds_categories_dic["Desserts"] = list_formatting(mc_desserts)
    mcdonalds_categories_dic["Beverages"] = list_formatting(mc_beverages)
    mcdonalds_categories_dic["Breakfast"] = list_formatting(mc_breakfast)
    mcdonalds_categories_dic["Poultry & Fish Sandwich/Wraps"] = list_formatting(mc_poultry_fish_sandwich_wraps)
    mcdonalds_categories_dic["Salads"] = list_formatting(mc_salads)
    mcdonalds_categories_dic["Beef and Pork Sandwich/Wraps"] = list_formatting(mc_beef_and_pork_sandwich_wraps)
    mcdonalds_categories_dic["Snacks & Sides"] = list_formatting(mc_snacks_and_sides)

    
    # Add the list of categories to the Subway dictionary
    subway_categories_dic["Desserts"] = list_formatting(sb_desserts)
    subway_categories_dic["Bread & Toppings"] = list_formatting(sb_bread_toppings)
    subway_categories_dic["Breakfast"] = list_formatting(sb_breakfast)
    subway_categories_dic["Poultry & Fish Sandwich/Wraps"] = list_formatting(sb_poultry_fish_sandwich_wraps)
    subway_categories_dic["Salads"] = list_formatting(sb_salads)
    subway_categories_dic["Beef and Pork Sandwich/Wraps"] = list_formatting(sb_beef_and_pork_sandwich_wraps)
    subway_categories_dic["Veggie & Sandwich/Wraps"] = list_formatting(sb_veggie_sandwich_wraps)

    # Add the list of categories to the Startbuck dictionary
    starbucks_categories_dic["Beverages"] = list_formatting(stb_beverages)
    starbucks_categories_dic["Veggie & Sandwich/Wraps"] = list_formatting(stb_veggie_sandwich_wraps)
    starbucks_categories_dic["Poultry & Fish Sandwich/Wraps"] = list_formatting(stb_poultry_fish_sandwich_wraps)
    starbucks_categories_dic["Breakfast"] = list_formatting(stb_breakfast)
    starbucks_categories_dic["Salads"] = list_formatting(stb_salads)
    starbucks_categories_dic["Bread & Toppings"] = list_formatting(stb_bread_toppings)
    starbucks_categories_dic["Desserts"] = list_formatting(stb_desserts)
    starbucks_categories_dic["Beef and Pork Sandwich/Wraps"] = list_formatting(stb_beef_and_pork_sandwich_wraps)
    starbucks_categories_dic["Other_Food"] = list_formatting(stb_other_food)


    # Add the dictionaries to the main Restaurants ditionary
    restaurants["McDonalds"] = mcdonalds_categories_dic
    restaurants["Subway"] = subway_categories_dic
    restaurants["Starbucks"] = starbucks_categories_dic

    session.close

    return jsonify(restaurants)


if __name__ == '__main__':
    app.run(debug=True)