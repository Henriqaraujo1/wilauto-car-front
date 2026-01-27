import React from "react";
import {
  DivOrgExpense,
  DivInfoExpense,
  NameExpense,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgDates,
} from "./InfoExpenseStyle";
import { Close } from "@styled-icons/material";

export default function InfoExpense(props) {
  const infoExpense = props.selectExpenseView;

  return (
    <DivOrgExpense show={props.debitView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setExpenseView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivInfoExpense>
        <DivOrgDates>
          <DivOrgInfo>
            <NameExpense>
              Despesa Criada: {infoExpense.dateCreated}
            </NameExpense>
          </DivOrgInfo>
          <DivOrgInfo>
            <NameExpense>
              Pago em: {infoExpense.datePayment}
            </NameExpense>
          </DivOrgInfo>
          {infoExpense.dueDate && (
            <DivOrgInfo>
              <NameExpense>Vencimento: {infoExpense.dueDate}</NameExpense>
            </DivOrgInfo>
          )}
          {infoExpense.dateUpdate && (
            <DivOrgInfo>
              <NameExpense>
                Ultima Alteração: {infoExpense.dateUpdate}
              </NameExpense>
            </DivOrgInfo>
          )}
          {infoExpense.description && (
            <DivOrgInfo>
              <NameExpense>Destalhes: {infoExpense.description}</NameExpense>
            </DivOrgInfo>
          )}
        </DivOrgDates>
        <DivOrgDates>
          <DivOrgInfo>
            <NameExpense>Categoria: {infoExpense.categoryName}</NameExpense>
          </DivOrgInfo>
          <DivOrgInfo>
            <NameExpense>
              Sub-Categoria: {infoExpense.subCategorieName}
            </NameExpense>
          </DivOrgInfo>
          <DivOrgInfo>
            <NameExpense>Destinatario: {infoExpense.destination}</NameExpense>
          </DivOrgInfo>
          <DivOrgInfo>
            <NameExpense>
              Forma de pagamento: {infoExpense.formPayment}
            </NameExpense>
          </DivOrgInfo>
        </DivOrgDates>
      </DivInfoExpense>
    </DivOrgExpense>
  );
}
