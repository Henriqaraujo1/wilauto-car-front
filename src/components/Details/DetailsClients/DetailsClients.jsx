import React from "react";

import {
  DivFilterClients,
  DivOrgPopUpClients,
  InfoClient,
  Value,
  PriceBuyed,
} from "./DetailsClientsStyle";

export default function DetailsClients(props) {
  const infoClient = props.detailsClient;
  return (
    <DivFilterClients>
      <DivOrgPopUpClients>
        <InfoClient>Data da ultima Compra</InfoClient>
        <Value>{infoClient?.lastOrder || 0}</Value>
      </DivOrgPopUpClients>
      <DivOrgPopUpClients>
        <InfoClient>Total de Pedidos</InfoClient>
        <Value>{infoClient?.totalOrders || 0}</Value>
      </DivOrgPopUpClients>
      <DivOrgPopUpClients>
        <InfoClient>Total Comprado</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoClient?.totalBuyed || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpClients>
      <DivOrgPopUpClients>
        <InfoClient>Total Recebido</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoClient?.totalPayed || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpClients>
      {/* <DivOrgPopUpClients>
        <InfoClient>Total a Receber</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoClient?.totalToReceive || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpClients> */}
    </DivFilterClients>
  );
}
