import React, { useEffect, useState } from "react";
import NewExpense from "../../components/Forms/NewExpense/NewExpense.jsx";
import SearchExpense from "../../components/Search/SearchExpense/SearchExpense.jsx";
import {
  DivExpense,
  TitleExpense,
  DivScreenExpense,
  SelectMonth,
  OptionMonth,
  DivOrgBtnFilter,
  BtnSearch,
  BtnCancel,
  DivOrgSelect,
  DivOrgTitle,
} from "./ExpenseRegisterStyle.js";

import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import { Close, Search } from "@styled-icons/material";
import { getExpenseByMonth } from "../../store/financial/expense/expense.actions.js";
import { useDispatch } from "react-redux";

export default function Expense() {
  const dispatch = useDispatch();
  const formatDates = new FormatDatesFront();
  const date = new FormatDatesFront();

  const [infoMonth, setInfoMonth] = useState([]);
  const [loadingExpense, setLoadingExpense] = useState(false);
  const [disableFilter, setDisableFilter] = useState(false);

  const [resetFilter, setResetFilter] = useState(false);
  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());


  const sendFilterMonth = async () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;
      const getMonthResume = await dispatch(getExpenseByMonth(formatDate));
      setInfoMonth(getMonthResume.payload);
    }
  };


  useEffect(() => {
    if (resetFilter === true || loadingExpense === true) {
      sendFilterMonth();
    }
    setResetFilter(false);
    setLoadingExpense(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter, loadingExpense]);

  useEffect(() => {
    sendFilterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (infoMonth.errorStatus) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [infoMonth]);


  return (
    <DivExpense>
      <DivOrgTitle>
        <TitleExpense>Despesas de </TitleExpense>
        <DivOrgSelect>
          <SelectMonth
            value={filterDateMonth}
            onChange={(e) => {
              setFilterDateMonth(e.target.value);
            }}
          >
            {monthsInfo.map((infoMonth, index) => {
              return (
                <OptionMonth key={index} value={infoMonth.value}>
                  {infoMonth.nameMonth}
                </OptionMonth>
              );
            })}
          </SelectMonth>
          <SelectMonth
            value={filterDateYear}
            onChange={(e) => setFilterDateYear(e.target.value)}
          >
            {yearsInfo.map((infoYear, index) => {
              return (
                <OptionMonth key={index} value={infoYear.value}>
                  {infoYear.value}
                </OptionMonth>
              );
            })}
          </SelectMonth>
        </DivOrgSelect>
        <DivOrgBtnFilter>
          <BtnSearch type="button" onClick={sendFilterMonth}>
            <Search />
          </BtnSearch>
          <BtnCancel
            type="button"
            onClick={() => {
              setResetFilter(true);
              setFilterDateMonth(formatDates.getMonth());
              setFilterDateYear(formatDates.getYear());
            }}
          >
            <Close />
          </BtnCancel>
        </DivOrgBtnFilter>
      </DivOrgTitle>
      <DivScreenExpense>
        <NewExpense
          setLoadingExpense={setLoadingExpense}
        />
        <SearchExpense
          setLoadingExpense={setLoadingExpense}
          infoMonth={infoMonth?.expenseByMonth}
          disableFilter={disableFilter}
        />
      </DivScreenExpense>
    </DivExpense>
  );
}
