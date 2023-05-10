import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.countryId;
}

export const getCountry= createAsyncThunk(
  'profileApp/country/getCountry',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/Country/GetAll');
    const data = await response.data;
    return data;
  }
);

const countryAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectCountry, selectById: selectCountryById } = countryAdapter.getSelectors(
  (state) => state.profileApp.country
);

const countrySlice = createSlice({
  name: 'profileApp/country',
  initialState: countryAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getCountry.fulfilled]: countryAdapter.setAll,
  },
});

export default countrySlice.reducer;

