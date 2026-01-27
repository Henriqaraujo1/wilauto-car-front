import React from "react";
import { ClipLoader } from "react-spinners";
import {
  DivFin,
  Revenues,
  ValueToday,
  RevenuesReceiveTitle,
  RevenuesReceive,
  TitleStatusFin,
  DivOrgResume,
  ResumeInfo,
  DivOrgLoading,
  DivOrgBtn,
  BtnDetails,
  DivOrgTitle,
} from "./StatusFinStyle";

export default function StatusFin(props) {
  const infoFinancialDay = props.financialDay?.resumeToday;
  const infoAccount = props.totalInAccount?.resumeByPayment;
  const resumeMonth = props.infoByMonth

  const loading = props.loading

  return (
    <DivFin>
      <DivOrgTitle>
        <TitleStatusFin>Faturamento</TitleStatusFin>
      </DivOrgTitle>

      <Revenues>
        <RevenuesReceiveTitle>Visão geral Diária e Mensal</RevenuesReceiveTitle>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <>
            <DivOrgResume>
              <ResumeInfo>
                Faturamento de Hoje {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={infoFinancialDay?.totalSell || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
            <DivOrgResume>
              <ResumeInfo>
                Faturamento do Mês: {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={resumeMonth?.totalSell || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
          </>
        )}
      </Revenues>
      <RevenuesReceive>
        <RevenuesReceiveTitle>
          Resumo Financeiro do mês: Conta Bancaria e Caixa
        </RevenuesReceiveTitle>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <>
            <DivOrgResume>
              <ResumeInfo>
                Faturamento na Conta: {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={infoAccount?.account || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
            <DivOrgResume>
              <ResumeInfo>
                Faturamento em Caixa: {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={infoAccount?.money || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
          </>
        )}
      </RevenuesReceive>
      <DivOrgBtn>
        <BtnDetails to="/financial">Detalhes</BtnDetails>
      </DivOrgBtn>
    </DivFin>
  );
}
