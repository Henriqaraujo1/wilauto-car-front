import {
  DivOrgResumeClientPayed,
  DivInfoResumeClientPayed,
  InfoResumeClientPayedResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivOrgTitle,
  TitleInfoOrder,
} from "./InfoResumeClientPayed.style";
import { Close } from "@styled-icons/material";
import { NumericFormat } from "react-number-format";

export default function InfoResumeClientPayed({
  selectFormPayment,
  formPaymentView,
  setFormPaymentView,
}) {
  const infoPayment = selectFormPayment.infoPayment;
  const idOrder = selectFormPayment.idOrder

  return (
    <DivOrgResumeClientPayed show={formPaymentView}>
      <DivBtnClose>
        <BtnClose onClick={() => setFormPaymentView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Informações de Pagamento do pedido {idOrder}</TitleInfoOrder>
      </DivOrgTitle>
      <DivInfoResumeClientPayed>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoResumeClientPayedResult>
              Forma de pagamento: {infoPayment.formPayment}
            </InfoResumeClientPayedResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoResumeClientPayedResult>
              Valor que o cliente Pagou: {""}
              <NumericFormat
                // customInput={InfoResumeClientPayedResult}
                displayType="text"
                value={infoPayment.valueClientPayed}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </InfoResumeClientPayedResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoResumeClientPayedResult>
              Troco: {""}
              <NumericFormat
                // customInput={InfoResumeClientPayedResult}
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
            </InfoResumeClientPayedResult>
          </DivOrgInfo>
        </DivOrgPrices>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoResumeClientPayedResult>
              Valor da entrega: {""}
              <NumericFormat
                // customInput={InfoResumeClientPayedResult}
                displayType="text"
                value={infoPayment.valueDelivery}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </InfoResumeClientPayedResult>
          </DivOrgInfo>
        </DivOrgPrices>
        {infoPayment.discountOption === "sim" && (
          <DivOrgPrices>
            <DivOrgInfo>
              <InfoResumeClientPayedResult>
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
              </InfoResumeClientPayedResult>
            </DivOrgInfo>
            <DivOrgInfo>
              <InfoResumeClientPayedResult>
                Porcentagem de Desconto: {""}
                <NumericFormat
                  displayType="text"
                  value={infoPayment.percentDiscount}
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  suffix="%"
                />
              </InfoResumeClientPayedResult>
            </DivOrgInfo>
          </DivOrgPrices>
        )}
      </DivInfoResumeClientPayed>
    </DivOrgResumeClientPayed>
  );
}
