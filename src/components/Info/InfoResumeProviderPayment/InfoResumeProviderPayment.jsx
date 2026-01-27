import React from "react";
import {
  DivOrgResumeProviderPayment,
  DivInfoResumeProviderPayment,
  InfoResumeProviderPaymentResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivOrgTitle,
  TitleInfoOrder,
} from "./InfoResumeProviderPaymentStyle";
import { Close } from "@styled-icons/material";
import { NumericFormat } from "react-number-format";

export default function InfoResumeProviderPayment(props) {
  const infoPayment = props.selectPayView;
  
  return (
    <DivOrgResumeProviderPayment show={props.productView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setPaymentView(false)}>
          <Close height={30}/>
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Informações de Pagamento</TitleInfoOrder>
      </DivOrgTitle>
      <DivInfoResumeProviderPayment>
        <DivOrgPrices>
          {/* <DivOrgInfo>
            <InfoResumeProviderPaymentResult>
              Forma de pagamento: {infoPayment.formPayment}
            </InfoResumeProviderPaymentResult>
          </DivOrgInfo> */}
          <DivOrgInfo>
            <InfoResumeProviderPaymentResult>
              Valor que o cliente Pagou: {""}
              <NumericFormat
                // customInput={InfoResumeProviderPaymentResult}
                displayType="text"
                value={infoPayment.priceTotal}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </InfoResumeProviderPaymentResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoResumeProviderPaymentResult>
              Troco: {""}
              <NumericFormat
                // customInput={InfoResumeProviderPaymentResult}
                displayType="text"
                value={infoPayment?.valueChange?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={2}
                prefix={"R$ "}
              />
            </InfoResumeProviderPaymentResult>
          </DivOrgInfo>
        </DivOrgPrices>
        {infoPayment.discountOption === "sim" && (
          <DivOrgPrices>
            <DivOrgInfo>
              <InfoResumeProviderPaymentResult>
                Valor do desconto do Pedido: {""}
                <NumericFormat
                  displayType="text"
                  value={infoPayment.valueDiscount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </InfoResumeProviderPaymentResult>
            </DivOrgInfo>
            <DivOrgInfo>
              <InfoResumeProviderPaymentResult>
                Porcentagem de Desconto: {""}
                <NumericFormat
                  displayType="text"
                  value={infoPayment.percentDiscount}
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  suffix="%"
                />
              </InfoResumeProviderPaymentResult>
            </DivOrgInfo>
          </DivOrgPrices>
        )}
      </DivInfoResumeProviderPayment>
      
    </DivOrgResumeProviderPayment>
  );
}
