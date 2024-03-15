export default class IndexTable {
  static fromEppIdx(eppIdx) {
    const idx = Object.values(eppIdx).reduce(function (idx, epp) {
      const eppId = epp.id;
      []
        .concat(
          [epp.species.name, epp.species.genusName, epp.species.familyName],
          epp.species.commonNames
        )
        .forEach(function (name) {
          if (!(name in idx)) {
            idx[name] = [];
          }
          idx[name].push(eppId);
        });
      return idx;
    }, {});
    const sortedIdx = Object.fromEntries(
      Object.entries(idx)
        .sort(function (entryA, entryB) {
          return entryA[0].localeCompare(entryB[0]);
        })
        .map(function ([name, eppIds]) {
          return [
            name,
            eppIds.sort(function (eppIdA, eppIdB) {
              return (
                eppIdx[eppIdB].plantNetResult.confidence -
                eppIdx[eppIdA].plantNetResult.confidence
              );
            }),
          ];
        })
    );
    return sortedIdx;
  }
}
