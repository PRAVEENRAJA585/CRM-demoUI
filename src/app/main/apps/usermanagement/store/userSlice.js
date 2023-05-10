import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getUser = createAsyncThunk('userManagementApp/user/getUser', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/User/GetUserById${userId}`)

  const data = await response.data;

  return data === undefined ? " " : data;
});

export const removeUser = createAsyncThunk(
  'userManagementApp/user/removeUser',
  async (userId, { dispatch, getState }) => {
    const response = await axios.delete(`http://192.168.1.8/api/User/DeleteUser?id=${userId}`);
    const data = await response.data;
    return data;
  }
);
export const saveUser = createAsyncThunk(
  'userManagementApp/user/saveUser',
  async (userData, { dispatch, getState }) => {
    const response = await axios.post(`http://192.168.1.8/api/Password/Register`, userData);
    const data = await response.data;
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'userManagementApp/user/updateUser',
  async (userId, { dispatch, getState }) => {
    try {
      console.log(userId);
      const response = await axios.put(`http://192.168.1.8/api/User/UpdateUser?id=${userId.userId}`, userId);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error.response);
      throw new Error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userManagementApp/user',
  initialState: null,
  reducers: {
    resetUser: () => null,
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneMobile: '',
          roleId: null,
          userTypeId: null,
          reportingToId: null,
          teamId: null,
          dateOfBirth: '',
          designation: '',
          oldTeam: '',
          department: '',
          salesRegionsId: null,
          skills: [],
          agentPhoneNumbers: '',
          phoneMain: '',
          phoneOthers: '',
          dateOfJoining: '',
          dateOfResignation: '',
          timeZone: '',
          dateFormatId: null,
          workDayId: null,
          employeeId: '',
          locationName: '',
          holidayId: null,
          address: '',
          city: '',
          state: '',
          countryId: null,
          zipCode: '',
          employee: true
        },
      }),
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => action.payload,
    [saveUser.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
    [removeUser.fulfilled]: (state, action) => null,
  },
});

export const { newUser, resetUser } = userSlice.actions;

export const selectUser = ({ userManagementApp }) => userManagementApp.user;

export default userSlice.reducer;
