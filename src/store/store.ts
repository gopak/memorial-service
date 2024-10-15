import rootReducer from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { authReducer } from "./reducers/Auth.reducer";

// export const PUBLIC_API = [
//     'getAppStatus',
//     'getStateList',
//     'checkPin',
//     'getContent',
//     'getSlides',
//     'verifySignature',
// ];

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    // marketplaceApi.reducerPath,
    // esbApi.reducerPath,
    // sessionStorageSlice.name,
  ],
  timeout: 500,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      immutableCheck: false,
    }).concat([
      // apiErrorMiddleware,
      // metricsMiddleware,
      // marketplaceApi.middleware,
      // esbApi.middleware,
    ]),
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
setupListeners(store.dispatch);
