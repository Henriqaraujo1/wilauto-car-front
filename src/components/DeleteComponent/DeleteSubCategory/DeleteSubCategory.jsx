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
} from "./DeleteSubCategoryStyle";
import { Close } from "@styled-icons/material";
import {
  subCategoryApi,
  useDeleteSubCategoryMutation,
} from "../../../store/registers/subCategory/subCategory.api";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function DeleteSubCategory({
  delSubCategory,
  setDelSubCategory,
  selectSubCategory,
}) {
  const subCategoryRemove = selectSubCategory;
  const dispatch = useDispatch();

  const [downSubCategory, { isLoading: categoryLoading }] =
    useDeleteSubCategoryMutation();

  const [message, setMessage] = useState(false);

  const deleteSubCategory = async (dataProvider) => {
    try {
      setMessage(null); // limpa mensagem anterior
      const infoDeleteProvider = await downSubCategory(
        dataProvider.idProvider
      ).unwrap();

      setMessage({ type: "success", text: "Sub Categoria deletado com sucesso!" });

      if (infoDeleteProvider.codeStatus === 200) {
        setTimeout(() => {
          dispatch(subCategoryApi.util.invalidateTags(["SubCategory"]));
        }, 2000);
      }

      // Fecha o modal depois de um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        setDelSubCategory(false);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar a Sub Categoria.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelSubCategory(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delSubCategory}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar a categoria ({subCategoryRemove.subCategoryName})
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm onClick={() => deleteSubCategory(subCategoryRemove)}>
            Sim
          </BtnConfirm>
          <BtnCancel onClick={() => setDelSubCategory(false)}>
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {categoryLoading && (
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
