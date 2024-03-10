import { CircleMarker, Tooltip } from "react-leaflet";
import STYLE from "../STYLE";
export default function PlantPhotoMarker({ epp, onClick, activeEPP }) {
  const onClickInner = function () {
    onClick(epp.id);
  };
  const distance = epp.getDistance(activeEPP);
  const color = STYLE.COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  return (
    <CircleMarker
      center={epp.plantPhoto.latLng}
      radius={15}
      key={`circle-${epp.id}`}
      pathOptions={Object.assign({ fillColor: color }, styleCircle)}
      eventHandlers={{
        click: onClickInner,
      }}
    >
      <Tooltip
        opacity={0.9}
        eventHandlers={{
          click: onClickInner,
        }}
      >
        {epp.plantNetResult.speciesNameConditioned}
      </Tooltip>
    </CircleMarker>
  );
}
