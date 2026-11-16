import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
export const siteSlice = createSlice({
  name: "site",
  initialState: { value: {} },
  reducers: {
    setcurrentSite: (state, action) => {
      state.value = action.payload;
    },
    removecurrentSite: (state) => {
      state.value = {};
      //  storage.removeItem("persist:store");
    },
    updateStyle: (state, action) => {
      for (const key in action.payload) {
        state.value.site.styleglobal[key] = action.payload[key];
      }
    },
    updatePages: (state, action) => {
      state.value.pages = action.payload;
    },
    updateIndependanteStyle: (state, action) => {
      for (const key in action.payload) {
        for (const key2 in action.payload[key]) {
          state.value.site.styleglobal[key][key2] = action.payload[key][key2];
        }
      }
    },
  },
});
export const {
  setcurrentSite,
  removecurrentSite,
  updateStyle,
  updateIndependanteStyle,
  updatePages,
} = siteSlice.actions;
export default siteSlice.reducer;
