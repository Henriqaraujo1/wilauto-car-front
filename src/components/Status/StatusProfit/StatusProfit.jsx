import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  DivFin,
  Profit,
  ValueToday,
  ProfitReceiveTitle,
  TitleStatusFin,
  DivOrgResume,
  ResumeInfo,
  DivOrgLoading,
  DivOrgBtn,
  BtnDetails,
  DivOrgTitle,
} from "./StatusProfitStyle";

export default function   StatusProfit(props) {
  const infoProfit = props.profitMonth;
  // const infoAccount = props.totalInAccount?.resumeByPayment;
  const [changeColor, setChangeColor] = useState(false)

  const loading = props.loading;

  useEffect(() => {
    if(infoProfit?.profitMonth < 0) {
      setChangeColor(true)
    } else {
      setChangeColor(false)
    }
  }, [infoProfit])


  return (
    <DivFin>
      <DivOrgTitle>
        <TitleStatusFin>Lucro</TitleStatusFin>
      </DivOrgTitle>

      <Profit changeColor={changeColor}>
        <ProfitReceiveTitle>Visão geral Mensal</ProfitReceiveTitle>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <>
            <DivOrgResume>
              <ResumeInfo>
                Lucro do Mês {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={infoProfit?.profitMonth || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
            {/* <DivOrgResume>
              <ResumeInfo>
                Lucro do Mês: {""}
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
            </DivOrgResume> */}
          </>
        )}
      </Profit>
      {/* <ProfitReceive>
        <ProfitReceiveTitle>
          Resumo Financeiro: Conta Bancaria e Caixa
        </ProfitReceiveTitle>
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
      </ProfitReceive> */}
      <DivOrgBtn>
        <BtnDetails to="/financial">Detalhes</BtnDetails>
      </DivOrgBtn>
    </DivFin>
  );
}
