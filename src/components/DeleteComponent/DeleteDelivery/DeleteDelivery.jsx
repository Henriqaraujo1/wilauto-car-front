import React, { useState } from "react";
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
} from "./DeleteDeliveryStyle";
import { Close } from "@styled-icons/material";
import {
  deliveryApi,
  useDeleteDeliveryMutation,
} from "../../../store/registers/delivery/delivery.api";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function DeleteDelivery({
  
  selectedDelivery,
  delDeliveryOption,
  setDelDeliveryOption,
}) {
  const deliveryRemove = selectedDelivery;
  const dispatch = useDispatch();

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [downDelivery, { isLoading: deliveryLoading }] =
    useDeleteDeliveryMutation();

  const deleteDelivery = async (dataClient) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const clientDelet = await downDelivery(dataClient.idDelivery).unwrap();

      if (clientDelet.codeStatus === 200) {
        setTimeout(() => {
          dispatch(deliveryApi.util.invalidateTags(["Delivery"]));
        }, 2000);
      }

      setMessage({ type: "success", text: "Endereço deletado com sucesso!" });

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelDeliveryOption(false);
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
        <BtnClose onClick={() => setDelDeliveryOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delDeliveryOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o bairro ({deliveryRemove.districtName}) para entregas
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteDelivery(deliveryRemove)}
            disabled={deliveryLoading}
          >
            {deliveryLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelDeliveryOption(false)}
            disabled={deliveryLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {deliveryLoading && (
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
