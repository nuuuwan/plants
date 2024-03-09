import { Typography } from "@mui/material";
import { WikiLink } from "../atoms";

function ConfidenceViewItem({ plantResult }) {
  const confidence = plantResult.confidence;
  let a;
  if (confidence > 0.75) {
    a = "f";
  } else if (confidence > 0.5) {
    a = "8";
  } else if (confidence > 0.25) {
    a = "4";
  } else {
    a = "1";
  }
  const color = "#000" + a;
  return (
    <span style={{ color }}>
      <WikiLink label={plantResult.scientificNameAndConfidence}>
        {plantResult.scientificName}
      </WikiLink>
    </span>
  );
}

export default function ConfidenceView({ plantPhoto }) {
  return (
    <Typography sx={{ color: "gray" }}>
      Confidence:
      {plantPhoto.plantResults.map(function (plantResult, i) {
        return (
          <ConfidenceViewItem
            key={"plant-result-" + i}
            plantResult={plantResult}
          />
        );
      })}
    </Typography>
  );
}
