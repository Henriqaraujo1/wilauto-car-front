import React, { useEffect, useState } from "react";
import {
  DivComission,
  TitleComission,
  SelectMonth,
  OptionMonth,
  DivOrgBtnFilter,
  BtnSearch,
  BtnCancel,
  DivOrgSelect,
  DivOrgTitle,
} from "./ComissionsStyle";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { Close, Search } from "@styled-icons/material";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import { PopUpComission } from "../../components/Cards/Cards.jsx";
import ComissionResume from "../../components/Resume/ComissionResume/ComissionResume.jsx";
import { useDispatch } from "react-redux";
import { getComissionMonth } from "../../store/financial/comission/comission.actions.js";

export default function Comissions() {
  const dispatch = useDispatch();
  const formatDates = new FormatDatesFront();
  const [resetFilter, setResetFilter] = useState(false);
  const [infoComission, setInfoComission] = useState([]);
  const [periodDate, setPeriodDate] = useState();

  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());

  const getInfoComission = async (infoMonth) => {
    const resumeComission = await dispatch(getComissionMonth(infoMonth));

    setInfoComission(resumeComission.payload);
  };

  const sendFilterMonth = () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;
      setPeriodDate(formatDate);
      getInfoComission(formatDate);
    }
  };

  useEffect(() => {
    sendFilterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetFilter === true) {
      sendFilterMonth();
    }
    setResetFilter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter]);

  return (
    <DivComission>
      <DivOrgTitle>
        <TitleComission>Comissões</TitleComission>
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

      <PopUpComission infoComission={infoComission?.resumeComission} />

      <TitleComission>Funcionarios</TitleComission>
      <ComissionResume
        infoComissions={infoComission?.comissions}
        periodDate={periodDate}
        setResetFilter={setResetFilter}
      />
    </DivComission>
  );
}
