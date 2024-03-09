import React, { Component } from "react";
import { Box, Paper } from "@mui/material";
import { GeoLocation, URLContext, GeoData } from "../../nonview/base";
import { CustomBottomNavigation } from "../molecules";
import { GeoMap } from "../organisms";
import { STYLE_BODY, STYLE_FOOTER } from "../pages/STYLES_HOME_PAGE";
import { PlantPhoto } from "../../nonview/core";

export default class HomePage extends Component {
  static DEFAULT_STATE = {
    center: GeoData.DEFAULT_CENTER,
    zoom: GeoData.DEFAULT_ZOOM,
  };

  constructor(props) {
    super(props);

    let initState = HomePage.DEFAULT_STATE;

    const context = URLContext.getContext();

    if (context.center) {
      initState.center = context.center;
    }
    if (context.zoom) {
      initState.zoom = context.zoom;
    }

    this.state = initState;
  }

  setStateAndURLContext(state) {
    this.setState(
      state,
      function () {
        const { center, zoom } = this.state;
        const context = {
          center,
          zoom,
        };
        URLContext.setContext(context);
      }.bind(this)
    );
  }

  async componentDidMount() {
    const plantPhotoList = await PlantPhoto.listAll();
    console.log({ plantPhotoList });
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

  render() {
    const { center, zoom } = this.state;

    return (
      <Box>
        <Box sx={STYLE_BODY}>
          <GeoMap
            center={center}
            key={`geo-map-${center}-${zoom}`}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            zoom={zoom}
          />
        </Box>

        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            onClickCenterOnCurrentLocation={this.onClickCenterOnCurrentLocation.bind(
              this
            )}
          />
        </Paper>
      </Box>
    );
  }
}
