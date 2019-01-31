const Geo = {
  map: null,
  points: null,
  lat: 43.6966095,
  lng: 7.2811035,
  current: null,

  Load() {
    this.map = new google.maps.Map(document.getElementById("gmap"), {
      center: { lat: 56.9577312, lng: 24.1832039 },
      zoom: 17,
      disableDefaultUI: true
    });
  },
  SetPoints(points) {
    this.points = [];

    points.forEach(element => {
      let marker = new google.maps.Marker({
        map: this.map,
        position: { lat: element.lat, lng: element.lng },
        title: element.title
      });

      this.points.push(marker);
    });
  },
  ShowMyLocation(lat, lng) {
    if (this.current == null) {
      this.current = new google.maps.Marker({
        map: this.map,
        position: { lat: lat, lng: lng },
        title: "im here" ,
        icon : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
    }
    this.current.setPosition({ lat: lat, lng: lng })
    this.map.setCenter({ lat: lat, lng: lng });
  }
};
