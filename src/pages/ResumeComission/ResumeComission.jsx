import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DivResumeComissions,
  TitleResumeComissions,
  DivScreenComission,
} from "./ResumeComissionStyle";
import { useDispatch } from "react-redux";
import DetailsComission from "../../components/Details/DetailsComission/DetailsComission";
import TableInfoComission from "../../components/Tables/TableInfoComission/TableInfoComission";
import { getComissionsByEmployee } from "../../store/financial/comission/comission.actions";
// import { getComission } from "../../store/financial/resumeComission/resumeComission.actions";

export default function ResumeComission() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [detailsComission, setDetailsComission] = useState([]);
  const [comissionByEmployee, setComissionByEmployee] = useState([]);
  const [infoOrdersEmployee, setInfoOrdersEmployee] = useState([]);

  /* Aqui recebemos o Id do cliente que vai ser buscado as informações
    de pedidos*/
  let { infoOrders } = 0;
  infoOrders = location.state;

  useEffect(() => {
    setComissionByEmployee(infoOrders.infoComission);
  }, [infoOrders]);

  const getInfoComission = async (idOrders) => {
    
    const getFinancialComission = await dispatch(
      getComissionsByEmployee(idOrders)
    );

    setDetailsComission(getFinancialComission.payload);
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    if (lastName.length > 0) {
      var fullName = firstName.concat(" ", lastName);
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    getInfoComission(comissionByEmployee.idOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comissionByEmployee]);


  return (
    <DivResumeComissions>
      <TitleResumeComissions>
        Resumo de vendas do {comissionByEmployee?.nameEmployee}
      </TitleResumeComissions>
      <DivScreenComission>
        <DetailsComission detailsComission={detailsComission?.resumeSells} />
        <TableInfoComission detailsComission={detailsComission?.orders} />
      </DivScreenComission>
    </DivResumeComissions>
  );
}
