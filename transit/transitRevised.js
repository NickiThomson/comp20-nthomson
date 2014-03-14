// Transit Remake
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
			zoom: 13, // The larger the zoom number, the bigger the zoom
			center: me,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var markers = new Array();
var meMarker;
var infowindow = new google.maps.InfoWindow();
var places;
var tstopsData;
var linecolor;
var stations;
var stationsData = new XMLHttpRequest();
var pathCoords = new Array();
var pathCoords2 = new Array();
var infowindows = new Array();

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	request.open("get", "latlang.json", true);
	request.send(null);
	request.onreadystatechange = callback;
	//stations = JSON.parse(request.responseText);
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	meMarker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
	});
	meMarker.setMap(map);
	// Open info window on click of marker
	google.maps.event.addListener(meMarker, 'click', function() {
		infowindow.setContent(meMarker.title);
		infowindow.open(map, meMarker);
	});
	console.log('Next is get T info');
	
	request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	request.send(null);
	request.onreadystatechange = dataReady;

}

function callback() 
{
	console.log("In callback");
	if (request.readyState == 4 && request.status == 200) 
	{
		str = request.responseText;
		stations = JSON.parse(str);
		getMyLocation(); 
	}
}

 function dataReady(){
 	console.log(request.readyState, request.status);
 	if (request.readyState == 4 && request.status == 200) 
	{
		tstopsData = JSON.parse(request.responseText);
		markStops();


	 } else if (request.readyState == 4 && request.status == 500){
	 	console.log("ERROR-Y Stuff!");
	 }

 }

function markStops(){
	linecolor = tstopsData['line'];

	for (var i=0; i<stations[linecolor].length; i++){
		var mLat = stations[linecolor][i]['lat'];
		var mLong = stations[linecolor][i]['long'];
		var mark = new google.maps.LatLng(mLat, mLong);
		var iconcolor;
		/*if (linecolor=='red'){
			iconcolor = 'star.png';
		} else if (linecolor == 'blue'){
			iconcolor = 'starblue.png';
		} else if (linecolor =='orange'){
			iconcolor = 'starorange.png';
		}*/
		iconcolor = 'starorange.png'
		if (i< 18 || linecolor != 'red'){
			pathCoords[i] = new google.maps.LatLng(mLat, mLong);
		}
		if (i== 12 && linecolor == 'red'){
			pathCoords2[0] = new google.maps.LatLng(mLat, mLong);
		}
		if (i>= 18 && linecolor == 'red'){
			pathCoords2[i-17] = new google.maps.LatLng(mLat, mLong);
		}

	markers[i] = new google.maps.Marker({
		position: mark,
		title: stations[linecolor][i]['stop'],

		//icon: iconcolor

	});

	console.log(linecolor);
	markers[i].setMap(map);
	infowindows[i] = new google.maps.InfoWindow();
	infowindows[i].setContent(stations[linecolor][i]['stop']);

		 google.maps.event.addListener(markers[i], 'click', makeMapListener(infowindows[i], markers[i]));

		 	/*function(i) {
			//infowindow.close();
			//infowindow.setPosition(markers[i].position);
			//infowindow.setContent(stations[linecolor][0]['stop']);
			return function(){
				console.log('in addListener function');
				infowindows[i].setContent("You found a station!");
				infowindows[i].open(map, markers[i]);
			}
		});*/
	}
	createPolyLine(pathCoords);
	if (linecolor == 'red'){
		createPolyLine(pathCoords2);
	}
}

function createPolyLine(pcoords){

	console.log('in polyline bro');


		if (linecolor == 'red'){
			color = '#DF0101';
		} else if (linecolor == 'blue'){
			color = '#0000FF';
		} else {
			color = '#FE9A2E';
		}
	var Path = new google.maps.Polyline({
		path: pcoords,
		geodesic: true,
		strokeColor: color,
		strokeOpacity: 1,
		strokeWeight: 2
	});

	Path.setMap(map);
}

function makeMapListener(window, m) {
  return function() { 
  	for (key in infowindows){
  		infowindows[key].close();
  	}
  	infowindow.close();
  	window.open(map, m); 
  };
}

