export default class Statistics {
  static fromExtendedPlantPhotoIdx(eppIdx) {
    const sortedEppList = Object.values(eppIdx).sort(
      (a, b) => a.plantPhoto.ut - b.plantPhoto.ut
    );

    const getCounts = function (getKey) {
      const counts = Object.values(eppIdx).reduce(function (count, epp) {
        const key = getKey(epp);
        if (!count[key]) {
          count[key] = 0;
        }
        count[key] += 1;
        return count;
      }, {});
      const sortedCounts = Object.fromEntries(
        Object.entries(counts).sort(([, a], [, b]) => b - a)
      );
      return sortedCounts;
    };

    const getKeys = function (getKey) {
      const counts = getCounts(getKey);
      return Object.keys(counts).sort();
    };

    const getUnique = function (getKey) {
      return getKeys(getKey).length;
    };

    return {
      nPhotos: sortedEppList.length,
      nPhotoDays: getUnique((epp) => epp.plantPhoto.dateStr),
      maxPhotoDateTime:
        sortedEppList[sortedEppList.length - 1].plantPhoto.dateTimeStr,
    };
  }
}
