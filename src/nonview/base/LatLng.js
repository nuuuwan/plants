export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get position() {
    return [this.lat, this.lng];
  }

  distanceTo(other, wLat = 1, wLng = 1) {
    const latDiff = this.lat - other.lat;
    const lngDiff = this.lng - other.lng;
    return latDiff * wLat + lngDiff * wLng;
  }

  get bounds() {
    const SPAN = 0.001;
    return [
      [this.lat - SPAN, this.lng - SPAN],
      [this.lat + SPAN, this.lng + SPAN],
    ];
  }

  toString() {
    const floatToString = function (x) {
      const PRECISION = 6;
      return x.toFixed(PRECISION);
    };
    return `${floatToString(this.lat)},${floatToString(this.lng)}`;
  }

  static fromString(str) {
    const [lat, lng] = str.split(",").map(parseFloat);
    return new LatLng(lat, lng);
  }
}
