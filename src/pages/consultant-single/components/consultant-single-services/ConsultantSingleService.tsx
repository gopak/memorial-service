import React, { useEffect } from "react";
import "./ConsultantSingle.scss";
import { useAppDispatch } from "../../store/store";
import { getConsultantProfile } from "../../services/consultant/Consultant.service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../store/selectors/Consultant.selectors";
import WhyChoose from "../../components/why-choose/WhyChoose";
import { CONSULTANT_SINGLE_WHY_CHOOSE } from "./constants/ConsultantSingleWhyChoose.constant";
import ConsultantServicesTable from "../../components/consultant-services-table/ConsultantServicesTable";

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
        <div className="box mb-4">sdf</div>
        <div className={"box mb-4"}>
          <h4>Про консультанта</h4>
          <div className={"mt-3"}>{profile?.description}</div>
        </div>
        <div className={"box mb-4"}>
          <h4 className="mb-4">Переваги роботи з консультантом</h4>
          <WhyChoose list={CONSULTANT_SINGLE_WHY_CHOOSE} />
        </div>
        <div className={"box"}>
          <h4 className="mb-4">Послуги консультанта</h4>
          <ConsultantServicesTable services={profile?.services ?? []} />
        </div>
      </div>
    </div>
  );
};

export default ConsultantSingle;
