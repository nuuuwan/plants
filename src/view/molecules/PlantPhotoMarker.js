import { CircleMarker, SVGOverlay } from "react-leaflet";
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

  const radius = PlantPhotoMarkerStyle.RADIUS_BY_DISTANCE[distance];
  const backColor = PlantPhotoMarkerStyle.BACK_COLORS_BY_DISTANCE[distance];
  const foreColor = PlantPhotoMarkerStyle.FORE_COLORS_BY_DISTANCE[distance];

  const isActive = epp.id === activeEPP.id;
  const styleCircle = isActive
    ? PlantPhotoMarkerStyle.MARKER.CIRCLE_ACTIVE
    : PlantPhotoMarkerStyle.MARKER.CIRCLE;

  return (
    <>
      <SVGOverlay bounds={epp.plantPhoto.latLng.bounds}>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill={backColor}
          stroke={styleCircle.color}
          strokeWidth={styleCircle.weight}
        />
        <text
          x="50%"
          y="50%"
          fill={foreColor}
          stroke="none"
          textAnchor="middle"
          fontSize={radius}
          fontFamily="ABeeZee"
          dominantBaseline="middle"
        >
          {epp.plantNetResult.speciesNameInitialsIfConfident}
        </text>
      </SVGOverlay>
      <CircleMarker
        center={epp.plantPhoto.latLng}
        radius={radius}
        pathOptions={Object.assign({
          fill: backColor,
          color: styleCircle.color,
        })}
        eventHandlers={{
          click: onClickInner,
        }}
      ></CircleMarker>
    </>
  );
}
