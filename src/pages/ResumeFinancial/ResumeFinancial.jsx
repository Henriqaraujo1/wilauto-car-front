import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DivResumeFin,
  TitleResumeFin,
  SelectMonth,
  OptionMonth,
  DivOrgSelect,
  DivOrgTitle,
} from "./ResumeFinancialStyle.js";
// Icons
import { PopupClient } from "../../components/Cards/Cards.jsx";
// Components
import ClientResume from "../../components/Resume/ClientResume/ClientResume.jsx";
// API
import {
  resumeFinancial,
  resumeMonthFinancial,
} from "../../store/financial/resumeFinancial/resumeFinancial.actions.js";
// Utils
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";

export default function ResumeFinancial() {
  const dispatch = useDispatch();
  const formatDates = new FormatDatesFront();
  const [financialResume, setFinancialResume] = useState([]);
  const [disableFilter, setDisableFilter] = useState(false);
  const [ordersClients, setOrdersClients] = useState([]);
  const [infoMonth, setInfoMonth] = useState([]);
  const [textMonth, setTextMonth] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());

  const getResumeFinancial = async () => {
    const getFinancial = await dispatch(resumeFinancial());
    setOrdersClients(getFinancial?.payload);
    setFinancialResume(getFinancial?.payload);
  };

  const getMonthFinancial = async (infoDate) => {
    const getMonthResume = await dispatch(resumeMonthFinancial(infoDate));
    setInfoMonth(getMonthResume.payload);
  };

  const sendFilterMonth = () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;
      getMonthFinancial(formatDate);
    }
  };

  useEffect(() => {
    getResumeFinancial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendFilterMonth();
  }, [filterDateMonth, filterDateYear]);

  useEffect(() => {
    if (ordersClients?.length === 0) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [ordersClients]);

  useEffect(() => {
    for (const month of monthsInfo) {
      if (filterDateMonth === month.value) setTextMonth(month.nameMonth);
    }
  }, [filterDateMonth]);

  return (
    <DivResumeFin>
      <DivOrgTitle>
        <TitleResumeFin>Resumo de Vendas</TitleResumeFin>
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

      <PopupClient
        financialResume={financialResume}
        infoMonth={infoMonth?.totalByOrders}
        dateMonth={textMonth}
      />
      <TitleResumeFin>Clientes</TitleResumeFin>
      <ClientResume
        ordersClients={ordersClients?.orders}
        disableFilter={disableFilter}
        setLoadingPayments={setLoadingPayments}
      />
    </DivResumeFin>
  );
}
