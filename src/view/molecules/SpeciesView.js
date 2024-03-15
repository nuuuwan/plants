import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import Style from "../Style";

export default function SpeciesView({ species }) {
  if (!species) {
    return null;
  }

  return (
    <Box sx={Style.PLANT_PHOTO.BOX_INFO}>
      <Typography sx={Style.PLANT_PHOTO.FAMILY}>
        <WikiLink>{species.familyName}</WikiLink>
      </Typography>

      <Typography sx={Style.PLANT_PHOTO.GENUS}>
        <span style={Style.PLANT_PHOTO.GENUS}>
          <WikiLink> {species.genusName}</WikiLink>
        </span>
        <span style={Style.PLANT_PHOTO.SPECIES}>
          {" "}
          <WikiLink label={species.speciesName}> {species.name}</WikiLink>
        </span>
      </Typography>

      <Typography sx={Style.PLANT_PHOTO.COMMON_NAMES}>
        {species.commonNamesStrShort}
      </Typography>
    </Box>
  );
}
