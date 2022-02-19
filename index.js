function findLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  });
}

async function onLoad() {
  const { latitude, longitude } = await findLocation();

  const map = L.map('map').setView(
    [latitude ?? 51.505, longitude ?? -0.09],
    13
  );

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);

  L.marker([latitude ?? 51.505, longitude ?? -0.09]).addTo(map);

  L.circle([latitude ?? 51.505, longitude ?? -0.09], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500,
  })
    .addTo(map)
    .bindPopup('I am a circle.');

  L.polygon([
    [latitude ?? 51.505, longitude ?? -0.09],
    [latitude ?? 51.505, longitude ?? -0.09],
    [latitude ?? 51.505, longitude ?? -0.09],
  ])
    .addTo(map)
    .bindPopup('I am a polygon.');

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);
}
