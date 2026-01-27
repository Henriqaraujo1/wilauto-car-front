import React from "react";

import {
  DivFilterComission,
  DivOrgPopUpComission,
  InfoClient,
  Value,
  PriceBuyed,
} from "./DetailsComissionStyle";

export default function DetailsComission(props) {
  const infoComission = props.detailsComission;

  return (
    <DivFilterComission>
      <DivOrgPopUpComission>
        <InfoClient>Maior venda</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoComission?.highSell || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpComission>
      <DivOrgPopUpComission>
        <InfoClient>Total de Comissão</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoComission?.totalComission || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpComission>
      <DivOrgPopUpComission>
        <InfoClient>Total Vendido</InfoClient>
        <PriceBuyed
          displayType="text"
          value={infoComission?.totalSell || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivOrgPopUpComission>
    </DivFilterComission>
  );
}
