import { WWW, LatLng, Random } from "../base";

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

  get timeStr() {
    const date = new Date(this.ut * 1000);
    let dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    let timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    let formattedDate = date.toLocaleDateString("en-US", dateOptions);
    let formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedTime} · ${formattedDate}`;
  }

  get latLngStr() {
    return `${this.latLng.lat.toFixed(4)}°N ${this.latLng.lng.toFixed(4)}°E`;
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
    return `${this.timeStr} · ${this.latLngStr} · Facing ${this.directionStr}`;
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

  static getURLFromId(id) {
    return `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/plant_photos/${id}.json`;
  }

  static async fromId(id) {
    const URL = PlantPhoto.getURLFromId(id);
    return await WWW.json(URL);
  }

  static async getPlantPhotoRawDataList() {
    const plantPhotoIds = await PlantPhoto.getPlantPhotoIds();
    return await Promise.all(
      plantPhotoIds.map(async function (plantPhotoId) {
        const URL = PlantPhoto.getURLFromId(plantPhotoId);
        return await WWW.json(URL);
      })
    );
  }

  static async getPlantPhotoIds() {
    const URL =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/data" +
      "/plant_photos.contents.json";
    const plantPhotoIds = await WWW.json(URL);
    return plantPhotoIds.splice(0, 10);
  }

  static async listAll() {
    const rawDataList = await PlantPhoto.getPlantPhotoRawDataList();
    console.debug(`Loaded ${rawDataList.length} plant photos`);
    return rawDataList.map(function (d) {
      return PlantPhoto.fromDict(d);
    });
  }
}
