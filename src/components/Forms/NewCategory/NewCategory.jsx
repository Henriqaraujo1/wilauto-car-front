import { useEffect, useState } from "react";
import {
  DivNewCategory,
  FormCategory,
  DivOrgCategory,
  LabelCategory,
  InputCategory,
  SubmitCategory,
  TitleNewCategory,
  DivBtnCategory,
  BtnRemoveCategory,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./NewCategoryStatus";
import { useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useLazyGetInfoCategoryQuery,
} from "../../../store/registers/category/category.api";

import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewCategory() {
  // * - RTK CreateCategory
  const [
    createCategory,
    {
      isLoading: categoryLoading,
      isError: categoryIsError,
      error: categoryInfoError,
    },
  ] = useCreateCategoryMutation();

  // * - RTK GetCategory
  const [getNameCategory] = useLazyGetInfoCategoryQuery();

  const [categoryInfo, setCategoryInfo] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [categoryError, setCategoryError] = useState([]);
  const [nameCategorySearch] = useDebounce(nameCategory, 500);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingListCategorys, setLoadingListCategorys] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  // Cadastrar Category
  const newCategory = async (dataCategory) => {
    setLoading(true);
    dataCategory.categoryName = dataCategory.categoryName.toLowerCase();
    const categoryCreate = await createCategory(dataCategory);
    setCategoryInfo(categoryCreate.data || categoryCreate.error.data);
    setTimeout(setLoading(false), 150);
    setTimeout(setLoadingListCategorys(true), 1500);
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset();
      }, 1000);
      setTimeout(() => {
        setCategoryInfo([]);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

  return (
    <DivNewCategory>
      <TitleNewCategory>Nova Categoria de Despesa</TitleNewCategory>
      <FormCategory id="form-delivery" onSubmit={handleSubmit(newCategory)}>
        <DivOrgCategory>
          <LabelCategory>Nome da Categoria</LabelCategory>
          <InputCategory
            type="text"
            maxLength={30}
            {...register("categoryName", {
              onChange: (e) => {
                setNameCategory(e.target.value);
              },
            })}
          />
        </DivOrgCategory>
        {categoryError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Categoria já cadastrada</InfoResult>
          </DivOrgResults>
        )}
        <DivBtnCategory>
          <BtnRemoveCategory type="reset">Cancelar</BtnRemoveCategory>
          <SubmitCategory type="submit" disabled={disableBtn}>
            Cadastrar
          </SubmitCategory>
        </DivBtnCategory>
      </FormCategory>
      {loading ? (
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
    </DivNewCategory>
  );
}
