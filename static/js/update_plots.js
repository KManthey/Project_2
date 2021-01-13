// Javascript Project 2: Fast-food Nutrition Plots//

// Note: McDonald's has no veggie sandwiches, bread/toppings, or other foods
// Note: Subway has no snacks/sides, beverages, or other foods
// Note: Starbucks has no snacks/sides

///////////////// FUNCTION LEFT GAUGE CHART (A) /////////////////////

function buildGaugeA() {
  d3.json("/api/v1.0/nutrition").then(function(data) {
    var gaugeTag = d3.select("#radialChartA");
    gaugeTag.html("");

  var names = data.names;
    
  // Find the index for the input item
  itemIndexA = names.indexOf(value1);
  console.log(itemIndexA);

  // Find the item in the Nutrition object
  itemNutritionInformation = data.nutrition[itemIndexA];

  // Store the name of the item and the restaurant name to use it on the chart
  itemName = itemNutritionInformation["item_name"];
  restaurantName = itemNutritionInformation["restaurant"];

  // Select the % daily values
  dailyValuesObject = itemNutritionInformation["% daily values"];
  console.log(dailyValuesObject);

  // Create an array with the value names
  var valueNames = ["Calcium", "Iron", "Sodium", "Vitamin A", "Vitamin C"];

  // Create an array with the % daily values
  var calcium = dailyValuesObject["calcium_%_dv"];
  var iron = dailyValuesObject["iron_%_dv"];
  var sodium = dailyValuesObject["sodium_%_dv"];
  var vitaminA = dailyValuesObject["vitamin_a_%_dv"];
  var vitaminC = dailyValuesObject["vitamin_c_%_dv"];
   
  var values = [calcium, iron, sodium, vitaminA, vitaminC, 100];
  
  // Gauge //
  var data = [23, 34, 67, 93, 56, 100];
  var dataSet = anychart.data.set(values);
  var palette = anychart.palettes
    .distinctColors()
    .items([
      '#64b5f6',
      '#F5EA05',
      'deeppink',
      '#8912E1',
      '#9266DE',
  ]);

  function dinamicText(i) {
    if (values[i] == "nan") {
      return valueNames[i] + ', <span style="">NA</span>'
    } else {
      return valueNames[i] + ', <span style="">' + values[i] + '%</span>'
    }
 };
    var makeBarWithBar = function (gauge, radius, i, width) {
      var stroke = null;
      gauge
        .label(i)
        .text(dinamicText(i))
        .useHtml(true);
      gauge
        .label(i)
        .hAlign('center')
        .vAlign('middle')
        .anchor('right-center')
        .padding(0, 10)
        .height(width / 2 + '%')
        .offsetY(radius + '%')
        .offsetX(0);
    
      gauge
        .bar(i)
        .dataIndex(i)
        .radius(radius)
        .width(width)
        .fill(palette.itemAt(i))
        .stroke(null)
        .zIndex(5);
      gauge
        .bar(i + 100)
        .dataIndex(5)
        .radius(radius)
        .width(width)
        .fill('#F5F4F4')
        .stroke(stroke)
        .zIndex(4);
    
      return gauge.bar(i);
    };
    
    anychart.onDocumentReady(function () {
      var gauge = anychart.gauges.circular();
      gauge.data(dataSet);
      gauge
        .fill('#fff')
        .stroke(null)
        .padding(0)
        .margin(100)
        .startAngle(0)
        .sweepAngle(270);
    
      var axis = gauge.axis().radius(100).width(1).fill(null);
      axis
        .scale()
        .minimum(0)
        .maximum(100)
        .ticks({ interval: 1 })
        .minorTicks({ interval: 1 });
      axis.labels().enabled(false);
      axis.ticks().enabled(false);
      axis.minorTicks().enabled(false);
      makeBarWithBar(gauge, 100, 0, 17);
      makeBarWithBar(gauge, 80, 1, 17);
      makeBarWithBar(gauge, 60, 2, 17);
      makeBarWithBar(gauge, 40, 3, 17);
      makeBarWithBar(gauge, 20, 4, 17);
    
      gauge.margin(50);
      gauge
        .title()
        .text(
          'Micronutrient values on' + ' ' +capitalizeFirstLetter(itemName) +
          '<br/> <span style="color:#929292; font-size: 5px;"></span>'  + 'from ' +
          (capitalizeFirstLetter(restaurantName))
        )
        .useHtml(true);
      gauge
        .title()
        .enabled(true)
        .hAlign('center')
        .padding(0)
        .margin([0, 0, 20, 0]);

      var tooltip = gauge.tooltip();
      tooltip.enabled(false);
      gauge.container('radialChartA');
      gauge.draw();
      });
    });
  };

