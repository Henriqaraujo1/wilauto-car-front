import React, { useEffect, useState } from "react";
import {
  resumeEntryOrders,
  resumeMonthEntryOrders,
} from "../../store/financial/resumeEntryOrders/resumeEntryOrders.actions.js";

import {
  DivFinancial,
  TitleFinEntryOrders,
  SelectMonth,
  OptionMonth,
  DivOrgSelect,
  DivOrgTitle,
} from "./FinancialEntryOrdersStyle.js";

import { useDispatch } from "react-redux";
import { PopUpProvider } from "../../components/Cards/Cards.jsx";
import ProviderResume from "../../components/Resume/ProviderResume/ProviderResume.jsx";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";

export default function FinancialEntryOrders() {
  const [infoEntryOrders, setInfoEntryOrders] = useState([]);
  const formatDates = new FormatDatesFront();
  const [financialResumeOrders, setFinancialResumeOrders] = useState([]);
  const [disableFilter, setDisableFilter] = useState(false);
  const [infoMonth, setInfoMonth] = useState([]);
  const [textMonth, setTextMonth] = useState([]);
  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());
  const dispatch = useDispatch();

  const getResumeProvider = async () => {
    const getEntryOrders = await dispatch(resumeEntryOrders());

    console.log(getEntryOrders.payload)
    setInfoEntryOrders(getEntryOrders.payload);
    setFinancialResumeOrders(getEntryOrders.payload);
  };

  const getMonthFinancial = async (infoDate) => {
    const getMonthResume = await dispatch(resumeMonthEntryOrders(infoDate));

    console.log(getMonthResume.payload)
    setInfoMonth(getMonthResume.payload);
  };

  const sendFilterMonth = () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;
      getMonthFinancial(formatDate);
    }
  };

  useEffect(() => {
    getResumeProvider();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendFilterMonth();
  }, [filterDateMonth, filterDateYear]);

  useEffect(() => {
    if (infoEntryOrders?.entryOrders?.length === 0) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [infoEntryOrders]);

  useEffect(() => {
    for (const month of monthsInfo) {
      if (filterDateMonth === month.value) setTextMonth(month.nameMonth);
    }
  }, [filterDateMonth]);

  return (
    <DivFinancial>
      <DivOrgTitle>
        <TitleFinEntryOrders>Compras com Fornecedores</TitleFinEntryOrders>
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
      </DivOrgTitle>
      <PopUpProvider
        financialResumeOrders={financialResumeOrders}
        infoMonth={infoMonth}
        dateMonth={textMonth}
      />
      <TitleFinEntryOrders>Fornecedores</TitleFinEntryOrders>
      <ProviderResume
        infoEntryOrders={infoEntryOrders?.entryOrders}
        disableFilter={disableFilter}
      />
    </DivFinancial>
  );
}
