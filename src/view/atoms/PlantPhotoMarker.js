import { CircleMarker, Tooltip, Pane } from "react-leaflet";
import STYLE from "../STYLE";

import "./PlantPhotoMarker.css";

export default function PlantPhotoMarker({ epp, onClick, activeEPP }) {
  const onClickInner = function () {
    onClick(epp.id);
  };
  const distance = epp.getDistance(activeEPP);

  const radius = distance < 3 ? 18 : 12;

  const backColor = STYLE.BACK_COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE
    : STYLE.PLANT_PHOTO.MARKER.CIRCLE;

  const paneName = "pane-" + epp.id;
  return (
    <Pane key={paneName} name={paneName}>
      <CircleMarker
        center={epp.plantPhoto.latLng}
        radius={radius}
        key={`circle-${epp.id}`}
        className="leaflet-marker-icon"
        pathOptions={Object.assign({ fillColor: backColor }, styleCircle)}
        eventHandlers={{
          click: onClickInner,
        }}
      >
        <Tooltip permanent direction="center" className="leaflet-tooltip">
          {epp.plantNetResult.speciesNameInitialsIfConfident}
        </Tooltip>
      </CircleMarker>
    </Pane>
  );
}
