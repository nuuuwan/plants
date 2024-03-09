export default class PlantNetResult {
  constructor(
    confidence,
    scientificName,
    authorship,
    genus,
    family,
    commonNames
  ) {
    this.confidence = confidence;
    this.scientificName = scientificName;
    this.authorship = authorship;
    this.genus = genus;
    this.family = family;
    this.commonNames = commonNames;
  }

  static fromDict(d) {
    const species = d["species"];
    return new PlantNetResult(
      d["score"],
      species["scientificNameWithoutAuthor"],
      species["scientificNameAuthorship"],

      species["genus"]["scientificName"],
      species["family"]["scientificName"],
      species["commonNames"]
    );
  }

  get confidenceStr() {
    return (this.confidence * 100).toFixed(0) + "%";
  }

  get scientificNameAndConfidence() {
    return this.scientificName + " (" + this.confidenceStr + ")";
  }
}
