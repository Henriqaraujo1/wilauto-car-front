import React from "react";
import {
  DivOrgProduct,
  DivInfoSubProduct,
  InfoSubProductResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
} from "./InfoSubProduct.style";
import { NumericFormat } from "react-number-format";

export default function InfoSubProduct(props) {
  const productInfo = props.selectedProductView;

  return (
    <DivOrgProduct show={props.productView}>
      <DivInfoSubProduct>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoSubProductResult>
              Preço de compra
              <NumericFormat
                customInput={InfoSubProductResult}
                displayType="text"
                value={productInfo.priceBuy}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoSubProductResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoSubProductResult>
              Preço do Venda
              <NumericFormat
                customInput={InfoSubProductResult}
                displayType="text"
                value={productInfo.priceSell}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoSubProductResult>
          </DivOrgInfo>
        </DivOrgPrices>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoSubProductResult>
              Porcentagem de Lucro {productInfo.percentProfit}%
            </InfoSubProductResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoSubProductResult>
              Valor do lucro
              <NumericFormat
                customInput={InfoSubProductResult}
                displayType="text"
                value={productInfo.priceProfit}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoSubProductResult>
          </DivOrgInfo>
        </DivOrgPrices>
      </DivInfoSubProduct>
    </DivOrgProduct>
  );
}
