import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectRoleId(instance) {
  return instance.teamId;
}

export const getTeam= createAsyncThunk(
  'profileApp/team/getTeam',
  async (params, { getState }) => {
    const response = await axios.get('http://192.168.1.8/api/Team/GetAll');

    const data = await response.data;

    return data;
  }
);

const teamAdapter = createEntityAdapter({
  selectId: selectRoleId
});

export const { selectAll: selectTeam, selectById: selectTeamById } = teamAdapter.getSelectors(
  (state) => state.profileApp.team
);

const teamSlice = createSlice({
  name: 'profileApp/team',
  initialState: teamAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getTeam.fulfilled]: teamAdapter.setAll,
  },
});

export default teamSlice.reducer;

