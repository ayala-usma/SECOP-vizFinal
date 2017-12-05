var dataFile;
var ordenEntidadFilter;
var filtered;

function changeFilters() {

	var anoSelectedIndex = document.getElementById("mySelectAno").selectedIndex;
	ordenEntidadFilter = document.getElementById("mySelectOrdenEntidad").value;
	
	console.log(anoSelectedIndex);
	console.log(ordenEntidadFilter);
	
	switch (anoSelectedIndex) {
		case 0:
			dataFile = 'Secop_2006-2010';
			break;
		case 1:
			dataFile = 'Secop_2011-2011';
			break;
		case 2:
			dataFile = 'Secop_2012-2012';
			break;
		case 3:
			dataFile = 'Secop_2013-2013';
			break;
		case 4:
			dataFile = 'Secop_2014-2015';
			break;
	}
	
	if (ordenEntidadFilter != 'all') {
		dataFile = dataFile + ordenEntidadFilter;
	}
	
	dataFile = dataFile + '.csv';
	console.log('Data file: ' + dataFile);

	refreshChart();
	ChartScatterPlot();
	document.getElementById('btnviz').style.visibility = 'hidden';
	document.getElementById('InPorcentajeExcesoCosto').style.visibility = 'visible';
	document.getElementById('InPorcentajeExcesoPlazo').style.visibility = 'visible';
}