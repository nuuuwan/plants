import { SVGOverlay } from "react-leaflet";
import { LatLng } from "../../nonview/base";

export default function CoverageView({ eppIdx }) {
  const BOX_DIM = 0.001;
  const N_COLOR_GROUPS = 3;

  const groupToN = Object.values(eppIdx).reduce(function (groupToN, epp) {
    const latLng = epp.plantPhoto.latLng;
    const latLngNorm = latLng.getNormalized(BOX_DIM);
    const group = latLngNorm.toString();
    const n = groupToN[group] || 0;
    groupToN[group] = n + 1;
    return groupToN;
  }, {});

  const sortedGroupAndN = Object.entries(groupToN).sort(function (
    [group0, n0],
    [group1, n1]
  ) {
    return n1 - n0;
  });
  const nGroups = sortedGroupAndN.length;
  return sortedGroupAndN.map(function (entry, i) {
    const group = entry[0];
    const latLng = LatLng.fromString(group);
    const [lat, lng] = latLng.position;
    const bounds = [
      [lat, lng],
      [lat - BOX_DIM, lng + BOX_DIM],
    ];
    const h = (360 * parseInt((N_COLOR_GROUPS * i) / nGroups)) / N_COLOR_GROUPS;
    const color = `hsla(${h}, 100%, 50%, 0.2)`;

    const key = `coverage-${group}`;
    return (
      <SVGOverlay bounds={bounds} key={key}>
        <rect
          x={"0%"}
          y={"0%"}
          width={"100%"}
          height={"100%"}
          fill={color}
          stroke="black"
        />
      </SVGOverlay>
    );
  });
}
