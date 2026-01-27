import React, { useEffect, useState } from "react";
import {
  DivInvoiceSells,
  DivTitle,
  TitleInvoice,
  InfoCard,
  InfoFilter,
  DivInfoInvoice,
  DivInfo,
  FormatValue,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./InvoiceSellsStyle.js";
import { ClipLoader } from "react-spinners";

export default function InvoiceSells(props) {
  const infoInvoice = props.dataInvoiceSells;
  const loading = props.loading;

  const [invoiceData, setInvoiceData] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(infoInvoice?.codeStatus === 200) {
      setInvoiceData(infoInvoice?.orders)
      setErrors()
    } else {
      setInvoiceData([])
      setErrors(infoInvoice)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoInvoice?.codeStatus])

  return (
    <DivInvoiceSells>
      <DivTitle>
        <TitleInvoice>Vendas</TitleInvoice>
      </DivTitle>

      <DivInfoInvoice>
        <DivInfo>
          <InfoCard>Total Vendido</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={invoiceData.totalSold || 0}
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
          <InfoCard>Total de vendas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{invoiceData.qtdSell || 0}</InfoFilter>
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Maior venda</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={invoiceData.highSell || 0}
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
          <InfoCard>Vendas Dinheiro</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={invoiceData.cashSale || 0}
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
          <InfoCard>Vendas Cartão/PIX</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={invoiceData.saleAccount || 0}
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
      </DivInfoInvoice>
      {errors && (
        <DivOrgResults>
          <InfoResult>{errors.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivInvoiceSells>
  );
}
