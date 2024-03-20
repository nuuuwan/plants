import { SVGOverlay } from "react-leaflet";
import { LatLng } from "../../nonview/base";
import { Coverage } from "../../nonview/core";
export default function CoverageView({ eppIdx }) {
  const { groupToN, meanN } = Coverage.getStats(eppIdx);

  return Object.entries(groupToN).map(function ([group, n]) {
    const latLng = LatLng.fromString(group);
    const [lat, lng] = latLng.position;

    const span = Coverage.BOX_DIM;
    const bounds = [
      [lat, lng],
      [lat + span, lng + span],
    ];

    const color = Coverage.getColor(n, meanN);
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
        <text
          x={"50%"}
          y={"50%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontFamily="ABeeZee"
        >
          {n}
        </text>
      </SVGOverlay>
    );
  });
}
