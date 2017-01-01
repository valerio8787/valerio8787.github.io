var map, locator,
markers = [], displays = [];;

function initPage() {
	$.each(routes, function () {
		$("#routes").append('<button type="button" class="btn btn-sm btn-success route" data-routeId="' + this.routeID + '">' + this.title + '</button>');
	});
}

function clearMap()
{
	for (var key in markers)
	{
		markers[key].setMap(null);
	}
	for (var key in displays)
	{
		displays[key].setMap(null);
	}
	markers = [];
	displays = [];
}

function getRoutes()
{
	return routes;
}

function getRoute(routeID)
{
	for (var key in routes)
	{
		if (routes[key].routeID == routeID)
		{
			return routes[key];
		}
	}
	return null;
}


function showRoute(id)
{	
	var routeID = (typeof id !== "object") ? id : $(this).data('routeid');		
	clearMap();
    showMarkers(getRoute(routeID).places);
}

function showMarkers(places) {
	var first, last, points = [],
		i = 0;
	for (key in places)
    {
    	markers[key] = new google.maps.Marker({
		   map: map,
		   label: places[key].index,
	       position: new google.maps.LatLng(places[key].lat, places[key].lng),
	       title: places[key].title,	       
 		});
 		
 		attachDescription(markers[key], places[key]);
 		if (i === 0)
		{
			first = places[key].lat + "," + places[key].lng;
		}else if (i + 1 === places.length)
		{
			last = places[key].lat + "," + places[key].lng;
		}
		else if (places[key].useInDirection)
		{
			if (places[key].breakRoute)
			{
				showGoogleRoute(first, places[key].lat + "," + places[key].lng , points);		
				first = places[key].lat + "," + places[key].lng;
				points = [];
			}
			else {
				points.push({location: places[key].lat + "," + places[key].lng});
			}
		}	
		i++;
    }
    showGoogleRoute(first, last, points);
}

function initMap() {	
	// Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.8413454, lng: 24.0293867},
        scrollwheel: false,
        zoom: 14
    });

    google.maps.event.addListener(map, 'click', function(event){
        this.setOptions({scrollwheel:true});
    });
    
    showRoute($("button.route:first").data("routeid"));

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

function showGoogleRoute(first, last, points)
{	
	//console.log(first, last, points);
	var service = new google.maps.DirectionsService;
	var display = new google.maps.DirectionsRenderer({suppressMarkers: true});
    display.setMap(map);
	service.route({
	    origin: first,
	    destination: last,
	    waypoints: points,
	    travelMode: google.maps.TravelMode.WALKING,
	    optimizeWaypoints: true,
	    avoidTolls: true
	}, function(response, status) {
		console.log("Total distance: " + getTotalDistance(response));
		    if (status === google.maps.DirectionsStatus.OK) {
		      display.setDirections(response);
		    } else {
		      alert('Could not display directions due to: ' + status);
		    }
	});
	displays.push(display);
}

function getTotalDistance(response)
{	
	var total = 0;
	for (key in response.routes[0].legs)
	{
		total += response.routes[0].legs[key].distance.value;
	}
	return total;
}

initPage();

$("body").on("click", ".route", showRoute);