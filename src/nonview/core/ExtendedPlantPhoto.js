import PlantNetResult from "./PlantNetResult";
import Species from "./Species";
import PlantPhoto from "./PlantPhoto";
import { WWW } from "../base";

export default class ExtendedPlantPhoto {
  constructor(plantPhoto, plantNetResult, species) {
    this.plantPhoto = plantPhoto;
    this.plantNetResult = plantNetResult;
    this.species = species;
  }

  get id() {
    return this.plantPhoto.id;
  }

  get speciesName() {
    return this.species.name;
  }

  getDistance(other) {
    if (this.id === other.id) {
      return 0;
    }

    if (this.plantNetResult.isLowConfidence) {
      return 5;
    }

    if (other.plantNetResult.isLowConfidence) {
      return 4;
    }

    if (this.speciesName === other.speciesName) {
      return 1;
    }
    if (this.species.genusName === other.species.genusName) {
      return 2;
    }
    if (this.species.familyName === other.species.familyName) {
      return 3;
    }
    return 4;
  }

  static async listAll() {
    const idx = await ExtendedPlantPhoto.idx();
    return Object.values(idx);
  }

  static async idxRaw() {
    const urlIdx =
      "https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data_app/ext_plant_photo_idx.json";
    const idxRaw = await WWW.json(urlIdx);
    const n = Object.keys(idxRaw).length;
    console.log(`Loaded ${n} Raw ExtendedPlantPhotos`);
    return idxRaw;
  }

  static async idx() {
    const idxRaw = await ExtendedPlantPhoto.idxRaw();
    const idx = Object.fromEntries(
      Object.entries(idxRaw).map(function ([id, eppRaw]) {
        const plantPhoto = PlantPhoto.fromDict(eppRaw);
        const plantNetResult = PlantNetResult.fromDict(
          eppRaw["plant_net_result"]
        );
        const species = eppRaw["species"]
          ? Species.fromDict(eppRaw["species"])
          : undefined;
        return [
          id,
          new ExtendedPlantPhoto(plantPhoto, plantNetResult, species),
        ];
      })
      // .filter((entry) => !entry[1].plantNetResult.isLowConfidence)
    );
    const n = Object.keys(idx).length;
    console.log(`Loaded ${n} ExtendedPlantPhotos`);
    return idx;
  }
}
