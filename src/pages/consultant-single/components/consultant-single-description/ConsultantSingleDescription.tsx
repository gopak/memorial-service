import React, { useEffect } from "react";
import "./ConsultantSingle.scss";
import { useAppDispatch } from "../../store/store";
import { getConsultantProfile } from "../../services/consultant/Consultant.service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../store/selectors/Consultant.selectors";
import WhyChoose from "../../components/why-choose/WhyChoose";
import { CONSULTANT_SINGLE_WHY_CHOOSE } from "./components/consultant-single-why-choose/ConsultantSingleWhyChoose.constant";
import ConsultantServicesTable from "../../components/consultant-services-table/ConsultantServicesTable";
import ConsultantSingleService from "./components/consultant-single-services/ConsultantSingleService";
import ConsultantSingleWhyChoose from "./components/consultant-single-why-choose/ConsultantSingleWhyChoose";
import ConsultantSingleProfile from "./components/consultant-single-profile/ConsultantSingleProfile";

interface ConsultantSingleProps {}

const ConsultantSingle: React.FC<ConsultantSingleProps> = (props) => {
  const dispatch = useAppDispatch();
  const { consultantId } = useParams();
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  useEffect(() => {
    if (consultantId) {
      dispatch(getConsultantProfile(consultantId));
    }
  }, []);

  return (
    <div className="consultant-single">
      <div className="wrapper">
        <ConsultantSingleProfile />
        <div className={"box mb-4"}>
          <h4>Про консультанта</h4>
          <div className={"mt-3"}>{profile?.description}</div>
        </div>

        <ConsultantSingleWhyChoose />
        <ConsultantSingleService />
      </div>
    </div>
  );
};

export default ConsultantSingle;
