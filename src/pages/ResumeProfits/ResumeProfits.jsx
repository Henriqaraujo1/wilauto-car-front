import React, { useState } from "react";
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
  InfoFilter,
  SelectDay,
  TitleCompany,
} from "./ResumeProfitsStyle";
import ProfitInfo from "../../components/Resume/Profits/ProfitInfo/ProfitInfo";
import { infoProfit } from "../../store/infoCompany/profit/profit.actions";
import { useDispatch } from "react-redux";
import { Close, Search } from "@styled-icons/material";
import DetailProfit from "../../components/Details/DetailProfit/DetailProfit";

export default function ResumeProfits() {
  const dispatch = useDispatch();

  const [dateStartStock, setDateStartStock] = useState("");
  const [dateFinishStock, setDateFinishStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoOrders, setInfoOrders] = useState([]);

  const [dataInfoProfit, setDataInfoProfit] = useState([]);

  const getInfoProfit = async (infoDateStart, infoDateFinish) => {
    if (infoDateStart.length > 0 || infoDateFinish.length > 0) {
      setLoading(true);
      const organizeDate = {
        dateStart: infoDateStart,
        dateFinish: infoDateFinish,
      };
      const profitData = await dispatch(infoProfit(organizeDate));

      setDataInfoProfit(profitData.payload);
      setInfoOrders(profitData.payload.infoProfit);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      alert("Necessário colocar uma data para realizar a busca");
    }
  };

  return (
    <DivOrgCompany>
      <DivOrgTitle>
        <TitleCompany>Lucro da Empresa</TitleCompany>
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
                onClick={() => getInfoProfit(dateStartStock, dateFinishStock)}
              >
                <Search color="#000" />
              </BtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setDateStartStock("");
                  setDateFinishStock("");
                  setDataInfoProfit([]);
                }}
              >
                <Close color="#000" />
              </BtnCancel>
            </DivOrgBtn>
          </DivFilter>
        </DivOrgDates>
        <DivFirstScreen>
          <ProfitInfo
            dataInfoProfit={dataInfoProfit?.infoProfit}
            loading={loading}
          />
          <DetailProfit
            resumeOrders={infoOrders?.allOrders}
            resumeExpense={infoOrders?.allExpense}
            resumeStockIn={infoOrders?.allStockIn}
          />
        </DivFirstScreen>
      </DivOrgScreen>
    </DivOrgCompany>
  );
}
