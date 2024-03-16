import { Box, List, ListItem, ListSubheader, Typography } from "@mui/material";

export default function PhoneBook({
  dataList,
  getLabel,
  getN,
  onClick,
  getStyle,
}) {
  const groupToDataList = dataList.reduce(function (groupToDataList, d) {
    const group = getLabel(d).substring(0, 1).toUpperCase();
    const isAlpha = /^[a-z]+$/i.test(group);
    if (isAlpha) {
      if (!groupToDataList[group]) {
        groupToDataList[group] = [];
      }
      groupToDataList[group].push(d);
    }
    return groupToDataList;
  }, {});

  const sortedGroups = Object.keys(groupToDataList).sort();

  return (
    <List>
      {sortedGroups.map(function (group) {
        const dataList = groupToDataList[group];
        const sortedDataList = dataList.sort(function (a, b) {
          return getLabel(a).localeCompare(getLabel(b));
        });
        const key = `group-${group}`;
        return (
          <Box key={key}>
            <ListSubheader>
              <Typography variant="h5">{group}</Typography>
            </ListSubheader>
            {sortedDataList.map(function (d, i) {
              const onClickInner = function () {
                return onClick(d);
              };
              const key = "item-" + i;
              const label = getLabel(d);
              const n = getN(d);
              const labelDisplay = label + (n > 1 ? ` (${n})` : "");
              return (
                <ListItem key={key} sx={{ m: 0.5, marginLeft: 3, p: 0 }}>
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
  );
}