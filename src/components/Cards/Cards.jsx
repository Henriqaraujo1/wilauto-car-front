import React, { useEffect, useState } from "react";
import {
  DivOrgLoading,
  DivPopUp,
  DivStatusPopUp,
  NamePopUp,
  PriceValues,
  ValuePopUp,
} from "./CardsStyle";
import { ClipLoader } from "react-spinners";

export function PopupClient({ financialResume, infoMonth, dateMonth }) {
  const infoSells = financialResume;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, [infoMonth]);

  return (
    <DivPopUp>
      <DivStatusPopUp>
        <NamePopUp>Faturamento Dia</NamePopUp>
        <PriceValues
          displayType="text"
          value={infoSells?.totalFinancialDay?.totalSell || 0}
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Faturamento de {dateMonth}</NamePopUp>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <PriceValues
            displayType="text"
            value={infoMonth?.totalSell || 0}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
        )}
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Recebido de {dateMonth}</NamePopUp>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <PriceValues
            displayType="text"
            value={infoMonth?.totalToPayed || 0}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
        )}
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>A receber</NamePopUp>
        <PriceValues
            displayType="text"
            value={infoMonth?.totalReceive || 0}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Vendas de {dateMonth}</NamePopUp>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <ValuePopUp>{infoMonth?.totalOrders || 0}</ValuePopUp>
        )}
      </DivStatusPopUp>
    </DivPopUp>
  );
}

export function PopUpProvider({ financialResumeOrders, infoMonth, dateMonth }) {
  const financialEntryOrders = financialResumeOrders;
  const financialByMonth = infoMonth;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, [financialByMonth, financialEntryOrders]);

  return (
    <DivPopUp>
      <DivStatusPopUp>
        <NamePopUp>Compras de {dateMonth}</NamePopUp>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <PriceValues
            displayType="text"
            value={financialByMonth?.totalBuyedEntry || 0}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
          />
        )}
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Pedidos de {dateMonth}</NamePopUp>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <PriceValues
            displayType="text"
            value={financialByMonth?.totalEntryOrders || 0}
          />
        )}
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Em estoque agora</NamePopUp>
        <PriceValues
          displayType="text"
          value={financialEntryOrders?.totalInStock || 0}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Fornecedores Cadastrados agora</NamePopUp>
        <PriceValues
          displayType="text"
          value={financialEntryOrders?.totalProviders || 0}
        />
      </DivStatusPopUp>
    </DivPopUp>
  );
}
export function PopUpProduct(props) {
  const infoProductStock = props.detailStockInfo;

  return (
    <DivPopUp>
      <DivStatusPopUp>
        <NamePopUp>Valor em estoque</NamePopUp>
        <PriceValues
          displayType="text"
          value={infoProductStock?.priceTotal || 0}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Valor de venda</NamePopUp>
        <PriceValues
          displayType="text"
          value={infoProductStock?.priceSell || 0}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Em estoque</NamePopUp>
        <ValuePopUp>{infoProductStock?.totalQtd || 0}</ValuePopUp>
      </DivStatusPopUp>
    </DivPopUp>
  );
}
export function PopUpComission(props) {
  const infoComission = props.infoComission;

  return (
    <DivPopUp>
      <DivStatusPopUp>
        <NamePopUp>Total de Comissões</NamePopUp>
        <PriceValues
          displayType="text"
          value={infoComission?.totalComissions || 0}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Maior Comissão</NamePopUp>
        <ValuePopUp>{infoComission?.highComission?.nameEmployee}</ValuePopUp>
        <PriceValues
          displayType="text"
          value={infoComission?.highComission?.valueComission || 0}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
        />
      </DivStatusPopUp>
      <DivStatusPopUp>
        <NamePopUp>Quantidade de Comissões</NamePopUp>
        <ValuePopUp>{infoComission?.qtdComissions || 0}</ValuePopUp>
      </DivStatusPopUp>
    </DivPopUp>
  );
}
