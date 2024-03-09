import { WWW, LngLat } from "../base";
import PlantNetResult from "./PlantNetResult";

export default class PlantPhoto {
  constructor(ut, latLng, imagePath, plantResults) {
    this.ut = ut;
    this.latLng = latLng;
    this.imagePath = imagePath;
    this.plantResults = plantResults;
  }

  static fromDict(d) {
    const ut = parseInt(d["ut"]);

    const [latRaw, lngRaw] = d["latlng"];
    const lat = parseFloat(latRaw);
    const lng = parseFloat(lngRaw);
    const latLng = new LngLat(lng, lat);

    const imagePath = d["image_path"];

    const plantResults = d["plantnet_results"].map(PlantNetResult.fromDict);

    return new PlantPhoto(ut, latLng, imagePath, plantResults);
  }

  static async listAll() {
    const rawDataList = await PlantPhoto.getRawDataList();
    return rawDataList.map(function (d) {
      return PlantPhoto.fromDict(d);
    });
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
