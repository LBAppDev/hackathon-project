import React from "react";
import { SpeedDial, SpeedDialAction, styled } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const SpeedDialTemplate = ({ actions }) => {
  return (
    <CustomSpeedDial
      ariaLabel="SpeedDial example"
      icon={<TuneIcon />}
      direction="left"
    >
      {actions.map((action) => (
        <StyledSpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </CustomSpeedDial>
  );
};

export default SpeedDialTemplate;

const CustomSpeedDial = styled(SpeedDial)(({ theme }) => ({
  ".MuiSpeedDial-fab": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
    },
  },
}));

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  "& .MuiSpeedDialAction-fab": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& .MuiSpeedDialAction-staticTooltipLabel": {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: "0.8rem",
    padding: "4px 8px",
    borderRadius: theme.shape.borderRadius,
  },
}));
