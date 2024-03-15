import { CircleMarker, Tooltip } from "react-leaflet";
import PlantPhotoMarkerStyle from "./PlantPhotoMarkerStyle";

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
  const backColor = PlantPhotoMarkerStyle.BACK_COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? PlantPhotoMarkerStyle.MARKER.CIRCLE_ACTIVE
    : PlantPhotoMarkerStyle.MARKER.CIRCLE;

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
