// d3.json("samples.json").then((data) => {
   
//     console.log(data)
//     let names = data.names
//     let values = data.sample_values
//     let ids = data.otu_ids
//     let labels = data.otu_labels
//     let info = data.metadata
//     console.log(names)
//     console.log(values)
//     console.log(ids)
//     console.log(labels)
//     console.log(info)

    let names =[940, 941, 943];

    //populate dropdown
    d3.select("select").selectAll("option")
        .data(names)
        .enter() // creates placeholder for new data
        .append("option") // appends a option to placeholder
        //   .classed("panel-body", true) // sets the class of the new div
        .html(function(d) {
            return `${d}`; //`value=${d}`
        }); // sets the html in the div to an image tag with the link



    //event handeler
    d3.select("#selDataset").on("change", function () {
        console.log("change");
        let newID = d3.select(this).property('value');
        console.log(newID);

    });    


    //populate info box

    let metadata = [{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}, {"id": 941, "ethnicity": "Caucasian/Midleastern", "gender": "F", "age": 34.0, "location": "Chicago/IL", "bbtype": "I", "wfreq": 1.0}, {"id": 943, "ethnicity": "Caucasian", "gender": "F", "age": 49.0, "location": "Omaha/NE", "bbtype": "I", "wfreq": 1.0}];
    console.log(metadata);



    // //HORIZONTAL BAR CHART
    // var data = [{
    //     type: 'bar',
    //     x: sample_values,
    //     y: otu_ids,
    //     orientation: 'h'
    //   }];
      
    //   Plotly.newPlot('bar', data);
//   });
  