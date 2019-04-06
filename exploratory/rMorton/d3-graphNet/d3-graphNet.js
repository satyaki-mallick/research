// network graph - Source Cred open source project
// Ryan Morton April 2019

class graphNet {
	
	constructor(opts) {
		// load arguments from config object
		this.element = opts.element;
		this.data = opts.data;
		this.mapping = opts.mapping;
		this.options = opts.options;
		
		// create the chart
		this.draw();
	}
	
	draw(){
  	
		// define dimensions
		this.width = this.element.offsetWidth;
		this.height = 640; //this.element.offsetHeight;
		
		// set up parent element and SVG
		this.element.innerHTML = '';
		this.svg = d3.select(this.element).append('svg');
		this.svg.attr('width', this.width);
		this.svg.attr('height', this.height);
		this.chart = this.svg
			.append("g")
			.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
		// set up svg defs
		this.chart.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -3 10 10")
            .attr("refX", 18)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5");   
    
    //chart elements        
		this.edge = this.chart.append("g");
		this.node = this.chart.append("g");
		this.tooltip = d3.select(this.element).append("div")
			.attr("class", "toolTip")
			.style('display', 'none')
			.style('position', 'absolute')
			.style('min-width' , '50px')
			.style('height', 'auto')
			.style('background', 'none repeat scroll 0 0 #ffffff')
    
		//this.setColorScales();
		this.nodeColor = d3.scaleOrdinal(d3.schemeCategory10);
		// update chart
		this.update(this.data);
	}
	
	update(data) {
		
		//preserve context for functions
		const that = this;
		console.log(this.data);
    
		//define variables from data
		const links = data.edges;
		const nodes = data.nodes;
		
		// define simulation object
		const simulation = d3.forceSimulation(nodes)
			.force("charge", d3.forceManyBody().strength(-1500))
			.force("link", d3.forceLink(links).distance(250))
			.force("collide", d3.forceCollide().radius(2))
			.force("x", d3.forceX())
			.force("y", d3.forceY())
			.alphaTarget(1)
			.on("tick", ticked);
		
		// restart simulation with new data
		restart(nodes, links);
		
		function restart(nodes, links){
    	
			// node data join
			var node = that.node.selectAll(".node").data(nodes);
   
			// node exit	
			node.exit()
				.transition()
				.ease(d3.easeQuad)
				.duration(1000)
				.remove();
			
			//node enter
			var newNode = node.enter()
				.append('circle')
        .attr('class', 'node')
        .on('mouseover', mouseOver)
				.on('mouseout', mouseOff);
       
			// node update	
			node.merge(newNode)
				.transition()
				.ease(d3.easeQuad)
				.duration(1000)
				.attr('fill', function(d){
					if(that.mapping.nodeGroup){
						return that.nodeColor(d[that.mapping.nodeGroup]);
					} else {
						return 'steelblue';
					}
				})
				.attr('r', function(d){
					if(that.mapping.nodeSize){
						return d[that.mapping.nodeSize];
					} else {
						return 5;
					}
				});
			
			// edge data join
			var edge = that.edge.selectAll('.edge').data(links);
			
			// edge exit
			edge.exit().remove();
			
			// edge enter
			var newEdge = edge.enter()
				.append('line')
				.attr('class', 'edge');
			
			edge.merge(newEdge)
				.transition()
				.ease(d3.easeQuad)
				.duration(1000)
				.attr("marker-end", "url(#arrow)")
				.attr('stroke-width', function(d){
					if(that.mapping.edgeSize){
						return d[that.mapping.edgeSize];
					} else {
						return '#000';
					}
				})
				.attr('stroke', function(d){
					if(that.mapping.edgeGroup){
						return that.edgeColor(d[that.mapping.edgeGroup]);
					} else {
						return '#000';
					}
				});
				
			// Update and restart the simulation.
		    simulation.nodes(nodes);
		    simulation.force("link").links(links);
		    simulation.alpha(1).restart();
		}
			
		function ticked() {
		  that.node.selectAll('.node').attr("cx", function(d) { return d.x; })
			  .attr("cy", function(d) { return d.y; })

		  that.edge.selectAll('.edge').attr("x1", function(d) { return d.source.x; })
			  .attr("y1", function(d) { return d.source.y; })
			  .attr("x2", function(d) { return d.target.x; })
			  .attr("y2", function(d) { return d.target.y; });
		}
		
		function mouseOver(){
			var data = d3.select(this).data();
			
			that.tooltip
        .style("left", (d3.event.pageX - 10) + 'px')
			  .style("top", (d3.event.pageY - 30) + 'px')
        .style("display", "inline-block")
			  .html(function(){
				  return data[0].name;
			  });
		}
		
		function mouseOff(){
			that.tooltip.style("display", "none");
		}
			
	}
}