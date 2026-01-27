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
} from "./DeleteExpenseStyle";
import { Close } from "@styled-icons/material";
import { downExpense } from "../../../store/financial/expense/expense.actions";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function DeleteExpense(props) {
  const expenseRemove = props.selectedExpense;

  const dispatch = useDispatch();
  const [deleteExpenseInfo, setDeleteExpenseInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteExpense = async (dataExpense) => {
    setLoading(true);
    const idExpense = dataExpense;
    const deleteExpense = await dispatch(downExpense(idExpense));

    setDeleteExpenseInfo(deleteExpense.payload);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setTimeout(() => {
      props.setLoadingExpense(true);
      props.setDelExpenseOption(false);
    }, 4000);
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => props.setDelExpenseOption(false)}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>
      <DivOrgCardDelete showDiv={props.delExpenseOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar a despesa - {expenseRemove.expenseType} ?
          </LabelDelete>
        </DivOrgLabel>
        <DivOrgBtn>
          <BtnConfirm onClick={() => deleteExpense(expenseRemove.idExpense)}>
            Sim
          </BtnConfirm>
          <BtnCancel onClick={() => props.setDelExpenseOption(false)}>
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (deleteExpenseInfo.errorStatus && (
          <DivOrgResults>
            <InfoResult>{deleteExpenseInfo.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (deleteExpenseInfo.successStatus && (
          <DivOrgResults>
            <InfoResult>{deleteExpenseInfo.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivOrgDelete>
  );
}
