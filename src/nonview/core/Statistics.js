export default class Statistics {
  constructor(nPhotos, nPhotoDays,maxPhotoDay, nSpecies, nGenus, nFamily) {
    this.nPhotos = nPhotos;
    this.nPhotoDays = nPhotoDays;
    this.maxPhotoDay = maxPhotoDay;
    this.nSpecies = nSpecies;
    this.nGenus = nGenus;
    this.nFamily = nFamily;
  }

  static fromExtendedPlantPhotoIdx(eppIdx) {
    const sortedEppList = Object.values(eppIdx).sort((a, b) => a.plantPhoto.ut - b.plantPhoto.ut);
    const nPhotos = sortedEppList.length;

    const getCounts = function (getKey) {
      return Object.values(eppIdx).reduce(function (count, epp) {
        const key = getKey(epp);
        if (!count[key]) {
          count[key] = 0;
        }
        count[key] += 1;
        return count;
      }, {});
    };

    const getKeys = function (getKey) {
      const counts = getCounts(getKey);
      return Object.keys(counts).sort();
    };

    const getUnique = function (getKey) {
      return getKeys(getKey).length;
    };



    const nFamily = getUnique((epp) => epp.species.familyName);
    const nGenus = getUnique((epp) => epp.species.genusName);
    const nSpecies = getUnique((epp) => epp.species.name);

    const nPhotoDays = getUnique((epp) => epp.plantPhoto.dateStr);
    const maxPhotoDay = sortedEppList[sortedEppList.length - 1].plantPhoto.timeStr;
    return new Statistics(nPhotos, nPhotoDays, maxPhotoDay, nSpecies, nGenus, nFamily);
  }

  to_dict() {
    return {
      nPhotos: this.nPhotos,
      nPhotoDays: this.nPhotoDays,
      maxPhotoDay: this.maxPhotoDay,
      nSpecies: this.nSpecies,
      nGenus: this.nGenus,
      nFamily: this.nFamily,
    };
  }
}
