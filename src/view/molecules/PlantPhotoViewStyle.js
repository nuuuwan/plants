let PlantPhotoViewStyle = {};

PlantPhotoViewStyle.IMAGE_WIDTH = 320;

PlantPhotoViewStyle.IMAGE = {
  width: PlantPhotoViewStyle.IMAGE_WIDTH + "px",
  height: PlantPhotoViewStyle.IMAGE_WIDTH + "px",
  filter: "saturate(1.25) contrast(1.25)",
};

PlantPhotoViewStyle.CONFIDENCE = {
  position: "fixed",
  right: 20,
  top: "110px",
  maxWidth: PlantPhotoViewStyle.IMAGE_WIDTH * 0.9 + "px",

  fontSize: "80%",
  padding: 0.6,
  borderRadius: 3,

  color: "white",
  backgroundColor: "#0006",
};

PlantPhotoViewStyle.TIME_STR = Object.assign(
  {},
  PlantPhotoViewStyle.CONFIDENCE,
  {
    top: "380px",
  }
);

export default PlantPhotoViewStyle;
