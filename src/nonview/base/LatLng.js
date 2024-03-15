export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get position() {
    return [this.lat, this.lng + 0.001];
  }

  distanceTo(other, wLat = 1, wLng = 1) {
    const latDiff = this.lat - other.lat;
    const lngDiff = this.lng - other.lng;
    return latDiff * wLat + lngDiff * wLng;
  }

  get bounds() {
    const SPAN = 0.00004;
    return [
      [this.lat - SPAN, this.lng - SPAN],
      [this.lat + SPAN, this.lng + SPAN],
    ];
  }
}
