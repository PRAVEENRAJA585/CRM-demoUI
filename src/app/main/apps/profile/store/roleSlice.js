import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


function selectRoleId(instance) {
  return instance.roleId;
}

export const getRole= createAsyncThunk(
  'profileApp/role/getRole',
  async (params, { getState }) => {
    const response = await axios.get(`http://192.168.1.8/api/Role/GetAllRole`);

    const data = await response.data;
    
    return data;
  }
);

const roleAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectRole, selectById: selectRoleById } = roleAdapter.getSelectors(
  (state) => state.profileApp.role
);

const roleSlice = createSlice({
  name: 'profileApp/role',
  initialState: roleAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getRole.fulfilled]: roleAdapter.setAll,
  },
});

export default roleSlice.reducer;

