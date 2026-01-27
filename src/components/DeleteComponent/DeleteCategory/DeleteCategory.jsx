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
} from "./DeleteCategoryStyle";
import { Close } from "@styled-icons/material";
import {
  categoryApi,
  useDeleteCategoryMutation,
} from "../../../store/registers/category/category.api";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function DeleteCategory({
  selectedCategory,
  delCategoryOption,
  setDelCategoryOption,
}) {
  const categoryRemove = selectedCategory;
  const dispatch = useDispatch();

  const [message, setMessage] = useState([]);

  const [downCategory, { isLoading: categoryLoading }] =
    useDeleteCategoryMutation();

  const deleteCategory = async (dataCategory) => {
    try {
      setMessage(null);
      const idCategory = dataCategory.idCategory;
      const categoryDelete = await downCategory(idCategory).unwrap();

      // setDeleteCategoryInfo(deleteCategory.data || deleteCategory.error.data);

      if (categoryDelete.codeStatus === 200) {
        setTimeout(() => {
          dispatch(categoryApi.util.invalidateTags(["Category"]));
        }, 2000);
      }

      setMessage({ type: "success", text: "Categoria deletado com sucesso!" });

      setTimeout(() => {
        setDelCategoryOption(false);
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.data?.message ||
          error.message ||
          "Erro inesperado ao deletar a categoria",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelCategoryOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={delCategoryOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar a categoria ({categoryRemove.categoryName})
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm onClick={() => deleteCategory(categoryRemove)}>
            Sim
          </BtnConfirm>
          <BtnCancel onClick={() => setDelCategoryOption(false)}>
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
