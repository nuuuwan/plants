import SpeciesViewStyle from "./SpeciesViewStyle";

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
  SpeciesViewStyle.COLOR.species,
  SpeciesViewStyle.COLOR.species,
  SpeciesViewStyle.COLOR.genus,
  SpeciesViewStyle.COLOR.family,
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

PlantPhotoMarkerStyle.RADIUS_BY_DISTANCE = [
  // Related
  24, 21, 18, 15,
  // Unrelated
  12,
  // Low Data
  12, 12,
];

export default PlantPhotoMarkerStyle;
