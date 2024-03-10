import PlantNetResult from "./PlantNetResult";
import Species from "./Species";
import PlantPhoto from "./PlantPhoto";

export default class ExtendedPlantPhoto {
  constructor(plantPhoto, plantNetResult, speciesList) {
    this.plantPhoto = plantPhoto;
    this.plantNetResult = plantNetResult;
    this.speciesList = speciesList;
  }

  get id() {
    return this.plantPhoto.id;
  }

  get speciesIdx() {
    return Object.fromEntries(
      this.speciesList.map(function (species) {
        return [species.name, species];
      })
    );
  }

  get speciesName() {
    return Object.keys(this.plantNetResult.speciesNameToScore)[0];
  }

  get species() {
    return this.speciesIdx[this.speciesName];
  }

  static async fromPlantPhoto(plantPhoto) {
    const plantNetResult = await PlantNetResult.fromPlantPhoto(plantPhoto);
    const speciesNameToScore = plantNetResult.speciesNameToScore;
    const speciesNames = Object.keys(speciesNameToScore);
    const speciesList = await Species.listFromNames(speciesNames);
    return new ExtendedPlantPhoto(plantPhoto, plantNetResult, speciesList);
  }

  static async listAll() {
    const plantPhotos = await PlantPhoto.listAll();
    return await Promise.all(
      plantPhotos.map(async function (plantPhoto) {
        return await ExtendedPlantPhoto.fromPlantPhoto(plantPhoto);
      })
    );
  }

  static async idx() {
    const arr = await ExtendedPlantPhoto.listAll();
    return Object.fromEntries(
      arr.map(function (arrItem) {
        return [arrItem.id, arrItem];
      })
    );
  }
}
