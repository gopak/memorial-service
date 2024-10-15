import React from "react";
import "./ConsultantGrid.scss";
import { getImagePathFromStorage } from "../../firebase/Firebase.service";
import { Consultant } from "../../services/consultant/Consultant.model";
import { Link } from "react-router-dom";

interface ConsultantGridProps {
  consultantsList: Consultant[];
  loading?: boolean;
}

const blankList = Array(4).fill(0);

const ConsultantGrid: React.FC<ConsultantGridProps> = ({
  consultantsList,
  loading,
}) => {
  return (
    <div className="consultant-grid">
      {loading ? (
        <>
          {blankList.map((item, index) => (
            <div
              key={index}
              className="consultant-grid__item consultant-grid__item--loading skeleton-pseudo-transparent"
            ></div>
          ))}
        </>
      ) : (
        <>
          {consultantsList.map((item) => (
            <div key={item.id} className="consultant-grid__item">
              <div className="consultant-grid__photo">
                <div className="consultant-grid__photo__img">
                  <img src={getImagePathFromStorage(item?.photoPath)} alt="" />
                </div>
              </div>
              <div className="consultant-grid__name">
                {item.firstName} {item.lastName}
              </div>
              {item.cityName && item.regionName ? (
                <div className="consultant-grid__address">
                  {item.cityName}, {item.regionName}
                </div>
              ) : null}
              <Link
                to={`/consultants-catalog/${item.id}`}
                className="link-dashed"
              >
                Детальніше
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ConsultantGrid;
