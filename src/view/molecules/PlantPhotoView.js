import { Typography, Box } from "@mui/material";

import Style from "../Style";
export default function PlantPhotoView({ activeEPP, onClickImage }) {
  const plantPhoto = activeEPP.plantPhoto;
  const plantNetResult = activeEPP.plantNetResult;
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={Style.PLANT_PHOTO.IMAGE}
        onClick={onClickImage}
      />
      <Typography sx={Style.PLANT_PHOTO.CONFIDENCE}>
        {plantNetResult.confidenceStrImportant}
      </Typography>
      <Typography sx={Style.PLANT_PHOTO.TIME_STR}>
        {plantPhoto.timeStr}
      </Typography>
    </Box>
  );
}
