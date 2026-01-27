import React, { useEffect, useState } from "react";
import {
  DivProfitMonth,
  DivTitle,
  TitleProfit,
  FormatValue,
  DivInfoProfit,
  DivInfo,
  InfoCard,
  DivOrgLoading,
  DivOrgResults,
} from "./ProfitInfoStyle.js";
import { ClipLoader } from "react-spinners";
import { InfoResult } from "../../Stock/StockOrders/StockOrdersStyle.js";

export default function ProfitInfo(props) {
  const resumeProfit = props.dataInfoProfit;
  const loading = props.loading;

  const [profitData, setProfitData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resumeProfit?.codeStatus === 200) {
      setProfitData(resumeProfit?.infoProfit);
      setErrors();
    } else {
      setProfitData([]);
      setErrors(resumeProfit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeProfit?.codeStatus]);

  return (
    <DivProfitMonth>
      <DivTitle>
        <TitleProfit>Resumo do Lucro</TitleProfit>
      </DivTitle>
      <DivInfoProfit>
        <DivInfo>
          <InfoCard>Total Faturado</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={profitData?.ordersTotal || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Total Despesas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={profitData?.expenseTotal || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Total Compras</InfoCard>

          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={profitData?.stockTotalValue || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Lucro Total</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={profitData?.totalProfit || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
      </DivInfoProfit>
      {errors && (
        <DivOrgResults>
          <InfoResult>{errors.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivProfitMonth>
  );
}
