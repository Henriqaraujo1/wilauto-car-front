import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  BtnClose,
  CashierDetail,
  DivBtnClose,
  DivOrgDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoCashierDetails,
  Item,
  NameInfo,
  RowInfo,
  TableCashier,
  TableInfo,
  TitleDetail,
  TitleIn,
  Value,
} from "./DetailCashierStyle";
import { Close } from "@styled-icons/material";

export default function DetailCashier(props) {
  const infoOrders = props.resumeOrders;
  const infoExpense = props.resumeExpenseDay;

  const [showList, setShowList] = useState();
  const [listOrders, setListOrders] = useState([]);
  const [listExpense, setListExpense] = useState([]);

  const createList = (infoOrders, infoExpense) => {
    setShowList(true);
    if (showList) {
      setListOrders(infoOrders);
      setListExpense(infoExpense);
    }
  };

  useEffect(() => {
    createList(infoOrders, infoExpense);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders, infoExpense]);

  return (
    <DivOrgDetail show={props.detailPopUp}>
      <DivBtnClose>
      <DivOrgTitle>
        <TitleDetail>Movimentações</TitleDetail>
      </DivOrgTitle>
        <BtnClose
          type="button"
          onClick={() => {
            props.setDetailPopUp(false);
          }}
        >
          <Close />
        </BtnClose>
      </DivBtnClose>
      <TableCashier>
        <InfoCashierDetails>
          <CashierDetail>
            <DivOrgTitle>
              <TitleIn>Entradas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Venda</NameInfo>
                    <NameInfo>Desconto</NameInfo>
                    <NameInfo>Valor com Desconto</NameInfo>
                    <NameInfo>Valor sem desconto</NameInfo>
                    <NameInfo>Valor do Desconto</NameInfo>
                    <NameInfo>Valor pago</NameInfo>
                    <NameInfo>Valor do troco</NameInfo>
                    <NameInfo>Form. de Pagamento</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {listOrders?.map((order, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{order.dateCreated}</Item>
                        <Item>{order.discountOption}</Item>
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
                        <Item>{order.formPayment}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </CashierDetail>
          <CashierDetail>
            <DivOrgTitle>
              <TitleIn>Saidas</TitleIn>
            </DivOrgTitle>
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Pagamento</NameInfo>
                    <NameInfo>Descrição</NameInfo>
                    <NameInfo>Valor Pago</NameInfo>
                    <NameInfo>Forma de pagamento</NameInfo>
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
                        <Item>{expense.formPayment}</Item>
                        <Item>{expense.status}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </CashierDetail>
        </InfoCashierDetails>
      </TableCashier>
    </DivOrgDetail>
  );
}
