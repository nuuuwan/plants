import { WWW, LngLat, Color, Random } from "../base";
import PlantNetResult from "./PlantNetResult";

export default class PlantPhoto {
  static COLOR_IDX = {};
  constructor(ut, lngLat, imagePath, plantResults) {
    this.ut = ut;
    this.lngLat = lngLat;
    this.imagePath = imagePath;
    this.plantResults = plantResults;
  }

  get id() {
    return this.imagePath;
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

  get latlng() {
    return {
      lat: this.lngLat.lat,
      lng: this.lngLat.lng,
    };
  }

  get bestGuess() {
    return this.plantResults[0];
  }

  get scientificName() {
    return this.bestGuess.scientificName;
  }

  get family() {
    return this.bestGuess.family;
  }

  get genus() {
    return this.bestGuess.genus;
  }

  get species() {
    return this.bestGuess.scientificName.split(" ")[1];
  }

  get authorship() {
    return this.bestGuess.authorship;
  }

  get shortText() {
    return this.genus.substring(0, 1) + this.species.substring(0, 1);
  }

  get timeStr() {
    const date = new Date(this.ut * 1000);
    return date.toLocaleString();
  }

  get color() {
    const key = this.family;
    if (!PlantPhoto.COLOR_IDX[key]) {
      PlantPhoto.COLOR_IDX[key] = Color.getRandomHex();
    }

    return PlantPhoto.COLOR_IDX[key];
  }

  // Static

  static fromDict(d) {
    const ut = parseInt(d["ut"]);

    const [latRaw, lngRaw] = d["latlng"];
    const lat = parseFloat(latRaw);
    const lng = parseFloat(lngRaw);
    const lngLat = new LngLat(lng, lat);

    const imagePath = d["image_path"];

    const plantResults = d["plantnet_results"].map(PlantNetResult.fromDict);

    return new PlantPhoto(ut, lngLat, imagePath, plantResults);
  }

  static async getRandomId() {
    const idx = await PlantPhoto.idx();
    const ids = Object.keys(idx);
    return Random.choice(ids);
  }

  static async listAll() {
    const rawDataList = await PlantPhoto.getRawDataList();
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

  static async getRawDataList() {
    const metadataPathList = await PlantPhoto.getMetaDataPathList();
    return await Promise.all(
      metadataPathList.map(async function (metadataPath) {
        const URL =
          "https://raw.githubusercontent.com" +
          "/nuuuwan/lk_plants/main/" +
          metadataPath;
        return await WWW.json(URL);
      })
    );
  }

  static async getMetaDataPathList() {
    const idxByFamily = await PlantPhoto.getIdxSummary();
    return Object.values(idxByFamily).reduce(function (arr, idxByGenus) {
      return Object.values(idxByGenus).reduce(function (arr, idxBySpecies) {
        return Object.values(idxBySpecies).reduce(function (
          arr,
          arrForSpecies
        ) {
          return arr.concat(arrForSpecies);
        },
        arr);
      }, arr);
    }, []);
  }

  static async getIdxSummary() {
    const URL =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/data" +
      "/metadata.idx_summary.json";
    return await WWW.json(URL);
  }
}
