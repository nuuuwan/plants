import { IconButton } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ButtonSettingsStyle from "./ButtonSettingsStyle";

export default function ButtonSettings({ onClick }) {
  return (
    <IconButton sx={ButtonSettingsStyle} onClick={onClick}>
      <ListIcon />
    </IconButton>
  );
}
