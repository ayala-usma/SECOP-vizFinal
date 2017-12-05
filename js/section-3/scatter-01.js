function ChartScatterPlot() {
		console.log('Llamado de Función');
		console.log(ordenEntidadFilter);
	// Inicialización Controles HTML
	document.getElementById('txtAreaNombreEntidad').value = '';
	document.getElementById("txtAreaDetalleObjetoContratar").value = '';
	document.getElementById("txtAreaDetalleTipoContrato").value = '';
	document.getElementById("txtAreaDetalleMunicipiosEjecucion").value = '';
	document.getElementById("urlContrato").href = '';

	var margin = { top: 10, right: 300, bottom: 50, left: 140},
		outerWidth = 1150,
		outerHeight = 450,
		width = outerWidth - margin.left - margin.right,
		height = outerHeight - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]).nice();

	var y = d3.scale.linear()
		.range([height, 0]).nice();

	var xCat = "Exceso Costo",
		yCat = "Cuantia Contrato",
		rCat = "Valor Total Adiciones",
		colorCat = "OrdenEntidad",
		iSearch = 0,
		pathData = '../../data/section-3/',
		yUnity = 1000000,
		textUnityYCat = "Cuantía Contrato - Por Millon",
		textComplementXCat = "%",
		rowNums = 0
		offsetYCatText = 20;

	function searchData(index) {
		iSearch = 0;
		d3.csv(pathData + dataFile, function(data) {
			data.forEach(function(d) {
			d["Exceso Costo"] = +d["Exceso Costo"];
			d["Exceso Tiempo"] = +d["Exceso Tiempo"];
			d.NombreEntidad = +d["Nombre Entidad"];
			if (index == iSearch) {
				// console.log(index + " - " + iSearch + "- " + d["Municipios Ejecucion"]);
				document.getElementById("txtAreaNombreEntidad").value = d["Nombre Entidad"];
				document.getElementById("txtAreaDetalleObjetoContratar").value = d["Detalle Objeto Contratar"];
				document.getElementById("txtAreaDetalleTipoContrato").value = d["Tipo Contrato"];
				document.getElementById("txtAreaDetalleMunicipiosEjecucion").value = d["Municipios Ejecucion"];
				document.getElementById("urlContrato").href = d["Ruta Proceso SECOP I"];
			}
			iSearch = iSearch + 1;
		  })
		})
		return '';
	 };
	 
	d3.csv(pathData + dataFile, function(data) {
		data.forEach(function(d) {
			d["Exceso Costo"] = +d["Exceso Costo"];
			d["Exceso Tiempo"] = +d["Exceso Tiempo"];
			d.NombreEntidad = +d["Nombre Entidad"];
			// console.log(d["Nombre Entidad"]);
			// console.log(d["Exceso Costo"]);
			//console.log(d[colorCat]);
			rowNums = rowNums + 1;
		});
	  
	  var 
		xMax = d3.max(data, function(d) { return d[xCat]; }),
		xMin = d3.min(data, function(d) { return d[xCat]; }),
		xMin = xMin > 0 ? 0 : xMin,
		yMax = d3.max(data, function(d) { return d[yCat]/yUnity; }),
		yMin = d3.min(data, function(d) { return d[yCat]/yUnity; }),
		yMin = yMin > 0 ? 0 : yMin;
		
		// console.log('File: ' + dataFile);
		// console.log('xMin ' + xMin);
		// console.log('xMax ' + xMax);
		// console.log('yMin ' + yMin);
		// console.log('yMax ' + yMax);
		// console.log('rowNums ' + rowNums);

		x.domain([xMin, xMax]);
		y.domain([yMin, yMax]);

	  var xAxis = d3.svg.axis()
		  .scale(x)
		  .orient("bottom")
		  .tickSize(-height);

	  var yAxis = d3.svg.axis()
		  .scale(y)
		  .orient("left")
		  .tickSize(-width);

	  var color = d3.scale.category10();
	  var colorsOrdenEntidad = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#329262", "#994499"];
	  var dataCategory;
	  
		function colorsCategories(n) {
			if (ordenEntidadFilter == 'all') {
				dataCategory = [	
								"Distrito Capital", 
								"Nacional Centralizado", 
								"Nacional Descentralizado",
								"Territorial Departamental Centralizado", 
								"Territorial Departamental Descentralizado",
								"Territorial Distrital Municipal Nivel 1", 
								"Territorial Distrital Municipal Nivel 2",
								"Territorial Distrital Municipal Nivel 3", 
								"Territorial Distrital Municipal Nivel 4",
								"Territorial Distrital Municipal Nivel 5", 
								"Territorial Distrital Municipal Nivel 6"
								];
				return colorsOrdenEntidad[n % colorsOrdenEntidad.length];

			} else {
				switch (ordenEntidadFilter) {
					case "-01":
							dataCategory = ["Distrito Capital"];
							return colorsOrdenEntidad[0];
							break;
					case "-02":
							dataCategory = ["Nacional Centralizado"];
							return colorsOrdenEntidad[1];
							break;
					case "-03":
							dataCategory = ["Nacional Descentralizado"];
							return colorsOrdenEntidad[2];
							break;
					case "-04":
							dataCategory = ["Territorial Departamental Centralizado"];
							return colorsOrdenEntidad[3];
							break;
					case "-05":
							dataCategory = ["Territorial Departamental Descentralizado"];
							return colorsOrdenEntidad[4];
							break;
					case "-06":
							dataCategory = ["Territorial Distrital Municipal Nivel 1"];
							return colorsOrdenEntidad[5];
							break;
					case "-07":
							dataCategory = ["Territorial Distrital Municipal Nivel 2"];
							return colorsOrdenEntidad[6];
							break;
					case "-08":
							dataCategory = ["Territorial Distrital Municipal Nivel 3"];
							return colorsOrdenEntidad[7];
							break;
					case "-09":
							dataCategory = ["Territorial Distrital Municipal Nivel 4"];
							return colorsOrdenEntidad[8];
							break;
					case "-10":
							dataCategory = ["Territorial Distrital Municipal Nivel 5"];
							return colorsOrdenEntidad[9];
							break;
							break;
					case "-11":
							dataCategory = ["Territorial Distrital Municipal Nivel 6"];
							return colorsOrdenEntidad[10];
							break;
				}
			}
		}
	  
	  var tip = d3.tip()
		  .attr("class", "d3-tip")
		  .offset([-10, 0])
		  .html(function(d, i) {
			return searchData(i) + xCat + ": " + accounting.formatNumber(d[xCat]) + " %" + "<br>" + yCat + ": " + accounting.formatMoney(d[yCat]);
		  });
	 
	  var zoomBeh = d3.behavior.zoom()
		  .x(x)
		  .y(y)
		  //.scaleExtent([0, 500])
		  .on("zoom", zoom);
		
	  var svg = d3.select("#scatter")
		.append("svg")
		  .attr("width", outerWidth)
		  .attr("height", outerHeight)
		  .attr("id", 'SVG')
		.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		  .call(zoomBeh);
		 

	  svg.call(tip);

	  svg.append("rect")
		  .attr("width", width)
		  .attr("height", height);

	  svg.append("g")
		  .classed("x axis", true)
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.append("text")
		  .classed("label", true)
		  .attr("x", width)
		  .attr("y", margin.bottom - 10)
		  .style("text-anchor", "end")
		  .text(xCat + " " + textComplementXCat);

	  svg.append("g")
		  .classed("y axis", true)
		  .call(yAxis)
		.append("text")
		  .classed("label", true)
		  .attr("transform", "rotate(-90)")
		 /*  .attr("y", -margin.left) */
		 .attr("y", -margin.left + offsetYCatText)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text(textUnityYCat);

	  var objects = svg.append("svg")
		  .classed("objects", true)
		  .attr("width", width)
		  .attr("height", height);

	  objects.append("svg:line")
		  .classed("axisLine hAxisLine", true)
		  .attr("x1", 0)
		  .attr("y1", 0)
		  .attr("x2", width)
		  .attr("y2", 0)
		  .attr("transform", "translate(0," + height + ")");

	  objects.append("svg:line")
		  .classed("axisLine vAxisLine", true)
		  .attr("x1", 0)
		  .attr("y1", 0)
		  .attr("x2", 0)
		  .attr("y2", height);
		  
		objects.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		.classed("dot", true)
		.attr("r", function (d) { return (Math.log(d[rCat]) / Math.PI); })
		.attr("transform", transform)
		//.style("fill", function(d) { return color(d[colorCat]); })
		.style("fill", function(d,i) { return colorsCategories(i);} )
/*  		.on("mouseover", tip.show)
		.on("mouseout", tip.hide); */
		.on("click", tip.show)
		.on("mouseout", tip.hide);

		// Categoría del Modismo: Orden Entidad		
	var legend = svg.selectAll(".legend")
			//.data(color.domain())
			.data(dataCategory)
			.enter().append("g")
			.classed("legend", true)
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend.append("circle")
		  .attr("r", 3.5)
		  .attr("cx", width + 20)
		  //.attr("fill", color);
		  .attr("fill", function(d,i) { return colorsCategories(i);});

		legend.append("text")
		  .attr("x", width + 26)
		  .attr("dy", ".35em")
		  .text(function(d) { return d; });

		d3.select("#InPorcentajeExcesoPlazo").on("click", changeExcesoPlazo);
		d3.select("#InPorcentajeExcesoCosto").on("click", changeExcesoCosto);
		d3.select("#mySelectAno").on("click", changeFilters);
		d3.select("#mySelectOrdenEntidad").on("click", changeFilters);

		function changeExcesoPlazo() {
			xCat = "Exceso Tiempo";
			
			xMax = d3.max(data, function(d) { return d[xCat]; });
			xMin = d3.min(data, function(d) { return d[xCat]; });
			
			// console.log('changeExcesoPlazo: ' + xMin);
			// console.log('changeExcesoPlazo: ' + xMax);	

			zoomBeh.scaleExtent([0, yMax]);
			zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

			var svg = d3.select("#scatter").transition();

			svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat + " " + textComplementXCat);

			objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
			document.getElementById('InPorcentajeExcesoCosto').style.visibility = 'visible';
			//svg.call(tip);
		}
	  
		function changeExcesoCosto() {
			xCat = "Exceso Costo";

			xMax = d3.max(data, function(d) { return d[xCat]; }),
			xMin = d3.min(data, function(d) { return d[xCat]; }),
			xMin = xMin > 0 ? 0 : xMin;
			
			// console.log('changeExcesoCosto :' + xMin);
			// console.log('changeExcesoCosto :' + xMax);	
			
			zoomBeh.scaleExtent([0, yMax]);
			zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));
			
			var svg = d3.select("#scatter").transition();

			svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat + " " + textComplementXCat);
			objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
			//svg.call(tip);
		}

		function zoom() {
			svg.select(".x.axis").call(xAxis);
			svg.select(".y.axis").call(yAxis);

			svg.selectAll(".dot")
				.attr("transform", transform);
		}

		function transform(d) {
			return "translate(" + x(d[xCat]) + "," + y(d[yCat]/yUnity) + ")";
		}
		
	});
};

function refreshChart() {
	// console.log('Borrar Elementos');
	var container = document.getElementById("scatter");
	var svgElement = document.getElementById("SVG");
	
	if(svgElement){
		container.removeChild(svgElement);
	}
};



