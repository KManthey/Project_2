// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svgWidth = 960;
var svgHeight = 800;
    
    var margin = {
      top: 20,
      right: 40,
      bottom: 100,
      left: 100
    };
    
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
    

    var svg = d3.select("#bubble")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.json("/api/v1.0/nutrition").then(function(nData, err) {
  if (err) throw err;
  console.log(document.getElementById("bubble"))
  // set the initial parameters for X axis
  var chosenXAxis = "mcdonalds";
  var nutritionData = nData.nutrition
  var restaurants = nData.restaurants
  nutritionData = nutritionData.filter(nutrition=>nutrition.restaurant === chosenXAxis)
  // console.log(nutritionData)
  // console.log(nutrition)
  // console.log(restaurants)
// Parse Data/Cast as numbers
      nutritionData.forEach(function(nutrition) {
        // if (nutrition.restaurant === "chosenXAxis") {
            nutrition.nutritional_values.calories = +nutrition.nutritional_values.calories;
      // console.log(nutrition.nutritional_values.calories)
      nutrition.nutritional_values.carbohydrates_g = +nutrition.nutritional_values.carbohydrates_g;
      // console.log(nutrition.nutritional_values.carbohydrates_g)
      nutrition.nutritional_values.protein_g = +nutrition.nutritional_values.protein_g;
      // console.log(nutrition.nutritional_values.protein_g)
      nutrition.item_name = nutrition.item_name;
      // console.log(nutrition.item_name)
      nutrition.item_id = +nutrition.item_id
      // console.log(nutrition.item_id)
      });
      

// provide axis label click functionality to update x-scale
function xScale(nutritionData, chosenXAxis) {
  // console.log(chosenXAxis)
  // console.log(nutritionData)
  // create scales
  var xLinearScale = d3.scaleLinear()
          .domain([d3.min(nutritionData, d => d.item_id) * 0.8,
          d3.max(nutritionData, d => d.item_id) * 1.2])
          .range([0, width]);
          // console.log(xLinearScale)
  return xLinearScale;
}
  
// function used for updating xAxis var upon click on axis label
function renderxAxes(newXScale, xAxis) {
  console.log(newXScale)
  // console.log(xAxis)
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

//set the initial paramaters for Y axis
var chosenYAxis = "calories";

// provide axis label click functionality to update x-scale
function yScale(nutritionData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
          .domain([d3.min(nutritionData, d => d.nutritional_values[chosenYAxis]) * 0.8,
          d3.max(nutritionData, d => d.nutritional_values[chosenYAxis]) * 1.2])
          .range([height, 0]);
  return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderyAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to new circles
function renderCircles(newData, circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  circlesGroup = chartGroup.selectAll("circle").remove()
  circlesGroup = chartGroup.selectAll("circle")
  .data(newData)
  .enter()
  .append("circle")
  .classed("itemCircle", true)
.attr("cx", d => newXScale(d.item_id))
.attr("cy", d => {
console.log(d.nutritional_values[chosenYAxis])

return newYScale(d.nutritional_values[chosenYAxis])})
  .attr("r", "10")
  // .append("text")
  .attr("opacity", ".5")

    return circlesGroup;
}  

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  var xlabel;
  if (chosenXAxis === "mcdonalds") {
    xlabel = "McDonalds Nutritional Data"
    }
  else if (chosenXAxis === "starbucks") {
    xlabel = "Starbucks Nutritional Data"
  }
  else{
    xlabel = "Subway Nutritional Data"
  };

  var ylabel;
  if (chosenYAxis === "calories") {
    ylabel = "Calories"
  }
  else if (chosenYAxis === "carbohydrates_g") {
      ylabel = "Carbohydrates (g)";
  }
  else{
    ylabel = "Protein (g)"
  }; 
  console.log(xlabel)

   // Initialize tool tip
        var toolTip = d3.tip()
          .attr("class", "d3-tip")
          .offset([80, -60])
          //distance from the circle
          .html(function(d) {
          return (`${d.item_name}<br>${chosenYAxis}: ${d.nutritional_values[chosenYAxis]}`);
            });
    circlesGroup.call(toolTip);
    // console.log("after line 143")
    circlesGroup.on("mouseover", function(data) {
      // console.log(data)
      toolTip.show(data, this);
    })
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
  return circlesGroup;
}
      // call the chart building functions when page loads
        var xLinearScale = xScale(nutritionData, chosenXAxis);
      
        // Create y scale functions
        var yLinearScale = d3.scaleLinear()

          .domain([0, d3.max(nutritionData, d => d.nutritional_values[chosenYAxis])])
          .range([height, 0]);

        // Initial axis function
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Append x axis
        var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      // Append y axis
      var yAxis = 
      chartGroup.append("g")
      .call(leftAxis);  

       
      // Create group for x-axis labels
      var xlabelsGroup = chartGroup.append("g")  
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
      
      // first x axis - poverty
      // note x and y are directional attributes vs actual axis that is why set padding on y instead of x
      var mcdonaldsLabel = xlabelsGroup.append("text")
          .attr("x", 0)
          .attr("y", 20)
          .attr("value", "mcdonalds")
          .classed("active", true)
          .text("McDonalds Nutritional Data");

      //second x axis - age
      var starbucksLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "starbucks")
        .classed("inactive", true)
        .text("Starbucks Nutritional Data");

      // third x axis of Household Income (Median) "income"  
      var subwayLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "subway")
        .classed("inactive", true)
        .text("Subway Nutritional Data");

      // Create group for y-axis labels
      var ylabelsGroup = chartGroup.append("g")  
      // .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // first y axis
    var caloriesLabel = ylabelsGroup.append("text")
      .attr("transform", "rotate(-90)")  
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("value", "calories")
      .attr("dy", "1em")
      .classed("active", true)
      .text("Calories");

    //second y axis
    var carbohydratesLabel = ylabelsGroup.append("text")
      .attr("transform", "rotate(-90)")  
      .attr("y", 20 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("value", "carbohydrates_g")
      .attr("dy", "1em")
      .classed("inactive", true)
      .text("Carbohydrates (g)");

     // Append initial circles 
    // third y axis  
    var proteinLabel = ylabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 40 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("value", "protein_g")
      .attr("dy", "1em")
      .classed("inactive", true)
      .text("Protein (g)");

       
      let circlesGroup = chartGroup.selectAll("circle")
        .data(nutritionData)
        .enter()
        .append("circle")
        .classed("itemCircle", true)
        .attr("cx", d => xLinearScale(d.item_id))
        .attr("cy", d => {
          console.log(d.nutritional_values[chosenYAxis])
          return yLinearScale(d.nutritional_values[chosenYAxis])})
        .attr("r", "10")
        // .append("text")
        .attr("opacity", ".5")
        // .style("font-size", "15px")
        // .style("text-anchor", "middle")
        // .style("fill", "white")
        // .text(d=>(d.abbr));
        //added this for the state abbreviation text within the circle - this works in L1, but breaks everything in L2 - move to different location
        let itemLabels = chartGroup.selectAll(".itemText")
        .data(nutritionData)
        .enter()
        .append("text")
        .classed("itemText", true)
        .attr("x", d=> xLinearScale(d.item_id))
        .attr("y", (d, i)=> yLinearScale(d.nutritional_values[chosenYAxis]))
        .style("font-size", "15px")
        .style("text-anchor", "middle")
        .style("fill", "white")
        // .text(d=>(d.abbr));  
      
      function renderAbbr (itemLabels, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis) {
        itemLabels.transition().duration(1000)
        .attr("x", d=> xLinearScale(d.item_id))
        .attr("y", (d, i)=> yLinearScale(d.nutritional_values[chosenYAxis]))
        return itemLabels;
      }

       // updateToolTip function above csv import
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    
  // x axis labels event lisener
  xlabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;
        nutritionData = nData.nutrition
        nutritionData = nutritionData.filter(nutrition=>nutrition.restaurant === chosenXAxis)
        
        
        // console.log(chosenXAxis)
        // console.log(nutritionData)
        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(nutritionData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderxAxes(xLinearScale, xAxis);
        
               
        // console.log(xAxis)
        // updates circles with new x values
        circlesGroup = renderCircles(nutritionData, circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // update state labels
        itemLabels = renderAbbr (itemLabels, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

        // changes classes to change bold text
        if (chosenXAxis === "starbucks") {
          starbucksLabel
            .classed("active", true)
            .classed("inactive", false);
          mcdonaldsLabel
            .classed("active", false)
            .classed("inactive", true);
          subwayLabel
            .classed("active", false)
            .classed("inactive", true);  
        }
        else if (chosenXAxis === "mcdonalds") {
          starbucksLabel
          .classed("active", false)
          .classed("inactive", true);
        mcdonaldsLabel
          .classed("active", true)
          .classed("inactive", false);
        subwayLabel
            .classed("active", false)
            .classed("inactive", true);  
        }
        else {
          starbucksLabel
            .classed("active", false)
            .classed("inactive", true);
          mcdonaldsLabel
            .classed("active", false)
            .classed("inactive", true);
          subwayLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

  // y axis labels event listener
  ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;
        
    
        console.log(chosenYAxis)

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(nutritionData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderyAxes(yLinearScale, yAxis);

        // updates circles with new y values
        circlesGroup = renderCircles(nutritionData, circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // update state labels
        // itemLabels = renderAbbr (itemLabels, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);

        // Active axis in bold text - made changes to these 
        if (chosenYAxis === "calories") {
          caloriesLabel
          .classed("active", true)
          .classed("inactive", false);
        carbohydratesLabel
          .classed("active", false)
          .classed("inactive", true);
        proteinLabel
            .classed("active", false)
            .classed("inactive", true);
        }  
        else if (chosenYAxis === "carbohydrates_g") {
          caloriesLabel
            .classed("active", false)
            .classed("inactive", true);
            carbohydratesLabel
            .classed("active", true)
            .classed("inactive", false);
            proteinLabel
            .classed("active", false)
            .classed("inactive", true);
      }
        else {
          caloriesLabel
            .classed("active", false)
            .classed("inactive", true);
            carbohydratesLabel
            .classed("active", false)
            .classed("inactive", true);
            proteinLabel
            .classed("active", true)
            .classed("inactive", false);
    }
  }
  });  

}).catch(function(error) {
  console.log(error);
});
 