export default class Format {
  static percent(x) {
    return (x * 100).toFixed(0) + "%";
  }

  static dateStr(x) {
    let dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };

    return x.toLocaleDateString("en-US", dateOptions);
  }

  static timeOnlyStr(x) {
    let timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return x.toLocaleTimeString("en-US", timeOptions);
  }

  static dateTimeStr(x) {
    return `${Format.dateStr(x)} · ${Format.timeOnlyStr(x)}`;
  }
}
