import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.userTypeId;
}

export const getUserType= createAsyncThunk(
  'profileApp/userType/getUserType',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/UserType/GetAllUserType');

    const data = await response.data;

    return data;
  }
);

const userTypeAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectUserType, selectById: selectUserTypeById } = userTypeAdapter.getSelectors(
  (state) => state.profileApp.userType
);

const userTypeSlice = createSlice({
  name: 'profileApp/userType',
  initialState: userTypeAdapter.getInitialState([]),
// initialState: userTypeAdapter.getInitialState({
//     userType: null, // or any default value you want
//   }),
  reducers: {},
  extraReducers: {
    [getUserType.fulfilled]: userTypeAdapter.setAll,
  },
});

export default userTypeSlice.reducer;

