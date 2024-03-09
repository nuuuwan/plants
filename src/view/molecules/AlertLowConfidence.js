import { Alert } from "@mui/material";

export default function AlertLowConfidence({ plantPhoto }) {
  if (!plantPhoto.isLowConfidence) {
    return null;
  }
  return (
    <Alert severity="error" sx={{ m: 2, p: 1, fontSize: "70%" }}>
      <strong>Identification Confidence for this Photo is too low.</strong>
      <br />
      {plantPhoto.confidenceStrAll}
    </Alert>
  );
}
