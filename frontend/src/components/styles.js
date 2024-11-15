import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
  } from "@mui/material";
  
  const drawerWidth = 240;
  
  export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "0.875rem",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "0.9rem",
      color: theme.palette.text.primary,
      fontFamily: "'Poppins', sans-serif",
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
      transition: "background-color 0.2s ease-in-out",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.secondary,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
      borderRight: `1px solid ${theme.palette.divider}`,
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));
  