import { Tune } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function ConfidenceView({plantPhoto}) {
    return (
        <Box>
            {plantPhoto.plantResults.map(function(plantResult) {
                return (
                    <ConfidenceViewItem>
                        <span>
                            {plantResult}
                        </span>
                    </ConfidenceViewItem>
                )
            })}
        </Box>
    );
}