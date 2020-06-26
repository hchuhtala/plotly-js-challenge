//init page
function pageInit(){
    console.log("run page init")
    populateDropDown();
    changePlots(940);
    changeInfoPanel(940);
}
pageInit();

//event handeler
function optionChanged(newID) {
    console.log(`running change to ${newID}`);
    changePlots(newID);
    changeInfoPanel(newID);
    
}

function populateDropDown () {d3.json("static/samples.json").then((data) => {

    // console.log(data)
    console.log("populate dropdown")
    let names = data.names
    // console.log(names)

    //populate dropdown
    d3.select("select").selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a option to placeholder
        .html(d => `${d}`);


});}



function changePlots(newID) {

    console.log("running changePlots func")
    d3.json("static/samples.json").then((data) => {

        console.log("running changePlots d3")
        //  console.log(data.samples)
        let info = data.metadata.filter(d => d.id == newID);
        console.log(info);

        filteredData = data.samples.filter(d => d.id == newID);
        console.log(filteredData);

        let values = filteredData[0].sample_values;
        let ids = filteredData[0].otu_ids;
        let labels = filteredData[0].otu_labels;

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

        //BUBBLE CHART

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

    console.log("running info panel update")
    d3.json("static/samples.json").then((data) => {

        console.log("running InfoPanel d3")
        //  console.log(data.samples)
        let info = data.metadata.filter(d => d.id == newID);
        console.log(info);

        //repack key value pairs into arr
        var obj = info[0];
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key + ': ' + obj[key]);
            }
        };
        // console.log(arr);

        d3.select("#panel").selectAll("#sample-metadata")
        .data(arr)
        .text(arr => `${arr}`);


    });
}