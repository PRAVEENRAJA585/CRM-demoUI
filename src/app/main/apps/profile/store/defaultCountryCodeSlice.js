import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.defaultCountryCodeId;
}

export const getDefaultCountryCode = createAsyncThunk(
  'profileApp/defaultCountryCode/getDefaultCountryCode',
  async (params, { getState }) => {
    
    const response = await axios.get('http://192.168.1.8/api/DefaultCountryCode/GetallDefaultCountryCode');

    const data = await response.data;

    return data;
  }
);

const defaultCountryCodeAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectDefaultCountryCode, selectById: selectDefaultCountryCodeById } = defaultCountryCodeAdapter.getSelectors(
  (state) => state.profileApp.defaultCountryCode
);

const defaultCountryCodeSlice = createSlice({
  name: 'profileApp/defaultCountryCode',
  initialState: defaultCountryCodeAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getDefaultCountryCode.fulfilled]: defaultCountryCodeAdapter.setAll,
  },
});

export default defaultCountryCodeSlice.reducer;

