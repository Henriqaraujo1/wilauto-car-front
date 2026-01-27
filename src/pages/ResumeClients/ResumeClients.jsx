import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailsClients from "../../components/Details/DetailsClients/DetailsClients";
import TableInfoClient from "../../components/Tables/TableInfoClient/TableInfoClient";
import {
  DivResumeClients,
  TitleResumeClients,
  DivScreenClient,
} from "./ResumeClientsStyle";
import { useDispatch } from "react-redux";
import { getClient } from "../../store/financial/resumeClient/resumeClient.actions";

export default function ResumeClients() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [detailsClient, setDetailsClient] = useState([]);
  const [infoClientData, setInfoClientData] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  /* Aqui recebemos o Id do cliente que vai ser buscado as informações
    de pedidos*/
  let { infoClientOrders } = 0;
  infoClientOrders = location.state;
  const clientsInfo = infoClientOrders;

  const getInfoClient = async (idClient) => {
    const getFinancialClient = await dispatch(getClient(idClient));

    setDetailsClient(getFinancialClient.payload);
    setInfoClientData(getFinancialClient.payload.orders.infoClient);
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
    getInfoClient(clientsInfo.idClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsInfo.idClient]);

  useEffect(() => {
    if (loadingPayments === true) {
      getInfoClient(clientsInfo.idClient);
    }
    setTimeout(() => {
      setLoadingPayments(false);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsInfo.idClient, loadingPayments]);

  return (
    <DivResumeClients>
      <TitleResumeClients>
        Resumo de Pedidos do Cliente{" "}
        {parseName(infoClientData?.clientName, infoClientData?.lastName)}
      </TitleResumeClients>
      <DivScreenClient>
        <DetailsClients detailsClient={detailsClient.orders} />
        <TableInfoClient
          detailsClient={detailsClient.orders}
          setLoadingPayments={setLoadingPayments}
        />
      </DivScreenClient>
    </DivResumeClients>
  );
}
