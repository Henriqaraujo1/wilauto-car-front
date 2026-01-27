import React from "react";
import {
  DivFilterProvider,
  DivOrgPopUp,
  PriceBuyed,
  TitleInfo,
  Value,
} from "./DetailsProviderStyle";

export default function DetailsProvider(props) {
  const infoProvider = props.detailsProvider;

  return (
    <DivFilterProvider>
      <DivOrgPopUp>
        <TitleInfo>Data da ultima Compra</TitleInfo>
        <Value>{infoProvider?.lastOrder}</Value>
      </DivOrgPopUp>
      <DivOrgPopUp>
        <TitleInfo>Total de Pedidos</TitleInfo>
        <PriceBuyed displayType="text" value={infoProvider?.totalOrders} />
      </DivOrgPopUp>
      <DivOrgPopUp>
        <TitleInfo>Total Comprado</TitleInfo>
        <PriceBuyed
          displayType="text"
          value={infoProvider?.priceTotalOrders}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivOrgPopUp>
    </DivFilterProvider>
  );
}
