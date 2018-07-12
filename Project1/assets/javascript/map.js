    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBt0ybhT7-Ft1QM2BKmSpm1ixLYcSCwxOA",
        authDomain: "firstproject-62f58.firebaseapp.com",
        databaseURL: "https://firstproject-62f58.firebaseio.com",
        projectId: "firstproject-62f58",
        storageBucket: "firstproject-62f58.appspot.com",
        messagingSenderId: "614682014505"

    };
    firebase.initializeApp(config);
    var database = firebase.database();

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {
                lat: 44.9375,
                lng: -93.2010
            }

        });


        var geocoder = new google.maps.Geocoder();

        //call to firebase (reading to database)
        database.ref().on("value", function (snapshot) {
            let temp = [];
            snapshot.forEach(function (each) {
                temp.push(each.val());
            });

            console.log(temp);
            for (var i = 0; i < temp.length; i++) {
                var date = temp[i].EventDate + ' ' + temp[i].EventTime;
                var format = moment(date).format('LLL');
                var unixTime = moment(format).format('X');
                var now = moment().format('X');
                if (unixTime > now) {
                    geocodeAddress(geocoder, map, temp[i].EventTitle, temp[i].EventDate, temp[i].EventLocation, temp[i].EventTime, temp[i].EventDescription)
                }
           }
        })
        // Takes address from firebase and pins it to the map
        function geocodeAddress(geocoder, resultsMap, EventTitle, EventDate, EventLocation, EventTime, EventDescription) {
            geocoder.geocode({
                'address': EventLocation,
            }, function (results, status) {
                if (status === 'OK') {
                    resultsMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location,
                        icon: href = "assets/images/blue-marker.png"
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
                // adds text box to the map when clicked on
                var infoWindow = new google.maps.InfoWindow({
                    content: '<p>' + EventTitle + '<p>' + moment(EventDate).format('LLL') + '<p>' + '<p>' + EventLocation + '<p>' + '<p>' + EventTime + '<p>' + '<p>' + EventDescription + '<p>',
                });
                //geolocates your location if it is agreed in browser
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
                
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        //adds green pin to your location

                        var Geolocate = new google.maps.InfoWindow({

                        })
                        Geolocate.setPosition(pos);
                        Geolocate.setContent('You are Here');
                        Geolocate.open(map);
                        map.setCenter(pos);
                        var yourLocation = new google.maps.Marker({
                            map: resultsMap,
                            position: pos,
                            icon: href = "assets/images/free-3-green.png"
                        });
                        var yourLocation = new google.maps.Marker({



                        });
                        yourLocation.addListener('click', function () {
                            infoWindow.open(map, yourLocation);
                        });
                    }, function () {
                        handleLocationError(true, Geolocate, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, Geolocate, map.getCenter());
                }
            });

        }
    }