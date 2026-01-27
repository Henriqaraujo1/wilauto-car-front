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
} from "./DeleteBrandStyle";
import { Close } from "@styled-icons/material";
import {
  brandApi,
  useDeleteBrandMutation,
} from "../../../store/registers/brand/brand.api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

export default function DeleteBrand({
  selectedBrand,
  delBrandOption,
  setDelBrandOption,
}) {
  const brandRemove = selectedBrand;
  const dispatch = useDispatch();

  // Estado local para mensagem de resultado (sucesso ou erro)
  const [message, setMessage] = useState(null);

  // Hook mutation do RTK Query
  const [downBrand, { isLoading: brandLoading }] = useDeleteBrandMutation();

  // Função para deletar cliente com tratamento adequado
  const deleteBrand = async (dataBrand) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeleteBrand = await downBrand(dataBrand.idBrand).unwrap();

      if (infoDeleteBrand.codeStatus === 200) {
        setTimeout(() => {
          dispatch(brandApi.util.invalidateTags(["Brand"]));
        }, 2000);
      }

      setMessage({ type: "success", text: "Categoria deletada com sucesso!" });

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelBrandOption(false);
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
        <BtnClose onClick={() => setDelBrandOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delBrandOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar a Marca: {brandRemove.brandName} ?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm
            onClick={() => deleteBrand(brandRemove)}
            disabled={brandLoading}
          >
            {brandLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>
          <BtnCancel
            onClick={() => setDelBrandOption(false)}
            disabled={brandLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {brandLoading && (
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
