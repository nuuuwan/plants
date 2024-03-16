import { Typography, Box } from "@mui/material";

import PlantPhotoViewStyle from "./PlantPhotoViewStyle";

export default function PlantPhotoView({ activeEPP, onClickImage }) {
  const plantPhoto = activeEPP.plantPhoto;
  const plantNetResult = activeEPP.plantNetResult;
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={PlantPhotoViewStyle.IMAGE}
        onClick={onClickImage}
      />
      <Typography sx={PlantPhotoViewStyle.CONFIDENCE}>
        {plantNetResult.confidenceStrImportant}
      </Typography>
      <Typography sx={PlantPhotoViewStyle.TIME_STR}>
        {plantPhoto.dateTimeStr}
      </Typography>
    </Box>
  );
}
