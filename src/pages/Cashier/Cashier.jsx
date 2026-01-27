import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BtnCancel,
  BtnSearch,
  DivCashier,
  DivOrgTitle,
  DivSpentRow,
  DivSpentRowTwo,
  InputDate,
  TitleCashier,
} from "./CashierStyle";

import ResumeCashier from "../../components/Resume/ResumeCashier/ResumeCashier";
import ResumeCashierDay from "../../components/Resume/ResumeCashierDay/ResumeCashierDay";
import { Close, Search } from "@styled-icons/material";
import { getCashier } from "../../store/financial/cashier/cashier.actions";
import FormatDatesFront from "../../utils/formatDateFront.mjs";

export default function Cashier() {
  const dispatch = useDispatch();
  const date = new FormatDatesFront();

  const [infoCashier, setInfoCashier] = useState();
  const [disableFilter, setDisableFilter] = useState(false);
  const [infoOrders, setInfoOrders] = useState([]);
  const [infoChange, setInfoChange] = useState([]);
  const [infoPayment, setInfoPayment] = useState([]);
  const [infoExpense, setInfoExpense] = useState([]);
  const [filterDate, setFilterDate] = useState(date.getDateNow());

  const getCashiersToday = async (infoDate) => {
    const getCashiers = await dispatch(getCashier(infoDate));

    setInfoCashier(getCashiers.payload.infoCashier.cashierInfo);
    setInfoOrders(getCashiers.payload.infoOrders);
    setInfoChange(getCashiers.payload.infoChange);
    setInfoPayment(getCashiers.payload.infoPayment);
    setInfoExpense(getCashiers.payload.infoExpense);
  };

  useEffect(() => {
    getCashiersToday(filterDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (infoCashier?.errorStatus) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [infoCashier]);

  return (
    <DivCashier>
      <DivOrgTitle>
        <TitleCashier>Caixa do dia </TitleCashier>
        <InputDate
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <BtnSearch type="button" onClick={() => getCashiersToday(filterDate)}>
          <Search />
        </BtnSearch>
        <BtnCancel
          type="button"
          onClick={() => {
            setFilterDate(date.getDateNow());
            getCashiersToday(date.getDateNow());
          }}
        >
          <Close />
        </BtnCancel>
      </DivOrgTitle>
      <DivSpentRow>
        <ResumeCashier
          infoCashier={infoCashier}
          disableFilter={disableFilter}
          infoPayment={infoPayment?.resumeByPaymentByDay}
          infoExpense={infoExpense?.resumeExpenseDay}
          infoChange={infoChange?.resumeToday}
        />
        <DivSpentRowTwo>
          <TitleCashier>Caixa</TitleCashier>
          <ResumeCashierDay
            getCashiersToday={getCashiersToday}
            infoCashier={infoCashier}
            infoOrders={infoOrders?.resumeToday}
            infoChange={infoChange?.resumeToday}
            resumeOrders={infoOrders?.resumeOrders}
            infoPayment={infoPayment?.resumeByPaymentByDay}
            infoExpense={infoExpense?.resumeExpenseDay}
            resumeExpenses={infoExpense?.resumeExpenses}
          />
        </DivSpentRowTwo>
      </DivSpentRow>
    </DivCashier>
  );
}
