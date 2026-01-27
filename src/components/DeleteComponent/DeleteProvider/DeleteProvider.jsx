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
} from "./DeleteProviderStyle";
import { Close } from "@styled-icons/material";
import {
  providerApi,
  useDeleteProviderMutation,
} from "../../../store/registers/provider/provider.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeleteProvider({
  selectedProvider,
  delProviderOption,
  setDelProviderOption,
}) {
  const dispatch = useDispatch();
  const providerRemove = selectedProvider;

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [
    downProvider,
    {
      isLoading: providerLoading,
    },
  ] = useDeleteProviderMutation();

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

  // Função para deletar providere com tratamento adequado
  const deleteProvider = async (dataProvider) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeleteProvider = await downProvider(dataProvider.idProvider).unwrap();

      setMessage({ type: "success", text: "Fornecedor deletado com sucesso!" });

      if (infoDeleteProvider.codeStatus === 200) {
        setTimeout(() => {
          dispatch(providerApi.util.invalidateTags(["Product"]));
        }, 2000);
      }

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelProviderOption(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar o Fornecedor.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelProviderOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delProviderOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o Fornecedor:{" "}
            {parseName(providerRemove.providerName, providerRemove.lastName)}?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteProvider(providerRemove)}
            disabled={providerLoading}
          >
            {providerLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelProviderOption(false)}
            disabled={providerLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {providerLoading && (
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
