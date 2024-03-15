export default class IndexTable {
  static fromEppIdx(eppIdx) {
    return Object.values(eppIdx).reduce(function (idx, epp) {
      const eppId = epp.id;
      [epp.species.name].forEach(function (name) {
        if (!(name in idx)) {
          idx[name] = [];
        }
        idx[name].push(eppId);
      });
      return idx;
    }, {});
  }
}
