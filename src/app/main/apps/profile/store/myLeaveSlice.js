import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import KyrosUtils from '@kyros/utils';



export const getMyLeave = createAsyncThunk('profileApp/myLeave/getMyLeave', async (userId) => {

     const response = await axios.get(`http://192.168.1.8/api/MyLeave/GetLeaveById/${userId}`)
     const data = await response.data;
    console.log(data,"cha")

    return data === undefined ? " " : data;
});


export const saveMyLeave = createAsyncThunk(
    'profileApp/myLeave/saveMyLeave',
    async (userData, { dispatch, getState }) => {
        try {
            const response = await axios.post(`http://192.168.1.8/api/MyLeave/AddMyLeave`, userData);
            return response.data;
        } catch (error) {
            // Handle error here
            console.log('Error saving MyLeave:', error);
            throw error; // Rethrow the error so it can be caught by the rejected action
        }
    }
);

export const removeMyLeave = createAsyncThunk(
    'profileApp/myLeave/removeMyLeave',
    async (userId, { dispatch, getState }) => {
      const response = await axios.delete(`http://192.168.1.8/api/MyLeave/DeleteLeave?id=${userId}`);
      const data = await response.data;
      return data;
    }
  );
  
 const myLeaveSlice = createSlice({
    name: 'profileApp/myLeave',
    initialState: null,
    reducers: {
        resetMyLeave: () => null,
        newMyLeave: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    leaveType: '',
                    days: '',
                    from: '',
                    to: '',
                   reason:'',
                },
            }),
        },
    },
//    
    extraReducers: {
        [getMyLeave.fulfilled]: (state, action) => action.payload,
        // [updateMyLeave.fulfilled]: (state, action) => action.payload,

    },
});

export const { newMyLeave, resetMyLeave } = myLeaveSlice.actions;

export const selectMyLeave = ({ profileApp }) => profileApp.myLeave;

export default myLeaveSlice.reducer;
