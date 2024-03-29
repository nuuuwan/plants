import React, { Component } from "react";
import { Box, CircularProgress, Drawer } from "@mui/material";

import { URLContext, GeoData, Random } from "../../nonview/base";

import { ExtendedPlantPhoto } from "../../nonview/core";
import {
  PlantPhotoViewStyle,
  PlantPhotoView,
  SpeciesView,
  GeoMap,
  LeftDrawerView,
} from "../molecules";

import { ButtonSettings } from "../atoms";

import HomePageStyle from "./HomePageStyle";

export const TEST_MODE = true;

export default class HomePage extends Component {
  static DEFAULT_STATE = {
    center: GeoData.DEFAULT_CENTER,
    zoom: GeoData.DEFAULT_ZOOM,
    activeEPPId: null,
    showSettings: false,
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
    const { activeEPPId, eppIdx } = Object.assign({}, this.state, state);

    let title = "Plants";
    if (eppIdx) {
      const activeEPP = eppIdx[activeEPPId];
      title = activeEPP.plantNetResult.speciesName;
    }

    window.document.title = title;

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
    this.historyEppIDList = [];
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
    this.historyEppIDList.push(activeEPPId);
    this.setStateAndURLContext({ activeEPPId, center, showSettings: false });
  }

  setShowSettings(showSettings) {
    this.setState({ showSettings });
  }

  onClickImage(e) {
    let { eppIdx, activeEPPId } = this.state;
    const imageWidth = PlantPhotoViewStyle.IMAGE_WIDTH;
    const imageLeft = window.innerWidth - imageWidth;
    const pX = (e.clientX - imageLeft) / imageWidth;

    if (pX > 0.33 && pX < 0.67) {
      this.gotoRandom();
      return;
    }

    const eppIdList = Object.values(eppIdx).map((epp) => epp.id);
    let iActiveEpp = eppIdList.indexOf(activeEPPId);

    if (pX < 0.33) {
      iActiveEpp -= 1;
    } else {
      iActiveEpp += 1;
    }

    iActiveEpp = (iActiveEpp + eppIdList.length) % eppIdList.length;
    activeEPPId = eppIdList[iActiveEpp];
    this.gotoNew(activeEPPId);
  }

  onClickIndex(indexD) {
    this.gotoNew(indexD.id);
  }

  render() {
    const { center, zoom, eppIdx, activeEPPId, showSettings } = this.state;

    if (!eppIdx) {
      return <CircularProgress sx={{ m: 2 }} />;
    }

    const activeEPP = eppIdx[activeEPPId];

    const handleCloseSettings = function () {
      this.setShowSettings(false);
    }.bind(this);

    const handleOpenSettings = function () {
      this.setShowSettings(true);
    }.bind(this);

    return (
      <Box>
        <Box sx={HomePageStyle.MAP}>
          <GeoMap
            key={`geo-map-${center}-${zoom}-${activeEPPId}`}
            center={center}
            zoom={zoom}
            eppIdx={eppIdx}
            activeEPP={activeEPP}
            onClickPlantPhoto={this.onClickPlantPhoto.bind(this)}
          />
          <ButtonSettings onClick={handleOpenSettings} />
          <Drawer open={showSettings} onClose={handleCloseSettings}>
            <LeftDrawerView
              eppIdx={eppIdx}
              historyEppIDList={this.historyEppIDList}
              onClickIndex={this.onClickIndex.bind(this)}
            />
          </Drawer>
        </Box>

        <Box sx={HomePageStyle.PLANT}>
          <SpeciesView
            activeEPP={activeEPP}
            onClickImage={this.onClickImage.bind(this)}
          />
          <PlantPhotoView
            activeEPP={activeEPP}
            onClickImage={this.onClickImage.bind(this)}
          />
        </Box>
      </Box>
    );
  }
}
