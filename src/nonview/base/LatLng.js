export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get position() {
    return [this.lat - 0.0015, this.lng];
  }
}
