import React from 'react';
import { Outlet } from "react-router-dom";
import CabinetNav from "../../components/cabinet-nav/CabinetNav";

interface CabinetProps {}

const Cabinet: React.FC<CabinetProps> = props => {

  return (
      <div className={"wrapper"}>
          <div className="container">
              <div className={"container__nav"}>
                  <CabinetNav />
              </div>
              <div className={"container__content"}>
                  <Outlet />
              </div>
          </div>
      </div>
  );
}

export default Cabinet;
