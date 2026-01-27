import React, { useEffect, useState } from "react";
import {
  DivUpdatePayment,
  FormPayment,
  DivOrgPayment,
  LabelPayment,
  InputPayment,
  SubmitPayment,
  DivBtnPayment,
  BtnRemovePayment,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  DivOrgTitle,
  TitleDetailPayment,
  SelectOption,
  Options,
  DivOrgInstallments,
  InputQtd,
  DivOrgQtdInputs,
  DivQtdInputs,
  LabelQtd,
  InputDate,
  FormatPayment,
} from "./DetailPayment.style";
// import {  } from "./UpdatePaymentStatus";
import { useForm } from "react-hook-form";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { Close } from "@styled-icons/material";

// import {
//   useUpPaymentMutation,
//   useLazyGetPaymentQuery,
// } from "../../../store/registers/payment/payment.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";
import { NumericFormat } from "react-number-format";

export default function DetailPayment({
  popUpPayment,
  infoOrderStock,
  setPopUpPayment,
  totalFinalOrder,
  setFinalPayment,
  statusOrder,
}) {

  const { register, handleSubmit, reset } = useForm();
  const [loadingUpdatePayment, setLoadingUpdatePayment] = useState();
  const [loadingPayment, setLoadingPayment] = useState();
  const [namePayment, setNamePayment] = useState();
  const [namePaymentSearch] = useDebounce(namePayment, 500);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [upPayment, setUpPayment] = useState([]);
  const [typePayment, setTypePayment] = useState(null);
  const [infoPayments, setInfoPayment] = useState(null);
  const [datePix, setDatePix] = useState(null);
  const [dateInput, setDateInput] = useState([""]);

  const paymentUptd = async (upPayment) => {
    setLoadingUpdatePayment(true);

    setFinalPayment(dateInput);

    setTimeout(() => {
      setLoadingUpdatePayment(false);
      setPopUpPayment(false);
    }, 1000);
    // if (changePayment.data.successStatus === true) {
    //   setTimeout(() => {
    //     setPaymentPopUp(false);
    //   }, 3000);
    // }
  };

  //Buscar marca antes de cadastrar
  const getPayment = async (dataPayment) => {
    setLoadingPayment(true);
    const namePaymentInfo = await getPaymentInfo(dataPayment.toLowerCase());
    setPaymentInfo(namePaymentInfo.data || namePaymentInfo.error.data);
    setTimeout(setLoadingPayment(false), 1000);
  };

  const formPayment = (typePayment) => {
    setTypePayment(typePayment);
  };

  const datePayments = (e) => {
    const newQtd = parseInt(e) || 1;
    setInfoPayment(newQtd);

    const valuePayment = totalFinalOrder / newQtd;

    // Gera um array com a nova quantidade de parcelas
    const newInputs = Array.from({ length: newQtd }, (_, i) => ({
      description: `Parcela ${i + 1} do pedido`,
      dateCreated: "",
      dueDate: "",
      dateUpdate: "",
      datePayment: "",
      value: parseFloat(valuePayment.toFixed(2)),
      status: "pendente",
      destination: infoOrderStock?.nameProvider,
      idProvider: infoOrderStock?.idProvider,
      formPayment: "boleto",
      idCategory: 0,
      idSubCategory: 2,
      expenseType: `Parcela ${i + 1} do pedido`,
    }));

    setDateInput(newInputs);
  };

  const qtdPayments = (index, newInput) => {
    const newDates = [...dateInput];
    newDates[index].dueDate = newInput;
    setDateInput(newDates);
  };

  useEffect(() => {
    if (namePaymentSearch?.length === 0) {
      setPaymentInfo(namePaymentSearch);
    } else if (namePaymentSearch) {
      getPayment(namePaymentSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namePaymentSearch]);

  useEffect(() => {
    if (statusOrder === true) {
      setDateInput([]);
      setInfoPayment([]);
    }
  }, [statusOrder]);

  return (
    <DivUpdatePayment show={popUpPayment}>
      <FormPayment onSubmit={handleSubmit(paymentUptd)}>
        <DivOrgTitle>
          <TitleDetailPayment>Forma de Pagamento</TitleDetailPayment>
        </DivOrgTitle>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setPopUpPayment(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgPayment>
          <LabelPayment>Fornecedor</LabelPayment>
          <LabelPayment>{infoOrderStock?.nameProvider}</LabelPayment>
        </DivOrgPayment>
        <DivOrgPayment>
          <LabelPayment>Valor Total</LabelPayment>

          <NumericFormat
            displayType="text"
            value={totalFinalOrder || 0}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
        </DivOrgPayment>
        <DivOrgPayment>
          <LabelPayment>Forma de Pagamento</LabelPayment>
          <SelectOption onChange={(e) => formPayment(e.target.value)}>
            <Options value="">Selecione</Options>
            <Options value="boleto">Boleto</Options>
            <Options value="pix">Pix</Options>
          </SelectOption>
        </DivOrgPayment>
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
              defaultValue={infoPayments}
              onChange={(e) => datePayments(e.target.value)}
            />
          </DivOrgPayment>
          <DivOrgQtdInputs>
            <DivQtdInputs>
              {dateInput.map((inputPayment, index) => {
                return (
                  <DivOrgPayment key={index}>
                    <LabelQtd>Parcela {index + 1}</LabelQtd>
                    <FormatPayment
                      displayType="text"
                      value={inputPayment.value || 0}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                    <InputQtd
                      type="date"
                      onChange={(e) => qtdPayments(index, e.target.value)}
                    />
                  </DivOrgPayment>
                );
              })}
            </DivQtdInputs>
          </DivOrgQtdInputs>
        </DivOrgInstallments>

        {loadingPayment ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          paymentInfo?.successStatus && (
            <DivOrgResults>
              <InfoResult>{paymentInfo.message}</InfoResult>
            </DivOrgResults>
          )
        )}
        <DivBtnPayment>
          <BtnRemovePayment
            type="button"
            onClick={() => setPopUpPayment(false)}
          >
            Cancelar
          </BtnRemovePayment>
          <SubmitPayment type="submit">Salvar</SubmitPayment>
        </DivBtnPayment>

        {loadingUpdatePayment ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (upPayment.errorStatus && (
            <DivOrgResults>
              <InfoResult>{upPayment.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (upPayment.successStatus && (
            <DivOrgResults>
              <InfoResult>{upPayment.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormPayment>
    </DivUpdatePayment>
  );
}
