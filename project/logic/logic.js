console.log('logic loaded');

var body = d3.select("#svg");

//selects the svg
var svg = body.append("svg")
  .attr("width", 1000)
  .attr("height", 1000);

//data to create all hexes
var data = [
  {
    data: [
      {x: 50, y: 87},
      {x: -50, y: 87},
      {x: -100, y: 0},
      {x: -100, y: 0},
      {x: -50, y: -87},
      {x: 50, y: -87},
      {x: 100, y: 0}
    ]
  },
  {
    data: [
      {x: 50, y: -87},
      {x: 100, y: 0},
      {x: 50, y: 87},
      {x: -50, y: 87},
      {x: -100, y: 0},
      {x: -100, y: 0},
      {x: -50, y: -87}
    ]
  },
  {
    data: [
      {x: -100, y: 0},
      {x: -50, y: -87},
      {x: 50, y: -87},
      {x: 100, y: 0},
      {x: 50, y: 87},
      {x: -50, y: 87},
      {x: -100, y: 0}
    ]
  },
];

function calculateTranslateX(i) {
  if (i%2 == 0) {
    return 250;
  } else {
    return 415;
  };
};

function calculateTranslateY(i) {
  var yOffset = 0;
  if (i%2 == 0) {
    yOffset = 250 + ((i/2) * 190);
    return yOffset;
  } else {
    yOffset = 345 + (((i-1)/2) * 190);
    return yOffset;
  };
};

//appending groups to svg
svg.selectAll("g")
  .data(data)
  .enter()
  .append("g")
    .attr("class", function(d, i) {return "hex" + i})
    .attr("transform", function(d, i) {return "translate(" + calculateTranslateX(i) + ", " + calculateTranslateY(i) + ")"});

var line = d3.line()
  .x(function(d) {return d.data.x})
  .y(function(d) {return d.data.y});

svg.selectAll("path")
  .data(data)
  .enter()
  .select(function(d,i) { return ".hex" + i })
    .append("path")
      .attr("d", line(data))
      .attr("class", "hex")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "8")
      .attr("fill", "none");

var totalLength = path.node().getTotalLength();

svg.selectAll(".hex")
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength)
  .transition()
    .duration(4000)
    // .ease("linear")
    .attr("stroke-dashoffset", 0)
  .on("end", function() {
    path.attr("stroke-dasharray", "none");
  });
