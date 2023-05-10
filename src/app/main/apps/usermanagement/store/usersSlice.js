import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function selectUserId(user) {
  return user.userId;
}

export const getUsers = createAsyncThunk('userManagementApp/users/getUsers', async () => {
  const response = await axios.get(`http://192.168.1.8/api/User/GetAll`);
  const data = await response.data;

  return data;
});

export const removeUsers = createAsyncThunk(
  'userManagementApp/users',
  async (userIds, { dispatch, getState }) => {
    await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userIds}`, { data: userIds.userId });
    return userIds;
  }

);

const usersAdapter = createEntityAdapter({
  selectId: selectUserId,
});

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.userManagementApp.users);

const usersSlice = createSlice({
  name: 'userManagementApp/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
    [removeUsers.fulfilled]: (state, action) =>
      usersAdapter.removeMany(state, action.payload),
  },
});

export const { setUsersSearchText } = usersSlice.actions;

export const selectUsersSearchText = ({ userManagementApp }) => userManagementApp.users.searchText;

export default usersSlice.reducer;
