import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getCustomLogo = createAsyncThunk('profileApp/customLogo/getCustomLogo', async (userId) => {

     const response = await axios.get(`http://192.168.1.8/api/User/myprofile/GetUserById/${userId}`)

    const data = await response.data;
    console.log(data,"cha")

    return data === undefined ? " " : data;
});

export const saveCustomLogo = createAsyncThunk(
    'profileApp/customLogo/saveCustomLogo',
    async (userData, { dispatch, getState }) => {
      const response = await axios.post(`http://192.168.1.8/api/Password`, userData);
      return response.data;
    }
  );

const customLogoSlice = createSlice({
    name: 'profileApp/customLogo',
    initialState: null,
    reducers: {
        resetCustomLogo: () => null,
        newCustomLogo: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    updateLogo: '',
                  
                },
            }),
        },
    },
    extraReducers: {
        [getCustomLogo.fulfilled]: (state, action) => action.payload,
        // [updateCustomLogo.fulfilled]: (state, action) => action.payload,

    },
});

export const { newCustomLogo, resetCustomLogo } = customLogoSlice.actions;

export const selectCustomLogo = ({ profileApp }) => profileApp.customLogo;

export default customLogoSlice.reducer;
