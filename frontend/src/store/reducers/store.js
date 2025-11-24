import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationReducer";

const signedinUser = localStorage.getItem("authentication") ? JSON.parse(localStorage.getItem("authentication")) : null;

const initState = {
    auth: { user : signedinUser},
}

const reduxStore = configureStore({
    reducer: {
        auth: authenticationReducer,
    },
    preloadedState: initState,
});

export default reduxStore;