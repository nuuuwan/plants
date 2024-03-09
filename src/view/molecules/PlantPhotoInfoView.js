import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import STYLE from "../STYLE";

export default function PlantPhotoInfoView({ plantPhoto, onClickImage }) {
  const onClick = function () {
    window.location.reload();
    localStorage.clear();
    console.debug("localStorage cleared");
  };

  const wordCount = plantPhoto.commonNamesStr.length;
  const fontSize = Math.min(12, 2400 / wordCount) + "px";

  const styleCommonNames = Object.assign({}, STYLE.PLANT_PHOTO.COMMON_NAMES, {
    fontSize,
  });

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
          <WikiLink> {plantPhoto.species}</WikiLink>
        </span>
        <span style={STYLE.PLANT_PHOTO.AUTHORSHIP}>
          {"  " + plantPhoto.authorship}
        </span>
      </Typography>
      <Typography sx={styleCommonNames}>{plantPhoto.commonNamesStr}</Typography>
    </Box>
  );
}
