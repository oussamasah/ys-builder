import { createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
export const editorSlice = createSlice({
  name: "editor",
  initialState: { value: {} },
  reducers: {
    setStyleElement: (state, action) => {
      for (const key in action.payload) {
        for (const key2 in action.payload[key]) {
          if (typeof state.value[key] == "undefined") {
            state.value[key] = { [key2]: "" };

            state.value[key][key2] = action.payload[key][key2];
          } else {
            if (state.value[key][key2] == "undefined") {
              state.value[key] = { [key2]: "" };
              state.value[key][key2] = action.payload[key][key2];
            } else {
              state.value[key][key2] = action.payload[key][key2];
            }
          }
        }
      }
    },
    removeCustomStyle: (state, action) => {
      for (const key in action.payload) {
        for (const key2 in action.payload[key]) {
          delete state.value[key][key2];
        }
      }
    },
    removeStyle: (state, action) => {
      state.value = {};
    },
  },
});
export const { setStyleElement, removeStyle, removeCustomStyle } =
  editorSlice.actions;
export default editorSlice.reducer;
