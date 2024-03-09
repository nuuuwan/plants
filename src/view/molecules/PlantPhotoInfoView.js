import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import STYLE from "../STYLE";

export default function PlantPhotoInfoView({ plantPhoto, onClickImage }) {

  if (plantPhoto.isLowConfidence) {
    return null;
  }

  const onClick = function () {
    window.location.reload();
    localStorage.clear();
    console.debug("localStorage cleared");
  };

  return (
    <Box sx={STYLE.PLANT_PHOTO.BOX_INFO} onClick={onClick}>
      <Typography sx={STYLE.PLANT_PHOTO.FAMILY}>
        <WikiLink>{plantPhoto.family}</WikiLink>
      </Typography>

      <Typography sx={STYLE.PLANT_PHOTO.GENUS}>
        <span style={STYLE.PLANT_PHOTO.GENUS}>
          <WikiLink> {plantPhoto.genus}</WikiLink>
        </span>
        <span style={STYLE.PLANT_PHOTO.SPECIES}>
          {" "}
          <WikiLink label={plantPhoto.species}>
            {" "}
            {plantPhoto.scientificName}
          </WikiLink>
        </span>
        <span style={STYLE.PLANT_PHOTO.AUTHORSHIP}>
          {"  " + plantPhoto.authorship}
        </span>
      </Typography>
      <Typography sx={STYLE.PLANT_PHOTO.COMMON_NAMES}>
        {plantPhoto.commonNamesStr}
      </Typography>
    </Box>
  );
}