///////////////// FUNCTION BUILD RIGHT GUAGE CHART (B) ///////////////////////

function buildGaugeB()  {

d3.json("/api/v1.0/nutrition").then(function(data) {
  var gaugeTag = d3.select("#radialChartB");
  gaugeTag.html("");

  var names = data.names;
  
  // Find the index for the input item
  itemIndexB = names.indexOf(value2);

  // Find the item in the Nutrition object
  itemNutritionInformation = data.nutrition[itemIndexB];

  // Store the name of the item and the restaurant name to use it on the chart
  itemName = itemNutritionInformation["item_name"];
  restaurantName = itemNutritionInformation["restaurant"];

  // Select the % daily values
  dailyValuesObject = itemNutritionInformation["% daily values"];
  console.log(dailyValuesObject);

  // Create an array with the value names
  var valueNames = ["Calcium", "Iron", "Sodium", "Vitamin A", "Vitamin C"];

  // Create an array with the % daily values

  var calcium = dailyValuesObject["calcium_%_dv"];
  var iron = dailyValuesObject["iron_%_dv"];
  var sodium = dailyValuesObject["sodium_%_dv"];
  var vitaminA = dailyValuesObject["vitamin_a_%_dv"];
  var vitaminC = dailyValuesObject["vitamin_c_%_dv"];
 
  var values = [calcium, iron, sodium, vitaminA, vitaminC, 100];
  console.log(values);
  
  // Gauge //

  var data = [23, 34, 67, 93, 56, 100];
  var dataSet = anychart.data.set(values);
  var palette = anychart.palettes
    .distinctColors()
    .items([
      '#64b5f6',
      '#F5EA05',
      'deeppink',
      '#8912E1',
      '#9266DE',
    ]);

    function dinamicText(i) {
      if (values[i] == "nan") {
        return valueNames[i] + ', <span style="">NA</span>'
      } else {
        return valueNames[i] + ', <span style="">' + values[i] + '%</span>'
      }
   };

  var makeBarWithBar = function (gauge, radius, i, width) {
    var stroke = null;
    gauge
      .label(i)
      .text(dinamicText(i))
      .useHtml(true);
    gauge
      .label(i)
      .hAlign('center')
      .vAlign('middle')
      .anchor('right-center')
      .padding(0, 10)
      .height(width / 2 + '%')
      .offsetY(radius + '%')
      .offsetX(0);
  
    gauge
      .bar(i)
      .dataIndex(i)
      .radius(radius)
      .width(width)
      .fill(palette.itemAt(i))
      .stroke(null)
      .zIndex(5);
    gauge
      .bar(i + 100)
      .dataIndex(5)
      .radius(radius)
      .width(width)
      .fill('#F5F4F4')
      .stroke(stroke)
      .zIndex(4);
  
    return gauge.bar(i);
  };
  
  anychart.onDocumentReady(function () {
    var gauge = anychart.gauges.circular();
    gauge.data(dataSet);
    gauge
      .fill('#fff')
      .stroke(null)
      .padding(0)
      .margin(100)
      .startAngle(0)
      .sweepAngle(270);
  
    var axis = gauge.axis().radius(100).width(1).fill(null);
    axis
      .scale()
      .minimum(0)
      .maximum(100)
      .ticks({ interval: 1 })
      .minorTicks({ interval: 1 });
    axis.labels().enabled(false);
    axis.ticks().enabled(false);
    axis.minorTicks().enabled(false);
    makeBarWithBar(gauge, 100, 0, 17);
    makeBarWithBar(gauge, 80, 1, 17);
    makeBarWithBar(gauge, 60, 2, 17);
    makeBarWithBar(gauge, 40, 3, 17);
    makeBarWithBar(gauge, 20, 4, 17);
  
    gauge.margin(50);
    gauge
      .title()
      .text(
        'Micronutrient values on' + ' ' +capitalizeFirstLetter(itemName) +
        '<br/> <span style="color:#929292; font-size: 5px;"></span>'  + 'from ' +
        (capitalizeFirstLetter(restaurantName))
      )
      .useHtml(true);
    gauge
      .title()
      .enabled(true)
      .hAlign('center')
      .padding(0)
      .margin([0, 0, 20, 0]);

    var tooltip = gauge.tooltip();
    tooltip.enabled(false)
    gauge.container('radialChartB');
    gauge.draw();
  });
});
};

