import { Typography, Box } from "@mui/material";

import STYLE from "../STYLE";
export default function PlantPhotoView({ plantPhoto, onClickImage }) {
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={STYLE.PLANT_PHOTO.IMAGE}
        onClick={onClickImage}
      />
      <Typography sx={STYLE.PLANT_PHOTO.CONFIDENCE}>
        {plantPhoto.confidenceStr}
      </Typography>
      <Typography sx={STYLE.PLANT_PHOTO.TIME_STR}>
        {plantPhoto.photoInfoStr}
      </Typography>
    </Box>
  );
}
