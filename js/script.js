var map, locator;
function initMap() {
	var markers = [];
	// Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.449, lng: 30.521},
        scrollwheel: false,
        zoom: 14
    });

    google.maps.event.addListener(map, 'click', function(event){
        this.setOptions({scrollwheel:true});
    });
	
    for (key in places)
    {    	
    	markers[key] = new google.maps.Marker({
		   map: map,
	       position: new google.maps.LatLng(places[key].lat, places[key].lng),
	       title: places[key].title,	       
 		});
 		
 		attachDescription(markers[key], places[key]);
    }

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    }
}

function attachDescription(marker, place)
{
	var infowindow = new google.maps.InfoWindow({
	    content: '<div id="content"><h2>' + place.title + '</h2>' + place.description + '</div>'
	});

	marker.addListener('click', function() {
	    infowindow.open(marker.get('map'), marker);
	});
}

function showPosition(position)
{
	if (locator !== undefined)
	{
		locator.setMap(null);
	}
	locator = new google.maps.Marker({
		icon: "../img/location.png",
		map: map,
	    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
	    title: "",	       
    });	
}