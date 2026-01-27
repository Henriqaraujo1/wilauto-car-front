import React, { useState } from "react";
import {
  BtnCancel,
  BtnSearch,
  DivFilter,
  DivFirstScreen,
  DivOrgBtn,
  DivOrgCompany,
  DivOrgDates,
  DivOrgScreen,
  DivOrgTitle,
  DivResumeExpense,
  DivResumeFin,
  InfoFilter,
  SelectDay,
  TitleCompany,
  DivOrgFilter,
} from "./ResumeExpenseStyle";
import ExpensePayeds from "../../components/Resume/Expense/ExpensePayeds/ExpensePayeds";
import ExpenseNoPay from "../../components/Resume/Expense/ExpenseNoPay/ExpenseNoPay";
import { useDispatch } from "react-redux";
import { infoExpensePayed } from "../../store/infoCompany/expense/expense.actions";
import { Close, Search } from "@styled-icons/material";
import DetailExpense from "../../components/Details/DetailExpense/DetailExpense";

export default function ResumeExpense() {
  const dispatch = useDispatch();

  const [dateStartExpense, setDateStartExpense] = useState("");
  const [dateFinishExpense, setDateFinishExpense] = useState("");

  const [loading, setLoading] = useState();

  const [dataExpense, setDataExpense] = useState([]);

  const getInfoExpense = async (infoDate) => {
    const organizeDate = {
      dateStart: infoDate[0],
      dateFinish: infoDate[1],
    };
    if (
      organizeDate.dateStart.length > 0 ||
      organizeDate.dateFinish.length > 0
    ) {
      setLoading(true);
      const expenseData = await dispatch(infoExpensePayed(organizeDate));

      setDataExpense(expenseData.payload);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      alert("Necessario colocar uma data para realizar a busca");
    }
  };

  return (
    <DivOrgCompany>
      <DivOrgTitle>
        <TitleCompany>Resumo de Despesas</TitleCompany>
      </DivOrgTitle>
      <DivOrgScreen>
        <DivOrgDates>
          <DivFilter>
            <DivOrgFilter>
              <InfoFilter>Inicio</InfoFilter>
              <SelectDay
                type="date"
                value={dateStartExpense}
                onChange={(e) => setDateStartExpense(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgFilter>
              <InfoFilter>Fim</InfoFilter>
              <SelectDay
                type="date"
                value={dateFinishExpense}
                onChange={(e) => setDateFinishExpense(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgBtn>
              <BtnSearch
                type="button"
                onClick={() =>
                  getInfoExpense([dateStartExpense, dateFinishExpense])
                }
              >
                <Search color="#000" />
              </BtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setDateStartExpense("");
                  setDateFinishExpense("");
                  setDataExpense([]);
                }}
              >
                <Close color="#000" />
              </BtnCancel>
            </DivOrgBtn>
          </DivFilter>
        </DivOrgDates>
        <DivFirstScreen>
          <DivResumeFin>
            <ExpensePayeds
              dataExpense={dataExpense.expensePayed}
              loading={loading}
            />
            <ExpenseNoPay
              dataExpense={dataExpense.expenseNoPayed}
              loading={loading}
            />
          </DivResumeFin>
          <DivResumeExpense>
            <DetailExpense
              resumeExpensePayed={dataExpense?.expensePayed?.expenseDetail}
              resumeExpenseNoPayed={
                dataExpense?.expenseNoPayed?.expenseNoPayedDetails
              }
            />
          </DivResumeExpense>
        </DivFirstScreen>
      </DivOrgScreen>
    </DivOrgCompany>
  );
}
