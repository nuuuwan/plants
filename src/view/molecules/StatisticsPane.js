import { Box, Typography } from "@mui/material";
import { Statistics } from "../../nonview/core/index.js";
import { DATETIME_STR } from "../../nonview/constants/VERSION.js";
import StatisticsPaneStyle from "./StatisticsPaneStyle.js";

function LabelledStat({ label, stat, color, blurb }) {
  return (
    <Box sx={{ color, marginBottom: 1 }}>
      <Typography variant="h5">{stat}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.8 }}>
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
    <Box sx={StatisticsPaneStyle}>
      <Box sx={{ marginBottom: 1 }}>
        <LabelledStat
          label="Unique Species"
          stat={stats.nSpecies}
          color="#080"
          blurb={stats.speciesBlurb}
        />
        <LabelledStat
          label="Unique Genera"
          stat={stats.nGenus}
          color="#f80"
          blurb={stats.genusBlurb}
        />
        <LabelledStat
          label="Unique Families"
          stat={stats.nFamily}
          color="#800"
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
          stat={stats.maxPhotoDay}
          color="black"
        />
      </Box>

      <Box sx={{ marginBottom: 1, cursor: "pointer" }} onClick={onClick}>
        <LabelledStat
          label="App Version"
          stat={"v" + DATETIME_STR}
          color="#468"
        />
      </Box>
    </Box>
  );
}
