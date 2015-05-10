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
                  width   : "half",
                  row     : 1,
                  col     : 1
               },
               {  text    : "Closed Issues",
                  classes : "issue closed",
                  width   : "half",
                  row     : 1,
                  col     : 2
               },
               {  text    : "Open Pull Req.",
                  classes : "pull open",
                  width   : "half",
                  row     : 2,
                  col     : 1
               },
               {  text    : "Closed Pull Req.",
                  classes : "pull closed",
                  width   : "half",
                  row     : 2,
                  col     : 2
               },
               {  text    : "Commits",
                  classes : "commit",
                  width   : "whole",
                  row     : 3,
                  col     : 1
               },
               {  text    : "Test Suite Dev.",
                  classes : "Tests",
                  width   : "half",
                  row     : 4,
                  col     : 1
               },
               {  text    : "Spec Edits",
                  classes : "HTML",
                  width   : "half",
                  row     : 4,
                  col     : 2
               },
              {  text    : "Specs",
                  classes : "specs",
                  width   : "whole",
                  row     : 5,
                  col     : 1
               },
               {  text    : "Working Groups",
                  classes : "groups",
                  width   : "whole",
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

Legend.prototype.createLegend = function()
{
  var that = this;

  this.parentElement
     .append("svg")
     .attr("width", this.width)
     .attr("height", this.height)
     .selectAll("g")
     .data(this.data)
     .enter()
     .append("g")
     .attr("transform", function(d)
      {
        var x; var y;

        if(d.col === 1) { x = 0; }
        else { x = (that.width/2 + .5*that.padding); }

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
            if(d.width === "half") {
              return that.width/2 - .5*that.padding;
            } else {
              return that.width;
            }
          })
          .attr("x", 0)
          .attr("y", 0);

        type.append("text")
              .attr("x", that.padding)
              .attr("y", that.bar_height/2 + that.padding)
              .attr("dy", 0)
              .attr("text-anchor", "center")
              .text(function(d){ return d.text; });
     });
};
