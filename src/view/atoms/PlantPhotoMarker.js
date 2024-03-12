import { CircleMarker, Tooltip } from "react-leaflet";
import STYLE from "../STYLE";

import "./PlantPhotoMarker.css";

export default function PlantPhotoMarker({
  epp,
  onClick,
  activeEPP,
  distance,
}) {
  const onClickInner = function () {
    onClick(epp.id);
  };

  const radius = distance < 3 ? 18 : 12;
  const backColor = STYLE.BACK_COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  return (
    <CircleMarker
      center={epp.plantPhoto.latLng}
      radius={radius}
      pathOptions={Object.assign({ fillColor: backColor }, styleCircle)}
      eventHandlers={{
        click: onClickInner,
      }}
    >
      <Tooltip permanent direction="center" className="leaflet-tooltip">
        {epp.plantNetResult.speciesNameInitialsIfConfident}
      </Tooltip>
    </CircleMarker>
  );
}
