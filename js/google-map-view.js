(function(window, document, undefined) {
  var GoogleMapView = {};
  
  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;
  var GEOCODE_URL = 'http://maps.googleapis.com/maps/api/geocode/json';
  var API_KEY = 'AIzaSyB4NQtL9PBc0KOeCIY2n5rD0N4El6k09zw';

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
    var geocode_request = new XMLHttpRequest();
    geocode_request.addEventListener('load',function(){
    	var response = JSON.parse(geocode_request.responseText);
    	if(response.status != "OK"){
    		console.log("Failed to load address info ["+response.status+"].");
    		return;
    	}
    	var map = new google.maps.Map($map[0],{
      		center: response.results[0].geometry.location,
      		zoom: DEFAULT_ZOOM
    	});

    	var marker = new google.maps.Marker({
		    position: response.results[0].geometry.location,
		    map: map,
		    title: entryData.name
		});
    });
    geocode_request.open("GET",GEOCODE_URL+"?"+"address="+encodeURIComponent(entryData.address));
    geocode_request.send();
  };
  
  window.GoogleMapView = GoogleMapView;
})(this, this.document);
