import React, { useEffect, useState } from "react";
import "./ConsultantsCatalog.scss";

import { useAppDispatch } from "../../store/store";
import { getConsultantsList } from "../../services/consultant/Consultant.service";
import ConsultantGrid from "../../components/consultant-grid/ConsultantGrid";
import { Consultant } from "../../services/consultant/Consultant.model";

interface CatalogConsultantsProps {}

const CatalogConsultants: React.FC<CatalogConsultantsProps> = (props) => {
  const dispatch = useAppDispatch();
  const [consultantsList, setConsultantsList] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatchGetConsultanstList();
  }, []);

  const dispatchGetConsultanstList = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await dispatch(getConsultantsList());
      setConsultantsList(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="catalog-consultants">
      <div className="wrapper">
        <h2 className="mb-3">Каталог консультантів</h2>
        <ConsultantGrid consultantsList={consultantsList} loading={loading} />
      </div>
    </div>
  );
};

export default CatalogConsultants;
