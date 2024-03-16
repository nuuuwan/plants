import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import SpeciesViewStyle from "./SpeciesViewStyle";

export default function SpeciesView({ species }) {
  if (!species) {
    return null;
  }
  
  return (
    <Box sx={SpeciesViewStyle.BOX_INFO}>
      <Typography sx={SpeciesViewStyle.FAMILY}>
        <WikiLink>{species.familyName}</WikiLink>
      </Typography>

      <Typography sx={SpeciesViewStyle.GENUS}>
        <span style={SpeciesViewStyle.GENUS}>
          <WikiLink> {species.genusName}</WikiLink>
        </span>
        <span style={SpeciesViewStyle.SPECIES}>
          {" "}
          <WikiLink label={species.speciesName}> {species.name}</WikiLink>
        </span>
      </Typography>

      <Typography sx={SpeciesViewStyle.COMMON_NAMES}>
        {species.commonNamesStrShort}
      </Typography>
    </Box>
  );
}
