import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.holidayCalendarId;
}

export const getHolidayCalender = createAsyncThunk(
  'userApp/holidayCalender/getHolidayCalender',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/Holiday/GetAllHoliday');

    const data = await response.data;

    return data;
  }
);

const holidayCalenderAdapter = createEntityAdapter({
  selectId: selectRoleId,
});

export const { selectAll: selectHolidayCalender, selectById: selectHolidayCalenderById } = holidayCalenderAdapter.getSelectors(
  (state) => state.userManagementApp.holidayCalender
);

const holidaycalenderSlice = createSlice({
  name: 'userManagementApp/holidayCalender',
  initialState: holidayCalenderAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getHolidayCalender.fulfilled]: holidayCalenderAdapter.setAll,
  },
});

export default holidaycalenderSlice.reducer;

