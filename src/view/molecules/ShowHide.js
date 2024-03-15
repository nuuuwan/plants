import { Box, Grid, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const Style_PAPER = {
  width: "fit-content",
  height: "fit-content",
  maxHeight: 600,
  background: "rgba(255,255,255,0.8)",
  margin: 1,
  padding: 0,
  borderRadius: 5,
};

export const Style_BOX_INNER = {
  padding: 1,
  margin: 1,
};

const Style_HIDE_CONTENT = {
  margin: 1,
  padding: 0,
  borderRadius: 5,
};

export default function ShowHide({
  show,
  ShowIcon,
  onShow,
  onHide,
  children,
  alignLeft,
  hideContent,
}) {
  const justifyContent = alignLeft ? "" : "flex-end";
  return (
    <Grid container justifyContent={justifyContent}>
      <Paper sx={Style_PAPER}>
        {show ? (
          <Box sx={Style_BOX_INNER}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={onHide} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            {children}
          </Box>
        ) : hideContent ? (
          <Box sx={Style_HIDE_CONTENT} onClick={onShow}>
            {hideContent}
          </Box>
        ) : (
          <IconButton onClick={onShow} size="small">
            <ShowIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
}
