import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getMyProfile = createAsyncThunk('profileApp/myProfile/getMyProfile', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/User/myprofile/GetUserById/${userId}`)

  const data = await response.data;
  
  return data === undefined ? " " : data;

});

export const updateMyProfile = createAsyncThunk(
  'profileApp/myProfile/updateMyProfile',
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

const myProfileSlice = createSlice({
  name: 'profileApp/myProfile',
  initialState: null,
  reducers: {
    resetMyProfile: () => null,
    newMyProfile: {
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
    [getMyProfile.fulfilled]: (state, action) => action.payload,
    [updateMyProfile.fulfilled]: (state, action) => action.payload,
    
  },
});

export const { newMyProfile, resetMyProfile } = myProfileSlice.actions;

export const selectMyProfile = ({ profileApp }) => profileApp.myProfile;
// export const selectMyProfile = ({ profileApp }) => {
//   //  profileApp.myProfile;
//   if (profileApp && profileApp.myProfile) {
//     return profileApp.myProfile;
//   }
//   return null;
//   };

export default myProfileSlice.reducer;
