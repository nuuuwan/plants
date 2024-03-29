import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import PhoneBookStyle from "./PhoneBookStyle.js";
export default function PhoneBook({
  dataList,
  historyDataList,
  getLabel,
  getN,
  onClick,
  getStyle,
}) {
  let [filterText, setFilterText] = useState("");

  const onChangeTextFieldSearch = function (event) {
    const value = event.target.value;
    setFilterText(value);
  };

  const filteredDataList = dataList.filter(function (d) {
    return getLabel(d).toLowerCase().includes(filterText.toLocaleLowerCase());
  });

  const filteredHistoryDataList = historyDataList.filter(function (d) {
    return getLabel(d).toLowerCase().includes(filterText.toLocaleLowerCase());
  });

  const idList = filteredDataList.map(function (d) {
    return d.id;
  });
  const uniqueIdList = [...new Set(idList)];
  const nUniqueIdList = uniqueIdList.length;

  let groupToDataList = filteredDataList.reduce(function (groupToDataList, d) {
    const label = getLabel(d);
    const words = label.split(" ");
    if (words[0].length <= 1) {
      return groupToDataList;
    }

    const group = label.substring(0, 1).toUpperCase();
    const isAlpha = /^[a-z]+$/i.test(group);
    if (!isAlpha) {
      return groupToDataList;
    }
    if (!groupToDataList[group]) {
      groupToDataList[group] = [];
    }
    groupToDataList[group].push(d);

    return groupToDataList;
  }, {});

  const sortedGroups = [].concat(
    "Recents",
    Object.keys(groupToDataList).sort()
  );
  groupToDataList["Recents"] = filteredHistoryDataList;

  return (
    <Box sx={PhoneBookStyle.BOX}>
      <TextField
        placeholder="Search"
        sx={PhoneBookStyle.TEXT_FIELD_SEARCH}
        onChange={onChangeTextFieldSearch}
      />

      <List>
        {sortedGroups.map(function (group) {
          const dataList = groupToDataList[group];
          const sortedDataList = dataList.sort(function (a, b) {
            return getLabel(a).localeCompare(getLabel(b));
          });
          const nDataList = sortedDataList.length;
          if (nDataList === 0) {
            return null;
          }
          const key = `group-${group}`;
          return (
            <Box key={key}>
              <ListSubheader sx={PhoneBookStyle.LIST_SUBHEADER}>
                <Typography variant="h5">{group}</Typography>
              </ListSubheader>
              {sortedDataList.map(function (d, i) {
                const onClickInner = function () {
                  return onClick(d);
                };
                const key = "item-" + group + "-" + i;
                const label = getLabel(d);
                const n = getN(d);
                const labelDisplay = label + (n > 1 ? ` (${n})` : "");
                return (
                  <ListItem key={key} sx={PhoneBookStyle.LIST_ITEM}>
                    <Typography sx={getStyle(d)} onClick={onClickInner}>
                      {labelDisplay}
                    </Typography>
                  </ListItem>
                );
              })}
            </Box>
          );
        })}
      </List>
      <Typography variant="body2" sx={PhoneBookStyle.LABEL_N_RESULTS}>
        {nUniqueIdList} photos found.
      </Typography>
    </Box>
  );
}
