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
} from "./DeleteUserStyle";
import { Close } from "@styled-icons/material";
import {
  usersApi,
  useDeleteUserMutation,
} from "../../../store/registers/users/users.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeleteUser({
  selectedUser,
  delUserOption,
  setDelUserOption,
}) {
  const dispatch = useDispatch();
  const userRemove = selectedUser;

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [downUser, { isLoading: userLoading }] = useDeleteUserMutation();

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

  // Função para deletar usere com tratamento adequado
  const deleteUser = async (dataUser) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeleteUser = await downUser(dataUser.idUser).unwrap();

      if (infoDeleteUser.codeStatus === 200) {
        setTimeout(() => {
          dispatch(usersApi.util.invalidateTags(["User"]));
        }, 2000);
      }

      setMessage({ type: "success", text: "Usuário deletado com sucesso!" });

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        // Invalida cache para atualizar lista
        setDelUserOption(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar o usuario.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelUserOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delUserOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o usuario:{" "}
            {parseName(userRemove.firstName, userRemove.lastName)}?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteUser(userRemove)}
            disabled={userLoading}
          >
            {userLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelUserOption(false)}
            disabled={userLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {userLoading && (
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
