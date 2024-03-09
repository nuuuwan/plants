import { Box, Typography } from "@mui/material";
import { WikiLink } from "../atoms";

function ConfidenceViewItem({ plantResult }) {
  return (
    <WikiLink label={plantResult.scientificNameAndConfidence}>
    {plantResult.scientificName}
</WikiLink>
  )
}

export default function ConfidenceView({ plantPhoto }) {
  return (
    <Typography sx={{color: "gray"}}>
        Confidence: 
      {plantPhoto.plantResults.map(function (plantResult) {
        return <ConfidenceViewItem plantResult={plantResult} />;
      })}
    </Typography>
  );
}
