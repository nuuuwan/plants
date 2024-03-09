import { CircleMarker, SVGOverlay, Tooltip } from "react-leaflet";
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

      <CircleMarker
        center={plantPhoto.latlng}
        radius={15}
        key={`circle-${plantPhoto.id}`}
        pathOptions={Object.assign({ fillColor: color }, styleCircle)}
        eventHandlers={{
          click: onClickInner,
        }}
        
      >
          <Tooltip opacity={0.9} >
            {plantPhoto.scientificName}
          </Tooltip>
        </CircleMarker>

 
  );
}
