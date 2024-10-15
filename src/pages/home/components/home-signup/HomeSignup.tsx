import React from "react";
import HomeBoard from "./components/home-board/HomeBoard";
import HomeStatistics from "./components/home-statistics/HomeStatistics";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <HomeBoard />
      <HomeStatistics />
    </>
  );
};

export default Home;
