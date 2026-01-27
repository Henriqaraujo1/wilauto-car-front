import {
  DivOrgProduct,
  DivInfoProduct,
  InfoProductResult,
  DivOrgInfo,
  DivOrgPrices,
} from "./InfoProductStyle";
import { NumericFormat } from "react-number-format";

export default function InfoProduct(props) {
  const productInfo = props.selectedProductView;

  const parseName = (oneName) => {
    const fullName = oneName;

    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  return (
    <DivOrgProduct show={props.productView}>
      <DivInfoProduct>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoProductResult>
              Preço de Compra
              <NumericFormat
                customInput={InfoProductResult}
                displayType="text"
                value={productInfo.priceBuy}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoProductResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoProductResult>
              Valor do lucro
              <NumericFormat
                customInput={InfoProductResult}
                displayType="text"
                value={productInfo.priceProfit}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoProductResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoProductResult>
              Preço de Venda
              <NumericFormat
                customInput={InfoProductResult}
                displayType="text"
                value={productInfo.priceSell}
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={" R$ "}
              />
            </InfoProductResult>
          </DivOrgInfo>

          <DivOrgInfo>
            <InfoProductResult>
              Porcentagem de Lucro {productInfo.percentProfit}%
            </InfoProductResult>
          </DivOrgInfo>
                    <DivOrgInfo>
            <InfoProductResult>
              Categoria: {parseName(productInfo.nameBrand)}
            </InfoProductResult>
          </DivOrgInfo>
        </DivOrgPrices>
      </DivInfoProduct>
    </DivOrgProduct>
  );
}
