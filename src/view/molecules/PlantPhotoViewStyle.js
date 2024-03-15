let PlantPhotoViewStyle = {
  IMAGE: {
    position: "fixed",
    left: 0,
    right: 0,
    top: "12.5%",
    bottom: "62.5%",
    width: "100%",
    height: "50%",
    margin: 0,
    textAlign: "center",
    filter: "saturate(1.25) contrast(1.25)",
    objectFit: "cover",
    zIndex: -100,
  },
  TIME_STR: {
    position: "fixed",
    left: 0,
    right: 0,
    top: "55%",

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
};

PlantPhotoViewStyle.CONFIDENCE = Object.assign(
  {},
  PlantPhotoViewStyle.TIME_STR,
  {
    top: "15%",
  }
);

export default PlantPhotoViewStyle;
