let SpeciesViewStyle = {
  BOX_INFO: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "12.5%",
    textAlign: "center",
    fontSize: "90%",
    p: 0.5,
    m: 0,
  },

  FAMILY: {
    fontSize: "100%",
    color: "#800",
  },
  GENUS: {
    fontStyle: "italic",
    fontSize: "120%",
    color: "#f80",
  },

  COMMON_NAMES: {
    fontSize: "80%",
    color: "#444",
  },
};

SpeciesViewStyle.SPECIES = Object.assign({}, SpeciesViewStyle.GENUS, {
  color: "#082",
});

export default SpeciesViewStyle;
