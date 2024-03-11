import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";

import { URLContext, GeoData, Random } from "../../nonview/base";

import { ExtendedPlantPhoto } from "../../nonview/core";
import { AlertLowConfidence, PlantPhotoView, SpeciesView } from "../molecules";
import { GeoMap } from "../organisms";

import { p1, p2 } from "../STYLE";

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
    const eppIds = Object.keys(eppIdx);
    activeEPPId = Random.choice(eppIds);

    this.gotoNew(activeEPPId);
  }

  gotoNew(activeEPPId) {
    let { eppIdx } = this.state;
    const center = eppIdx[activeEPPId].plantPhoto.latLng.position;
    this.setStateAndURLContext({ activeEPPId, center });
  }

  onClickImage(e) {
    let { eppIdx, activeEPPId } = this.state;
    const pX0 = 1- e.clientX / window.innerWidth;
    const pY1 = e.clientY / window.innerHeight;
    const pY0 = (pY1 - p1) / p2;
    const pX = 4*(pX0 - 0.5);
    const pY = 4*(pY0 - 0.5);
    const r = Math.sqrt(pX * pX + pY * pY);

    console.debug(pX, pY, r);

    if (r <= 1) {
      this.gotoRandom();
      return;
    }

    const activeEpp = eppIdx[activeEPPId];
    const sortedEppIdAndDistance = Object.values(eppIdx).map(function (epp) {
      const latlngActive = activeEpp.plantPhoto.latLng;
      const latlng = epp.plantPhoto.latLng;
      const distance = latlngActive.distanceTo(latlng, pY, pX);
      return [epp.id, distance]
    }).sort(
      function (a, b) {
        return a[1] - b[1];
      }
    ).filter(
      function(a) {
        return a[1] >  0;
      }
    );

    console.debug(sortedEppIdAndDistance.slice(0,10));
  

    const newEppId = sortedEppIdAndDistance[1][0];

    this.gotoNew(newEppId);
  }

  render() {
    const { center, zoom, eppIdx, activeEPPId } = this.state;

    if (!eppIdx) {
      return <CircularProgress />;
    }

    const activeEPP = eppIdx[activeEPPId];
    const activePlantPhoto = activeEPP.plantPhoto;
    const plantNetResult = activeEPP.plantNetResult;
    return (
      <Box>
        <Box sx={STYLE.HOME_PAGE.TOP}>
          {plantNetResult.isLowConfidence ? (
            <AlertLowConfidence plantNetResult={plantNetResult} />
          ) : (
            <SpeciesView
              species={activeEPP.species}
              onClickImage={this.onClickImage.bind(this)}
            />
          )}
        </Box>

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
            activeEPP={activeEPP}
            onClickPlantPhoto={this.onClickPlantPhoto.bind(this)}
          />
        </Box>
      </Box>
    );
  }
}
