import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./scss/styles.scss";
import reportWebVitals from "./reportWebVitals";

import router from "./modules/routes/Routes";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthProvider from "./provider/AuthProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
