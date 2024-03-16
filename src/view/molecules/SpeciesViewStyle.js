import PlantPhotoViewStyle from "./PlantPhotoViewStyle";

let SpeciesViewStyle = {};

SpeciesViewStyle.COLOR = {
  family: "#800",
  genus: "#f80",
  species: "#082",
  commonNames: "#444",
};

SpeciesViewStyle.BOX_INFO = {
  height: "105px",
  width: PlantPhotoViewStyle.IMAGE_WIDTH + "px",
  textAlign: "center",
  fontSize: "90%",
  p: 0.5,
  m: 0,
  background: "white",
};

SpeciesViewStyle.FAMILY = {
  fontSize: "100%",
  color: SpeciesViewStyle.COLOR.family,
};

SpeciesViewStyle.GENUS = {
  fontStyle: "italic",
  fontSize: "120%",
  color: SpeciesViewStyle.COLOR.genus,
};

SpeciesViewStyle.COMMON_NAMES = {
  fontSize: "80%",
  color: SpeciesViewStyle.COLOR.commonNames,
};

SpeciesViewStyle.SPECIES = Object.assign({}, SpeciesViewStyle.GENUS, {
  color: SpeciesViewStyle.COLOR.species,
});

export default SpeciesViewStyle;
