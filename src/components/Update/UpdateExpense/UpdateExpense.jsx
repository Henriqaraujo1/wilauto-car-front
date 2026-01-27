import React, { useEffect, useState } from "react";
import {
  DivUpdateExpense,
  FormExpense,
  DivOrgExpense,
  LabelExpense,
  InputExpense,
  TextExpense,
  SubmitFormExpenses,
  DivBtnClose,
  BtnClose,
  SelectStatus,
  OptionsStatus,
  DivOrgInputs,
  SelectCategory,
  DivOrgResults,
  DivOrgLoading,
  InfoResult,
  ValueExpense,
  InputExpenseSmall,
} from "./UpdateExpenseStyle";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updtExpense } from "../../../store/financial/expense/expense.actions";
import { getAllCategory } from "../../../store/registers/category/category.actions";
import { getAllSubCategoryById } from "../../../store/registers/subCategory/subCategory.actions";
import { ClipLoader } from "react-spinners";

export default function UpdateExpense(props) {
  const infoUpdate = props.dataExpenseUpdate;

  const dispatch = useDispatch();
  const FormatDates = new FormatDatesFront();
  const {
    register,
    handleSubmit,
  } = useForm();
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceExpense, setPriceExpense] = useState([]);

  const [infoExpense, setInfoExpense] = useState({
    datePayment: FormatDates.formatDateNoHour(infoUpdate.datePayment) || "",
    dateCreated: FormatDates.formatDateNoHour(infoUpdate.dateCreated) || "",
    description: infoUpdate.description || "",
    destination: infoUpdate.destination || "",
    dueDate: FormatDates.formatDateNoHour(infoUpdate.dueDate) || "",
    expenseType: infoUpdate.expenseType || "",
    formPayment: infoUpdate.formPayment || "",
    idCategory: infoUpdate.idCategory || "",
    idExpense: infoUpdate.idExpense || "",
    idSubCategory: infoUpdate.idSubCategory || "",
    status: infoUpdate.status || "",
    value: infoUpdate.value || "",
  });

  const getCategories = async () => {
    const categoriesInfo = await dispatch(getAllCategory());
    setListCategories(categoriesInfo.payload.allCategories);
  };

  const getSubCategories = async (idCategory) => {
    if (idCategory > 0) {
      const subCategoriesInfo = await dispatch(
        getAllSubCategoryById(idCategory)
      );
      setListSubCategories(subCategoriesInfo.payload.subCategories);
    }
  };

  const expenseUpdt = async () => {
    setLoading(true);
    if (priceExpense.length > 0) {
      infoExpense.value = priceExpense;
    }
    const dataUpdate = infoExpense;

    const upExpense = await dispatch(updtExpense(dataUpdate));
    setExpenseInfo(upExpense.payload);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setTimeout(() => {
      props.setLoadingExpense(true);
      props.setExpensePopUp(false);
    }, 3000);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSubCategories(infoExpense.idCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoExpense.idCategory]);

  // const checkDueDate = (dueDate) => {
  //   if (dueDate.length > 0) {
  //     setInfoExpense({
  //       ...infoExpense,
  //       dueDate: dueDate,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   checkDueDate(infoUpdate.dueDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [infoUpdate.dueDate]);

  return (
    <DivUpdateExpense show={props.expensePopUp}>
      <FormExpense onSubmit={handleSubmit(expenseUpdt)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => props.setExpensePopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgExpense>
          <LabelExpense>Nome da Despesa</LabelExpense>
          <InputExpense
            value={infoExpense.expenseType}
            {...register("expenseType", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  expenseType: e.target.value,
                });
              },
            })}
          />
        </DivOrgExpense>
        <DivOrgExpense>
          <DivOrgInputs>
            <LabelExpense>Categoria</LabelExpense>
            <SelectCategory
              value={infoExpense.idCategory || ""}
              {...register("idCategory", {
                onChange: (e) => {
                  setInfoExpense({
                    ...infoExpense,
                    idCategory: Number(e.target.value),
                  });
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
            <SelectCategory
              value={infoExpense.idSubCategory}
              {...register("idSubCategory", {
                onChange: (e) => {
                  setInfoExpense({
                    ...infoExpense,
                    idSubCategory: Number(e.target.value),
                  });
                },
              })}
            >
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
          <LabelExpense>Vencimento</LabelExpense>
          <InputExpenseSmall
            type="date"
            value={infoExpense.dueDate}
            {...register("dueDate", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  dueDate: e.target.value,
                });
              },
            })}
          />
          <LabelExpense>Despesa criada</LabelExpense>
          <InputExpenseSmall
            value={infoExpense.dateCreated}
            type="date"
            {...register("dateCreated", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  dateCreated: e.target.value,
                });
              },
            })}
          />
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Data de pagamento</LabelExpense>
          <InputExpenseSmall
            value={infoExpense.datePayment}
            type="date"
            {...register("datePayment", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  datePayment: e.target.value,
                });
              },
            })}
          />
          <LabelExpense>Forma de pagamento</LabelExpense>
          <SelectStatus
            value={infoExpense.formPayment}
            {...register("formPayment", {
              required: true,
            })}
          >
            {/* // Criar função para parcelas */}
            <OptionsStatus value="">Selecione</OptionsStatus>
            <OptionsStatus value="debito">Débito</OptionsStatus>
            {/* <OptionsStatus value="credito">Crédito</OptionsStatus> */}
            <OptionsStatus value="pix">PIX</OptionsStatus>
            <OptionsStatus value="avista">À vista</OptionsStatus>
          </SelectStatus>
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Valor</LabelExpense>
          <ValueExpense
            placeholder=""
            value={infoExpense.value}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
            onValueChange={(values, sourceInfo) => {
              setPriceExpense(values.value);
            }}
          />
          <LabelExpense>Status</LabelExpense>
          {/* <DivOptions> */}
          <SelectStatus
            value={infoExpense.status}
            {...register("status", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  status: e.target.value,
                });
              },
            })}
          >
            <OptionsStatus value="">Selecione</OptionsStatus>
            <OptionsStatus value="pago">Pago</OptionsStatus>
            <OptionsStatus value="em aberto">Em aberto</OptionsStatus>
          </SelectStatus>
          {/* </DivOptions> */}
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Destinatario</LabelExpense>
          <InputExpense
            value={infoExpense.destination}
            {...register("destination", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  destination: e.target.value,
                });
              },
            })}
          />
        </DivOrgExpense>
        <DivOrgExpense>
          <LabelExpense>Descrição</LabelExpense>
          <TextExpense
            value={infoExpense.description}
            maxLength={70}
            {...register("description", {
              onChange: (e) => {
                setInfoExpense({
                  ...infoExpense,
                  description: e.target.value,
                });
              },
            })}
          ></TextExpense>
        </DivOrgExpense>
        <SubmitFormExpenses type="submit">Atualizar</SubmitFormExpenses>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (expenseInfo?.codeStatus === 404 && (
            <DivOrgResults>
              <InfoResult>{expenseInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (expenseInfo?.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>{expenseInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormExpense>
    </DivUpdateExpense>
  );
}
