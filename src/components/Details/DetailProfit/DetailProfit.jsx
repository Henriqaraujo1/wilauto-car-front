import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  ProfitDetail,
  DivOrgDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoProfitDetails,
  Item,
  NameInfo,
  RowInfo,
  TableProfit,
  TableInfo,
  TitleIn,
  Value,
} from "./DetailProfitStyle";

export default function DetailProfit(props) {
  const infoOrders = props.resumeOrders;
  const infoExpense = props.resumeExpense;
  const infoStockIn = props.resumeStockIn;

  const [showList, setShowList] = useState();
  const [listOrders, setListOrders] = useState([]);
  const [listExpense, setListExpense] = useState([]);
  const [listStockIn, setListStockIn] = useState([]);

  const createList = (dataOrders, dataExpense, dataStockIn) => {
    setShowList(true);
    if (showList) {
      setListOrders(dataOrders);
      setListExpense(dataExpense);
      setListStockIn(dataStockIn)
    }
  };

  useEffect(() => {
    createList(infoOrders, infoExpense, infoStockIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders, infoExpense, infoStockIn]);

  return (
    <DivOrgDetail>
      <TableProfit>
        <InfoProfitDetails>
          <ProfitDetail>
            <DivOrgTitle>
              <TitleIn>Entradas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Venda</NameInfo>
                    <NameInfo>QTD de Vendas</NameInfo>
                    <NameInfo>Total Vendido</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listOrders?.map((order, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{order.dateCreated}</Item>
                        <Item>{order.qtdSell}</Item>
                        <Item>
                          <Value
                            value={order.totalSell}
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
          </ProfitDetail>
          <ProfitDetail>
            <DivOrgTitle>
              <TitleIn>Despesas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Pagamento</NameInfo>
                    <NameInfo>QTD de Despesas</NameInfo>
                    <NameInfo>Total Pago</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listExpense?.map((expense, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{expense.datePayment}</Item>
                        <Item>{expense.qtdExpenses}</Item>
                        <Item>
                          <Value
                            value={expense.totalExpense}
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
          </ProfitDetail>
          <ProfitDetail>
            <DivOrgTitle>
              <TitleIn>Pedidos</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Compra</NameInfo>
                    <NameInfo>QTD de Pedido</NameInfo>
                    <NameInfo>Total Pago</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listStockIn?.map((itemStock, index) => {
                    
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{itemStock.dateEntry}</Item>
                        <Item>{itemStock.qtdOrders}</Item>
                        <Item>
                          <Value
                            value={itemStock.valueFinalOrder}
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
          </ProfitDetail>
        </InfoProfitDetails>
      </TableProfit>
    </DivOrgDetail>
  );
}
