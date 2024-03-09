let STYLE = {};

const fixedCommon = {
  position: "fixed",
  left: 0,
  right: 0,
};

STYLE.HOME_PAGE = {
  TOP: Object.assign({}, fixedCommon, {
    top: 0,
    bottom: "15%",
  }),
  MIDDLE: Object.assign({}, fixedCommon, {
    top: "15%",
    bottom: "65%",
  }),
  BOTTOM: Object.assign({}, fixedCommon, {
    top: "65%",
    bottom: 0,
  }),
};

STYLE.PLANT_PHOTO = {
  IMAGE: Object.assign({}, fixedCommon, {
    top: STYLE.HOME_PAGE.MIDDLE.top,
    bottom: STYLE.HOME_PAGE.MIDDLE.bottom,
    width: "100%",
    height: "50%",
    margin: 0,
    textAlign: "center",
  }),

  BOX_INFO: {
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "14%",
    padding: 2,
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
STYLE.PLANT_PHOTO.SPECIES = Object.assign({}, STYLE.PLANT_PHOTO.GENUS, {
  color: "#082",
});
STYLE.PLANT_PHOTO.AUTHORSHIP = Object.assign({}, STYLE.PLANT_PHOTO.GENUS, {
  color: "gray",
  fontSize: "100%",
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
