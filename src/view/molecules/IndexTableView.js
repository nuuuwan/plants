import { Box, Typography } from "@mui/material";
import IndexTableViewStyle from "./IndexTableViewStyle";

export default function IndexTableView({ idx, onClick }) {
  return (
    <Box sx={IndexTableViewStyle.BOX}>
      <Typography variant="h5">
        Index
      </Typography>
      {Object.entries(idx).map(function ([name, eppIds], i) {
        const n = eppIds.length;
        const onClickInner = function () {
          onClick(eppIds[0]);
        };
        
        return (
          <Typography key={'index-item' + i} sx={IndexTableViewStyle.ENTRY} onClick={onClickInner}>
            {name} {n > 1 ? `(${n})` : ""}
          </Typography>
        );
      })}
    </Box>
  );
}
