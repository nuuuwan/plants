import { WWW } from "../base";

export default class PlantNetResult {
  constructor(utAPICall, plantPhotoId, speciesNameToScore) {
    this.utAPICall = utAPICall;
    this.plantPhotoId = plantPhotoId;
    this.speciesNameToScore = speciesNameToScore;
  }

  static fromDict(d) {
    return new PlantNetResult(
      d["ut_api_call"],
      d["[plant_photo_id"],
      d["species_name_to_score"]
    );
  }

  static getURLFromId(id) {
    return `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/plant_net_results/${id}.json`;
  }

  static async fromPlantPhoto(plant_photo) {
    const url = PlantNetResult.getURLFromId(plant_photo.id);
    const d = await WWW.json(url);
    return PlantNetResult.fromDict(d);
  }
}
