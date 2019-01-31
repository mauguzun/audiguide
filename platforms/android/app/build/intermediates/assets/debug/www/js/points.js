const Points = {
  distance: 0.5, // 500 metter
  stillSamePlace: 0.01, // 10 metter
  points: [],
  lat: null,
  lng: null,

  FindPoint(lat, lng) {
    if (this.lat == lat && this.lng == lng) {
      return;
    } else if (
      this.distanceInKmBetweenEarthCoordinates(lat, lng, this.lat, this.lng) <
      this.stillSamePlace
    ) {
      return;
    }

    this.lat = lat;
    this.lng = lng;

    for (let pointIndex in this.points) {
      this.points[
        pointIndex
      ].distance = this.distanceInKmBetweenEarthCoordinates(
        lat,
        lng,
        this.points[pointIndex].lat,
        this.points[pointIndex].lng
      );
      console.log(this.points[pointIndex].distance);
    }

    let clear = this.points.filter(x => x.distance < this.distance);

    if (clear.length > 0) {
      clear.sort((a, b) =>
        a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
      );
      Mainplayer.Play(clear[0].audio);
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
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  },
  degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  },

  Load() {
    this.points.push(
      {
        lat: 56.9556924,
        audio: "http://www.noiseaddicts.com/samples_1w72b820/4031.mp3",
        lng: 24.190628100000026,
        id: 1,
        title:
          "Mēbeļu nams , AS, Улица Дзелзавас, Vidzemes priekšpilsēta, Рига, Латвия"
      },
      {
        lat: 56.950509,
        audio: "http://www.noiseaddicts.com/samples_1w72b820/4032.mp3",
        lng: 24.2075016,
        id: 2,
        title:
          "Riga Secondary School № 84, Vidzemes priekšpilsēta, Рига, Латвия"
      },
      {
        lat: 56.9515089,
        audio: "http://www.noiseaddicts.com/samples_1w72b820/4033.mp3",
        lng: 24.210785999999985,
        id: 3,
        title:
          "Shashlick House, Lielvārdes iela, Vidzemes priekšpilsēta, Рига, Латвия"
      },
      {
        lat: 56.953304,
        audio: "http://www.noiseaddicts.com/samples_1w72b820/4034.mp3",
        lng: 24.208990099999937,
        id: 4,
        title:
          "Autoserviss 'Krons Auto', Улица Дзелзавас, Vidzemes priekšpilsēta, Рига, Латвия"
      },
      {
        lat: 56.9562203,
        audio: "http://www.noiseaddicts.com/samples_1w72b820/4035.mp3",
        lng: 24.197816099999955,
        id: 5,
        title: "Aleksandrs Ltd"
      }
    );
  }
};
