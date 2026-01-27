import React, { useEffect, useState } from "react";
import {
  BtnClose,
  BtnFinishComission,
  DivBtnClose,
  DivOrgBtn,
  DivOrgComission,
  DivOrgInput,
  DivOrgLoading,
  DivOrgResults,
  FormComission,
  InfoResult,
  LabelComission,
  PriceBuyed,
  SelectOption,
} from "./NewComissionStyle";
import { Close } from "@styled-icons/material";
import { useForm } from "react-hook-form";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { useDispatch } from "react-redux";
import { upComission } from "../../../store/financial/comission/comission.actions";
import { ClipLoader } from "react-spinners";

export default function NewComission(props) {
  const dataComission = props.createComission;
  const periodDate = props.periodDate;
  const FormatDate = new FormatDatesFront();
  const dispatch = useDispatch();

  const { handleSubmit, reset } = useForm();

  const [paymentInfo, setPaymentInfo] = useState([]);
  const [optionsEmployee, setOptionsEmployee] = useState([]);

  const [selectEmployee, setSelectEmployee] = useState([]);
  const [comissionFinal, setComissionFinal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusComission, setStatusComission] = useState([]);

  const optionsPayment = [
    { value: 1, label: "Debito" },
    { value: 2, label: "Dinheiro" },
    { value: 3, label: "Pix" },
  ];

  const sendPayment = (payment) => {
    setPaymentInfo(payment);
  };

  const sendEmployee = (selectedOptions) => {
    console.log(selectedOptions)
    // Atualiza os funcionários selecionados
    const employeeSelect = selectedOptions.map((option) => option);
    setSelectEmployee(employeeSelect);
  };

  const createComission = async (comissionInfo) => {
    setLoading(true);
    const infoEmployee = [];

    for (const [, currentEmployee] of Object.entries(selectEmployee)) {
      infoEmployee.push({
        idEmployee: currentEmployee.value,
        idComission: currentEmployee.idComission,
        nameEmployee: currentEmployee.label,
        statusPayment: "pago",
        datePayment: FormatDate.getDateNoHour(),
      });
    }

    comissionInfo.dataComission = infoEmployee;
    comissionInfo.formPayment = paymentInfo.label.toLowerCase();
    comissionInfo.expenseType = "comissões";
    comissionInfo.value = Number(comissionFinal.toFixed(2));
    comissionInfo.status = "pago";
    comissionInfo.datePayment = FormatDate.getDateNow();
    comissionInfo.destination = "funcionarios";
    comissionInfo.optionDueDate = "nao";
    comissionInfo.description = `pagamento comissão do mes de ${periodDate}`;
    comissionInfo.idCategory = 0;
    comissionInfo.idSubCategory = 0;

    const newComission = await dispatch(upComission(comissionInfo));

    setStatusComission(newComission.payload);
    setTimeout(() => {
      setLoading(false);
    }, [500]);
  };

  useEffect(() => {
    const newComission = selectEmployee.reduce(
      (acumulador, nomeSelecionado) => {
        const venda = dataComission.find(
          ({ nameEmployee }) => nameEmployee === nomeSelecionado.label
        );
        return venda ? acumulador + venda.totalComissionNoPayed : acumulador;
      },
      0
    );

    setComissionFinal(newComission);
  }, [dataComission, selectEmployee]);

  useEffect(() => {
    const optionsEmployee = dataComission.map((employee) => ({
      value: employee.idEmployee,
      label: employee.nameEmployee,
      totalComissionNoPayed: employee.totalComissionNoPayed,
      idComission: employee.idComissionNoPayed,
    }));

    setOptionsEmployee(optionsEmployee);
  }, [dataComission]);

  useEffect(() => {
    if (statusComission.codeStatus === 200) {
      setTimeout(() => {
        reset();
        props.setResetFilter(true);
        props.setShowComission(false);
        setStatusComission([])
      }, 1500);
    }
  });

  return (
    <DivOrgComission show={props.showComission}>
      <FormComission onSubmit={handleSubmit(createComission)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setShowComission(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgInput>
          <LabelComission>Valor das Comissões</LabelComission>
          <PriceBuyed
            displayType="text"
            value={comissionFinal || 0}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
        </DivOrgInput>
        <DivOrgInput>
          <LabelComission>Funcionarios</LabelComission>
          <SelectOption
            options={optionsEmployee}
            name="funcionarios"
            placeholder="Selecione"
            isMulti
            onChange={sendEmployee}
          />
        </DivOrgInput>
        <DivOrgInput>
          <LabelComission>Periodo das Comissões</LabelComission>
          <LabelComission>{periodDate}</LabelComission>
        </DivOrgInput>
        <DivOrgInput>
          <LabelComission>Forma de pagamento</LabelComission>
          <SelectOption
            options={optionsPayment}
            name="Pagamento"
            placeholder="Selecione"
            isClearable={true}
            onChange={sendPayment}
          />
        </DivOrgInput>
        <DivOrgBtn>
          <BtnFinishComission type="submit">Gerar Comissão</BtnFinishComission>
        </DivOrgBtn>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (statusComission.codeStatus === 404 && (
            <DivOrgResults>
              <InfoResult>{statusComission.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (statusComission.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>{statusComission.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormComission>
    </DivOrgComission>
  );
}
