import { SVGOverlay } from "react-leaflet";
import { LatLng } from "../../nonview/base";

export default function CoverageView({ eppIdx }) {
  const BOX_DIM = 0.001;

  const eppList = Object.values(eppIdx);
  const groupToN = eppList.reduce(function (groupToN, epp) {
    const latLng = epp.plantPhoto.latLng;
    const latLngNorm = latLng.getNormalized(BOX_DIM);
    const group = latLngNorm.toString();
    const n = groupToN[group] || 0;
    groupToN[group] = n + 1;
    return groupToN;
  }, {});

  const nGroups = Object.keys(groupToN).length;
  const sumTotal = eppList.length;
  const meanN = sumTotal / nGroups;

  return Object.entries(groupToN).map(function ([group, n], i) {
    const latLng = LatLng.fromString(group);
    const [lat, lng] = latLng.position;
    const bounds = [
      [lat, lng],
      [lat - BOX_DIM, lng + BOX_DIM],
    ];

    const z = n / meanN;
    let h = 120;
    if (z > 2) {
      h = 0;
    }
    if (z < 0.5) {
      h = 240;
    }

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
