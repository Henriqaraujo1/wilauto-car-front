import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatusFin from "../../components/Status/StatusFin/StatusFin.jsx";
import StatusSell from "../../components/Status/StatusSell/StatusSell.jsx";
import StatusReport from "../../components/Status/StatusReport/StatusReport.jsx";
import StatusStock from "../../components/Status/StatusStock/StatusStock.jsx";
import StatusProfit from "../../components/Status/StatusProfit/StatusProfit.jsx";
import StatusExpense from "../../components/Status/StatusExpenses/StatusExpenses.jsx";
import PopUpWelcome from "../../components/Animations/PopUpBemvindo/PopUpWelcome.jsx";
import { homeInfo, getMonthFinancial } from "../../store/home/home.actions.js";
import {
  DivHome,
  TitleHome,
  DivSeparate,
  DivOrgHome,
  DivOrgStatus,
  DivOrgTitle,
  DivOrgSelect,
  SelectMonth,
  DivOrgBtnFilter,
  BtnSearch,
  BtnCancel,
  OptionMonth,
} from "./HomeStyle.js";
import { Close, Search } from "@styled-icons/material";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import { useUpUserMutation } from "../../store/registers/users/users.api.js";

export default function Home() {
  const dispatch = useDispatch();
  const infoWelcome = useSelector((state) => state.persisted.auth);
  const formatDates = new FormatDatesFront();
  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());

  const [dataInfoHome, setDataInfoHome] = useState([]);
  const [infoByMonth, setInfoByMonth] = useState([]);
  const [expenseByMonth, setExpenseByMonth] = useState([]);
  const [profitByMonth, setProfitByMonth] = useState([]);

  const [resetFilter, setResetFilter] = useState(false);
  const [infoPopupWelcome, setInfoPopupWelcome] = useState(
    infoWelcome?.welcomeMsg
  );
  const [loading, setLoading] = useState(false);

  const [updtUser] = useUpUserMutation();

  const getInfoHome = async (infoDate) => {
    const resumeHome = await dispatch(homeInfo(infoDate));

    setDataInfoHome(resumeHome.payload);
  };

  const getInfoFinancial = async (infoDate) => {
    const resumeFinancial = await dispatch(getMonthFinancial(infoDate));

    setInfoByMonth(resumeFinancial.payload.financialMonth);
    setExpenseByMonth(resumeFinancial.payload.financialMonth);
    setProfitByMonth(resumeFinancial.payload.profitMonth);
  };

  const sendFilterMonth = () => {
    setLoading(true);
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;

      getInfoHome(formatDate);
      getInfoFinancial(formatDate);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const upWelcomeView = async () => {
    const idUser = infoWelcome.idUser;
    const dataUser = {
      welcomeView: infoPopupWelcome,
    };
    await updtUser({
      idUser: idUser,
      dataUser: dataUser,
    });
  };

  useEffect(() => {
    sendFilterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetFilter) {
      sendFilterMonth();
    }
    setResetFilter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter]);

  useEffect(() => {
    if (infoPopupWelcome) {
      upWelcomeView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoPopupWelcome]);

  return (
    <DivHome>
      <PopUpWelcome
        infoPopupWelcome={infoPopupWelcome}
        setInfoPopupWelcome={setInfoPopupWelcome}
      />
      <TitleHome>Resumo</TitleHome>
      <DivOrgTitle>
        <DivOrgSelect>
          <SelectMonth
            type="select"
            value={filterDateMonth}
            data-cy="month"
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
            data-cy="year"
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
            <Search color="#000" />
          </BtnSearch>
          <BtnCancel
            type="button"
            onClick={() => {
              setResetFilter(true);
              setFilterDateMonth(formatDates.getMonth());
              setFilterDateYear(formatDates.getYear());
            }}
          >
            <Close color="#000" />
          </BtnCancel>
        </DivOrgBtnFilter>
      </DivOrgTitle>
      <DivSeparate>
        <DivOrgHome>
          <DivOrgStatus>
            <StatusProfit profitMonth={profitByMonth} loading={loading} />
          </DivOrgStatus>

          <DivOrgStatus>
            <StatusSell dataInfoHome={dataInfoHome?.financialDay} />
          </DivOrgStatus>
        </DivOrgHome>
        <DivOrgHome>
          <StatusFin
            infoByMonth={infoByMonth?.financialMonth}
            financialDay={dataInfoHome?.financialDay}
            totalInAccount={dataInfoHome?.totalInAccount}
            loading={loading}
          />
          <DivOrgStatus>
            {/* <StatusReport dataInfoHome={dataInfoHome} />
            <StatusStock dataInfoHome={dataInfoHome} /> */}
            <StatusExpense
              expenseByMonth={expenseByMonth?.expensesInfo}
              dataInfoHome={dataInfoHome}
              loading={loading}
            />
          </DivOrgStatus>
        </DivOrgHome>
      </DivSeparate>
    </DivHome>
  );
}
