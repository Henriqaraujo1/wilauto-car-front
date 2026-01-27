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
  BtnPdf,
} from "./ExcelPrintProduct.style";
import { Close } from "@styled-icons/material";
import html2pdf from "html2pdf.js";
import FormatDatesFront from "../../../../../utils/formatDateFront.mjs";

export default function ExcelPrintProduct({
  printPopUp,
  infoProduct,
  setPrintPopUp,
  brandCod,
}) {
  const FormatDate = new FormatDatesFront();
  const [tableInfo, setTableInfo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [infoCategory, setInfoCategory] = useState(null);
  const [messageTable, setMessageTable] = useState(
    `Tabela de Preço do dia ${FormatDate.getDateNoHour()} - ${import.meta.env.VITE_NAME_EMPRESA}`
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
    XLSX.writeFile(wb, "TabelaProdutos.xlsx");
  }, []);

  const exportPDF = () => {
    const element = tbl.current;

    const options = {
      margin: 0.3,
      filename: `Tabela de Produto de ${FormatDate.getDateNoHour()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  };

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
    createListPrint(infoProduct);
  }, [infoProduct]);

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
                <NameInfo>Codigo</NameInfo>
                <NameInfo>Preço de Venda</NameInfo>
              </RowInfo>
            </HeaderInfo>
            <BodyInfo>
              {tableInfo?.map((product, index) => {
                return (
                  <RowInfo key={index}>
                    <Item>{index + 1}</Item>
                    <Item>{parseName(product.nameProduct)}</Item>
                    <Item>{product.codProd}</Item>
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
                  </RowInfo>
                );
              })}
            </BodyInfo>
          </TableInfo>
        </PrintDetail>
      </DivDetailsItens>
      <DivBtnPrint>
        <SubmitPrint type="button" onClick={xport}>
          Baixar Excel
        </SubmitPrint>
        <BtnPdf type="button" onClick={exportPDF}>
          Baixar PDF
        </BtnPdf>
      </DivBtnPrint>
    </DivUpdatePrint>
  );
}
