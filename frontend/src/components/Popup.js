import React from "react";
import { useDispatch } from "react-redux";
import { underControl } from "../redux/userRelated/userSlice";
import { underStudentControl } from "../redux/studentRelated/studentSlice";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Popup = ({ message, setShowPopup, showPopup }) => {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false);
    dispatch(underControl());
    dispatch(underStudentControl());
  };

  return (
    <Snackbar
      open={showPopup}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={message === "Done Successfully" ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Popup;

// Alert component refactored to use React.forwardRef directly with props
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
