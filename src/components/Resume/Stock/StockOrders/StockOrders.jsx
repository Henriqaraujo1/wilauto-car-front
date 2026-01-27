import React, { useEffect, useState } from "react";
import {
  DivStockOrders,
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
} from "./StockOrdersStyle.js";
import { ClipLoader } from "react-spinners";

export default function StockOrders(props) {
  const infoStockOrder = props.dataStockMoviments;
  const loading = props.loading;

  const [stockData, setStockData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (infoStockOrder?.codeStatus === 200) {
      setStockData(infoStockOrder?.infoStockOrder);
      setErrors();
    } else {
      setStockData([]);
      setErrors(infoStockOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStockOrder?.codeStatus]);

  return (
    <DivStockOrders>
      <DivTitle>
        <TitleStock>Entradas no Estoque</TitleStock>
      </DivTitle>
      <DivInfoStock>
        <DivInfo>
          <InfoCard>Total Comprado</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={stockData?.totalOrders || 0}
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
          <InfoCard>Total pedidos</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            
          <InfoFilter>{stockData?.totalQtdOrders || 0}</InfoFilter>
          )}
        </DivInfo>
        
      </DivInfoStock>
      {errors && (
        <DivOrgResults>
          <InfoResult>{errors.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivStockOrders>
  );
}
