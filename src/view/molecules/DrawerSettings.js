import { Box, Typography } from "@mui/material";
import { Statistics } from "../../nonview/core";
import { DATETIME_STR } from "../../nonview/constants/VERSION.js";
import STYLE from "../STYLE.js";

function LabelledStat({ label, stat, color, blurb }) {
  return (
    <Box sx={{ color, marginBottom:1 }}>
    
      <Typography variant="h4">{stat}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.5 }}>
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

export default function DrawerSettings({ eppIdx }) {
  const stats = Statistics.fromExtendedPlantPhotoIdx(eppIdx);
  return (
    <Box sx={STYLE.DRAWER_SETTINGS}>

      <Box sx={{ marginBottom: 5 }}>
      <LabelledStat
          label="App"
          stat={"https://nuuuwan.github.io/plants"}
          color="#ccc"
        />
        <LabelledStat
          label="App Version"
          stat={"v" + DATETIME_STR}
          color="#ccc"
        />
      </Box>
      
      <Box sx={{ marginBottom: 5 }}>
      <LabelledStat label="Photos" stat={stats.nPhotos} color="black" />
      <LabelledStat label="Photo Days" stat={stats.nPhotoDays} color="black" />
      <LabelledStat label="Latest Photo" stat={stats.maxPhotoDay} color="black" />      
      </Box>
      
      <Box sx={{ marginBottom: 5 }}>
      <LabelledStat label="Unique Species" stat={stats.nSpecies} color="#080" blurb={stats.speciesBlurb} />
      <LabelledStat label="Unique Genera" stat={stats.nGenus} color="#f80" blurb={stats.genusBlurb}/>
      <LabelledStat label="Unique Families" stat={stats.nFamily} color="#800" blurb={stats.familyBlurb}/>
      </Box>
    </Box>
  );
}
