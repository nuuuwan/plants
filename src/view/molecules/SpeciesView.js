import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

import SpeciesViewStyle from "./SpeciesViewStyle";

export default function SpeciesView({ activeEPP }) {
  const species = activeEPP.species;
  const plantNetResult = activeEPP.plantNetResult;

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
          <span style={SpeciesViewStyle.CONFIDENCE_WARNING}>
            {plantNetResult.confidenceWarning}
          </span>
        </span>
      </Typography>

      <Typography sx={SpeciesViewStyle.COMMON_NAMES}>
        {species.commonNamesStrShort}
      </Typography>
    </Box>
  );
}
