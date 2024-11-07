import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.studentId = action.payload.studentId;
            state.currentRole = action.payload.currentRole;
            // Update other data...
        },
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.studentsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
        
    },
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.studentId = action.payload.studentId;
            state.currentRole = action.payload.currentRole;
            // Update other data...
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;