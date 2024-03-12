import { WWW } from "../base";
export default class Species {
  static DELIM_COMMON_NAMES = ", "
  constructor(
    name,
    authorship,
    genusName,
    familyName,
    gbifId,
    powoId,
    iucnId,
    iucnCategory,
    commonNames
  ) {
    this.name = name;
    this.authorship = authorship;
    this.genusName = genusName;
    this.familyName = familyName;
    this.gbifId = gbifId;
    this.powoId = powoId;
    this.iucnId = iucnId;
    this.iucnCategory = iucnCategory;
    this.commonNames = commonNames;
  }

  get speciesName() {
    return this.name.split(" ")[1];
  }

  static fromDict(d) {
    return new Species(
      d["name"],
      d["authorship"],
      d["genus_name"],
      d["family_name"],
      d["gbif_id"],
      d["powo_id"],
      d["iucn_id"],
      d["iucn_category"],
      d["common_names"]
    );
  }

  static getURLFromName(name) {
    const namesSnake = name.replace(" ", "_").toLowerCase();
    return `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/taxonomy/species/${namesSnake}.json`;
  }

  static async fromName(name) {
    const url = Species.getURLFromName(name);
    const d = await WWW.json(url);
    return Species.fromDict(d);
  }

  static async listFromNames(names) {
    return await Promise.all(names.map(Species.fromName));
  }

  get commonNamesStrShort() {
    const MAX_LEN = 80;
    let commonNamesToDisplay = [];
    for (const commonName of this.commonNames) {

      if (commonName.length + commonNamesToDisplay.join(Species.DELIM_COMMON_NAMES).length > MAX_LEN) {
        return commonNamesToDisplay.join(Species.DELIM_COMMON_NAMES)+' etc.';
      }
      commonNamesToDisplay.push(commonName);
    }
    return commonNamesToDisplay.join(Species.DELIM_COMMON_NAMES);
  }
}
