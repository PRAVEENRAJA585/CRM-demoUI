import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.dateFormatId;
}

export const getDateFormat = createAsyncThunk(
  'userApp/dateFormat/getDateFormat',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/DateFormat/GetAllDateformat');

    const data = await response.data;

    return data;
  }
);

const dateFormatAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectDateFormat, selectById: selectDateFormatById } = dateFormatAdapter.getSelectors(
  (state) => state.userManagementApp.dateFormat
);

const dateFormatSlice = createSlice({
  name: 'userManagementApp/dateFormat',
  initialState: dateFormatAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getDateFormat.fulfilled]: dateFormatAdapter.setAll,
  },
});

export default dateFormatSlice.reducer;

