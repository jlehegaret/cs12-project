var getInnerWidth = function(element) {
    var style = window.getComputedStyle(element.node(), null);

    return parseInt(style.getPropertyValue('width'));
};

Legend = function (_parentElement, _options)
{ var that = this;
  this.parentElement = _parentElement;
  this.height = _options.height;
  this.width = _options.width;

  this.data = [
               {  text    : "Open Issues",
                  classes : "issue open",
                  width   : .5,
                  row     : 1,
                  col     : 1
               },
               {  text    : "Closed Issues",
                  classes : "issue closed",
                  width   : .5,
                  row     : 1,
                  col     : 2
               },
               {  text    : "Open Pull Req.",
                  classes : "pull open",
                  width   : .5,
                  row     : 2,
                  col     : 1
               },
               {  text    : "Closed Pull Req.",
                  classes : "pull closed",
                  width   : .5,
                  row     : 2,
                  col     : 2
               },
               {  text    : "Commits",
                  classes : "commit",
                  width   : 1,
                  row     : 3,
                  col     : 1
               },
               {  text    : "Testing",
                  classes : "Tests",
                  width   : .25,
                  row     : 4,
                  col     : 1
               },
               {  text    : "Spec Edits / CanIUse",
                  classes : "HTML",
                  width   : .75,
                  row     : 4,
                  col     : 2
               },
              {  text    : "WD",
                  classes : "WD",
                  width   : .2,
                  row     : 5,
                  col     : 1
               },
              {  text    : "LCWD",
                  classes : "LCWD",
                  width   : .2,
                  row     : 5,
                  col     : 2
               },
              {  text    : "CR",
                  classes : "CR",
                  width   : .2,
                  row     : 5,
                  col     : 3
               },
              {  text    : "PR",
                  classes : "PR",
                  width   : .2,
                  row     : 5,
                  col     : 4
               },
              {  text    : "REC",
                  classes : "REC",
                  width   : .2,
                  row     : 5,
                  col     : 5
               },
               {  text    : "Working Groups",
                  classes : "groups",
                  width   : 1,
                  row     : 6,
                  col     : 1
               }
               ];

  this.padding = 4;
  this.num_bars = this.data.length;
  this.bar_height = this.height / this.num_bars
                      - this.padding;

  this.createLegend();
};

Legend.prototype.initVis = function()
{

  // set up svg
  this.parentElement
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)

  // create gradient for canIuse bar
  var gradient = this.parentElement.select("svg")
    .append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient_canIuse")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#c6dbef")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "25%")
        .attr("stop-color", "#6baed6")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "50%")
        .attr("stop-color", "#2171b5")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "75%")
        .attr("stop-color", "#145184")
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#08306b")
        .attr("stop-opacity", 1);

  // do it again for Working Groups bar
  gradient = this.parentElement.select("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient_wgs")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%")
                .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#353535")
        .attr("stop-opacity", 1);
    gradient.append("svg:stop")
        .attr("offset", "33%")
        .attr("stop-color", "#525252")
        .attr("stop-opacity", 1);
    gradient.append("svg:stop")
        .attr("offset", "66%")
        .attr("stop-color", "#737373")
        .attr("stop-opacity", 1);
    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#969696")
        .attr("stop-opacity", 1);
}


Legend.prototype.createLegend = function()
{
  var that = this;

  this.initVis();

  this.parentElement
     .select("svg")
     .selectAll("g")
     .data(this.data)
     .enter()
     .append("g")
     .attr("transform", function(d)
      {
        var x; var y;

        if(d.col === 1)
        {
          x = 0;
        }
        else if(d.width === .2)
        {
          x = (d.col-1)*(d.width * that.width)
              + .5*that.padding;
        }
        else
        {
          x = ((1-d.width)*that.width
              + .5*that.padding);
        }

        y = (d.row - 1) * that.height/that.num_bars;

        return "translate(" + x +  ","  + y + ")";
      })
     .call(function(type)
     {
        type.append("rect")
          .attr("class", function(d) { return d.classes; })
          .attr("height", that.bar_height)
          .attr("width", function(d)
          {
            if(d.width === 1) {
              return that.width;
            } else {
              return (d.width*that.width
                      - .5*that.padding);
            }
          })
          .attr("x", 0)
          .attr("y", 0)
          .style("fill", function(d)
          {
            if(d.classes === "HTML")
            {
              return "url(#gradient_canIuse)";
            }
            else if(d.classes === "groups")
            {
              return "url(#gradient_wgs)";
            }
          });

        type.append("text")
              .attr("x", that.padding)
              .attr("y", that.bar_height/2 + that.padding)
              .attr("dy", 0)
              .attr("text-anchor", "center")
              .text(function(d){ return d.text; });
     });
};

