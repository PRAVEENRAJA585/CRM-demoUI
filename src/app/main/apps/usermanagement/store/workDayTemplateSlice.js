import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.workDayId;
}

export const getWorkDayTemplate= createAsyncThunk(
  'userApp/workDayTemplate/getworkDayTemplate',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/WorkDay/GetAllWorkingDays');

    const data = await response.data;

    return data;
  }
);

const workDayTemplateAdapter = createEntityAdapter({
  selectId: selectRoleId
});


export const { selectAll: selectWorkDayTemplate, selectById: selectWorkDayTemplateById } = workDayTemplateAdapter.getSelectors(
  (state) => state.userManagementApp.workDayTemplate
);


const workDayTemplateSlice = createSlice({
  name: 'userManagementApp/workDayTemplate',
  initialState: workDayTemplateAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getWorkDayTemplate.fulfilled]: workDayTemplateAdapter.setAll,
  },
});

export default workDayTemplateSlice.reducer;

