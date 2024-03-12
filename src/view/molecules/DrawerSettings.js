import { Box, Typography } from "@mui/material";
import { Statistics } from "../../nonview/core";
import {
  DATETIME_STR,

} from "../../nonview/constants/VERSION.js";
import STYLE from "../STYLE.js";

function LabelledStat({ label, stat, color }) {

  return (
    <Box sx={{ color }}>
      <Typography variant="h6" sx={{opacity: 0.5}}>{label}</Typography>
      <Typography variant="h4" >{stat}</Typography>
    </Box>
  );
}

export default function DrawerSettings({ eppIdx }) {
  const { nPhotos, nPhotoDays, maxPhotoDay, nSpecies, nGenus, nFamily } =
    Statistics.fromExtendedPlantPhotoIdx(eppIdx).to_dict();
  return (
    <Box sx={STYLE.DRAWER_SETTINGS}>
            <Box sx={{marginBottom:5}}>
      <LabelledStat label="App Version" stat={'v'+ DATETIME_STR} color="#ccc" />
      </Box>
      
      <LabelledStat label="Photos" stat={nPhotos} color="black" />
      <LabelledStat label="Photo Days" stat={nPhotoDays} color="black" />
      <LabelledStat label="Latest Photo" stat={maxPhotoDay} color="black" />

      <LabelledStat label="Unique Species" stat={nSpecies} color="#080" />
      <LabelledStat label="Unique Genera" stat={nGenus} color="#f80" />
      <LabelledStat label="Unique Families" stat={nFamily} color="#800" />



    </Box>
  );
}
