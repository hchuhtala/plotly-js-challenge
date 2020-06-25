//init page
function pageInit(){
    populateDropDown()
    changePlots(940)
}
pageInit();

//event handeler
function optionChanged(newID) {
    console.log(newID);
    changePlots(newID);
    changeInfoPanel(newID);
}

function populateDropDown () {d3.json("static/samples.json").then((data) => {

    // console.log(data)
    console.log("running page init")
    let names = data.names
    // let values = data.samples[0].sample_values
    // let ids = data.samples[0].otu_ids
    // let labels = data.samples[0].otu_labels
    // let info = data.metadata[0]
    // console.log(names)
    // console.log(values)
    // console.log(ids)
    // console.log(labels)
    // console.log("meta")
    // console.log(info.id)

    // let names =[940, 941, 943];

    //populate dropdown
    d3.select("select").selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a option to placeholder
        .html(d => `${d}`);


});}



function changePlots(newID) {

    d3.json("static/samples.json").then((data) => {

        console.log("running changePlot func")
        //  console.log(data.samples)
        let info = data.metadata.filter(d => d.id == newID);
        console.log(info);

        filteredData = data.samples.filter(d => d.id == newID);
        console.log(filteredData);

        let values = filteredData[0].sample_values;
        let ids = filteredData[0].otu_ids;
        let labels = filteredData[0].otu_labels;

        // console.log(names)
        // console.log(values);
        // console.log(ids);
        // console.log(labels);



        //HORIZONTAL BAR CHART

        //convert y to strings
        yValues = ids.map(d => `OTU ${d}`);
        // console.log(yValues)

        //slice the top ten
        xValues = values.slice(0, 10);
        // console.log(xValues);

        var hbdata = [{
            type: 'bar',
            x: xValues,
            y: yValues,
            orientation: 'h'
        }];

        var layout = {
            title: 'Top Ten Bacteria Found',
            xaxis: { title: "Quantity"},
            yaxis: { title: "Bacteria ID Number"},
            showlegend: false,
          };        
        Plotly.newPlot('bar', hbdata, layout);

        var trace1 = {
            x: ids,
            y: values,
            text: yValues,
            mode: 'markers',
            marker: {
              color: ids,
              colorscale: 'Picnic',
              size: values,
              sizeref: 3,
            }
          };
          
          var bdata = [trace1];
          
          var layout = {
            title: 'Bubble Chart of Bacteria by ID and Quantity',
            xaxis: { title: "Bacteria ID Number"},
            yaxis: { title: "Quantity"},
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', bdata, layout);


    });
}

function changeInfoPanel(newID) {

    d3.json("static/samples.json").then((data) => {
        //d3 is run last
        console.log("running changeInfoPanel func")
        //  console.log(data.samples)
        let info = data.metadata.filter(d => d.id == newID);
        console.log(info);

    //Populate Info Panel

    keys = Object.keys(info[0]);
    values = Object.values(info[0]);
    console.log(values);

    // d3.select("#sample-metadata").selectAll("div")
    // .data(keys, values)
    // .enter() // creates placeholder for new data
    // .append("div") // appends a option to placeholder
    // .classed("panel-body", true) // sets the class of the new div
    // .text(function (keys, values) {
    //     return `${keys}: ${values}`;
    // });

    d3.select("#sample-metadata").selectAll("div")
    .data(info[0], keys)
    .enter() // creates placeholder for new data
    .append("div") // appends a option to placeholder
    .classed("panel-body", true) // sets the class of the new div
    .text(function (d, i) {
        return `${d.i}:`;
    });

    // d3.select("#sample-metadata").selectAll("div")
    // .data(info, keys)
    // .enter() // creates placeholder for new data
    // .append("div") // appends a option to placeholder
    // .classed("panel-body", true) // sets the class of the new div
    // .text(function (info, keys) {
    //     return `${keys}: ${info.id}`;
    // });


//     // Populate table
//     let tbody = d3.select("tbody");
//     // console.log(data);

//     data.forEach((ufoReport) => {
//     let row = tbody.append("tr");
//     Object.entries(ufoReport).forEach(([key, value]) => {
//     let cell = row.append("td");
//     cell.text(value);
//   });
// });





    });
}