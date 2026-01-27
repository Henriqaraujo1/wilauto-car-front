import React from "react";
import {
  BtnClose,
  DivBtnClose,
  DivExplain,
  DivOrgContent,
  DivOrgExplain,
  DivOrgInfo,
  ExplainInfo,
  TitleExplain,
  TitleInfo,
} from "./InfoCashierStyle";
import { Close } from "@styled-icons/material";

export default function InfoCashier(props) {
  return (
    <DivOrgExplain show={props.showExplain}>
      <DivOrgInfo>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setShowExplain(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <TitleExplain>Explicação do cálculo do Caixa</TitleExplain>
        <DivExplain>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Valor do caixa aberto</TitleInfo> - Valor que o caixa é
              aberto no inicio do dia
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Quantidade de Vendas</TitleInfo> - A quantidade de
              vendas do dia
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Total de vendas</TitleInfo> - Valor que foi vendido no
              dia, e abaixo separando as formas de pagamento das vendas
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Forma de Pagamentos</TitleInfo> - Informam o valor e a
              quantidade de vendas feitas em cada tipo de pagamento (dinheiro,
              Pix, cartão, etc.).
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Entrada Fisica (Dinheiro)</TitleInfo> - Valor total em
              espécie que entrou no caixa durante o dia, ou seja, o dinheiro
              real entregue pelos clientes, antes do troco ser descontado. Esse
              valor é importante para conciliar o dinheiro disponível no caixa
              com as vendas realizadas.
            </ExplainInfo>
          </DivOrgContent>

          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Valor do troco</TitleInfo> - O troco é uma saída de
              dinheiro físico e reduz o valor no caixa. Por exemplo, se o caixa
              começa com R$ 500,00 e um cliente paga R$ 100,00 por um produto de
              R$ 80,00, o operador dá R$ 20,00 de troco. O saldo será R$ 580,00
              (500 + 100 - 20). Sem registrar o troco, o saldo não bate com o
              dinheiro físico.
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Valor do pedido</TitleInfo> - Valor pago no dia de
              compra de produtos para a loja
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Total de Despesas</TitleInfo> - Valor foi gasto com
              despesas pagas no dia e abaixo a divisão por tipo de pagamento
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Valor previsto do caixa</TitleInfo> - O valor previsto
              do caixa é o total calculado pelo sistema com base nas entradas e
              saídas registradas em dinheiro físico. Ele indica quanto deveria
              estar disponível em espécie no caixa.
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleInfo>Valor previsto em Conta</TitleInfo> - O valor previsto
              em conta no banco é o total calculado pelo sistema com base nas
              entradas e saídas registradas em pagamentos digitais, como cartão
              ou PIX. Ele indica quanto deve ser recebido na conta bancária.
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleExplain>
                Exemplo do Calculo de Previsão do caixa
              </TitleExplain>
              Valor do Caixa Aberto + Entradas - Saidas = Valor do Caixa
              <TitleExplain>500 + 2.177,50 - 342 = 1.031,00</TitleExplain>
            </ExplainInfo>
          </DivOrgContent>
          <DivOrgContent>
            <ExplainInfo>
              <TitleExplain>
                Exemplo do Calculo de Previsão do caixa
              </TitleExplain>
              Pix + Cartao - Pix Despesas = Saldo em Conta
              <TitleExplain>773,50 + 676,00 - 17,00 = 1.132,50</TitleExplain>
            </ExplainInfo>
          </DivOrgContent>
        </DivExplain>
      </DivOrgInfo>
    </DivOrgExplain>
  );
}
