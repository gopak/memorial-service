import React, { useEffect, useState } from "react";
import "./ConsultantSingle.scss";
import { useAppDispatch } from "../../store/store";
import { getConsultantProfile } from "../../services/consultant/Consultant.service";
import { useParams } from "react-router-dom";
import ConsultantSingleService from "./components/consultant-single-services/ConsultantSingleService";
import ConsultantSingleWhyChoose from "./components/consultant-single-why-choose/ConsultantSingleWhyChoose";
import ConsultantSingleProfile from "./components/consultant-single-profile/ConsultantSingleProfile";
import ConsultantSingleDescription from "./components/consultant-single-description/ConsultantSingleDescription";
import ConsultantSingleNav from "./components/consultant-single-nav/ConsultantSingleNav";
import { Consultant } from "../../services/consultant/Consultant.model";

interface ConsultantSingleProps {}

const ConsultantSingle: React.FC<ConsultantSingleProps> = (props) => {
  const dispatch = useAppDispatch();
  const { consultantId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [consultant, setConsultant] = useState<Consultant>();

  useEffect(() => {
    dispatchGetConsultantProfile();
  }, []);

  const dispatchGetConsultantProfile = async (): Promise<void> => {
    setLoading(true);
    if (!consultantId) {
      return;
    }

    try {
      const response = await dispatch(
        getConsultantProfile(consultantId, false),
      );
      setConsultant(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultant-single-container">
      <div className="wrapper">
        <div className="consultant-single">
          <div
            className={`consultant-single__content ${loading ? "skeleton-pseudo-transparent" : ""}`}
          >
            {consultant ? (
              <ConsultantSingleProfile consultant={consultant} />
            ) : null}

            {consultant?.description ? (
              <ConsultantSingleDescription consultant={consultant} />
            ) : null}
            <ConsultantSingleWhyChoose />
            {consultant?.services?.length ? (
              <ConsultantSingleService consultant={consultant} />
            ) : null}
          </div>
          <div
            className={`consultant-single__nav ${loading ? "skeleton-pseudo-transparent" : ""}`}
          >
            <ConsultantSingleNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantSingle;
