import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

interface AlertMessageProps {}

const AlertMessageContainer: React.FC<AlertMessageProps> = (props) => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
};

export default AlertMessageContainer;
