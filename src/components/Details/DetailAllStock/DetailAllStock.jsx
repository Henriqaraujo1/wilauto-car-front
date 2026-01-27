import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  AllStockDetail,
  DivOrgDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoAllStockDetails,
  Item,
  NameInfo,
  RowInfo,
  TableAllStock,
  TableInfo,
  TitleIn,
  Value,
} from "./DetailAllStockStyle";

export default function DetailAllStock(props) {
  const infoStockOut = props.resumeStockOut;
  const infoStockIn = props.resumeStockIn;
  const infoStockNow = props.resumeStockNow;

  const [showList, setShowList] = useState();
  const [listStockIn, setListStockIn] = useState([]);
  const [listStockNow, setListStockNow] = useState([]);
  const [listStockOut, setListStockOut] = useState([]);

  const createList = (dataStockOut, dataStockNow, dataStockIn) => {
    setShowList(true);
    if (showList) {
      setListStockOut(dataStockOut);
      setListStockNow(dataStockNow);
      setListStockIn(dataStockIn);
    }
  };

  useEffect(() => {
    createList(infoStockOut, infoStockNow, infoStockIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStockOut, infoStockNow, infoStockIn]);

  return (
    <DivOrgDetail>
      <TableAllStock>
        <InfoAllStockDetails>
          <AllStockDetail>
            <DivOrgTitle>
              <TitleIn>Estoque Atual</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Produto</NameInfo>
                    <NameInfo>Valor de Venda</NameInfo>
                    <NameInfo>QTD no Estoque</NameInfo>
                    <NameInfo>Valor Total</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listStockNow?.map((product, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{product.nameProduct}</Item>
                        <Item>
                          <Value
                            value={product.priceSell}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                          <Item>{product.qtdStock}</Item>
                        <Item>
                          <Value
                            value={product.priceSell * product.qtdStock}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </AllStockDetail>
          <AllStockDetail>
            <DivOrgTitle>
              <TitleIn>Entradas no Estoque</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>Nº Pedido</NameInfo>
                    <NameInfo>Data de Entrada</NameInfo>
                    <NameInfo>Qtd Itens</NameInfo>
                    <NameInfo>Valor Pago</NameInfo>
                    <NameInfo>Fornecedor</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listStockIn?.map((productEntry, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{productEntry.idStockEntry}</Item>
                        <Item>{productEntry.dateEntry}</Item>
                          <Item>{productEntry?.qtdItems || 0}</Item>
                        <Item>
                          <Value
                            value={productEntry.valueFinalOrder}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{productEntry.nameProvider}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </AllStockDetail>
          <AllStockDetail>
            <DivOrgTitle>
              <TitleIn>Saídas do Estoque</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de saida</NameInfo>
                    <NameInfo>Motivo</NameInfo>
                    <NameInfo>Detalhes</NameInfo>
                    <NameInfo>QTD Retirada</NameInfo>
                    <NameInfo>Preço Unitario</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listStockOut?.map((stockOut, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{stockOut.dateOut}</Item>
                        <Item>{stockOut.reason}</Item>
                        <Item>{stockOut.details}</Item>
                        <Item>{stockOut.qtdRemoveNoBatch}</Item>
                        <Item>
                          <Value
                            value={stockOut.valueTotalRemove}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </AllStockDetail>
        </InfoAllStockDetails>
      </TableAllStock>
    </DivOrgDetail>
  );
}
