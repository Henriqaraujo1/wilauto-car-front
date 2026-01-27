import React, { useEffect, useState } from "react";
import {
  DivNewSubCategory,
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
  TitleSubCategory,
} from "./NewSubCategoryStyle";
// import {  } from "./NewSubCategoryStyle";
import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import {
  useNewSubCategoryMutation,
  useLazyGetInfoSubCategoryQuery,
} from "../../../store/registers/subCategory/subCategory.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewSubCategory(props) {
  const categoryDetail = props.dataNewSub;

  // * - RTK CreateCategory
  const [
    createSubCategory,
  ] = useNewSubCategoryMutation();

  // * - RTK GetCategory
  const [getNameSubCategory] = useLazyGetInfoSubCategoryQuery();

  const { register, handleSubmit, reset } = useForm();
  const [subCategoryInfo, setSubCategoryInfo] = useState([]);

  const [nameSubCategory, setNameSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState([]);
  const [subCategorySearch] = useDebounce(nameSubCategory, 500);
  const [disableBtn, setDisableBtn] = useState(false);

  const [loadingNewSubCategory, setLoadingNewSubCategory] = useState(false);
  const [dataSubCategory] = useState({
    idCategory: categoryDetail.idCategory || "",
    categoryName: categoryDetail.categoryName || "",
  });

  const categoryUptd = async (newSubCategory) => {
    setLoadingNewSubCategory(true);
    newSubCategory.idCategory = dataSubCategory.idCategory;

    const upSubCategory = await createSubCategory(newSubCategory);
    setSubCategoryInfo(upSubCategory.data || upSubCategory.error.data);
    setTimeout(() => {
      setLoadingNewSubCategory(false);
    }, 500);
  };

  const verifySubCategory = async (subCategory) => {
    const infoSubCategory = {
      nameSubCategory: subCategory.toLowerCase(),
      idCategory: dataSubCategory.idCategory,
    };
    const subCategoryExists = await getNameSubCategory(infoSubCategory);
    setSubCategoryError(subCategoryExists.data || subCategoryExists.error.data);
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = firstName.concat("", lastName);
    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    if (subCategoryInfo.codeStatus === 200) {
      setTimeout(() => {
        reset();
        setSubCategoryInfo([]);
      }, 2500);
    }
  }, [reset, subCategoryInfo]);

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
    <DivNewSubCategory show={props.newSubPop}>
      <FormSubCategory onSubmit={handleSubmit(categoryUptd)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setNewSubPop(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <TitleSubCategory>
          Criar nova Sub-categoria de {parseName(dataSubCategory.categoryName)}
        </TitleSubCategory>
        <DivOrgSubCategory>
          <LabelSubCategory>Codigo Categoria</LabelSubCategory>
          <LabelSubCategory>{dataSubCategory.idCategory}</LabelSubCategory>
        </DivOrgSubCategory>
        <DivOrgSubCategory>
          <LabelSubCategory>Categoria</LabelSubCategory>
          <LabelSubCategory>
            {parseName(dataSubCategory.categoryName)}
          </LabelSubCategory>
        </DivOrgSubCategory>
        <DivOrgSubCategory>
          <LabelSubCategory>Nome Sub-Categoria</LabelSubCategory>
          <InputSubCategory
            {...register("subCategoryName", {
              onChange: (e) => {
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
              props.setNewSubPop(false);
            }}
          >
            Cancelar
          </BtnRemoveSubCategory>
          <SubmitSubCategory type="submit" disabled={disableBtn}>
            Criar
          </SubmitSubCategory>
        </DivBtnSubCategory>
        {loadingNewSubCategory ? (
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
    </DivNewSubCategory>
  );
}
