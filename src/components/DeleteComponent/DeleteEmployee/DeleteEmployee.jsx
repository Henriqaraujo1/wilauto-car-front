import { useState } from "react";
import {
  DivOrgCardDelete,
  DivOrgBtnClose,
  BtnClose,
  DivOrgLabel,
  DivOrgBtn,
  BtnConfirm,
  BtnCancel,
  LabelDelete,
  DivOrgDelete,
  InfoResult,
  DivOrgResults,
  DivOrgLoading,
} from "./DeleteEmployeeStyle";
import { Close } from "@styled-icons/material";
import {
  employeeApi,
  useDeleteEmployeeMutation,
} from "../../../store/registers/employee/employee.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeleteEmployee({
  selectedEmployee,
  delEmployeeOption,
  setDelEmployeeOption,
}) {
  const dispatch = useDispatch();
  const employeeRemove = selectedEmployee;

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [
    downEmployee,
    {
      isLoading: employeeLoading,
    },
  ] = useDeleteEmployeeMutation();

  // Função para formatar nome
  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    let fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName.concat("", lastName);
    }
    const formatName = fullName.split(" ");
    for (let i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    return formatName.join(" ");
  };

  // Função para deletar employeee com tratamento adequado
  const deleteEmployee = async (dataEmployee) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeleteEmployee = await downEmployee(dataEmployee.idEmployee).unwrap();

      if(infoDeleteEmployee.codeStatus === 200) {
        setTimeout(() => {
          dispatch(employeeApi.util.invalidateTags(["Employee"]))
        }, 2000)
      }

      setMessage({
        type: "success",
        text: "Funcionario deletado com sucesso!",
      });

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelEmployeeOption(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar o employeee.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelEmployeeOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delEmployeeOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o funcionario:{" "}
            {parseName(employeeRemove.firstName, employeeRemove.lastName)}?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteEmployee(employeeRemove)}
            disabled={employeeLoading}
          >
            {employeeLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelEmployeeOption(false)}
            disabled={employeeLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {employeeLoading && (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      )}
      {message && (
        <DivOrgResults>
          <InfoResult isError={message.type === "error"}>
            {message.text}
          </InfoResult>
        </DivOrgResults>
      )}
    </DivOrgDelete>
  );
}
