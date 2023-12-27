import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { componentSlice } from "../slice/component1Slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, componentSlice.reducer);

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  slice1: persistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
