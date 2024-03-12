import { Alert } from "@mui/material";
import { PlantNetResult } from "../../nonview/core";
import { Format } from "../../nonview/base";

export default function AlertLowConfidence({ plantNetResult }) {
  const pLimit = Format.percent(PlantNetResult.LIMIT_LOW_CONFIDENCE);
  return (
    <Alert severity="error" sx={{ m: 2, fontSize: "90%" }}>
      Identification Confidence for this Photo is{" "}
      <strong>under {pLimit}</strong>.
      <p style={{ fontSize: "80%" }}>{plantNetResult.confidenceStrImportant}</p>
    </Alert>
  );
}
