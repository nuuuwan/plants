import { IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import STYLE from "../STYLE";

export default function SettingsButton({ onClick }) {
  return (
    <IconButton sx={STYLE.SETTINGS_BUTTON} onClick={onClick}>
      <BarChartIcon />
    </IconButton>
  );
}
