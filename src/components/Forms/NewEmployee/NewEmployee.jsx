import React, { useEffect, useState } from "react";
import {
  DivNewEmployee,
  FormEmployee,
  DivOrgEmployee,
  LabelEmployee,
  LabelEmployeeStreet,
  SubmitFormEmployee,
  InputMedium,
  SelectOption,
  Options,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  InputSmall,
  SelectPosition,
} from "./NewEmployeeStyles";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import {
  useCreateEmployeeMutation,
  useLazyGetInfoEmployeeQuery,
  useGetCodEmployeeQuery,
} from "../../../store/registers/employee/employee.api";
import { NumericFormat, PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

export default function NewEmployee({ positionInfo, employeeCod, loadingCod }) {
  // * CreateEmployee
  const [
    createEmployee,
    {
      isLoading: employeeLoading,
      isError: employeeIsError,
      error: employeeError,
    },
  ] = useCreateEmployeeMutation();
  // * GetInfoEmployee
  const [getEmployee] = useLazyGetInfoEmployeeQuery();
  // * GetCodEmployee

  const { register, handleSubmit, reset, formState } = useForm();
  const FormatDate = new FormatDatesFront();

  const [docEmployee, setDocEmployee] = useState("");
  const [phoneEmployee, setPhoneEmployee] = useState("");
  const [percentSell, setPercentSell] = useState(0);

  const [optionsPosition, setOptionsPosition] = useState();
  const [isClearable] = useState(true);
  const [position, setPosition] = useState([]);

  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [employeeErro, setEmployeeErro] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingListEmployees, setLoadingListEmployees] = useState(false);

  const newEmployee = async (dataEmployee) => {
    setLoading(true);
    dataEmployee.cpf = docEmployee;
    dataEmployee.numberPhone = phoneEmployee;
    dataEmployee.percentSell = percentSell;
    dataEmployee.idEmployee = employeeCod;
    dataEmployee.idPosition = position.value;
    dataEmployee.dateAdmission = FormatDate.formatDateInput(
      dataEmployee.dateAdmission
    );

    const employeeCreate = await createEmployee(dataEmployee);

    setEmployeeInfo(employeeCreate.data || employeeCreate.error.data);
    setTimeout(() => {
      setLoading(false);
    }, 150);
    setTimeout(() => {
      setLoadingListEmployees(true);
    }, 1500);
  };

  const getEmployeeInfo = async (docEmployee) => {
    const employeeDocEmployee = await getEmployee(docEmployee);
    setEmployeeErro(employeeDocEmployee.data || employeeDocEmployee.error.data);
  };

  const sendPosition = (position) => {
    setPosition(position);
  };

    const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setDocEmployee("");
        setPhoneEmployee("");
        setEmployeeInfo([]);
      }, 2000);
    }
  }, [formState, reset, setDocEmployee, setEmployeeInfo, setPhoneEmployee]);

  useEffect(() => {
    if (docEmployee.length === 11) {
      getEmployeeInfo(docEmployee);
    } else {
      setEmployeeErro([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docEmployee]);

  useEffect(() => {
    if (employeeErro?.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [employeeErro]);

  useEffect(() => {
    let listPosition = positionInfo;
    if (listPosition?.length > 0) {
      const infoPosition = listPosition.map((position) => ({
        value: position.idPosition,
        label: parseName(position.namePosition),
      }));
      setOptionsPosition(infoPosition);
    }
  }, [positionInfo]);

  return (
    <DivNewEmployee>
      <FormEmployee onSubmit={handleSubmit(newEmployee)}>
        <DivOrgEmployee>
          <LabelEmployee>CPF</LabelEmployee>
          <PatternFormat
            customInput={InputMedium}
            value={docEmployee}
            format="###.###.###-##"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setDocEmployee(values.value);
            }}
          />
        </DivOrgEmployee>
        {employeeErro.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe um funcionario com esse CPF</InfoResult>
          </DivOrgResults>
        )}
        <DivOrgEmployee>
          <LabelEmployee>Codigo</LabelEmployee>
          {loadingCod ? (
            <ClipLoader speedMultiplier={3} />
          ) : (
            <LabelEmployee>{employeeCod}</LabelEmployee>
          )}
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Nome</LabelEmployee>
          <InputMedium
            type="text"
            maxLength={20}
            {...register("firstName", {
              required: true,
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Sobrenome</LabelEmployee>
          <InputMedium
            type="text"
            maxLength={20}
            {...register("lastName", {
              required: true,
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Data de Contratação</LabelEmployee>
          <InputMedium
            type="date"
            {...register("dateAdmission", { required: true })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Telefone</LabelEmployee>
          <PatternFormat
            customInput={InputMedium}
            value={phoneEmployee}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setPhoneEmployee(values.value);
            }}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployeeStreet>Email</LabelEmployeeStreet>
          <InputMedium type="text" maxLength={70} {...register("email")} />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Função</LabelEmployee>
          <SelectPosition
            name="position"
            placeholder="Selecione"
            options={optionsPosition}
            isClearable={isClearable}
            onChange={sendPosition}
          />
          {/* <InputMedium type="text" maxLength={30} {...register("function")} /> */}
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Percentual de Comissão</LabelEmployee>
          <NumericFormat
            value={percentSell}
            customInput={InputSmall}
            decimalSeparator="."
            decimalScale={2}
            placeholder="%"
            suffix="%"
            isAllowed={(values) => {
              if (!values.value) return true;
              const { floatValue } = values;
              return floatValue <= 100;
            }}
            onValueChange={(values, sourceInfo) => {
              setPercentSell(values.value);
            }}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Status</LabelEmployee>
          <SelectOption {...register("status")}>
            <Options value="">Selecione</Options>
            <Options value="ativo">Ativo</Options>
            <Options value="desativado">Desativado</Options>
          </SelectOption>
        </DivOrgEmployee>
        <SubmitFormEmployee type="submit" disabled={disableBtn}>
          Cadastrar
        </SubmitFormEmployee>
      </FormEmployee>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (employeeInfo.errorStatus && (
          <DivOrgResults>
            <InfoResult>{employeeInfo.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (employeeInfo.successStatus && (
          <DivOrgResults>
            <InfoResult>{employeeInfo.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivNewEmployee>
  );
}
