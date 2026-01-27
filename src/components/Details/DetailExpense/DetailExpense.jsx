import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  ExpenseDetail,
  DivOrgDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoExpenseDetails,
  NameInfo,
  RowInfo,
  TableExpense,
  TableInfo,
  TitleIn,
  Item,
  Value,
} from "./DetailExpenseStyle";

export default function DetailExpense(props) {
  const infoExpensePay = props.resumeExpensePayed;
  const infoExpenseNoPay = props.resumeExpenseNoPayed;

  const [showList, setShowList] = useState();
  const [listExpensePay, setListExpensePay] = useState([]);
  const [listExpenseNoPay, setListExpenseNoPay] = useState([]);

  const createList = (dataExpensePay, dataExpenseNoPay) => {
    setShowList(true);
    if (showList) {
      setListExpensePay(dataExpensePay);
      setListExpenseNoPay(dataExpenseNoPay);
    }
  };

  useEffect(() => {
    createList(infoExpensePay, infoExpenseNoPay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoExpensePay, infoExpenseNoPay]);

  return (
    <DivOrgDetail>
      <TableExpense>
        <InfoExpenseDetails>
          <ExpenseDetail>
            <DivOrgTitle>
              <TitleIn>Despesas Pagas</TitleIn>
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
                  {listExpensePay?.map((expensePay, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{expensePay.datePayment}</Item>
                        <Item>{expensePay.expenseType}</Item>
                        <Item>{expensePay.destination}</Item>
                        <Item>{expensePay.formPayment}</Item>
                        <Item>
                          <Value
                            value={expensePay.value}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{expensePay.categoryName}</Item>
                        <Item>{expensePay.subCategoryName}</Item>
                        <Item>{expensePay.status}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </ExpenseDetail>
          <ExpenseDetail>
            <DivOrgTitle>
              <TitleIn>Despesas Não pagas</TitleIn>
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
                  {listExpenseNoPay?.map((expenseNoPay, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{expenseNoPay.dueDate}</Item>
                        <Item>{expenseNoPay.expenseType}</Item>
                        <Item>{expenseNoPay.destination}</Item>
                        <Item>{expenseNoPay.formPayment}</Item>
                        <Item>
                          <Value
                            value={expenseNoPay.value}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{expenseNoPay.categoryName}</Item>
                        <Item>{expenseNoPay.subCategoryName}</Item>
                        <Item>{expenseNoPay.status}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          </ExpenseDetail>
        </InfoExpenseDetails>
      </TableExpense>
    </DivOrgDetail>
  );
}
