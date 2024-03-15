import { IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import Style from "../Style";

export default function SettingsButton({ onClick }) {
  return (
    <IconButton sx={Style.SETTINGS_BUTTON} onClick={onClick}>
      <BarChartIcon />
    </IconButton>
  );
}
