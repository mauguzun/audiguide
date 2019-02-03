app.pages.map = new Vue({
  el: "#vue_page_map",
  data: {
    display: true,

    mapOptions: {
      map: null,
      location: null,
      markers: null
    },

    timer: null,
    timerOptions: {
      inetral: 7000
    },

    pointsOptions: {
      pointDistance: 0.5,
      samePlace: 0.01,
      feautrePointDistance: 0.9
    },

    mainPlayer: null,
    extraPlayer: null,

    activePoint: null,
    extraPoint: null,
    feautrePoints: null,

    currentLat: null,
    currentLng: null,
    prevLat: null,
    prevLng: null,
    points: null
  },
  methods: {
    timerStart() {
      this.timerStop();
      const self = this;
      this.timer = setInterval(function() {
        self.timerAction();
      }, self.timerOptions.inetral);
    },
    timerStop() {
      if (this.timer != null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    timerAction() {
      this.getCurrentPosition()
        .then(done => {
          if (
            this.currentLat == done.coords.latitude &&
            this.currentLng == done.coords.longitude
          ) {
            console.log("same place");
          } else {
            console.log("show");
            // save old
            this.prevLat = this.currentLat;
            this.prevLng = this.currentLng;
            // set new
            this.currentLat = done.coords.latitude;
            this.currentLng = done.coords.longitude;
            // show map
            this.mapMyLocation();
            // soirt  points
            this.sortPoints();
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

    start() {
      if (this.mapOptions.map == null) {
        this.makeMap();
      }
    },

    makeMap() {
      this.mapLoad();

      // faster !!!!
      this.timerAction();
      ////
      this.points = PointManager.Load();
      /// todo promise
      this.mapSetMarkers();
      this.timerStart();
    },

    // points sort methods
    sortPoints() {
      if (
        this.distanceInKmBetweenEarthCoordinates(
          this.prevLat,
          this.prevLng,
          this.currentLat,
          this.currentLng
        ) < this.pointsOptions.samePlace
      ) {
        // console.log("we are same place");
        // return;
      }

      for (let ind in this.points) {
        this.points[ind].distance = this.distanceInKmBetweenEarthCoordinates(
          this.currentLat,
          this.currentLng,
          this.points[ind].lat,
          this.points[ind].lng
        );
        console.log(this.points[ind].distance + " " + this.points[ind].title);
      }

      let clear = this.points.filter(
        x => x.distance < this.pointsOptions.pointDistance && x.active == true
      );

      let play = null;
      if (clear.length > 0) {
        clear.sort((a, b) =>
          a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
        );
        play = clear[0];
        this.play(play);
      }

      if (play) {
        this.feautrePoints = this.points.filter(
          x =>
            x.distance < this.pointsOptions.feautrePointDistance &&
            x.active == true &&
            x.id != play.id
        );
      } else {
        this.feautrePoints = this.points.filter(
          x =>
            x.distance < this.pointsOptions.feautrePointDistance &&
            x.active == true
        );
      }
    },
    distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(lat2 - lat1);
      var dLon = this.degreesToRadians(lon2 - lon1);

      lat1 = this.degreesToRadians(lat1);
      lat2 = this.degreesToRadians(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },

    // map methods
    mapLoad() {
      this.mapOptions.map = new google.maps.Map(
        document.getElementById("gmap"),
        {
          center: { lat: 56.9577312, lng: 24.1832039 },
          zoom: 17,
          disableDefaultUI: true
        }
      );
    },
    mapMyLocation() {
      let point = { lat: this.currentLat, lng: this.currentLng };
      if (this.mapOptions.location == null) {
        this.mapOptions.location = new google.maps.Marker({
          map: this.mapOptions.map,
          position: point,
          title: "You are here",
          icon:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
      }
      this.mapOptions.location.setPosition(point);
      this.mapOptions.map.setCenter(point);
    },
    mapSetMarkers() {
      this.mapOptions.markers = [];

      this.points.forEach(element => {
        console.log(element);
        let marker = new google.maps.Marker({
          map: this.mapOptions.map,
          position: { lat: element.lat, lng: element.lng },
          title: element.title
        });
        // on click

        this.mapOptions.markers.push(marker);
      });
    },

    play(point) {
      if (
        this.mainPlayer != null &&
        this.mainPlayer.mediaStatus == Media.MEDIA_RUNNING
      ) {
        // extra +return ;
        playExtra(point);
        return;
      }
      // stop pls
      if (this.mainPlayer != null) {
        this.mainPlayer.stop();
      }

      this.points.find(e => e.id == point.id).active = false;
      this.activePoint = point;

      this.mainPlayer = new Media(point.audio, e => {
        this.mainPlayer = null;
        this.activePoint = null;
      });
      // set point -> playaed
      this.mainPlayer.play();
    },
    playExtra(point) {
      new Media(
        "http://soundbible.com/mp3/Beep%20Ping-SoundBible.com-217088958.mp3"
      ).play();
      this.extraPoint = point;
    },
    // click play extra point
    pressExtra(arg) {
      //
      let point  = this.points.find(e => e.id == arg);
      // clear extra if same
      if (this.extraPoint && this.extraPoint.id == point.id )
      {
        this.extraPoint = null;
      }
      this.playerClear();
      this.play(point);
    
    },
    closeExtra() {
      this.extraPoint = null;
    },

    playerClear() {
      if (this.mainPlayer != null) {
        this.mainPlayer.stop();
      }
      this.mainPlayer = null;
      this.activePoint = null;
    }
  }
});
