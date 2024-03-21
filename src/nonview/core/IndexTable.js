export default class IndexTable {
  static getDataList(eppIdx) {
    const eppList = Object.values(eppIdx);
    const idx = eppList.reduce(function (idx, epp) {
      const addData = function (label, dataType) {
        if (!idx[label]) {
          idx[label] = [];
        }
        idx[label].push({
          id: epp.id,
          label: label,
          dataType: dataType,
        });
      };

      addData(epp.species.name, "species");
      addData(epp.species.genusName, "genus");
      addData(epp.species.familyName, "family");
      for (let commonName of epp.species.commonNames) {
        addData(commonName, "commonName");
      }

      return idx;
    }, {});

    const dataList = Object.values(idx).map(function (dataListForLabel) {
      const sortedDataList = dataListForLabel.sort(function (a, b) {
        const eppA = eppIdx[a.id];
        const eppB = eppIdx[b.id];
        const confA = eppA.plantNetResult.confidence;
        const confB = eppB.plantNetResult.confidence;
        return confB - confA;
      });
      let d = sortedDataList[0];
      const confidence = eppIdx[d.id].plantNetResult.confidence;
      d.n = sortedDataList.length;
      d.confidence = confidence;
      return d;
    });

    return dataList;
  }
}
