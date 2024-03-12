export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get position() {
    return [this.lat - 0.0004, this.lng];
  }

  distanceTo(other, wLat = 1, wLng = 1) {
    const latDiff = this.lat - other.lat;
    const lngDiff = this.lng - other.lng;
    return latDiff * wLat + lngDiff * wLng;
  }
}
