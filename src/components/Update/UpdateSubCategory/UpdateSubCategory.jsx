import React, { useEffect, useState } from "react";
import {
  DivUpdateSubCategory,
  FormSubCategory,
  DivOrgSubCategory,
  LabelSubCategory,
  InputSubCategory,
  SubmitSubCategory,
  DivBtnSubCategory,
  BtnRemoveSubCategory,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  DivOrgTitle,
  TitleSubCategory,
} from "./UpdateSubCategoryStyle";
// import {  } from "./UpdateSubCategoryStyle";
import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import {
  useLazyGetInfoSubCategoryQuery,
  useUpSubCategoryMutation,
} from "../../../store/registers/subCategory/subCategory.api";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdateSubCategory(props) {
  const subCategoryDetail = props.dataSubCategory;

  const [
    updtSubCategory,
    { isLoading: categoryLoading, isError: categoryIsError },
  ] = useUpSubCategoryMutation();
  const [getNameSubCategory] = useLazyGetInfoSubCategoryQuery();

  const { register, handleSubmit } = useForm();
  const [subCategoryInfo, setSubCategoryInfo] = useState([]);
  const [loadingUpdateSubCategory, setLoadingUpdateSubCategory] = useState();

  const [nameSubCategory, setNameSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState([]);
  const [subCategorySearch] = useDebounce(nameSubCategory, 500);
  const [disableBtn, setDisableBtn] = useState(false);

  const [dataSubCategory, setDataSubCategory] = useState({
    idSubCategory: subCategoryDetail.idSubCategory || "",
    subCategoryName: subCategoryDetail.subCategoryName || "",
  });

  const subCategoryUptd = async () => {
    setLoadingUpdateSubCategory(true);
    // if (valueSubCategory !== undefined) {
    //   dataSubCategory.valueSubCategory = valueSubCategory;
    // }
    const upSubCategory = await updtSubCategory({
      idSubCategory: dataSubCategory.idSubCategory,
      infoSubCategory: dataSubCategory,
    });
    setSubCategoryInfo(upSubCategory.data || upSubCategory.error.data);
    setTimeout(() => {
      setLoadingUpdateSubCategory(false);
    });
    if (upSubCategory.data.successStatus === true) {
      setTimeout(() => {
        props.setSubCategoryPop(false);
      }, 3000);
    }
  };

  const verifySubCategory = async (subCategory) => {
    const infoSubCategory = {
      nameSubCategory: subCategory.toLowerCase(),
      idCategory: subCategoryDetail.idCategory,
    };
    const subCategoryExists = await getNameSubCategory(infoSubCategory);
    setSubCategoryError(subCategoryExists.data || subCategoryExists.error.data);
  };

  useEffect(() => {
    if (subCategorySearch.length === 0) {
      setSubCategoryError(subCategorySearch);
    }

    if (subCategorySearch) {
      verifySubCategory(subCategorySearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategorySearch]);

  useEffect(() => {
    if (subCategoryError.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [subCategoryError]);

  return (
    <DivUpdateSubCategory show={props.subCategoryPop}>
      <FormSubCategory onSubmit={handleSubmit(subCategoryUptd)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => props.setSubCategoryPop(false)}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgTitle>
          <TitleSubCategory>
            Atualizar Sub-Categoria: {subCategoryDetail.subCategoryName}
          </TitleSubCategory>
        </DivOrgTitle>
        <DivOrgSubCategory>
          <LabelSubCategory>Codigo Sub Categoria</LabelSubCategory>
          <LabelSubCategory>{dataSubCategory.idSubCategory}</LabelSubCategory>
        </DivOrgSubCategory>
        <DivOrgSubCategory>
          <LabelSubCategory>Categoria</LabelSubCategory>
          <InputSubCategory
            value={dataSubCategory.subCategoryName}
            {...register("subCategoryName", {
              onChange: (e) => {
                setDataSubCategory({
                  ...dataSubCategory,
                  subCategoryName: e.target.value,
                });
                setNameSubCategory(e.target.value);
              },
            })}
          />
        </DivOrgSubCategory>
        {subCategoryError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>
              Essa Sub-categoria já foi cadastrada com esse nome
            </InfoResult>
          </DivOrgResults>
        )}
        <DivBtnSubCategory>
          <BtnRemoveSubCategory
            type="cancel"
            onClick={() => {
              props.setSubCategoryPop(false);
            }}
          >
            Cancelar
          </BtnRemoveSubCategory>
          <SubmitSubCategory type="submit" disabled={disableBtn}>
            Salvar
          </SubmitSubCategory>
        </DivBtnSubCategory>
        {loadingUpdateSubCategory ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (subCategoryInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{subCategoryInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (subCategoryInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{subCategoryInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormSubCategory>
    </DivUpdateSubCategory>
  );
}
