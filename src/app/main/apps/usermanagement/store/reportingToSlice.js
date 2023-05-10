import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.reportingToId;
}

export const getReportingTo = createAsyncThunk(
  'userApp/reportingTo/getReportingTo',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/ReportingTo/GetAllReportingTo');

    const data = await response.data;

    return data;
  }
);

const reportingToAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectReportingTo, selectById: selectReportingToById } = reportingToAdapter.getSelectors(
  (state) => state.userManagementApp.reportingTo
);

const reportingToSlice = createSlice({
  name: 'userManagementApp/reportingTo',
  initialState: reportingToAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getReportingTo.fulfilled]: reportingToAdapter.setAll,
  },
});

export default reportingToSlice.reducer;
