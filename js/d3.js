
var width = 800, height=400;


d3.json('data/words.json', function(error, data){

  

    var color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,5000,6000])
            .range(["#f7f7f7", "#ddd", "#bbb", "#aaa", "#999", "#666", "#444", "#222", "#111", "#111"]);

    d3.layout.cloud().size([800, 400])
            .words(data.map(function(d) { return {text: d.word, size: d.times};}))
            .rotate(0)
            .fontSize(function(d) { return d.size/100; })
            .padding(10)
            .on("end", draw)
            .timeInterval(10)
            .start();
            

            var svg = d3.select("div#wordcloud").select("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "wordcloud")
            
            .call(d3.zoom().on("zoom", function () {
              svg.attr("transform", d3.event.transform)
          }))
          
          .append("g")
          .attr("transform","translate(350,200)")
          

            // d3.select("#zoom_in").on("click", function() {
            
            //     zoom.scaleBy(svg.transition().duration(750))
               
            // });
        
            // d3.select("#zoom_out").on("click", function() {
            //     zoom.scaleBy(svg.transition().duration(750), 0.8);
            // });

          //   var zoom = d3.zoom()
          //               .scaleExtent([0.5, 5])
          //               .on("zoom", zoomed)
                        
          //   function zoomed() {
          //     svg.attr("transform", d3.event.transform);
          // }  

    function draw(words) {
                
                svg.selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; })
                .attr("text-anchor", "middle")
               

                .on('click', function(d, i) {
                  // transition the clicked element
                  // to have a radius of 20
                  d3.select(this)
                  .transition()
                  .style("fill","#8c7851")
                  updatebarchart($(this).text())
                  updatetranslator($(this).text());
                })


                .on('mouseover', function(d, i) {
                    d3.select(this)
                    .transition()
                    .style("fill","#8c7851")
                    .style("font-size", function(d) { return d.size +10 + "px"; })
                })

                .on('mouseout', function(d, i) {
                  d3.select(this)
                  .transition()
                  .style("fill", function(d, i) { return color(i); })
                  .style("font-size", function(d) { return d.size + "px"; })
                  
              })
           
              
         
  

    d3.select("div#word").append("div")
                // .attr("width", "300px")
                // .attr("height", "50px")
                // .append("g")
                // .append("text")
                .attr("class", "h3")
                .attr("transform","translate(5,40)")
                .style("fill","white")
                .html("CN ~ ENG")

    d3.select("div#meaning").append("div")
                // .attr("width", "300px")
                // .attr("height", "25px")
                // .append("g")
                // .append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .html("0")

    d3.select("div#times").append("div")
                // .attr("width", "300px")
                // .attr("height", "25px")
                // .append("g")
                // .append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .html("0")

      
              }

    

              
function updatebarchart(a){
  d3.json('data/words.json', function(error, data){
    // console.log(a)
  // console.log(data.filter(function(d){ return d.word == a}))
  var data_long = [];
  data.filter(function(d){ return d.word == a}).forEach(function(d) {
    var x = d[""];
    delete d["times"];
    delete d["word"];
    delete d["meaning"];
    delete d["property"]; 
    delete d["translation"];
    for (prop in d) {
      var y = prop,
        value = d[prop];
      data_long.push({
        x: x,
        y: y,
        value: +value
      });
    }
  });
  // console.log(data_long)

  d3.select("#barchart").selectAll("svg").remove();
  d3.select("#barchart").selectAll("text").remove();
  var svg = d3.select("#barchart")
  .append("svg")
    .attr("width", "750px")
    .attr("height", "150px")
  .append("g")
    .attr("transform",
          "translate(10,0)");
          
//  X axis
var x = d3.scaleBand()
  .range([ 0, 700 ])
  .domain(data_long.map(function(d) { return d.y; }))
  .padding(0.3);
  var ticks = data_long.map(function(d) { return d.y; })
  // console.log(data_long.map(function(d) { return d.y; }))
  tickLabels = ["1986","1989","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"]
svg.append("g")
  .call(d3.axisBottom(x).tickValues(ticks)
  .tickFormat(function(d,i){ return tickLabels[i] }))
  .attr("transform","translate(0,125)")
  .selectAll("text")
  .style("fill","white")
  .attr("class","p")
  
  
  
// Add Y axis
var y = d3.scaleLinear()
  .domain([0,600])
  .range([125, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y).tickSize(700))
//   .style("stroke","white")
//   .attr("transform", "translate(700,0)")

 

// Bars
svg.selectAll("mybar")
  .data(data_long)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.y); })
    .attr("width", x.bandwidth())
    .attr("fill", "white")
    // no bar at the beginning thus:
    .attr("height", function(d) { return 125 - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })


    .on('mouseover', function(d, i) {
    svg.selectAll("mybar").data(data_long)
    .enter()
    .append("text")
    .attr("class", "p number")
    .attr("x", function(d) { return x(d.y); })
    .attr("y", function(d) { return y(d.value+35); })
    .style("text-anchor", "start")
    .style("fill", "white")
    .text(function(d) { return d.value; })
    })

    .on('mouseout', function(d, i) {
    d3.selectAll(".p.number").remove()
  })
    
    

    svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.value); })
  .attr("height", function(d) { return 125 - y(d.value); })
  .delay(function(d,i){ return(i*100)})





  })
}
    

function updatetranslator(a){
  
  d3.json('data/words.json', function(error, data){
  // data.map(function(d) { return {text: d.word, size: d.times};})
  data_meaning = data.filter(function(d){ return d.word == a})
  data_meaning = data_meaning.map(function(d) { return {word: d.word, meaning: d.meaning, times: d.times, property: d.property, translation: d.translation};})
  
  d3.select("div#word").selectAll("div").remove();
  d3.select("div#word").append("div")
                .attr("width", "300px")
                .attr("height", "50px")
                .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h2")
                // .attr("transform","translate(5,40)")
                .style("fill","white")
                .html(function(d) { return d.word + " ~ "+ d.translation;})
                // .text(function(d) { return d.word + " ~ "+ d.translation;})
               
    d3.select("div#meaning").selectAll("div").remove();
    d3.select("div#meaning").append("div")
                // .attr("width", "300px")
                // .attr("height", "25px")
                // .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h3")
                .style("fill","white")
                // .attr("transform","translate(5,20)")
                .text(function(d) { return d.property ;})
                // .text(function(d) { return "PROPERTY: "+d.property ;})

    d3.select("div#times").selectAll("div").remove();
    d3.select("div#times").append("div")
                // .attr("width", "300px")
                // .attr("height", "25px")
                // .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h3")
                .style("fill","white")
                // .attr("transform","translate(5,20)")
                // .text(function(d) { return "APPEARENCE FREQUENCY: "+ d.times;})
                // .html(function(d) { return "APPEARENCE FREQUENCY: "+ "<br/>" +d.times;})
                .html(function(d) { return d.times;})

    // d3.select("div#meaning").append("svg")
    //             .attr("width", "300px")
    //             .attr("height", "100px")
    //             .append("g")
    //             .selectAll("text")
    //             .data(data_meaning)
    //             .enter()
    //             .append("foreignObject")
    //             .attr("width",300)
    //             .attr("height",100)
    //             .append("xhtml:span")
    //             .html(function(d) { return d.meaning})
    //             .attr("transform","translate(5,50)")
    //             .style("font-size", "12px")
    //             .style("fill", "white")

                
  })
}


})
