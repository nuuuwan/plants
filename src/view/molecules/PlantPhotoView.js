import { Typography, Box } from "@mui/material";

import STYLE from "../STYLE";
export default function PlantPhotoView({ activeEPP, onClickImage }) {
  const plantPhoto = activeEPP.plantPhoto;
  const plantNetResult = activeEPP.plantNetResult;
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={STYLE.PLANT_PHOTO.IMAGE}
        onClick={onClickImage}
      />
      <Typography sx={STYLE.PLANT_PHOTO.CONFIDENCE}>
        {plantNetResult.confidenceStrImportant}
      </Typography>
      <Typography sx={STYLE.PLANT_PHOTO.TIME_STR}>
        {plantPhoto.timeStr}
      </Typography>
    </Box>
  );
}