/////////////// FUNCTION BUILD STACKED BAR CHART ///////////////////

function buildBar() {

d3.json("/api/v1.0/nutrition").then(function(data) {
  var barTag = d3.select("#container");
  barTag.html("");

  var names = data.names;
    
  // Find the index for input for both items
  itemIndexA = names.indexOf(value1);
  itemIndexB = names.indexOf(value2);

  // Find the items in the Nutrition object
  itemNutritionInfoA = data.nutrition[itemIndexA];
  itemNutritionInfoB = data.nutrition[itemIndexB];

  // Select the macronutrient values for both items
  nutritionalValuesA = itemNutritionInfoA["nutritional_values"];
  nutritionalValuesB = itemNutritionInfoB["nutritional_values"];

  // Create an array for each item's macronutrient values
  var carbohydratesA = nutritionalValuesA["carbohydrates_g"];
  var carbohydratesB = nutritionalValuesB["carbohydrates_g"];
  var fiberA = nutritionalValuesA["dietary_fiber_g"];
  var fiberB = nutritionalValuesB["dietary_fiber_g"];
  var proteinA = nutritionalValuesA["protein_g"];
  var proteinB = nutritionalValuesB["protein_g"];
  var saturatedFatA = nutritionalValuesA["saturated_fat_g"];
  var saturatedFatB = nutritionalValuesB["saturated_fat_g"];
  var sugarA = nutritionalValuesA["sugars_g"];
  var sugarB = nutritionalValuesB["sugars_g"];
  var fatA = nutritionalValuesA["total_fat_g"];
  var fatB = nutritionalValuesB["total_fat_g"];
   
  // Create an array for each macronutrient (containing both item's values)
  var carbArray = ['Carbohydrates', -carbohydratesA, carbohydratesB];
  var fiberArray = ['Fiber', -fiberA, fiberB];
  var proteinArray = ['Protein', -proteinA, proteinB];
  var satFatArray = ['Saturated Fat', -saturatedFatA, saturatedFatB];
  var sugarArray = ['Sugar', -sugarA, sugarB];
  var fatArray = ['Fat', -fatA, fatB];

  // Create new array for carb values for making y-axis responsive
  var values = [carbohydratesA, carbohydratesB]
  var max_carb = Math.max(...values) + 10

  // Put each array into one list
  var dataArray = [carbArray, fiberArray, proteinArray, satFatArray, sugarArray, fatArray];

  // Define data with anychart
  var dataSet = anychart.data.set(dataArray);

  // Map data for the first series, take x from the zero column and value from the first column of data set
  var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

  // Map data for the second series, take x from the zero column and value from the second column of data set
  var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

  // Create bar chart
  var chart = anychart.bar();

  // Turn on chart animation
  chart.animation(true);

  // Set padding
  chart.padding([10, 20, 5, 20]);

  // Force chart to stack values by Y scale.
  chart.yScale().stackMode('value');
  chart.yScale().minimum(max_carb * -1);
  chart.yScale().maximum(max_carb);

  // Format y axis labels so they are always positive
  chart
    .yAxis()
    .labels()
    .format(function () {
      return Math.abs(this.value).toLocaleString();
    });

  // Set title for Y-axis
  chart.yAxis(0).title('Nutritional Value in Grams');

  // Allow labels to overlap
  chart.xAxis(0).overlapMode('allow-overlap');

  // Turn on extra axis for the symmetry
  chart
    .xAxis(1)
    .enabled(true)
    .orientation('right')
    .overlapMode('allow-overlap');

  // Set chart title text
  chart.title('Macronutrients: Comparison Chart');

  chart.interactivity().hoverMode('by-x');

  chart
    .tooltip()
    .title(false)
    .separator(false)
    .displayMode('separated')
    .positionMode('point')
    .useHtml(true)
    .fontSize(12)
    .offsetX(5)
    .offsetY(0)
    .format(function () {
      return (
        Math.abs(this.value).toLocaleString()
      );
    });

   // tooltip settings
   var tooltip = chart.tooltip();
   tooltip.format(function(e){
     var value = (this.value)**2
     value = Math.sqrt(value)
     return "Value: " + value + " g"  
   });
   tooltip.positionMode("point");
   

  // Temp variable to store series instance
  var series;

  // Create first series with mapped data
  series = chart.bar(firstSeriesData);
  series.name(capitalizeFirstLetter(value1)).color('HotPink');
  series.tooltip().position('left').anchor('right-center');

  // Create second series with mapped data
  series = chart.bar(secondSeriesData);
  series.name(capitalizeFirstLetter(value2));
  series.tooltip().position('right').anchor('left-center');

  // Turn on legend
  chart
    .legend()
    .enabled(true)
    .inverted(false)
    .fontSize(13)
    .padding([0, 0, 20, 0]);

  // Set container id for the chart
  chart.container('container');

  // Initiate chart drawing
  chart.draw();
  });
};
////////////////////////// DROPDOWN MENUS & CHART UPDATES ////////////////////////// 

