import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

localStorage.clear();
console.debug("localStorage.clear()");

const THEME = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#ccc",
    },
  },
  typography: {
    fontFamily: ["ABeeZee", "sans-serif"].join(","),
    fontSize: 10,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
