import React, { useEffect, useState } from "react";
import {
  DivOrgResumeClientPayment,
  DivInfoResumeClientPayment,
  InfoResumeClientPaymentResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivOrgTitle,
  TitleInfoOrder,
  SelectOptionsToPay,
  OptionsPay,
  DivOrgInstallments,
  TitleDetailPayment,
  LabelPayment,
  InputQtd,
  DivOrgQtdInputs,
  DivQtdInputs,
  LabelQtd,
  FormatPayment,
  DivOrgBtn,
  BtnPayment,
  DivOrgPayment,
  DivOrgInfoTable,
  FormatPaymentTable,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
} from "./InfoResumeClientPaymentStyle";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { ClipLoader } from "react-spinners";

export default function InfoResumeClientPayment({
  infoPayment,
  paymentView,
  setPaymentView,
  setFormPayment,
  formPaymentInfo,
  setStatusPayment,
}) {
  const formatDate = new FormatDatesFront();
  const totalBudget = infoPayment?.totalBudget;
  const infoClient = infoPayment?.infoClient;
  const [dateInput, setDateInput] = useState([]);
  const [infoQtdPayments, setInfoQtdPayments] = useState(null);
  const [typePayment, setTypePayment] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(null);
  const [message, setMessage] = useState(false);

  const paymentUptd = async () => {
    // const statusDate
    setLoadingPayment(true);
    const formPayment = dateInput[0].formPayment;
    for (const infoReceipt of dateInput) {
      if (!infoReceipt.receiptDate) {
        window.alert(
          `A parcela ${infoReceipt.idOrderPayment} está faltando a data de recebimento, Por favor defina uma data`
        );
        return;
      }
    }
    if (formPayment === null) {
      window.alert("Defina uma forma de pagamento");
      return;
    }

    setFormPayment(dateInput);
    setStatusPayment(false);
    setMessage(true);

    setTimeout(() => {
      setLoadingPayment(false);
    }, 500);

    setTimeout(() => {
      setPaymentView(false);
    }, 2000);
  };

  const formPayment = (typePayment) => {
    setTypePayment(typePayment);

    const newFormPayment = dateInput.map((item) => ({
      ...item,
      formPayment: typePayment,
    }));

    setDateInput(newFormPayment);
  };

  const datePayments = (e) => {
    const newQtd = parseInt(e) || null;
    setInfoQtdPayments(newQtd);

    const valuePayment = totalBudget / newQtd;

    // Gera um array com a nova quantidade de parcelas
    const newInputs = Array.from({ length: newQtd }, (_, i) => ({
      idOrderPayment: i + 1,
      description: `Parcela ${i + 1} da venda`,
      dateCreated: formatDate.getDateNoHour(),
      idBudget: infoPayment?.idBudget,
      receiptDate: "",
      dateUpdated: "",
      value: parseFloat(valuePayment.toFixed(2)),
      status: "pendente",
      idClient: infoClient.idClient,
      formPayment: typePayment,
    }));

    setDateInput(newInputs);
  };

  const qtdPayments = (index, newInput) => {
    const newDates = [...dateInput];
    newDates[index].receiptDate = newInput;
    setDateInput(newDates);
  };

  useEffect(() => {
    if (infoQtdPayments === 0 || infoQtdPayments === null) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [infoQtdPayments]);

  // ✅ Restaura dados já salvos (caso existam)
  useEffect(() => {
    if (Array.isArray(formPaymentInfo) && formPaymentInfo.length > 0) {
      setDateInput(formPaymentInfo);
      setTypePayment(formPaymentInfo[0].formPayment || null);
      setInfoQtdPayments(formPaymentInfo.length);
    }
  }, [formPaymentInfo]);

  return (
    <DivOrgResumeClientPayment show={paymentView}>
      <DivBtnClose>
        <BtnClose onClick={() => setPaymentView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Informe a Forma de Pagamento</TitleInfoOrder>
      </DivOrgTitle>
      <DivInfoResumeClientPayment>
        <DivOrgPrices>
          <DivOrgInfo>
            <DivOrgPayment>
              <LabelPayment>Total da venda</LabelPayment>
              <FormatPayment
                displayType="text"
                value={totalBudget || 0}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgPayment>
            <DivOrgPayment>
              <LabelPayment>Forma de pagamento</LabelPayment>
              <SelectOptionsToPay
                value={typePayment}
                onChange={(e) => formPayment(e.target.value)}
              >
                <OptionsPay value="" disabled selected>
                  Selecione
                </OptionsPay>
                <OptionsPay value="dinheiro">Dinheiro</OptionsPay>
                <OptionsPay value="boleto">Boleto</OptionsPay>
                <OptionsPay value="debito">Debito</OptionsPay>
                <OptionsPay value="credito">Credito</OptionsPay>
                <OptionsPay value="pix">Pix</OptionsPay>
              </SelectOptionsToPay>
            </DivOrgPayment>
          </DivOrgInfo>
          <DivOrgInfoTable>
            <DivOrgInstallments>
              <DivOrgTitle>
                <TitleDetailPayment>Parcelamento</TitleDetailPayment>
              </DivOrgTitle>
              <DivOrgPayment>
                <LabelPayment>Parcelas</LabelPayment>
                <InputQtd
                  type="number"
                  min="1"
                  max="12"
                  defaultValue={infoQtdPayments}
                  onChange={(e) => datePayments(e.target.value)}
                />
              </DivOrgPayment>
              <DivOrgQtdInputs>
                <DivQtdInputs>
                  {dateInput.map((inputPayment, index) => {
                    return (
                      <DivOrgPayment key={index}>
                        <LabelQtd>Parcela {index + 1}</LabelQtd>
                        <FormatPaymentTable
                          displayType="text"
                          value={inputPayment?.value || 0}
                          decimalSeparator=","
                          thousandSeparator="."
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                        <InputQtd
                          type="date"
                          value={inputPayment.receiptDate}
                          onChange={(e) => qtdPayments(index, e.target.value)}
                        />
                      </DivOrgPayment>
                    );
                  })}
                </DivQtdInputs>
              </DivOrgQtdInputs>
            </DivOrgInstallments>
          </DivOrgInfoTable>
        </DivOrgPrices>
        <DivOrgBtn>
          <BtnPayment
            type="button"
            onClick={() => paymentUptd()}
            disabled={disableBtn}
          >
            {infoQtdPayments === null ? "Definir Parcelas" : "Salvar"}
          </BtnPayment>
        </DivOrgBtn>
      </DivInfoResumeClientPayment>
      {loadingPayment ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        message && (
          <DivOrgResults>
            <InfoResult>Forma de Pagamento salvo com sucesso</InfoResult>
          </DivOrgResults>
        )
      )}
    </DivOrgResumeClientPayment>
  );
}
