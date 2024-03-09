import { Box, Typography } from "@mui/material";
import STYLE from "../STYLE";
export default function PlantPhotoView({ plantPhoto }) {
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={STYLE.PLANT_PHOTO.IMAGE}
      />
      <Box sx={STYLE.PLANT_PHOTO.BOX_INFO}>
        <Typography sx={STYLE.PLANT_PHOTO.FAMILY}>
          {plantPhoto.family}
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.SCIENTIFIC_NAME}>
          {plantPhoto.scientificName + " " + plantPhoto.authorship}
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.TIME_STR}>
          {plantPhoto.timeStr}
        </Typography>
      </Box>
    </Box>
  );
}
