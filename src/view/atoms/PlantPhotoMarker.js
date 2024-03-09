import { Circle, SVGOverlay } from "react-leaflet";
import STYLE from "../STYLE";
export default function PlantPhotoMarker({
  plantPhoto,
  onClick,
  activePlantPhoto,
}) {
  const onClickInner = function () {
    onClick(plantPhoto.id);
  };
  const color = plantPhoto.getRelativeColor(activePlantPhoto);

  const isActive = plantPhoto.id === activePlantPhoto.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  return (
    <>
      <Circle
        center={plantPhoto.latlng}
        radius={10}
        key={`circle-${plantPhoto.id}`}
        pathOptions={Object.assign({ fillColor: color }, styleCircle)}
        eventHandlers={{
          click: onClickInner,
        }}
      />
      <SVGOverlay bounds={plantPhoto.bounds}>
        <text x="50%" y="51%" fill="black" textAnchor="middle">
          {plantPhoto.shortText}
        </text>
      </SVGOverlay>
    </>
  );
}
