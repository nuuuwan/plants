export default class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  get position() {
    return [this.lat + 0.0011, this.lng];
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
  getNormalized(precision) {
    const [lat, lng] = [this.lat, this.lng];
    const latNorm = parseInt(lat / precision) * precision;
    const lngNorm = parseInt(lng / precision) * precision;
    return new LatLng(latNorm, lngNorm);
  }

  toString() {
    const floatToString = function (x) {
      const PRECISION = 4;
      return x.toFixed(PRECISION);
    };
    return `${floatToString(this.lat)},${floatToString(this.lng)}`;
  }

  static fromString(str) {
    const [lat, lng] = str.split(",").map(parseFloat);
    return new LatLng(lat, lng);
  }

  static getBounds(latLngList) {
    const latList = latLngList.map((latLng) => latLng.lat);
    const lngList = latLngList.map((latLng) => latLng.lng);
    const latMin = Math.min(...latList);
    const latMax = Math.max(...latList);
    const lngMin = Math.min(...lngList);
    const lngMax = Math.max(...lngList);
    return [
      [latMin, lngMin],
      [latMax, lngMax],
    ];
  }
}
