import { LatLng, Random } from "../base";

export default class PlantPhoto {
  constructor(id, ut, latLng, direction, imagePath) {
    this.id = id;
    this.ut = ut;
    this.latLng = latLng;
    this.direction = direction;
    this.imagePath = imagePath;
  }

  get urlImage() {
    return `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/images/${this.id}.jpg`;
  }

  get dateStr() {
    const date = new Date(this.ut * 1000);
    let dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };

    let formattedDate = date.toLocaleDateString("en-US", dateOptions);

    return formattedDate;
  }
  get timeOnlyStr() {
    const date = new Date(this.ut * 1000);

    let timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    let formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return formattedTime;
  }

  get timeStr() {
    return `${this.dateStr} · ${this.timeOnlyStr}`;
  }

  get latLngStr() {
    return `${this.latLng.lat.toFixed(2)}°N ${this.latLng.lng.toFixed(2)}°E`;
  }

  get directionStr() {
    const DIRECTIONS = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const directionHumanized =
      DIRECTIONS[Math.round(this.direction / 22.5) % 16];

    return `${directionHumanized} (${this.direction}°)`;
  }

  get photoInfoStr() {
    return `${this.timeStr} · ${this.latLngStr} · ${this.directionStr}`;
  }

  // Static

  static fromDict(d) {
    const id = d["id"];
    const ut = parseInt(d["ut"]);

    const dLatLng = d["latlng"];
    const lat = parseFloat(dLatLng["lat"]);
    const lng = parseFloat(dLatLng["lng"]);
    const latLng = new LatLng(lat, lng);

    // const originalImagePath = d["original_image_path"];
    const imagePath = d["image_path"];

    // const alt = parseFloat(d["alt"]);
    const direction = parseInt(d["direction"]);

    return new PlantPhoto(id, ut, latLng, direction, imagePath);
  }

  static async getRandomId() {
    const idx = await PlantPhoto.idx();
    const ids = Object.keys(idx);
    return Random.choice(ids);
  }
}
