import { Component } from "react";
import { MapContainer, TileLayer, LayerGroup } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

import "./GeoMap.css";


const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

// const TILE_URL = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}@2x.png"

// const TILE_ATTRIBUTION = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';


export default class GeoMap extends Component {
  renderPlants() {
    const { eppIdx, onClickPlantPhoto, activeEPP } = this.props;
    if (!eppIdx) {
      return null;
    }
    let eppList = Object.values(eppIdx);
    if (activeEPP.plantNetResult.hasResults) {
      eppList = eppList.sort(function (a, b) {
        return b.getDistance(activeEPP) - a.getDistance(activeEPP);
      });
    }
    return eppList.map(function (epp) {
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
        zoomControl={true}

        maxZoom={21}
       
      >
        <TileLayer 
          attribution={TILE_ATTRIBUTION}
          url={TILE_URL}  
     
          maxZoom={21}

        />
<LayerGroup>
        {this.renderPlants()}
        </LayerGroup>
        </MapContainer>
    );
  }
}
