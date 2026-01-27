import { useEffect, useState } from "react";
import {
  DivComercial,
  DivOrgComercial,
  TitleComercial,
} from "./CommercialStyle";

import Order from "../../components/Forms/Order/Order";
import { useLocation } from "react-router-dom";
import { useGetAllStockNowQuery } from "../../store/stock/stockNow/stockNow.api";
import { useGetAllClientsQuery } from "../../store/registers/clients/clients.api";

export default function Commercial() {
  const location = useLocation();

  const [reloadingClient, setReloadingClient] = useState(false);

  let { orderChange } = 0;
  orderChange = location.state || {};
  // ! Por em quanto não achei uma solução melhor para limpar a lista quando for alterar - 05/07/2023
  window.history.replaceState(orderChange, null);
  const infoOrderChange = orderChange;

  const { data: getStockNow } = useGetAllStockNowQuery();
  const { data: clients } = useGetAllClientsQuery();


  return (
    <DivComercial>
      <TitleComercial>Comercial</TitleComercial>
      <DivOrgComercial>
        <Order
          infoOrder={infoOrderChange.orderChange}
          listProduct={getStockNow?.productStock}
          listClient={clients?.client}
          setReloadingClient={setReloadingClient}
          reloadingClient={reloadingClient}
        />
      </DivOrgComercial>
    </DivComercial>
  );
}
