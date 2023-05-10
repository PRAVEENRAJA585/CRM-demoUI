import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getCompanyProfile = createAsyncThunk('profileApp/companyProfile/getCompanyProfile', async (userId) => {

  const response = await axios.get(`http://192.168.1.8/api/companyProfile/GetCompanyProfileById/${userId}`)

  const data = await response.data;

  return data === undefined ? " " : data;
});

export const saveCompanyProfile = createAsyncThunk(
  'profileApp/companyProfile/saveCompanyProfile',
  async (userData, { dispatch, getState }) => {
    const response = await axios.post(`http://192.168.1.8/api/CompanyProfile/AddingCompanyProfile`, userData);
    const data = await response.data;
    return data;
  }
);

export const updateCompanyProfile = createAsyncThunk(
  'profileApp/companyProfile/updateCompanyProfile',
  async (userId, { dispatch, getState }) => {
    try {
      const response = await axios.put(`http://192.168.1.8/api/CompanyProfile/UpdateCompanyProfile/id=${userId.userId}`, userId);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error.response);
      throw new Error(error.response.data.message);
    }
  }
);

const companyProfile = createSlice({
  name: 'profileApp/companyProfile',
  initialState: null,
  reducers: {
    resetCompanyProfile: () => null,
    newCompanyProfile: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
            companyName: '',
            dateFormatId: '',
            phoneNoFormateId: '',
            defaultCountryCodeId: '',
            defaultCurrencyId: '',
            timeZoneId:'',
            website: '',
            street1: '',
            street2: '',
            city: '',
            sate: '',
            country: '',
            zip: '',
            fax: '',
            phone: '',
            allowedUserEmailDomains: '',
         
        },
      }),
    },
  },
  extraReducers: {
    [getCompanyProfile.fulfilled]: (state, action) => action.payload,
    [saveCompanyProfile.fulfilled]: (state, action) => action.payload,
    [updateCompanyProfile.fulfilled]: (state, action) => action.payload,
  },
});

export const { newCompanyProfile, resetCompanyProfile } = companyProfile.actions;

export const selectCompanyProfile = ({ profileApp }) => profileApp.companyProfile;

export default companyProfile.reducer;
