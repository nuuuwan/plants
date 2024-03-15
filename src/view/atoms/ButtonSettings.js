import { IconButton } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ButtonSettingsStyle from "./ButtonSettingsStyle";

export default function ButtonSettings({ onClick }) {
  return (
    <IconButton sx={ButtonSettingsStyle} onClick={onClick}>
      <BarChartIcon />
    </IconButton>
  );
}
