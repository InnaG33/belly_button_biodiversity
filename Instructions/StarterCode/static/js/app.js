
function optionChanged (value) {
    Charts(value);
    buildTable(value);
}

function Charts (id) {
    d3.json("samples.json").then((importedData) => {
        var filteredData = importedData.samples.filter(item => item.id === id);
       
        var sampleValues = filteredData[0].sample_values;
        var otuIds = filteredData[0].otu_ids;
        var otuLabels = filteredData[0].otu_labels;
        // console.log(`otuIds: ${otuIds}`);
        // console.log(`Labels: ${otuLabels}`);
        // console.log(`Values are: ${sampleValues}`);

        var otuIDsText = [];

        for ( var i = 0 ; i < otuIds.length ; i++ ) {
            var result = 'OTU ' + `${otuIds[i]}`
            otuIDsText.push(result);
            };

        // var otuIDsText = 'OTU ' + `${otuIds}`;

        var trace1 = {
            x : sampleValues,
            y : otuIDsText,
            type: 'bar',
            marker: {
                color: 'rgba(50,171,96,0.6)',
                line: {
                color: 'rgba(50,171,96,1.0)',
                width: 1
                }
            },
            orientation : "h",
            text: otuLabels
        };

        var layout1 = {
            xaxis: {
              range: [0, 180],
            //   domain: [0, 10],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true
            },
            margin: {
              l: 100,
              r: 20,
              t: 50,
              b: 50
            },
            width: 600,
            height: 600,
            paper_bgcolor: 'rgb(250,250,240)',
            plot_bgcolor: 'rgb(248,248,255)',
          };
    
        var data1 = [trace1];

        var markerSizes = [];

        for ( var i = 0 ; i < sampleValues.length ; i++ ) {
            markerSizes.push(sampleValues[i]*30);
            };

        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              size: markerSizes,
              sizemode: 'area',
              color: otuIds
            }
          };
          var layout2 = {
            xaxis: {
              showgrid: true,
              title : 'OTU IDs'
            },
            margin: {
              l: 100,
              r: 50,
              t: 50,
              b: 80
            },
            width: 1000,
            height: 500,
            paper_bgcolor: 'rgb(250,250,240)',
            plot_bgcolor: 'rgb(248,248,295)',
          };
          
        Plotly.newPlot("bar", data1, layout1);

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2, layout2);
    });
}

function buildPlot() {
    // d3.event.preventDefault();

    d3.json("samples.json").then((importedData) => {
        
        // var data = importedData;
        var names = importedData.names
        // console.log(names);
        var selectedName = d3.select("#selDataset");
        names.forEach((name => {
            selectedName.append("option").text(name).property("value", name)
        }));

        var id = names[0];
        // console.log(id);
        Charts(id);
       
        buildTable(id);

     });
  }
  
  buildPlot();

function buildTable(id) {
    d3.json("samples.json").then((importedData) => {
    var TableData = importedData.metadata.filter(item => item.id === parseInt(id));
    // var filteredData = importedData.samples.filter(item => item.id === id);
    // var filteredTable = TableData.filter(item => item.id === parseInt(id));
    // reversedData.map(object => object.greekSearchResults),

    var ids = TableData.map(object => object.id);
    var ethnicities = TableData.map(object => object.ethnicity);
    var genders = TableData.map(object => object.gender);
    var ages = TableData.map(object => object.age);
    var locations = TableData.map(object => object.location);
    var bbtypes = TableData.map(object => object.bbtype);
    var wfreqs = TableData.map(object => object.wfreq);
    // id_value = parseInt(id)

    console.log(`filtered Table Data : ${TableData[0]}`);
    // console.log(`filtered Table ethnic Data : ${ethnicities}`);
    // console.log(`filtered Table gender Data : ${genders}`);
    // console.log(`filtered Table age Data : ${ages}`);
    // console.log(`filtered Table location Data : ${locations}`);
    // console.log(`filtered Table bbtypes Data : ${bbtypes}`);
    // console.log(`filtered Table wfreqs Data : ${wfreqs}`);

    
    var table = d3.select("#summary-table");
    
    var tbody = table.select("tbody");
    tbody.html("");
    var trow;
    trow = tbody.append("tr").text("ID: ");
    trow.append("td").text(ids);
    trow = tbody.append("tr").text("Age: ");
    trow.append("td").text(ages);
    trow = tbody.append("tr").text("Ethnicitiy: ");
    trow.append("td").text(ethnicities);
    trow = tbody.append("tr").text("Gender: ");
    trow.append("td").text(genders);
    trow = tbody.append("tr").text("Location: ");
    trow.append("td").text(locations);
    trow = tbody.append("tr").text("BB_Type: ");
    trow.append("td").text(bbtypes);
    trow = tbody.append("tr").text("Wfreq: ");
    trow.append("td").text(wfreqs);


    // function buildT(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
    //     var table = d3.select("#summary-table");
    //     var tbody = table.select("tbody");
    //     var trow;
    //     for (var i = 0; i < 12; i++) {
    //       trow = tbody.append("tr");
    //       trow.append("td").text(dates[i]);
    //       trow.append("td").text(openPrices[i]);
    //       trow.append("td").text(highPrices[i]);
    //       trow.append("td").text(lowPrices[i]);
    //       trow.append("td").text(closingPrices[i]);
    //       trow.append("td").text(volume[i]);
    //     }
    //   }


    // // tbody.html("");
    // var tbody;
    // TableData.forEach((insight)=> {
    //     var row = tbody.append("tr");
    //     Object.entries(insight).forEach(([key, value])=> {
    //         var cell = row.append("td");
    //         cell.text(value);
    //     });
    // });
    // var tbody = table.select("tbody");
    // var trow;
    // for (var i=0; i<8; i++){
    //     trow = tbody.append("tr");
    //     trow.append("td").ids;
    //     trow.append("td").ages;
    // }


    // function dataLoad() {

    //     // Clear existing table
    //     tbody.html("");
      
    //     filteredData.forEach((insight) => {
    //     var row = tbody.append("tr");
    //     Object.entries(insight).forEach(([key, value]) => {
    //       var cell = row.append("td");
    //       cell.text(value);
    //     });
    //   });
      
    //   }


    // for (var i = 0; i < 12; i++) {
    //   trow = tbody.append("tr");
    //   trow.append("td").text(id[i]);
    //   trow.append("td").text(etnicity[i]);
    //   trow.append("td").text(age[i]);
    //   trow.append("td").text(lowPrices[i]);
    //   trow.append("td").text(closingPrices[i]);
    //   trow.append("td").text(volume[i]);
    // }
    });
}