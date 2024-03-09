import { Box } from "@mui/material";

import STYLE from "../STYLE";
export default function PlantPhotoView({ plantPhoto, onClickImage }) {
  return (
    <Box>
      <img
        src={plantPhoto.urlImage}
        alt={plantPhoto.scientificName}
        style={STYLE.PLANT_PHOTO.IMAGE}
        onClick={onClickImage}
      />
    </Box>
  );
}
