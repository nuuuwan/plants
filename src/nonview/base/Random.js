export default class Random {
  static float(minValue, maxValue) {
    return minValue + Math.random() * (maxValue - minValue);
  }

  static int(minValue, maxValue) {
    return parseInt(Random.float(minValue, maxValue));
  }

  static choice(arr) {
    return arr[Random.int(0, arr.length)];
  }
}
