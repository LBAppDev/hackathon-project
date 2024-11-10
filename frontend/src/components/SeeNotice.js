import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/noticeHandle";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";

const SeeNotice = () => {
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector((state) => state.notice);

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    }
  }, [dispatch, currentRole, currentUser]);

  if (error) {
    console.error("Error fetching notices:", error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  return (
    <Box sx={{ mt: 6, mr: 3 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : response ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No Notices to Show Right Now
        </Typography>
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Notices
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default SeeNotice;
