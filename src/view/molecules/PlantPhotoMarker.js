import { CircleMarker, SVGOverlay } from "react-leaflet";
import { Format } from "../../nonview/base";
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

  const direction = epp.plantPhoto.direction || 0;
  const k = 0.01;

  const cx0 = Format.percent(0.5);
  const cy0 = Format.percent(0.5);

  const cx1 = Format.percent(0.5 + k * Math.sin((direction * Math.PI) / 180));
  const cy1 = Format.percent(0.5 - k * Math.cos((direction * Math.PI) / 180));

  return (
    <>
      <SVGOverlay bounds={epp.plantPhoto.latLng.bounds}>
        <line
          x1={cx0}
          y1={cy0}
          x2={cx1}
          y2={cy1}
          stroke={styleCircle.color}
          strokeWidth={styleCircle.weight}
        />

        <circle
          cx={cx1}
          cy={cy1}
          r={radius / 2}
          fill={"black"}
          stroke={styleCircle.color}
          strokeWidth={styleCircle.weight}
        />

        <circle
          cx={cx0}
          cy={cy0}
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
          {epp.plantNetResult.speciesNameInitials}
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
