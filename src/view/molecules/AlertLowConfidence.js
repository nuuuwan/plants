import { Alert } from "@mui/material";

export default function AlertLowConfidence({ plantPhoto }) {
  if (!plantPhoto.isLowConfidence) {
    return null;
  }
  return (
    <Alert severity="error" sx={{m:3,p:1,fontSize: "100%"}}>
      <strong>Identification Confidence for this Photo is too low.</strong>
      <br/>
      {plantPhoto.confidenceStrAll}
    </Alert>
  );
}
