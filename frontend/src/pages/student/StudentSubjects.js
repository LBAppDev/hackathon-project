import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
  }, [dispatch, currentUser._id, currentUser.sclassName._id]);

  return (
    <Container sx={{ mt: 5 }}>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Class Information
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
            You are currently enrolled in Class {sclassDetails?.sclassName || "N/A"}
          </Typography>

          <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
            Subjects
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {subjectsList?.length > 0 ? (
              subjectsList.map((subject, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">{subject.subName}</Typography>
                      <Typography color="textSecondary">{subject.subCode}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No subjects found for this class.
              </Typography>
            )}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default StudentSubjects;
