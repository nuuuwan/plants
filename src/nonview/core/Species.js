import { WWW } from "../base";
export default class Species {
  constructor(
    name,
    authorship,
    genusName,
    familyName,
    gbifId,
    powoId,
    iucnId,
    iucnCategory
  ) {
    this.name = name;
    this.authorship = authorship;
    this.genusName = genusName;
    this.familyName = familyName;
    this.gbifId = gbifId;
    this.powoId = powoId;
    this.iucnId = iucnId;
    this.iucnCategory = iucnCategory;
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
      d["iucn_category"]
    );
  }

  static getURLFromName(name) {
    const namesSnake = name.replace(" ", "_").toLowerCase();
    return `https://raw.githubusercontent.com/nuuuwan/lk_plants/main/data/taxonomy/species/${namesSnake}.json`;
  }

  static async fromName(name) {
    const url = Species.getURLFromName(name);
    return await WWW.json(url);
  }

  static async listFromNames(names) {
    return await Promise.all(names.map(Species.fromName));
  }
}
