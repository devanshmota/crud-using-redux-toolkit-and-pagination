import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [{email: 'test@gmail.com', mobile_number: '9824166253'}]
    },
    
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export default dataSlice;
export const { setData } = dataSlice.actions;