var myApp = angular.module('myApp', ['gridster']);

myApp.controller('myCtrl', function ($scope, $window) {

    var colors = ["#29B6B6", "#3D61C3", "#FFBF39", "#FF9339", "#623EC6", "#349D9D", "#445FA9", "#DCAD49", 
        "#DC8C49", "#5C4894", "#189393", "#24449E", "#CE9722", "#CE7022", "#311480", "#4ACFCF", "#5C7DD8", 
        "#FFCA5B", "#FFA55B", "#8C6EE2", "#5FCFCF", "#708CD8", "#FFD376", "#FFB476", "#A38DE2"];

    $scope.databaseCharts = [{
        gridSize: {
            sizeX: 3,
            sizeY: 2
        },
        type: 'custom',
        chartConfig: {
            margin_left: 0
        }
    }];

    $scope.gridsterOptions = {
        margins: [20, 20],
        columns: 4,
        rowHeight: 300,
        pushing: true,
        floating: true,
        swapping: true,
        resizable: {
            stop: function (event, $element, widget) {

                updateChartDimensions();
            }
        },
        draggable: {
            enabled: true,
            handle: '.highcharts-title'
        }
    };

    updateChartDimensions();

    window.addEventListener('resize', updateChartDimensions);

    function updateChartDimensions() {
        setTimeout(function () {

            angular.forEach($scope.databaseCharts, function (elements) {
                if (elements.type == 'custom') {

                    rebuildSankeyDiagram();
                }
            });
        }, 500);

        setTimeout(function () {
            $scope.$apply();
        }, 700);
    }

    function rebuildSankeyDiagram() {
        d3.select('svg').remove();

        var units = "Widgets";

        var padding = 100;
        var margin = { top: 10, right: 10, bottom: 10, left: 100 },
            width = document.getElementById("chart-parent").offsetWidth - padding - margin.left - margin.right,
            height = document.getElementById("chart-parent").offsetHeight - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),    // zero decimal places
            format = function (d) { return formatNumber(d) + " " + units; },
            color = d3.scale.category20();

        d3.select('#chart > svg').remove();
        // append the svg canvas to the page
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", document.getElementById('chart-parent').offsetWidth - padding)
            .attr("height", height + margin.top + margin.bottom)
            .attr("style", "padding-left: " + padding + "px");

        // Set the sankey diagram properties
        var sankey = d3.sankey()
            .nodeWidth(36)
            .nodePadding(10)
            .size([width, height]);

        var path = sankey.link();

        // load the data
        d3.json("sankeygreenhouse.json", function (error, graph) {

            var nodeMap = {};
            graph.nodes.forEach(function (x) { nodeMap[x.name] = x; });
            graph.links = graph.links.map(function (x) {
                return {
                    source: nodeMap[x.source],
                    target: nodeMap[x.target],
                    value: x.value
                };
            });

            sankey
                .nodes(graph.nodes)
                .links(graph.links)
                .layout(32);

            // add in the links
            var link = svg.append("g").selectAll(".link")
                .data(graph.links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", path)
                .style("stroke-width", function (d) { return Math.max(1, d.dy); })
                .sort(function (a, b) { return b.dy - a.dy; });

            // add the link titles
            link.append("title")
                .text(function (d) {
                    return d.source.name + " → " +
                        d.target.name + "\n" + format(d.value);
                });

            // add in the nodes
            var node = svg.append("g").selectAll(".node")
                .data(graph.nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .call(d3.behavior.drag()
                    .origin(function (d) { return d; })
                    .on("dragstart", function () {
                        this.parentNode.appendChild(this);
                    })
                    .on("drag", dragmove));

            // add the rectangles for the nodes
            node.append("rect")
                .attr("height", function (d) { return d.dy; })
                .attr("rx", function (d) { return 2; })
                .attr("ry", function (d) { return 2; })
                .attr("width", sankey.nodeWidth())
                .style("fill", function (d, i) {
                    return d.color = color(colors[i]);
                })
                .style("stroke", function (d) {
                    return d3.rgb(d.color).brighter(1);
                })
                .append("title")
                .text(function (d) {
                    return d.name + "\n" + format(d.value);
                })
                .filter(function (d) { return d.x < width / 2; });

            // add in the title for the nodes
            node.append("text")
                .attr("x", 40)
                .attr("y", function (d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .attr("transform", null)
                .text(function (d) { 
                    if(d.name.length > 10)
                        return d.name.substring(0, 10)+'...';
                    else
                        return d.name;
                 })
                 .attr('title', function(d){ return d.name; })
                .filter(function (d) { return d.x < width / 2; })
                .attr("x", -40 + sankey.nodeWidth())
                .attr("text-anchor", "end");

            // the function for moving the nodes
            function dragmove(d) {
                d3.select(this).attr("transform",
                    "translate(" + (
                        d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                    ) + "," + (
                        d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                    ) + ")");
                sankey.relayout();
                link.attr("d", path);
            }
        })
    }
});