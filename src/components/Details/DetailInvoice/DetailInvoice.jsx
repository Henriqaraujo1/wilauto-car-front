import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  InvoiceDetail,
  DivOrgDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoInvoiceDetails,
  Item,
  NameInfo,
  RowInfo,
  TableInvoice,
  TableInfo,
  TitleIn,
  Value,
} from "./DetailInvoiceStyle";

export default function DetailInvoice(props) {
  const infoOrders = props.detailOrders;
  const infoExpense = props.resumeDetailExpense;
  const infoStock = props.resumeDetailStock;

  const [showList, setShowList] = useState();
  const [listOrders, setListOrders] = useState([]);
  const [listExpense, setListExpense] = useState([]);
  const [listStock, setListStock] = useState([]);

  const createList = (dataOrders, dataExpense, dataStock) => {
    setShowList(true);
    if (showList) {
      setListOrders(dataOrders);
      setListExpense(dataExpense);
      setListStock(dataStock);
    }
  };

  useEffect(() => {
    createList(infoOrders, infoExpense, infoStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders, infoExpense, infoStock]);

  return (
    <DivOrgDetail>
      <TableInvoice>
        <InfoInvoiceDetails>
          <InvoiceDetail>
            <DivOrgTitle>
              <TitleIn>Vendas detalhadas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Venda</NameInfo>
                    <NameInfo>Desconto</NameInfo>
                    <NameInfo>Forma de Pagamento</NameInfo>
                    <NameInfo>Valor com Desconto</NameInfo>
                    <NameInfo>Valor sem desconto</NameInfo>
                    <NameInfo>Valor do Desconto</NameInfo>
                    <NameInfo>Valor pago</NameInfo>
                    <NameInfo>Valor do troco</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listOrders?.map((order, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{order.dateCreated}</Item>
                        <Item>{order.discountOption}</Item>
                        <Item>{order.formPayment}</Item>
                        <Item>
                          <Value
                            value={order.valueWithDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueNoDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueClientPayed}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueChange}
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
          </InvoiceDetail>
          <InvoiceDetail>
            <DivOrgTitle>
              <TitleIn>Despesas detalhadas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Pag.</NameInfo>
                    <NameInfo>Descrição</NameInfo>
                    <NameInfo>Destinatario</NameInfo>
                    <NameInfo>Forma de Pag.</NameInfo>
                    <NameInfo>Valor Pago</NameInfo>
                    <NameInfo>Categoria</NameInfo>
                    <NameInfo>Sub-categoria</NameInfo>
                    <NameInfo>Status</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listExpense?.map((expense, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{expense.datePayment}</Item>
                        <Item>{expense.expenseType}</Item>
                        <Item>{expense.destination}</Item>
                        <Item>{expense.formPayment}</Item>
                        <Item>
                          <Value
                            value={expense.value}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{expense.categoryName}</Item>
                        <Item>{expense.subCategoryName}</Item>
                        <Item>{expense.status}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </InvoiceDetail>
          <InvoiceDetail>
            <DivOrgTitle>
              <TitleIn>Pedidos Detalhados</TitleIn>
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
                  {listStock?.map((stockItem, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{stockItem.idStockEntry}</Item>
                        <Item>{stockItem.dateEntry}</Item>
                        <Item>{stockItem.qtdItems}</Item>
                        <Item>
                          <Value
                            value={stockItem.valueFinalOrder}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{stockItem.nameProvider}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </InvoiceDetail>
        </InfoInvoiceDetails>
      </TableInvoice>
    </DivOrgDetail>
  );
}
