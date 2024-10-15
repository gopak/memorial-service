import React from "react";
import HomeBoard from "./components/home-board/HomeBoard";
import HomeStatistics from "./components/home-statistics/HomeStatistics";
import HomeSignup from "./components/home-signup/HomeSignup";
import HomeWhyChoose from "./components/home-why-choose/HomeWhyChoose";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/selectors/Auth.selectors";
import HomeConsultant from "./components/home-consultant/HomeConsultant";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const auth = useSelector(selectAuthState);

  return (
    <>
      <HomeBoard />
      <HomeStatistics />
      <HomeConsultant />
      {!auth.accessToken ? <HomeSignup /> : null}
      <HomeWhyChoose />
    </>
  );
};

export default Home;
