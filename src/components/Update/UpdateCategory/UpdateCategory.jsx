import React, { useEffect, useState } from "react";
import {
  DivUpdateCategory,
  FormCategory,
  DivOrgCategory,
  LabelCategory,
  InputCategory,
  SubmitCategory,
  DivBtnCategory,
  BtnRemoveCategory,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdateCategoryStyle";

import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import {
  useLazyGetInfoCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../store/registers/category/category.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdateCategory(props) {
  const categoryDetail = props.dataCategoryUpdate;

  const { register, handleSubmit } = useForm();

  const [
    updtCategory,
  ] = useUpdateCategoryMutation();
  const [getNameCategory] = useLazyGetInfoCategoryQuery();

  const [categoryInfo, setCategoryInfo] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [categoryError, setCategoryError] = useState([]);
  const [nameCategorySearch] = useDebounce(nameCategory, 500);
  const [disableBtn, setDisableBtn] = useState(false);

  const [loadingUpdateCategory, setLoadingUpdateCategory] = useState();
  // const [valueCategory, setValueCategory] = useState();
  const [dataCategory, setDataCategory] = useState({
    idCategory: categoryDetail.idCategory || "",
    categoryName: categoryDetail.categoryName || "",
  });

  const categoryUptd = async () => {
    setLoadingUpdateCategory(true);
    const upCategory = await updtCategory({
      idCatedory: dataCategory.idCategory,
      infoCategory: dataCategory,
    });

    setCategoryInfo(upCategory.data || upCategory.error.data);
    setTimeout(() => {
      setLoadingUpdateCategory(false);
    });
    if (upCategory.data.successStatus === true) {
      setTimeout(() => {
        props.setCategoryPopUp(false);
      }, 3000);
    }
  };

  const verifyCategory = async (nameCategory) => {
    const categoryExists = await getNameCategory(nameCategory.toLowerCase());
    setCategoryError(categoryExists.data || categoryExists.error.data);
  };

  useEffect(() => {
    if (nameCategorySearch.length === 0) {
      setCategoryError(nameCategorySearch);
    }

    if (nameCategorySearch) {
      verifyCategory(nameCategorySearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameCategorySearch]);

  useEffect(() => {
    if (categoryError.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [categoryError.codeStatus]);

  return (
    <DivUpdateCategory show={props.categoryPopUp}>
      <FormCategory type="button" onSubmit={handleSubmit(categoryUptd)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setCategoryPopUp(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgCategory>
          <LabelCategory>Codigo Categoria</LabelCategory>
          <LabelCategory>{dataCategory.idCategory}</LabelCategory>
        </DivOrgCategory>
        <DivOrgCategory>
          <LabelCategory>Categoria</LabelCategory>
          <InputCategory
            value={dataCategory.categoryName}
            {...register("nameCategory", {
              onChange: (e) => {
                setDataCategory({
                  ...dataCategory,
                  categoryName: e.target.value,
                });
                setNameCategory(e.target.value);
              },
            })}
          />
        </DivOrgCategory>
        {categoryError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe uma categoria com esse nome</InfoResult>
          </DivOrgResults>
        )}
        <DivBtnCategory>
          <BtnRemoveCategory
            type="cancel"
            onClick={() => {
              props.setCategoryPopUp(false);
            }}
          >
            Cancelar
          </BtnRemoveCategory>
          <SubmitCategory type="submit" disabled={disableBtn}>
            Salvar
          </SubmitCategory>
        </DivBtnCategory>
        {loadingUpdateCategory ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (categoryInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{categoryInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (categoryInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{categoryInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormCategory>
    </DivUpdateCategory>
  );
}
