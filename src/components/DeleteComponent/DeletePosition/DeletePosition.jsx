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
} from "./DeletePositionStyle";
import { Close } from "@styled-icons/material";
import {
  positionApi,
  useDeletePositionMutation,
} from "../../../store/registers/workPosition/position.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeletePosition({
  selectedPosition,
  delPositionOption,
  setDelPositionOption,
}) {
  const dispatch = useDispatch();
  const positionRemove = selectedPosition;

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [
    downPosition,
    {
      isLoading: positionLoading,
    },
  ] = useDeletePositionMutation();

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

  // Função para deletar positione com tratamento adequado
  const deletePosition = async (dataPosition) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeletePosition = await downPosition(dataPosition.idPosition).unwrap();

      if(infoDeletePosition.codeStatus === 200) {
        setTimeout(() => {
          dispatch(positionApi.util.invalidateTags(["Position"]))
        }, 2000)
      }

      setMessage({ type: "success", text: "Profissão deletado com sucesso!" });

      // Invalida cache para atualizar lista

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelPositionOption(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar o Profissão.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelPositionOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delPositionOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar a profissão: {parseName(positionRemove.namePosition)}{" "}
            ?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deletePosition(positionRemove)}
            disabled={positionLoading}
          >
            {positionLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelPositionOption(false)}
            disabled={positionLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {positionLoading && (
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
