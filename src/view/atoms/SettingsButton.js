import { IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsButtonStyle from "./SettingsButtonStyle";

export default function SettingsButton({ onClick }) {
  return (
    <IconButton sx={SettingsButtonStyle} onClick={onClick}>
      <BarChartIcon />
    </IconButton>
  );
}
