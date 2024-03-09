let STYLE = {};

const fixedCommon = {
  position: "fixed",
  left: 0,
  right: 0,
};

const RATIOS = [1, 3, 2];
const sum = RATIOS.reduce((a, b) => a + b, 0);
const p1 = RATIOS[0] / sum;
const p2 = RATIOS[1] / sum;
// const p3 = RATIOS[2] / sum;

const p1pct = (p1 * 100).toFixed(0) + "%";
const p2pct = (p2 * 100).toFixed(0) + "%";
const p12pct = ((p1 + p2) * 100).toFixed(0) + "%";
const p12apct = ((p1 + p2) * 0.93 * 100).toFixed(0) + "%";
const p12bpct = (p1 * 1.17 * 100).toFixed(0) + "%";

STYLE.HOME_PAGE = {
  TOP: Object.assign({}, fixedCommon, {
    top: 0,
    bottom: p1pct,
  }),
  MIDDLE: Object.assign({}, fixedCommon, {
    top: p1pct,
    bottom: p12pct,
  }),
  BOTTOM: Object.assign({}, fixedCommon, {
    top: p12pct,
    bottom: 0,
  }),
};

STYLE.PLANT_PHOTO = {
  BOX_INFO: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: p1pct,
    padding: 0.5,
    textAlign: "center",
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
    fontSize: "100%",
    color: "#444",
  },

  IMAGE: Object.assign({}, fixedCommon, {
    top: STYLE.HOME_PAGE.MIDDLE.top,
    bottom: STYLE.HOME_PAGE.MIDDLE.bottom,
    width: "100%",
    height: p2pct,
    margin: 0,
    textAlign: "center",
    filter: "saturate(150%)",
    objectFit: "cover",
    zIndex: -100,
  }),
  TIME_STR: Object.assign({}, fixedCommon, {
    top: p12apct,

    margin: "auto",
    zIndex: 100,
    fontSize: "67%",
    textAlign: "center",
    width: "fit-content",
    padding: 0.5,
    borderRadius: 2,
    color: "white",
    backgroundColor: "#0006",
  }),

  MARKER: {
    CIRCLE: { color: "#222",weight: 1, fillOpacity: 0.75 },
  },
};

STYLE.PLANT_PHOTO.SPECIES = Object.assign({}, STYLE.PLANT_PHOTO.GENUS, {
  color: "#082",
});
STYLE.PLANT_PHOTO.AUTHORSHIP = Object.assign({}, STYLE.PLANT_PHOTO.GENUS, {
  color: "gray",
  fontSize: "67%",
});

STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE = Object.assign(
  {},
  STYLE.PLANT_PHOTO.MARKER.CIRCLE,
  { color: "black" }
);

STYLE.PLANT_PHOTO.CONFIDENCE = Object.assign({}, STYLE.PLANT_PHOTO.TIME_STR, {
  top: p12bpct,
});

STYLE.WIKI_LINK = {
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
};

export default STYLE;
