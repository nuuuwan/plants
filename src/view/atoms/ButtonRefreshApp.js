import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ButtonRefreshApp() {
  const onClick = function () {
    window.location.reload();
    localStorage.clear();
    console.debug("localStorage cleared");
  };

  return (
    <IconButton onClick={onClick}>
      <RefreshIcon />
    </IconButton>
  );
}
