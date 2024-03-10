import { Alert } from "@mui/material";
import { PlantNetResult } from "../../nonview/core";
import { Format } from "../../nonview/base";

export default function AlertLowConfidence({ plantNetResult }) {
  const pLimit = Format.percent(PlantNetResult.LIMIT_LOW_CONFIDENCE);
  return (
    <Alert severity="error" sx={{ m: 2, fontSize: "67%" }}>
      Identification Confidence for this Photo is{" "}
      <strong>less than {pLimit}</strong>.
      <br />
      {plantNetResult.confidenceStrAll}
    </Alert>
  );
}
