import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  renderPlants() {
    const { eppIdx, onClickPlantPhoto, activeEPP } = this.props;
    if (!eppIdx) {
      return null;
    }
    const eppList = Object.values(eppIdx);
    return eppList
      .sort(function (a, b) {
        return b.getDistance(activeEPP) - a.getDistance(activeEPP);
      })
      .map(function (epp) {
        return (
          <PlantPhotoMarker
            key={"plant-photo-" + epp.id}
            epp={epp}
            onClick={onClickPlantPhoto}
            activeEPP={activeEPP}
          />
        );
      });
  }

  render() {
    const { center, zoom } = this.props;

    return (
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        minZoom={10}
        maxZoom={20}
      >
        <TileLayer url={URL_FORMAT} />

        {this.renderPlants()}
      </MapContainer>
    );
  }
}
