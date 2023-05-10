import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.leaveId;
}

export const getMyLeaves = createAsyncThunk('profileApp/myLeaves/getMyLeaves', async () => {
  const response = await axios.get(`http://192.168.1.8/api/MyLeave/GetallLeave`);
  const data = await response.data;

  return data;
});


const myLeavesAdapter = createEntityAdapter({
  selectId: selectUserId,
  selectIds: (state) => Object.values(state.entities).map(entity => entity.leaveId),
});

export const { selectAll: selectMyLeaves, selectById: selectMyleavesById } =
  myLeavesAdapter.getSelectors((state) => state.profileApp.myLeaves);

const myLeavesSlice = createSlice({
  name: 'profileApp/myLeaves',
  initialState: myLeavesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setMyLeavesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getMyLeaves.fulfilled]: myLeavesAdapter.setAll,
   
  },
});

export const { setMyLeavesSearchText } = myLeavesSlice.actions;


export const selectMyLeavesSearchText = ({ profileApp }) => profileApp.myLeaves.searchText;

export default myLeavesSlice.reducer;
