import React from "react";
import { Outlet } from "react-router-dom";

import Modal from "react-modal";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AlertMessageContainer from "./components/alert-message/AlertMessageContainer";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

interface AppProps {}

Modal.setAppElement(document.getElementById("root"));

const App: React.FC<AppProps> = (props) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AlertMessageContainer />
      <ScrollToTop />
    </>
  );
};

export default App;
