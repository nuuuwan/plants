let PlantPhotoViewStyle = {
  IMAGE: {
    width: "400px",
    height: "400px",
    filter: "saturate(1.25) contrast(1.25)",
  },
  CONFIDENCE: {
    position: "fixed",
    right: 20,
    top: "110px",
    maxWidth: "320px",

    fontSize: "80%",
    padding: 0.6,
    borderRadius: 3,

    color: "white",
    backgroundColor: "#0006",
  },
};

PlantPhotoViewStyle.TIME_STR = Object.assign(
  {},
  PlantPhotoViewStyle.CONFIDENCE,
  {
    top: "460px",
  }
);

export default PlantPhotoViewStyle;
