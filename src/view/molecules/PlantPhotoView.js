import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";
import { ConfidenceView } from "../molecules";
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
      <Box sx={STYLE.PLANT_PHOTO.BOX_INFO}>
        <Typography sx={STYLE.PLANT_PHOTO.FAMILY}>
          <WikiLink>{plantPhoto.family}</WikiLink>
        </Typography>

        <Typography>
          <span style={STYLE.PLANT_PHOTO.GENUS}>
            <WikiLink> {plantPhoto.genus}</WikiLink>
          </span>
          <span style={STYLE.PLANT_PHOTO.SPECIES}>
            <WikiLink> {plantPhoto.species}</WikiLink>
          </span>
          <span style={STYLE.PLANT_PHOTO.AUTHORSHIP}>
            {"  " + plantPhoto.authorship}
          </span>
        </Typography>
        <Typography sx={STYLE.PLANT_PHOTO.COMMON_NAMES}>
          {plantPhoto.commonNamesStr}
        </Typography>
        <ConfidenceView plantPhoto={plantPhoto} />
        <Typography sx={STYLE.PLANT_PHOTO.TIME_STR}>
          {plantPhoto.timeStr}
        </Typography>
      </Box>
    </Box>
  );
}
