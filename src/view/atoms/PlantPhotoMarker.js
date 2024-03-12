import { CircleMarker, Tooltip } from "react-leaflet";
import STYLE from "../STYLE";

import "./PlantPhotoMarker.css";

export default function PlantPhotoMarker({ epp, onClick, activeEPP }) {
  const onClickInner = function () {
    onClick(epp.id);
  };
  const distance = epp.getDistance(activeEPP);

  const radius = (distance < 3) ? 18 : 12;

  const className = ".leaflet-tooltip  .leaflet-tooltip" + distance;
  

  const backColor = STYLE.BACK_COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  return (
    <CircleMarker
      center={epp.plantPhoto.latLng}
      radius={radius}
      key={`circle-${epp.id}`}
      pathOptions={Object.assign({ fillColor: backColor }, styleCircle)}
      eventHandlers={{
        click: onClickInner,
      }}
    >
      <Tooltip permanent direction="center" className={className} opacity={1} >
        {epp.plantNetResult.speciesNameInitialsIfConfident}
      </Tooltip>
    </CircleMarker>
  );
}
