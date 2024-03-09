let STYLE = {};

const fixedCommon = {
  position: "fixed",
  left: 0,
  right: 0,
};



STYLE.HOME_PAGE = {
  TOP: Object.assign({}, fixedCommon, {
    top: 0,
    bottom: "20%",
  }),
  MIDDLE: Object.assign({}, fixedCommon, {
    top: "20%",
    bottom: "40%",
  }),
  BOTTOM: Object.assign({}, fixedCommon, {
    top: "60%",
    bottom: 0,
  }),
};

STYLE.PLANT_PHOTO = {
  IMAGE: Object.assign({}, fixedCommon, {
    top: STYLE.HOME_PAGE.MIDDLE.top,
    bottom: STYLE.HOME_PAGE.MIDDLE.bottom,
    
    objectFit: "contain",
    width: "100%",
    margin: "auto",
    textAlign: "center",
  }),

  BOX_INFO: {

    padding: 1,

    borderRadius: 5,
    width: "fit-content",
    margin: "auto",
    marginTop: 1,
    maxWidth: "320px",
    textAlign: "center",
  },
  FAMILY: {
    fontSize: "100%",
    color: "#800",
  },
  GENUS: {
    fontStyle: "italic",
    fontSize: "150%",
    color: "#f80",
  },
  SPECIES: {
    fontStyle: "italic",
    fontSize: "150%",
    color: "#082",
  },

  COMMON_NAMES: {
    fontSize: "100%",
    color: "#444",
  },
  CONFIDENCE: {
    fontSize: "100%",
    color: "#000",
  },

  TIME_STR: {
    fontSize: "67%",
  },

  MARKER: {
    CIRCLE: { color: "white", fillOpacity: 1 },
  },
};

STYLE.PLANT_PHOTO.AUTHORSHIP = Object.assign({}, STYLE.PLANT_PHOTO.SPECIES, {
  color: "gray",
});

STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE = Object.assign(
  {},
  STYLE.PLANT_PHOTO.MARKER.CIRCLE,
  { color: "black" }
);

STYLE.WIKI_LINK = {
  color: "inherit",

  textDecoration: "none",
};

export default STYLE;
