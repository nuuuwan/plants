import { Format } from "../base";

export default class PlantNetResult {
  static LIMIT_LOW_CONFIDENCE = 0.1;
  static MAX_DISPLAY_COUNT = 2;
  static EMOJI_UNKNOWN = "❔";

  constructor(utAPICall, plantPhotoId, speciesNameToScore) {
    this.utAPICall = utAPICall;
    this.plantPhotoId = plantPhotoId;
    this.speciesNameToScore = speciesNameToScore;
  }

  get speciesName() {
    return Object.keys(this.speciesNameToScore)[0];
  }

  get speciesNameInitials() {
    if (!this.hasResults) {
      return PlantNetResult.EMOJI_UNKNOWN;
    }
    const speciesName = this.speciesName;
    const words = speciesName.split(" ");
    return words[0].substring(0, 1) + words[1].substring(0, 1);
  }

  get speciesNameInitialsIfConfident() {
    return this.isLowConfidence
      ? PlantNetResult.EMOJI_UNKNOWN
      : this.speciesNameInitials;
  }

  get confidence() {
    return this.speciesNameToScore[this.speciesName];
  }
  get hasResults() {
    return Object.keys(this.speciesNameToScore).length > 0;
  }
  get isLowConfidence() {
    return (
      !this.hasResults || this.confidence < PlantNetResult.LIMIT_LOW_CONFIDENCE
    );
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
    return Object.entries(this.speciesNameToScore)
      .filter(function ([speciesName, confidence], i) {
        return (
          confidence > PlantNetResult.LIMIT_LOW_CONFIDENCE ||
          i < PlantNetResult.MAX_DISPLAY_COUNT
        );
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
}
