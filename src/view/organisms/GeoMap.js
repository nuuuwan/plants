import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent({ setCenterAndZoom }) {
  useMapEvents({
    moveend: (e) => {
      const centerRaw = e.target.getCenter();
      const center = [centerRaw.lat, centerRaw.lng];
      const zoom = e.target.getZoom();
      setCenterAndZoom(center, zoom);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  renderPlants() {
    const { plantPhotoIdx, onClickPlantPhoto, activePlantPhotoId } = this.props;
    if (!plantPhotoIdx) {
      return null;
    }
    return Object.entries(plantPhotoIdx).map(function ([
      plantPhotoID,
      plantPhoto,
    ]) {
      return (
        <PlantPhotoMarker
          key={"plant-photo-" + plantPhotoID}
          plantPhoto={plantPhoto}
          onClick={onClickPlantPhoto}
          activePlantPhotoId={activePlantPhotoId}
        />
      );
    });
  }

  render() {
    const { center, zoom, setCenterAndZoom } = this.props;

    return (
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        minZoom={18}
        maxZoom={18}
      >
        <EventComponent setCenterAndZoom={setCenterAndZoom} />
        <TileLayer url={URL_FORMAT} />

        {this.renderPlants()}
      </MapContainer>
    );
  }
}
