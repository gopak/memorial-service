import React from "react";
import HomeBoard from "./components/home-board/HomeBoard";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <HomeBoard />
    </>
  );
};

export default Home;
