let STYLE = {};

const fixedCommon = {
  position: "fixed",
  left: 0,
  right: 0,
};

STYLE.HOME_PAGE = {
  TOP: Object.assign({}, fixedCommon, {
    top: 0,
    bottom: "67%",
  }),
  BOTTOM: Object.assign({}, fixedCommon, {
    top: "67%",
    bottom: 0,
  }),
};

STYLE.PLANT_PHOTO = {
  IMAGE: Object.assign({}, fixedCommon, {
    top: 0,
    bottom: "50%",
    width: "100%",
    height: "100%",
    zIndex: -1,
    textAlign: "center",
  }),

  BOX_INFO: {
    margin: 1,
    padding: 1,
    backgroundColor: "#fffe",
    borderRadius: 5,
    width: "fit-content",

    maxWidth: "320px",
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
