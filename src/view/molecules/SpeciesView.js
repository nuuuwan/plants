import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import STYLE from "../STYLE";

export default function SpeciesView({ species }) {
  if (!species) {
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
        <WikiLink>{species.familyName}</WikiLink>
      </Typography>

      <Typography sx={STYLE.PLANT_PHOTO.GENUS}>
        <span style={STYLE.PLANT_PHOTO.GENUS}>
          <WikiLink> {species.genusName}</WikiLink>
        </span>
        <span style={STYLE.PLANT_PHOTO.SPECIES}>
          {" "}
          <WikiLink label={species.speciesName}> {species.name}</WikiLink>
        </span>
      </Typography>

      <Typography sx={STYLE.PLANT_PHOTO.COMMON_NAMES}>
        {species.commonNamesStr}
      </Typography>
    </Box>
  );
}
