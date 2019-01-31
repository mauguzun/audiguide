const Locationtimer = {
  timer: null,
  interval: 7000,
  lat: null,
  lng: null,

  start() {
    let self = this;
    this.timer = setInterval(function() {
      self.location();
    }, self.interval);
  },

  location() {
    this.getCurrentPosition()
      .then(done => {
        if (
          this.lat == done.coords.latitude &&
          this.lng == done.coords.longitude
        ) {
          console.log("same place");
        } else {
          console.log("show");

          Points.FindPoint(done.coords.latitude, done.coords.longitude);
          Geo.ShowMyLocation(done.coords.latitude, done.coords.longitude);
          this.lat = done.coords.latitude;
          this.lng = done.coords.longitude;
        }

      
      })
      .catch(error => {
        console.log(error);
      })
      .finally(e => {});
  },
  getCurrentPosition() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true
        })
      );
    } else {
      return new Promise(resolve => resolve({}));
    }
  },
  stop() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
