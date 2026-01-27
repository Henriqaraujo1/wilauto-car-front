import React, { useEffect, useState } from "react";
import {
  DivStockOut,
  DivTitle,
  TitleStock,
  InfoFilter,
  FormatValue,
  DivInfoStock,
  DivInfo,
  InfoCard,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./StockOutStyle.js";
import { ClipLoader } from "react-spinners";

export default function StockOut(props) {
  const infoStockOut = props.dataStockMoviments;
  const loading = props.loading;

  const [stockData, setStockData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (infoStockOut?.codeStatus === 200) {
      setStockData(infoStockOut?.stockOut);
      setErrors();
    } else {
      setStockData([]);
      setErrors(infoStockOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStockOut?.codeStatus]);

  return (
    <DivStockOut>
      <DivTitle>
        <TitleStock>Saída do Estoque</TitleStock>
      </DivTitle>
      <DivInfoStock>
        <DivInfo>
          <InfoCard>Total Perdido</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={stockData?.totalLost || 0}
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
          <InfoCard>Total de percas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{stockData?.totalProductLost || 0}</InfoFilter>
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Maior Perca</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={stockData?.highValueLost || 0}
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
      </DivInfoStock>
      {errors && (
        <DivOrgResults>
          <InfoResult>{errors.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivStockOut>
  );
}
