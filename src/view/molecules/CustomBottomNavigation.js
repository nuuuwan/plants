import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CustomBottomNavigation({
  onClickCenterOnCurrentLocation,
}) {
  const onClickRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };

  const onClickBack = function () {
    console.debug("TODO");
  };

  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<ArrowBackIosIcon />}
        onClick={onClickBack}
      />
      <BottomNavigationAction icon={<RefreshIcon />} onClick={onClickRefresh} />
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={onClickCenterOnCurrentLocation}
      />
    </BottomNavigation>
  );
}
