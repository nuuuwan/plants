export default class PlantNetResult {
  constructor(confidence, scientificName, authorship, genus, family) {
    this.confidence = confidence;
    this.scientificName = scientificName;
    this.authorship = authorship;
    this.genus = genus;
    this.family = family;
  }

  static fromDict(d) {
    const species = d["species"];
    return new PlantNetResult(
      d["score"],
      species["scientificNameWithoutAuthor"],
      species["scientificNameAuthorship"],
      species["family"]["scientificName"],
      species["genus"]["scientificName"]
    );
  }
}
