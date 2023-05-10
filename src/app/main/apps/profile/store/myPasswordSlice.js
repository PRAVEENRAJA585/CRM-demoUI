import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getMyPassword = createAsyncThunk('profileApp/myPassword/getMyPassword', async (userId) => {

    const response = await axios.get(`http://192.168.1.8/api/User/myprofile/GetUserById/${userId}`)

    const data = await response.data;
    console.log(data,"cha")

    return data === undefined ? " " : data;
});

export const saveMyPassword = createAsyncThunk(
    'profileApp/myPassword/saveMyPassword',
    async (userData, { dispatch, getState }) => {
      const response = await axios.post(`http://192.168.1.8/api/Password`, userData);
      return response.data;
    }
  );

const myPasswordSlice = createSlice({
    name: 'profileApp/myPassword',
    initialState: null,
    reducers: {
        resetMyPassword: () => null,
        newMyPassword: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    Email: '',
                    Currentpassword: '',
                    NewPassword: '',
                    ConfirmPassword: '',
                },
            }),
        },
    },
    extraReducers: {
        [getMyPassword.fulfilled]: (state, action) => action.payload,
        // [updateMyPassword.fulfilled]: (state, action) => action.payload,

    },
});

export const { newMyPassword, resetMyPassword } = myPasswordSlice.actions;

export const selectMyPassword = ({ profileApp }) => profileApp.myPassword;


export default myPasswordSlice.reducer;
