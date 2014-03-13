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
			var marker;
			var infowindow = new google.maps.InfoWindow();
			var places;
			var tstopsData;
			var linecolor;
			var stations;
			var stationsData = new XMLHttpRequest();

			function init()
			{
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				request.open("get", "latlang.json", true);
				request.send(null);
				request.onreadystatechange = callback;
				//stations = JSON.parse(request.responseText);

				getMyLocation();
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
				marker = new google.maps.Marker({
					position: me,
					title: "Here I Am!"
				});
				marker.setMap(map);
				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
				console.log('Next is get T info');
				
				request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
				request.send(null);
				request.onreadystatechange = dataReady;

				//Get T info
				/*request.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
				request.send(null);
				callback();*/

/*				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});

				// Calling Google Places API
				var request = {
					location: me,
					radius: '500',
					types: ['food']
				};
				service = new google.maps.places.PlacesService(map);
				service.search(request, callback);*/
			}

			// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
			/*function callback(results, status)
			{
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					alert("Got places back!");
					places = results;
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}*/

	/*		function createMarker()
			{
				console.log("In createMarker");



				var marker = new google.maps.Marker({
					map: map,
					position: 
				}

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});*/

			    /*function parse()
				{
				request.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
				request.send(null);
				request.onreadystatechange = callback;*/

			function callback() 
			{
        		console.log("In callback");
        		if (request.readyState == 4 && request.status == 200) 
        		{
           			str = request.responseText;
           			stations = JSON.parse(str);
//            		linecolor = data["line"];  
       			 }
   			 }

   			 function dataReady(){
   			 	console.log(request.readyState, request.status);
   			 	if (request.readyState == 4 && request.status == 200) 
        		{
           			tstopsData = JSON.parse(request.responseText);
//            		linecolor = data["line"];
//            		tstopsDom = document.getElementById("schedule");
 //           		tstopsDom.innerHTML = tstopsData["schedule"] 
 					markStops();


       			 } else if (request.readyState == 4 && request.status == 500){
       			 	console.log("ERROR-Y Stuff!");
       			 }

   			 }

   			 function markStops(){
   			 	linecolor = tstopsData['line'];

   			 	for (var i=0; i<stations[linecolor].length; i++){
   			 		var mark = new google.maps.LatLng(stations[linecolor][i]['lat'], stations[linecolor][i]['long']);
   			 		
   			 		marker = new google.maps.Marker({
					position: mark,
					title: stations[linecolor][i]['stop']
				});
				marker.setMap(map);

	   			 	google.maps.event.addListener(mark, 'click', function() {
						infowindow.close();
						infowindow.setContent(stations[linecolor][i]['stop']);
						infowindow.open(map, this);
					});
				}
			}


 





