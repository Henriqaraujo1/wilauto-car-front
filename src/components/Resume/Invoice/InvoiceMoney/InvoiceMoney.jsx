import React, { useEffect, useState } from "react";
import {
  DivInvoiceMoney,
  DivTitle,
  TitleInvoice,
  InfoFilter,
  FormatValue,
  DivInfoInvoice,
  DivInfo,
  InfoCard,
  InfoCardSmall,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./InvoiceMoneyStyle.js";
import { ClipLoader } from "react-spinners";

export default function InvoiceMoney(props) {
  const infoExpense = props.dataInvoiceMoviments?.infoExpense;
  const infoStockEntry = props.dataInvoiceMoviments?.infoStockEntry;
  // const infoOrders = props.dataInvoiceMoviments?.infoOrders;
  const loading = props.loading;

  const [stockData, setStockData] = useState([]);
  const [stockError, setStockError] = useState([]);

  const [expenseData, setExpenseData] = useState([]);
  const [expenseError, setExpenseError] = useState([]);


  useEffect(() => {
    if (infoStockEntry?.codeStatus === 200) {
      setStockData(infoStockEntry.stockEntry);
      setStockError();
    } else {
      setStockData([]);
      setStockError(infoStockEntry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStockEntry?.codeStatus]);

  useEffect(() => {
    if (infoExpense?.codeStatus === 200) {
      setExpenseData(infoExpense.infoExpense);
      setExpenseError();
    } else {
      setExpenseData([]);
      setExpenseError(infoExpense);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoExpense?.codeStatus]);

  return (
    <DivInvoiceMoney>
      <DivTitle>
        <TitleInvoice>Movimentações</TitleInvoice>
      </DivTitle>
      <DivInfoInvoice>
        <DivInfo>
          <InfoCard>Despesas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{expenseData.totalMoviments || 0}</InfoFilter>
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Pedidos Estoque</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{stockData.totalMoviments || 0}</InfoFilter>
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Total Despesas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={expenseData.totalExpenses || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
        <DivInfo>
          <InfoCardSmall>Compras p/ Estoque</InfoCardSmall>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={stockData.totalStockEntry || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
      </DivInfoInvoice>
      {stockError && (
        <DivOrgResults>
          <InfoResult>{stockError.message}</InfoResult>
        </DivOrgResults>
      )}
      {expenseError && (
        <DivOrgResults>
          <InfoResult>{expenseError.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivInvoiceMoney>
  );
}
