import { WWW, Format } from "../base";

export default class PlantNetResult {
  static LIMIT_LOW_CONFIDENCE = 0.2;
  static MAX_DISPLAY_COUNT = 5;

  constructor(utAPICall, plantPhotoId, speciesNameToScore) {
    this.utAPICall = utAPICall;
    this.plantPhotoId = plantPhotoId;
    this.speciesNameToScore = speciesNameToScore;
  }

  get speciesName() {
    return Object.keys(this.speciesNameToScore)[0];
  }

  get speciesNameConditioned() {
    let s = this.speciesName;
    if (this.isLowConfidence) {
      s += "❓";
    }
    return s;
  }

  get confidence() {
    return this.speciesNameToScore[this.speciesName];
  }

  get isLowConfidence() {
    return this.confidence < PlantNetResult.LIMIT_LOW_CONFIDENCE;
  }

  get hasResults() {
    return Object.keys(this.speciesNameToScore).length > 0;
  }

  static speciesScoreStr(speciesName, score) {
    return `${speciesName} ${Format.percent(score)}`;
  }

  get confidenceStrAll() {
    return Object.entries(this.speciesNameToScore)
      .map(function ([speciesName, confidence]) {
        return PlantNetResult.speciesScoreStr(speciesName, confidence);
      })
      .join(", ");
  }

  get confidenceStrImportant() {
    return Object.entries(this.speciesNameToScore).filter(function([speciesName, confidence], i) {
      return confidence > PlantNetResult.LIMIT_LOW_CONFIDENCE || i < PlantNetResult.MAX_DISPLAY_COUNT;
    })
      .map(function ([speciesName, confidence]) {
        return PlantNetResult.speciesScoreStr(speciesName, confidence);
      })
      .join(", ");
  }

  static fromDict(d) {
    return new PlantNetResult(
      d["ut_api_call"],
      d["plant_photo_id"],
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
