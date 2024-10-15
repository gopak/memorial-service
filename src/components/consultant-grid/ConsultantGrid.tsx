import React, { useEffect, useState } from "react";
import "./ConsultantGrid.scss";

import { useAppDispatch } from "../../../../store/store";
import { getConsultantsList } from "../../../../services/consultant/Consultant.service";
import { Customer } from "../../../../services/customer/Customer.model";
import { getImagePathFromStorage } from "../../../../firebase/Firebase.service";

interface HomeConsultantProps {}

const ConsultantGrid: React.FC<HomeConsultantProps> = (props) => {
  const dispatch = useAppDispatch();
  const [consultantsList, setConsultantsList] = useState<Customer[]>([]);

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
          {consultantsList.map((item) => (
            <div key={item.id} className="home-consultant__item">
              <div className="home-consultant__photo">
                <div className="home-consultant__photo__img">
                  <img src={getImagePathFromStorage(item?.photoPath)} alt="" />
                </div>
              </div>
              <div className="home-consultant__name">
                {item.firstName} {item.lastName}
              </div>
              {item.cityName && item.regionName ? (
                <div className="home-consultant__address">
                  {item.cityName}, {item.regionName}
                </div>
              ) : null}
              <a href="/" className="link-dashed">
                Детальніше
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantGrid;
