import { useEffect, useState } from "react";
import { Close } from "@styled-icons/material";
import {
  DivUpdateEmployee,
  FormEmployee,
  DivOrgEmployee,
  LabelEmployee,
  SubmitFormEmployee,
  InputMedium,
  DivBtnClose,
  BtnClose,
  SelectOption,
  Options,
  BtnCancel,
  DivBtn,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  InputSmall,
  SelectPosition,
} from "./UpdateEmployeeStyle";

import { useForm } from "react-hook-form";
import {
  useUpEmployeeMutation,
  useLazyGetInfoEmployeeQuery,
} from "../../../store/registers/employee/employee.api";
import { NumericFormat, PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function UpdateEmployee({
  dataEmployeeUpdate,
  employeePopUp,
  setEmployeePopUp,
  positionInfo,
}) {
  const [
    updtEmployee,
    {
      isLoading: employeeLoading,
      isError: employeeIsError,
      error: employeeError,
    },
  ] = useUpEmployeeMutation();
  const [getEmployeeByDoc] = useLazyGetInfoEmployeeQuery();

  const employeeDetail = dataEmployeeUpdate;
  const listPosition = positionInfo;
  const FormatDates = new FormatDatesFront();

  const { register, handleSubmit } = useForm();

  const [employeeErro, setEmployeeErro] = useState([]);

  const [optionsPosition, setOptionsPosition] = useState();
  const [isClearable] = useState(true);

  const [employeeInfo, setEmployeeInfo] = useState({});
  const [cpf, setDocEmployee] = useState();
  const [phoneEmployee, setPhoneEmployee] = useState();
  const [percentSell, setPercentSell] = useState([]);

  const [loadingUpdateEmployee, setLoadingUpdateEmployee] = useState();
  const [disableBtn, setDisableBtn] = useState(false);

  const employeePosition = {
    value: employeeDetail.idPosition,
    label: employeeDetail.namePosition,
  };

  const [dataEmployee, setDataEmployee] = useState({
    idEmployee: employeeDetail.idEmployee,
    cpf: employeeDetail.cpf || "",
    firstName: employeeDetail.firstName || "",
    lastName: employeeDetail.lastName || "",
    numberPhone: employeeDetail.numberPhone || "",
    status: employeeDetail.status || "",
    dateAdmission:
      FormatDates.formatDateNoHour(employeeDetail.dateAdmission) || "",
    email: employeeDetail.email || "",
    idPosition: employeePosition || "",
    percentSell: employeeDetail.percentSell || "",
  });

  const sendPosition = (position) => {
    setDataEmployee({ ...dataEmployee, idPosition: position });
  };

  const employeeUpdt = async () => {
    setLoadingUpdateEmployee(true);
    dataEmployee.idEmployee = employeeDetail.idEmployee;
    if (cpf !== undefined) {
      dataEmployee.cpf = cpf;
    }
    if (percentSell.length > 0) {
      dataEmployee.percentSell = percentSell;
    }
    if (phoneEmployee !== undefined) {
      dataEmployee.numberPhone = phoneEmployee;
    }

    dataEmployee.idPosition = dataEmployee?.idPosition.value;

    const upEmployee = await updtEmployee({
      idEmployee: employeeDetail.idEmployee,
      dataEmployee: dataEmployee,
    });

    setEmployeeInfo(upEmployee.data || upEmployee.error.data);
    setTimeout(() => {
      setLoadingUpdateEmployee(false);
    }, 500);
    setTimeout(() => {
      setEmployeePopUp(false);
    }, 3000);
  };

  const getEmployeeCPF = async (cpf) => {
    const employeeCpf = await getEmployeeByDoc(cpf);
    setEmployeeErro(employeeCpf.data || employeeCpf.error.data);
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = firstName.concat("", lastName);
    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    if (cpf?.length === 11) {
      getEmployeeCPF(cpf);
    } else {
      setEmployeeErro([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpf]);

  useEffect(() => {
    if (employeeErro?.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [employeeErro]);

  useEffect(() => {
    if (listPosition?.length > 0) {
      const infoPosition = listPosition.map((position) => ({
        value: position.idPosition,
        label: position.namePosition,
      }));
      setOptionsPosition(infoPosition);
    }
  }, [listPosition]);

  return (
    <DivUpdateEmployee show={employeePopUp}>
      <FormEmployee onSubmit={handleSubmit(employeeUpdt)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              setEmployeePopUp(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgEmployee>
          <LabelEmployee>CPF</LabelEmployee>

          <PatternFormat
            value={employeeDetail.cpf}
            customInput={InputMedium}
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
            <InfoResult>Já existe um Funcionario com esse CPF</InfoResult>
          </DivOrgResults>
        )}
        <DivOrgEmployee>
          <LabelEmployee>Nome</LabelEmployee>
          <InputMedium
            value={parseName(dataEmployee.firstName)}
            {...register("firstName", {
              onChange: (e) => {
                setDataEmployee({
                  ...dataEmployee,
                  firstName: e.target.value,
                });
              },
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Sobrenome</LabelEmployee>
          <InputMedium
            value={parseName(dataEmployee.lastName)}
            {...register("lastName", {
              onChange: (e) => {
                setDataEmployee({
                  ...dataEmployee,
                  lastName: e.target.value,
                });
              },
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Telefone</LabelEmployee>
          <PatternFormat
            value={dataEmployee.numberPhone}
            customInput={InputMedium}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setPhoneEmployee(values.value);
            }}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Data de Admissão</LabelEmployee>
          <InputMedium
            type="date"
            value={dataEmployee.dateAdmission}
            {...register("dateAdmission", {
              onChange: (e) => {
                setDataEmployee({
                  ...dataEmployee,
                  dateAdmission: e.target.value,
                });
              },
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Função</LabelEmployee>
          <SelectPosition
            name="position"
            placeholder="Selecione"
            value={dataEmployee.idPosition}
            options={optionsPosition}
            isClearable={isClearable}
            onChange={sendPosition}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Email</LabelEmployee>
          <InputMedium
            value={dataEmployee.email}
            {...register("email", {
              onChange: (e) => {
                setDataEmployee({
                  ...dataEmployee,
                  email: e.target.value,
                });
              },
            })}
          />
        </DivOrgEmployee>
        <DivOrgEmployee>
          <LabelEmployee>Percentual de Venda</LabelEmployee>
          <NumericFormat
            value={employeeDetail.percentSell}
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
          <SelectOption
            value={dataEmployee.status}
            {...register("status", {
              onChange: (e) => {
                setDataEmployee({
                  ...dataEmployee,
                  status: e.target.value,
                });
              },
            })}
          >
            <Options value={""}>Selecione</Options>
            <Options value={"ativo"}>Ativo</Options>
            <Options value={"desativado"}>Desativado</Options>
          </SelectOption>
        </DivOrgEmployee>
        <DivBtn>
          <BtnCancel type="button" onClick={() => setEmployeePopUp(false)}>
            Cancelar
          </BtnCancel>
          <SubmitFormEmployee type="submit" disabled={disableBtn}>
            Salvar
          </SubmitFormEmployee>
        </DivBtn>
        {loadingUpdateEmployee ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (employeeInfo.codeStatus === 409 && (
            <DivOrgResults>
              <InfoResult>{employeeInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (employeeInfo.codeStatus === 404 && (
            <DivOrgResults>
              <InfoResult>{employeeInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (employeeInfo.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>{employeeInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormEmployee>
    </DivUpdateEmployee>
  );
}
