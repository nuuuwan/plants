let Style = {};



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

Style.HOME_PAGE = {
  TOP:{
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: p1pct,
  },
  MIDDLE:{
    position: "fixed",
    left: 0,
    right: 0,
    top: p1pct,
    bottom: p12pct,
  },
  BOTTOM:{
    position: "fixed",
    left: 0,
    right: 0,
    top: p12pct,
    bottom: 0,
  },
};

Style.PLANT_PHOTO = {
  BOX_INFO: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: p1pct,
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

  IMAGE:{
    position: "fixed",
    left: 0,
    right: 0,
    top: Style.HOME_PAGE.MIDDLE.top,
    bottom: Style.HOME_PAGE.MIDDLE.bottom,
    width: "100%",
    height: p2pct,
    margin: 0,
    textAlign: "center",
    filter: "saturate(1.25) contrast(1.25)",
    objectFit: "cover",
    zIndex: -100,
  },
  TIME_STR:{
    position: "fixed",
    left: 0,
    right: 0,
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
  },

  MARKER: {
    CIRCLE: { color: "#cccc", weight: 2, fillOpacity: 1 },
  },
};

Style.PLANT_PHOTO.SPECIES = Object.assign({}, Style.PLANT_PHOTO.GENUS, {
  color: "#082",
});

Style.PLANT_PHOTO.MARKER.CIRCLE_ACTIVE = Object.assign(
  {},
  Style.PLANT_PHOTO.MARKER.CIRCLE,
  { color: "#040", weight: 5 }
);

Style.PLANT_PHOTO.CONFIDENCE = Object.assign({}, Style.PLANT_PHOTO.TIME_STR, {
  top: p12bpct,
});

Style.WIKI_LINK = {
  color: "inherit",
  fontSize: "inherit",
  textDecoration: "none",
};

Style.BACK_COLORS_BY_DISTANCE = [
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

Style.FORE_COLORS_BY_DISTANCE = [
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

Style.SETTINGS_BUTTON = {
  position: "absolute",
  bottom: "8%",
  right: "5%",
  backgroundColor: "white",
};

Style.DRAWER_SETTINGS = {
  margin: 1,
  padding: 1,
  maxWidth: 260,
};

export default Style;
