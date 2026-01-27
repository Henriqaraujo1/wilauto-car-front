import React, { useEffect, useState } from "react";
import {
  DivOrgResumeProviderDetail,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivInfoTable,
  DivCardProduct,
  DivOrgId,
  IdProduct,
  DivOrgInfoProduct,
  NameProduct,
  PriceFormat,
  ProductInfo,
  DivOrgInfoName,
  DivOrgTitle,
  TitleInfoOrder,
  DivOrgLoading,
  InfoLoading,
  DivOrgBtnPay,
  BtnPay,
  DivOrgResults,
  InfoResult,
  DivOrgCard,
} from "./InfoPaymentStock.style";
import { Close } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { paymentOrders } from "../../../store/financial/resumeProviders/resumeProviders.action";
import { updtExpenseByProvider } from "../../../store/financial/expense/expense.actions";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function InfoPaymentStock({
  selectDetailView,
  paymentView,
  setPaymentView,
  setLoadingPayments,
}) {
  const infoOrder = selectDetailView;
  const dispatch = useDispatch();
  const formatDate = new FormatDatesFront();

  const [paymentsInfo, setPaymentsInfo] = useState([]);
  const [loading, setLoading] = useState();
  const [listPayments, setListPayments] = useState([]);
  const [infoExpensePay, setInfoExpensePay] = useState([]);
  const [loadingIdExpense, setLoadingIdExpense] = useState(null);

  const getPaymentStock = async (dataOrder) => {
    const idOrder = dataOrder.idStockEntry;
    const paymentsByStock = await dispatch(paymentOrders(idOrder));

    setPaymentsInfo(paymentsByStock.payload);
  };

  const createListPayments = async (dataList) => {
    setLoading(true);

    setListPayments(dataList);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const payExpense = async (dataExpense) => {
    const idExpense = dataExpense.idExpense;
    setLoadingIdExpense(idExpense);
    const infoExpense = {
      idExpense: dataExpense.idExpense,
      dateCreated: dataExpense.dateCreated,
      datePayment: formatDate.getDateNoHour(),
      dueDate: dataExpense.dueDate,
      status: "pago",
    };
    const infoPayExpense = await dispatch(updtExpenseByProvider(infoExpense));

    setInfoExpensePay((prev) => ({
      ...prev,
      [idExpense]: infoPayExpense.payload,
    }));
    setTimeout(() => {
      setLoadingIdExpense(null);
    }, 500);
    setTimeout(() => {
      setInfoExpensePay({});
      setLoadingPayments(true);
    }, 2000);
  };

  useEffect(() => {
    if (paymentsInfo?.codeStatus) {
      createListPayments(paymentsInfo?.infoExpense);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentsInfo]);

  useEffect(() => {
    getPaymentStock(infoOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrder]);

  return (
    <DivOrgResumeProviderDetail show={paymentView}>
      <DivBtnClose>
        <BtnClose onClick={() => setPaymentView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Informações de pagamentos</TitleInfoOrder>
      </DivOrgTitle>
      <DivInfoTable>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
            <br />
            <InfoLoading>Carregando Pagamentos</InfoLoading>
          </DivOrgLoading>
        ) : (
          listPayments.map((infoPayments, index) => {
            return (
              <DivCardProduct key={index}>
                <DivOrgCard>
                  <DivOrgInfoProduct>
                    <DivOrgId>
                      <IdProduct>{index + 1}</IdProduct>
                    </DivOrgId>
                    <DivOrgInfoName>
                      <NameProduct>
                        Descrição: {infoPayments?.description}
                      </NameProduct>
                      <NameProduct>
                        Fornecedor: {infoPayments?.destination}
                      </NameProduct>
                      <ProductInfo>Status: {infoPayments?.status}</ProductInfo>
                    </DivOrgInfoName>
                  </DivOrgInfoProduct>
                  <DivOrgPrices>
                    <DivOrgInfo>
                      <ProductInfo>Vencimento</ProductInfo>
                      <ProductInfo>{infoPayments?.dueDate}</ProductInfo>
                    </DivOrgInfo>
                    <DivOrgInfo>
                      <ProductInfo>Forma de Pagamento</ProductInfo>
                      <ProductInfo>{infoPayments?.formPayment}</ProductInfo>
                    </DivOrgInfo>
                    {infoPayments?.datePayment && (
                      <DivOrgInfo>
                        <ProductInfo>Data de Pagamento</ProductInfo>
                        <ProductInfo>{infoPayments?.datePayment}</ProductInfo>
                      </DivOrgInfo>
                    )}
                    <DivOrgInfo>
                      <ProductInfo>Valor</ProductInfo>
                      <PriceFormat
                        displayType="text"
                        value={infoPayments?.value}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"US$ "}
                      />
                    </DivOrgInfo>
                    {infoPayments?.status === "pendente" && (
                      <DivOrgBtnPay>
                        <BtnPay
                          type="button"
                          onClick={() => payExpense(infoPayments)}
                        >
                          Pagar
                        </BtnPay>
                      </DivOrgBtnPay>
                    )}
                  </DivOrgPrices>
                </DivOrgCard>
                {loadingIdExpense === infoPayments.idExpense ? (
                  <DivOrgLoading>
                    <ClipLoader speedMultiplier={3} />
                  </DivOrgLoading>
                ) : infoExpensePay[infoPayments.idExpense]?.errorStatus ? (
                  <DivOrgResults>
                    <InfoResult>
                      {infoExpensePay[infoPayments.idExpense]?.message}
                    </InfoResult>
                  </DivOrgResults>
                ) : infoExpensePay[infoPayments.idExpense]?.successStatus ? (
                  <DivOrgResults>
                    <InfoResult>
                      {infoExpensePay[infoPayments.idExpense]?.message}
                    </InfoResult>
                  </DivOrgResults>
                ) : null}
              </DivCardProduct>
            );
          })
        )}
      </DivInfoTable>
    </DivOrgResumeProviderDetail>
  );
}
