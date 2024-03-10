import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";

import { URLContext, GeoData, Random } from "../../nonview/base";

import { ExtendedPlantPhoto } from "../../nonview/core";
import { PlantPhotoView } from "../molecules";
import { GeoMap } from "../organisms";

import STYLE from "../STYLE";

export default class HomePage extends Component {
  static DEFAULT_STATE = {
    center: GeoData.DEFAULT_CENTER,
    zoom: GeoData.DEFAULT_ZOOM,
    activeEPPId: null,
  };
  static CONTEXT_STATE_KEYS = ["activeEPPId"];

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
    let { activeEPPId, center } = this.state;
    const eppIdx = await ExtendedPlantPhoto.idx();
    if (!activeEPPId) {
      activeEPPId = Object.keys(eppIdx)[0];
      center = eppIdx[activeEPPId].plantPhoto.latLng.position;
    }
    this.setStateAndURLContext({ eppIdx, activeEPPId, center });
  }

  onClickPlantPhoto(activeEPPId) {
    this.gotoNew(activeEPPId);
  }

  gotoRandom() {
    let { activeEPPId, eppIdx } = this.state;
    const plantPhotoIds = Object.keys(eppIdx);
    activeEPPId = Random.choice(plantPhotoIds);

    this.gotoNew(activeEPPId);
  }

  gotoPrevious() {
    let { activeEPPId, eppIdx } = this.state;
    const plantPhotoIds = Object.keys(eppIdx);
    let iActivePlantPhoto = plantPhotoIds.indexOf(activeEPPId);
    iActivePlantPhoto -= 1;
    iActivePlantPhoto %= plantPhotoIds.length;
    activeEPPId = plantPhotoIds[iActivePlantPhoto];

    this.gotoNew(activeEPPId);
  }

  gotoNext() {
    let { activeEPPId, eppIdx } = this.state;
    const plantPhotoIds = Object.keys(eppIdx);
    let iActivePlantPhoto = plantPhotoIds.indexOf(activeEPPId);
    iActivePlantPhoto += 1;
    iActivePlantPhoto %= plantPhotoIds.length;
    activeEPPId = plantPhotoIds[iActivePlantPhoto];

    this.gotoNew(activeEPPId);
  }

  gotoNew(activeEPPId) {
    let { eppIdx } = this.state;
    const center = eppIdx[activeEPPId].plantPhoto.latLng.position;
    this.setStateAndURLContext({ activeEPPId, center });
  }

  onClickImage(e) {
    const pX = e.clientX / window.innerWidth;

    if (pX < 0.33) {
      this.gotoPrevious();
    } else if (pX > 0.67) {
      this.gotoNext();
    } else {
      this.gotoRandom();
    }
  }

  render() {
    const { center, zoom, eppIdx, activeEPPId } = this.state;

    if (!eppIdx) {
      return <CircularProgress />;
    }

    const activeEPP = eppIdx[activeEPPId];
    const activePlantPhoto = activeEPP.plantPhoto;
    return (
      <Box>
        <Box sx={STYLE.HOME_PAGE.TOP}></Box>

        <Box sx={STYLE.HOME_PAGE.MIDDLE}>
          <PlantPhotoView
            plantPhoto={activePlantPhoto}
            onClickImage={this.onClickImage.bind(this)}
          />
        </Box>

        <Box sx={STYLE.HOME_PAGE.BOTTOM}>
          <GeoMap
            key={`geo-map-${center}-${zoom}-${activeEPPId}`}
            center={center}
            zoom={zoom}
            eppIdx={eppIdx}
            onClickPlantPhoto={this.onClickPlantPhoto.bind(this)}
            activePlantPhoto={activePlantPhoto}
          />
        </Box>
      </Box>
    );
  }
}
