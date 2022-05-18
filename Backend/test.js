function getReverseGeocodingData(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      var address = results[0].formatted_address;

      console.log(address, "adreass");
    }
  });
}
