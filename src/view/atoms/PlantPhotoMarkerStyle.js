let PlantPhotoMarkerStyle = {
  MARKER: {
    CIRCLE: { color: "#cccc", weight: 2, fillOpacity: 1 },
  },
};

PlantPhotoMarkerStyle.MARKER.CIRCLE_ACTIVE = Object.assign(
  {},
  PlantPhotoMarkerStyle.MARKER.CIRCLE,
  { color: "#040", weight: 5 }
);

PlantPhotoMarkerStyle.BACK_COLORS_BY_DISTANCE = [
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

PlantPhotoMarkerStyle.FORE_COLORS_BY_DISTANCE = [
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

export default PlantPhotoMarkerStyle;
