import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';

export const getMyEmailSignature = createAsyncThunk('profileApp/myEmailSignature/getMyEmailSignature', async (userId) => {

    const response = await axios.get(`http://192.168.1.8/api/MyEmailSign/GetByEmailId${userId}`)

    const data = await response.data;   
    // console.log(data,"cha")

    return data === undefined ? " " : data;
});


export const saveMyEmailSignature = createAsyncThunk(
    'profileApp/myEmailSignature/saveMyEmailSignaturer',
    async (userData, { dispatch, getState }) => {
        const response = await axios.post(`http://192.168.1.8/api/Password/Register`, userData);
        const data = await response.data;
        return data;
    }
);

export const updateMyEmailSignature = createAsyncThunk(
    'profileApp/myEmailSignature/updateMyEmailSignature',
    async (userId, { dispatch, getState }) => {
        try {
            console.log(userId);
            const response = await axios.put(`http://192.168.1.8/api/MyEmailSign/UpdateEmailSignature${userId.emailSignId}`, userId);
            const data = await response.data;
            return data;

        } catch (error) {
            console.error(error.response);
            throw new Error(error.response.data.message);
        }
    }
);

const myEmailSignatureSlice = createSlice({
    name: 'profileApp/myEmailSignature',
    initialState: null,
    reducers: {
        resetMyEmailSignature: () => null,
        newMyEmailSignature: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    htmlSignature: '',
                    textSignature: '',
                },
            }),
        },
    },
    extraReducers: {
        [getMyEmailSignature.fulfilled]: (state, action) => action.payload,
        [updateMyEmailSignature.fulfilled]: (state, action) => action.payload,

    },
});

export const { newMyEmailSignature, resetMyEmailSignature } = myEmailSignatureSlice.actions;

export const selectMyEmailSignature = ({ profileApp }) => profileApp.myEmailSignature;

export default myEmailSignatureSlice.reducer;
