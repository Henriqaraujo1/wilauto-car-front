import React, { useEffect, useState } from "react";
import {
  DivNewExpense,
  FormExpense,
  DivOrgExpense,
  LabelExpense,
  InputBig,
  TextExpense,
  SubmitFormExpenses,
  InputSmall,
  DivOrgPayment,
  SelectStatus,
  OptionsStatus,
  TitleExpense,
  DivOrgInputs,
  SelectCategory,
  DivOrgResults,
  InfoResults,
  DivOrgLoading,
  DivOrgTitle,
  InputMedium,
  DivAlerts,
  TitleAlert,
  Alerts,
  DivOrgSubmit,
} from "./NewExpensesStyle";
import { useForm } from "react-hook-form";
import { createExpense } from "../../../store/financial/expense/expense.actions";
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
import { getAllCategory } from "../../../store/registers/category/category.actions";
import { getAllSubCategoryById } from "../../../store/registers/subCategory/subCategory.actions";
import { ClipLoader } from "react-spinners";

export default function NewExpenses(props) {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm();
  // const [datePayment, setDatePayment] = useState("");
  const [valuePayment, setValuePayment] = useState("");
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [optionPayment, setOptionPayment] = useState("");
  const [optionDueDate, setOptionDueDate] = useState("");
  const [loadingNewExpense, setLoadingNewExpense] = useState();

  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);

  const newExpense = async (dataExpense) => {
    setLoadingNewExpense(true);
    dataExpense.value = valuePayment;

    const expenseCreate = await dispatch(createExpense(dataExpense));

    setExpenseInfo(expenseCreate.payload);
    setTimeout(() => {
      setLoadingNewExpense(false);
      props.setLoadingExpense(true);
    }, 1500);
  };

  const getCategories = async () => {
    const categoriesInfo = await dispatch(getAllCategory());
    setListCategories(categoriesInfo.payload.allCategories || []);
  };

  const getSubCategories = async (idCategory) => {
    if (idCategory > 0) {
      const subCategoriesInfo = await dispatch(
        getAllSubCategoryById(idCategory)
      );
      setListSubCategories(subCategoriesInfo.payload.subCategories);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setExpenseInfo([]);
        setListSubCategories([]);
        setValuePayment("");
        setOptionDueDate("nao");
        setOptionPayment("nao");
      }, 4000);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <DivNewExpense>
      <DivOrgTitle>
        <TitleExpense>Nova Despesa</TitleExpense>
      </DivOrgTitle>
      <FormExpense onSubmit={handleSubmit(newExpense)}>
        <DivOrgExpense>
          <LabelExpense>Tipo da Despesa</LabelExpense>
          <InputBig type="string" {...register("expenseType")} />
        </DivOrgExpense>
        <DivOrgExpense>
          {/* <LabelExpense>Data da despesa</LabelExpense>
          <InputSmall type="date" {...register("dateExpense")} /> */}
          <LabelExpense>Valor</LabelExpense>
          <NumericFormat
            placeholder="R$"
            value={valuePayment}
            customInput={InputSmall}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$"}
            onValueChange={(values, sourceInfo) => {
              setValuePayment(Number(values.value));
            }}
          />
          <LabelExpense>Forma de pagamento</LabelExpense>
          <SelectStatus
            {...register("formPayment", {
              required: true,
            })}
          >
            {/* // Criar função para parcelas */}
            <OptionsStatus value="">Selecione</OptionsStatus>
            <OptionsStatus value="debito">Débito</OptionsStatus>
            {/* <OptionsStatus value="credito">Crédito</OptionsStatus> */}
            <OptionsStatus value="pix">PIX</OptionsStatus>
            <OptionsStatus value="dinheiro">Dinheiro</OptionsStatus>
          </SelectStatus>
        </DivOrgExpense>
        <DivOrgExpense>
          <DivOrgInputs>
            <LabelExpense>Categoria</LabelExpense>
            <SelectCategory
              {...register("idCategory", {
                onChange: (e) => {
                  getSubCategories(e.target.value);
                },
              })}
            >
              <OptionsStatus value={""}>Selecione</OptionsStatus>
              {listCategories.map((infoCategories, index) => {
                return (
                  <OptionsStatus key={index} value={infoCategories.idCategory}>
                    {infoCategories.categoryName}
                  </OptionsStatus>
                );
              })}
            </SelectCategory>
          </DivOrgInputs>
          <DivOrgInputs>
            <LabelExpense>Sub-Categoria</LabelExpense>
            <SelectCategory {...register("idSubCategory")}>
              <OptionsStatus value={""}>Selecione</OptionsStatus>
              {listSubCategories.map((subCategoriesInfo, index) => {
                return (
                  <OptionsStatus
                    key={index}
                    value={subCategoriesInfo.idSubCategory}
                  >
                    {subCategoriesInfo.subCategoryName}
                  </OptionsStatus>
                );
              })}
            </SelectCategory>
          </DivOrgInputs>
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Tem vencimento?</LabelExpense>
          <SelectStatus
            {...register("optionDueDate", {
              onChange: (e) => {
                setOptionDueDate(e.target.value);
              },
            })}
          >
            <OptionsStatus value="">Selecione</OptionsStatus>
            <OptionsStatus value="sim">Sim</OptionsStatus>
            <OptionsStatus value="nao">Não</OptionsStatus>
          </SelectStatus>
          {optionDueDate === "sim" && (
            <>
              <LabelExpense>Vencimento</LabelExpense>
              <InputSmall type="date" {...register("dueDate")} />
            </>
          )}
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Status</LabelExpense>
          <SelectStatus
            {...register("status", {
              required: true,
              onChange: (e) => {
                setOptionPayment(e.target.value);
              },
            })}
          >
            <OptionsStatus value="pendente">Não Pago</OptionsStatus>
            <OptionsStatus value="pago">Pago</OptionsStatus>
          </SelectStatus>
          {optionPayment === "pago" && (
            <DivOrgPayment>
              <LabelExpense>Data de pagamento</LabelExpense>
              <InputMedium type="date" {...register("datePayment")} />
            </DivOrgPayment>
          )}
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Destinatario</LabelExpense>
          <InputBig {...register("destination")} />
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Descrição</LabelExpense>
          <TextExpense
            maxLength={70}
            {...register("description")}
          ></TextExpense>
        </DivOrgExpense>
        <DivOrgSubmit>

        <SubmitFormExpenses type="submit">Adicionar</SubmitFormExpenses>
        </DivOrgSubmit>
        {loadingNewExpense ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (expenseInfo.codeStatus === 400 && (
            <DivOrgResults>
              <InfoResults>{expenseInfo.message}</InfoResults>
            </DivOrgResults>
          )) ||
          (expenseInfo.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResults>{expenseInfo.message}</InfoResults>
            </DivOrgResults>
          ))
        )}
      </FormExpense>
    </DivNewExpense>
  );
}
