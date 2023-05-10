import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
function selectRoleId(instance) {
    return instance.dateFormatId;
  }

export const getCountries = createAsyncThunk(
  'profileApp/countries/getCountries',
  async (params, { getState }) => {
    const response = await axios.get('/api/countries');

    const data = await response.data;

    return data;
  }
);

const countriesAdapter = createEntityAdapter({
    selectId: selectRoleId
  });

export const { selectAll: selectCountries, selectById: selectCountriesById } =
  countriesAdapter.getSelectors((state) => state.profileApp.countries);

const countriesSlice = createSlice({
  name: 'profileApp/countries',
  initialState: countriesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getCountries.fulfilled]: countriesAdapter.setAll,
  },
});

export default countriesSlice.reducer;
