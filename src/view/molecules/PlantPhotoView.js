import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import STYLE from "../STYLE";
export default function PlantPhotoView({ plantPhoto, onClickImage }) {
  const onClick = function () {
    // reload
    window.location.reload();
  };
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={STYLE.PLANT_PHOTO.IMAGE}
        onClick={onClickImage}
      />
      <Box sx={STYLE.PLANT_PHOTO.BOX_INFO} onClick={onClick}>
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


      </Box>
    </Box>
  );
}
