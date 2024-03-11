import { CircleMarker, Tooltip } from "react-leaflet";
import STYLE from "../STYLE";

import './PlantPhotoMarker.css';

export default function PlantPhotoMarker({ epp, onClick, activeEPP }) {
  const onClickInner = function () {
    onClick(epp.id);
  };
  const distance = epp.getDistance(activeEPP);
  const className = '.leaflet-tooltip  .leaflet-tooltip'+ distance;
  const color = STYLE.COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  return (
    <CircleMarker
      center={epp.plantPhoto.latLng}
      radius={12}
      key={`circle-${epp.id}`}
      pathOptions={Object.assign({ fillColor: color }, styleCircle)}
      eventHandlers={{
        click: onClickInner,
      }}
    >
      <Tooltip
        permanent
        direction="center"
        className={className}
      >
        {epp.plantNetResult.speciesNameInitials}
      </Tooltip>
    </CircleMarker>
  );
}