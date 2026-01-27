import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  DivUpdatePrint,
  SubmitPrint,
  DivBtnPrint,
  DivBtnClose,
  BtnClose,
  TableInfo,
  HeaderInfo,
  RowInfo,
  NameInfo,
  Item,
  DivDetailsItens,
  InputInfoTable,
  DivOrgTitle,
  BodyInfo,
  Value,
  PrintDetail,
  LabelPrint,
} from "./ExcelPrintOrders.style";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../../../../utils/formatDateFront.mjs";

export default function ExcelPrintOrders({
  printPopUp,
  infoOrders,
  setPrintPopUp,
  infoFilter,
}) {
  const [tableInfo, setTableInfo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [messageTable, setMessageTable] = useState(
    `Tabela de vendas do mês de ${infoFilter}  - Maressencias`
  );

  /* reference to the table element */
  const tbl = React.useRef();

  const xport = React.useCallback(() => {
    // Cria o workbook e obtém a primeira planilha
    const wb = XLSX.utils.table_to_book(tbl.current);
    const sheetName = wb.SheetNames[0];
    const worksheet = wb.Sheets[sheetName];

    // Converte a planilha em um array de arrays (linhas e colunas)
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Calcula a largura máxima de cada coluna
    const colWidths = rows[0].map((_, colIndex) => {
      let maxLength = 10; // largura mínima
      rows.forEach((row) => {
        const cellValue = row[colIndex];
        if (cellValue) {
          const length = cellValue.toString().length;
          if (length > maxLength) maxLength = length;
        }
      });
      return { wch: maxLength };
    });

    // Aplica as larguras calculadas na planilha
    worksheet["!cols"] = colWidths;

    // Exporta o arquivo
    XLSX.writeFile(wb, `Tabelavendas-${infoFilter}.xlsx`);
  }, []);

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  const createListPrint = (dataProduct) => {
    setShowList(true);
    if (showList) {
      setTableInfo(dataProduct);
    }
  };

  useEffect(() => {
    createListPrint(infoOrders);
  }, [infoOrders]);

  return (
    <DivUpdatePrint show={printPopUp}>
      <DivBtnClose>
        <BtnClose type="button" onClick={() => setPrintPopUp(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <LabelPrint>Digite uma mensagem ou use a mensagem padrão</LabelPrint>
        <InputInfoTable
          value={messageTable}
          type="textarea"
          onChange={(e) => setMessageTable(e.target.value)}
        />
      </DivOrgTitle>
      <DivDetailsItens>
        <PrintDetail>
          <TableInfo ref={tbl}>
            <HeaderInfo>
              <RowInfo>
                <NameInfo colSpan="4">{messageTable}</NameInfo>
              </RowInfo>
              <RowInfo>
                <NameInfo>ID</NameInfo>
                <NameInfo>Data de Venda</NameInfo>
                <NameInfo>Desconto</NameInfo>
                <NameInfo>Valor com Desconto</NameInfo>
                <NameInfo>Valor sem desconto</NameInfo>
                <NameInfo>Valor do Desconto</NameInfo>
                <NameInfo>Valor pago</NameInfo>
                <NameInfo>Valor do troco</NameInfo>
                <NameInfo>Cliente</NameInfo>
                <NameInfo>Cod. Itens</NameInfo>
              </RowInfo>
            </HeaderInfo>
            <BodyInfo>
              {tableInfo?.map((order, index) => {
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
                    <Item>{parseName(order?.nameClient)}</Item>
                    <Item>{order?.itens.join(", ")}</Item>
                  </RowInfo>
                );
              })}
            </BodyInfo>
          </TableInfo>
        </PrintDetail>
      </DivDetailsItens>
      <DivBtnPrint>
        <SubmitPrint type="button" onClick={xport}>
          Baixar
        </SubmitPrint>
      </DivBtnPrint>
    </DivUpdatePrint>
  );
}
