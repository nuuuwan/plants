import { IconButton } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';

export default function ButtonReportBug() {
  const onClick = function () {
    const URL = "https://github.com/nuuuwan/plants/issues/new";
    window.open(URL, "_blank");
  };

  return (
    <IconButton onClick={onClick}>
      <BugReportIcon />
    </IconButton>
  );
}
