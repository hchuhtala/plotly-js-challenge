d3.json("static/samples.json").then((data) => {
   //d3 is run last
    // console.log(data)
    let names = data.names
    let values = data.samples[0].sample_values
    let ids = data.samples[0].otu_ids
    let labels = data.samples[0].otu_labels
    let info = data.metadata
    console.log(names)
    console.log(values)
    console.log(ids)
    console.log(labels)
    // console.log(info)

    // let names =[940, 941, 943];

    //populate dropdown
    d3.select("select").selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a option to placeholder
        //   .classed("panel-body", true) // sets the class of the new div
        .html(function(d) {
            return `${d}`; //`value=${d}`
        }); // sets the html in the div to an image tag with the link

    console.log("d3 function chart")    
    //HORIZONTAL BAR CHART
    var data = [{
        type: 'bar',
        x: values,
        y: ids,
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', data);

});
console.log("outside d3 function") 
//event handeler
function optionChanged(newID){
    console.log(newID);
    changePlot(newID);
}
    // d3.select("#selDataset").on("change", function () {
    //     console.log("change");
    //     let newID = d3.select(this).property('value');
    //     console.log(newID);

    // });    


    //populate info box

    // let metadata = [{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}, {"id": 941, "ethnicity": "Caucasian/Midleastern", "gender": "F", "age": 34.0, "location": "Chicago/IL", "bbtype": "I", "wfreq": 1.0}, {"id": 943, "ethnicity": "Caucasian", "gender": "F", "age": 49.0, "location": "Omaha/NE", "bbtype": "I", "wfreq": 1.0}];
    // console.log(metadata);

    
function changePlot (newID){

    d3.json("static/samples.json").then((data) => {
        //d3 is run last
        console.log("running changePlot func")
        //  console.log(data.samples)
         filteredData = data.samples.filter(d => d.id == newID);
         console.log(filteredData)
        
        //  let names = data.names
         let values = filteredData[0].sample_values
         let ids = filteredData[0].otu_ids
         let labels =filteredData[0].otu_labels
        // //  let info = data.metadata
        //  console.log(names)
         console.log(values)
         console.log(ids)
         console.log(labels)

        //HORIZONTAL BAR CHART
        var data = [{
            type: 'bar',
            x: values,
            y: ids,
            orientation: 'h'
        }];
        
        Plotly.newPlot('bar', data);

});}




  