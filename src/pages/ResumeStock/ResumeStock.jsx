import React, { useEffect, useState } from "react";
import {
  BtnCancel,
  BtnSearch,
  DivFilter,
  DivFirstScreen,
  DivOrgBtn,
  DivOrgCompany,
  DivOrgDates,
  DivOrgFilter,
  DivOrgScreen,
  DivOrgTitle,
  DivResumeProfit,
  DivResumeStock,
  InfoFilter,
  SelectDay,
  TitleCompany,
} from "./ResumeStockStyle";
import StockOrders from "../../components/Resume/Stock/StockOrders/StockOrders";
import StockOut from "../../components/Resume/Stock/StockOut/StockOut";
import StockNow from "../../components/Resume/Stock/StockNow/StockNow";
import { useDispatch } from "react-redux";
import {
  infoStock,
  infoStockMoviments,
} from "../../store/infoCompany/stock/infoStock.actions";
import { Close, Search } from "@styled-icons/material";
import DetailAllStock from "../../components/Details/DetailAllStock/DetailAllStock";

export default function ResumeStock() {
  const dispatch = useDispatch();

  const [dateStartStock, setDateStartStock] = useState("");
  const [dateFinishStock, setDateFinishStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOldStock, setLoadingOldStock] = useState(false);

  const [dataInfoStock, setDataInfoStock] = useState([]);
  const [dataStockMoviments, setDataStockMoviments] = useState([]);

  const getInfoStock = async () => {
    setLoading(true);
    const dataStock = await dispatch(infoStock());

    setDataInfoStock(dataStock.payload);
    setLoading(false);
  };

  const getInfoStockMoviments = async (infoDateStart, infoDateFinish) => {
    if (infoDateStart.length > 0 || infoDateFinish.length > 0) {
      setLoadingOldStock(true);
      const organizeDate = {
        dateStart: infoDateStart,
        dateFinish: infoDateFinish,
      };

      const stockMovimentsData = await dispatch(
        infoStockMoviments(organizeDate)
      );

      setDataStockMoviments(stockMovimentsData.payload);

      setTimeout(() => {
        setLoadingOldStock(false);
      }, 300);
    }else {
      alert("Necessario colocar uma data para realizar a busca")
    }
  };

  useEffect(() => {
    getInfoStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DivOrgCompany>
      <DivOrgTitle>
        <TitleCompany>Resumo do Estoque</TitleCompany>
      </DivOrgTitle>
      <DivOrgScreen>
        <DivOrgDates>
          <DivFilter>
            <DivOrgFilter>
              <InfoFilter>Inicio</InfoFilter>
              <SelectDay
                type="date"
                value={dateStartStock}
                onChange={(e) => setDateStartStock(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgFilter>
              <InfoFilter>Fim</InfoFilter>
              <SelectDay
                type="date"
                value={dateFinishStock}
                onChange={(e) => setDateFinishStock(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgBtn>
              <BtnSearch
                type="button"
                onClick={() =>
                  getInfoStockMoviments(dateStartStock, dateFinishStock)
                }
              >
                <Search />
              </BtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setDateStartStock("");
                  setDateFinishStock("");
                  setDataStockMoviments([]);
                }}
              >
                <Close />
              </BtnCancel>
            </DivOrgBtn>
          </DivFilter>
        </DivOrgDates>
        <DivFirstScreen>
          <DivResumeStock>
            <StockNow dataInfoStock={dataInfoStock} loading={loading} />
            <StockOrders
              dataStockMoviments={dataStockMoviments.infoStockOrders}
              loading={loadingOldStock}
            />

            <StockOut
              dataStockMoviments={dataStockMoviments.infoStockOut}
              loading={loadingOldStock}
            />
          </DivResumeStock>
          <DivResumeProfit>
            <DetailAllStock
              resumeStockNow={dataInfoStock?.detailStockNow}
              resumeStockIn={
                dataStockMoviments?.infoStockOrders?.detailStockOrder
              }
              resumeStockOut={dataStockMoviments?.infoStockOut?.detailStockOut}
            />
          </DivResumeProfit>
        </DivFirstScreen>
      </DivOrgScreen>
    </DivOrgCompany>
  );
}
