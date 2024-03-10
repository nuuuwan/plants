import { WWW, LngLat, Random } from "../base";

export default class PlantPhoto {
  constructor(id, ut, lngLat, direction, imagePath) {
    this.id = id;
    this.ut = ut;
    this.lngLat = lngLat;
    this.direction = direction;
    this.imagePath = imagePath;
  }

  get urlImage() {
    return (
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/" +
      this.imagePath
    );
  }

  get bounds() {
    const SPAN = 0.001;
    return [
      [this.lngLat.lat - SPAN, this.lngLat.lng - SPAN],
      [this.lngLat.lat + SPAN, this.lngLat.lng + SPAN],
    ];
  }

  get position() {
    return [this.lngLat.lat - 0.0015, this.lngLat.lng];
  }

  get latlng() {
    return {
      lat: this.lngLat.lat,
      lng: this.lngLat.lng,
    };
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
    return `${this.latlng.lat.toFixed(4)}°N ${this.latlng.lng.toFixed(4)}°E`;
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

    const latLng = d["latlng"];
    const lat = parseFloat(latLng["lat"]);
    const lng = parseFloat(latLng["lng"]);
    const lngLat = new LngLat(lng, lat);

    // const originalImagePath = d["original_image_path"];
    const imagePath = d["image_path"];

    // const alt = parseFloat(d["alt"]);
    const direction = parseInt(d["direction"]);

    return new PlantPhoto(id, ut, lngLat, direction, imagePath);
  }

  static async getRandomId() {
    const idx = await PlantPhoto.idx();
    const ids = Object.keys(idx);
    return Random.choice(ids);
  }

  static async getPlantPhotoIds() {
    const URL =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/data" +
      "/plant_photos.contents.json";
    return await WWW.json(URL);
  }

  static async getPlantPhotoRawDataList() {
    const plantPhotoIds = await PlantPhoto.getPlantPhotoIds();
    return await Promise.all(
      plantPhotoIds.map(async function (plantPhotoId) {
        const URL = `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/plant_photos/${plantPhotoId}.json`;
        return await WWW.json(URL);
      })
    );
  }

  static async listAll() {
    const rawDataList = await PlantPhoto.getPlantPhotoRawDataList();
    console.debug(`Loaded ${rawDataList.length} plant photos`);
    return rawDataList.map(function (d) {
      return PlantPhoto.fromDict(d);
    });
  }

  static async idx() {
    const arr = await PlantPhoto.listAll();
    return Object.fromEntries(
      arr.map(function (plantPhoto) {
        return [plantPhoto.id, plantPhoto];
      })
    );
  }
}
