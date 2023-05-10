import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.phoneNoFormateId;
}

export const getPhoneNoFormate = createAsyncThunk(
  'profileApp/phoneNoFormate/getPhoneNoFormate',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/PhoneNoFormate/GetAllPhoneNoFormate');//

    const data = await response.data;

    return data;
  }
);

const phoneNoFormateAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectPhoneNoFormate, selectById: selectPhoneNoFormateById } = phoneNoFormateAdapter.getSelectors(
  (state) => state.profileApp.phoneNoFormate
);

const phoneNoFormateSlice = createSlice({
  name: 'profileApp/phoneNoFormate',
  initialState: phoneNoFormateAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getPhoneNoFormate.fulfilled]: phoneNoFormateAdapter.setAll,
  },
});

export default phoneNoFormateSlice.reducer;

