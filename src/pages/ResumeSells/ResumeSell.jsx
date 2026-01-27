import React, { useEffect, useState } from "react";
import {
  DivOrgSell,
  DivOrgTitle,
  TitleSell,
  SelectMonth,
  OptionMonth,
  DivOrgSelect,
} from "./ResumeSellStyle";

// Utils
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import { Close, Search } from "@styled-icons/material";
import { useDispatch } from "react-redux";
import DetailSell from "../../components/Details/DetailSell/DetailSell.jsx";
import { resumeOrders } from "../../store/financial/resumeFinancial/resumeFinancial.actions.js";

export default function ResumeSells() {
  const dispatch = useDispatch();
  const formatDates = new FormatDatesFront();
  const [infoOrders, setInfoOrders] = useState([]);
  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());
  const [infoFilter, setInfoFilter] = useState(
    `${filterDateMonth}/${filterDateYear}`
  );

  const getMonthFinancial = async (infoDate) => {
    const getMonthResume = await dispatch(resumeOrders(infoDate));
    setInfoOrders(getMonthResume.payload);
  };

  const sendFilterMonth = () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;
      getMonthFinancial(formatDate);
    }
  };

  useEffect(() => {
    sendFilterMonth();
  }, []);

  useEffect(() => {
    sendFilterMonth();
  }, [filterDateMonth, filterDateYear]);

  useEffect(() => {
    const newFilter = `${filterDateMonth}/${filterDateYear}`;

    setInfoFilter(newFilter);
  }, [filterDateMonth, filterDateYear]);

  return (
    <DivOrgSell>
      <DivOrgTitle>
        <TitleSell>Vendas do mês</TitleSell>

        <DivOrgSelect>
          <SelectMonth
            value={filterDateMonth}
            onChange={(e) => {
              setFilterDateMonth(e.target.value);
            }}
          >
            {/* <OptionMonth value={formatDates.getMonth()}></OptionMonth> */}
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
      <DetailSell
        resumeOrders={infoOrders?.ordersByMonth}
        infoFilter={infoFilter}
      />
    </DivOrgSell>
  );
}
