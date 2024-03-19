import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { PlantNetResult, IndexTable, HistoryTable } from "../../nonview/core";
import {
  PhoneBook,
  StatisticsPane,
  SpeciesViewStyle,
  LeftDrawerViewStyle,
} from "../molecules";

export default function LeftDrawerView({
  eppIdx,
  historyEppIDList,
  onClickIndex,
}) {
  const indexDataList = IndexTable.getDataList(eppIdx);
  const historyDataList = HistoryTable.getDataList(eppIdx, historyEppIDList);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={LeftDrawerViewStyle.BOX}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Index" />
        <Tab label="Statistics" />
      </Tabs>
      <Box sx={LeftDrawerViewStyle.BOX_INNER}>
        {value === 0 ? (
          <PhoneBook
            dataList={indexDataList}
            historyDataList={historyDataList}
            getLabel={(d) =>
              d.label +
              (d.confidence < PlantNetResult.isLowConfidence
                ? PlantNetResult.EMOJI_UNKNOWN
                : "")
            }
            getN={(d) => d.n}
            getStyle={(d) => ({
              m: 0,
              fontSize: "80%",
              cursor: "pointer",
              color: SpeciesViewStyle.COLOR[d.dataType],
            })}
            onClick={onClickIndex}
          />
        ) : (
          <StatisticsPane eppIdx={eppIdx} />
        )}
      </Box>
    </Box>
  );
}
