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
  PrintDetail,
  LabelPrint,
  BtnPdf,
  Value,
  FootInfo,
  DivImg,
  Img,
} from "./ExcelPrintStock.style";
import Logo from "../../../../../images/LogoInicio.png";
import { Close } from "@styled-icons/material";
import html2pdf from "html2pdf.js";
import FormatDatesFront from "../../../../../utils/formatDateFront.mjs";

export default function ExcelPrintStock({
  printPopUp,
  infoStock,
  setPrintPopUp,
}) {
  const FormatDate = new FormatDatesFront();
  const [tableInfo, setTableInfo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [qtdFinal, setQtdFinal] = useState(null);
  const [totalFinal, setTotalFinal] = useState(null);

  const [messageTable, setMessageTable] = useState(
    `Tabela do estoque do dia ${FormatDate.getDateNoHour()}`
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
    XLSX.writeFile(wb, "TabelaEstoque.xlsx");
  }, []);

  const exportPDF = () => {
    const element = tbl.current;

    const options = {
      margin: 0.3,
      filename: `Tabela do Estoque de ${FormatDate.getDateNoHour()}.pdf`,
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

  const createListPrint = (dataStock) => {
    setShowList(true);
    let finalQtd = 0;
    let finalTotalOrder = 0;
    dataStock?.forEach((itemStock) => {
      finalQtd += itemStock.totalQtd;
      finalTotalOrder += itemStock.priceTotal;
    });
    setQtdFinal(finalQtd);
    setTotalFinal(finalTotalOrder);
    if (showList) {
      setTableInfo(dataStock);
    }
  };

  useEffect(() => {
    createListPrint(infoStock);
  }, [infoStock]);

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
                <NameInfo colSpan="4">
                  <DivImg>
                    <Img src={Logo} alt="imagem da empresa" />
                  </DivImg>
                  {messageTable}
                </NameInfo>
              </RowInfo>
              <RowInfo>
                <NameInfo>ID</NameInfo>
                <NameInfo>Nome</NameInfo>
                <NameInfo>Codigo</NameInfo>
                <NameInfo>Qtd em Estoque no Sistema</NameInfo>
                <NameInfo>Valor Total</NameInfo>
                <NameInfo>Qtd em Estoque Real</NameInfo>
              </RowInfo>
            </HeaderInfo>
            <BodyInfo>
              {tableInfo?.map((product, index) => {
                return (
                  <RowInfo key={index}>
                    <Item>{index + 1}</Item>
                    <Item>{parseName(product.nameProduct)}</Item>
                    <Item>{product.codProd}</Item>

                    {product.totalQtd > 1 ? (
                      <Item>{product.totalQtd} Kg</Item>
                    ) : (
                      <Item>{product.totalQtd} g</Item>
                    )}
                    <Item>
                      <Value
                        displayType="text"
                        value={product.priceTotal}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </Item>
                    <Item></Item>
                  </RowInfo>
                );
              })}
            </BodyInfo>
            <FootInfo>
              <RowInfo>
                <NameInfo>Total</NameInfo>
                <NameInfo></NameInfo>
                <NameInfo></NameInfo>
                {qtdFinal > 0 ? (
                  <NameInfo>{qtdFinal}Kg</NameInfo>
                ) : (
                  <NameInfo>{qtdFinal}g</NameInfo>
                )}
                <NameInfo>
                  <Value
                    displayType="text"
                    value={totalFinal}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                  />
                </NameInfo>
              </RowInfo>
            </FootInfo>
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
