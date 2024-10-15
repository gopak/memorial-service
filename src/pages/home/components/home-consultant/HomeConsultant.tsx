import React, { useEffect, useState } from "react";
import "./HomeConsultant.scss";

import { useAppDispatch } from "../../../../store/store";
import { getConsultantsList } from "../../../../services/consultant/Consultant.service";
import ConsultantGrid from "../../../../components/consultant-grid/ConsultantGrid";
import { Consultant } from "../../../../services/consultant/Consultant.model";

interface HomeConsultantProps {}

const HomeConsultant: React.FC<HomeConsultantProps> = (props) => {
  const dispatch = useAppDispatch();
  const [consultantsList, setConsultantsList] = useState<Consultant[]>([]);

  useEffect(() => {
    dispatchGetConsultanstList();
  }, []);

  const dispatchGetConsultanstList = async (): Promise<void> => {
    try {
      const response = await dispatch(getConsultantsList());
      setConsultantsList(response);
    } catch (error) {}
  };

  return (
    <div className="home-consultant-container">
      <div className="wrapper">
        <h2 className="mb-3">Каталог консультантів</h2>
        <p className="text-md mb-5">
          Консультанти - це спеціально навчені люди, що допомагають користувачам
          орієнтуватися в сервісі та надають власні послуги.
        </p>
        <div className="home-consultant">
          <ConsultantGrid consultantsList={consultantsList} />
        </div>
      </div>
    </div>
  );
};

export default HomeConsultant;
