import { LatLng } from "../base";
export default class Coverage {
  static BOX_DIM = 0.001;

  static getGroupToNBasic(eppList) {
    return eppList.reduce(function (groupToN, epp) {
      const latLng = epp.plantPhoto.latLng;
      const latLngNorm = latLng.getNormalized(Coverage.BOX_DIM);
      const group = latLngNorm.toString();
      const n = groupToN[group] || 0;
      groupToN[group] = n + 1;
      return groupToN;
    }, {});
  }

  static expand(groupToNBasic) {
    return Object.keys(groupToNBasic).reduce(function (groupToN, group) {
      const latLng = LatLng.fromString(group);
      const [lat, lng] = [latLng.lat, latLng.lng];

      const D = 1;
      for (let dlat = -D; dlat <= D; dlat++) {
        for (let dlng = -D; dlng <= D; dlng++) {
          const latLng = new LatLng(
            lat + dlat * Coverage.BOX_DIM,
            lng + dlng * Coverage.BOX_DIM
          );
          const key = latLng.toString();
          if (!groupToN[key]) {
            groupToN[key] = 0;
          }
        }
      }

      return groupToN;
    }, groupToNBasic);
  }

  static getStats(eppIdx) {
    const eppList = Object.values(eppIdx);
    const groupToNBasic = Coverage.getGroupToNBasic(eppList);
    const groupToN = Coverage.expand(groupToNBasic);

    const nGroups = Object.keys(groupToNBasic).length;
    const sumTotal = eppList.length;
    const meanN = sumTotal / nGroups;

    return { groupToN, meanN };
  }

  static getColor(n, meanN) {
    const z = n / meanN;
    let hue, sat;
    if (z > 2) {
      hue = 2;
      sat = 100;
    } else if (z > 0.5) {
      hue = 120;
      sat = 100;
    } else if (z > 0) {
      hue = 210;
      sat = 100;
    } else {
      hue = 0;
      sat = 0;
    }
    return `hsla(${hue},${sat}%,50%,0.2)`;
  }
}
