import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  renderPlants() {
    const { eppIdx, onClickPlantPhoto, activePlantPhoto } = this.props;
    if (!eppIdx) {
      return null;
    }
    return Object.values(eppIdx).map(function (extendedPlantPhoto) {
      return (
        <PlantPhotoMarker
          key={"plant-photo-" + extendedPlantPhoto.id}
          plantPhoto={extendedPlantPhoto.plantPhoto}
          onClick={onClickPlantPhoto}
          activePlantPhoto={activePlantPhoto}
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
