import React, { useEffect } from "react";
import "./ConsultantSingle.scss";
import { useAppDispatch } from "../../store/store";
import { getConsultantProfile } from "../../services/consultant/Consultant.service";
import { useParams } from "react-router-dom";
import ConsultantSingleService from "./components/consultant-single-services/ConsultantSingleService";
import ConsultantSingleWhyChoose from "./components/consultant-single-why-choose/ConsultantSingleWhyChoose";
import ConsultantSingleProfile from "./components/consultant-single-profile/ConsultantSingleProfile";
import ConsultantSingleDescription from "./components/consultant-single-description/ConsultantSingleDescription";

interface ConsultantSingleProps {}

const ConsultantSingle: React.FC<ConsultantSingleProps> = (props) => {
  const dispatch = useAppDispatch();
  const { consultantId } = useParams();

  useEffect(() => {
    if (consultantId) {
      dispatch(getConsultantProfile(consultantId));
    }
  }, []);

  return (
    <div className="consultant-single-container">
      <div className="wrapper">
        <div className="consultant-single">
          <ConsultantSingleProfile />
          <ConsultantSingleDescription />
          <ConsultantSingleWhyChoose />
          <ConsultantSingleService />
        </div>
      </div>
    </div>
  );
};

export default ConsultantSingle;
