import { Box, Typography } from "@mui/material";
import {WikiLink} from "../atoms";
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
        <Typography sx={STYLE.PLANT_PHOTO.TIME_STR}>
          {plantPhoto.timeStr}
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.FAMILY}>
        <WikiLink>{plantPhoto.family}</WikiLink>
        </Typography>

        <Typography>
          <span style={STYLE.PLANT_PHOTO.SCIENTIFIC_NAME}>
            <WikiLink>      {plantPhoto.scientificName}</WikiLink>
      
          </span>
          <span style={STYLE.PLANT_PHOTO.AUTHORSHIP}>
            {" " + plantPhoto.authorship}
          </span>
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.COMMON_NAMES}>
          {plantPhoto.commonNamesStr}
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.CONFIDENCE}>
          {"Confidence: " + plantPhoto.confidenceStr}
        </Typography>
      </Box>
    </Box>
  );
}
