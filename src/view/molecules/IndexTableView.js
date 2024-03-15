import { Box, Typography } from "@mui/material";
import IndexTableViewStyle from "./IndexTableViewStyle";

export default function IndexTableView({ idx, onClick }) {
  return (
    <Box sx={IndexTableViewStyle.BOX}>
      {Object.entries(idx).map(function ([name, eppIds], i) {
        const n = eppIds.length;
        const onClickInner = function () {
          onClick(eppIds[0]);
        };
        return (
          <Typography sx={IndexTableViewStyle.ENTRY} onClick={onClickInner}>
            {name} {n > 1 ? `(${n})` : ""}
          </Typography>
        );
      })}
    </Box>
  );
}
