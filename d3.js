
var width = 800, height=400;


d3.json('words.json', function(error, data){

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
            .append("g")
            .attr("transform","translate(350,200)")
            
            

            d3.select("#zoom_in").on("click", function() {
            
                zoom.scaleBy(svg.transition().duration(750), 1.2)
               
            });
        
            d3.select("#zoom_out").on("click", function() {
                zoom.scaleBy(svg.transition().duration(750), 0.8);
            });

            var zoom = d3.zoom()
                        .scaleExtent([0.5, 5])
                        .on("zoom", zoomed)
                        
            function zoomed() {
              svg.attr("transform", d3.event.transform);
          }  

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
                    .style("fill","white")
                    .style("font-size", function(d) { return d.size +10 + "px"; })
                })

                .on('mouseout', function(d, i) {
                  d3.select(this)
                  .transition()
                  .style("fill", function(d, i) { return color(i); })
                  .style("font-size", function(d) { return d.size + "px"; })
                  
              })
           
              
         
  

    d3.select("div#word").append("svg")
                .attr("width", "300px")
                .attr("height", "50px")
                .append("g")
                .append("text")
                .attr("class", "h3")
                .attr("transform","translate(5,40)")
                .style("fill","white")
                .text("ORIGINAL WORDS ~ TRANSLATION")

    d3.select("div#meaning").append("svg")
                .attr("width", "300px")
                .attr("height", "25px")
                .append("g")
                .append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .text("WORD PROPERTY")

    d3.select("div#times").append("svg")
                .attr("width", "300px")
                .attr("height", "25px")
                .append("g")
                .append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .text("APPEARENCE FREQUENCY")

      
              }

    

              
function updatebarchart(a){
  d3.json('words.json', function(error, data){
    console.log(a)
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
  console.log(data_long)

  d3.select("#barchart").selectAll("svg").remove();
  var svg = d3.select("#barchart")
  .append("svg")
    .attr("width", "800px")
    .attr("height", "130px")
  .append("g")
    .attr("transform",
          "translate(20,30)");
          
//  X axis
var x = d3.scaleBand()
  .range([ 0, 700 ])
  .domain(data_long.map(function(d) { return d.y; }))
  .padding(0.3);
svg.append("g")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .style("fill","white")
  .text(function(d) { return d.y; })

// Add Y axis
var y = d3.scaleLinear()
  .domain([0,800])
  .range([120, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data_long)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.y); })
    .attr("width", x.bandwidth())
    .attr("fill", "white")
    // no bar at the beginning thus:
    .attr("height", function(d) { return 120 - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

    svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.value); })
  .attr("height", function(d) { return 120 - y(d.value); })
  .delay(function(d,i){ return(i*100)})



  })
}
    

function updatetranslator(a){
  
  d3.json('words.json', function(error, data){
  // data.map(function(d) { return {text: d.word, size: d.times};})
  data_meaning = data.filter(function(d){ return d.word == a})
  data_meaning = data_meaning.map(function(d) { return {word: d.word, meaning: d.meaning, times: d.times, property: d.property, translation: d.translation};})
  
  d3.select("div#word").selectAll("svg").remove();

  d3.select("div#word").append("svg")
                .attr("width", "300px")
                .attr("height", "50px")
                .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h2")
                .attr("transform","translate(5,40)")
                .style("fill","white")
                .text(function(d) { return d.word + " ~ "+ d.translation;})
               
    d3.select("div#meaning").selectAll("svg").remove();
    d3.select("div#meaning").append("svg")
                .attr("width", "300px")
                .attr("height", "25px")
                .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .text(function(d) { return "PROPERTY: "+d.property ;})

    d3.select("div#times").selectAll("svg").remove();
    d3.select("div#times").append("svg")
                .attr("width", "300px")
                .attr("height", "25px")
                .append("g")
                .selectAll("text")
                .data(data_meaning)
                .enter().append("text")
                .attr("class", "h3")
                .style("fill","white")
                .attr("transform","translate(5,20)")
                .text(function(d) { return "APPEARENCE FREQUENCY: "+ d.times;})

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
