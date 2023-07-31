import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    events: [],
    slots: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode : (state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setLogin : (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout : (state)=>{
            state.user = null;
            state.token = null;
        },
        setEvents : (state, action)=>{
            state.events = action.payload;
        },
        setSlots : (state, action)=>{
            state.slots = action.payload;
        },
        
    }
});

export const { setMode, setLogin, setLogout, setEvents, setSlots } = authSlice.actions;
export default authSlice.reducer;