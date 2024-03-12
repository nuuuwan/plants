import { Alert } from "@mui/material";
import { PlantNetResult } from "../../nonview/core";
import { Format } from "../../nonview/base";

export default function AlertLowConfidence({ plantNetResult }) {

  return (
    <Alert severity="error" sx={{ m: 1, fontSize: "80%" }}>
      Low indentification confidence!
      <p style={{ fontSize: "80%",margin: 0, padding: 0 }}>{plantNetResult.confidenceStrImportant}</p>
    </Alert>
  );
}
