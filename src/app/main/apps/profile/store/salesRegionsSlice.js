import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.salesRegionId;
}

export const getSalesRegions= createAsyncThunk(
  'profileApp/salesRegions/getSalesRegions',
  async (params, { getState }) => {
    const response = await axios.get(`http://192.168.1.8/api/SalesRegion/GetAllSalesRegion`);

    const data = await response.data;

    return data;
  }
);

const salesRegionsAdapter = createEntityAdapter({
  selectId: selectRoleId
 });

export const { selectAll: selectSalesRegions, selectById: selectSalesRegionsById } = salesRegionsAdapter.getSelectors(
  (state) => state.profileApp.salesRegions
);

const salesRegionsSlice = createSlice({
  name: 'profileApp/salesRegions',
  initialState: salesRegionsAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getSalesRegions.fulfilled]: salesRegionsAdapter.setAll,
  },
});

export default salesRegionsSlice.reducer;

