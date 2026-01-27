import React, { useEffect, useState } from "react";
import ItemStockOut from "../../components/Forms/ItemStockOut/ItemStockOut.jsx";
import SearchStockOut from "../../components/Search/SearchStockOut/SearchStockOut.jsx";
import {
  DivStockOut,
  DivScreenStockOut,
  TitleStock,
  SelectMonth,
  OptionMonth,
  DivOrgBtnFilter,
  BtnSearch,
  BtnCancel,
  DivOrgSelect,
  DivOrgTitle,
} from "./StockOutStyle.js";

import { useDispatch } from "react-redux";
import { productsOutByMonth } from "../../store/stock/ItemOutStock/itemOut.actions.js";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import { monthsInfo, yearsInfo } from "../../utils/infoMonths.js";
import { Close, Search } from "@styled-icons/material";
import { allStock } from "../../store/stock/stockNow/stockNow.actions.js";

export default function StockOut() {
  const dispatch = useDispatch();

  const formatDates = new FormatDatesFront();

  const [disableFilter, setDisableFilter] = useState(false);
  const [productOutInfo, setProductOutInfo] = useState([]);
  const [productsStock, setProductsStock] = useState([]);
  const [resetFilter, setResetFilter] = useState([]);
  const [loadingItens, setLoadingItens] = useState(false);
  const [filterDateMonth, setFilterDateMonth] = useState(
    formatDates.getMonth()
  );
  const [filterDateYear, setFilterDateYear] = useState(formatDates.getYear());

  const getProductStock = async () => {
    const productStock = await dispatch(allStock());

    setProductsStock(productStock.payload);
  };

  const sendFilterMonth = async () => {
    if (filterDateMonth >= 0 && filterDateYear >= 0) {
      const formatDate = `${filterDateMonth}/${filterDateYear}`;

      const listProduct = await dispatch(productsOutByMonth(formatDate));
      setProductOutInfo(listProduct.payload);
    }
  };

  useEffect(() => {
    if (resetFilter === true || loadingItens === true) {
      sendFilterMonth();
    }
    setResetFilter(false);
    setLoadingItens(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFilter, loadingItens]);

  useEffect(() => {
    sendFilterMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productOutInfo.errorStatus) {
      alert(productOutInfo.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [productOutInfo]);

  useEffect(() => {
    getProductStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DivStockOut>
      <DivOrgTitle>
        <TitleStock>Retirada de Item do Estoque em</TitleStock>
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
              setFilterDateMonth(formatDates.getMonth());
              setFilterDateYear(formatDates.getYear());
              setResetFilter(true);
            }}
          >
            <Close />
          </BtnCancel>
        </DivOrgBtnFilter>
      </DivOrgTitle>
      <DivScreenStockOut>
        <ItemStockOut
          setLoadingItens={setLoadingItens}
          productsStock={productsStock.productStock}
        />
        <SearchStockOut
          productOut={productOutInfo.productOut}
          setLoadingItens={setLoadingItens}
          disableFilter={disableFilter}
        />
      </DivScreenStockOut>
    </DivStockOut>
  );
}
