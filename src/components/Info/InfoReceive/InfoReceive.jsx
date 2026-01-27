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
} from "./InfoReceive.style";
import { Close } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import {
  useLazyGetReceiveByOrderQuery,
  useUpdateReceiveMutation,
} from "../../../store/financial/receive/receive.api";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function InfoReceiveOrder({
  selectPayView,
  paymentView,
  setPaymentView,
  setLoadingPayments,
  setInfoPayment
}) {
  const infoOrder = selectPayView;
  const formatDate = new FormatDatesFront();

  const [loading, setLoading] = useState(false);
  const [listPayments, setListPayments] = useState([]);
  const [statusReceive, setStatusReceive] = useState([]);
  const [loadingIdReceive, setLoadingIdReceive] = useState(null);

  const [getReceiveByOrder, { data, isSuccess }] =
    useLazyGetReceiveByOrderQuery();
  const [updtReceiveOrder] = useUpdateReceiveMutation();

  const payReceive = async (dataReceive) => {
    const idOrderPayment = dataReceive.idOrderPayment;
    setLoadingIdReceive(idOrderPayment);

    const infoReceive = {
      idOrderPayment,
      dateUpdated: formatDate.getDateNoHour(),
      datePayment: formatDate.getDateNoHour(),
      status: "pago",
    };

    const infoPayReceive = await updtReceiveOrder({
      idOrderPayment: idOrderPayment,
      dataReceive: infoReceive,
    }).unwrap();

    setStatusReceive((prev) => ({
      ...prev,
      [idOrderPayment]: infoPayReceive,
    }));

    
    setTimeout(() => {
      setLoadingIdReceive(null);
    }, 500);
    setTimeout(() => {
      setStatusReceive([]);
      setLoadingPayments(true); // se necessário
    }, 2000);
  };

  useEffect(() => {
    if (infoOrder) {
      getReceiveByOrder(infoOrder);
    }
  }, [infoOrder, getReceiveByOrder]);

  useEffect(() => {
    setLoading(true);
    if (isSuccess && data) {
      setListPayments(data.infoReceive);
      setInfoPayment(true)
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [isSuccess, data]);

  return (
    <DivOrgResumeProviderDetail show={paymentView}>
      <DivBtnClose>
        <BtnClose onClick={() => setPaymentView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Informações de Pagamentos</TitleInfoOrder>
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
                        Cliente: {infoPayments?.nameClient}
                      </NameProduct>
                      <ProductInfo>Status: {infoPayments?.status}</ProductInfo>
                    </DivOrgInfoName>
                  </DivOrgInfoProduct>
                  <DivOrgPrices>
                    <DivOrgInfo>
                      <ProductInfo>Data de Recebimento</ProductInfo>
                      <ProductInfo>{infoPayments?.receiptDate}</ProductInfo>
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
                          onClick={() => payReceive(infoPayments)}
                        >
                          Receber
                        </BtnPay>
                      </DivOrgBtnPay>
                    )}
                  </DivOrgPrices>
                </DivOrgCard>
                {loadingIdReceive === infoPayments.idOrderPayment ? (
                  <DivOrgLoading>
                    <ClipLoader speedMultiplier={3} />
                  </DivOrgLoading>
                ) : statusReceive[infoPayments.idOrderPayment]?.errorStatus ? (
                  <DivOrgResults>
                    <InfoResult>
                      {statusReceive[infoPayments.idOrderPayment]?.message}
                    </InfoResult>
                  </DivOrgResults>
                ) : statusReceive[infoPayments.idOrderPayment]
                    ?.successStatus ? (
                  <DivOrgResults>
                    <InfoResult>
                      {statusReceive[infoPayments.idOrderPayment]?.message}
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
