import { Circle, SVGOverlay } from "react-leaflet";
import STYLE from "../STYLE";
export default function PlantPhotoMarker({ plantPhoto, onClick }) {
  const onClickInner = function () {
    onClick(plantPhoto.id);
  };
  const color = plantPhoto.color;

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
        pathOptions={Object.assign(
          { fillColor: color },
          STYLE.PLANT_PHOTO.MARKER.CIRCLE
        )}
        eventHandlers={{
          click: onClickInner,
        }}
      />
    </>
  );
}
