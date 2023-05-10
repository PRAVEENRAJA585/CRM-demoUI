import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.timeZoneId;
}

export const getTimeZone= createAsyncThunk(
  'userApp/TimeZone/getTimeZone',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/TimeZone/GetAllTimeZone');
    const data = await response.data;

    return data;
  }
);

const timeZoneAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectTimeZone, selectById: selectTimeZoneById } = timeZoneAdapter.getSelectors(
  (state) => state.userManagementApp.timeZone
);

const timeZoneSlice = createSlice({
  name: 'userManagementApp/timeZone',
  initialState: timeZoneAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getTimeZone.fulfilled]: timeZoneAdapter.setAll,
  },
});

export default timeZoneSlice.reducer;

