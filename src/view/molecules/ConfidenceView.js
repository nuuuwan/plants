import { Typography } from "@mui/material";
import { WikiLink } from "../atoms";

function ConfidenceViewItem({ plantResult }) {
  const confidence = plantResult.confidence;
  let color;
  if (confidence > 0.67) {
    color = "#082";
  } else if (confidence > 0.33) {
    color = "#f80";
  } else {
    color = "#800";
  }
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
