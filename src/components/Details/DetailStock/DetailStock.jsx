import React, { useEffect, useState } from "react";
import {
  DivTableDetailStock,
  TableDetailStock,
  DivCardDetailsProduct,
  InfoProduct,
  InfoQtd,
  InfoPrice,
  DivOrgLoading,
  DivOrgInfo,
  DivOrgTable,
} from "./DetailStockStyle";
import { ClipLoader } from "react-spinners";

export default function DetailStock(props) {
  const infoStock = props.selectedProduct;

  const [loading, setLoading] = useState();
  const [listStock, setListStock] = useState([]);

  const createListStock = async (dataStock) => {
    setLoading(true);
    setListStock(dataStock);
  };

  useEffect(() => {
    createListStock(infoStock.infoProduct);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [infoStock.infoProduct]);

  return (
    <DivOrgTable>
      <DivTableDetailStock>
        <TableDetailStock>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color="#FFF" />
            </DivOrgLoading>
          ) : (
            listStock.map((infoStockProduct, index) => {
              return (
                <DivCardDetailsProduct key={index}>
                  <DivOrgInfo>
                    <InfoProduct>Qtd</InfoProduct>
                    <InfoQtd>{infoStockProduct.totalQtdByProduct}</InfoQtd>
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <InfoProduct>Preço Unitario</InfoProduct>
                    <InfoPrice
                      displayType="text"
                      value={infoStockProduct.priceUnit.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <InfoProduct>Preço Total</InfoProduct>
                    <InfoPrice
                      displayType="text"
                      value={infoStockProduct.priceTotalByProduct.toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" }
                      )}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  {infoStockProduct.isDevolution ? (
                    <></>
                  ) : (
                    <DivOrgInfo>
                      <InfoProduct>Nº Pedido</InfoProduct>
                      <InfoProduct>{infoStockProduct.idStockEntry}</InfoProduct>
                    </DivOrgInfo>
                  )}
                  {infoStockProduct.isDevolution ? (
                    <DivOrgInfo>
                      <InfoProduct>Devolução</InfoProduct>
                      <InfoProduct>{infoStockProduct.isDevolution}</InfoProduct>
                    </DivOrgInfo>
                  ) : (
                    <></>
                  )}
                </DivCardDetailsProduct>
              );
            })
          )}
        </TableDetailStock>
      </DivTableDetailStock>
    </DivOrgTable>
  );
}
