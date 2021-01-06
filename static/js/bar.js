// js

d3.json("/api/v1.0/nutrition").then(function(data) {
    // console.log(data)
    var calories = []
    var names = []
    for (var i= 0; i < 10; i++) {
      // console.log(data.nutrition[i])
      //using global arrays for push
      let currentCalories = data.nutrition[i].nutritional_values.calories
      let currentNames = data.nutrition[i].item_name
      calories.push(currentCalories)
      names.push(currentNames)
    }
    // console.log(calories)
    // console.log(names)

   var trace1 = {
   x: names,
   y: calories,
   type: "bar"
   };

   var data = [trace1];

   var layout = {
   title: "Test"
   };

   Plotly.newPlot("BarChart", data, layout);
 
 });

//run app.py then click on link to populate chart in html template
//console.log(data) returns all nutrition data, nutritional_values, which includes calories, carbohydrates_g, and sugars_g
// console.log(calories) returns 10 calorie values to plot
//console.log(names) returns the 10 names of the items to plot