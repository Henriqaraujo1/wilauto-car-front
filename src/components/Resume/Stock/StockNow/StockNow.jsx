import React, { useEffect, useState } from "react";
import {
  DivStockNow,
  DivTitle,
  TitleStock,
  InfoFilter,
  FormatValue,
  DivInfoStock,
  DivInfo,
  InfoCard,
  DivOrgLoading,
} from "./StockNowStyle.js";
import { ClipLoader } from "react-spinners";

export default function StockNow(props) {
  const infoStock = props.dataInfoStock;
  const loading = props.loading;

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (infoStock?.codeStatus === 200) {
      setStockData(infoStock?.stockNow);
    } else {
      setStockData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStock?.codeStatus]);

  return (
    <DivStockNow>
      <DivTitle>
        <TitleStock>Estoque Atual</TitleStock>
      </DivTitle>
      <DivInfoStock>
        <DivInfo>
          <InfoCard>Total Em Estoque</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={stockData?.totalStock || 0}
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
        {/* <DivInfo>
          <InfoCard>Items com estoque Minimo</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{stockData?.minStock || 0}</InfoFilter>
          )}
        </DivInfo> */}
        <DivInfo>
          <InfoCard>Quantidade em estoque</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{stockData?.qtdStock || 0}</InfoFilter>
          )}
        </DivInfo>
      </DivInfoStock>
    </DivStockNow>
  );
}
