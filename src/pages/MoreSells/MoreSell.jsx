import { useEffect, useState } from "react";
import {
  DivResumeFin,
  TitleResumeFin,
  SelectMonth,
  OptionMonth,
  DivOrgBtnFilter,
  BtnSearch,
  BtnCancel,
  DivOrgSelect,
  DivOrgTitle,
  DivOrgSmall,
  InfoSmall,
} from "./MoreSell.style.js";
// Icons
import { PopupClient } from "../../components/Cards/Cards.jsx";
// Components
import ClientResume from "../../components/Resume/ClientResume/ClientResume.jsx";
// API
// import {
//   resumeMoreSell,
//   resumeMonthMoreSell,
// } from "../../store/financial/resumeMoreSell/resumeMoreSell.actions.js";
// Utils
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import ProductMoreSell from "../../components/Resume/ProductMoreSell/ProductMoreSell.jsx";
import { useGetAllProductMoreSellsMutation } from "../../store/financial/resumeMoreSells/resumeMoreSells.api.js";

export default function MoreSell() {
  const formatDates = new FormatDatesFront();
  const [disableFilter, setDisableFilter] = useState(false);
  const [infoProducts, setInfoProducts] = useState(null);
  const [infoError, setInfoError] = useState(null);

  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());

  const [
    getFilter,
  ] = useGetAllProductMoreSellsMutation();

  const getMoreSells = async (infoDate) => {
    const getMonthResume = await getFilter(infoDate);

    if (getMonthResume.data.codeStatus === 200) {
      setInfoProducts(getMonthResume.data);
      setInfoError(null);
    } else if (getMonthResume.error) {
      setInfoError(getMonthResume.error.data);
    }
  };

  const sendFilterMonth = () => {
    if (
      String(filterDateMonth).trim() !== "" &&
      String(filterDateYear).trim() !== ""
    ) {
      const dateFilter = { infoMonth: `${filterDateMonth}/${filterDateYear}` };
      getMoreSells(dateFilter);
    }
  };

  useEffect(() => {
    sendFilterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDateMonth, filterDateYear]);


  useEffect(() => {
    if (infoProducts?.length === 0) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [infoProducts]);

  return (
    <DivResumeFin>
      <DivOrgTitle>
        <TitleResumeFin>Produtos Mais Vendidos</TitleResumeFin>
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
      {infoError && (
        <DivOrgSmall>
          <InfoSmall>{infoError.message}</InfoSmall>
        </DivOrgSmall>
      )}
      <ProductMoreSell
        infoProducts={infoProducts?.productMoreSell}
        disableFilter={disableFilter}
      />
    </DivResumeFin>
  );
}
