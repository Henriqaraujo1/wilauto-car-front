import React, { useEffect, useState } from "react";
import {
  DivResumeCashier,
  TitleResumeCashier,
  DivSpent,
  DivOrgPopUps,
  DivOrgPop,
  TitlePop,
  ValuesCashier,
  DivOrgTable,
  TableResumeCashier,
  DivCardCashier,
  TitleCard,
  DivOrgCard,
  InfoCashier,
  DivOrgCardUser,
  DivOrgLoading,
  DivOrgInputs,
  LabelFilter,
  SelectOption,
  Options,
  DivFilter,
  DivOrgBtn,
  BtnSearch,
  BtnCancel,
  InputFilter,
} from "./ResumeCashierStyle";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { ClipLoader } from "react-spinners";
import { Close, Search } from "@styled-icons/material";

export default function ResumeCashier(props) {
  const infoCashier = props.infoCashier;
  const infoChange = props.infoChange;
  const infoPayment = props.infoPayment;
  const infoExpense = props.infoExpense;

  const formatDate = new FormatDatesFront();

  const [infoCashierToday, setInfoCashierToday] = useState([]);
  const [valueCashierNow, setValueCashierNow] = useState(0);
  const [valueFinalNow, setValueFinalNow] = useState(0);
  const [changeDay, setChangeDay] = useState({
    totalChange: 0,
  });
  const [resumePaymentDay, setResumePaymentDay] = useState({
    money: 0,
  });
  const [resumeExpenseDay, setResumeExpenseDay] = useState({
    money: 0,
  });

  // Estado dos filtros
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateFinish, setFilterDateFinish] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterInfoCashier, setFilterInfoCashier] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showlist, setShowlist] = useState(false);

  const createListCashiers = (dataCashier) => {
    setLoading(true);
    setShowlist(true);
    if (showlist && dataCashier) {
      setFilterInfoCashier(dataCashier);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const filterCashier = () => {
    const filterList = infoCashier.allCashiers
      .filter((cashier) =>
        filterStatus.length > 0 ? cashier.status === filterStatus : cashier
      )
      .filter((cashier) =>
        filterDateStart
          ? formatDate.compareDatesAfterWithHour(
              cashier.dateOpen,
              filterDateStart
            ) >= 0
          : cashier
      )
      .filter((cashier) =>
        filterDateFinish
          ? formatDate.compareDatesAfterWithHour(
              cashier.dateClosed,
              filterDateFinish
            ) <= 0
          : cashier
      );

    setFilterInfoCashier(filterList);
  };

  useEffect(() => {
    setInfoCashierToday(infoCashier);
    createListCashiers(infoCashierToday?.allCashiers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCashier, infoCashierToday]);

  useEffect(() => {
    setChangeDay((prevResumeDay) => ({
      ...prevResumeDay, // Copia os valores atuais
      totalChange: infoChange?.valueChange || 0,
    }));
    setResumePaymentDay((prevPaymentDay) => ({
      money: infoPayment?.totalClientPayed || 0,
    }));
    setResumeExpenseDay((prevExpenseDay) => ({
      ...prevExpenseDay,
      money: infoExpense?.money,
    }));
  }, [infoChange?.valueChange, infoExpense?.money, infoPayment?.totalClientPayed]);

  useEffect(() => {
    setValueCashierNow(infoCashier?.cashierToday.initialValueOpen);
    const valueCashier =
      valueCashierNow +
      resumePaymentDay?.money -
      (resumeExpenseDay?.money + changeDay?.totalChange);
    setValueFinalNow(valueCashier);
  }, [
    changeDay,
    infoCashier,
    resumeExpenseDay,
    resumePaymentDay,
    valueCashierNow,
    valueFinalNow,
  ]);

  return (
    <DivResumeCashier>
      <TitleResumeCashier>Resumo Caixa</TitleResumeCashier>
      <DivSpent>
        <DivOrgPopUps>
          <DivOrgPop>
            <TitlePop>Caixa Atual</TitlePop>
            <ValuesCashier
              value={valueFinalNow || 0}
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgPop>
          {/* <DivOrgPop>
            <TitlePop>Caixa do dia anterior</TitlePop>
            <ValuesCashier
              displayType="text"
              value={infoCashierToday?.cashierYesterday?.valueClosed || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgPop> */}
          {/* <DivOrgPop>
            <TitlePop>Caixa Previsto</TitlePop>
            <ValuesCashier
              displayType="text"
              value={25000}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgPop> */}
        </DivOrgPopUps>
        <TitleResumeCashier>Historico do Caixa</TitleResumeCashier>
        <DivFilter show={props.disableFilter}>
          <DivOrgInputs>
            <LabelFilter>Data Inicio</LabelFilter>
            <InputFilter
              type="date"
              value={filterDateStart}
              onChange={(e) => setFilterDateStart(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <LabelFilter>Data Final</LabelFilter>
            <InputFilter
              type="date"
              value={filterDateFinish}
              onChange={(e) => setFilterDateFinish(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <LabelFilter>Status</LabelFilter>
            <SelectOption
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
              }}
            >
              <Options value="">Selecione</Options>
              <Options value="aberto">Aberto</Options>
              <Options value="fechado">Fechado</Options>
            </SelectOption>
          </DivOrgInputs>
          <DivOrgBtn>
            <BtnSearch type="button" onClick={filterCashier}>
              <Search />
            </BtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterDateFinish("");
                setFilterDateStart("");
                setFilterStatus("");
                setFilterInfoCashier(infoCashier.allCashiers);
              }}
            >
              <Close />
            </BtnCancel>
          </DivOrgBtn>
        </DivFilter>
        <DivOrgTable>
          <TableResumeCashier>
            {loading ? (
              <DivOrgLoading>
                <ClipLoader speedMultiplier={3} color="#FFF" />
                Carregando informações
              </DivOrgLoading>
            ) : (
              filterInfoCashier.map((infoCashiers, index) => {
                return (
                  <DivCardCashier key={index}>
                    <DivOrgCard>
                      <TitleCard>Infomações da Abertura</TitleCard>
                      <InfoCashier>
                        {infoCashiers.dateOpen} <br />
                      </InfoCashier>
                      <ValuesCashier
                        displayType="text"
                        value={infoCashiers.initialValueOpen}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </DivOrgCard>
                    <DivOrgCard>
                      <TitleCard>Infomações do Fechamento</TitleCard>
                      <InfoCashier>
                        {infoCashiers.dateClosed || "Em aberto"} <br />
                      </InfoCashier>
                      <ValuesCashier
                        displayType="text"
                        value={infoCashiers.valueClosed}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </DivOrgCard>
                    <DivOrgCard>
                      <TitleCard>
                        Status <br />
                      </TitleCard>
                      <InfoCashier>{infoCashiers.status}</InfoCashier>
                    </DivOrgCard>
                    <DivOrgCardUser>
                      <InfoCashier>
                        Usuario <br /> {infoCashiers.username}
                      </InfoCashier>
                    </DivOrgCardUser>
                  </DivCardCashier>
                );
              })
            )}
          </TableResumeCashier>
        </DivOrgTable>
      </DivSpent>
    </DivResumeCashier>
  );
}
