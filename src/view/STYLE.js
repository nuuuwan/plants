let STYLE = {};

const fixedCommon = {
  position: "fixed",
  left: 0,
  right: 0,
};

const RATIOS = [1, 4, 3];
const sum = RATIOS.reduce((a, b) => a + b, 0);
export const p1 = RATIOS[0] / sum;
export const p2 = RATIOS[1] / sum;
// const p3 = RATIOS[2] / sum;

const p1pct = (p1 * 100).toFixed(0) + "%";
const p2pct = (p2 * 100).toFixed(0) + "%";
const p12pct = ((p1 + p2) * 100).toFixed(0) + "%";
const p12apct = ((p1 + p2) * 0.9 * 100).toFixed(0) + "%";
const p12bpct = (p1 * 1.2 * 100).toFixed(0) + "%";

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
    textAlign: "center",
    fontSize: "80%",
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
    fontSize: "80%",
    textAlign: "center",
    width: "fit-content",
    padding: 0.5,
    borderRadius: 2,
    color: "white",
    backgroundColor: "#0006",
  }),

  MARKER: {
    CIRCLE: { color: "#cccc", weight: 2, fillOpacity: 1 },
  },
};

STYLE.PLANT_PHOTO.SPECIES = Object.assign({}, STYLE.PLANT_PHOTO.GENUS, {
  color: "#082",
});

STYLE.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE = Object.assign(
  {},
  STYLE.PLANT_PHOTO.MARKER.CIRCLE,
  { color: "#040", weight: 5 }
);

STYLE.PLANT_PHOTO.CONFIDENCE = Object.assign({}, STYLE.PLANT_PHOTO.TIME_STR, {
  top: p12bpct,
});

STYLE.WIKI_LINK = {
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
};

STYLE.BACK_COLORS_BY_DISTANCE = [
  // Related
  "#080",
  "#080",
  "#f80",
  "#800",
  // Unrelated
  "#d0f0ff",
  // Low Data
  "#fefeff",
  "#fefeff",
];

STYLE.FORE_COLORS_BY_DISTANCE = [
  // Related
  "white",
  "white",
  "white",
  "white",
  // Unrelated
  "gray",
  // Low Data
  "gray",
  "gray",
];

STYLE.SETTINGS_BUTTON = {
  position: "absolute",
  bottom: "8%",
  right: "5%",
  backgroundColor: "white",
};

STYLE.DRAWER_SETTINGS = {
  margin: 1,
  padding: 1,
  maxWidth: 260,
};

export default STYLE;
