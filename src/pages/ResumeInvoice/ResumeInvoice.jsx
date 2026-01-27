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
  DivResumeFin,
  DivResumeProfit,
  InfoFilter,
  SelectDay,
  TitleCompany,
} from "./ResumeInvoiceStyle.js";
import InvoiceSells from "../../components/Resume/Invoice/InvoiceSells/InvoiceSells.jsx";
import InvoiceMoney from "../../components/Resume/Invoice/InvoiceMoney/InvoiceMoney.jsx";
import { infoInvoice } from "../../store/infoCompany/invoice/invoice.actions.js";
import { useDispatch } from "react-redux";
import { Close, Search } from "@styled-icons/material";
import DetailInvoice from "../../components/Details/DetailInvoice/DetailInvoice.jsx";

export default function ResumeInvoice() {
  const dispatch = useDispatch();

  const [dateStartSells, setDateStartSells] = useState("");
  const [dateFinishSells, setDateFinishSells] = useState("");
  const [loading, setLoading] = useState();
  const [dataInvoiceSells, setDataInvoiceSells] = useState([]);
  const [dataInvoiceMoviments, setdataInvoiceMoviments] = useState([]);

  const getInfoInvoice = async (infoDate) => {
    const organizeDate = {
      dateStart: infoDate[0],
      dateFinish: infoDate[1],
    };
    
    if (
      organizeDate.dateStart.length > 0 ||
      organizeDate.dateFinish.length > 0
    ) {
      setLoading(true);
      const invoiceData = await dispatch(infoInvoice(organizeDate));

      setDataInvoiceSells(invoiceData.payload);
      setdataInvoiceMoviments(invoiceData.payload);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      alert("Necessario colocar uma data para realizar a busca")
    }
  };

  return (
    <DivOrgCompany>
      <DivOrgTitle>
        <TitleCompany>Resumo do Faturamento</TitleCompany>
      </DivOrgTitle>
      <DivOrgScreen>
        <DivOrgDates>
          <DivFilter>
            <DivOrgFilter>
              <InfoFilter>Inicio</InfoFilter>
              <SelectDay
                type="date"
                value={dateStartSells}
                onChange={(e) => setDateStartSells(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgFilter>
              <InfoFilter>Fim</InfoFilter>
              <SelectDay
                type="date"
                value={dateFinishSells}
                onChange={(e) => setDateFinishSells(e.target.value)}
              />
            </DivOrgFilter>
            <DivOrgBtn>
              <BtnSearch
                type="button"
                onClick={() =>
                  getInfoInvoice([dateStartSells, dateFinishSells])
                }
              >
                <Search color="#000"/>
              </BtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setDateStartSells("");
                  setDateFinishSells("");
                  setDataInvoiceSells([]);
                  setdataInvoiceMoviments([]);
                }}
              >
                <Close color="#000"/>
              </BtnCancel>
            </DivOrgBtn>
          </DivFilter>
        </DivOrgDates>
        <DivFirstScreen>
          <DivResumeFin>
            <InvoiceSells
              dataInvoiceSells={dataInvoiceSells?.infoOrders}
              loading={loading}
            />
            <InvoiceMoney
              dataInvoiceMoviments={dataInvoiceMoviments}
              loading={loading}
            />
          </DivResumeFin>
          <DivResumeProfit>
            <DetailInvoice
              detailOrders={dataInvoiceSells?.infoOrders?.detailOrders}
              resumeDetailExpense={
                dataInvoiceSells?.infoExpense?.detailExpensePay
              }
              resumeDetailStock={
                dataInvoiceSells?.infoStockEntry?.stockInDetail
              }
            />
          </DivResumeProfit>
        </DivFirstScreen>
      </DivOrgScreen>
    </DivOrgCompany>
  );
}
