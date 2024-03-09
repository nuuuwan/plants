import { SVGOverlay } from "react-leaflet";

export default function PlantPhotoMarker({ plantPhoto }) {
  return (
    <SVGOverlay bounds={plantPhoto.bounds}>
      <circle
        r="10"
        cx="50%"
        cy="50%"
        fill={plantPhoto.colorHex + "88"}
        stroke="#888"
        strokeWidth="2"
      />
      <text x="50%" y="51%" fill="black" textAnchor="middle">
        {plantPhoto.shortText}
      </text>
    </SVGOverlay>
  );
}
