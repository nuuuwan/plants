import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";
import { PlantPhoto } from "../../nonview/core";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  renderPlants() {
    const { plantPhotoIdx, onClickPlantPhoto, activePlantPhoto } = this.props;
    if (!plantPhotoIdx) {
      return null;
    }
    return PlantPhoto.sortBy(
      Object.values(plantPhotoIdx),
      activePlantPhoto
    ).map(function (plantPhoto) {
      return (
        <PlantPhotoMarker
          key={"plant-photo-" + plantPhoto.id}
          plantPhoto={plantPhoto}
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