// Creating a loop counter
var loop = 0

// Dropdown Function - charts are built within the dropdown menu function
window.onload = function() {

  d3.json("/api/v1.0/restaurants").then(function(data) {
    var dropdownObject = data;

    //////////////////// LEFT DROPDOWN MENU ////////////////////

    var restaurantSel1 = document.getElementById("restaurant1");
    var categorySel1 = document.getElementById("category1");
    var itemSel1 = document.getElementById("item1");
    for (var x in dropdownObject) {
      restaurantSel1.options[restaurantSel1.options.length] = new Option(x, x);
      console.log(new Option(x,x));
    }
      
    restaurantSel1.onchange = function() {

    // Empty category and item dropdowns
    itemSel1.length = 1;
    categorySel1.length = 1;

    // Display correct values
    for (var y in dropdownObject[this.value]) {
      categorySel1.options[categorySel1.options.length] = new Option(y, y);
      }
    }

    categorySel1.onchange = function() {
    // Empty item dropdown

    itemSel1.length = 1;

    // Display correct values
    var z = dropdownObject[restaurantSel1.value][this.value];
    for (var i = 0; i < z.length; i++) {
      itemSel1.options[itemSel1.options.length] = new Option(z[i], z[i]);
      }
    }

    // Identify and store the final item selected
    itemSel1.onchange = function() {
      element1 = d3.select(this);
      value1 = (element1.property("value")).toLowerCase();
      console.log("value 1 - first dropdown");
      console.log(value1);
    
      /////// UPDATE LEFT GUAGE  //////
       buildGaugeA();
    
      // If on first loop, set the value2 to be the default value so that the graph does not break
       loop += 1;

       if (loop < 2) {
          value2 = "egg white delight";
       }
        buildBar();
  
    }
  //////////////////// RIGHT DROPDOWN MENU ////////////////////

  var restaurantSel2 = document.getElementById("restaurant2");
  var categorySel2 = document.getElementById("category2");
  var itemSel2 = document.getElementById("item2");
  for (var x in dropdownObject) {
    restaurantSel2.options[restaurantSel2.options.length] = new Option(x, x);
  }
  
  restaurantSel2.onchange = function() {

    // empty category and item dropdowns
    itemSel2.length = 1;
    categorySel2.length = 1;

    // display correct values
    for (var y in dropdownObject[this.value]) {
    categorySel2.options[categorySel2.options.length] = new Option(y, y);
    }
  }
  categorySel2.onchange = function() {

    // empty item dropdown
    itemSel2.length = 1;

    // display correct values
    var z = dropdownObject[restaurantSel2.value][this.value];
    for (var i = 0; i < z.length; i++) {
    itemSel2.options[itemSel2.options.length] = new Option(z[i], z[i]);
  }

    // Identify and store the final item selected
    itemSel2.onchange = function() {
      element2 = d3.select(this);
      value2 = (element2.property("value")).toLowerCase();
      console.log("value 2 - second dropdown");
      console.log(value2);

      /////// UPDATE RIGHT GUAGE & STACKED BAR CHARTS //////
      buildGaugeB();
      buildBar();
    }
  }
});
};