import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
export const clientSlice = createSlice({
  name: "client",
  initialState: { value: {} },
  reducers: {
    loginClient: (state, action) => {
      state.value = action.payload;
    },
    logoutClient: (state) => {
      state.value = {};
      storage.removeItem("persist:store");
    },
    setTokenClient: (state, action) => {
      state.value.token = action.payload.token;
      state.value.refreshtoken = action.payload.refreshtoken;
    },
    getTokenClient: (state, action) => {
      return { token: state.value.token, refresh: state.value.refreshtoken };
    },
  },
});
export const { loginClient, logoutClient, setTokenClient, getTokenClient } = clientSlice.actions;
export default clientSlice.reducer;
