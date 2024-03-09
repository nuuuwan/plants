import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";
import { PlantPhoto } from "../../nonview/core";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent({ setCenterAndZoom, onClickMap }) {
  useMapEvents({
    moveend: (e) => {
      const centerRaw = e.target.getCenter();
      const center = [centerRaw.lat, centerRaw.lng];
      const zoom = e.target.getZoom();
      setCenterAndZoom(center, zoom);
    },
    click: () => {
      onClickMap();
    }
  });
  return null;
}

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
    const { center, zoom, setCenterAndZoom, onClickMap } = this.props;

    return (
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        minZoom={18}
        maxZoom={18}
      >
        <EventComponent setCenterAndZoom={setCenterAndZoom} onClickMap={onClickMap} />
        <TileLayer url={URL_FORMAT} />

        {this.renderPlants()}
      </MapContainer>
    );
  }
}
