// src/redux/missedSessionRelated/missedSessionHandle.js
export const reportMissedSession = (data) => async (dispatch) => {
    try {
      // Your action to report a missed session (API call, etc.)
      dispatch({ type: 'REPORT_MISSED_SESSION', payload: data });
    } catch (error) {
      console.error('Error in reportMissedSession:', error);
    }
  };