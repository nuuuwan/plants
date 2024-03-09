import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";

import { GeoLocation, URLContext, GeoData } from "../../nonview/base";

import { PlantPhoto } from "../../nonview/core";
import { PlantPhotoView } from "../molecules";
import { GeoMap } from "../organisms";

import STYLE from "../STYLE";

export default class HomePage extends Component {
  static DEFAULT_STATE = {
    center: GeoData.DEFAULT_CENTER,
    zoom: GeoData.DEFAULT_ZOOM,
    activePlantPhotoId: null,
  };
  static CONTEXT_STATE_KEYS = ["center", "zoom", "activePlantPhotoId"];

  static getContextFromState(state) {
    return Object.fromEntries(
      HomePage.CONTEXT_STATE_KEYS.map((key) => [key, state[key]])
    );
  }

  static getStateFromContext() {
    const context = URLContext.getContext();
    const state = HomePage.DEFAULT_STATE;
    for (const key of HomePage.CONTEXT_STATE_KEYS) {
      if (context[key]) {
        state[key] = context[key];
      }
    }
    return state;
  }

  setStateAndURLContext(state) {
    this.setState(
      state,
      function () {
        const context = HomePage.getContextFromState(this.state);
        URLContext.setContext(context);
      }.bind(this)
    );
  }

  constructor(props) {
    super(props);
    this.state = HomePage.getStateFromContext();
  }

  async componentDidMount() {
    let { activePlantPhotoId } = this.state;
    const plantPhotoIdx = await PlantPhoto.idx();
    if (!activePlantPhotoId) {
      activePlantPhotoId = await PlantPhoto.getRandomId();
    }
    this.setState({ plantPhotoIdx, activePlantPhotoId });
  }

  async onClickCenterOnCurrentLocation() {
    const centerGeo = await GeoLocation.getLatLng();
    const center = centerGeo ? centerGeo : GeoData.DEFAULT_CENTER;
    this.setStateAndURLContext({
      center,
      zoom: GeoData.DEFAULT_ZOOM,
    });
  }

  setCenterAndZoom(center, zoom) {
    this.setStateAndURLContext({ center, zoom });
  }

  onClickPlantPhoto(activePlantPhotoId) {
    this.setStateAndURLContext({ activePlantPhotoId });
  }

  onClickImage() {
    let {activePlantPhotoId , plantPhotoIdx} = this.state;
    const plantPhotoIds = Object.keys(plantPhotoIdx);
    let iActivePlantPhoto = plantPhotoIds.indexOf(activePlantPhotoId);
    iActivePlantPhoto += 1;
    iActivePlantPhoto %= plantPhotoIds.length;
    activePlantPhotoId = plantPhotoIds[iActivePlantPhoto];
    this.setStateAndURLContext({ activePlantPhotoId });
  }

  render() {
    const { center, zoom, plantPhotoIdx, activePlantPhotoId } = this.state;

    if (!plantPhotoIdx) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <Box sx={STYLE.HOME_PAGE.TOP}>
          <PlantPhotoView plantPhoto={plantPhotoIdx[activePlantPhotoId]} 
            onClickImage={this.onClickImage.bind(this)}
          />
        </Box>

        <Box sx={STYLE.HOME_PAGE.BOTTOM}>
          <GeoMap
            key={`geo-map-${center}-${zoom}-${activePlantPhotoId}`}
            center={center}
            zoom={zoom}
            plantPhotoIdx={plantPhotoIdx}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            onClickPlantPhoto={this.onClickPlantPhoto.bind(this)}
            activePlantPhotoId={activePlantPhotoId}
          />
        </Box>
      </Box>
    );
  }
}
