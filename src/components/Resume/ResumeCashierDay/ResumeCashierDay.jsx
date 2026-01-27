import React, { useEffect, useState } from "react";
import {
  BtnExplain,
  DivOrgAllValues,
  DivOrgBtn,
  DivOrgCashierDay,
  DivOrgFinal,
  DivOrgFormPayment,
  DivOrgInfo,
  DivOrgValueFinal,
  DivOrgValues,
  InfoDay,
  InfoPayment,
  InfoValue,
  InfoValueFinal,
  ListOption,
  Option,
  TitleCashierDay,
  TitleInfo,
  Value,
  ValueFinal,
  ValueInfo,
  BtnCloseCashier,
  BtnOpenCashier,
  ControlCashier,
  DivOrgBtnCashier,
  DivOrgResume,
  BtnDetails,
} from "./ResumeCashierDayStyle";
import InfoCashier from "../../Info/InfoCashier/InfoCashier";
import CloseCashier from "../../CloseCashier/CloseCashier";
import OpenCashier from "../../Forms/OpenCashier/OpenCashier";
import DetailCashier from "../../Details/DetailCashier/DetailCashier";

export default function ResumeCashierDay(props) {
  const infoOrders = props.infoOrders;
  const infoChange = props.infoChange;
  const infoPayment = props.infoPayment;
  const infoExpense = props.infoExpense;
  const infoCashier = props.infoCashier;

  const [valueOpenCashier, setValueOpenCashier] = useState(0);
  const [valueFinal, setValueFinal] = useState(0);
  const [valueAccountFinal, setValueAccountFinal] = useState(0);
  const [showExplain, setShowExplain] = useState(false);
  const [showOpenCashier, setShowOpenCashier] = useState(false);
  const [showCloseCashier, setShowCloseCashier] = useState(false);
  const [detailPopUp, setDetailPopUp] = useState(false);

  const [resumeDay, setResumeDay] = useState({
    valueCashier: 0,
    qtdSell: 0,
    totalSell: 0,
    totalExpense: 0,
    totalChange: 0,
  });
  const [resumePaymentDay, setResumePaymentDay] = useState({
    money: 0,
    card: 0,
    pix: 0,
  });
  const [resumeExpenseDay, setResumeExpenseDay] = useState({
    money: 0,
    card: 0,
    pix: 0,
    qtdExpense: 0,
  });

  useEffect(() => {
    // setResumeDay.valueCashier
    setResumeDay((prevResumeDay) => ({
      ...prevResumeDay, // Copia os valores atuais
      valueCashier: 0,
      qtdSell: infoOrders?.qtdSell || 0,
      totalSell: infoOrders?.totalSell || 0,
      totalChange: infoChange?.valueChange || 0,
    }));

    setResumePaymentDay((prevPaymentDay) => ({
      ...prevPaymentDay,
      money: infoPayment?.totalClientPayed|| 0,
      card: infoPayment?.card || 0,
      pix: infoPayment?.pix || 0,
      totalAccount: infoPayment?.totalAccount || 0,
    }));

    setResumeExpenseDay((prevExpenseDay) => ({
      ...prevExpenseDay,
      qtdExpense: infoExpense?.qtdExpense,
      money: infoExpense?.money,
      card: infoExpense?.card,
      pix: infoExpense?.pix,
      totalExpense: infoExpense?.totalExpense,
      totalExpenseAccount: infoExpense?.totalExpenseAccount,
    }));
  }, [infoOrders, infoPayment, infoChange, infoExpense]);

  useEffect(() => {
    const valueCashier =
      valueOpenCashier +
      resumePaymentDay?.money -
      (resumeExpenseDay?.money + resumeDay?.totalChange);
    setValueFinal(valueCashier);
  }, [
    resumePaymentDay,
    valueFinal,
    resumeDay,
    resumeExpenseDay,
    valueOpenCashier,
  ]);

  useEffect(() => {
    const valueAccount =
      resumePaymentDay?.totalAccount - resumeExpenseDay?.totalExpenseAccount;

    setValueAccountFinal(valueAccount);
  }, [resumePaymentDay, resumeExpenseDay]);

  useEffect(() => {
    setValueOpenCashier(infoCashier?.cashierToday.initialValueOpen);
  }, [infoCashier]);

  useEffect(() => {
    if (showOpenCashier === true) {
      setShowCloseCashier(false);
    }
    if (showCloseCashier === true) {
      setShowOpenCashier(false);
    }
  }, [showOpenCashier, showCloseCashier]);

  return (
    <DivOrgResume>
      <ControlCashier>
        <DivOrgBtnCashier>
          <BtnOpenCashier
            type="button"
            onClick={() => setShowOpenCashier(!showOpenCashier)}
          >
            Abrir Caixa
          </BtnOpenCashier>
          <BtnCloseCashier
            type="button"
            onClick={() => setShowCloseCashier(!showCloseCashier)}
          >
            Fechar Caixa
          </BtnCloseCashier>
        </DivOrgBtnCashier>
        <OpenCashier
          showOpenCashier={showOpenCashier}
          setShowOpenCashier={setShowOpenCashier}
          infoCashier={infoCashier}
          getCashiersToday={props.getCashiersToday}
        />
        <CloseCashier
          showCloseCashier={showCloseCashier}
          setShowCloseCashier={setShowCloseCashier}
          infoCashier={infoCashier}
          getCashiersToday={props.getCashiersToday}
          valueFinal={valueFinal}
        />
      </ControlCashier>
      <DivOrgCashierDay>
        <TitleCashierDay>Resumo do dia</TitleCashierDay>

        <InfoDay>
          <DivOrgAllValues>
            <DivOrgValues>
              <InfoValue>Valor do Caixa aberto</InfoValue>
              <Value
                value={valueOpenCashier || 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgValues>
            <DivOrgInfo>
              <TitleInfo>Entradas</TitleInfo>
            </DivOrgInfo>
            <DivOrgValues>
              <InfoValue>Quantidade de Vendas</InfoValue>
              <ValueInfo>{resumeDay?.qtdSell}</ValueInfo>
            </DivOrgValues>
            <DivOrgValues>
              <InfoValue>Total de Vendas</InfoValue>
              <Value
                value={resumeDay?.totalSell || 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgValues>
            <DivOrgFormPayment>
              <InfoPayment>Forma de Pagamentos</InfoPayment>
              <ListOption>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Entrada física (Dinheiro)</InfoValue>
                    <Value
                      value={resumePaymentDay?.money || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Pix</InfoValue>
                    <Value
                      value={resumePaymentDay?.pix || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Cartão</InfoValue>
                    <Value
                      value={resumePaymentDay?.card || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
              </ListOption>
              <DivOrgInfo>
                <TitleInfo>Saídas</TitleInfo>
              </DivOrgInfo>
            </DivOrgFormPayment>
            <DivOrgValues>
              <InfoValue>Total de Troco</InfoValue>
              <Value
                value={infoChange?.valueChange || 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgValues>
            <DivOrgFormPayment>
              <DivOrgValues>
                <InfoPayment>Total de Despesas</InfoPayment>
                <ValueFinal
                  value={resumeExpenseDay?.totalExpense || 0}
                  displayType="text"
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </DivOrgValues>
              <ListOption>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Qtd Despesas</InfoValue>
                    <ValueInfo>{resumeExpenseDay?.qtdExpense}</ValueInfo>
                  </DivOrgValues>
                </Option>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Dinheiro</InfoValue>
                    <Value
                      value={resumeExpenseDay?.money || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Debito</InfoValue>
                    <Value
                      value={resumeExpenseDay?.card || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
                <Option>
                  <DivOrgValues>
                    <InfoValue>Pix</InfoValue>
                    <Value
                      value={resumeExpenseDay?.pix || 0}
                      displayType="text"
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgValues>
                </Option>
              </ListOption>
            </DivOrgFormPayment>
          </DivOrgAllValues>
          <DivOrgValueFinal>
            <DivOrgFinal>
              <InfoValueFinal>Valor Previsto do Caixa</InfoValueFinal>
              <ValueFinal
                value={valueFinal || 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgFinal>
            <DivOrgFinal>
              <InfoValueFinal>Valor Previsto em Conta</InfoValueFinal>
              <ValueFinal
                value={valueAccountFinal || 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgFinal>
          </DivOrgValueFinal>
          <DivOrgBtn>
            <BtnExplain
              type="button"
              onClick={() => setShowExplain(!showExplain)}
            >
              Entenda o cálculo
            </BtnExplain>
            <BtnDetails
              type="button"
              onClick={() => setDetailPopUp(!showExplain)}
            >
              Detalhes
            </BtnDetails>
          </DivOrgBtn>
          <InfoCashier
            showExplain={showExplain}
            setShowExplain={setShowExplain}
          />
          <DetailCashier
            detailPopUp={detailPopUp}
            setDetailPopUp={setDetailPopUp}
            resumeOrders={props.resumeOrders}
            resumeExpenseDay={props.resumeExpenses}
          />
        </InfoDay>
      </DivOrgCashierDay>
    </DivOrgResume>
  );
}
