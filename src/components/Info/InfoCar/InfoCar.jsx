import {
  DivOrgCar,
  DivInfoCar,
  InfoCarResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
} from "./InfoCar.style";
import { NumericFormat } from "react-number-format";

export default function InfoCar(props) {
  const productInfo = props.selectedCarView;

  return (
    <DivOrgCar show={props.productView}>
      <DivInfoCar>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoCarResult>
              Preço de compra
              <NumericFormat
                customInput={InfoCarResult}
                displayType="text"
                value={productInfo.priceBuy}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoCarResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoCarResult>
              Preço do Venda
              <NumericFormat
                customInput={InfoCarResult}
                displayType="text"
                value={productInfo.priceSell}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoCarResult>
          </DivOrgInfo>
        </DivOrgPrices>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoCarResult>
              Porcentagem de Lucro {productInfo.percentProfit}%
            </InfoCarResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoCarResult>
              Valor do lucro
              <NumericFormat
                customInput={InfoCarResult}
                displayType="text"
                value={productInfo.priceProfit}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoCarResult>
          </DivOrgInfo>
        </DivOrgPrices>
      </DivInfoCar>
    </DivOrgCar>
  );
}
