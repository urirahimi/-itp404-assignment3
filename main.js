const geocoder = new google.maps.Geocoder();
const infowindow = new google.maps.InfoWindow();

navigator.geolocation.getCurrentPosition(position => {
  currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  let map = new google.maps.Map(document.getElementById("map"), {
    center: currentLocation,
    zoom: 11
  });
  geocodeLatLng(geocoder, map, infowindow, position.coords.latitude, position.coords.longitude);
});

function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
  const latlngString = lat + "," + lng;
  const latlngStr = latlngString.split(",", 2);
  const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  geocoder.geocode({ location: latlng }, function(results, status) {
    if (status === "OK") {
      if (results[0]) {
        map.setZoom(11);

        const image = {
          url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 20),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0)
        };
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: image
          //   animation: google.maps.Animation.BOUNCE
        });
        infowindow.setContent(results[0].formatted_address);

        google.maps.event.addListener(marker, "click", function() {
          infowindow.open(map, marker);
        });
      } else {
        window.alert("No results found");
      }
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
