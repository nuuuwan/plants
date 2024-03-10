import { Alert } from "@mui/material";
import { PlantNetResult } from "../../nonview/core";

export default function AlertLowConfidence({ plantNetResult }) {

  const pLimit = (PlantNetResult.LIMIT_LOW_CONFIDENCE * 100).toFixed(2) + "%";

  return (
    <Alert severity="error" sx={{ m: 2, fontSize: "80%" }}>

      Identification Confidence for this Photo is <strong>less than {pLimit}</strong>.
      <br/>
      {plantNetResult.confidenceStrAll}
    </Alert>
  );
}
