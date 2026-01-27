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
} from "./DeleteClientStyle";
import { Close } from "@styled-icons/material";
import {
  clientApi,
  useDeleteClientMutation,
} from "../../../store/registers/clients/clients.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeleteClient({
  selectedClient,
  delClientOption,
  setDelClientOption,
}) {
  const clientRemove = selectedClient;

  const dispatch = useDispatch();

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [downClient, { isLoading: clientLoading }] = useDeleteClientMutation();

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

  // Função para deletar cliente com tratamento adequado
  const deleteClient = async (dataClient) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const clientDelet = await downClient(dataClient.idClient).unwrap();

      if (clientDelet.codeStatus === 200) {
        setTimeout(() => {
          dispatch(clientApi.util.invalidateTags(["Client"]));
        }, 2000);
      }

      setMessage({ type: "success", text: "Cliente deletado com sucesso!" });

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelClientOption(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar o cliente.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelClientOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delClientOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o cliente:{" "}
            {parseName(clientRemove.clientName, clientRemove.lastName)}?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteClient(clientRemove)}
            disabled={clientLoading}
          >
            {clientLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelClientOption(false)}
            disabled={clientLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {clientLoading && (
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
