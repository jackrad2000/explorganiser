var map;
var infowindow = new google.maps.InfoWindow();
var directions = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

function initialize() {
    var mapOptions = {
        zoom: 14
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            google.maps.event.addListener(marker, 'click', function()
            {
                infowindow.close();
                infowindow.setContent('<div><h4>You are here!</h4></div>');
                infowindow.open(map, this);
            });

            map.setCenter(pos);
            var request = {location: pos, radius: '5000', types: ['art_gallery', 'aquarium', 'amusement_park', 'museums', 'stadium', 'shopping_mall']};
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
            directionsDisplay.setMap(map);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon:{
            // Star
            path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
            fillColor: '#ffff00',
            fillOpacity: 1,
            scale: 1/2,
            strokeColor: '#bd8d2c',
            strokeWeight: 1
        }
    });

    google.maps.event.addListener(marker, 'click', function()
    {
        infowindow.close();

        navigator.geolocation.getCurrentPosition(function(position) {
            var pinpos = place.geometry.location;
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var rating = place.rating;
            var opentimes = place.opening_hours;
            if (rating == undefined) {
                rating = 'No ratings available';
            } else {
                rating = rating + "/5";
            }
            if (opentimes == undefined) {
                opentimes = '<h6>No opening hours available</h6>';
            } else {
                if (place.opening_hours.open_now == true) {
                    opentimes = '<h6 style="color:green">Open now</h6>';
                } else {
                    opentimes = '<h6 style="color:red">Closed now</h6>';
                }
            }
            infowindow.setContent('<div><h4>' + place.name + '</h4><h6>Rating: ' + rating + '</h6><h6>Distance: ' + +(google.maps.geometry.spherical.computeDistanceBetween(pos, pinpos)*0.000621371192).toFixed(2) + ' miles</h6>' + opentimes + '<button type="button" id="infobutton" data-info=\'' + place.place_id + '\' class="btn btn-default btn-block" data-toggle="modal" data-target=".info-modal">More info</button></div>');
            var request = {
                origin:pos,
                destination:pinpos,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directions.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }, function() {
            handleNoGeolocation(true);
        });

        infowindow.open(map, this);
    });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
