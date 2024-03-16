export default class HistoryTable {
  static getDataList(eppIdx, historyEppIDList) {
    const N_DISPLAY_MAX = 5;
    const filteredHistoryEppIDList = historyEppIDList.slice(-N_DISPLAY_MAX);
    const eppIdx2 = filteredHistoryEppIDList.reduce(function (eppIdx2, eppId) {
      const epp = eppIdx[eppId];

      eppIdx2[epp.species.name] = epp;
      return eppIdx2;
    }, {});

    const eppList = Object.values(eppIdx2);
    const dataList = eppList.map(function (epp) {
      return {
        id: epp.id,
        label: epp.species.name,
        dataType: "species",
      };
    });
    return dataList;
  }
}
