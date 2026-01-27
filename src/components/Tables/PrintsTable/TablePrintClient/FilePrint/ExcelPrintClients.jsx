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
  FormatCPFText,
} from "./ExcelPrintClients.style";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../../../../utils/formatDateFront.mjs";

export default function ExcelPrintClients({
  printPopUp,
  infoClient,
  setPrintPopUp,
  brandCod,
}) {
  const FormatDate = new FormatDatesFront();
  const [tableInfo, setTableInfo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [infoCategory, setInfoCategory] = useState(null);
  const [messageTable, setMessageTable] = useState(
    `Tabela de Clientes do dia ${FormatDate.getDateNoHour()} - Maressencias`
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
    XLSX.writeFile(wb, "tabelaClientes.xlsx");
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

  const createListPrint = (dataClient) => {
    setShowList(true);
    if (showList) {
      setTableInfo(dataClient);
    }
  };

  useEffect(() => {
    createListPrint(infoClient);
  }, [infoClient]);

  useEffect(() => {
    if (brandCod) {
      setInfoCategory(brandCod.label);
    }
  }, [brandCod]);

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
                <NameInfo colSpan="4">
                  Essencias - {parseName(infoCategory)}
                </NameInfo>
              </RowInfo>
              <RowInfo>
                <NameInfo>ID</NameInfo>
                <NameInfo>Nome</NameInfo>
                <NameInfo>Documento</NameInfo>
                <NameInfo>Telefone</NameInfo>
                <NameInfo>CEP</NameInfo>
                <NameInfo>Bairro</NameInfo>
                <NameInfo>Cidade</NameInfo>
                <NameInfo>Estado</NameInfo>
              </RowInfo>
            </HeaderInfo>
            <BodyInfo>
              {tableInfo?.map((client, index) => {
                return (
                  <RowInfo key={index}>
                    <Item>{index + 1}</Item>
                    <Item>{parseName(client.clientName, client.lastName)}</Item>
                    <Item>
                      {client.docClient.length > 11 ? (
                        <FormatCPFText
                          displayType="text"
                          value={client.docClient}
                          format="CNPJ: ##.###.###/####-##"
                          allowEmptyFormatting
                          mask="_"
                        />
                      ) : (
                        <FormatCPFText
                          displayType="text"
                          value={client.docClient || "00000000000"}
                          format="CPF: ###.###.###-##"
                          allowEmptyFormatting
                          mask="_"
                        />
                      )}
                    </Item>
                    <Item>
                      <FormatCPFText
                        displayType="text"
                        value={client.numberPhone}
                        format="(##) #####-####"
                        allowEmptyFormatting
                        mask="_"
                      />
                    </Item>
                    <Item>
                      <FormatCPFText
                        displayType="text"
                        placeholder="CEP"
                        value={client?.cep}
                        format="#####-###"
                      />
                    </Item>
                    <Item>{client?.district}</Item>
                    <Item>{client?.city}</Item>
                    <Item>{client?.state}</Item>
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
