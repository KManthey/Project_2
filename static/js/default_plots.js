// Javascript Project 2: Fast-food Nutrition Plots//

// Note: McDonald's has no veggie sandwiches, bread/toppings, or other foods
// Note: Subway has no snacks/sides, beverages, or other foods
// Note: Starbucks has no snacks/sides

// ///// CAPITALIZE FIRST LETTER FUNCTION /////

function capitalizeFirstLetter(str) {
  if (str == 'mcdonalds') {
    return "McDonald's"
  } else {
     var splitStr = str.split(' ');
     for (var i = 0; i < splitStr.length; i++) {
     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
     }
    return splitStr.join(' ')
   }
  };

///// LOWERCASE FIRST LETTER FUNCTION /////

function lowerCaseFirstLetter(str) {
  if (str == "McDonald's") {
    return "mcdonalds"
  } else {
     var splitStr = str.split(' ');
     for (var i = 0; i < splitStr.length; i++) {
     splitStr[i] = splitStr[i].charAt(0).toLowerCase() + splitStr[i].substring(1);
     }
    return splitStr.join(' ')
   }
  };

///////////////////// DEFAULT LEFT GAUGE CHART (A) ////////////////////

d3.json("/api/v1.0/nutrition").then(function(data) {
      
  defaultInputA = "egg mcmuffin";
      
  var names = data.names;
        
  // Find the index for the input item
  itemIndexA = names.indexOf(defaultInputA);
    
  // Find the item in the Nutrition object
  itemNutritionInformation = data.nutrition[itemIndexA];
    
  // Store the name of the item and the restaurant name to use it on the chart
  itemName = itemNutritionInformation["item_name"];
  restaurantName = itemNutritionInformation["restaurant"];
    
  // Select the % daily values
  dailyValuesObject = itemNutritionInformation["% daily values"];
    
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
              'Daily % of Micronutrient values on' + ' ' +capitalizeFirstLetter(itemName) +
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

//////////////////// DEFAULT RIGHT GAUGE CHART (B) ////////////////////

d3.json("/api/v1.0/nutrition").then(function(data) {
      
  defaultInputB = "egg white delight";
      
  var names = data.names;
        
  // Find the index for the input item
  itemIndexA = names.indexOf(defaultInputB);
    
  // Find the item in the Nutrition object
  itemNutritionInformation = data.nutrition[itemIndexA];
    
  // Store the name of the item and the restaurant name to use it on the chart
  itemName = itemNutritionInformation["item_name"];
  restaurantName = itemNutritionInformation["restaurant"];
    
  // Select the % daily values
  dailyValuesObject = itemNutritionInformation["% daily values"];
  
  // Create an array with the value names
  var valueNames = ["Calcium", "Iron", "Sodium", "Vitamin A", "Vitamin C"];
    
  // Create an array with the % daily values
  var calcium = dailyValuesObject["calcium_%_dv"];
  var iron = dailyValuesObject["iron_%_dv"];
  var sodium = dailyValuesObject["sodium_%_dv"];
  var vitaminA = dailyValuesObject["vitamin_a_%_dv"];
  var vitaminC = dailyValuesObject["vitamin_c_%_dv"];
       
  var values = [calcium, iron, sodium, vitaminA, vitaminC, 100];
  console.log(values)


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
      '#1EF505',
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
              'Daily % of Micronutrient values on' + ' ' +capitalizeFirstLetter(itemName) +
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
          gauge.container('radialChartB');
          gauge.draw();
        
        });
      });

//////////////////// DEFAULT STACKED BAR CHART ////////////////////

d3.json("/api/v1.0/nutrition").then(function(data) {
  
  defaultInputA = "egg mcmuffin";
  defaultInputB = "egg white delight";

  var names = data.names;
    
  // Find the index for input for both items
  itemIndexA = names.indexOf(defaultInputA );
  itemIndexB = names.indexOf(defaultInputB);

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
  chart.yScale().minimum(50 * -1);
  chart.yScale().maximum(50);

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

  // Temp variable to store series instance
  var series;

  // Create first series with mapped data
  series = chart.bar(firstSeriesData);
  series.name(capitalizeFirstLetter(defaultInputA)).color('HotPink');
  series.tooltip().position('left').anchor('right-center');

  // Create second series with mapped data
  series = chart.bar(secondSeriesData);
  series.name(capitalizeFirstLetter(defaultInputB));
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