import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import clientReducer from "./features/client";
import siteReducer from "./features/site";
import editorReducer from "./features/editor";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "store",
  storage,
  timeout: 500,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEY,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const reducer = combineReducers({
  client: clientReducer,
  user: userReducer,
  site: siteReducer,
  editor: editorReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk],
});

export const persistor = persistStore(store);
