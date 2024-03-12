import { Component } from "react";
import { MapContainer, TileLayer, LayerGroup } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

import "./GeoMap.css";

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


// const TILE_URL = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}@2x.png"

// const TILE_ATTRIBUTION = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';

export default class GeoMap extends Component {
  renderPlants() {
    const { eppIdx, onClickPlantPhoto, activeEPP } = this.props;
    if (!eppIdx) {
      return null;
    }

    let eppList = Object.values(eppIdx);

    eppList = eppList.sort(function (a, b) {
      return a.getDistance(activeEPP) - b.getDistance(activeEPP);
    });

    const distanceToEppList = eppList.reduce(function (distanceToEppList, epp) {
      const distance = 100 - epp.getDistance(activeEPP);
      if (!distanceToEppList[distance]) {
        distanceToEppList[distance] = [];
      }
      distanceToEppList[distance].push(epp);
      return distanceToEppList;
    }, {});

    return Object.entries(distanceToEppList).map(function ([
      distance,
      eppListForDistance,
    ]) {
      const layerName = "layer-distance-" + distance;
      return (
        <LayerGroup key={layerName} name={layerName}>
          {eppListForDistance.map(function (epp) {
            return (
              <PlantPhotoMarker
                key={"plant-photo-" + epp.id}
                epp={epp}
                onClick={onClickPlantPhoto}
                activeEPP={activeEPP}
              />
            );
          })}
        </LayerGroup>
      );
    },
    this);
  }

  render() {
    const { center, zoom } = this.props;

    return (
      <MapContainer center={center} zoom={zoom} zoomControl={true} >
        <TileLayer url={TILE_URL}  />
        <LayerGroup>{this.renderPlants()}</LayerGroup>
      </MapContainer>
    );
  }
}
