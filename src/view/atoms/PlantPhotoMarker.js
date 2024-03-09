import { Circle, SVGOverlay } from "react-leaflet";
import STYLE from "../STYLE";
export default function PlantPhotoMarker({
  plantPhoto,
  onClick,
  activePlantPhotoId,
}) {
  const onClickInner = function () {
    onClick(plantPhoto.id);
  };
  const color = plantPhoto.color;

  const isActive = plantPhoto.id === activePlantPhotoId;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;
  if (isActive) console.debug(styleCircle);

  return (
    <>
      <SVGOverlay bounds={plantPhoto.bounds}>
        <text x="50%" y="51%" fill="black" textAnchor="middle">
          {plantPhoto.shortText}
        </text>
      </SVGOverlay>
      <Circle
        center={plantPhoto.latlng}
        radius={10}
        key={`circle-${plantPhoto.id}`}
        pathOptions={Object.assign({ fillColor: color }, styleCircle)}
        eventHandlers={{
          click: onClickInner,
        }}
      />
    </>
  );
}
