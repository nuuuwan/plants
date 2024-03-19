import { Box, Typography } from "@mui/material";
import { Format } from "../../nonview/base";
import { Statistics } from "../../nonview/core";
import { VERSION_DATETIME } from "../../nonview/constants/VERSION.js";
import StatisticsPaneStyle from "./StatisticsPaneStyle.js";
import SpeciesViewStyle from "./SpeciesViewStyle.js";

function LabelledStat({ label, stat, color, blurb }) {
  return (
    <Box sx={{ color, marginBottom: 1 }}>
      <Typography variant="h6">{stat}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        {label}
      </Typography>
      {blurb && (
        <Typography variant="body1" sx={{ opacity: 0.5 }}>
          {blurb}
        </Typography>
      )}
    </Box>
  );
}

export default function StatisticsPane({ eppIdx }) {
  const stats = Statistics.fromExtendedPlantPhotoIdx(eppIdx);

  const onClick = function () {
    window.location.reload();
    localStorage.clear();
    console.debug("localStorage cleared");
  };

  return (
    <Box sx={StatisticsPaneStyle.BOX}>
      <Box sx={{ marginBottom: 1 }}>
        <LabelledStat
          label="Unique Species"
          stat={stats.nSpecies}
          color={SpeciesViewStyle.COLOR.species}
          blurb={stats.speciesBlurb}
        />
        <LabelledStat
          label="Unique Genera"
          stat={stats.nGenus}
          color={SpeciesViewStyle.COLOR.genus}
          blurb={stats.genusBlurb}
        />
        <LabelledStat
          label="Unique Families"
          stat={stats.nFamily}
          color={SpeciesViewStyle.COLOR.family}
          blurb={stats.familyBlurb}
        />
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <LabelledStat label="Photos" stat={stats.nPhotos} color="black" />
        <LabelledStat
          label="Days of Photos"
          stat={stats.nPhotoDays}
          color="black"
        />
        <LabelledStat
          label="Latest Photo"
          stat={stats.maxPhotoDateTime}
          color="black"
        />
      </Box>
      <Box sx={{ marginBottom: 1, cursor: "pointer" }} onClick={onClick}>
        <LabelledStat
          label="Lastest Update to App"
          stat={Format.dateTimeStr(VERSION_DATETIME)}
          color="#468"
        />
      </Box>
    </Box>
  );
}
