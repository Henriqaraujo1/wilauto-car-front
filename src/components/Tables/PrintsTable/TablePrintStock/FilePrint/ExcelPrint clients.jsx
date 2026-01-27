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
} from "./ExcelPrint.style";
import { Close } from "@styled-icons/material";
import LogoCompany from "../../../../images/LogoInicio.png";
import FormatDatesFront from "../../../../utils/formatDateFront.mjs";

export default function ExcelPrint({
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
    `Tabela de Preço do dia ${FormatDate.getDateNoHour()} - Maressencias`
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
    XLSX.writeFile(wb, "testeTabela.xlsx");
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
                <NameInfo>Preço em Dolar</NameInfo>
                <NameInfo>Preço em Dolar</NameInfo>
                <NameInfo>Preço em Dolar</NameInfo>
                <NameInfo>Preço em Dolar</NameInfo>
                <NameInfo>Preço em Dolar</NameInfo>
              </RowInfo>
            </HeaderInfo>
            <BodyInfo>
                <tr>
                  <td>Adriany Leão Lemes</td>
                  <td>Brasilia</td>
                  <td>DF</td>
                  <td>adrianyleao7@gmail.com</td>
                  <td>61 98570-3010 </td>
                  <td>cpf: 695.858.061-34</td>
                  <td>
                    <a href="cliente.php?id=1287">Ver</a> <br />
                    <a href="edita-cliente.php?id=1287">Editar</a> <br />
                    <a href="destinatario.php?id=1287" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1287&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Anderson Nery - COSMETOLOGIA</td>
                  <td>NAO INFOR MADA</td>
                  <td>SP</td>
                  <td>anderson.gothard@hotmail.com</td>
                  <td>71 98614-7156</td>
                  <td>
                    <a href="cliente.php?id=1202">Ver</a> <br />
                    <a href="edita-cliente.php?id=1202">Editar</a> <br />
                    <a href="destinatario.php?id=1202" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1202&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Bravi Comércio e Indústria de Produtos Odontológicos S.A
                  </td>
                  <td>ITAJAÍ</td>
                  <td>SC</td>
                  <td>taize.porepp@bravi.ind.br</td>
                  <td>(47) 3398-4375</td>
                  <td>
                    <a href="cliente.php?id=701">Ver</a> <br />
                    <a href="edita-cliente.php?id=701">Editar</a> <br />
                    <a href="destinatario.php?id=701" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=701&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Camille Victoria</td>
                  <td>Rio de Janeiro</td>
                  <td>SP</td>
                  <td>miihkjg30@gmail.com</td>
                  <td>21 9 9253 3286</td>
                  <td>
                    <a href="cliente.php?id=1068">Ver</a> <br />
                    <a href="edita-cliente.php?id=1068">Editar</a> <br />
                    <a href="destinatario.php?id=1068" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1068&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos de Almeida Filho</td>
                  <td>Assis</td>
                  <td>SP</td>
                  <td>kaco1987@gmail.com</td>
                  <td>18-99694-2679 </td>
                  <td>cpf: 345.330.388-16 RG: 40.820.</td>
                  <td>
                    <a href="cliente.php?id=1035">Ver</a> <br />
                    <a href="edita-cliente.php?id=1035">Editar</a> <br />
                    <a href="destinatario.php?id=1035" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1035&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudia</td>
                  <td>não informado</td>
                  <td>MA</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>41 9161-5519</td>
                  <td>
                    <a href="cliente.php?id=1174">Ver</a> <br />
                    <a href="edita-cliente.php?id=1174">Editar</a> <br />
                    <a href="destinatario.php?id=1174" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1174&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudia</td>
                  <td>não informado</td>
                  <td>MA</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>41 9161-5519</td>
                  <td>
                    <a href="cliente.php?id=1175">Ver</a> <br />
                    <a href="edita-cliente.php?id=1175">Editar</a> <br />
                    <a href="destinatario.php?id=1175" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1175&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRS BORDADOS - ROBERTO RODRIGUES</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>roberto.rodrigues.simao@gmail.com</td>
                  <td>(15) 99769-0707</td>
                  <td>
                    <a href="cliente.php?id=294">Ver</a> <br />
                    <a href="edita-cliente.php?id=294">Editar</a> <br />
                    <a href="destinatario.php?id=294" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=294&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Edyjhonson Lacerda Pinheiro</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>caronte.ag@hotmail.com</td>
                  <td>11999959274</td>
                  <td>
                    <a href="cliente.php?id=646">Ver</a> <br />
                    <a href="edita-cliente.php?id=646">Editar</a> <br />
                    <a href="destinatario.php?id=646" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=646&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDYLEINE / RODRIGO RIBEIRO DOMINGOS REBUSTINE</td>
                  <td>CAMPO GRANDE SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13996947029</td>
                  <td>
                    <a href="cliente.php?id=787">Ver</a> <br />
                    <a href="edita-cliente.php?id=787">Editar</a> <br />
                    <a href="destinatario.php?id=787" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=787&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Everton Gusmão da Silva</td>
                  <td>São José dos Campos</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>12 99643-7783</td>
                  <td>
                    <a href="cliente.php?id=1196">Ver</a> <br />
                    <a href="edita-cliente.php?id=1196">Editar</a> <br />
                    <a href="destinatario.php?id=1196" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1196&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Geisiane Pereira bezerra</td>
                  <td>00000000</td>
                  <td>SP</td>
                  <td>geisianebezerra10@gmail.com</td>
                  <td>92 99258-9609</td>
                  <td>
                    <a href="cliente.php?id=1258">Ver</a> <br />
                    <a href="edita-cliente.php?id=1258">Editar</a> <br />
                    <a href="destinatario.php?id=1258" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1258&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Heloisa Maria de Castro Miranda Paixao</td>
                  <td>Belo Horizonte</td>
                  <td>MG</td>
                  <td>helopaixao@yahoo.com.br</td>
                  <td>31 9 8466-5853</td>
                  <td>
                    <a href="cliente.php?id=1084">Ver</a> <br />
                    <a href="edita-cliente.php?id=1084">Editar</a> <br />
                    <a href="destinatario.php?id=1084" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1084&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOÃO PAULO CAMPOS ALVES FERREIRA.</td>
                  <td>TAUBATÉ</td>
                  <td>SP</td>
                  <td>linekersp@yahoo.com.br</td>
                  <td>(12) 98168-1120</td>
                  <td>
                    <a href="cliente.php?id=247">Ver</a> <br />
                    <a href="edita-cliente.php?id=247">Editar</a> <br />
                    <a href="destinatario.php?id=247" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=247&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leonardo Fernando Pereira dos Santos.</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>leonardo.fernando1980@gmail.com</td>
                  <td>000000</td>
                  <td>
                    <a href="cliente.php?id=76">Ver</a> <br />
                    <a href="edita-cliente.php?id=76">Editar</a> <br />
                    <a href="destinatario.php?id=76" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=76&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lívia Querino</td>
                  <td>NAO FORNECIDA</td>
                  <td>MG</td>
                  <td>livia.querino@hotmail.com</td>
                  <td>31 98843-6622</td>
                  <td>
                    <a href="cliente.php?id=1260">Ver</a> <br />
                    <a href="edita-cliente.php?id=1260">Editar</a> <br />
                    <a href="destinatario.php?id=1260" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1260&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis Cesar Pereira de Almeida Filho</td>
                  <td>NÃO FORNECIDA</td>
                  <td>SP</td>
                  <td>lp553335@gmail.com</td>
                  <td>71 98140-3483</td>
                  <td>
                    <a href="cliente.php?id=1105">Ver</a> <br />
                    <a href="edita-cliente.php?id=1105">Editar</a> <br />
                    <a href="destinatario.php?id=1105" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1105&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis Fernando Morales de Sousa</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>Luisfernandomoralescostasousa1@gmail.com</td>
                  <td>11 99170-7561</td>
                  <td>
                    <a href="cliente.php?id=1221">Ver</a> <br />
                    <a href="edita-cliente.php?id=1221">Editar</a> <br />
                    <a href="destinatario.php?id=1221" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1221&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marco Aurélio Souza</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marcosphfilho@gmail.com</td>
                  <td>21 98652-7923 </td>
                  <td>cpf: 087.880.617-28</td>
                  <td>
                    <a href="cliente.php?id=980">Ver</a> <br />
                    <a href="edita-cliente.php?id=980">Editar</a> <br />
                    <a href="destinatario.php?id=980" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=980&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Verginia Afonso</td>
                  <td>não fornecida</td>
                  <td>SP</td>
                  <td>mariavirgineaafonsoafonso@gmail.com</td>
                  <td>24992621175</td>
                  <td>
                    <a href="cliente.php?id=1094">Ver</a> <br />
                    <a href="edita-cliente.php?id=1094">Editar</a> <br />
                    <a href="destinatario.php?id=1094" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1094&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Martina - Voccia Peixoto Comércio Varejista de Souvenires
                    Bijuterias e Artesanato Ltda
                  </td>
                  <td>desconhecida</td>
                  <td>RJ</td>
                  <td>martinavoccia@gmail.com</td>
                  <td>22988176017</td>
                  <td>
                    <a href="cliente.php?id=1155">Ver</a> <br />
                    <a href="edita-cliente.php?id=1155">Editar</a> <br />
                    <a href="destinatario.php?id=1155" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1155&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Plínio MLN Neto</td>
                  <td>GUARUJA</td>
                  <td>SP</td>
                  <td>plinionetojaneiro14@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=551">Ver</a> <br />
                    <a href="edita-cliente.php?id=551">Editar</a> <br />
                    <a href="destinatario.php?id=551" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=551&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>.</td>
                  <td>9999999999</td>
                  <td>SP</td>
                  <td>jfkadfka@gdg.com</td>
                  <td>99999</td>
                  <td>
                    <a href="cliente.php?id=1279">Ver</a> <br />
                    <a href="edita-cliente.php?id=1279">Editar</a> <br />
                    <a href="destinatario.php?id=1279" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1279&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    A. P. C. ALVES COMÉRCIO DE ARTIGOS DE PERFUMARIA E ESSÊNCIAS
                  </td>
                  <td>BONSUCESSO</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>21980849703 </td>
                  <td>cnpj 19.204.170/0001-16</td>
                  <td>
                    <a href="cliente.php?id=805">Ver</a> <br />
                    <a href="edita-cliente.php?id=805">Editar</a> <br />
                    <a href="destinatario.php?id=805" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=805&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ABRAAO MAROTE</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>000000</td>
                  <td>
                    <a href="cliente.php?id=109">Ver</a> <br />
                    <a href="edita-cliente.php?id=109">Editar</a> <br />
                    <a href="destinatario.php?id=109" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=109&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ABRAHAM WILHELMIN AL - BAS</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>abrahamal-bas@hotmail.com</td>
                  <td>11-24581797 </td>
                  <td>cnpj: 20388940000107</td>
                  <td>
                    <a href="cliente.php?id=81">Ver</a> <br />
                    <a href="edita-cliente.php?id=81">Editar</a> <br />
                    <a href="destinatario.php?id=81" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=81&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ABT-LOG TRANSPORTES EIRELI - EPP</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>coletas@abtlog.com.br</td>
                  <td>11 2085-4460</td>
                  <td>
                    <a href="cliente.php?id=833">Ver</a> <br />
                    <a href="edita-cliente.php?id=833">Editar</a> <br />
                    <a href="destinatario.php?id=833" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=833&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADALBERTO JOSE MACHADO</td>
                  <td>BARBOSA</td>
                  <td>SP</td>
                  <td>adalbertobrasil2009@hotmail.com</td>
                  <td>18 36551513 / 18 991301707</td>
                  <td>
                    <a href="cliente.php?id=442">Ver</a> <br />
                    <a href="edita-cliente.php?id=442">Editar</a> <br />
                    <a href="destinatario.php?id=442" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=442&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADELMA PEREIRA</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>csantos998@gmail.com</td>
                  <td>(71) 3321-5149</td>
                  <td>
                    <a href="cliente.php?id=163">Ver</a> <br />
                    <a href="edita-cliente.php?id=163">Editar</a> <br />
                    <a href="destinatario.php?id=163" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=163&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADEMIR DE LIMA ALBUQUERQUE</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>ADLADEXTER@HOTMAIL.COM</td>
                  <td>85 981721-678/98707-5716</td>
                  <td>
                    <a href="cliente.php?id=78">Ver</a> <br />
                    <a href="edita-cliente.php?id=78">Editar</a> <br />
                    <a href="destinatario.php?id=78" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=78&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adevair Paulino</td>
                  <td>SINOP</td>
                  <td>MT</td>
                  <td>VENDAADEVAIR@GMAIL.COM</td>
                  <td>11 98354-1390 </td>
                  <td>cnpj - 45.299.184.0006/70</td>
                  <td>
                    <a href="cliente.php?id=1284">Ver</a> <br />
                    <a href="edita-cliente.php?id=1284">Editar</a> <br />
                    <a href="destinatario.php?id=1284" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1284&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adevan Torres da Silva ( Fátima )</td>
                  <td>Araguaína</td>
                  <td>TO</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>63 99226-0770 ou 63 3414-4043 </td>
                  <td>cnpj 13.071.186/0</td>
                  <td>
                    <a href="cliente.php?id=1091">Ver</a> <br />
                    <a href="edita-cliente.php?id=1091">Editar</a> <br />
                    <a href="destinatario.php?id=1091" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1091&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADIL MONTEIRO DE ARAUJO</td>
                  <td>LONDRINA</td>
                  <td>PR</td>
                  <td>adil_monteiro@hotmail.com</td>
                  <td>(43) 999855245</td>
                  <td>
                    <a href="cliente.php?id=75">Ver</a> <br />
                    <a href="edita-cliente.php?id=75">Editar</a> <br />
                    <a href="destinatario.php?id=75" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=75&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adilson Ferreira da Silva (Alexandre Galio)</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>11 99318-2637 </td>
                  <td>cpf 165.962.618-83 Alexandre</td>
                  <td>
                    <a href="cliente.php?id=1344">Ver</a> <br />
                    <a href="edita-cliente.php?id=1344">Editar</a> <br />
                    <a href="destinatario.php?id=1344" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1344&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adilson Luiz Morais</td>
                  <td>SÃO SOJÉ DOS CAMPOS</td>
                  <td>SP</td>
                  <td>addisonproj@gmail.com</td>
                  <td>12 981716210</td>
                  <td>
                    <a href="cliente.php?id=190">Ver</a> <br />
                    <a href="edita-cliente.php?id=190">Editar</a> <br />
                    <a href="destinatario.php?id=190" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=190&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADILSON MOREIRA</td>
                  <td>Ibicaraí</td>
                  <td>BA</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>73 3242-1803 / 73 98195-4512</td>
                  <td>
                    <a href="cliente.php?id=382">Ver</a> <br />
                    <a href="edita-cliente.php?id=382">Editar</a> <br />
                    <a href="destinatario.php?id=382" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=382&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adoilson Custódio dos Santos ( Maninho )</td>
                  <td>Praia Grande</td>
                  <td>SP</td>
                  <td>adoilson2021@gmail.com</td>
                  <td>13 997209297</td>
                  <td>
                    <a href="cliente.php?id=954">Ver</a> <br />
                    <a href="edita-cliente.php?id=954">Editar</a> <br />
                    <a href="destinatario.php?id=954" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=954&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADRIANA BARBOSA</td>
                  <td>COPACABANA</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>22981269554</td>
                  <td>
                    <a href="cliente.php?id=864">Ver</a> <br />
                    <a href="edita-cliente.php?id=864">Editar</a> <br />
                    <a href="destinatario.php?id=864" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=864&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriana da Silva Lima</td>
                  <td>Mesquista</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 99678-9729 </td>
                  <td>cpf 12454353709</td>
                  <td>
                    <a href="cliente.php?id=1331">Ver</a> <br />
                    <a href="edita-cliente.php?id=1331">Editar</a> <br />
                    <a href="destinatario.php?id=1331" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1331&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADRIANA LAUDARES</td>
                  <td>FORMIGA</td>
                  <td>MG</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=409">Ver</a> <br />
                    <a href="edita-cliente.php?id=409">Editar</a> <br />
                    <a href="destinatario.php?id=409" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=409&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriana Moura</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13991081958</td>
                  <td>
                    <a href="cliente.php?id=930">Ver</a> <br />
                    <a href="edita-cliente.php?id=930">Editar</a> <br />
                    <a href="destinatario.php?id=930" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=930&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriana Moura</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13991081958</td>
                  <td>
                    <a href="cliente.php?id=931">Ver</a> <br />
                    <a href="edita-cliente.php?id=931">Editar</a> <br />
                    <a href="destinatario.php?id=931" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=931&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriana Moura</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13991081958</td>
                  <td>
                    <a href="cliente.php?id=932">Ver</a> <br />
                    <a href="edita-cliente.php?id=932">Editar</a> <br />
                    <a href="destinatario.php?id=932" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=932&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriana Sanches</td>
                  <td>Santa Cruz</td>
                  <td>SP</td>
                  <td>adrianasanchezlaura@gmail.com</td>
                  <td>591 67977147</td>
                  <td>
                    <a href="cliente.php?id=1062">Ver</a> <br />
                    <a href="edita-cliente.php?id=1062">Editar</a> <br />
                    <a href="destinatario.php?id=1062" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1062&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADRIANA SANTOS</td>
                  <td>SANTA ROSA DO VITERBO</td>
                  <td>SP</td>
                  <td>adrianafst@yahoo.com.br</td>
                  <td>16 3954-1840 / 16 99172-2861</td>
                  <td>
                    <a href="cliente.php?id=198">Ver</a> <br />
                    <a href="edita-cliente.php?id=198">Editar</a> <br />
                    <a href="destinatario.php?id=198" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=198&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriano de Sousa Estevam</td>
                  <td>Morada Nova</td>
                  <td>CE</td>
                  <td>contato@adressencias.com.br</td>
                  <td>85 8705-2011</td>
                  <td>
                    <a href="cliente.php?id=669">Ver</a> <br />
                    <a href="edita-cliente.php?id=669">Editar</a> <br />
                    <a href="destinatario.php?id=669" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=669&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADRIANO GOMES / JANAINA RAMOS</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>gressenciaseprodutosartesanais@gmail.com</td>
                  <td>81 92000-5010</td>
                  <td>
                    <a href="cliente.php?id=638">Ver</a> <br />
                    <a href="edita-cliente.php?id=638">Editar</a> <br />
                    <a href="destinatario.php?id=638" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=638&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ADRIANO MIUDO / SECRET PLAY</td>
                  <td>MOGI DAS CRUZES</td>
                  <td>SP</td>
                  <td>adriano@secretplay.com.br</td>
                  <td>11 35652810</td>
                  <td>
                    <a href="cliente.php?id=510">Ver</a> <br />
                    <a href="edita-cliente.php?id=510">Editar</a> <br />
                    <a href="destinatario.php?id=510" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=510&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriano/Nathalia Pinheiro Xavier</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8587052011</td>
                  <td>
                    <a href="cliente.php?id=1238">Ver</a> <br />
                    <a href="edita-cliente.php?id=1238">Editar</a> <br />
                    <a href="destinatario.php?id=1238" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1238&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriano/Nathalia Pinheiro Xavier</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8587052011</td>
                  <td>
                    <a href="cliente.php?id=1239">Ver</a> <br />
                    <a href="edita-cliente.php?id=1239">Editar</a> <br />
                    <a href="destinatario.php?id=1239" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1239&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adriany Leão Lemes</td>
                  <td>Aguas claras sul</td>
                  <td>SP</td>
                  <td>adrianyleao7@gmail.com</td>
                  <td>Brasilia DF</td>
                  <td>
                    <a href="cliente.php?id=1290">Ver</a> <br />
                    <a href="edita-cliente.php?id=1290">Editar</a> <br />
                    <a href="destinatario.php?id=1290" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1290&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adrielle Alves</td>
                  <td>Tapejara</td>
                  <td>PR</td>
                  <td>alvesadrielle199@gmail.com</td>
                  <td>4498902390</td>
                  <td>
                    <a href="cliente.php?id=1247">Ver</a> <br />
                    <a href="edita-cliente.php?id=1247">Editar</a> <br />
                    <a href="destinatario.php?id=1247" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1247&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adryene Salzupyn</td>
                  <td>Guarulhos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11932036880</td>
                  <td>
                    <a href="cliente.php?id=1022">Ver</a> <br />
                    <a href="edita-cliente.php?id=1022">Editar</a> <br />
                    <a href="destinatario.php?id=1022" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1022&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Adryene Salzupyn</td>
                  <td>Guarulhos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11932036880</td>
                  <td>
                    <a href="cliente.php?id=1023">Ver</a> <br />
                    <a href="edita-cliente.php?id=1023">Editar</a> <br />
                    <a href="destinatario.php?id=1023" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1023&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AGAMENON SANTANA</td>
                  <td>FORTALEZA</td>
                  <td>SP</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=102">Ver</a> <br />
                    <a href="edita-cliente.php?id=102">Editar</a> <br />
                    <a href="destinatario.php?id=102" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=102&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AGENOR NESTOR KENNERICH</td>
                  <td>LAJADO</td>
                  <td>RS</td>
                  <td>ankquimica@certelnet.com.br</td>
                  <td>51 99955146</td>
                  <td>
                    <a href="cliente.php?id=229">Ver</a> <br />
                    <a href="edita-cliente.php?id=229">Editar</a> <br />
                    <a href="destinatario.php?id=229" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=229&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Agnaldo de Oliveira</td>
                  <td>Ibiúna</td>
                  <td>SP</td>
                  <td>mara.oliveira201066@yahoo.com</td>
                  <td>15997249269</td>
                  <td>
                    <a href="cliente.php?id=916">Ver</a> <br />
                    <a href="edita-cliente.php?id=916">Editar</a> <br />
                    <a href="destinatario.php?id=916" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=916&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AGNALDO OLIVEIRA</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=110">Ver</a> <br />
                    <a href="edita-cliente.php?id=110">Editar</a> <br />
                    <a href="destinatario.php?id=110" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=110&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Agnaldo Pereira de Souza</td>
                  <td>CAMPO GRANDE</td>
                  <td>MS</td>
                  <td>agnaldopereirasouza444@gmail.com</td>
                  <td>67 992781406 </td>
                  <td>cpf 200.530.531-68</td>
                  <td>
                    <a href="cliente.php?id=472">Ver</a> <br />
                    <a href="edita-cliente.php?id=472">Editar</a> <br />
                    <a href="destinatario.php?id=472" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=472&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AGNES AP. OLIVEIRA</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>tinellioliver@bol.com.br</td>
                  <td>11 997642-0163</td>
                  <td>
                    <a href="cliente.php?id=375">Ver</a> <br />
                    <a href="edita-cliente.php?id=375">Editar</a> <br />
                    <a href="destinatario.php?id=375" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=375&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Agostinho Mario dos Santos Geraldo</td>
                  <td>Elias Fausto SP</td>
                  <td>SP</td>
                  <td>agostinhomsgeraldo@gmail.com</td>
                  <td>19992997879</td>
                  <td>
                    <a href="cliente.php?id=906">Ver</a> <br />
                    <a href="edita-cliente.php?id=906">Editar</a> <br />
                    <a href="destinatario.php?id=906" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=906&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Agreste Cosmética Brasil Ltda.</td>
                  <td>Almirante Tamandaré</td>
                  <td>PR</td>
                  <td>administrativo@agrestebrasil.com.br</td>
                  <td>41 9226-7317</td>
                  <td>
                    <a href="cliente.php?id=953">Ver</a> <br />
                    <a href="edita-cliente.php?id=953">Editar</a> <br />
                    <a href="destinatario.php?id=953" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=953&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AILA ARIANE DE CASTRO MEIRA</td>
                  <td>GUARARAPES</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=397">Ver</a> <br />
                    <a href="edita-cliente.php?id=397">Editar</a> <br />
                    <a href="destinatario.php?id=397" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=397&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AILTON ALVES</td>
                  <td>SAO JOSE DOS CAMPOS</td>
                  <td>SP</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>12 3911-1970</td>
                  <td>
                    <a href="cliente.php?id=111">Ver</a> <br />
                    <a href="edita-cliente.php?id=111">Editar</a> <br />
                    <a href="destinatario.php?id=111" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=111&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aislan Alexandre</td>
                  <td>Parana</td>
                  <td>PR</td>
                  <td>controlbbcnew@hotmail.com</td>
                  <td>28999007382</td>
                  <td>
                    <a href="cliente.php?id=1177">Ver</a> <br />
                    <a href="edita-cliente.php?id=1177">Editar</a> <br />
                    <a href="destinatario.php?id=1177" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1177&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aislan Alexandre</td>
                  <td>Parana</td>
                  <td>PR</td>
                  <td>controlbbcnew@hotmail.com</td>
                  <td>28999007382</td>
                  <td>
                    <a href="cliente.php?id=1178">Ver</a> <br />
                    <a href="edita-cliente.php?id=1178">Editar</a> <br />
                    <a href="destinatario.php?id=1178" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1178&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aislan Alexandre</td>
                  <td>Guaratuba</td>
                  <td>PR</td>
                  <td>controlbbcnew@hotmail.com</td>
                  <td>28999007382</td>
                  <td>
                    <a href="cliente.php?id=1179">Ver</a> <br />
                    <a href="edita-cliente.php?id=1179">Editar</a> <br />
                    <a href="destinatario.php?id=1179" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1179&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aislan Alexandre da Silva</td>
                  <td>Iconha</td>
                  <td>ES</td>
                  <td>controlbbcnew@hotmail.com</td>
                  <td>28 35372586 / 9990007382</td>
                  <td>
                    <a href="cliente.php?id=293">Ver</a> <br />
                    <a href="edita-cliente.php?id=293">Editar</a> <br />
                    <a href="destinatario.php?id=293" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=293&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alain Viana</td>
                  <td>MANAUS AM</td>
                  <td>AP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>9284445480</td>
                  <td>
                    <a href="cliente.php?id=806">Ver</a> <br />
                    <a href="edita-cliente.php?id=806">Editar</a> <br />
                    <a href="destinatario.php?id=806" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=806&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alan de Oliveira</td>
                  <td>Itaguaí</td>
                  <td>RJ</td>
                  <td>josuealanoliveira@gmail.com</td>
                  <td>21 97437-6442 </td>
                  <td>cpf: 093.281.417-45</td>
                  <td>
                    <a href="cliente.php?id=995">Ver</a> <br />
                    <a href="edita-cliente.php?id=995">Editar</a> <br />
                    <a href="destinatario.php?id=995" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=995&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALANY MORAIS</td>
                  <td>UBERABA</td>
                  <td>MG</td>
                  <td>alanymorais6@gmail.com</td>
                  <td>34 9 9184-5163</td>
                  <td>
                    <a href="cliente.php?id=349">Ver</a> <br />
                    <a href="edita-cliente.php?id=349">Editar</a> <br />
                    <a href="destinatario.php?id=349" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=349&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alaôr de Lima Bueno</td>
                  <td>Florianópolis</td>
                  <td>SC</td>
                  <td>alaorbueno@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=626">Ver</a> <br />
                    <a href="edita-cliente.php?id=626">Editar</a> <br />
                    <a href="destinatario.php?id=626" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=626&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alberto dos Santos</td>
                  <td>Cubatão</td>
                  <td>SP</td>
                  <td>alber-to_2007@hotmail.com</td>
                  <td>14988275504</td>
                  <td>
                    <a href="cliente.php?id=1005">Ver</a> <br />
                    <a href="edita-cliente.php?id=1005">Editar</a> <br />
                    <a href="destinatario.php?id=1005" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1005&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALCIDES DE SOUZA</td>
                  <td>GOIÂNIA</td>
                  <td>GO</td>
                  <td>ALCIDESDSOUZA@UOL.COM.BR</td>
                  <td>62 9447-6469 </td>
                  <td>cpf: 847611648-91</td>
                  <td>
                    <a href="cliente.php?id=82">Ver</a> <br />
                    <a href="edita-cliente.php?id=82">Editar</a> <br />
                    <a href="destinatario.php?id=82" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=82&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alda Cristina Gomes Motta</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>aldamotta8778@gmail.com</td>
                  <td>(021) 967276350 / </td>
                  <td>cpf - 00312980795</td>
                  <td>
                    <a href="cliente.php?id=543">Ver</a> <br />
                    <a href="edita-cliente.php?id=543">Editar</a> <br />
                    <a href="destinatario.php?id=543" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=543&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALDENIRA FONSECA</td>
                  <td>NATAL</td>
                  <td>RN</td>
                  <td>aldenirafonseca@yahoo.com.br</td>
                  <td>84 981139704</td>
                  <td>
                    <a href="cliente.php?id=292">Ver</a> <br />
                    <a href="edita-cliente.php?id=292">Editar</a> <br />
                    <a href="destinatario.php?id=292" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=292&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEF DA SILVA BEZERRA</td>
                  <td>João Pessoa</td>
                  <td>PB</td>
                  <td>alefsilva190@gmail.com</td>
                  <td>83 9648-6888 - </td>
                  <td>cpf 10256655464</td>
                  <td>
                    <a href="cliente.php?id=762">Ver</a> <br />
                    <a href="edita-cliente.php?id=762">Editar</a> <br />
                    <a href="destinatario.php?id=762" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=762&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alessandra Ferreira Correa</td>
                  <td>Poá</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11996835354</td>
                  <td>
                    <a href="cliente.php?id=868">Ver</a> <br />
                    <a href="edita-cliente.php?id=868">Editar</a> <br />
                    <a href="destinatario.php?id=868" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=868&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALESSANDRO A. MOLINA</td>
                  <td>SÃO JOSÉ DO RIO PRETO</td>
                  <td>SP</td>
                  <td>molina.lerp@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=226">Ver</a> <br />
                    <a href="edita-cliente.php?id=226">Editar</a> <br />
                    <a href="destinatario.php?id=226" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=226&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alex Carlos da Silva</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13974056645</td>
                  <td>
                    <a href="cliente.php?id=907">Ver</a> <br />
                    <a href="edita-cliente.php?id=907">Editar</a> <br />
                    <a href="destinatario.php?id=907" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=907&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEX FABIO XAVIER</td>
                  <td>TERRA ROXA</td>
                  <td>SP</td>
                  <td>alexfabiotr@hotmail.com</td>
                  <td>17 99124-4010</td>
                  <td>
                    <a href="cliente.php?id=341">Ver</a> <br />
                    <a href="edita-cliente.php?id=341">Editar</a> <br />
                    <a href="destinatario.php?id=341" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=341&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEX RAMADA RODRIGUES</td>
                  <td>BARREIRAS</td>
                  <td>BA</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>7799391846</td>
                  <td>
                    <a href="cliente.php?id=712">Ver</a> <br />
                    <a href="edita-cliente.php?id=712">Editar</a> <br />
                    <a href="destinatario.php?id=712" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=712&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alex Wesley Carvalho</td>
                  <td>São José dos Campos</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>12 99773-4515</td>
                  <td>
                    <a href="cliente.php?id=1182">Ver</a> <br />
                    <a href="edita-cliente.php?id=1182">Editar</a> <br />
                    <a href="destinatario.php?id=1182" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1182&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexander Dias Mendonça</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 96500-6915 </td>
                  <td>cpf: 02081498723</td>
                  <td>
                    <a href="cliente.php?id=1159">Ver</a> <br />
                    <a href="edita-cliente.php?id=1159">Editar</a> <br />
                    <a href="destinatario.php?id=1159" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1159&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexander Santos Florêncio</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>alexflorencio05@gmail.com</td>
                  <td>21 9 9889-0469</td>
                  <td>
                    <a href="cliente.php?id=1283">Ver</a> <br />
                    <a href="edita-cliente.php?id=1283">Editar</a> <br />
                    <a href="destinatario.php?id=1283" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1283&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexandre B. Nomellini</td>
                  <td>RIBEIRÃO PRETO</td>
                  <td>SP</td>
                  <td>ale.nomellini@icloud.com</td>
                  <td>(16) 98845-8130</td>
                  <td>
                    <a href="cliente.php?id=199">Ver</a> <br />
                    <a href="edita-cliente.php?id=199">Editar</a> <br />
                    <a href="destinatario.php?id=199" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=199&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexandre Andrade</td>
                  <td>Itaocara</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>22 99992-6660</td>
                  <td>
                    <a href="cliente.php?id=1326">Ver</a> <br />
                    <a href="edita-cliente.php?id=1326">Editar</a> <br />
                    <a href="destinatario.php?id=1326" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1326&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEXANDRE DE OLIVEIRA</td>
                  <td>Indaiatuba</td>
                  <td>SP</td>
                  <td>rosanasoarespadovani@hotmail.com</td>
                  <td>19993937101</td>
                  <td>
                    <a href="cliente.php?id=462">Ver</a> <br />
                    <a href="edita-cliente.php?id=462">Editar</a> <br />
                    <a href="destinatario.php?id=462" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=462&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexandre Lisboa</td>
                  <td>Belo Horizonte</td>
                  <td>MG</td>
                  <td>ALEXANDREMFLISBOA@HOTMAIL.COM</td>
                  <td>(31) 9646-0624</td>
                  <td>
                    <a href="cliente.php?id=53">Ver</a> <br />
                    <a href="edita-cliente.php?id=53">Editar</a> <br />
                    <a href="destinatario.php?id=53" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=53&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEXANDRE TEIXEIRA DA COSTA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>21985077850</td>
                  <td>
                    <a href="cliente.php?id=808">Ver</a> <br />
                    <a href="edita-cliente.php?id=808">Editar</a> <br />
                    <a href="destinatario.php?id=808" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=808&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alexandre Teixeira da Costa</td>
                  <td>Rio de janeiro</td>
                  <td>RJ</td>
                  <td>floressencias@gmail.com</td>
                  <td>021974114523</td>
                  <td>
                    <a href="cliente.php?id=935">Ver</a> <br />
                    <a href="edita-cliente.php?id=935">Editar</a> <br />
                    <a href="destinatario.php?id=935" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=935&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEXANDRE VICTOR</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=467">Ver</a> <br />
                    <a href="edita-cliente.php?id=467">Editar</a> <br />
                    <a href="destinatario.php?id=467" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=467&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALEXSANDRA BARBOSA FURTADO</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11 94328-1337</td>
                  <td>
                    <a href="cliente.php?id=813">Ver</a> <br />
                    <a href="edita-cliente.php?id=813">Editar</a> <br />
                    <a href="destinatario.php?id=813" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=813&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alfredo Cesar Nogueira</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>alfredo.nogueira@cedro.ind.br</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=218">Ver</a> <br />
                    <a href="edita-cliente.php?id=218">Editar</a> <br />
                    <a href="destinatario.php?id=218" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=218&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALICE LONGO</td>
                  <td>Realeza</td>
                  <td>PR</td>
                  <td>aliceb_longo@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=262">Ver</a> <br />
                    <a href="edita-cliente.php?id=262">Editar</a> <br />
                    <a href="destinatario.php?id=262" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=262&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALICE MOR</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 99611-8097</td>
                  <td>
                    <a href="cliente.php?id=735">Ver</a> <br />
                    <a href="edita-cliente.php?id=735">Editar</a> <br />
                    <a href="destinatario.php?id=735" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=735&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aline Amadeu</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>amadeualine@gmail.com</td>
                  <td>11 99667-9091</td>
                  <td>
                    <a href="cliente.php?id=1277">Ver</a> <br />
                    <a href="edita-cliente.php?id=1277">Editar</a> <br />
                    <a href="destinatario.php?id=1277" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1277&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALINE ELIZABETH DOS SANTOS</td>
                  <td>VOTUPORANGA</td>
                  <td>SP</td>
                  <td>aline_elisa30@hotmail.com</td>
                  <td>17 98152-9699</td>
                  <td>
                    <a href="cliente.php?id=718">Ver</a> <br />
                    <a href="edita-cliente.php?id=718">Editar</a> <br />
                    <a href="destinatario.php?id=718" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=718&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aline Maciel Rodrigues da Silva</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>alinemacielrodriguesdasilva@gmail.com</td>
                  <td>11 96712-8780 </td>
                  <td>cpf: 498.638.548-83</td>
                  <td>
                    <a href="cliente.php?id=1053">Ver</a> <br />
                    <a href="edita-cliente.php?id=1053">Editar</a> <br />
                    <a href="destinatario.php?id=1053" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1053&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aline Motta</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>aline.motta@live.com</td>
                  <td>(11) 98307-2593</td>
                  <td>
                    <a href="cliente.php?id=192">Ver</a> <br />
                    <a href="edita-cliente.php?id=192">Editar</a> <br />
                    <a href="destinatario.php?id=192" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=192&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aline Zanella</td>
                  <td>São Vicente</td>
                  <td>SP</td>
                  <td>zanellasucsp@gmail.com</td>
                  <td>13 99142-1290 </td>
                  <td>cpf: 336.877.598-73</td>
                  <td>
                    <a href="cliente.php?id=1230">Ver</a> <br />
                    <a href="edita-cliente.php?id=1230">Editar</a> <br />
                    <a href="destinatario.php?id=1230" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1230&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Alinnie Damasceno</td>
                  <td>Itapipoca</td>
                  <td>CE</td>
                  <td>alinnied@gmail.com</td>
                  <td>88 9 9645-6864</td>
                  <td>
                    <a href="cliente.php?id=244">Ver</a> <br />
                    <a href="edita-cliente.php?id=244">Editar</a> <br />
                    <a href="destinatario.php?id=244" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=244&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Allana Thais Cauduro</td>
                  <td>NAO INFORAMDA</td>
                  <td>SP</td>
                  <td>allana.cauduro@gmail.com</td>
                  <td>54 9645-7561</td>
                  <td>
                    <a href="cliente.php?id=1269">Ver</a> <br />
                    <a href="edita-cliente.php?id=1269">Editar</a> <br />
                    <a href="destinatario.php?id=1269" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1269&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALLESON FARIAS DA SILVA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>16992036144</td>
                  <td>
                    <a href="cliente.php?id=792">Ver</a> <br />
                    <a href="edita-cliente.php?id=792">Editar</a> <br />
                    <a href="destinatario.php?id=792" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=792&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Altair Prima</td>
                  <td>Mogi das Cruzes</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>99999999999</td>
                  <td>
                    <a href="cliente.php?id=1060">Ver</a> <br />
                    <a href="edita-cliente.php?id=1060">Editar</a> <br />
                    <a href="destinatario.php?id=1060" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1060&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALUISIO E. F. ALBUQUERQUE</td>
                  <td>QUIXADÁ</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>88 9742-7630</td>
                  <td>
                    <a href="cliente.php?id=751">Ver</a> <br />
                    <a href="edita-cliente.php?id=751">Editar</a> <br />
                    <a href="destinatario.php?id=751" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=751&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALVARO OSORIO</td>
                  <td>GOIÂNIA</td>
                  <td>GO</td>
                  <td>holyessencias@lve.com</td>
                  <td>21985963329</td>
                  <td>
                    <a href="cliente.php?id=642">Ver</a> <br />
                    <a href="edita-cliente.php?id=642">Editar</a> <br />
                    <a href="destinatario.php?id=642" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=642&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ALYNE BARTOLOTTO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>alynecbb@outlook.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=301">Ver</a> <br />
                    <a href="edita-cliente.php?id=301">Editar</a> <br />
                    <a href="destinatario.php?id=301" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=301&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Amanda Ambrosio</td>
                  <td>NOVA LIMA</td>
                  <td>MG</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=664">Ver</a> <br />
                    <a href="edita-cliente.php?id=664">Editar</a> <br />
                    <a href="destinatario.php?id=664" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=664&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Amanda de Fatima Cardoso</td>
                  <td>Votorantin</td>
                  <td>SP</td>
                  <td>amandafcardoso87@gmail.com</td>
                  <td>15996347940</td>
                  <td>
                    <a href="cliente.php?id=1302">Ver</a> <br />
                    <a href="edita-cliente.php?id=1302">Editar</a> <br />
                    <a href="destinatario.php?id=1302" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1302&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Amanda Sobreira Alves Barbosa</td>
                  <td>Serra Talhada</td>
                  <td>PE</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>44 8433-6090</td>
                  <td>
                    <a href="cliente.php?id=1197">Ver</a> <br />
                    <a href="edita-cliente.php?id=1197">Editar</a> <br />
                    <a href="destinatario.php?id=1197" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1197&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Amarildo Silva</td>
                  <td>Puxinanã</td>
                  <td>PB</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>83 8719-3381</td>
                  <td>
                    <a href="cliente.php?id=1310">Ver</a> <br />
                    <a href="edita-cliente.php?id=1310">Editar</a> <br />
                    <a href="destinatario.php?id=1310" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1310&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AMARIS RIZZI</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=364">Ver</a> <br />
                    <a href="edita-cliente.php?id=364">Editar</a> <br />
                    <a href="destinatario.php?id=364" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=364&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Amaro Pinero</td>
                  <td>não informado</td>
                  <td>RJ</td>
                  <td>apn.rdc.consulado@gmail.com</td>
                  <td>21 97707-6844</td>
                  <td>
                    <a href="cliente.php?id=1116">Ver</a> <br />
                    <a href="edita-cliente.php?id=1116">Editar</a> <br />
                    <a href="destinatario.php?id=1116" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1116&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANA BEATRIZ BATISTA DE SOUZA SILVA</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>biasouza278@gmail.com</td>
                  <td></td>
                  <td>cpf/</td>
                  <td>cnpj: 15447878713 Telefone fixo: - Celular: 2</td>
                  <td>
                    <a href="cliente.php?id=974">Ver</a> <br />
                    <a href="edita-cliente.php?id=974">Editar</a> <br />
                    <a href="destinatario.php?id=974" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=974&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANA BEATRIZ POLICANTE DA ROCHA</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>salvattori2021@gmail.com</td>
                  <td>(21) 9 9882-3744</td>
                  <td>
                    <a href="cliente.php?id=1120">Ver</a> <br />
                    <a href="edita-cliente.php?id=1120">Editar</a> <br />
                    <a href="destinatario.php?id=1120" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1120&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ana Carolina</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>11947033293</td>
                  <td>
                    <a href="cliente.php?id=946">Ver</a> <br />
                    <a href="edita-cliente.php?id=946">Editar</a> <br />
                    <a href="destinatario.php?id=946" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=946&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ana Carolina</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>11947033293</td>
                  <td>
                    <a href="cliente.php?id=947">Ver</a> <br />
                    <a href="edita-cliente.php?id=947">Editar</a> <br />
                    <a href="destinatario.php?id=947" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=947&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ana Carolina Fernandes</td>
                  <td>Jundiaí</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11 93229-4702</td>
                  <td>
                    <a href="cliente.php?id=816">Ver</a> <br />
                    <a href="edita-cliente.php?id=816">Editar</a> <br />
                    <a href="destinatario.php?id=816" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=816&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANA CLAUDIA GROSSI COSTA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>claugrossi@ig.com.br</td>
                  <td>11997097960</td>
                  <td>
                    <a href="cliente.php?id=420">Ver</a> <br />
                    <a href="edita-cliente.php?id=420">Editar</a> <br />
                    <a href="destinatario.php?id=420" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=420&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ana Cristina França da Silva</td>
                  <td>Duque de Caxias</td>
                  <td>RJ</td>
                  <td>eusouanafranca@gmail.com</td>
                  <td>21974126303</td>
                  <td>
                    <a href="cliente.php?id=1211">Ver</a> <br />
                    <a href="edita-cliente.php?id=1211">Editar</a> <br />
                    <a href="destinatario.php?id=1211" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1211&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ana Cristina França da Silva</td>
                  <td>Duque de Caxias</td>
                  <td>RJ</td>
                  <td>eusouanafranca@gmail.com</td>
                  <td>21974126303</td>
                  <td>
                    <a href="cliente.php?id=1212">Ver</a> <br />
                    <a href="edita-cliente.php?id=1212">Editar</a> <br />
                    <a href="destinatario.php?id=1212" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1212&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANA MARIA GUEDES</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>ananutris@hotmail.com</td>
                  <td>11969925156</td>
                  <td>
                    <a href="cliente.php?id=255">Ver</a> <br />
                    <a href="edita-cliente.php?id=255">Editar</a> <br />
                    <a href="destinatario.php?id=255" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=255&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDERSON DE MORAIS LUCA</td>
                  <td>São José do Rio Preto</td>
                  <td>SP</td>
                  <td>anderson_luca@hotmail.com</td>
                  <td>(17) 98803-4268</td>
                  <td>
                    <a href="cliente.php?id=182">Ver</a> <br />
                    <a href="edita-cliente.php?id=182">Editar</a> <br />
                    <a href="destinatario.php?id=182" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=182&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Anderson Fernandes</td>
                  <td>Guarulhos</td>
                  <td>SP</td>
                  <td>Lab.textil@fremplast.com.br</td>
                  <td>11 24896960</td>
                  <td>
                    <a href="cliente.php?id=18">Ver</a> <br />
                    <a href="edita-cliente.php?id=18">Editar</a> <br />
                    <a href="destinatario.php?id=18" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=18&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDERSON GONÇALVES DE MORAES</td>
                  <td>SÃO JOÃO DO MERITI RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>021985676033</td>
                  <td>
                    <a href="cliente.php?id=767">Ver</a> <br />
                    <a href="edita-cliente.php?id=767">Editar</a> <br />
                    <a href="destinatario.php?id=767" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=767&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDERSON LIMONI</td>
                  <td>CARAPICUIBA</td>
                  <td>SP</td>
                  <td>andersonlimoni@gmail.com</td>
                  <td>11 982147442</td>
                  <td>
                    <a href="cliente.php?id=105">Ver</a> <br />
                    <a href="edita-cliente.php?id=105">Editar</a> <br />
                    <a href="destinatario.php?id=105" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=105&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDERSON LUIZ DOS SANTOS</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>atendimento@perfumesfix.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=104">Ver</a> <br />
                    <a href="edita-cliente.php?id=104">Editar</a> <br />
                    <a href="destinatario.php?id=104" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=104&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Anderson Nogueira</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13974070603</td>
                  <td>
                    <a href="cliente.php?id=753">Ver</a> <br />
                    <a href="edita-cliente.php?id=753">Editar</a> <br />
                    <a href="destinatario.php?id=753" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=753&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Anderson R Sartori</td>
                  <td>Olímpia</td>
                  <td>SP</td>
                  <td>Anderson.r.sartori@gmail.com</td>
                  <td>17 99633-2561</td>
                  <td>
                    <a href="cliente.php?id=1117">Ver</a> <br />
                    <a href="edita-cliente.php?id=1117">Editar</a> <br />
                    <a href="destinatario.php?id=1117" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1117&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andre Augusto Dutra Pessoa</td>
                  <td>Sorocaba</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>11971647325</td>
                  <td>
                    <a href="cliente.php?id=745">Ver</a> <br />
                    <a href="edita-cliente.php?id=745">Editar</a> <br />
                    <a href="destinatario.php?id=745" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=745&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRE DA SILVA DE ASSIS</td>
                  <td>CURICICA</td>
                  <td>RJ</td>
                  <td>andre.silva.asis@gmail.com</td>
                  <td>21 965290940 / 021981720411</td>
                  <td>
                    <a href="cliente.php?id=679">Ver</a> <br />
                    <a href="edita-cliente.php?id=679">Editar</a> <br />
                    <a href="destinatario.php?id=679" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=679&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>André Fabiano Rustick - </td>
                  <td>cpf 971.663.080-87</td>
                  <td>CASCAVEL</td>
                  <td>PR</td>
                  <td>perfumess_@hotmail.com</td>
                  <td>(45)99126-8866 </td>
                  <td>cnpj- 17983853/0001-93</td>
                  <td>
                    <a href="cliente.php?id=203">Ver</a> <br />
                    <a href="edita-cliente.php?id=203">Editar</a> <br />
                    <a href="destinatario.php?id=203" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=203&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andre Gustavo Rosa</td>
                  <td>Valinhos</td>
                  <td>SP</td>
                  <td>andre.gustavo.rosa@gmail.com</td>
                  <td>3599457698</td>
                  <td>
                    <a href="cliente.php?id=1098">Ver</a> <br />
                    <a href="edita-cliente.php?id=1098">Editar</a> <br />
                    <a href="destinatario.php?id=1098" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1098&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRÉ KUSMITSCH</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=380">Ver</a> <br />
                    <a href="edita-cliente.php?id=380">Editar</a> <br />
                    <a href="destinatario.php?id=380" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=380&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRÉ LUIZ DA CUNHA CHAGAS</td>
                  <td>MORADA NOVA</td>
                  <td>CE</td>
                  <td>andrezaun2105@yahoo.com.br</td>
                  <td>(88) 99990-5416</td>
                  <td>
                    <a href="cliente.php?id=225">Ver</a> <br />
                    <a href="edita-cliente.php?id=225">Editar</a> <br />
                    <a href="destinatario.php?id=225" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=225&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRE LUIZ PEREIRA SANTOS</td>
                  <td>CAMPOS DOS GOYTACAZES</td>
                  <td>RJ</td>
                  <td>andresantos37@yahoo.com.br</td>
                  <td>21- 99555-1834</td>
                  <td>
                    <a href="cliente.php?id=318">Ver</a> <br />
                    <a href="edita-cliente.php?id=318">Editar</a> <br />
                    <a href="destinatario.php?id=318" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=318&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDREA D.</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>delicadeira@delicadeira.com.br</td>
                  <td>11 99999-2012</td>
                  <td>
                    <a href="cliente.php?id=107">Ver</a> <br />
                    <a href="edita-cliente.php?id=107">Editar</a> <br />
                    <a href="destinatario.php?id=107" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=107&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDREA KIM</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>andrea.ite4@hotmail.com</td>
                  <td>(11) 98111-3317</td>
                  <td>
                    <a href="cliente.php?id=234">Ver</a> <br />
                    <a href="edita-cliente.php?id=234">Editar</a> <br />
                    <a href="destinatario.php?id=234" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=234&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andrea Panarielo</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>estilokmkt@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=540">Ver</a> <br />
                    <a href="edita-cliente.php?id=540">Editar</a> <br />
                    <a href="destinatario.php?id=540" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=540&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDREA RINHEL</td>
                  <td>BATATAIS</td>
                  <td>SP</td>
                  <td>lilianbernades@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=427">Ver</a> <br />
                    <a href="edita-cliente.php?id=427">Editar</a> <br />
                    <a href="destinatario.php?id=427" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=427&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andrea Stephania Loaiza Cano</td>
                  <td>Bacabal</td>
                  <td>MA</td>
                  <td>andrea.loaiza2702@gmail.com</td>
                  <td>99 7400-5222 </td>
                  <td>cpf: 010.427.938-91</td>
                  <td>
                    <a href="cliente.php?id=1316">Ver</a> <br />
                    <a href="edita-cliente.php?id=1316">Editar</a> <br />
                    <a href="destinatario.php?id=1316" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1316&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andreia Nogueira</td>
                  <td>Suzano</td>
                  <td>SP</td>
                  <td>Andreiancastro@hotmail.com</td>
                  <td>11950859485</td>
                  <td>
                    <a href="cliente.php?id=1130">Ver</a> <br />
                    <a href="edita-cliente.php?id=1130">Editar</a> <br />
                    <a href="destinatario.php?id=1130" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1130&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRESSA ALMEIDA PIMENTA</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>andressaspss2@yahoo.com.br</td>
                  <td>13 98194-2674</td>
                  <td>
                    <a href="cliente.php?id=196">Ver</a> <br />
                    <a href="edita-cliente.php?id=196">Editar</a> <br />
                    <a href="destinatario.php?id=196" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=196&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Andressa Clementino de Faria</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>farias.andressa2247@gmail.com</td>
                  <td>21965590750</td>
                  <td>
                    <a href="cliente.php?id=1167">Ver</a> <br />
                    <a href="edita-cliente.php?id=1167">Editar</a> <br />
                    <a href="destinatario.php?id=1167" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1167&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDRESSA TOMAZ</td>
                  <td>ARMAÇÃO PENHA</td>
                  <td>SC</td>
                  <td>andressa_tomaz182@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=314">Ver</a> <br />
                    <a href="edita-cliente.php?id=314">Editar</a> <br />
                    <a href="destinatario.php?id=314" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=314&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDREZA FERRAZ</td>
                  <td>IMIRIM</td>
                  <td>SP</td>
                  <td>taienia@bol.com.br</td>
                  <td>11-993433832</td>
                  <td>
                    <a href="cliente.php?id=336">Ver</a> <br />
                    <a href="edita-cliente.php?id=336">Editar</a> <br />
                    <a href="destinatario.php?id=336" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=336&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANDREZA PAULA EDLING</td>
                  <td>PARANA</td>
                  <td>PR</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>15 2815-0000</td>
                  <td>
                    <a href="cliente.php?id=106">Ver</a> <br />
                    <a href="edita-cliente.php?id=106">Editar</a> <br />
                    <a href="destinatario.php?id=106" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=106&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANGELA MARIA DOS SANTOS</td>
                  <td>SORRISO</td>
                  <td>MT</td>
                  <td>salaoevidencee@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=288">Ver</a> <br />
                    <a href="edita-cliente.php?id=288">Editar</a> <br />
                    <a href="destinatario.php?id=288" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=288&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANGELA SOUZA NETO</td>
                  <td>BOA ESPERANÇA</td>
                  <td>MG</td>
                  <td>ANGELAMSNETO@YAHOO.COM.BR</td>
                  <td>000000</td>
                  <td>
                    <a href="cliente.php?id=54">Ver</a> <br />
                    <a href="edita-cliente.php?id=54">Editar</a> <br />
                    <a href="destinatario.php?id=54" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=54&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANGELICA BERNARDES</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>xxxxx@hotmail.com</td>
                  <td>13 3222-3996 / 98199-8198/ 99741-16060</td>
                  <td>
                    <a href="cliente.php?id=152">Ver</a> <br />
                    <a href="edita-cliente.php?id=152">Editar</a> <br />
                    <a href="destinatario.php?id=152" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=152&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANGELICA BERSAN</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>3322-3996 / 98199-8198</td>
                  <td>
                    <a href="cliente.php?id=103">Ver</a> <br />
                    <a href="edita-cliente.php?id=103">Editar</a> <br />
                    <a href="destinatario.php?id=103" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=103&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANGELICA N. PEREIRA</td>
                  <td>VINHEDO</td>
                  <td>SP</td>
                  <td>angelica.n.p@hotmail.com</td>
                  <td>19 99699-4088</td>
                  <td>
                    <a href="cliente.php?id=451">Ver</a> <br />
                    <a href="edita-cliente.php?id=451">Editar</a> <br />
                    <a href="destinatario.php?id=451" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=451&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ângelo de Oliveira dos Santos</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>cafe2012@bol.com.br</td>
                  <td>11 78407269 986376202 </td>
                  <td>cpf 28988953851</td>
                  <td>
                    <a href="cliente.php?id=19">Ver</a> <br />
                    <a href="edita-cliente.php?id=19">Editar</a> <br />
                    <a href="destinatario.php?id=19" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=19&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Aniraldo Soares / Casa das Essências</td>
                  <td>Cidade Presidente Prudente</td>
                  <td>SP</td>
                  <td>soaresaniraldo1960@gmail.com</td>
                  <td></td>
                  <td>cnpj 31.836.815./0001-39</td>
                  <td>
                    <a href="cliente.php?id=623">Ver</a> <br />
                    <a href="edita-cliente.php?id=623">Editar</a> <br />
                    <a href="destinatario.php?id=623" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=623&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Anna Carolina Martins</td>
                  <td>PIEDADE</td>
                  <td>RJ</td>
                  <td>anna.carolina@vislun.com.br</td>
                  <td>21 96956-8848</td>
                  <td>
                    <a href="cliente.php?id=719">Ver</a> <br />
                    <a href="edita-cliente.php?id=719">Editar</a> <br />
                    <a href="destinatario.php?id=719" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=719&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANNA CAROLINA MELO RIBEIRO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>lilianbernaders@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=539">Ver</a> <br />
                    <a href="edita-cliente.php?id=539">Editar</a> <br />
                    <a href="destinatario.php?id=539" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=539&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO AVELINO GOMES DE SOUZA JUNIOR</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>18 981566417</td>
                  <td>
                    <a href="cliente.php?id=681">Ver</a> <br />
                    <a href="edita-cliente.php?id=681">Editar</a> <br />
                    <a href="destinatario.php?id=681" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=681&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO CARLOS BUSNARDO</td>
                  <td>PONTAL DO PARANA PR</td>
                  <td>PR</td>
                  <td>ANTONIOBUSNARDOBEBE@hotmail.com</td>
                  <td>(41) 3672-2137 / </td>
                  <td>cpf-353.575.849.15</td>
                  <td>
                    <a href="cliente.php?id=303">Ver</a> <br />
                    <a href="edita-cliente.php?id=303">Editar</a> <br />
                    <a href="destinatario.php?id=303" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=303&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO CARLOS DA SILVA RIBEIRO</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=835">Ver</a> <br />
                    <a href="edita-cliente.php?id=835">Editar</a> <br />
                    <a href="destinatario.php?id=835" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=835&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO GILDAZIO BRILHANTE GAMA</td>
                  <td>APODI</td>
                  <td>RN</td>
                  <td>gildaziocnsc@hotmail.com</td>
                  <td>84991453262</td>
                  <td>
                    <a href="cliente.php?id=113">Ver</a> <br />
                    <a href="edita-cliente.php?id=113">Editar</a> <br />
                    <a href="destinatario.php?id=113" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=113&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO MARCOS DOS SANTOS SILVA</td>
                  <td>PARATIBE JOÃO PESSOA</td>
                  <td>PB</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8393044343</td>
                  <td>
                    <a href="cliente.php?id=782">Ver</a> <br />
                    <a href="edita-cliente.php?id=782">Editar</a> <br />
                    <a href="destinatario.php?id=782" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=782&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Antonio Marcos Gomes Monteiro</td>
                  <td>Itabaiana</td>
                  <td>PB</td>
                  <td>tony.marcos2009@hotmail.com</td>
                  <td>8391433896</td>
                  <td>
                    <a href="cliente.php?id=1253">Ver</a> <br />
                    <a href="edita-cliente.php?id=1253">Editar</a> <br />
                    <a href="destinatario.php?id=1253" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1253&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO OMAR</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=112">Ver</a> <br />
                    <a href="edita-cliente.php?id=112">Editar</a> <br />
                    <a href="destinatario.php?id=112" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=112&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Antonio Pura essencia e cosméticos Ltda</td>
                  <td>Cascadura</td>
                  <td>RJ</td>
                  <td>marciaroque@gmail.com</td>
                  <td>2124215100/21959030662 </td>
                  <td>cnpj 43.275.390/0001-15</td>
                  <td>
                    <a href="cliente.php?id=1153">Ver</a> <br />
                    <a href="edita-cliente.php?id=1153">Editar</a> <br />
                    <a href="destinatario.php?id=1153" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1153&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ANTONIO RODRIGUES DE HOLANDA JUNIOR</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>JUNIOR.KDB@HOTMAIL.COM</td>
                  <td>(85)-32457068-(85)-988186546</td>
                  <td>
                    <a href="cliente.php?id=45">Ver</a> <br />
                    <a href="edita-cliente.php?id=45">Editar</a> <br />
                    <a href="destinatario.php?id=45" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=45&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Antonio Weglas</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>antonioweglas@gmail.com</td>
                  <td>8597154733</td>
                  <td>
                    <a href="cliente.php?id=1322">Ver</a> <br />
                    <a href="edita-cliente.php?id=1322">Editar</a> <br />
                    <a href="destinatario.php?id=1322" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1322&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ARIANE ROQUE LORENZINI</td>
                  <td>GUARULHOS</td>
                  <td>RS</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>011980857172</td>
                  <td>
                    <a href="cliente.php?id=741">Ver</a> <br />
                    <a href="edita-cliente.php?id=741">Editar</a> <br />
                    <a href="destinatario.php?id=741" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=741&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ARIOVALDO LORENCINE</td>
                  <td>APARECIDA DE GOIÂNIA</td>
                  <td>GO</td>
                  <td>THOMAZLOREN@HOTMAIL.COM</td>
                  <td>62-92605257</td>
                  <td>
                    <a href="cliente.php?id=88">Ver</a> <br />
                    <a href="edita-cliente.php?id=88">Editar</a> <br />
                    <a href="destinatario.php?id=88" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=88&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ARLEI PAULINO GOMES</td>
                  <td>ARAXA</td>
                  <td>MG</td>
                  <td>SEM.EMAIL@SEMEMAIL</td>
                  <td>78 4500-0000</td>
                  <td>
                    <a href="cliente.php?id=108">Ver</a> <br />
                    <a href="edita-cliente.php?id=108">Editar</a> <br />
                    <a href="destinatario.php?id=108" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=108&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Arnaldo Gama Tenorio</td>
                  <td>CAIEIRAS</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=398">Ver</a> <br />
                    <a href="edita-cliente.php?id=398">Editar</a> <br />
                    <a href="destinatario.php?id=398" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=398&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Arnaldo Pereira</td>
                  <td>CUBATÃO</td>
                  <td>SP</td>
                  <td>naldo_ft@icloud.com</td>
                  <td>13 9891-4174</td>
                  <td>
                    <a href="cliente.php?id=877">Ver</a> <br />
                    <a href="edita-cliente.php?id=877">Editar</a> <br />
                    <a href="destinatario.php?id=877" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=877&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Arnaldo Sousa Oliveira</td>
                  <td>Cristina Goiania</td>
                  <td>GO</td>
                  <td>asousaoliveira368@gmail.com</td>
                  <td>6299022836</td>
                  <td>
                    <a href="cliente.php?id=1235">Ver</a> <br />
                    <a href="edita-cliente.php?id=1235">Editar</a> <br />
                    <a href="destinatario.php?id=1235" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1235&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AROMAS DE MARIAS</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>997999689</td>
                  <td>
                    <a href="cliente.php?id=788">Ver</a> <br />
                    <a href="edita-cliente.php?id=788">Editar</a> <br />
                    <a href="destinatario.php?id=788" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=788&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Art Limpe / Karol Melo</td>
                  <td>Caxias do Sul</td>
                  <td>RS</td>
                  <td>artelimpe@artelimpe.com.br</td>
                  <td>(54) 3025-2630</td>
                  <td>
                    <a href="cliente.php?id=193">Ver</a> <br />
                    <a href="edita-cliente.php?id=193">Editar</a> <br />
                    <a href="destinatario.php?id=193" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=193&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AUDRI LANZA</td>
                  <td>JAGUARÉ</td>
                  <td>SP</td>
                  <td>AUDRILANZA@HOTMAIL.COM</td>
                  <td>11 952375989/ 37967233</td>
                  <td>
                    <a href="cliente.php?id=58">Ver</a> <br />
                    <a href="edita-cliente.php?id=58">Editar</a> <br />
                    <a href="destinatario.php?id=58" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=58&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AUGUSTO ARCHANJO</td>
                  <td>DIADEMA</td>
                  <td>SP</td>
                  <td>augustoarchanjo@hotmail.com</td>
                  <td>1195147 8134</td>
                  <td>
                    <a href="cliente.php?id=207">Ver</a> <br />
                    <a href="edita-cliente.php?id=207">Editar</a> <br />
                    <a href="destinatario.php?id=207" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=207&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>AUGUSTO BIANCHINI</td>
                  <td>PALHOÇA</td>
                  <td>SC</td>
                  <td>holyessencias@live.com</td>
                  <td>4898565430</td>
                  <td>
                    <a href="cliente.php?id=688">Ver</a> <br />
                    <a href="edita-cliente.php?id=688">Editar</a> <br />
                    <a href="destinatario.php?id=688" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=688&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ayala</td>
                  <td>Porto Alegre</td>
                  <td>RS</td>
                  <td>aayala@terra.com.br</td>
                  <td>51 30287785</td>
                  <td>
                    <a href="cliente.php?id=151">Ver</a> <br />
                    <a href="edita-cliente.php?id=151">Editar</a> <br />
                    <a href="destinatario.php?id=151" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=151&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BABBI ROQUE</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=478">Ver</a> <br />
                    <a href="edita-cliente.php?id=478">Editar</a> <br />
                    <a href="destinatario.php?id=478" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=478&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BARÃO ALUMINIO - A/C Kelly</td>
                  <td>Biguaçu</td>
                  <td>SC</td>
                  <td>financeiro@baraoaluminio.com.br</td>
                  <td>48 3285 4533</td>
                  <td>
                    <a href="cliente.php?id=523">Ver</a> <br />
                    <a href="edita-cliente.php?id=523">Editar</a> <br />
                    <a href="destinatario.php?id=523" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=523&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bárbara Gomes Costa Mendonça</td>
                  <td>Goiania</td>
                  <td>SP</td>
                  <td>doupe.ecommerce@gmail.com</td>
                  <td>62 8139-1025</td>
                  <td>
                    <a href="cliente.php?id=1142">Ver</a> <br />
                    <a href="edita-cliente.php?id=1142">Editar</a> <br />
                    <a href="destinatario.php?id=1142" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1142&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Beatriz Andrade de Oliveira</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>11981749918</td>
                  <td>
                    <a href="cliente.php?id=923">Ver</a> <br />
                    <a href="edita-cliente.php?id=923">Editar</a> <br />
                    <a href="destinatario.php?id=923" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=923&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BEATRIZ PEREIRA CAMPELO</td>
                  <td>TRÊS MARIAS</td>
                  <td>MG</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>3891261680</td>
                  <td>
                    <a href="cliente.php?id=777">Ver</a> <br />
                    <a href="edita-cliente.php?id=777">Editar</a> <br />
                    <a href="destinatario.php?id=777" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=777&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BELLA PLUS</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>11 44423956 RAMAL - 22</td>
                  <td>
                    <a href="cliente.php?id=115">Ver</a> <br />
                    <a href="edita-cliente.php?id=115">Editar</a> <br />
                    <a href="destinatario.php?id=115" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=115&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BENDITA VELA - Janaina Ribeiro Guglielmi</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>engjanaina@hotmail.com</td>
                  <td>11 961230130</td>
                  <td>
                    <a href="cliente.php?id=828">Ver</a> <br />
                    <a href="edita-cliente.php?id=828">Editar</a> <br />
                    <a href="destinatario.php?id=828" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=828&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Benedito de Vasconcelos Abreu</td>
                  <td>Porto Velho</td>
                  <td>RO</td>
                  <td>beneditovasconselos07@gmail.com</td>
                  <td>69 99232-4946 </td>
                  <td>cpf 572.861.752-20</td>
                  <td>
                    <a href="cliente.php?id=1285">Ver</a> <br />
                    <a href="edita-cliente.php?id=1285">Editar</a> <br />
                    <a href="destinatario.php?id=1285" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1285&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BENEDITO GOTTI</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>beneditogotti@uol.com.br</td>
                  <td>19 38065240</td>
                  <td>
                    <a href="cliente.php?id=118">Ver</a> <br />
                    <a href="edita-cliente.php?id=118">Editar</a> <br />
                    <a href="destinatario.php?id=118" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=118&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BENIDE NUNES</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>AROMADICASAAROMAS@GMAIL.COM</td>
                  <td>71 3329-3147 / 8745-5474 -INSCR.EST. 053.570.62</td>
                  <td>
                    <a href="cliente.php?id=79">Ver</a> <br />
                    <a href="edita-cliente.php?id=79">Editar</a> <br />
                    <a href="destinatario.php?id=79" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=79&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BETTINA FELICITAS FICKER LATUF</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>holyessencias@hotmail.com</td>
                  <td>15981005049</td>
                  <td>
                    <a href="cliente.php?id=631">Ver</a> <br />
                    <a href="edita-cliente.php?id=631">Editar</a> <br />
                    <a href="destinatario.php?id=631" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=631&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bianca de Jesus Santos</td>
                  <td>Guarujá</td>
                  <td>SP</td>
                  <td>Biancasantos2612@gmail.com</td>
                  <td>13 99605-6634</td>
                  <td>
                    <a href="cliente.php?id=870">Ver</a> <br />
                    <a href="edita-cliente.php?id=870">Editar</a> <br />
                    <a href="destinatario.php?id=870" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=870&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BIANCA KAORY ROCHA MANABE</td>
                  <td>APARECIDA SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13988436333</td>
                  <td>
                    <a href="cliente.php?id=783">Ver</a> <br />
                    <a href="edita-cliente.php?id=783">Editar</a> <br />
                    <a href="destinatario.php?id=783" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=783&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BIO ESTÉTICA</td>
                  <td>VILHENA</td>
                  <td>RO</td>
                  <td>bioesteticavha@gmail.com</td>
                  <td>69- 98442-6579</td>
                  <td>
                    <a href="cliente.php?id=313">Ver</a> <br />
                    <a href="edita-cliente.php?id=313">Editar</a> <br />
                    <a href="destinatario.php?id=313" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=313&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BK PARFUMS LTDA</td>
                  <td>Assis</td>
                  <td>SP</td>
                  <td>contato@bkparfums.com.br</td>
                  <td>18 99694-2679 </td>
                  <td>cnpj: 53.877.354/0001-85 Inscri</td>
                  <td>
                    <a href="cliente.php?id=1126">Ver</a> <br />
                    <a href="edita-cliente.php?id=1126">Editar</a> <br />
                    <a href="destinatario.php?id=1126" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1126&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRENA RODRIGUES COUTO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>brenarcouto@hotmail.com</td>
                  <td>21 994695600 / </td>
                  <td>cpf-170921827-43</td>
                  <td>
                    <a href="cliente.php?id=544">Ver</a> <br />
                    <a href="edita-cliente.php?id=544">Editar</a> <br />
                    <a href="destinatario.php?id=544" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=544&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRIGHT SIDE CANDLES - A/C CAMILA MARTINS</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>11 983351820 / 11 3749-0292</td>
                  <td>
                    <a href="cliente.php?id=504">Ver</a> <br />
                    <a href="edita-cliente.php?id=504">Editar</a> <br />
                    <a href="destinatario.php?id=504" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=504&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRUNA GABRIELE DE SENA PETENON</td>
                  <td>ITU</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11 97570-7232</td>
                  <td>
                    <a href="cliente.php?id=682">Ver</a> <br />
                    <a href="edita-cliente.php?id=682">Editar</a> <br />
                    <a href="destinatario.php?id=682" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=682&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Espíndola</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>bruno.cezar@msn.com</td>
                  <td>21 96494-4594</td>
                  <td>
                    <a href="cliente.php?id=643">Ver</a> <br />
                    <a href="edita-cliente.php?id=643">Editar</a> <br />
                    <a href="destinatario.php?id=643" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=643&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Galileu S. Lima</td>
                  <td>Duque de Caxias</td>
                  <td>RJ</td>
                  <td>bruno_lima@praxair.com</td>
                  <td>(21) 2677-5401 / (21) 2773-6053 / (21) 98604-5232</td>
                  <td>
                    <a href="cliente.php?id=272">Ver</a> <br />
                    <a href="edita-cliente.php?id=272">Editar</a> <br />
                    <a href="destinatario.php?id=272" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=272&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Luiz</td>
                  <td>NAOFORNECIDA</td>
                  <td>RJ</td>
                  <td>limabalulima@gmail.com</td>
                  <td>21 97955-6760</td>
                  <td>
                    <a href="cliente.php?id=1205">Ver</a> <br />
                    <a href="edita-cliente.php?id=1205">Editar</a> <br />
                    <a href="destinatario.php?id=1205" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1205&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRUNO MAGALHÃES</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>brunogmagalhaes@gmail.com</td>
                  <td>(11) 93808 1159. TEL : 11 989462890 </td>
                  <td>cpf:298.805.94</td>
                  <td>
                    <a href="cliente.php?id=561">Ver</a> <br />
                    <a href="edita-cliente.php?id=561">Editar</a> <br />
                    <a href="destinatario.php?id=561" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=561&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Monteiro Maia</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>brunomaa14@gmail.com</td>
                  <td>21 96824-6325 </td>
                  <td>cpf 06200560706</td>
                  <td>
                    <a href="cliente.php?id=975">Ver</a> <br />
                    <a href="edita-cliente.php?id=975">Editar</a> <br />
                    <a href="destinatario.php?id=975" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=975&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Rodrigues</td>
                  <td>Guarulhos</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado</td>
                  <td>11 98946-2890</td>
                  <td>
                    <a href="cliente.php?id=1346">Ver</a> <br />
                    <a href="edita-cliente.php?id=1346">Editar</a> <br />
                    <a href="destinatario.php?id=1346" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1346&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRUNO RODRIGUES</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>brunorodrigues2014@gmail.com</td>
                  <td>11 977986903</td>
                  <td>
                    <a href="cliente.php?id=119">Ver</a> <br />
                    <a href="edita-cliente.php?id=119">Editar</a> <br />
                    <a href="destinatario.php?id=119" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=119&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRUNO RODRIGUES / NELSON RODRIGUES</td>
                  <td>BELENZINHO</td>
                  <td>SP</td>
                  <td>SEM.EMAIL@SemEmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=116">Ver</a> <br />
                    <a href="edita-cliente.php?id=116">Editar</a> <br />
                    <a href="destinatario.php?id=116" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=116&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>BRUNO RODRIGUES DE FARIAS</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>8586334391</td>
                  <td>
                    <a href="cliente.php?id=695">Ver</a> <br />
                    <a href="edita-cliente.php?id=695">Editar</a> <br />
                    <a href="destinatario.php?id=695" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=695&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Bruno Vinícius Filardi da Silva</td>
                  <td>Rio de Janeiro Campo</td>
                  <td>RJ</td>
                  <td>brufil84@gmail.com</td>
                  <td>21 97097-0361</td>
                  <td>
                    <a href="cliente.php?id=488">Ver</a> <br />
                    <a href="edita-cliente.php?id=488">Editar</a> <br />
                    <a href="destinatario.php?id=488" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=488&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CACILDA AP. PERIA LOFRANO</td>
                  <td>TAQUARITINGA</td>
                  <td>SP</td>
                  <td>clofrano@hotmail.com</td>
                  <td>16- 32534819</td>
                  <td>
                    <a href="cliente.php?id=331">Ver</a> <br />
                    <a href="edita-cliente.php?id=331">Editar</a> <br />
                    <a href="destinatario.php?id=331" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=331&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Caio Marcelo Genuino da Silva</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>981199677</td>
                  <td>
                    <a href="cliente.php?id=898">Ver</a> <br />
                    <a href="edita-cliente.php?id=898">Editar</a> <br />
                    <a href="destinatario.php?id=898" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=898&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Caique França Ferreira</td>
                  <td>santos</td>
                  <td>SP</td>
                  <td>caique676@gmail.com</td>
                  <td></td>
                  <td>cpf 510.382.318-76</td>
                  <td>
                    <a href="cliente.php?id=869">Ver</a> <br />
                    <a href="edita-cliente.php?id=869">Editar</a> <br />
                    <a href="destinatario.php?id=869" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=869&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAMILA</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>folhadehortela@yahoo.com.br</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=418">Ver</a> <br />
                    <a href="edita-cliente.php?id=418">Editar</a> <br />
                    <a href="destinatario.php?id=418" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=418&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAMILA - CASINHA DA ARVORE</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 99759-1900</td>
                  <td>
                    <a href="cliente.php?id=856">Ver</a> <br />
                    <a href="edita-cliente.php?id=856">Editar</a> <br />
                    <a href="destinatario.php?id=856" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=856&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAMILA ANDREÃO</td>
                  <td>VILA VELHA</td>
                  <td>ES</td>
                  <td>fragranciasreais@gmail.com</td>
                  <td>27 998097552</td>
                  <td>
                    <a href="cliente.php?id=68">Ver</a> <br />
                    <a href="edita-cliente.php?id=68">Editar</a> <br />
                    <a href="destinatario.php?id=68" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=68&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Camila Prado</td>
                  <td>MONTE MOR</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=636">Ver</a> <br />
                    <a href="edita-cliente.php?id=636">Editar</a> <br />
                    <a href="destinatario.php?id=636" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=636&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carla Maria Lettieri</td>
                  <td>Brasília</td>
                  <td>DF</td>
                  <td>carlalettieri26@gmail.com</td>
                  <td>61 8555-8570 </td>
                  <td>cpf 125 647 961 68</td>
                  <td>
                    <a href="cliente.php?id=1093">Ver</a> <br />
                    <a href="edita-cliente.php?id=1093">Editar</a> <br />
                    <a href="destinatario.php?id=1093" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1093&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carla Motta</td>
                  <td>BAURU</td>
                  <td>SP</td>
                  <td>MROQUE1970@GMAIL.COM</td>
                  <td>14997315676 16202428856</td>
                  <td>
                    <a href="cliente.php?id=888">Ver</a> <br />
                    <a href="edita-cliente.php?id=888">Editar</a> <br />
                    <a href="destinatario.php?id=888" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=888&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Alberto Alves Pinto</td>
                  <td>Descalvado</td>
                  <td>SP</td>
                  <td>carlosfatore@hotmail.com</td>
                  <td>19 99230-0983 / </td>
                  <td>cpf 300 973 198 13</td>
                  <td>
                    <a href="cliente.php?id=854">Ver</a> <br />
                    <a href="edita-cliente.php?id=854">Editar</a> <br />
                    <a href="destinatario.php?id=854" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=854&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Alberto Alves Pinto</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>19992300983</td>
                  <td>
                    <a href="cliente.php?id=889">Ver</a> <br />
                    <a href="edita-cliente.php?id=889">Editar</a> <br />
                    <a href="destinatario.php?id=889" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=889&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Alberto Rodrigues de Aguiar</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>aguiar.carlosalberto@yahoo.com.br</td>
                  <td>(21) 96445-0638</td>
                  <td>
                    <a href="cliente.php?id=205">Ver</a> <br />
                    <a href="edita-cliente.php?id=205">Editar</a> <br />
                    <a href="destinatario.php?id=205" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=205&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Augusto Souza Carvalho</td>
                  <td>Venda Nova do Imigrante</td>
                  <td>ES</td>
                  <td>farmaguto@gmail.com</td>
                  <td>27 99833-5557</td>
                  <td>
                    <a href="cliente.php?id=1305">Ver</a> <br />
                    <a href="edita-cliente.php?id=1305">Editar</a> <br />
                    <a href="destinatario.php?id=1305" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1305&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Barbosa</td>
                  <td>Loanda</td>
                  <td>PR</td>
                  <td>Carlos_babosa@hotmail.com</td>
                  <td>44 9955-9122 915.730.689-34</td>
                  <td>
                    <a href="cliente.php?id=1114">Ver</a> <br />
                    <a href="edita-cliente.php?id=1114">Editar</a> <br />
                    <a href="destinatario.php?id=1114" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1114&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CARLOS DUTRA</td>
                  <td>Acreúna</td>
                  <td>GO</td>
                  <td>naoinformado@naoinformado</td>
                  <td>64 9326-8314</td>
                  <td>
                    <a href="cliente.php?id=809">Ver</a> <br />
                    <a href="edita-cliente.php?id=809">Editar</a> <br />
                    <a href="destinatario.php?id=809" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=809&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Eduardo da Silva Camilato</td>
                  <td>São Gonçalo</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 98179-7976</td>
                  <td>
                    <a href="cliente.php?id=732">Ver</a> <br />
                    <a href="edita-cliente.php?id=732">Editar</a> <br />
                    <a href="destinatario.php?id=732" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=732&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Romeu Praciano Mendes Junior</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>romeunpc4@gmail.com</td>
                  <td>85 99844-1862 </td>
                  <td>cpf: 02437448381</td>
                  <td>
                    <a href="cliente.php?id=1097">Ver</a> <br />
                    <a href="edita-cliente.php?id=1097">Editar</a> <br />
                    <a href="destinatario.php?id=1097" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1097&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CARLOS VACCO</td>
                  <td>Sorocaba</td>
                  <td>SP</td>
                  <td>carlosvacco@gmail.com</td>
                  <td>(15) 997371717 - (15)3359-5070</td>
                  <td>
                    <a href="cliente.php?id=822">Ver</a> <br />
                    <a href="edita-cliente.php?id=822">Editar</a> <br />
                    <a href="destinatario.php?id=822" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=822&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CARLOS VALERIO DE OLIVEIRA COSTA NASCIMENTO</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>carlosvalerio1974@gmail.com</td>
                  <td>21 99613-9822</td>
                  <td>
                    <a href="cliente.php?id=1256">Ver</a> <br />
                    <a href="edita-cliente.php?id=1256">Editar</a> <br />
                    <a href="destinatario.php?id=1256" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1256&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Vinicius Sousa Oliveira - </td>
                  <td>cpf 073.559.853-37</td>
                  <td>Cascavel</td>
                  <td>CE</td>
                  <td>carlosolivervini@gmail.com</td>
                  <td>85 989603806</td>
                  <td>
                    <a href="cliente.php?id=948">Ver</a> <br />
                    <a href="edita-cliente.php?id=948">Editar</a> <br />
                    <a href="destinatario.php?id=948" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=948&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carmen Suzana Vasquez Menna</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>suzanamenna@hotmail.com</td>
                  <td>(13) 981330459 / (13) 32214416 / </td>
                  <td>cpf: 133.879.83</td>
                  <td>
                    <a href="cliente.php?id=545">Ver</a> <br />
                    <a href="edita-cliente.php?id=545">Editar</a> <br />
                    <a href="destinatario.php?id=545" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=545&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Carolina Guerreiro Penha</td>
                  <td>TUPÃ</td>
                  <td>SP</td>
                  <td>guerreiro0411@gmail.com</td>
                  <td>(14) 99797-9244</td>
                  <td>
                    <a href="cliente.php?id=405">Ver</a> <br />
                    <a href="edita-cliente.php?id=405">Editar</a> <br />
                    <a href="destinatario.php?id=405" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=405&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAROLINA OSORIO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>CAROLOSORIO@ME.COM</td>
                  <td>21 98032.6068 - </td>
                  <td>cnpj-10.905/399/0001-03</td>
                  <td>
                    <a href="cliente.php?id=555">Ver</a> <br />
                    <a href="edita-cliente.php?id=555">Editar</a> <br />
                    <a href="destinatario.php?id=555" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=555&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Caroline Silva de Souza</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>021980836991</td>
                  <td>
                    <a href="cliente.php?id=927">Ver</a> <br />
                    <a href="edita-cliente.php?id=927">Editar</a> <br />
                    <a href="destinatario.php?id=927" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=927&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAROLINY CABRAL</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11 95384-7097</td>
                  <td>
                    <a href="cliente.php?id=829">Ver</a> <br />
                    <a href="edita-cliente.php?id=829">Editar</a> <br />
                    <a href="destinatario.php?id=829" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=829&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CASSIA MARIANA MONTEIRO</td>
                  <td>BOTUCATU</td>
                  <td>SP</td>
                  <td>pd@bothanicamineral.com.br</td>
                  <td>(11) 94516-4810 - </td>
                  <td>cpf-336455468-47</td>
                  <td>
                    <a href="cliente.php?id=567">Ver</a> <br />
                    <a href="edita-cliente.php?id=567">Editar</a> <br />
                    <a href="destinatario.php?id=567" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=567&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cássio Araújo</td>
                  <td>São Bento</td>
                  <td>PB</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>83 8207-4154</td>
                  <td>
                    <a href="cliente.php?id=1115">Ver</a> <br />
                    <a href="edita-cliente.php?id=1115">Editar</a> <br />
                    <a href="destinatario.php?id=1115" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1115&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CAUBI GONÇALVES / Mariana Bosso</td>
                  <td>ITAPIRA</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmai.com</td>
                  <td>19 38432173 / 19 992305694</td>
                  <td>
                    <a href="cliente.php?id=421">Ver</a> <br />
                    <a href="edita-cliente.php?id=421">Editar</a> <br />
                    <a href="destinatario.php?id=421" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=421&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cecilia Aparecida de Sousa Moreira</td>
                  <td>Pirassununga</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>1935627576 </td>
                  <td>cpf: 131813.008.53</td>
                  <td>
                    <a href="cliente.php?id=444">Ver</a> <br />
                    <a href="edita-cliente.php?id=444">Editar</a> <br />
                    <a href="destinatario.php?id=444" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=444&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CÉLIA REGINA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=426">Ver</a> <br />
                    <a href="edita-cliente.php?id=426">Editar</a> <br />
                    <a href="destinatario.php?id=426" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=426&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CÉLIO GRANJA</td>
                  <td>Visconde do Rio Branco</td>
                  <td>MG</td>
                  <td>celiogranja@outlook.com</td>
                  <td>32 8876-6612</td>
                  <td>
                    <a href="cliente.php?id=206">Ver</a> <br />
                    <a href="edita-cliente.php?id=206">Editar</a> <br />
                    <a href="destinatario.php?id=206" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=206&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CELSO SILVESTRE RIBEIRO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>8591605178</td>
                  <td>
                    <a href="cliente.php?id=840">Ver</a> <br />
                    <a href="edita-cliente.php?id=840">Editar</a> <br />
                    <a href="destinatario.php?id=840" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=840&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CÉSAR SENA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>cesar@s3consultoria.com.br</td>
                  <td>(85) 99712-0607</td>
                  <td>
                    <a href="cliente.php?id=381">Ver</a> <br />
                    <a href="edita-cliente.php?id=381">Editar</a> <br />
                    <a href="destinatario.php?id=381" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=381&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Chavier</td>
                  <td>Sao Paulo</td>
                  <td>SP</td>
                  <td>maximosx@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=177">Ver</a> <br />
                    <a href="edita-cliente.php?id=177">Editar</a> <br />
                    <a href="destinatario.php?id=177" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=177&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Christiane Farias</td>
                  <td>CABO FRIO</td>
                  <td>RJ</td>
                  <td>christianefariias@gmail.com</td>
                  <td>(21) 99706-0275 </td>
                  <td>cpf: 17142313722</td>
                  <td>
                    <a href="cliente.php?id=428">Ver</a> <br />
                    <a href="edita-cliente.php?id=428">Editar</a> <br />
                    <a href="destinatario.php?id=428" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=428&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CIDA CARRIEL</td>
                  <td>Itapetininga</td>
                  <td>SP</td>
                  <td>cicarriel@gmail.com</td>
                  <td>15 997241517 </td>
                  <td>cpf: 021.272.228-06</td>
                  <td>
                    <a href="cliente.php?id=71">Ver</a> <br />
                    <a href="edita-cliente.php?id=71">Editar</a> <br />
                    <a href="destinatario.php?id=71" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=71&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cintia Jacó hessel vieira</td>
                  <td>Tatuí</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>15 99624-6832</td>
                  <td>
                    <a href="cliente.php?id=831">Ver</a> <br />
                    <a href="edita-cliente.php?id=831">Editar</a> <br />
                    <a href="destinatario.php?id=831" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=831&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CINTIA TAVARES</td>
                  <td>SÃO VICENTE</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=468">Ver</a> <br />
                    <a href="edita-cliente.php?id=468">Editar</a> <br />
                    <a href="destinatario.php?id=468" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=468&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CIRLENE BEE</td>
                  <td>CAMPINAS</td>
                  <td>SP</td>
                  <td>cbbenv@hotmail.com</td>
                  <td>19- 982920319</td>
                  <td>
                    <a href="cliente.php?id=337">Ver</a> <br />
                    <a href="edita-cliente.php?id=337">Editar</a> <br />
                    <a href="destinatario.php?id=337" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=337&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claiton Bueno dos Santos</td>
                  <td>Rio Grande RS</td>
                  <td>RS</td>
                  <td>kako.42@hotmail.com</td>
                  <td>5399453324</td>
                  <td>
                    <a href="cliente.php?id=1186">Ver</a> <br />
                    <a href="edita-cliente.php?id=1186">Editar</a> <br />
                    <a href="destinatario.php?id=1186" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1186&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Clarisse Cassol</td>
                  <td>NÃO FORNECIDO</td>
                  <td>SP</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>51 9918-1681 CP</td>
                  <td>
                    <a href="cliente.php?id=1102">Ver</a> <br />
                    <a href="edita-cliente.php?id=1102">Editar</a> <br />
                    <a href="destinatario.php?id=1102" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1102&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudete - Guaruja</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13974146160</td>
                  <td>
                    <a href="cliente.php?id=846">Ver</a> <br />
                    <a href="edita-cliente.php?id=846">Editar</a> <br />
                    <a href="destinatario.php?id=846" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=846&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudia Chandelier</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>claudia.chande@hotmail.com</td>
                  <td>11 99752-2209</td>
                  <td>
                    <a href="cliente.php?id=243">Ver</a> <br />
                    <a href="edita-cliente.php?id=243">Editar</a> <br />
                    <a href="destinatario.php?id=243" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=243&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudia Marcia Botelho Ribeiro</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>Claudiamarcia1958@hotmail.com</td>
                  <td>21 98724-4919</td>
                  <td>
                    <a href="cliente.php?id=956">Ver</a> <br />
                    <a href="edita-cliente.php?id=956">Editar</a> <br />
                    <a href="destinatario.php?id=956" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=956&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudia Marcia Botelho Ribeiro</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>Claudiamarcia1958@hotmail.com</td>
                  <td>21 98724-4919</td>
                  <td>
                    <a href="cliente.php?id=957">Ver</a> <br />
                    <a href="edita-cliente.php?id=957">Editar</a> <br />
                    <a href="destinatario.php?id=957" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=957&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Claudinea Beraldo Rosa</td>
                  <td>Guaratuba</td>
                  <td>PR</td>
                  <td>beraldorosaclaudineia28@gmail.com</td>
                  <td>41 9161-5519</td>
                  <td>
                    <a href="cliente.php?id=1176">Ver</a> <br />
                    <a href="edita-cliente.php?id=1176">Editar</a> <br />
                    <a href="destinatario.php?id=1176" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1176&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Clayton Castro</td>
                  <td>Congonhas</td>
                  <td>MG</td>
                  <td>clickserrana@hotmail.com</td>
                  <td>(31) 3731-2704 fixo (31) 9937-0271 vivo (31) 8893-</td>
                  <td>
                    <a href="cliente.php?id=422">Ver</a> <br />
                    <a href="edita-cliente.php?id=422">Editar</a> <br />
                    <a href="destinatario.php?id=422" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=422&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Clayton Freitas Silva Canuto</td>
                  <td>Barra Mansa</td>
                  <td>SP</td>
                  <td>claytonfreitasii0@gmail.com</td>
                  <td>24981133534</td>
                  <td>
                    <a href="cliente.php?id=1289">Ver</a> <br />
                    <a href="edita-cliente.php?id=1289">Editar</a> <br />
                    <a href="destinatario.php?id=1289" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1289&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cleidimar Ribeiro Duarte</td>
                  <td>Brasília</td>
                  <td>DF</td>
                  <td>Cleidimarduarte3@gmail.com</td>
                  <td>Tel.61 98376-3982</td>
                  <td>
                    <a href="cliente.php?id=1349">Ver</a> <br />
                    <a href="edita-cliente.php?id=1349">Editar</a> <br />
                    <a href="destinatario.php?id=1349" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1349&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cleyton Pereira Silva</td>
                  <td>Ribeirão Preto</td>
                  <td>SP</td>
                  <td>cleyton.silva@grupomundoverde.com.br</td>
                  <td>11948487351 </td>
                  <td>cpf 422.807.228-36</td>
                  <td>
                    <a href="cliente.php?id=1185">Ver</a> <br />
                    <a href="edita-cliente.php?id=1185">Editar</a> <br />
                    <a href="destinatario.php?id=1185" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1185&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CLIENTE ANÔNIMO</td>
                  <td>TODO BRASIL</td>
                  <td>AC</td>
                  <td>CLIENTE@HOTMAIL.COM</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=70">Ver</a> <br />
                    <a href="edita-cliente.php?id=70">Editar</a> <br />
                    <a href="destinatario.php?id=70" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=70&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Clinica Mirthra - Beatris</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>13998047975</td>
                  <td>
                    <a href="cliente.php?id=1245">Ver</a> <br />
                    <a href="edita-cliente.php?id=1245">Editar</a> <br />
                    <a href="destinatario.php?id=1245" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1245&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>COLBERT FERREIRA</td>
                  <td>BAURU</td>
                  <td>SP</td>
                  <td>colbertt@gmail.com</td>
                  <td>(14) 99125-8553</td>
                  <td>
                    <a href="cliente.php?id=51">Ver</a> <br />
                    <a href="edita-cliente.php?id=51">Editar</a> <br />
                    <a href="destinatario.php?id=51" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=51&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CONCEIÇÃO FERNANDES DOS SANTOS</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>vendas@barradesabao.com</td>
                  <td>3184939180</td>
                  <td>
                    <a href="cliente.php?id=772">Ver</a> <br />
                    <a href="edita-cliente.php?id=772">Editar</a> <br />
                    <a href="destinatario.php?id=772" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=772&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Conceição Fernandes dos Santos</td>
                  <td>Belo Horizonte</td>
                  <td>MG</td>
                  <td>conceicon@gmail.com</td>
                  <td>3184939180</td>
                  <td>
                    <a href="cliente.php?id=1272">Ver</a> <br />
                    <a href="edita-cliente.php?id=1272">Editar</a> <br />
                    <a href="destinatario.php?id=1272" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1272&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CONSUELO GONÇALVES</td>
                  <td>DIVINOPOLIS</td>
                  <td>MG</td>
                  <td>consuelo13goncalves@gmail.com</td>
                  <td>37 998737267</td>
                  <td>
                    <a href="cliente.php?id=439">Ver</a> <br />
                    <a href="edita-cliente.php?id=439">Editar</a> <br />
                    <a href="destinatario.php?id=439" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=439&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRIS</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=611">Ver</a> <br />
                    <a href="edita-cliente.php?id=611">Editar</a> <br />
                    <a href="destinatario.php?id=611" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=611&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISEIDE MALTA</td>
                  <td>LEME</td>
                  <td>SP</td>
                  <td>criseieluisa15@gmail.com</td>
                  <td>19 3554 6853</td>
                  <td>
                    <a href="cliente.php?id=370">Ver</a> <br />
                    <a href="edita-cliente.php?id=370">Editar</a> <br />
                    <a href="destinatario.php?id=370" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=370&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTHIANE FERRAZ</td>
                  <td>DUQUE DE CAXIAS</td>
                  <td>RJ</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=379">Ver</a> <br />
                    <a href="edita-cliente.php?id=379">Editar</a> <br />
                    <a href="destinatario.php?id=379" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=379&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTHIANE SOUZA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>CRISSOUZZA13@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=228">Ver</a> <br />
                    <a href="edita-cliente.php?id=228">Editar</a> <br />
                    <a href="destinatario.php?id=228" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=228&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTIAN LUCAS DE SOUZA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>1143092316</td>
                  <td>
                    <a href="cliente.php?id=249">Ver</a> <br />
                    <a href="edita-cliente.php?id=249">Editar</a> <br />
                    <a href="destinatario.php?id=249" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=249&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTIAN HELEN OLIVEIRA SANTOS ALMEIDA</td>
                  <td>DOURADOS</td>
                  <td>MS</td>
                  <td>cristianhelen.o.s.a@gmail.com</td>
                  <td>67 9994-0051 49.910.572/0001-05</td>
                  <td>
                    <a href="cliente.php?id=804">Ver</a> <br />
                    <a href="edita-cliente.php?id=804">Editar</a> <br />
                    <a href="destinatario.php?id=804" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=804&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cristiane Araújo</td>
                  <td>ARACAJU</td>
                  <td>SE</td>
                  <td>channelbrasil@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=168">Ver</a> <br />
                    <a href="edita-cliente.php?id=168">Editar</a> <br />
                    <a href="destinatario.php?id=168" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=168&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTIANE FERNANDES F.</td>
                  <td>BELFORD ROXO</td>
                  <td>RJ</td>
                  <td>crisevaldecir@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=325">Ver</a> <br />
                    <a href="edita-cliente.php?id=325">Editar</a> <br />
                    <a href="destinatario.php?id=325" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=325&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CRISTIANE RACY</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11 99602-6471</td>
                  <td>
                    <a href="cliente.php?id=491">Ver</a> <br />
                    <a href="edita-cliente.php?id=491">Editar</a> <br />
                    <a href="destinatario.php?id=491" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=491&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cristiano Favero</td>
                  <td>Porto Alegre</td>
                  <td>RS</td>
                  <td>holyessencias@live.com</td>
                  <td>51 9633-1029</td>
                  <td>
                    <a href="cliente.php?id=853">Ver</a> <br />
                    <a href="edita-cliente.php?id=853">Editar</a> <br />
                    <a href="destinatario.php?id=853" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=853&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cristina da Silva Ramos</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>crisramos@crisramos.om.br</td>
                  <td>13 991180062</td>
                  <td>
                    <a href="cliente.php?id=505">Ver</a> <br />
                    <a href="edita-cliente.php?id=505">Editar</a> <br />
                    <a href="destinatario.php?id=505" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=505&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cristina Marcelino de Moura</td>
                  <td>Sorocaba</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>015 98160.3404</td>
                  <td>
                    <a href="cliente.php?id=452">Ver</a> <br />
                    <a href="edita-cliente.php?id=452">Editar</a> <br />
                    <a href="destinatario.php?id=452" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=452&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cristina Marcelino de Moura</td>
                  <td>Suzano</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11974919632</td>
                  <td>
                    <a href="cliente.php?id=564">Ver</a> <br />
                    <a href="edita-cliente.php?id=564">Editar</a> <br />
                    <a href="destinatario.php?id=564" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=564&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Crysthiany Lais Moraes de Avelino Renovato</td>
                  <td>DOURADOS</td>
                  <td>MS</td>
                  <td>crysrenovato@uol.com.br</td>
                  <td>67 3422 2859 3421 9670</td>
                  <td>
                    <a href="cliente.php?id=282">Ver</a> <br />
                    <a href="edita-cliente.php?id=282">Editar</a> <br />
                    <a href="destinatario.php?id=282" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=282&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>CURVE À PORTE - A/C DOUGLAS F. SANTANA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>curveaporter@gmail.com</td>
                  <td>marcela : 11 98120-3216 / Douglas: 98656-1608</td>
                  <td>
                    <a href="cliente.php?id=490">Ver</a> <br />
                    <a href="edita-cliente.php?id=490">Editar</a> <br />
                    <a href="destinatario.php?id=490" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=490&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cynthia</td>
                  <td>santos</td>
                  <td>SP</td>
                  <td>cynthiartpam@bol.com.br</td>
                  <td>000000000</td>
                  <td>
                    <a href="cliente.php?id=574">Ver</a> <br />
                    <a href="edita-cliente.php?id=574">Editar</a> <br />
                    <a href="destinatario.php?id=574" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=574&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cyntia Regina da S Gonçalo</td>
                  <td>João Pessoa</td>
                  <td>PB</td>
                  <td>cintya.reg@gmail.com</td>
                  <td>8399551661</td>
                  <td>
                    <a href="cliente.php?id=1298">Ver</a> <br />
                    <a href="edita-cliente.php?id=1298">Editar</a> <br />
                    <a href="destinatario.php?id=1298" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1298&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAIANE A. PERALTA COSTA</td>
                  <td>QUATÁ</td>
                  <td>SP</td>
                  <td>dai_peralta@yahoo.com.br</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=312">Ver</a> <br />
                    <a href="edita-cliente.php?id=312">Editar</a> <br />
                    <a href="destinatario.php?id=312" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=312&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAIANE EHRHARDT</td>
                  <td>ARVREZINHA</td>
                  <td>RS</td>
                  <td>daiane.ehrhardt@hotmail.com</td>
                  <td>51- 8042-7019</td>
                  <td>
                    <a href="cliente.php?id=340">Ver</a> <br />
                    <a href="edita-cliente.php?id=340">Editar</a> <br />
                    <a href="destinatario.php?id=340" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=340&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daiane krug</td>
                  <td>nao informada</td>
                  <td>SP</td>
                  <td>daiaessencia@gmail.com</td>
                  <td>51 99786-5561</td>
                  <td>
                    <a href="cliente.php?id=1099">Ver</a> <br />
                    <a href="edita-cliente.php?id=1099">Editar</a> <br />
                    <a href="destinatario.php?id=1099" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1099&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAISE AUGUSTA LIMA</td>
                  <td>SÃO PAULO SP</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>110981941711</td>
                  <td>
                    <a href="cliente.php?id=714">Ver</a> <br />
                    <a href="edita-cliente.php?id=714">Editar</a> <br />
                    <a href="destinatario.php?id=714" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=714&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAISY DE OLIVEIRA NOGUEIRA SILVEIRA</td>
                  <td>MOSSSORO</td>
                  <td>RN</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8487317207</td>
                  <td>
                    <a href="cliente.php?id=746">Ver</a> <br />
                    <a href="edita-cliente.php?id=746">Editar</a> <br />
                    <a href="destinatario.php?id=746" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=746&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DALIA SOARES</td>
                  <td>IPU</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>8897210179</td>
                  <td>
                    <a href="cliente.php?id=702">Ver</a> <br />
                    <a href="edita-cliente.php?id=702">Editar</a> <br />
                    <a href="destinatario.php?id=702" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=702&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Damaris Martins de Melo Correa</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>11 95896-3022</td>
                  <td>
                    <a href="cliente.php?id=1143">Ver</a> <br />
                    <a href="edita-cliente.php?id=1143">Editar</a> <br />
                    <a href="destinatario.php?id=1143" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1143&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Damián Alfonso Arrieta - Tu Esencia Esencial</td>
                  <td>Montevideo - Uruguai</td>
                  <td>SP</td>
                  <td>proveedores@tuesenciaesencial.com</td>
                  <td>598 92 136 446</td>
                  <td>
                    <a href="cliente.php?id=992">Ver</a> <br />
                    <a href="edita-cliente.php?id=992">Editar</a> <br />
                    <a href="destinatario.php?id=992" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=992&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Damião Ferreira Silva</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>all.aromas10@gmail.com</td>
                  <td>21 99479-6324 </td>
                  <td>cpf 00888716837</td>
                  <td>
                    <a href="cliente.php?id=979">Ver</a> <br />
                    <a href="edita-cliente.php?id=979">Editar</a> <br />
                    <a href="destinatario.php?id=979" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=979&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniane Pereira da Silva .</td>
                  <td>Montes Claros</td>
                  <td>MG</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>38 9224-1180 </td>
                  <td>cpf 06640461692</td>
                  <td>
                    <a href="cliente.php?id=1050">Ver</a> <br />
                    <a href="edita-cliente.php?id=1050">Editar</a> <br />
                    <a href="destinatario.php?id=1050" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1050&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniane Pereira da Silva .</td>
                  <td>Montes Claros</td>
                  <td>MG</td>
                  <td>Danianepereira84@gmail.com</td>
                  <td>38 9224-1180 </td>
                  <td>cpf 06640461692</td>
                  <td>
                    <a href="cliente.php?id=1051">Ver</a> <br />
                    <a href="edita-cliente.php?id=1051">Editar</a> <br />
                    <a href="destinatario.php?id=1051" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1051&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniel Alves</td>
                  <td>RIO DE JANEIRO</td>
                  <td>SP</td>
                  <td>daniel.4.a@hotmail.com</td>
                  <td>21-998294638</td>
                  <td>
                    <a href="cliente.php?id=563">Ver</a> <br />
                    <a href="edita-cliente.php?id=563">Editar</a> <br />
                    <a href="destinatario.php?id=563" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=563&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniel Dantas</td>
                  <td>Cotia</td>
                  <td>SP</td>
                  <td>danielpsdantas@hotmail.com</td>
                  <td>11 95551-9598</td>
                  <td>
                    <a href="cliente.php?id=1162">Ver</a> <br />
                    <a href="edita-cliente.php?id=1162">Editar</a> <br />
                    <a href="destinatario.php?id=1162" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1162&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIEL SOUZA</td>
                  <td>PIEDADE</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>15997953693</td>
                  <td>
                    <a href="cliente.php?id=662">Ver</a> <br />
                    <a href="edita-cliente.php?id=662">Editar</a> <br />
                    <a href="destinatario.php?id=662" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=662&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIEL TAVARES DOS SANTOS</td>
                  <td>ARAPIRACA</td>
                  <td>AL</td>
                  <td>SEM.EMAIL@SEMEMAIL.COM</td>
                  <td>82 35396249 / 82 96326763</td>
                  <td>
                    <a href="cliente.php?id=122">Ver</a> <br />
                    <a href="edita-cliente.php?id=122">Editar</a> <br />
                    <a href="destinatario.php?id=122" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=122&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniel Trindade</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>aaaaa@mail.com</td>
                  <td>21999999</td>
                  <td>
                    <a href="cliente.php?id=952">Ver</a> <br />
                    <a href="edita-cliente.php?id=952">Editar</a> <br />
                    <a href="destinatario.php?id=952" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=952&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIELA ALVES</td>
                  <td>OSASCO</td>
                  <td>SP</td>
                  <td>santascriacoes@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=552">Ver</a> <br />
                    <a href="edita-cliente.php?id=552">Editar</a> <br />
                    <a href="destinatario.php?id=552" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=552&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIELA BEZERRA</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>danielalourdes@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=306">Ver</a> <br />
                    <a href="edita-cliente.php?id=306">Editar</a> <br />
                    <a href="destinatario.php?id=306" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=306&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIELA BUENO</td>
                  <td>LEME</td>
                  <td>SP</td>
                  <td>danielabueno2003@ig.com.br</td>
                  <td>19 991166008</td>
                  <td>
                    <a href="cliente.php?id=99">Ver</a> <br />
                    <a href="edita-cliente.php?id=99">Editar</a> <br />
                    <a href="destinatario.php?id=99" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=99&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniela Christina Dias Del Rei Pinto Peixoto Pereira</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>991218641</td>
                  <td>
                    <a href="cliente.php?id=920">Ver</a> <br />
                    <a href="edita-cliente.php?id=920">Editar</a> <br />
                    <a href="destinatario.php?id=920" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=920&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniela Christina Dias Del Rei Pinto Peixoto Pereira</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>991218641</td>
                  <td>
                    <a href="cliente.php?id=899">Ver</a> <br />
                    <a href="edita-cliente.php?id=899">Editar</a> <br />
                    <a href="destinatario.php?id=899" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=899&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANIELA DEL REI</td>
                  <td>CAMINHO</td>
                  <td>SP</td>
                  <td>NADINESENNA@HOTMAIL.COM</td>
                  <td>21981986883 / 13 991218641</td>
                  <td>
                    <a href="cliente.php?id=599">Ver</a> <br />
                    <a href="edita-cliente.php?id=599">Editar</a> <br />
                    <a href="destinatario.php?id=599" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=599&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Daniela Serafim</td>
                  <td>TATUI</td>
                  <td>SP</td>
                  <td>dhany30@uol.com.br</td>
                  <td>(15) 99803-9595</td>
                  <td>
                    <a href="cliente.php?id=429">Ver</a> <br />
                    <a href="edita-cliente.php?id=429">Editar</a> <br />
                    <a href="destinatario.php?id=429" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=429&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Danieli Camilo Marcato</td>
                  <td>Ribeirão Bonito</td>
                  <td>SP</td>
                  <td>danicmarcato@gmail.com</td>
                  <td>(16) 997321896</td>
                  <td>
                    <a href="cliente.php?id=481">Ver</a> <br />
                    <a href="edita-cliente.php?id=481">Editar</a> <br />
                    <a href="destinatario.php?id=481" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=481&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Danilo Cezar Fogagnoli Zanotello</td>
                  <td>CALDAS NOVAS</td>
                  <td>GO</td>
                  <td>dcfzanotello@gmail.com</td>
                  <td></td>
                  <td>cpf 00477512151 TEL 64 9232-3725</td>
                  <td>
                    <a href="cliente.php?id=925">Ver</a> <br />
                    <a href="edita-cliente.php?id=925">Editar</a> <br />
                    <a href="destinatario.php?id=925" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=925&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANILO QUEIROZ FERNANDES</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>danilounifor@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=565">Ver</a> <br />
                    <a href="edita-cliente.php?id=565">Editar</a> <br />
                    <a href="destinatario.php?id=565" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=565&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Danilo Suzuki Garcia</td>
                  <td>São Jose do Rio Preto</td>
                  <td>SP</td>
                  <td>da_nilo8@hotmail.com</td>
                  <td>017 99162-8208</td>
                  <td>
                    <a href="cliente.php?id=179">Ver</a> <br />
                    <a href="edita-cliente.php?id=179">Editar</a> <br />
                    <a href="destinatario.php?id=179" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=179&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANNER NERES DOS SANTOS</td>
                  <td>IPORA</td>
                  <td>GO</td>
                  <td>djdennerneres@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=121">Ver</a> <br />
                    <a href="edita-cliente.php?id=121">Editar</a> <br />
                    <a href="destinatario.php?id=121" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=121&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Danubia Silva de Matos Nobrega</td>
                  <td>São Vicente</td>
                  <td>SP</td>
                  <td>compras.mahaoo@gmail.com</td>
                  <td>13 997444744</td>
                  <td>
                    <a href="cliente.php?id=484">Ver</a> <br />
                    <a href="edita-cliente.php?id=484">Editar</a> <br />
                    <a href="destinatario.php?id=484" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=484&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DANUZA FAGGI</td>
                  <td>SÃO BERNADO DO CAMPO</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=305">Ver</a> <br />
                    <a href="edita-cliente.php?id=305">Editar</a> <br />
                    <a href="destinatario.php?id=305" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=305&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DARLON TRETTO</td>
                  <td>Liberato Salzano</td>
                  <td>RS</td>
                  <td>darlontretto85@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=237">Ver</a> <br />
                    <a href="edita-cliente.php?id=237">Editar</a> <br />
                    <a href="destinatario.php?id=237" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=237&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAVID CLAUDIO BARBOSA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>daviclaudio.barbosa@gmail.com</td>
                  <td>21 34898236</td>
                  <td>
                    <a href="cliente.php?id=120">Ver</a> <br />
                    <a href="edita-cliente.php?id=120">Editar</a> <br />
                    <a href="destinatario.php?id=120" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=120&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Davidson-Bruna Ferreira Xavier</td>
                  <td>Contagem - MG</td>
                  <td>MG</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>03193775360</td>
                  <td>
                    <a href="cliente.php?id=675">Ver</a> <br />
                    <a href="edita-cliente.php?id=675">Editar</a> <br />
                    <a href="destinatario.php?id=675" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=675&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Davila Mota</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>85 9 9841936</td>
                  <td>
                    <a href="cliente.php?id=723">Ver</a> <br />
                    <a href="edita-cliente.php?id=723">Editar</a> <br />
                    <a href="destinatario.php?id=723" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=723&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAYANA AGRA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>DAYANAAGRA@HOTMAIL.COM</td>
                  <td>1128199060</td>
                  <td>
                    <a href="cliente.php?id=141">Ver</a> <br />
                    <a href="edita-cliente.php?id=141">Editar</a> <br />
                    <a href="destinatario.php?id=141" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=141&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DAYSE VERÍSSIMO</td>
                  <td>CAMPINA GRANDE</td>
                  <td>PB</td>
                  <td>dayse0811@gmail.com</td>
                  <td>83 99658-6418</td>
                  <td>
                    <a href="cliente.php?id=469">Ver</a> <br />
                    <a href="edita-cliente.php?id=469">Editar</a> <br />
                    <a href="destinatario.php?id=469" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=469&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Dayvison Pereira Lacerda</td>
                  <td>Belo Horizonte</td>
                  <td>MG</td>
                  <td>dayvisonlacerda@gmail.com</td>
                  <td>31 9847-6050</td>
                  <td>
                    <a href="cliente.php?id=1255">Ver</a> <br />
                    <a href="edita-cliente.php?id=1255">Editar</a> <br />
                    <a href="destinatario.php?id=1255" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1255&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DEA BAIARDI</td>
                  <td>Vila Guarani</td>
                  <td>SP</td>
                  <td>deabaiardi@gmail.com</td>
                  <td>11 98080-1712 </td>
                  <td>cpf: 30140288864</td>
                  <td>
                    <a href="cliente.php?id=1086">Ver</a> <br />
                    <a href="edita-cliente.php?id=1086">Editar</a> <br />
                    <a href="destinatario.php?id=1086" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1086&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DEBORA AQUINO</td>
                  <td>SÃO Paulo</td>
                  <td>SP</td>
                  <td>debora.aquino@outlook.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=184">Ver</a> <br />
                    <a href="edita-cliente.php?id=184">Editar</a> <br />
                    <a href="destinatario.php?id=184" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=184&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Débora Gonsalves</td>
                  <td>Piracicaba</td>
                  <td>SP</td>
                  <td>gonsalvesde@gmail.com</td>
                  <td>19 98253-0246 26479404874</td>
                  <td>
                    <a href="cliente.php?id=1223">Ver</a> <br />
                    <a href="edita-cliente.php?id=1223">Editar</a> <br />
                    <a href="destinatario.php?id=1223" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1223&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DEBORA MÓL CARVALHO</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>deboramolcarvalho@gmail.com</td>
                  <td>31 988838178</td>
                  <td>
                    <a href="cliente.php?id=69">Ver</a> <br />
                    <a href="edita-cliente.php?id=69">Editar</a> <br />
                    <a href="destinatario.php?id=69" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=69&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Denilio Denes costa</td>
                  <td>APODI</td>
                  <td>RN</td>
                  <td>denesapodi@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=524">Ver</a> <br />
                    <a href="edita-cliente.php?id=524">Editar</a> <br />
                    <a href="destinatario.php?id=524" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=524&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Denise Lages</td>
                  <td>Porto Alegre</td>
                  <td>RS</td>
                  <td>de.lages@hotmail.com</td>
                  <td>51 9914-8646</td>
                  <td>
                    <a href="cliente.php?id=648">Ver</a> <br />
                    <a href="edita-cliente.php?id=648">Editar</a> <br />
                    <a href="destinatario.php?id=648" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=648&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Denise Lopes Souza</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>denise03_26@hotmail.com</td>
                  <td>11981141741</td>
                  <td>
                    <a href="cliente.php?id=1243">Ver</a> <br />
                    <a href="edita-cliente.php?id=1243">Editar</a> <br />
                    <a href="destinatario.php?id=1243" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1243&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Denise Sampaio da Silva</td>
                  <td>Itatiaia</td>
                  <td>SP</td>
                  <td>denisesampaiobispo@yahoo.com.br</td>
                  <td>21991191334</td>
                  <td>
                    <a href="cliente.php?id=1151">Ver</a> <br />
                    <a href="edita-cliente.php?id=1151">Editar</a> <br />
                    <a href="destinatario.php?id=1151" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1151&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Denise Sampaio da Silva</td>
                  <td>Itatiaia</td>
                  <td>RJ</td>
                  <td>denisesampaiobispo@yahoo.com.br</td>
                  <td>21 99119-1334</td>
                  <td>
                    <a href="cliente.php?id=1154">Ver</a> <br />
                    <a href="edita-cliente.php?id=1154">Editar</a> <br />
                    <a href="destinatario.php?id=1154" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1154&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DERMOPHARMA</td>
                  <td>SARANDI</td>
                  <td>RS</td>
                  <td>dermopharmasarandi@yahoo.com.br</td>
                  <td>54 3361-4125</td>
                  <td>
                    <a href="cliente.php?id=463">Ver</a> <br />
                    <a href="edita-cliente.php?id=463">Editar</a> <br />
                    <a href="destinatario.php?id=463" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=463&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DEYLISON MARINHO</td>
                  <td>CARIACICA</td>
                  <td>CE</td>
                  <td>deylisonbmx@gmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=165">Ver</a> <br />
                    <a href="edita-cliente.php?id=165">Editar</a> <br />
                    <a href="destinatario.php?id=165" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=165&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Deyllyse Alves Fernandes Martins</td>
                  <td>desconhecida</td>
                  <td>SP</td>
                  <td>deyllyse.martins@pesqueira.ifpe.edu.br</td>
                  <td>81 99724-6064</td>
                  <td>
                    <a href="cliente.php?id=1149">Ver</a> <br />
                    <a href="edita-cliente.php?id=1149">Editar</a> <br />
                    <a href="destinatario.php?id=1149" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1149&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Deyvison Henrique Rodrigues Martins</td>
                  <td>Guarulhos</td>
                  <td>SP</td>
                  <td>Deyvison.martins87@gmail.com</td>
                  <td>11 94316-5974</td>
                  <td>
                    <a href="cliente.php?id=1160">Ver</a> <br />
                    <a href="edita-cliente.php?id=1160">Editar</a> <br />
                    <a href="destinatario.php?id=1160" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1160&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Dhiego Silva dos Santos</td>
                  <td>Dourados</td>
                  <td>MS</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>67 9637-2727</td>
                  <td>
                    <a href="cliente.php?id=1229">Ver</a> <br />
                    <a href="edita-cliente.php?id=1229">Editar</a> <br />
                    <a href="destinatario.php?id=1229" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1229&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DHYLAN CHAVIER</td>
                  <td>CAMBE</td>
                  <td>SP</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>43 9847-2622 / 9919-7728</td>
                  <td>
                    <a href="cliente.php?id=215">Ver</a> <br />
                    <a href="edita-cliente.php?id=215">Editar</a> <br />
                    <a href="destinatario.php?id=215" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=215&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Diego L. Lima</td>
                  <td>Ourinhos</td>
                  <td>SP</td>
                  <td>diegoluisdelima@gmail.com</td>
                  <td>14 991018427</td>
                  <td>
                    <a href="cliente.php?id=96">Ver</a> <br />
                    <a href="edita-cliente.php?id=96">Editar</a> <br />
                    <a href="destinatario.php?id=96" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=96&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DIEGO RAFAEL MARTINS COSTA</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11 98383-8602</td>
                  <td>
                    <a href="cliente.php?id=598">Ver</a> <br />
                    <a href="edita-cliente.php?id=598">Editar</a> <br />
                    <a href="destinatario.php?id=598" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=598&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Dircéia / Marizi</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>981568527</td>
                  <td>
                    <a href="cliente.php?id=717">Ver</a> <br />
                    <a href="edita-cliente.php?id=717">Editar</a> <br />
                    <a href="destinatario.php?id=717" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=717&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DIRCEU MASTROIANNE SOARES HERCULANO</td>
                  <td>CAUCAIA</td>
                  <td>CE</td>
                  <td>dirceuherculano@gmail.com</td>
                  <td>85 97160477</td>
                  <td>
                    <a href="cliente.php?id=508">Ver</a> <br />
                    <a href="edita-cliente.php?id=508">Editar</a> <br />
                    <a href="destinatario.php?id=508" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=508&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Divaldo Alves</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>divaldoalvesmei@gmail.com</td>
                  <td>11 99376-8206</td>
                  <td>
                    <a href="cliente.php?id=1148">Ver</a> <br />
                    <a href="edita-cliente.php?id=1148">Editar</a> <br />
                    <a href="destinatario.php?id=1148" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1148&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DJALMA DUARTE</td>
                  <td>FARTURA</td>
                  <td>SP</td>
                  <td>nutrimasteragronegocio@hotmail.com</td>
                  <td>43 96106687</td>
                  <td>
                    <a href="cliente.php?id=296">Ver</a> <br />
                    <a href="edita-cliente.php?id=296">Editar</a> <br />
                    <a href="destinatario.php?id=296" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=296&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DOMINGAS DE JESUS ROCHA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>thiago.mansinho@lidertel.com.br</td>
                  <td>11 991433069</td>
                  <td>
                    <a href="cliente.php?id=326">Ver</a> <br />
                    <a href="edita-cliente.php?id=326">Editar</a> <br />
                    <a href="destinatario.php?id=326" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=326&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Domingos Bastos de Souza</td>
                  <td>Irecê</td>
                  <td>BA</td>
                  <td>doming46@hotmail.com.br</td>
                  <td>74 999035036.</td>
                  <td>
                    <a href="cliente.php?id=500">Ver</a> <br />
                    <a href="edita-cliente.php?id=500">Editar</a> <br />
                    <a href="destinatario.php?id=500" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=500&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DORIVAL MAGANO</td>
                  <td>LENÇÓIS PAULISTA</td>
                  <td>SP</td>
                  <td>dorival.magano@eldoradobrasil.com.br</td>
                  <td>67 99866-9593</td>
                  <td>
                    <a href="cliente.php?id=374">Ver</a> <br />
                    <a href="edita-cliente.php?id=374">Editar</a> <br />
                    <a href="destinatario.php?id=374" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=374&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>DT LOGISTICA E SERVIÇOS LTDA</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=917">Ver</a> <br />
                    <a href="edita-cliente.php?id=917">Editar</a> <br />
                    <a href="destinatario.php?id=917" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=917&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Durvanir Duarte</td>
                  <td>Cristina Goiania</td>
                  <td>GO</td>
                  <td>durvanir1@hotmail.com</td>
                  <td>6293152994</td>
                  <td>
                    <a href="cliente.php?id=1234">Ver</a> <br />
                    <a href="edita-cliente.php?id=1234">Editar</a> <br />
                    <a href="destinatario.php?id=1234" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1234&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EAU DE MIRRA COSMETICOS</td>
                  <td>Quixadá</td>
                  <td>CE</td>
                  <td>maximocapistrano@bol.com.br</td>
                  <td></td>
                  <td>cnpj 27.825.312/0001-90</td>
                  <td>
                    <a href="cliente.php?id=624">Ver</a> <br />
                    <a href="edita-cliente.php?id=624">Editar</a> <br />
                    <a href="destinatario.php?id=624" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=624&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDERSON FARIAS</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>JOYCEGUIZZO@GMAIL.COM.BR</td>
                  <td>11 4378-5512</td>
                  <td>
                    <a href="cliente.php?id=59">Ver</a> <br />
                    <a href="edita-cliente.php?id=59">Editar</a> <br />
                    <a href="destinatario.php?id=59" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=59&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDGAR NASCIMENTO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>nascimento@rodrimar.com.br</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=309">Ver</a> <br />
                    <a href="edita-cliente.php?id=309">Editar</a> <br />
                    <a href="destinatario.php?id=309" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=309&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ediana A Quaggiotto Malavolti</td>
                  <td>Castelo</td>
                  <td>ES</td>
                  <td>edianamalavolti@hotmail.com</td>
                  <td>28 99992-5192</td>
                  <td>
                    <a href="cliente.php?id=1118">Ver</a> <br />
                    <a href="edita-cliente.php?id=1118">Editar</a> <br />
                    <a href="destinatario.php?id=1118" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1118&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Edilma Pires Conceição</td>
                  <td>nao informada</td>
                  <td>SP</td>
                  <td>dilma040dilma040@outlook.com</td>
                  <td>71 992129100</td>
                  <td>
                    <a href="cliente.php?id=1265">Ver</a> <br />
                    <a href="edita-cliente.php?id=1265">Editar</a> <br />
                    <a href="destinatario.php?id=1265" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1265&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDILSON VIERIA</td>
                  <td>RIBEIRÃO PRETO</td>
                  <td>SP</td>
                  <td>edilsongruporp@gmail.com</td>
                  <td>16 991352299</td>
                  <td>
                    <a href="cliente.php?id=127">Ver</a> <br />
                    <a href="edita-cliente.php?id=127">Editar</a> <br />
                    <a href="destinatario.php?id=127" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=127&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDLEUSA LEITE</td>
                  <td>MACEIO</td>
                  <td>AL</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=210">Ver</a> <br />
                    <a href="edita-cliente.php?id=210">Editar</a> <br />
                    <a href="destinatario.php?id=210" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=210&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ednaldo Ramos da Silva Filho</td>
                  <td>Ponte dos Carvalhos - Cabo de Santo Agostinho-PE</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8135211776</td>
                  <td>
                    <a href="cliente.php?id=670">Ver</a> <br />
                    <a href="edita-cliente.php?id=670">Editar</a> <br />
                    <a href="destinatario.php?id=670" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=670&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDNALDO XAVIER</td>
                  <td>TIMBÓ ABREU E LIMA</td>
                  <td>PE</td>
                  <td>ednaldoketura@gmail.com</td>
                  <td>( 81 ) 3542-6295 / 98800-8506 / 99637-3075(ZAP)</td>
                  <td>
                    <a href="cliente.php?id=473">Ver</a> <br />
                    <a href="edita-cliente.php?id=473">Editar</a> <br />
                    <a href="destinatario.php?id=473" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=473&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Edson Aurélio</td>
                  <td>SÃO JOSE</td>
                  <td>SC</td>
                  <td>edson@gpcred.com.br</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=189">Ver</a> <br />
                    <a href="edita-cliente.php?id=189">Editar</a> <br />
                    <a href="destinatario.php?id=189" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=189&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Edson Gipp</td>
                  <td>São José</td>
                  <td>SC</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>48 9988-0460</td>
                  <td>
                    <a href="cliente.php?id=823">Ver</a> <br />
                    <a href="edita-cliente.php?id=823">Editar</a> <br />
                    <a href="destinatario.php?id=823" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=823&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eduardo Aguiar Torres Junior</td>
                  <td>Não fornecida</td>
                  <td>RJ</td>
                  <td>eduardoatjr@gmail.com</td>
                  <td>27 99985-3345</td>
                  <td>
                    <a href="cliente.php?id=1061">Ver</a> <br />
                    <a href="edita-cliente.php?id=1061">Editar</a> <br />
                    <a href="destinatario.php?id=1061" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1061&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eduardo D Guisa</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>dguisacosmeticos@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=621">Ver</a> <br />
                    <a href="edita-cliente.php?id=621">Editar</a> <br />
                    <a href="destinatario.php?id=621" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=621&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDUARDO MARINHO DE OLIVEIRA</td>
                  <td>PORTO ALEGRE</td>
                  <td>RS</td>
                  <td>holyessencias@live.com</td>
                  <td>51 9742-9368</td>
                  <td>
                    <a href="cliente.php?id=733">Ver</a> <br />
                    <a href="edita-cliente.php?id=733">Editar</a> <br />
                    <a href="destinatario.php?id=733" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=733&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eduardo Martins Araújo ESANZ</td>
                  <td>CAUCAIA</td>
                  <td>CE</td>
                  <td>contato@esanz.com.br</td>
                  <td>(85)99969-0940 (85)98733-7184</td>
                  <td>
                    <a href="cliente.php?id=514">Ver</a> <br />
                    <a href="edita-cliente.php?id=514">Editar</a> <br />
                    <a href="destinatario.php?id=514" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=514&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDUARDO PEREIRA ANDRADE</td>
                  <td>RIBEIRÃO PRETO</td>
                  <td>SP</td>
                  <td>maralternativa11@hotmail.com</td>
                  <td>16 99129-9122 / 16 3627-3811</td>
                  <td>
                    <a href="cliente.php?id=129">Ver</a> <br />
                    <a href="edita-cliente.php?id=129">Editar</a> <br />
                    <a href="destinatario.php?id=129" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=129&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EDUARDO PEREIRA PESSOA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>21974497610</td>
                  <td>
                    <a href="cliente.php?id=749">Ver</a> <br />
                    <a href="edita-cliente.php?id=749">Editar</a> <br />
                    <a href="destinatario.php?id=749" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=749&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELAINE CRISTINA MARQUES</td>
                  <td>EMBU DAS ARTES</td>
                  <td>SP</td>
                  <td>SABOARIALEVOM@GMAIL.COM</td>
                  <td>11 96514 5677</td>
                  <td>
                    <a href="cliente.php?id=371">Ver</a> <br />
                    <a href="edita-cliente.php?id=371">Editar</a> <br />
                    <a href="destinatario.php?id=371" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=371&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elaine Izidoro</td>
                  <td>SÃO JOSÉ</td>
                  <td>SC</td>
                  <td>emi.interiores@gmail.com</td>
                  <td>21 999558694</td>
                  <td>
                    <a href="cliente.php?id=640">Ver</a> <br />
                    <a href="edita-cliente.php?id=640">Editar</a> <br />
                    <a href="destinatario.php?id=640" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=640&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elaine Nascimento Alves</td>
                  <td>Elias Fausto</td>
                  <td>SP</td>
                  <td>elaine.ealves@yahoo.com.br</td>
                  <td>19 99358-2864</td>
                  <td>
                    <a href="cliente.php?id=943">Ver</a> <br />
                    <a href="edita-cliente.php?id=943">Editar</a> <br />
                    <a href="destinatario.php?id=943" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=943&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elaine Nascimento Alves da Silva</td>
                  <td>Elias Fausto</td>
                  <td>SP</td>
                  <td>elaine.ealves@yahoo.com.br</td>
                  <td>19993582864 </td>
                  <td>cpf 371.263.388-21</td>
                  <td>
                    <a href="cliente.php?id=942">Ver</a> <br />
                    <a href="edita-cliente.php?id=942">Editar</a> <br />
                    <a href="destinatario.php?id=942" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=942&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elaine Silva de Oliveira</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>11 97476-5509</td>
                  <td>
                    <a href="cliente.php?id=1144">Ver</a> <br />
                    <a href="edita-cliente.php?id=1144">Editar</a> <br />
                    <a href="destinatario.php?id=1144" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1144&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elber Gomes dos Santos</td>
                  <td>Nossa Senhora do Socorro</td>
                  <td>SE</td>
                  <td>elbergsantos.aju@gmail.com</td>
                  <td>79 99847-3232</td>
                  <td>
                    <a href="cliente.php?id=1032">Ver</a> <br />
                    <a href="edita-cliente.php?id=1032">Editar</a> <br />
                    <a href="destinatario.php?id=1032" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1032&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elen Nogueira Rodrigues Meneses</td>
                  <td>Belém</td>
                  <td>PA</td>
                  <td>elennrm@gmail.com</td>
                  <td>91 8122-0307</td>
                  <td>
                    <a href="cliente.php?id=1198">Ver</a> <br />
                    <a href="edita-cliente.php?id=1198">Editar</a> <br />
                    <a href="destinatario.php?id=1198" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1198&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elena Bazoni Lunz</td>
                  <td>Sobral</td>
                  <td>CE</td>
                  <td>elenalunz@outlook.com</td>
                  <td>88 9224-4158</td>
                  <td>
                    <a href="cliente.php?id=1146">Ver</a> <br />
                    <a href="edita-cliente.php?id=1146">Editar</a> <br />
                    <a href="destinatario.php?id=1146" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1146&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elena Bazoni Lunz</td>
                  <td>Sobral</td>
                  <td>CE</td>
                  <td>elenalunz@outlook.com</td>
                  <td>8892244158</td>
                  <td>
                    <a href="cliente.php?id=1147">Ver</a> <br />
                    <a href="edita-cliente.php?id=1147">Editar</a> <br />
                    <a href="destinatario.php?id=1147" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1147&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELENE NOVELLI</td>
                  <td>TIJUCA</td>
                  <td>RJ</td>
                  <td>elenegnovelli@hotmail.com</td>
                  <td>21- 98428-1992</td>
                  <td>
                    <a href="cliente.php?id=315">Ver</a> <br />
                    <a href="edita-cliente.php?id=315">Editar</a> <br />
                    <a href="destinatario.php?id=315" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=315&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eleusa Helena da Silva Silva</td>
                  <td>VITORIA</td>
                  <td>ES</td>
                  <td>e.helena_silva@yahoo.com.br</td>
                  <td>(27) 99233-1259 </td>
                  <td>cpf 836.378.857-00</td>
                  <td>
                    <a href="cliente.php?id=245">Ver</a> <br />
                    <a href="edita-cliente.php?id=245">Editar</a> <br />
                    <a href="destinatario.php?id=245" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=245&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELIANE CANDIDA ALVES P.</td>
                  <td>TEOFILO OTONI</td>
                  <td>MT</td>
                  <td>li.candida@hotmail.com</td>
                  <td>33-3536-3096</td>
                  <td>
                    <a href="cliente.php?id=322">Ver</a> <br />
                    <a href="edita-cliente.php?id=322">Editar</a> <br />
                    <a href="destinatario.php?id=322" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=322&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eliane Cardoso</td>
                  <td>Mogi Guaçu</td>
                  <td>SP</td>
                  <td>sharleseliane17@gmail.com</td>
                  <td>19999971528</td>
                  <td>
                    <a href="cliente.php?id=1065">Ver</a> <br />
                    <a href="edita-cliente.php?id=1065">Editar</a> <br />
                    <a href="destinatario.php?id=1065" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1065&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elias Rodrigues</td>
                  <td>Maceió</td>
                  <td>AL</td>
                  <td>mzkbrasil@gmail.com</td>
                  <td>82 9345-1170 </td>
                  <td>cnpj 326229770001 37</td>
                  <td>
                    <a href="cliente.php?id=1207">Ver</a> <br />
                    <a href="edita-cliente.php?id=1207">Editar</a> <br />
                    <a href="destinatario.php?id=1207" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1207&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elias Teodolino Gomes</td>
                  <td>Pacatuba</td>
                  <td>CE</td>
                  <td>teodolgomes@gmail.com</td>
                  <td>85 9983-6819 </td>
                  <td>cpf 04799131885 </td>
                  <td>cnpj 41455557/0001-0</td>
                  <td>
                    <a href="cliente.php?id=171">Ver</a> <br />
                    <a href="edita-cliente.php?id=171">Editar</a> <br />
                    <a href="destinatario.php?id=171" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=171&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eliete Farias da Silva</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>Chessencias.delcastilho@gmail.com</td>
                  <td>22 99974-2319 </td>
                  <td>cnpj: 50.497.897/0001-89</td>
                  <td>
                    <a href="cliente.php?id=1011">Ver</a> <br />
                    <a href="edita-cliente.php?id=1011">Editar</a> <br />
                    <a href="destinatario.php?id=1011" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1011&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELIEZER FERNANDO</td>
                  <td>RIO DO OESTE</td>
                  <td>SC</td>
                  <td>SEM.EMAIL@HOTMAIL.COM</td>
                  <td>47 88515115</td>
                  <td>
                    <a href="cliente.php?id=124">Ver</a> <br />
                    <a href="edita-cliente.php?id=124">Editar</a> <br />
                    <a href="destinatario.php?id=124" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=124&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Eline da Silva Pereira - ELINE COSMÉTICOS E PERFUMARIA
                  </td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>fdfafa@ffffgmai.com</td>
                  <td>21 98836-2639 </td>
                  <td>cpf: 753.427.743-49</td>
                  <td>
                    <a href="cliente.php?id=978">Ver</a> <br />
                    <a href="edita-cliente.php?id=978">Editar</a> <br />
                    <a href="destinatario.php?id=978" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=978&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elisabete Braz</td>
                  <td>Joinville</td>
                  <td>SC</td>
                  <td>elisabete_braz@hotmail.com</td>
                  <td>47 8813-9855</td>
                  <td>
                    <a href="cliente.php?id=1237">Ver</a> <br />
                    <a href="edita-cliente.php?id=1237">Editar</a> <br />
                    <a href="destinatario.php?id=1237" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1237&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELISABETH</td>
                  <td>PRAIA GRANDE</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=438">Ver</a> <br />
                    <a href="edita-cliente.php?id=438">Editar</a> <br />
                    <a href="destinatario.php?id=438" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=438&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elisabeth Albiach de Paula</td>
                  <td>Poá</td>
                  <td>SP</td>
                  <td>aaaaa@aaaa.com</td>
                  <td>119999999</td>
                  <td>
                    <a href="cliente.php?id=950">Ver</a> <br />
                    <a href="edita-cliente.php?id=950">Editar</a> <br />
                    <a href="destinatario.php?id=950" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=950&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elisangela de Jesus Gomes</td>
                  <td>Rio de janeiro</td>
                  <td>RJ</td>
                  <td>Nadilson.brad@gmail.com</td>
                  <td>021966501559</td>
                  <td>
                    <a href="cliente.php?id=1018">Ver</a> <br />
                    <a href="edita-cliente.php?id=1018">Editar</a> <br />
                    <a href="destinatario.php?id=1018" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1018&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Élita Costa de Oliveira Rocha</td>
                  <td>Guaianases</td>
                  <td>SP</td>
                  <td>elitarocha2016@gmail.com</td>
                  <td>(11) 96227-0250</td>
                  <td>
                    <a href="cliente.php?id=597">Ver</a> <br />
                    <a href="edita-cliente.php?id=597">Editar</a> <br />
                    <a href="destinatario.php?id=597" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=597&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELIZA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=222">Ver</a> <br />
                    <a href="edita-cliente.php?id=222">Editar</a> <br />
                    <a href="destinatario.php?id=222" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=222&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELIZABETE DE SOUZA GOMES</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>perf.importados@hotmail.com</td>
                  <td>11 97436 9669</td>
                  <td>
                    <a href="cliente.php?id=123">Ver</a> <br />
                    <a href="edita-cliente.php?id=123">Editar</a> <br />
                    <a href="destinatario.php?id=123" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=123&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELIZABETE DE SOUZA GOMES</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>PERF.IMPORTADOS@HOTMAIL.COM</td>
                  <td>11974369669</td>
                  <td>
                    <a href="cliente.php?id=250">Ver</a> <br />
                    <a href="edita-cliente.php?id=250">Editar</a> <br />
                    <a href="destinatario.php?id=250" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=250&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elizabeth Correia</td>
                  <td>Não fornecida</td>
                  <td>SP</td>
                  <td>dolcemaliciaperfumes80@gmail.com</td>
                  <td>17 99755-1486</td>
                  <td>
                    <a href="cliente.php?id=1031">Ver</a> <br />
                    <a href="edita-cliente.php?id=1031">Editar</a> <br />
                    <a href="destinatario.php?id=1031" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1031&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elizabeth Leme</td>
                  <td>SÃO VICENTE</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 97406-5198 / 13 33026637 </td>
                  <td>cpf 03685228811</td>
                  <td>
                    <a href="cliente.php?id=843">Ver</a> <br />
                    <a href="edita-cliente.php?id=843">Editar</a> <br />
                    <a href="destinatario.php?id=843" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=843&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELOISE HELENA DE SOUZA CHAVES/ NAYLU</td>
                  <td>JOINVILLE</td>
                  <td>SC</td>
                  <td>sac@naylu.ind.br</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=329">Ver</a> <br />
                    <a href="edita-cliente.php?id=329">Editar</a> <br />
                    <a href="destinatario.php?id=329" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=329&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELUANA FLORÃO</td>
                  <td>MARINGA</td>
                  <td>PR</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>44 98473669</td>
                  <td>
                    <a href="cliente.php?id=385">Ver</a> <br />
                    <a href="edita-cliente.php?id=385">Editar</a> <br />
                    <a href="destinatario.php?id=385" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=385&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elvis Fidelis</td>
                  <td>naoinformada</td>
                  <td>SP</td>
                  <td>elvisfidelis992@gmail.com</td>
                  <td>88 99243-9068</td>
                  <td>
                    <a href="cliente.php?id=1108">Ver</a> <br />
                    <a href="edita-cliente.php?id=1108">Editar</a> <br />
                    <a href="destinatario.php?id=1108" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1108&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ELZA AUXILIADORA</td>
                  <td>SERRA</td>
                  <td>ES</td>
                  <td>elzaloss@hotmail.com</td>
                  <td>27 32512348</td>
                  <td>
                    <a href="cliente.php?id=128">Ver</a> <br />
                    <a href="edita-cliente.php?id=128">Editar</a> <br />
                    <a href="destinatario.php?id=128" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=128&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elzita C. Luz</td>
                  <td>Americana</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=449">Ver</a> <br />
                    <a href="edita-cliente.php?id=449">Editar</a> <br />
                    <a href="destinatario.php?id=449" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=449&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Elzita Cares Luz</td>
                  <td>AMERICANA</td>
                  <td>SP</td>
                  <td>ecluz@hotmail.com</td>
                  <td>19 98118-1922 </td>
                  <td>cpf 109.997.568-93 RG: 23.002756-8</td>
                  <td>
                    <a href="cliente.php?id=874">Ver</a> <br />
                    <a href="edita-cliente.php?id=874">Editar</a> <br />
                    <a href="destinatario.php?id=874" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=874&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EMAGRECIMENTO GUARULHOS</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>raissalaura@iclou.com</td>
                  <td>11 995095775 / </td>
                  <td>cnpj 10.777.727/0001-33</td>
                  <td>
                    <a href="cliente.php?id=867">Ver</a> <br />
                    <a href="edita-cliente.php?id=867">Editar</a> <br />
                    <a href="destinatario.php?id=867" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=867&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EMPRESA VIDRO LIMPO - A/C CHRISTINA FRAGA</td>
                  <td>BELFORD ROXO</td>
                  <td>RJ</td>
                  <td>perfumista2@hotmail.com</td>
                  <td>21 98547-7674 / 99191- 0009</td>
                  <td>
                    <a href="cliente.php?id=219">Ver</a> <br />
                    <a href="edita-cliente.php?id=219">Editar</a> <br />
                    <a href="destinatario.php?id=219" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=219&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ênio Candido</td>
                  <td>Feira de Santana</td>
                  <td>BA</td>
                  <td>enigmaperfume@gmail.com</td>
                  <td>75 3625 8331</td>
                  <td>
                    <a href="cliente.php?id=265">Ver</a> <br />
                    <a href="edita-cliente.php?id=265">Editar</a> <br />
                    <a href="destinatario.php?id=265" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=265&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>enzo Bottene</td>
                  <td>Piracicaba</td>
                  <td>SP</td>
                  <td>autoriteparfum@gmail.com</td>
                  <td>19998251285</td>
                  <td>
                    <a href="cliente.php?id=1210">Ver</a> <br />
                    <a href="edita-cliente.php?id=1210">Editar</a> <br />
                    <a href="destinatario.php?id=1210" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1210&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERBENE DAMASCENO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8591029565</td>
                  <td>
                    <a href="cliente.php?id=769">Ver</a> <br />
                    <a href="edita-cliente.php?id=769">Editar</a> <br />
                    <a href="destinatario.php?id=769" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=769&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Erialdo Mota Felipe</td>
                  <td>Fortaleza CE</td>
                  <td>CE</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8588376481</td>
                  <td>
                    <a href="cliente.php?id=755">Ver</a> <br />
                    <a href="edita-cliente.php?id=755">Editar</a> <br />
                    <a href="destinatario.php?id=755" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=755&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ericka da Cunha Santos</td>
                  <td>Santa Rita</td>
                  <td>PB</td>
                  <td>erickaSantos@hotmail.com</td>
                  <td>83 8800-1038</td>
                  <td>
                    <a href="cliente.php?id=1183">Ver</a> <br />
                    <a href="edita-cliente.php?id=1183">Editar</a> <br />
                    <a href="destinatario.php?id=1183" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1183&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ericka da Cunha Santos</td>
                  <td>Santa Rita</td>
                  <td>PB</td>
                  <td>ericka_santos_@hotmial.com</td>
                  <td>8388001038</td>
                  <td>
                    <a href="cliente.php?id=1184">Ver</a> <br />
                    <a href="edita-cliente.php?id=1184">Editar</a> <br />
                    <a href="destinatario.php?id=1184" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1184&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERICO NEVES COSTA</td>
                  <td>nAO INFORMADA</td>
                  <td>RJ</td>
                  <td>fonerjtelefonia@gmail.com</td>
                  <td>22 99898-0861</td>
                  <td>
                    <a href="cliente.php?id=1214">Ver</a> <br />
                    <a href="edita-cliente.php?id=1214">Editar</a> <br />
                    <a href="destinatario.php?id=1214" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1214&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERICO NEVES COSTA</td>
                  <td>Nova Friburgo</td>
                  <td>RJ</td>
                  <td>fonerjtelefonia@gmail.com</td>
                  <td>22 99898-0861</td>
                  <td>
                    <a href="cliente.php?id=1215">Ver</a> <br />
                    <a href="edita-cliente.php?id=1215">Editar</a> <br />
                    <a href="destinatario.php?id=1215" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1215&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERICO NEVES COSTA</td>
                  <td>Nova Friburgo</td>
                  <td>RJ</td>
                  <td>fonerjtelefonia@gmail.com</td>
                  <td>22 99898-0861</td>
                  <td>
                    <a href="cliente.php?id=1216">Ver</a> <br />
                    <a href="edita-cliente.php?id=1216">Editar</a> <br />
                    <a href="destinatario.php?id=1216" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1216&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eriel Alves de Matos</td>
                  <td>Hortolandia</td>
                  <td>SP</td>
                  <td>erielmatoss@gmail.com</td>
                  <td>19987723923</td>
                  <td>
                    <a href="cliente.php?id=1128">Ver</a> <br />
                    <a href="edita-cliente.php?id=1128">Editar</a> <br />
                    <a href="destinatario.php?id=1128" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1128&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eriel Alves de Matos</td>
                  <td>Hortolandia</td>
                  <td>SP</td>
                  <td>erielmatoss@gmail.com</td>
                  <td>19987723923</td>
                  <td>
                    <a href="cliente.php?id=1129">Ver</a> <br />
                    <a href="edita-cliente.php?id=1129">Editar</a> <br />
                    <a href="destinatario.php?id=1129" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1129&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Erika Araujo Arvellos</td>
                  <td>São João Nepomuceno</td>
                  <td>MG</td>
                  <td>erika.arvellos@gmail.com</td>
                  <td>32 9.9807-5278</td>
                  <td>
                    <a href="cliente.php?id=522">Ver</a> <br />
                    <a href="edita-cliente.php?id=522">Editar</a> <br />
                    <a href="destinatario.php?id=522" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=522&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERIKA MARTINS</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>fadul.erika@gmail.com</td>
                  <td>00000000</td>
                  <td>
                    <a href="cliente.php?id=84">Ver</a> <br />
                    <a href="edita-cliente.php?id=84">Editar</a> <br />
                    <a href="destinatario.php?id=84" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=84&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERIMAR FEIJO DE SOUZA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>erimafs@yahoo.com.br</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=273">Ver</a> <br />
                    <a href="edita-cliente.php?id=273">Editar</a> <br />
                    <a href="destinatario.php?id=273" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=273&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eriton Gomes Colognesi</td>
                  <td>Orindiúva</td>
                  <td>SP</td>
                  <td>eritoncolognesi@hotmail.com</td>
                  <td>(17) 99635-5099</td>
                  <td>
                    <a href="cliente.php?id=271">Ver</a> <br />
                    <a href="edita-cliente.php?id=271">Editar</a> <br />
                    <a href="destinatario.php?id=271" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=271&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ERIVALDO PEREIRA PERES</td>
                  <td>IPU</td>
                  <td>CE</td>
                  <td>uncaodecheiro@gmail.com</td>
                  <td>(88) 99619-4320 / 99303-6593 / 99724-0422 /</td>
                  <td>
                    <a href="cliente.php?id=161">Ver</a> <br />
                    <a href="edita-cliente.php?id=161">Editar</a> <br />
                    <a href="destinatario.php?id=161" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=161&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ESDRAS</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>3195962622</td>
                  <td>
                    <a href="cliente.php?id=790">Ver</a> <br />
                    <a href="edita-cliente.php?id=790">Editar</a> <br />
                    <a href="destinatario.php?id=790" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=790&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eugenio Glauber</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>parfum.edpfragancias@gmail.com</td>
                  <td>(31) 988215743</td>
                  <td>
                    <a href="cliente.php?id=406">Ver</a> <br />
                    <a href="edita-cliente.php?id=406">Editar</a> <br />
                    <a href="destinatario.php?id=406" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=406&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Eula Paula Martins de Souza</td>
                  <td>city não fornecida</td>
                  <td>SP</td>
                  <td>eulapaulamartinsdesouza@gmail.com</td>
                  <td>69-98413-6653 </td>
                  <td>cnpj/</td>
                  <td>cpf NÃO FORNECIDOS</td>
                  <td>
                    <a href="cliente.php?id=1025">Ver</a> <br />
                    <a href="edita-cliente.php?id=1025">Editar</a> <br />
                    <a href="destinatario.php?id=1025" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1025&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EULIE DOS SANTOS MARQUE DE ARAUJO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=608">Ver</a> <br />
                    <a href="edita-cliente.php?id=608">Editar</a> <br />
                    <a href="destinatario.php?id=608" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=608&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Evandro Santos de Freitas</td>
                  <td>Natal</td>
                  <td>RN</td>
                  <td>evandro.s.f@hotmail.com</td>
                  <td>84 9910-9793 </td>
                  <td>cpf: 028.997.154-37</td>
                  <td>
                    <a href="cliente.php?id=1228">Ver</a> <br />
                    <a href="edita-cliente.php?id=1228">Editar</a> <br />
                    <a href="destinatario.php?id=1228" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1228&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Everaldo Silva de Souza</td>
                  <td>Frutal</td>
                  <td>MG</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>34 9973-5915</td>
                  <td>
                    <a href="cliente.php?id=1122">Ver</a> <br />
                    <a href="edita-cliente.php?id=1122">Editar</a> <br />
                    <a href="destinatario.php?id=1122" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1122&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Everton Silva de Jesus</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>tonsj1983@gmail.com</td>
                  <td>85 8538-0936 </td>
                  <td>cpf: 01796891509</td>
                  <td>
                    <a href="cliente.php?id=1307">Ver</a> <br />
                    <a href="edita-cliente.php?id=1307">Editar</a> <br />
                    <a href="destinatario.php?id=1307" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1307&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ewerton dos Santos Cândido</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>ewertoncw@gmail.com</td>
                  <td>13 98139-2686</td>
                  <td>
                    <a href="cliente.php?id=1227">Ver</a> <br />
                    <a href="edita-cliente.php?id=1227">Editar</a> <br />
                    <a href="destinatario.php?id=1227" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1227&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>EZEQUIEL MATOS NUNES LTDA - AROMAS DO NORTE</td>
                  <td>MANAUS</td>
                  <td>AM</td>
                  <td>ezequiel.denunes@gmial.com</td>
                  <td>92 9470-1864</td>
                  <td>
                    <a href="cliente.php?id=1352">Ver</a> <br />
                    <a href="edita-cliente.php?id=1352">Editar</a> <br />
                    <a href="destinatario.php?id=1352" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1352&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabiana Gontijo da Silva</td>
                  <td>SP</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11954701698</td>
                  <td>
                    <a href="cliente.php?id=1341">Ver</a> <br />
                    <a href="edita-cliente.php?id=1341">Editar</a> <br />
                    <a href="destinatario.php?id=1341" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1341&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIANA SOUZA (ESSENCIALY COSMÉTICOS)</td>
                  <td>CAMPO BOM</td>
                  <td>RS</td>
                  <td>essencialycosmeticos@gmail.com</td>
                  <td>51 99547953 51 996851650 </td>
                  <td>cnpj é 51.610.446/0001</td>
                  <td>
                    <a href="cliente.php?id=136">Ver</a> <br />
                    <a href="edita-cliente.php?id=136">Editar</a> <br />
                    <a href="destinatario.php?id=136" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=136&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIANO AZEVEDO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>jfmazev@ig.com.br</td>
                  <td>85 981319112</td>
                  <td>
                    <a href="cliente.php?id=62">Ver</a> <br />
                    <a href="edita-cliente.php?id=62">Editar</a> <br />
                    <a href="destinatario.php?id=62" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=62&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabiano Tavares Sarlo</td>
                  <td>Macaé</td>
                  <td>RJ</td>
                  <td>ftsarlo@hotmail.com</td>
                  <td>(22) 99945-0090</td>
                  <td>
                    <a href="cliente.php?id=627">Ver</a> <br />
                    <a href="edita-cliente.php?id=627">Editar</a> <br />
                    <a href="destinatario.php?id=627" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=627&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIO BISPO DOS SANTOS</td>
                  <td>BOQUIM</td>
                  <td>SE</td>
                  <td>naturafabio@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=233">Ver</a> <br />
                    <a href="edita-cliente.php?id=233">Editar</a> <br />
                    <a href="destinatario.php?id=233" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=233&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIO DE CASTRO</td>
                  <td>Niterói</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>22 98807-7337</td>
                  <td>
                    <a href="cliente.php?id=729">Ver</a> <br />
                    <a href="edita-cliente.php?id=729">Editar</a> <br />
                    <a href="destinatario.php?id=729" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=729&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIO PREVIDI</td>
                  <td>BATATAIS</td>
                  <td>SP</td>
                  <td>frprevidi@gmail.com</td>
                  <td>16 - 3761-5042</td>
                  <td>
                    <a href="cliente.php?id=143">Ver</a> <br />
                    <a href="edita-cliente.php?id=143">Editar</a> <br />
                    <a href="destinatario.php?id=143" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=143&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabio Tadeu Engel</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>engel.fabio@gmail.com</td>
                  <td>11 97206-4052 </td>
                  <td>cpf: 457.227.900-44</td>
                  <td>
                    <a href="cliente.php?id=1320">Ver</a> <br />
                    <a href="edita-cliente.php?id=1320">Editar</a> <br />
                    <a href="destinatario.php?id=1320" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1320&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FABIOLA DEGOBBE BERNARDES</td>
                  <td>IBIÚNA</td>
                  <td>SP</td>
                  <td>fabibernardes12@gmail.com</td>
                  <td>11 94442-8425</td>
                  <td>
                    <a href="cliente.php?id=528">Ver</a> <br />
                    <a href="edita-cliente.php?id=528">Editar</a> <br />
                    <a href="destinatario.php?id=528" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=528&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabíola Lopes</td>
                  <td>BRASÍLIA</td>
                  <td>DF</td>
                  <td>fabiolagranato@gmail.com</td>
                  <td>61- 93804292/84371192</td>
                  <td>
                    <a href="cliente.php?id=47">Ver</a> <br />
                    <a href="edita-cliente.php?id=47">Editar</a> <br />
                    <a href="destinatario.php?id=47" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=47&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabíola Lopes</td>
                  <td>nao informada</td>
                  <td>SP</td>
                  <td>fabiolagouveia@hotmail.com</td>
                  <td>81 99793-6032</td>
                  <td>
                    <a href="cliente.php?id=1111">Ver</a> <br />
                    <a href="edita-cliente.php?id=1111">Editar</a> <br />
                    <a href="destinatario.php?id=1111" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1111&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fabiola Viana Dias</td>
                  <td>Suzano</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=457">Ver</a> <br />
                    <a href="edita-cliente.php?id=457">Editar</a> <br />
                    <a href="destinatario.php?id=457" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=457&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FARMATRIZ EMBALAGENS</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmai.com</td>
                  <td>31171230</td>
                  <td>
                    <a href="cliente.php?id=516">Ver</a> <br />
                    <a href="edita-cliente.php?id=516">Editar</a> <br />
                    <a href="destinatario.php?id=516" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=516&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FATIMA AP. CARVALHO / HELIANTO FARMACÊUTICA</td>
                  <td>São José do Rio Preto</td>
                  <td>SP</td>
                  <td>compras@helianto.com.br</td>
                  <td>(17) 3302-1600</td>
                  <td>
                    <a href="cliente.php?id=354">Ver</a> <br />
                    <a href="edita-cliente.php?id=354">Editar</a> <br />
                    <a href="destinatario.php?id=354" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=354&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fátima Cristina Marques Gonzalez</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>fatimacgonzalez@uol.com.br</td>
                  <td>21 96746-8827</td>
                  <td>
                    <a href="cliente.php?id=1325">Ver</a> <br />
                    <a href="edita-cliente.php?id=1325">Editar</a> <br />
                    <a href="destinatario.php?id=1325" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1325&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fatima Martins de Lima Petrovich</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>garciapetrovich@hotmail.com</td>
                  <td>981221067</td>
                  <td>
                    <a href="cliente.php?id=601">Ver</a> <br />
                    <a href="edita-cliente.php?id=601">Editar</a> <br />
                    <a href="destinatario.php?id=601" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=601&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FÁTIMA MENEGHETTI CAFFARELO</td>
                  <td>VITORIA</td>
                  <td>ES</td>
                  <td>faumeneghetticaffarello@gmail.com</td>
                  <td>27998503596</td>
                  <td>
                    <a href="cliente.php?id=509">Ver</a> <br />
                    <a href="edita-cliente.php?id=509">Editar</a> <br />
                    <a href="destinatario.php?id=509" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=509&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FATIMA SENNA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=209">Ver</a> <br />
                    <a href="edita-cliente.php?id=209">Editar</a> <br />
                    <a href="destinatario.php?id=209" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=209&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FAUSTO DINIZ</td>
                  <td>Marabá</td>
                  <td>PA</td>
                  <td>faustoadm@hotmail.com.br</td>
                  <td>(94) 3324-5372 / 99140-5944 / 98170-6216</td>
                  <td>
                    <a href="cliente.php?id=264">Ver</a> <br />
                    <a href="edita-cliente.php?id=264">Editar</a> <br />
                    <a href="destinatario.php?id=264" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=264&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fcamara Consultoria e formação em informatica LTDA</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>13991221340</td>
                  <td>
                    <a href="cliente.php?id=1342">Ver</a> <br />
                    <a href="edita-cliente.php?id=1342">Editar</a> <br />
                    <a href="destinatario.php?id=1342" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1342&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Felipe De Oliveira Carvalho</td>
                  <td>São João</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 99809-6497</td>
                  <td>
                    <a href="cliente.php?id=727">Ver</a> <br />
                    <a href="edita-cliente.php?id=727">Editar</a> <br />
                    <a href="destinatario.php?id=727" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=727&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FELIPE DELFINO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>comercial@valorconstrucao.com.br</td>
                  <td>13 3385-7870 - </td>
                  <td>cpf 430925338-52</td>
                  <td>
                    <a href="cliente.php?id=534">Ver</a> <br />
                    <a href="edita-cliente.php?id=534">Editar</a> <br />
                    <a href="destinatario.php?id=534" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=534&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Felipe George Almeida de Alcântara</td>
                  <td>Presidente Medici</td>
                  <td>RO</td>
                  <td>luxosperfumes@hotmail.com</td>
                  <td>61 993054743</td>
                  <td>
                    <a href="cliente.php?id=353">Ver</a> <br />
                    <a href="edita-cliente.php?id=353">Editar</a> <br />
                    <a href="destinatario.php?id=353" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=353&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FELIPE MAIA SILVA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>fmsilva1986@yahoo.com.br</td>
                  <td>(85)986604167/ (85)996385835</td>
                  <td>
                    <a href="cliente.php?id=628">Ver</a> <br />
                    <a href="edita-cliente.php?id=628">Editar</a> <br />
                    <a href="destinatario.php?id=628" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=628&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Felipe Silva Santana dos Santos</td>
                  <td>Feira de Santana</td>
                  <td>BA</td>
                  <td>felipe.fsa1@gmail.com</td>
                  <td>75 99190-1239</td>
                  <td>
                    <a href="cliente.php?id=945">Ver</a> <br />
                    <a href="edita-cliente.php?id=945">Editar</a> <br />
                    <a href="destinatario.php?id=945" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=945&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Felipe Villela Bastos - DOFÊ´S PARFUM</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>dofeparfum@gmail.com</td>
                  <td>11 95559-8919 EMPRESA 11 91238-0409</td>
                  <td>
                    <a href="cliente.php?id=1092">Ver</a> <br />
                    <a href="edita-cliente.php?id=1092">Editar</a> <br />
                    <a href="destinatario.php?id=1092" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1092&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FERNANDA D D PINTO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21981986883</td>
                  <td>
                    <a href="cliente.php?id=652">Ver</a> <br />
                    <a href="edita-cliente.php?id=652">Editar</a> <br />
                    <a href="destinatario.php?id=652" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=652&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fernanda Santos</td>
                  <td>Ribeirão Preto</td>
                  <td>SP</td>
                  <td>festsmoraes@gmail.com</td>
                  <td>16 99166-1346 </td>
                  <td>cpf: 22062506830</td>
                  <td>
                    <a href="cliente.php?id=999">Ver</a> <br />
                    <a href="edita-cliente.php?id=999">Editar</a> <br />
                    <a href="destinatario.php?id=999" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=999&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FERNANDO - TATUADOR</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>13 98156-8527</td>
                  <td>
                    <a href="cliente.php?id=844">Ver</a> <br />
                    <a href="edita-cliente.php?id=844">Editar</a> <br />
                    <a href="destinatario.php?id=844" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=844&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FERNANDO MARQUES</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>11 98332-9788</td>
                  <td>
                    <a href="cliente.php?id=258">Ver</a> <br />
                    <a href="edita-cliente.php?id=258">Editar</a> <br />
                    <a href="destinatario.php?id=258" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=258&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FERNANDO SANTOS DE SOUZA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>fernandosantosdesouza.rio.dj@bol.com.br</td>
                  <td>21 9756-96964</td>
                  <td>
                    <a href="cliente.php?id=299">Ver</a> <br />
                    <a href="edita-cliente.php?id=299">Editar</a> <br />
                    <a href="destinatario.php?id=299" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=299&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Fernando Santos Monteiro</td>
                  <td>Nova Iguaçu</td>
                  <td>RJ</td>
                  <td>fernandosmont36@gmail.com</td>
                  <td>21 99504-3959</td>
                  <td>
                    <a href="cliente.php?id=739">Ver</a> <br />
                    <a href="edita-cliente.php?id=739">Editar</a> <br />
                    <a href="destinatario.php?id=739" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=739&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Filipe Andrade Vidal</td>
                  <td>SERRA</td>
                  <td>ES</td>
                  <td>filipeandradevidal@hotmail.com</td>
                  <td>(27) 9 9957-2279</td>
                  <td>
                    <a href="cliente.php?id=424">Ver</a> <br />
                    <a href="edita-cliente.php?id=424">Editar</a> <br />
                    <a href="destinatario.php?id=424" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=424&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FLAVIA BARROSO MAGALHAES</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>holyessencias@live.com</td>
                  <td>31 99041787</td>
                  <td>
                    <a href="cliente.php?id=694">Ver</a> <br />
                    <a href="edita-cliente.php?id=694">Editar</a> <br />
                    <a href="destinatario.php?id=694" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=694&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FLÁVIA CIRINO RODRIGUES</td>
                  <td>SÃO JOÃO DO MERITI</td>
                  <td>RJ</td>
                  <td>carloskauearthur0@gmail.com</td>
                  <td>21 37520052</td>
                  <td>
                    <a href="cliente.php?id=377">Ver</a> <br />
                    <a href="edita-cliente.php?id=377">Editar</a> <br />
                    <a href="destinatario.php?id=377" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=377&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Flaviana Santos Duarte ,</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>llianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=489">Ver</a> <br />
                    <a href="edita-cliente.php?id=489">Editar</a> <br />
                    <a href="destinatario.php?id=489" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=489&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FLAVIANO FONTELLES</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>flavianofontelles@hotmail.com</td>
                  <td>11 963849900</td>
                  <td>
                    <a href="cliente.php?id=131">Ver</a> <br />
                    <a href="edita-cliente.php?id=131">Editar</a> <br />
                    <a href="destinatario.php?id=131" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=131&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCIANE PEREIRA</td>
                  <td>JOINVILLE</td>
                  <td>SC</td>
                  <td>mannas@hotmail.com</td>
                  <td>479987-1414</td>
                  <td>
                    <a href="cliente.php?id=433">Ver</a> <br />
                    <a href="edita-cliente.php?id=433">Editar</a> <br />
                    <a href="destinatario.php?id=433" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=433&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCIELLY SILVA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>francielly.silvaa@hotmail.com</td>
                  <td>16 99217-8984</td>
                  <td>
                    <a href="cliente.php?id=339">Ver</a> <br />
                    <a href="edita-cliente.php?id=339">Editar</a> <br />
                    <a href="destinatario.php?id=339" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=339&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCINETE</td>
                  <td>BARRO VERMELHO</td>
                  <td>RJ</td>
                  <td>mimosfran@hotmail.com</td>
                  <td>21 99055-2472</td>
                  <td>
                    <a href="cliente.php?id=368">Ver</a> <br />
                    <a href="edita-cliente.php?id=368">Editar</a> <br />
                    <a href="destinatario.php?id=368" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=368&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCIS MARIA ZANELATO</td>
                  <td>AGUDO</td>
                  <td>RS</td>
                  <td>holyessencias@live.com</td>
                  <td>5532651022 </td>
                  <td>cnpj82873068/0005-73</td>
                  <td>
                    <a href="cliente.php?id=684">Ver</a> <br />
                    <a href="edita-cliente.php?id=684">Editar</a> <br />
                    <a href="destinatario.php?id=684" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=684&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisca velda Cavalcante Ferreira</td>
                  <td>0000000</td>
                  <td>PI</td>
                  <td>veldaferreira@gmail.com</td>
                  <td>86 99451-1093</td>
                  <td>
                    <a href="cliente.php?id=1082">Ver</a> <br />
                    <a href="edita-cliente.php?id=1082">Editar</a> <br />
                    <a href="destinatario.php?id=1082" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1082&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Carlos Fernandes Moraes</td>
                  <td>Serra</td>
                  <td>ES</td>
                  <td>franciscocarlosmoraes@hotmail.com</td>
                  <td>27 99935-2600 </td>
                  <td>cpf: 576 169 227 91</td>
                  <td>
                    <a href="cliente.php?id=966">Ver</a> <br />
                    <a href="edita-cliente.php?id=966">Editar</a> <br />
                    <a href="destinatario.php?id=966" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=966&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Cristino</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>chicago_ctistino@hotmail.com</td>
                  <td>85 8854-7004</td>
                  <td>
                    <a href="cliente.php?id=1345">Ver</a> <br />
                    <a href="edita-cliente.php?id=1345">Editar</a> <br />
                    <a href="destinatario.php?id=1345" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1345&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Felipe Maia da Silva</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>85 96385835</td>
                  <td>
                    <a href="cliente.php?id=706">Ver</a> <br />
                    <a href="edita-cliente.php?id=706">Editar</a> <br />
                    <a href="destinatario.php?id=706" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=706&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCISCO GABRIEL REINALDO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>gabrielllsilva25@yahoo.com.br</td>
                  <td>85 87779120</td>
                  <td>
                    <a href="cliente.php?id=175">Ver</a> <br />
                    <a href="edita-cliente.php?id=175">Editar</a> <br />
                    <a href="destinatario.php?id=175" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=175&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Gabriel Reinaldo da Silva.</td>
                  <td>Fortaleza,</td>
                  <td>CE</td>
                  <td>holyessencias@live,cin</td>
                  <td>85 9414-8542</td>
                  <td>
                    <a href="cliente.php?id=880">Ver</a> <br />
                    <a href="edita-cliente.php?id=880">Editar</a> <br />
                    <a href="destinatario.php?id=880" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=880&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Peres Paulo</td>
                  <td>Mina Ipu</td>
                  <td>CE</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td></td>
                  <td>cpf: 07476686713</td>
                  <td>
                    <a href="cliente.php?id=1074">Ver</a> <br />
                    <a href="edita-cliente.php?id=1074">Editar</a> <br />
                    <a href="destinatario.php?id=1074" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1074&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Peres Paulo</td>
                  <td>Ipu</td>
                  <td>CE</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td></td>
                  <td>cpf: 07476686713</td>
                  <td>
                    <a href="cliente.php?id=1075">Ver</a> <br />
                    <a href="edita-cliente.php?id=1075">Editar</a> <br />
                    <a href="destinatario.php?id=1075" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1075&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Peres Paulo - Erivaldo Unção de Cheiro</td>
                  <td>Ipu</td>
                  <td>CE</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>88 8148-6479 </td>
                  <td>cpf: 07476686713</td>
                  <td>
                    <a href="cliente.php?id=1076">Ver</a> <br />
                    <a href="edita-cliente.php?id=1076">Editar</a> <br />
                    <a href="destinatario.php?id=1076" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1076&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Ruan Pessoa dos Santos</td>
                  <td>Teresina</td>
                  <td>PI</td>
                  <td>ruanf34@gmail.com</td>
                  <td>86 99999-6551</td>
                  <td>
                    <a href="cliente.php?id=1338">Ver</a> <br />
                    <a href="edita-cliente.php?id=1338">Editar</a> <br />
                    <a href="destinatario.php?id=1338" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1338&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Francisco Tertuliano da Silva</td>
                  <td>Brasília</td>
                  <td>DF</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>81 8668-5139</td>
                  <td>
                    <a href="cliente.php?id=1107">Ver</a> <br />
                    <a href="edita-cliente.php?id=1107">Editar</a> <br />
                    <a href="destinatario.php?id=1107" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1107&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>FRANCISCO VALTENIR DE LIMA</td>
                  <td>ITAPIPOCA</td>
                  <td>CE</td>
                  <td>fvtavaresdelima@yahoo.com.br</td>
                  <td>(88) 99727-6918</td>
                  <td>
                    <a href="cliente.php?id=201">Ver</a> <br />
                    <a href="edita-cliente.php?id=201">Editar</a> <br />
                    <a href="destinatario.php?id=201" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=201&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>G. Silva de Sousa Domissanitarios</td>
                  <td>PACATUBA</td>
                  <td>CE</td>
                  <td>casadosabao19@gmail.com</td>
                  <td>(85) 8856-4592 - 9172-9315</td>
                  <td>
                    <a href="cliente.php?id=691">Ver</a> <br />
                    <a href="edita-cliente.php?id=691">Editar</a> <br />
                    <a href="destinatario.php?id=691" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=691&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriel Cordeiro</td>
                  <td>Buriti dos Lopes</td>
                  <td>PI</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>000000000000</td>
                  <td>
                    <a href="cliente.php?id=587">Ver</a> <br />
                    <a href="edita-cliente.php?id=587">Editar</a> <br />
                    <a href="destinatario.php?id=587" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=587&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriel Evangelista Fogaça</td>
                  <td>Assis</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>18 99685-2501</td>
                  <td>
                    <a href="cliente.php?id=811">Ver</a> <br />
                    <a href="edita-cliente.php?id=811">Editar</a> <br />
                    <a href="destinatario.php?id=811" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=811&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriel L. Marques Silva</td>
                  <td>Buriti dos Lopes</td>
                  <td>PI</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>000000000000</td>
                  <td>
                    <a href="cliente.php?id=588">Ver</a> <br />
                    <a href="edita-cliente.php?id=588">Editar</a> <br />
                    <a href="destinatario.php?id=588" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=588&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriel Leidentz</td>
                  <td>CAMBORIÚ</td>
                  <td>SC</td>
                  <td>gabrielleidentzdasilva@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=423">Ver</a> <br />
                    <a href="edita-cliente.php?id=423">Editar</a> <br />
                    <a href="destinatario.php?id=423" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=423&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GABRIEL SANTOS</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=216">Ver</a> <br />
                    <a href="edita-cliente.php?id=216">Editar</a> <br />
                    <a href="destinatario.php?id=216" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=216&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriela Anjos</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>gabianjos1053@gmail.com</td>
                  <td>21 97336-1687</td>
                  <td>
                    <a href="cliente.php?id=1224">Ver</a> <br />
                    <a href="edita-cliente.php?id=1224">Editar</a> <br />
                    <a href="destinatario.php?id=1224" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1224&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gabriela Cabral Barreiros</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>gblecacb@hotmail.com</td>
                  <td>13 99762-6467 </td>
                  <td>cpf: 48233791000126</td>
                  <td>
                    <a href="cliente.php?id=1004">Ver</a> <br />
                    <a href="edita-cliente.php?id=1004">Editar</a> <br />
                    <a href="destinatario.php?id=1004" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1004&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GABRIELA DÓRIS PEREIRA DE FARIA</td>
                  <td>BRASÍLIA</td>
                  <td>DF</td>
                  <td>gdpfaria@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=311">Ver</a> <br />
                    <a href="edita-cliente.php?id=311">Editar</a> <br />
                    <a href="destinatario.php?id=311" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=311&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GABRIELA TAVARES</td>
                  <td>CAMPINAS</td>
                  <td>SP</td>
                  <td>almalavada2015@gmail.com</td>
                  <td>11 980662674</td>
                  <td>
                    <a href="cliente.php?id=134">Ver</a> <br />
                    <a href="edita-cliente.php?id=134">Editar</a> <br />
                    <a href="destinatario.php?id=134" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=134&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GABRIELI CORREIA</td>
                  <td>Córrego do Ouro (Campos Gerais)/MG - Distrito</td>
                  <td>MG</td>
                  <td>gabrielicorreiaoro@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=358">Ver</a> <br />
                    <a href="edita-cliente.php?id=358">Editar</a> <br />
                    <a href="destinatario.php?id=358" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=358&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gadyego Matos</td>
                  <td>Lages</td>
                  <td>SC</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>4999781326</td>
                  <td>
                    <a href="cliente.php?id=1014">Ver</a> <br />
                    <a href="edita-cliente.php?id=1014">Editar</a> <br />
                    <a href="destinatario.php?id=1014" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1014&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gadyego Matos</td>
                  <td>Rio de janeiro</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>021966501559</td>
                  <td>
                    <a href="cliente.php?id=1017">Ver</a> <br />
                    <a href="edita-cliente.php?id=1017">Editar</a> <br />
                    <a href="destinatario.php?id=1017" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1017&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gálbano Parfum - Osvaldo Júnior</td>
                  <td>Piracicaba</td>
                  <td>SP</td>
                  <td>junioredel@yahoo.com.br</td>
                  <td>19 99280-0604 </td>
                  <td>cpf: 345.817.348-00</td>
                  <td>
                    <a href="cliente.php?id=1041">Ver</a> <br />
                    <a href="edita-cliente.php?id=1041">Editar</a> <br />
                    <a href="destinatario.php?id=1041" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1041&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GEANNE VARGAS</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>geanevargas@hotmail.com</td>
                  <td>13 997115546</td>
                  <td>
                    <a href="cliente.php?id=132">Ver</a> <br />
                    <a href="edita-cliente.php?id=132">Editar</a> <br />
                    <a href="destinatario.php?id=132" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=132&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GEIRLANE LARA FREIRES MAIA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>geirlane.m@gmail.com</td>
                  <td>(85) 98787-8896</td>
                  <td>
                    <a href="cliente.php?id=160">Ver</a> <br />
                    <a href="edita-cliente.php?id=160">Editar</a> <br />
                    <a href="destinatario.php?id=160" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=160&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GEOVANE SILVA FLORÊNCIO</td>
                  <td>MAGÉ</td>
                  <td>RJ</td>
                  <td>geovane.l3@hotmail.com</td>
                  <td>(21) 98890-0573</td>
                  <td>
                    <a href="cliente.php?id=61">Ver</a> <br />
                    <a href="edita-cliente.php?id=61">Editar</a> <br />
                    <a href="destinatario.php?id=61" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=61&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GERALDO HENRIQUE CAMELO</td>
                  <td>MARIANA</td>
                  <td>MG</td>
                  <td>henriquecamello@yahoo.com.br</td>
                  <td>031 35572717/ 031 83386161</td>
                  <td>
                    <a href="cliente.php?id=44">Ver</a> <br />
                    <a href="edita-cliente.php?id=44">Editar</a> <br />
                    <a href="destinatario.php?id=44" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=44&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Geraldo Paiva de Figueiredo</td>
                  <td>João Pessoa</td>
                  <td>PB</td>
                  <td>geraldopf@outlook.com</td>
                  <td>83 8782-1208</td>
                  <td>
                    <a href="cliente.php?id=1231">Ver</a> <br />
                    <a href="edita-cliente.php?id=1231">Editar</a> <br />
                    <a href="destinatario.php?id=1231" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1231&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GERMANO ALVES</td>
                  <td>CAUCAIA</td>
                  <td>CE</td>
                  <td>germanoalvesg@hotmail.com</td>
                  <td>85 988161372</td>
                  <td>
                    <a href="cliente.php?id=307">Ver</a> <br />
                    <a href="edita-cliente.php?id=307">Editar</a> <br />
                    <a href="destinatario.php?id=307" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=307&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Germano Moreira</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>germano_toc@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=174">Ver</a> <br />
                    <a href="edita-cliente.php?id=174">Editar</a> <br />
                    <a href="destinatario.php?id=174" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=174&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gesilda Silva dos Santos/Toque de desejo</td>
                  <td>Salvador</td>
                  <td>BA</td>
                  <td>garomaseessencias@gmail.com</td>
                  <td>7186184689</td>
                  <td>
                    <a href="cliente.php?id=1069">Ver</a> <br />
                    <a href="edita-cliente.php?id=1069">Editar</a> <br />
                    <a href="destinatario.php?id=1069" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1069&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gessica Biscaia</td>
                  <td>ATUALIZAR</td>
                  <td>SP</td>
                  <td>gessicabiscaia@gmail.com</td>
                  <td>0000000</td>
                  <td>
                    <a href="cliente.php?id=253">Ver</a> <br />
                    <a href="edita-cliente.php?id=253">Editar</a> <br />
                    <a href="destinatario.php?id=253" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=253&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gilberto José Maia da Silva</td>
                  <td>Resende</td>
                  <td>RJ</td>
                  <td>Gilpublicidade.gm@Gmail.com</td>
                  <td>24 98836-8019 </td>
                  <td>cnpj: 14227507/0001-97</td>
                  <td>
                    <a href="cliente.php?id=996">Ver</a> <br />
                    <a href="edita-cliente.php?id=996">Editar</a> <br />
                    <a href="destinatario.php?id=996" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=996&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GILBERTO SOUZA</td>
                  <td>ARAUCÁRIA</td>
                  <td>PR</td>
                  <td>holyessencias@live.com</td>
                  <td>4196416806</td>
                  <td>
                    <a href="cliente.php?id=651">Ver</a> <br />
                    <a href="edita-cliente.php?id=651">Editar</a> <br />
                    <a href="destinatario.php?id=651" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=651&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gilmar Cabral</td>
                  <td>Nisia floresta</td>
                  <td>RN</td>
                  <td>gilmar.pride@hotmail.com</td>
                  <td>84 8880-7828</td>
                  <td>
                    <a href="cliente.php?id=861">Ver</a> <br />
                    <a href="edita-cliente.php?id=861">Editar</a> <br />
                    <a href="destinatario.php?id=861" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=861&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gilmar de Almeida Ferreira</td>
                  <td>Serra</td>
                  <td>ES</td>
                  <td>milionario.2018@hotmail.com</td>
                  <td>27 99822-4547</td>
                  <td>
                    <a href="cliente.php?id=1262">Ver</a> <br />
                    <a href="edita-cliente.php?id=1262">Editar</a> <br />
                    <a href="destinatario.php?id=1262" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1262&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gina Kelly Rodrigues da Silva</td>
                  <td>RECIFE</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>00000000000000</td>
                  <td>
                    <a href="cliente.php?id=582">Ver</a> <br />
                    <a href="edita-cliente.php?id=582">Editar</a> <br />
                    <a href="destinatario.php?id=582" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=582&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GIORDANO CAVALCANTE</td>
                  <td>AGUAS CLARAS</td>
                  <td>DF</td>
                  <td>gbparfum@hotmail.com</td>
                  <td>61 8108-5643 </td>
                  <td>cpf- 04216322328</td>
                  <td>
                    <a href="cliente.php?id=139">Ver</a> <br />
                    <a href="edita-cliente.php?id=139">Editar</a> <br />
                    <a href="destinatario.php?id=139" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=139&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Giovanna A Franceschi</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>63 9219-8195 </td>
                  <td>cnpj 55.282.444/0001-59</td>
                  <td>
                    <a href="cliente.php?id=1343">Ver</a> <br />
                    <a href="edita-cliente.php?id=1343">Editar</a> <br />
                    <a href="destinatario.php?id=1343" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1343&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Giovanna Yamashita Imbriani</td>
                  <td>BEBEDOURO</td>
                  <td>SP</td>
                  <td>giovanna.imbriani@granol.com.br</td>
                  <td>17 3344-5050 Ramal 4387</td>
                  <td>
                    <a href="cliente.php?id=410">Ver</a> <br />
                    <a href="edita-cliente.php?id=410">Editar</a> <br />
                    <a href="destinatario.php?id=410" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=410&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GIRLEY CORREA LIMA</td>
                  <td>GOVERNADOR VALADARES</td>
                  <td>MG</td>
                  <td>girley@kefas.com.br</td>
                  <td>333212-9600 / 33 99989-7030</td>
                  <td>
                    <a href="cliente.php?id=195">Ver</a> <br />
                    <a href="edita-cliente.php?id=195">Editar</a> <br />
                    <a href="destinatario.php?id=195" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=195&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gisele Barbosa Oliveira</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>girafacorpoecasa@hotmail.com</td>
                  <td>15 981280051</td>
                  <td>
                    <a href="cliente.php?id=138">Ver</a> <br />
                    <a href="edita-cliente.php?id=138">Editar</a> <br />
                    <a href="destinatario.php?id=138" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=138&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GISELE FONTANA</td>
                  <td>PONTA GROSSA</td>
                  <td>PR</td>
                  <td>gifontan@hotmail.com</td>
                  <td>42 8421-8080</td>
                  <td>
                    <a href="cliente.php?id=334">Ver</a> <br />
                    <a href="edita-cliente.php?id=334">Editar</a> <br />
                    <a href="destinatario.php?id=334" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=334&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GISELE MARTINS FRANCISCO</td>
                  <td>VOTORANTIN</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>015981601001</td>
                  <td>
                    <a href="cliente.php?id=761">Ver</a> <br />
                    <a href="edita-cliente.php?id=761">Editar</a> <br />
                    <a href="destinatario.php?id=761" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=761&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GISELE PAULA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>giselepaula1@hotmail.com</td>
                  <td>16 3012-4729</td>
                  <td>
                    <a href="cliente.php?id=133">Ver</a> <br />
                    <a href="edita-cliente.php?id=133">Editar</a> <br />
                    <a href="destinatario.php?id=133" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=133&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GISELE PEREIRA COSTA EVANGELISTA</td>
                  <td>SÃO JOÃO DO MERITI</td>
                  <td>RJ</td>
                  <td>videira.gisele@gmail.com</td>
                  <td>21 970131738</td>
                  <td>
                    <a href="cliente.php?id=862">Ver</a> <br />
                    <a href="edita-cliente.php?id=862">Editar</a> <br />
                    <a href="destinatario.php?id=862" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=862&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gisele Pereira da Silva</td>
                  <td>Praia Grande</td>
                  <td>SP</td>
                  <td>giseleps_21@hotmail.com</td>
                  <td>13 99126-6603</td>
                  <td>
                    <a href="cliente.php?id=1188">Ver</a> <br />
                    <a href="edita-cliente.php?id=1188">Editar</a> <br />
                    <a href="destinatario.php?id=1188" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1188&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Giselly da Silva Caldeira</td>
                  <td>Japeri</td>
                  <td>RJ</td>
                  <td>gisellys.caldeira@hotmail.com</td>
                  <td>21984281357</td>
                  <td>
                    <a href="cliente.php?id=921">Ver</a> <br />
                    <a href="edita-cliente.php?id=921">Editar</a> <br />
                    <a href="destinatario.php?id=921" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=921&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Givaneide Rocha de Oliveira</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>givaneidemarcos@gmail.com</td>
                  <td>84-98855-3881</td>
                  <td>
                    <a href="cliente.php?id=1038">Ver</a> <br />
                    <a href="edita-cliente.php?id=1038">Editar</a> <br />
                    <a href="destinatario.php?id=1038" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1038&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Givaneide Rocha de Oliveira</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>givaneidemarcos@gmail.com</td>
                  <td>84-98855-3881</td>
                  <td>
                    <a href="cliente.php?id=1039">Ver</a> <br />
                    <a href="edita-cliente.php?id=1039">Editar</a> <br />
                    <a href="destinatario.php?id=1039" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1039&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Glaziele Bruno</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>grazielebrum@hotmail.com</td>
                  <td>66 999963-6144</td>
                  <td>
                    <a href="cliente.php?id=1261">Ver</a> <br />
                    <a href="edita-cliente.php?id=1261">Editar</a> <br />
                    <a href="destinatario.php?id=1261" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1261&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Graça Roseira / L'Désir Cosmétique Van-Verr Ind. Com C. Ltda
                  </td>
                  <td>Itanhaém</td>
                  <td>SP</td>
                  <td>van-verr@hotmail.com</td>
                  <td>13 3422-2135</td>
                  <td>
                    <a href="cliente.php?id=221">Ver</a> <br />
                    <a href="edita-cliente.php?id=221">Editar</a> <br />
                    <a href="destinatario.php?id=221" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=221&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GRACIELE ALVES DE MORAIS</td>
                  <td>VAZANTE</td>
                  <td>MG</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>34 996673418</td>
                  <td>
                    <a href="cliente.php?id=365">Ver</a> <br />
                    <a href="edita-cliente.php?id=365">Editar</a> <br />
                    <a href="destinatario.php?id=365" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=365&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Graziele Mota da Silva</td>
                  <td>Salvador</td>
                  <td>BA</td>
                  <td>graziisilvae@gmail.com</td>
                  <td>71 9607-0204</td>
                  <td>
                    <a href="cliente.php?id=1240">Ver</a> <br />
                    <a href="edita-cliente.php?id=1240">Editar</a> <br />
                    <a href="destinatario.php?id=1240" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1240&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>GUILHERME / ROSE PARFUM</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>roseparfum@globo.com</td>
                  <td>21 97191-1106</td>
                  <td>
                    <a href="cliente.php?id=167">Ver</a> <br />
                    <a href="edita-cliente.php?id=167">Editar</a> <br />
                    <a href="destinatario.php?id=167" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=167&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gustavo Egidio dos Santos</td>
                  <td>Guaxupe</td>
                  <td>MG</td>
                  <td>gublackmodas@gmail.com</td>
                  <td>3498033897 </td>
                  <td>cpf: 098.995.346-36</td>
                  <td>
                    <a href="cliente.php?id=1141">Ver</a> <br />
                    <a href="edita-cliente.php?id=1141">Editar</a> <br />
                    <a href="destinatario.php?id=1141" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1141&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gustavo Gnoatto</td>
                  <td>Liberato Salzano</td>
                  <td>RS</td>
                  <td>guga_gnoatto@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=157">Ver</a> <br />
                    <a href="edita-cliente.php?id=157">Editar</a> <br />
                    <a href="destinatario.php?id=157" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=157&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Gustavo Juliette</td>
                  <td>Campinas</td>
                  <td>SP</td>
                  <td>guga.juliette@gmail.com</td>
                  <td>19 98198-9051</td>
                  <td>
                    <a href="cliente.php?id=1252">Ver</a> <br />
                    <a href="edita-cliente.php?id=1252">Editar</a> <br />
                    <a href="destinatario.php?id=1252" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1252&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HALISSON ARAÚJO SARAIVA</td>
                  <td>CAMPO NOVO DO PARECIS</td>
                  <td>MT</td>
                  <td>hallsaraivaa@gmail.com</td>
                  <td>99 8141-5735</td>
                  <td>
                    <a href="cliente.php?id=1208">Ver</a> <br />
                    <a href="edita-cliente.php?id=1208">Editar</a> <br />
                    <a href="destinatario.php?id=1208" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1208&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HALISSON ARAÚJO SARAIVA</td>
                  <td>CAMPO NOVO DO PARECIS</td>
                  <td>MT</td>
                  <td>hallsaraivaa@gmail.com</td>
                  <td>99 8141-5735</td>
                  <td>
                    <a href="cliente.php?id=1209">Ver</a> <br />
                    <a href="edita-cliente.php?id=1209">Editar</a> <br />
                    <a href="destinatario.php?id=1209" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1209&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HELDER SANTOS</td>
                  <td>GOIÂNIA</td>
                  <td>GO</td>
                  <td>h1santos@hotmail.com</td>
                  <td>00000000</td>
                  <td>
                    <a href="cliente.php?id=42">Ver</a> <br />
                    <a href="edita-cliente.php?id=42">Editar</a> <br />
                    <a href="destinatario.php?id=42" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=42&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HELENILDA OLIVEIRA</td>
                  <td>MOSSORÓ</td>
                  <td>RN</td>
                  <td>helenilda.oliveira@gmail.com</td>
                  <td>84-994240324</td>
                  <td>
                    <a href="cliente.php?id=93">Ver</a> <br />
                    <a href="edita-cliente.php?id=93">Editar</a> <br />
                    <a href="destinatario.php?id=93" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=93&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HELIO CEZAR POLY</td>
                  <td>ARAUCARIA</td>
                  <td>PR</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>41 99654707</td>
                  <td>
                    <a href="cliente.php?id=283">Ver</a> <br />
                    <a href="edita-cliente.php?id=283">Editar</a> <br />
                    <a href="destinatario.php?id=283" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=283&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Hellen Vitoria Lima Ferreira</td>
                  <td>Arapiraca</td>
                  <td>AL</td>
                  <td>hellen_-vitoria@hotmail.com</td>
                  <td>8298114309</td>
                  <td>
                    <a href="cliente.php?id=1046">Ver</a> <br />
                    <a href="edita-cliente.php?id=1046">Editar</a> <br />
                    <a href="destinatario.php?id=1046" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1046&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Helloana Souza Candido</td>
                  <td>Rio Verde</td>
                  <td>GO</td>
                  <td>florenzzagarden@gmail.com</td>
                  <td>6484524516</td>
                  <td>
                    <a href="cliente.php?id=1049">Ver</a> <br />
                    <a href="edita-cliente.php?id=1049">Editar</a> <br />
                    <a href="destinatario.php?id=1049" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1049&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HELOISA CRISTINA MALVINO</td>
                  <td>LIMEIRA</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>19 984091525</td>
                  <td>
                    <a href="cliente.php?id=693">Ver</a> <br />
                    <a href="edita-cliente.php?id=693">Editar</a> <br />
                    <a href="destinatario.php?id=693" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=693&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Heloísa Mara Pereira Santos</td>
                  <td>São Vicente</td>
                  <td>SP</td>
                  <td>naoinformado@naoinforamdo.com</td>
                  <td>999999999999999</td>
                  <td>
                    <a href="cliente.php?id=1233">Ver</a> <br />
                    <a href="edita-cliente.php?id=1233">Editar</a> <br />
                    <a href="destinatario.php?id=1233" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1233&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>HERMANO ALVES</td>
                  <td>Elias Fausto</td>
                  <td>SP</td>
                  <td>hermano.halves@gmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=164">Ver</a> <br />
                    <a href="edita-cliente.php?id=164">Editar</a> <br />
                    <a href="destinatario.php?id=164" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=164&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Hiago Costa</td>
                  <td>PIRACICABA</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>19 98134-7949</td>
                  <td>
                    <a href="cliente.php?id=728">Ver</a> <br />
                    <a href="edita-cliente.php?id=728">Editar</a> <br />
                    <a href="destinatario.php?id=728" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=728&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Holler Bases e Essências - Grazielle Hollerbach</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>grazielle.hollerbach@gmail.com</td>
                  <td>(31)99335 4810</td>
                  <td>
                    <a href="cliente.php?id=699">Ver</a> <br />
                    <a href="edita-cliente.php?id=699">Editar</a> <br />
                    <a href="destinatario.php?id=699" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=699&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Hugo Chaves Barreto</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8896440416</td>
                  <td>
                    <a href="cliente.php?id=758">Ver</a> <br />
                    <a href="edita-cliente.php?id=758">Editar</a> <br />
                    <a href="destinatario.php?id=758" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=758&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ian Leonardo Araya</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>ian_leonardo@ig.com.br</td>
                  <td>(21) 99774-3824</td>
                  <td>
                    <a href="cliente.php?id=401">Ver</a> <br />
                    <a href="edita-cliente.php?id=401">Editar</a> <br />
                    <a href="destinatario.php?id=401" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=401&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IANDRA MARIA SOUZA FARIAS</td>
                  <td>São Francisco do Oeste</td>
                  <td>RN</td>
                  <td>naofornecido@naofornecico.com</td>
                  <td>84 9929-8479 </td>
                  <td>cpf: 071.587.884-07</td>
                  <td>
                    <a href="cliente.php?id=894">Ver</a> <br />
                    <a href="edita-cliente.php?id=894">Editar</a> <br />
                    <a href="destinatario.php?id=894" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=894&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Iarqueane Silva de Oliveira</td>
                  <td>São Luis</td>
                  <td>MA</td>
                  <td>essenclearfragrancias@gmail.com</td>
                  <td>98 8116-9381 </td>
                  <td>cpf: 04762496359</td>
                  <td>
                    <a href="cliente.php?id=1280">Ver</a> <br />
                    <a href="edita-cliente.php?id=1280">Editar</a> <br />
                    <a href="destinatario.php?id=1280" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1280&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IGREJA IPI GETSEMANI</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>nadinesenna@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=650">Ver</a> <br />
                    <a href="edita-cliente.php?id=650">Editar</a> <br />
                    <a href="destinatario.php?id=650" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=650&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>INGRID VANESSA TAVARES</td>
                  <td>SÃO JOSÉ DO RIO PRETO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>17 981564537/9</td>
                  <td>
                    <a href="cliente.php?id=502">Ver</a> <br />
                    <a href="edita-cliente.php?id=502">Editar</a> <br />
                    <a href="destinatario.php?id=502" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=502&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ISABEL REYES / LA BOTICA SABONETES</td>
                  <td>JUNDIAI</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=359">Ver</a> <br />
                    <a href="edita-cliente.php?id=359">Editar</a> <br />
                    <a href="destinatario.php?id=359" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=359&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Isabele Sousa da Silva</td>
                  <td>Nova Iguaçu</td>
                  <td>RJ</td>
                  <td>isasousa90@gmail.com</td>
                  <td>21987944627</td>
                  <td>
                    <a href="cliente.php?id=922">Ver</a> <br />
                    <a href="edita-cliente.php?id=922">Editar</a> <br />
                    <a href="destinatario.php?id=922" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=922&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Isaias Santos de Jesus - A.Del Piero</td>
                  <td>salvador Bahia</td>
                  <td>BA</td>
                  <td>santosisa863@gmail.com</td>
                  <td>7184675408</td>
                  <td>
                    <a href="cliente.php?id=1248">Ver</a> <br />
                    <a href="edita-cliente.php?id=1248">Editar</a> <br />
                    <a href="destinatario.php?id=1248" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1248&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Isaias Santos de Jesus - A.Del Piero</td>
                  <td>salvador Bahia</td>
                  <td>BA</td>
                  <td>santosisa863@gmail.com</td>
                  <td>7184675408</td>
                  <td>
                    <a href="cliente.php?id=1249">Ver</a> <br />
                    <a href="edita-cliente.php?id=1249">Editar</a> <br />
                    <a href="destinatario.php?id=1249" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1249&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ISAQUE WILSON DE OLIVEIRS</td>
                  <td>PIRACICABA</td>
                  <td>SP</td>
                  <td>isaquewilson159@gmail.com</td>
                  <td>19 98105-4658</td>
                  <td>
                    <a href="cliente.php?id=547">Ver</a> <br />
                    <a href="edita-cliente.php?id=547">Editar</a> <br />
                    <a href="destinatario.php?id=547" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=547&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ithaitã Tibiriçá Oliveira Dias</td>
                  <td>Alagoinhas</td>
                  <td>BA</td>
                  <td>tai-jogos@hotmail.com</td>
                  <td>75 9992-2501</td>
                  <td>
                    <a href="cliente.php?id=1222">Ver</a> <br />
                    <a href="edita-cliente.php?id=1222">Editar</a> <br />
                    <a href="destinatario.php?id=1222" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1222&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IVA CAROLINE DE MELO SOUZA</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>mycandyalagoas@gmail.com</td>
                  <td>82 9884-62504</td>
                  <td>
                    <a href="cliente.php?id=1136">Ver</a> <br />
                    <a href="edita-cliente.php?id=1136">Editar</a> <br />
                    <a href="destinatario.php?id=1136" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1136&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IVAN FERREIRA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>ivan.41522@gmail.com</td>
                  <td>11-947887862</td>
                  <td>
                    <a href="cliente.php?id=86">Ver</a> <br />
                    <a href="edita-cliente.php?id=86">Editar</a> <br />
                    <a href="destinatario.php?id=86" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=86&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IVETE PERIN</td>
                  <td>CURITIBA</td>
                  <td>PR</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>41 88338043</td>
                  <td>
                    <a href="cliente.php?id=285">Ver</a> <br />
                    <a href="edita-cliente.php?id=285">Editar</a> <br />
                    <a href="destinatario.php?id=285" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=285&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IVONE FURLAN DE LINA</td>
                  <td>ALTA FLORESTA</td>
                  <td>MT</td>
                  <td>ivone_if@hotmail.com</td>
                  <td>66- 99234-2005</td>
                  <td>
                    <a href="cliente.php?id=316">Ver</a> <br />
                    <a href="edita-cliente.php?id=316">Editar</a> <br />
                    <a href="destinatario.php?id=316" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=316&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>IZABEL POSSATO</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>izabelpossatto@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=147">Ver</a> <br />
                    <a href="edita-cliente.php?id=147">Editar</a> <br />
                    <a href="destinatario.php?id=147" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=147&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>J EDUARDO MACEDO</td>
                  <td>BIRIGUI</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>(018) 99699-1617</td>
                  <td>
                    <a href="cliente.php?id=569">Ver</a> <br />
                    <a href="edita-cliente.php?id=569">Editar</a> <br />
                    <a href="destinatario.php?id=569" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=569&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JACQUELINE PALHARES</td>
                  <td>PACIENCIA</td>
                  <td>RJ</td>
                  <td>jacqueline-palhares@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=372">Ver</a> <br />
                    <a href="edita-cliente.php?id=372">Editar</a> <br />
                    <a href="destinatario.php?id=372" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=372&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JAGB BRINDES - TATIANE</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>holyessencias@hotmail.com</td>
                  <td>11 913496138</td>
                  <td>
                    <a href="cliente.php?id=933">Ver</a> <br />
                    <a href="edita-cliente.php?id=933">Editar</a> <br />
                    <a href="destinatario.php?id=933" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=933&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jailson Costa da Fonseca</td>
                  <td>naõ informada</td>
                  <td>SP</td>
                  <td>jailsondiamante@gmail.com</td>
                  <td>11991181991</td>
                  <td>
                    <a href="cliente.php?id=1071">Ver</a> <br />
                    <a href="edita-cliente.php?id=1071">Editar</a> <br />
                    <a href="destinatario.php?id=1071" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1071&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jaime André Dupont</td>
                  <td>Birigui</td>
                  <td>SP</td>
                  <td>digramadopf@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=526">Ver</a> <br />
                    <a href="edita-cliente.php?id=526">Editar</a> <br />
                    <a href="destinatario.php?id=526" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=526&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jaime Costa Júnior</td>
                  <td>NITEROI</td>
                  <td>RJ</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>21 99912 6966 / 22 2141 9284</td>
                  <td>
                    <a href="cliente.php?id=404">Ver</a> <br />
                    <a href="edita-cliente.php?id=404">Editar</a> <br />
                    <a href="destinatario.php?id=404" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=404&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jaime Luiz Blaszczak</td>
                  <td>Erechim</td>
                  <td>RS</td>
                  <td>persianasmaxi@gmail.com</td>
                  <td>99999999999</td>
                  <td>
                    <a href="cliente.php?id=1263">Ver</a> <br />
                    <a href="edita-cliente.php?id=1263">Editar</a> <br />
                    <a href="destinatario.php?id=1263" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1263&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JANAÍNA APARECIDO PAULINO RIBEIRO</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=660">Ver</a> <br />
                    <a href="edita-cliente.php?id=660">Editar</a> <br />
                    <a href="destinatario.php?id=660" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=660&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JANAÍNA MAIRINK</td>
                  <td>CAMPO GRANDE</td>
                  <td>RJ</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=389">Ver</a> <br />
                    <a href="edita-cliente.php?id=389">Editar</a> <br />
                    <a href="destinatario.php?id=389" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=389&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JANE MENDES</td>
                  <td>DIADEMA</td>
                  <td>SP</td>
                  <td>janetertu@hotmail.com</td>
                  <td>11 7422 9851</td>
                  <td>
                    <a href="cliente.php?id=356">Ver</a> <br />
                    <a href="edita-cliente.php?id=356">Editar</a> <br />
                    <a href="destinatario.php?id=356" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=356&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jania da Silva Pereira - Primeira Essência</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>lojaprimeiraessencia@gmail.com</td>
                  <td>21 97488-2130 </td>
                  <td>cnpj: 43.898.400/0001-79</td>
                  <td>
                    <a href="cliente.php?id=964">Ver</a> <br />
                    <a href="edita-cliente.php?id=964">Editar</a> <br />
                    <a href="destinatario.php?id=964" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=964&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jânio do Nascimento Bessa</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>zifyre123_@hotmail.com</td>
                  <td>(85) 98894-1667</td>
                  <td>
                    <a href="cliente.php?id=246">Ver</a> <br />
                    <a href="edita-cliente.php?id=246">Editar</a> <br />
                    <a href="destinatario.php?id=246" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=246&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JEAN CARDOSO DE FARIA</td>
                  <td>MAUÁ</td>
                  <td>SP</td>
                  <td>bendercontratipos@gmail.com</td>
                  <td>11 99579-0513</td>
                  <td>
                    <a href="cliente.php?id=456">Ver</a> <br />
                    <a href="edita-cliente.php?id=456">Editar</a> <br />
                    <a href="destinatario.php?id=456" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=456&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jean Carlos Mafra da Silva</td>
                  <td>Jaraguá do Sul</td>
                  <td>SC</td>
                  <td>jeancarlos_mafra@hotmail.com</td>
                  <td>47 99619-4244 </td>
                  <td>cpf/</td>
                  <td>cnpj: 07813887913</td>
                  <td>
                    <a href="cliente.php?id=1339">Ver</a> <br />
                    <a href="edita-cliente.php?id=1339">Editar</a> <br />
                    <a href="destinatario.php?id=1339" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1339&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JEAN CARLOS PERINI</td>
                  <td>PATO BRANCO</td>
                  <td>PR</td>
                  <td>jean@abacocosmeticos.com.br</td>
                  <td>46 8803-1225 / 46 3225-9823</td>
                  <td>
                    <a href="cliente.php?id=304">Ver</a> <br />
                    <a href="edita-cliente.php?id=304">Editar</a> <br />
                    <a href="destinatario.php?id=304" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=304&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JEFERSON DA COSTA PEDROSA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>PEDROSAJEFERSON@GMAIL.COM</td>
                  <td>(21) 98119-1084</td>
                  <td>
                    <a href="cliente.php?id=56">Ver</a> <br />
                    <a href="edita-cliente.php?id=56">Editar</a> <br />
                    <a href="destinatario.php?id=56" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=56&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jeferson Fernando Nicoleto</td>
                  <td>ARARAS</td>
                  <td>SP</td>
                  <td>NICOLETTOMKT@GMAIL.COM</td>
                  <td>19 998604321</td>
                  <td>
                    <a href="cliente.php?id=503">Ver</a> <br />
                    <a href="edita-cliente.php?id=503">Editar</a> <br />
                    <a href="destinatario.php?id=503" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=503&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jefferson Fiusa dos Santos</td>
                  <td>Mauá</td>
                  <td>SP</td>
                  <td>jeffersonvianatura@gmail.com</td>
                  <td>11 94949-2273 </td>
                  <td>cpf: 342.977.428-44</td>
                  <td>
                    <a href="cliente.php?id=994">Ver</a> <br />
                    <a href="edita-cliente.php?id=994">Editar</a> <br />
                    <a href="destinatario.php?id=994" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=994&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jessica Dellabega</td>
                  <td>Sertaozinho</td>
                  <td>SP</td>
                  <td>popjel@hotmail.com</td>
                  <td>16991618533</td>
                  <td>
                    <a href="cliente.php?id=1334">Ver</a> <br />
                    <a href="edita-cliente.php?id=1334">Editar</a> <br />
                    <a href="destinatario.php?id=1334" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1334&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jessica Dellabega</td>
                  <td>Sertaozinho</td>
                  <td>SP</td>
                  <td>popjel@hotmail.com</td>
                  <td>16991618533</td>
                  <td>
                    <a href="cliente.php?id=1335">Ver</a> <br />
                    <a href="edita-cliente.php?id=1335">Editar</a> <br />
                    <a href="destinatario.php?id=1335" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1335&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JESSICA MONTEIRO</td>
                  <td>Uberlandia</td>
                  <td>MG</td>
                  <td>jessikamrocha@terra.com.br</td>
                  <td>(34) 99925-6552</td>
                  <td>
                    <a href="cliente.php?id=251">Ver</a> <br />
                    <a href="edita-cliente.php?id=251">Editar</a> <br />
                    <a href="destinatario.php?id=251" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=251&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jessica Ramos</td>
                  <td>nao informada</td>
                  <td>SP</td>
                  <td>jessicasilva.eng@hotmail.com</td>
                  <td>41 99888-6121</td>
                  <td>
                    <a href="cliente.php?id=1267">Ver</a> <br />
                    <a href="edita-cliente.php?id=1267">Editar</a> <br />
                    <a href="destinatario.php?id=1267" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1267&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jevan Lorenzo</td>
                  <td>Londrina</td>
                  <td>PR</td>
                  <td>jevanlorenzo@gmail.com</td>
                  <td>43 8809-2561 </td>
                  <td>cpf: 83441670949</td>
                  <td>
                    <a href="cliente.php?id=1034">Ver</a> <br />
                    <a href="edita-cliente.php?id=1034">Editar</a> <br />
                    <a href="destinatario.php?id=1034" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1034&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jhemys Feitosa</td>
                  <td>MINAÇU</td>
                  <td>GO</td>
                  <td>jhemysfeitosa@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=232">Ver</a> <br />
                    <a href="edita-cliente.php?id=232">Editar</a> <br />
                    <a href="destinatario.php?id=232" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=232&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>João Batista Carvalho Almeida</td>
                  <td>CAUCAIA</td>
                  <td>CE</td>
                  <td>carvalhotkd27@gmail.com</td>
                  <td></td>
                  <td>cnpj:26.914.985/0001-42</td>
                  <td>
                    <a href="cliente.php?id=558">Ver</a> <br />
                    <a href="edita-cliente.php?id=558">Editar</a> <br />
                    <a href="destinatario.php?id=558" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=558&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOÃO BATISTA DOS SANTOS</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>magds010@gmail.com</td>
                  <td>16 991848521</td>
                  <td>
                    <a href="cliente.php?id=66">Ver</a> <br />
                    <a href="edita-cliente.php?id=66">Editar</a> <br />
                    <a href="destinatario.php?id=66" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=66&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>João Batista Machowski</td>
                  <td>BALNEÁRIO CAMBORIÚ</td>
                  <td>SC</td>
                  <td>joao@imperadora.com</td>
                  <td>(47) 3366-6748</td>
                  <td>
                    <a href="cliente.php?id=344">Ver</a> <br />
                    <a href="edita-cliente.php?id=344">Editar</a> <br />
                    <a href="destinatario.php?id=344" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=344&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOÃO DEOLINDO DOS SANTOS</td>
                  <td>SÃO MIGUEL PAULISTA</td>
                  <td>SP</td>
                  <td>djoodeolindodossantos@yahoo.com.br</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=211">Ver</a> <br />
                    <a href="edita-cliente.php?id=211">Editar</a> <br />
                    <a href="destinatario.php?id=211" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=211&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Joao Gabriel Marques Ursino</td>
                  <td>Sertaõzinho</td>
                  <td>SP</td>
                  <td>jgeletronicosme@gmail.com</td>
                  <td>16 991713535 42048692000198</td>
                  <td>
                    <a href="cliente.php?id=1007">Ver</a> <br />
                    <a href="edita-cliente.php?id=1007">Editar</a> <br />
                    <a href="destinatario.php?id=1007" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1007&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>João Gabriel Martins Soares</td>
                  <td>Ribeirao das Neves</td>
                  <td>MG</td>
                  <td>gabriel.15200@hotmail.com</td>
                  <td>(031) 999632362 / (031) 97555-7109 /(031) 3624-77</td>
                  <td>
                    <a href="cliente.php?id=521">Ver</a> <br />
                    <a href="edita-cliente.php?id=521">Editar</a> <br />
                    <a href="destinatario.php?id=521" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=521&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOÃO MARCO CARDOSO</td>
                  <td>PEDERNEIRAS</td>
                  <td>SP</td>
                  <td>marcospederneiras2020@gmail.com</td>
                  <td>14 998771873</td>
                  <td>
                    <a href="cliente.php?id=145">Ver</a> <br />
                    <a href="edita-cliente.php?id=145">Editar</a> <br />
                    <a href="destinatario.php?id=145" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=145&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOAQUIM SERGIO DA SILVA JUNIOR</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>jsergiojunior2016@bol.com</td>
                  <td>11 99449-5305</td>
                  <td>
                    <a href="cliente.php?id=594">Ver</a> <br />
                    <a href="edita-cliente.php?id=594">Editar</a> <br />
                    <a href="destinatario.php?id=594" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=594&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOCILENE COSTA RAMOS</td>
                  <td>AREIOPOLIS</td>
                  <td>SP</td>
                  <td>jocilenec.ramos@hotmail.com</td>
                  <td>14-99634-1891</td>
                  <td>
                    <a href="cliente.php?id=317">Ver</a> <br />
                    <a href="edita-cliente.php?id=317">Editar</a> <br />
                    <a href="destinatario.php?id=317" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=317&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOE LUIZ MORAES DA SILVA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>11943043683</td>
                  <td>
                    <a href="cliente.php?id=850">Ver</a> <br />
                    <a href="edita-cliente.php?id=850">Editar</a> <br />
                    <a href="destinatario.php?id=850" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=850&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Joelcio de Souza Oliveira</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>djjoelcio@hotmail.com</td>
                  <td>21 996742182</td>
                  <td>
                    <a href="cliente.php?id=1113">Ver</a> <br />
                    <a href="edita-cliente.php?id=1113">Editar</a> <br />
                    <a href="destinatario.php?id=1113" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1113&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>John Lopes dos Santos Silva - GOLDEN PARFUM</td>
                  <td>São Sebastião Palhoça SC</td>
                  <td>SC</td>
                  <td>goldparfum.oficial@hotmail.com</td>
                  <td>048 9190-0192 </td>
                  <td>cnpj: 30.072.844/0001-09 IE 260.</td>
                  <td>
                    <a href="cliente.php?id=1101">Ver</a> <br />
                    <a href="edita-cliente.php?id=1101">Editar</a> <br />
                    <a href="destinatario.php?id=1101" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1101&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Joilson Muniz de Souza</td>
                  <td>VÁRZEA GRANDE</td>
                  <td>MT</td>
                  <td>djojmx@gmail.com</td>
                  <td>(65) 9956.4988</td>
                  <td>
                    <a href="cliente.php?id=252">Ver</a> <br />
                    <a href="edita-cliente.php?id=252">Editar</a> <br />
                    <a href="destinatario.php?id=252" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=252&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JONAS GUIMARÃES</td>
                  <td>CAMPINAS</td>
                  <td>SP</td>
                  <td>sem-email@sem-email.com</td>
                  <td>19 998912630 / 32419699</td>
                  <td>
                    <a href="cliente.php?id=466">Ver</a> <br />
                    <a href="edita-cliente.php?id=466">Editar</a> <br />
                    <a href="destinatario.php?id=466" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=466&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JONAS WILLE</td>
                  <td>REALEZA</td>
                  <td>PR</td>
                  <td>jonaswille-10@hotmail.com</td>
                  <td>46 99263799</td>
                  <td>
                    <a href="cliente.php?id=335">Ver</a> <br />
                    <a href="edita-cliente.php?id=335">Editar</a> <br />
                    <a href="destinatario.php?id=335" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=335&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jonatas Silveira de Andrade</td>
                  <td>Centro-Itanhaem</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11974919632</td>
                  <td>
                    <a href="cliente.php?id=580">Ver</a> <br />
                    <a href="edita-cliente.php?id=580">Editar</a> <br />
                    <a href="destinatario.php?id=580" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=580&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jonathan Wilian de Sousa</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>13974243618</td>
                  <td>
                    <a href="cliente.php?id=887">Ver</a> <br />
                    <a href="edita-cliente.php?id=887">Editar</a> <br />
                    <a href="destinatario.php?id=887" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=887&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jordy Amazonas de Lima</td>
                  <td>Olinda</td>
                  <td>PE</td>
                  <td>jordylimaadm@gmail.com</td>
                  <td>8187363916</td>
                  <td>
                    <a href="cliente.php?id=1225">Ver</a> <br />
                    <a href="edita-cliente.php?id=1225">Editar</a> <br />
                    <a href="destinatario.php?id=1225" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1225&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jorge Luiz Torrres Pereira Pereira</td>
                  <td>Elias Fausto</td>
                  <td>SP</td>
                  <td>jevaromas@gmail.com</td>
                  <td>19971397638</td>
                  <td>
                    <a href="cliente.php?id=1191">Ver</a> <br />
                    <a href="edita-cliente.php?id=1191">Editar</a> <br />
                    <a href="destinatario.php?id=1191" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1191&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>José Ailton Chaves</td>
                  <td>Praia Grande</td>
                  <td>SP</td>
                  <td>jacochavesFFF@gmail.com</td>
                  <td>13996088377</td>
                  <td>
                    <a href="cliente.php?id=910">Ver</a> <br />
                    <a href="edita-cliente.php?id=910">Editar</a> <br />
                    <a href="destinatario.php?id=910" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=910&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>José Alesi Lins André</td>
                  <td>IPU</td>
                  <td>CE</td>
                  <td>alesi.lins@hotmail.com</td>
                  <td>88 998045103</td>
                  <td>
                    <a href="cliente.php?id=615">Ver</a> <br />
                    <a href="edita-cliente.php?id=615">Editar</a> <br />
                    <a href="destinatario.php?id=615" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=615&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jose Antonio Ribeiro da Silva</td>
                  <td>Teresina</td>
                  <td>PI</td>
                  <td>tonny.siares@outlook.com.br</td>
                  <td>8695983571</td>
                  <td>
                    <a href="cliente.php?id=1021">Ver</a> <br />
                    <a href="edita-cliente.php?id=1021">Editar</a> <br />
                    <a href="destinatario.php?id=1021" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1021&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSE APARECIDO OLIVEIRA</td>
                  <td>Hortolândia</td>
                  <td>SP</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>19 98188-4583</td>
                  <td>
                    <a href="cliente.php?id=214">Ver</a> <br />
                    <a href="edita-cliente.php?id=214">Editar</a> <br />
                    <a href="destinatario.php?id=214" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=214&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSÉ CARLOS MAGALHÃES</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>carlosblassedporgood@hotmail.com</td>
                  <td>11969779164</td>
                  <td>
                    <a href="cliente.php?id=658">Ver</a> <br />
                    <a href="edita-cliente.php?id=658">Editar</a> <br />
                    <a href="destinatario.php?id=658" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=658&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Jose Francisco Oliveira</td>
                  <td>Espirito Santo</td>
                  <td>ES</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>27992878485</td>
                  <td>
                    <a href="cliente.php?id=705">Ver</a> <br />
                    <a href="edita-cliente.php?id=705">Editar</a> <br />
                    <a href="destinatario.php?id=705" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=705&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSE GERALDO DE BARROS PEREIRA DA CRUZ</td>
                  <td>MOGI MIRIM</td>
                  <td>SP</td>
                  <td>jgbpcruz@hotmail.com</td>
                  <td>19 98163-0328</td>
                  <td>
                    <a href="cliente.php?id=720">Ver</a> <br />
                    <a href="edita-cliente.php?id=720">Editar</a> <br />
                    <a href="destinatario.php?id=720" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=720&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>José Mailton Pereira</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>85 8780-6460</td>
                  <td>
                    <a href="cliente.php?id=876">Ver</a> <br />
                    <a href="edita-cliente.php?id=876">Editar</a> <br />
                    <a href="destinatario.php?id=876" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=876&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSE MARIO DIAS SARAIVA</td>
                  <td>Uruburetama</td>
                  <td>CE</td>
                  <td>jmdsubr@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=506">Ver</a> <br />
                    <a href="edita-cliente.php?id=506">Editar</a> <br />
                    <a href="destinatario.php?id=506" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=506&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSE NUNES NETO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE@GMAIL.COM</td>
                  <td>13974064753</td>
                  <td>
                    <a href="cliente.php?id=754">Ver</a> <br />
                    <a href="edita-cliente.php?id=754">Editar</a> <br />
                    <a href="destinatario.php?id=754" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=754&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSE OLIVEIRA</td>
                  <td>TAMANDARÉ</td>
                  <td>PE</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=279">Ver</a> <br />
                    <a href="edita-cliente.php?id=279">Editar</a> <br />
                    <a href="destinatario.php?id=279" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=279&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>José Roberto Silva Oliveira</td>
                  <td>Indaiatuba</td>
                  <td>SP</td>
                  <td>robercell171@icloud.com</td>
                  <td>19 988053015 / 19 39365948</td>
                  <td>
                    <a href="cliente.php?id=443">Ver</a> <br />
                    <a href="edita-cliente.php?id=443">Editar</a> <br />
                    <a href="destinatario.php?id=443" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=443&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>José Romero Pereira Lima</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>85 8598-3524</td>
                  <td>
                    <a href="cliente.php?id=810">Ver</a> <br />
                    <a href="edita-cliente.php?id=810">Editar</a> <br />
                    <a href="destinatario.php?id=810" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=810&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSEANE VALQUIRIA MUNHOZ JOSWIACK</td>
                  <td>JARDIM SANTA MARIA SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>974025041</td>
                  <td>
                    <a href="cliente.php?id=776">Ver</a> <br />
                    <a href="edita-cliente.php?id=776">Editar</a> <br />
                    <a href="destinatario.php?id=776" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=776&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Josefa ( Jô )</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=170">Ver</a> <br />
                    <a href="edita-cliente.php?id=170">Editar</a> <br />
                    <a href="destinatario.php?id=170" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=170&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSEFA CUSTODIO DOS SANTOS</td>
                  <td>PRAIA GRANDE</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=396">Ver</a> <br />
                    <a href="edita-cliente.php?id=396">Editar</a> <br />
                    <a href="destinatario.php?id=396" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=396&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSEFA FONTES</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>aromatizararomas@gmail.com</td>
                  <td>71 - 99147-6455</td>
                  <td>
                    <a href="cliente.php?id=531">Ver</a> <br />
                    <a href="edita-cliente.php?id=531">Editar</a> <br />
                    <a href="destinatario.php?id=531" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=531&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Joselaine C. C. Sobral</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>joselaineccosta@gmail.com</td>
                  <td>55 13 97421-2500 / </td>
                  <td>cpf 199.397.618-30</td>
                  <td>
                    <a href="cliente.php?id=847">Ver</a> <br />
                    <a href="edita-cliente.php?id=847">Editar</a> <br />
                    <a href="destinatario.php?id=847" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=847&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSELENE DE FÁTIMA M. SANTOS</td>
                  <td>MATOZINHOS</td>
                  <td>MG</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>31 9 9473-9921</td>
                  <td>
                    <a href="cliente.php?id=348">Ver</a> <br />
                    <a href="edita-cliente.php?id=348">Editar</a> <br />
                    <a href="destinatario.php?id=348" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=348&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSENILDO FERNANDES DA SILVA</td>
                  <td>CARUARU</td>
                  <td>PE</td>
                  <td>josenildogalego@hotmail.com</td>
                  <td>(81) 99140-0392 - 81- 997114350</td>
                  <td>
                    <a href="cliente.php?id=159">Ver</a> <br />
                    <a href="edita-cliente.php?id=159">Editar</a> <br />
                    <a href="destinatario.php?id=159" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=159&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Josiane Fiorese</td>
                  <td>nao identificadas</td>
                  <td>SP</td>
                  <td>josifiorese@gmail.com</td>
                  <td>54 9 9675-0705</td>
                  <td>
                    <a href="cliente.php?id=1063">Ver</a> <br />
                    <a href="edita-cliente.php?id=1063">Editar</a> <br />
                    <a href="destinatario.php?id=1063" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1063&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSIANE NODANESE</td>
                  <td>SARANDI</td>
                  <td>RS</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=437">Ver</a> <br />
                    <a href="edita-cliente.php?id=437">Editar</a> <br />
                    <a href="destinatario.php?id=437" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=437&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Josiane Soares Cardoso</td>
                  <td>Jardim Colonial</td>
                  <td>SP</td>
                  <td>josiannesoares@icloud.com</td>
                  <td>11945345757</td>
                  <td>
                    <a href="cliente.php?id=1189">Ver</a> <br />
                    <a href="edita-cliente.php?id=1189">Editar</a> <br />
                    <a href="destinatario.php?id=1189" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1189&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Josias Furtado</td>
                  <td>nãofornecido</td>
                  <td>SP</td>
                  <td>josiasfurtado100120@gmail.com</td>
                  <td>47991558196</td>
                  <td>
                    <a href="cliente.php?id=1033">Ver</a> <br />
                    <a href="edita-cliente.php?id=1033">Editar</a> <br />
                    <a href="destinatario.php?id=1033" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1033&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JOSMAR ANTONIO DA SILVA</td>
                  <td>LONDRINA</td>
                  <td>PR</td>
                  <td>josmar.asiste@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=507">Ver</a> <br />
                    <a href="edita-cliente.php?id=507">Editar</a> <br />
                    <a href="destinatario.php?id=507" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=507&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JULIANA ANDRIGHETTI</td>
                  <td>POÁ</td>
                  <td>SP</td>
                  <td>ju_andrighetti@hotmail.com</td>
                  <td>11 9 6353-1301</td>
                  <td>
                    <a href="cliente.php?id=350">Ver</a> <br />
                    <a href="edita-cliente.php?id=350">Editar</a> <br />
                    <a href="destinatario.php?id=350" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=350&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Juliana Baracho</td>
                  <td>ASSIS</td>
                  <td>SP</td>
                  <td>juliana@terraviva.ind.br</td>
                  <td>(18) 3022-3324</td>
                  <td>
                    <a href="cliente.php?id=616">Ver</a> <br />
                    <a href="edita-cliente.php?id=616">Editar</a> <br />
                    <a href="destinatario.php?id=616" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=616&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JULIANA DUTRA</td>
                  <td>SÃO JOSÉ DO RIO PRETO</td>
                  <td>SP</td>
                  <td>JULIANAHDUTRA@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=367">Ver</a> <br />
                    <a href="edita-cliente.php?id=367">Editar</a> <br />
                    <a href="destinatario.php?id=367" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=367&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JULIANA MARCIA MACHADO</td>
                  <td>BRASÍLIA</td>
                  <td>DF</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>XXXX</td>
                  <td>
                    <a href="cliente.php?id=550">Ver</a> <br />
                    <a href="edita-cliente.php?id=550">Editar</a> <br />
                    <a href="destinatario.php?id=550" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=550&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Juliana Neuls</td>
                  <td>Nonoai</td>
                  <td>RS</td>
                  <td>juuneuls@hotmail.com</td>
                  <td>55 9938-8987 5496423639</td>
                  <td>
                    <a href="cliente.php?id=471">Ver</a> <br />
                    <a href="edita-cliente.php?id=471">Editar</a> <br />
                    <a href="destinatario.php?id=471" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=471&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Juliano Karpinski</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>21974497610</td>
                  <td>
                    <a href="cliente.php?id=748">Ver</a> <br />
                    <a href="edita-cliente.php?id=748">Editar</a> <br />
                    <a href="destinatario.php?id=748" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=748&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Juliano Karpinski</td>
                  <td>SAO VALENTIM - RIO GRANDE DO SUL</td>
                  <td>RS</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13974070603 / 54 9623-8868</td>
                  <td>
                    <a href="cliente.php?id=752">Ver</a> <br />
                    <a href="edita-cliente.php?id=752">Editar</a> <br />
                    <a href="destinatario.php?id=752" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=752&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Júlio César de Almeida</td>
                  <td>Niterói</td>
                  <td>RJ</td>
                  <td>jczellner.almeida@gmail.com</td>
                  <td>21 99647-7687</td>
                  <td>
                    <a href="cliente.php?id=1200">Ver</a> <br />
                    <a href="edita-cliente.php?id=1200">Editar</a> <br />
                    <a href="destinatario.php?id=1200" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1200&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Julio Silva de Oliveira</td>
                  <td>Natal</td>
                  <td>RN</td>
                  <td>julio.olivra.108@gmail.com</td>
                  <td>8494631509</td>
                  <td>
                    <a href="cliente.php?id=1250">Ver</a> <br />
                    <a href="edita-cliente.php?id=1250">Editar</a> <br />
                    <a href="destinatario.php?id=1250" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1250&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JUNIOR CESAR</td>
                  <td>LONDRINA</td>
                  <td>PR</td>
                  <td>verticeperfumes@hotmail.com</td>
                  <td>43 84121991 / 43 33546532</td>
                  <td>
                    <a href="cliente.php?id=135">Ver</a> <br />
                    <a href="edita-cliente.php?id=135">Editar</a> <br />
                    <a href="destinatario.php?id=135" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=135&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>JUNIOR CESAR OLIVEIRA</td>
                  <td>MARILIA</td>
                  <td>SP</td>
                  <td>juniorsim@hotmail.com</td>
                  <td>14 9971-85695</td>
                  <td>
                    <a href="cliente.php?id=101">Ver</a> <br />
                    <a href="edita-cliente.php?id=101">Editar</a> <br />
                    <a href="destinatario.php?id=101" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=101&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Karen Hellen Martinez Lira Fernandes</td>
                  <td>Urânia</td>
                  <td>SP</td>
                  <td>karenlirafernandes@gmail.com</td>
                  <td>17 98112 4218</td>
                  <td>
                    <a href="cliente.php?id=1328">Ver</a> <br />
                    <a href="edita-cliente.php?id=1328">Editar</a> <br />
                    <a href="destinatario.php?id=1328" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1328&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Karina Neves Cabral</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=277">Ver</a> <br />
                    <a href="edita-cliente.php?id=277">Editar</a> <br />
                    <a href="destinatario.php?id=277" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=277&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Karla Jamil Chebel</td>
                  <td>UBERABA</td>
                  <td>MG</td>
                  <td>clinicacorpus_@outlook.com</td>
                  <td>34 9151-0184 </td>
                  <td>cpf 01323322647</td>
                  <td>
                    <a href="cliente.php?id=416">Ver</a> <br />
                    <a href="edita-cliente.php?id=416">Editar</a> <br />
                    <a href="destinatario.php?id=416" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=416&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Karlos Gean</td>
                  <td>Iguatu</td>
                  <td>CE</td>
                  <td>karlos.gean123@gmail.com</td>
                  <td>8888296562</td>
                  <td>
                    <a href="cliente.php?id=1081">Ver</a> <br />
                    <a href="edita-cliente.php?id=1081">Editar</a> <br />
                    <a href="destinatario.php?id=1081" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1081&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Katia B. M. Cardozo</td>
                  <td>RIO JANEIRO</td>
                  <td>RJ</td>
                  <td>farmakacia@hotmail.com.br</td>
                  <td>21 24471304</td>
                  <td>
                    <a href="cliente.php?id=403">Ver</a> <br />
                    <a href="edita-cliente.php?id=403">Editar</a> <br />
                    <a href="destinatario.php?id=403" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=403&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>KATIA KRAHENBUHL</td>
                  <td>SANTO ANDRE</td>
                  <td>SP</td>
                  <td>katiapk@gmail.com</td>
                  <td>11-99954-9374</td>
                  <td>
                    <a href="cliente.php?id=319">Ver</a> <br />
                    <a href="edita-cliente.php?id=319">Editar</a> <br />
                    <a href="destinatario.php?id=319" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=319&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>KATIA LUSTOSA</td>
                  <td>Sao Vicente</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=498">Ver</a> <br />
                    <a href="edita-cliente.php?id=498">Editar</a> <br />
                    <a href="destinatario.php?id=498" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=498&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Kelly Aline Diniz - Golden Impact Saboaria e Perfumaria
                    Artesanal
                  </td>
                  <td>Cerquilho</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>15 99720-9363</td>
                  <td>
                    <a href="cliente.php?id=1190">Ver</a> <br />
                    <a href="edita-cliente.php?id=1190">Editar</a> <br />
                    <a href="destinatario.php?id=1190" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1190&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Kelma Cabral Mendes Costa</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>kelmacmc@gmail.com</td>
                  <td>85 9 8655-8158</td>
                  <td>
                    <a href="cliente.php?id=1016">Ver</a> <br />
                    <a href="edita-cliente.php?id=1016">Editar</a> <br />
                    <a href="destinatario.php?id=1016" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1016&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>kelvin Rogerio Pereira Nicoletti - Vip Car</td>
                  <td>higienopolis -Porto Alegre</td>
                  <td>RS</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>05183076999</td>
                  <td>
                    <a href="cliente.php?id=703">Ver</a> <br />
                    <a href="edita-cliente.php?id=703">Editar</a> <br />
                    <a href="destinatario.php?id=703" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=703&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Keren Hapuque Coelho Costa</td>
                  <td>Governador Valadares</td>
                  <td>MG</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>55 33 9147-0775</td>
                  <td>
                    <a href="cliente.php?id=1303">Ver</a> <br />
                    <a href="edita-cliente.php?id=1303">Editar</a> <br />
                    <a href="destinatario.php?id=1303" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1303&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Keren Hapuque Coelho Costa</td>
                  <td>Valadares</td>
                  <td>MG</td>
                  <td>marciaroque@gmail.com</td>
                  <td>3391470775</td>
                  <td>
                    <a href="cliente.php?id=1304">Ver</a> <br />
                    <a href="edita-cliente.php?id=1304">Editar</a> <br />
                    <a href="destinatario.php?id=1304" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1304&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>KEVIN ROGERIO PEREIRA NICOLETTI</td>
                  <td>PORTO ALEGRE</td>
                  <td>RS</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=708">Ver</a> <br />
                    <a href="edita-cliente.php?id=708">Editar</a> <br />
                    <a href="destinatario.php?id=708" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=708&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>KEVIN TOMAZINI COSTA</td>
                  <td>ITAGUAI</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>2197 0640433</td>
                  <td>
                    <a href="cliente.php?id=765">Ver</a> <br />
                    <a href="edita-cliente.php?id=765">Editar</a> <br />
                    <a href="destinatario.php?id=765" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=765&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>KEYSS CYSLLAYNY DE MEDEIROS</td>
                  <td>CURRAIS NOVOS</td>
                  <td>RN</td>
                  <td>KEYSS@KEYSS.COM.BR</td>
                  <td>84 999060607- </td>
                  <td>cnpj - 26819131-0001-99 - IE</td>
                  <td>
                    <a href="cliente.php?id=575">Ver</a> <br />
                    <a href="edita-cliente.php?id=575">Editar</a> <br />
                    <a href="destinatario.php?id=575" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=575&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Kleber Chicarelli Dantas</td>
                  <td>Ribeirão Preto</td>
                  <td>SP</td>
                  <td>libaniospneus@gmail.com</td>
                  <td>16 98830-9773 </td>
                  <td>cpf 250.385.288.21</td>
                  <td>
                    <a href="cliente.php?id=1013">Ver</a> <br />
                    <a href="edita-cliente.php?id=1013">Editar</a> <br />
                    <a href="destinatario.php?id=1013" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1013&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LAERCIO A M GOMES</td>
                  <td>JUAZEIRO DO NORTE CE</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8597075919</td>
                  <td>
                    <a href="cliente.php?id=770">Ver</a> <br />
                    <a href="edita-cliente.php?id=770">Editar</a> <br />
                    <a href="destinatario.php?id=770" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=770&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Laercio Teixeira de Lima</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>teixeiradelimalaercio@gmail.com</td>
                  <td>44 99714-9311</td>
                  <td>
                    <a href="cliente.php?id=1137">Ver</a> <br />
                    <a href="edita-cliente.php?id=1137">Editar</a> <br />
                    <a href="destinatario.php?id=1137" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1137&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LAIS COVIZZI</td>
                  <td>MIRASSOL</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=384">Ver</a> <br />
                    <a href="edita-cliente.php?id=384">Editar</a> <br />
                    <a href="destinatario.php?id=384" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=384&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lais Fernandes Bellini</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lais.bellini@gmail.com</td>
                  <td></td>
                  <td>cpf. 140.171.318-16 11 99399-2260</td>
                  <td>
                    <a href="cliente.php?id=873">Ver</a> <br />
                    <a href="edita-cliente.php?id=873">Editar</a> <br />
                    <a href="destinatario.php?id=873" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=873&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LARISSA FERNANDA PINTO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>larissafpinto@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=419">Ver</a> <br />
                    <a href="edita-cliente.php?id=419">Editar</a> <br />
                    <a href="destinatario.php?id=419" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=419&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Larissa Grundler de Souza</td>
                  <td>Araranguá</td>
                  <td>SC</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=434">Ver</a> <br />
                    <a href="edita-cliente.php?id=434">Editar</a> <br />
                    <a href="destinatario.php?id=434" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=434&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Larissa Rayanne Pereira</td>
                  <td>Arapiraca Al</td>
                  <td>AL</td>
                  <td>larissarayannepereira@gmail.com</td>
                  <td>8299560995</td>
                  <td>
                    <a href="cliente.php?id=1140">Ver</a> <br />
                    <a href="edita-cliente.php?id=1140">Editar</a> <br />
                    <a href="destinatario.php?id=1140" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1140&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Larissa Santos</td>
                  <td>Natal</td>
                  <td>RN</td>
                  <td>larissa_raiane@hotmail.com</td>
                  <td>(84) 9-9835-9999</td>
                  <td>
                    <a href="cliente.php?id=1119">Ver</a> <br />
                    <a href="edita-cliente.php?id=1119">Editar</a> <br />
                    <a href="destinatario.php?id=1119" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1119&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LAURA BEATRIZ P. BARBOSA</td>
                  <td>CHÁCARA DO SOL - UBERABA</td>
                  <td>MG</td>
                  <td>CONTATO@CASADELUXE.COM.BR</td>
                  <td>34 3336-1799/99972-4335 </td>
                  <td>cpf -863171136-53</td>
                  <td>
                    <a href="cliente.php?id=541">Ver</a> <br />
                    <a href="edita-cliente.php?id=541">Editar</a> <br />
                    <a href="destinatario.php?id=541" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=541&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lázara Geralda marques</td>
                  <td>Betim</td>
                  <td>MG</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>31 7502-4752</td>
                  <td>
                    <a href="cliente.php?id=1121">Ver</a> <br />
                    <a href="edita-cliente.php?id=1121">Editar</a> <br />
                    <a href="destinatario.php?id=1121" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1121&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LAZARO LIMA - CARLA LAZARO</td>
                  <td>CURRAIS NOVOS RN</td>
                  <td>RN</td>
                  <td>holyessencias@live.com</td>
                  <td>84 99003606</td>
                  <td>
                    <a href="cliente.php?id=686">Ver</a> <br />
                    <a href="edita-cliente.php?id=686">Editar</a> <br />
                    <a href="destinatario.php?id=686" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=686&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LEANDRO ARCINO</td>
                  <td>SÃO BERNARDO</td>
                  <td>SP</td>
                  <td>leandro@live.com</td>
                  <td>11 97263-7061 /1141273529./ </td>
                  <td>cpf: 32798450845</td>
                  <td>
                    <a href="cliente.php?id=236">Ver</a> <br />
                    <a href="edita-cliente.php?id=236">Editar</a> <br />
                    <a href="destinatario.php?id=236" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=236&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leandro Xisto da Silva</td>
                  <td>Rio das Ostras</td>
                  <td>RJ</td>
                  <td>leandroxisto2017@gmail.com</td>
                  <td>22 99217-3210</td>
                  <td>
                    <a href="cliente.php?id=1312">Ver</a> <br />
                    <a href="edita-cliente.php?id=1312">Editar</a> <br />
                    <a href="destinatario.php?id=1312" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1312&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leandro Xisto da Silva</td>
                  <td>Rio das Ostras</td>
                  <td>RJ</td>
                  <td>leandroxisto2017@gmail.com</td>
                  <td>22 99217-3210</td>
                  <td>
                    <a href="cliente.php?id=1313">Ver</a> <br />
                    <a href="edita-cliente.php?id=1313">Editar</a> <br />
                    <a href="destinatario.php?id=1313" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1313&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ledir Gomes</td>
                  <td>Canoas</td>
                  <td>RS</td>
                  <td>ledygomes@gmail.com</td>
                  <td>5181298189</td>
                  <td>
                    <a href="cliente.php?id=1106">Ver</a> <br />
                    <a href="edita-cliente.php?id=1106">Editar</a> <br />
                    <a href="destinatario.php?id=1106" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1106&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leidiane Bernardino Correia</td>
                  <td>naoinformadda</td>
                  <td>SP</td>
                  <td>leidianeber91@gmail.com</td>
                  <td>85 99972-1306</td>
                  <td>
                    <a href="cliente.php?id=1180">Ver</a> <br />
                    <a href="edita-cliente.php?id=1180">Editar</a> <br />
                    <a href="destinatario.php?id=1180" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1180&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LEIDIANE SANTOS</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>dguisacosmeticos@gmail.com</td>
                  <td>21-99901-2060</td>
                  <td>
                    <a href="cliente.php?id=85">Ver</a> <br />
                    <a href="edita-cliente.php?id=85">Editar</a> <br />
                    <a href="destinatario.php?id=85" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=85&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leidy</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>leidy_sa@hotmail.com</td>
                  <td>13 981231654</td>
                  <td>
                    <a href="cliente.php?id=572">Ver</a> <br />
                    <a href="edita-cliente.php?id=572">Editar</a> <br />
                    <a href="destinatario.php?id=572" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=572&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leila Regina Sampaio Liborio</td>
                  <td>xxx</td>
                  <td>SP</td>
                  <td>Marciaroque1970@gmail.com</td>
                  <td>13992053737</td>
                  <td>
                    <a href="cliente.php?id=1268">Ver</a> <br />
                    <a href="edita-cliente.php?id=1268">Editar</a> <br />
                    <a href="destinatario.php?id=1268" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1268&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LEONARDO ALVES</td>
                  <td>JALES</td>
                  <td>SP</td>
                  <td>leonardo.crbm@hotmail.com</td>
                  <td>17 996081738</td>
                  <td>
                    <a href="cliente.php?id=50">Ver</a> <br />
                    <a href="edita-cliente.php?id=50">Editar</a> <br />
                    <a href="destinatario.php?id=50" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=50&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LEONARDO AUGUSTO</td>
                  <td>AREIOPOLIS</td>
                  <td>SP</td>
                  <td>leonardixk20@hotmail.com</td>
                  <td>11 3846-2121</td>
                  <td>
                    <a href="cliente.php?id=357">Ver</a> <br />
                    <a href="edita-cliente.php?id=357">Editar</a> <br />
                    <a href="destinatario.php?id=357" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=357&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Leonardo Borsato - Solo Profumo</td>
                  <td>Santa Bárbara d´Oeste</td>
                  <td>SP</td>
                  <td>hotmail.com@.com</td>
                  <td>19 99440-4041</td>
                  <td>
                    <a href="cliente.php?id=865">Ver</a> <br />
                    <a href="edita-cliente.php?id=865">Editar</a> <br />
                    <a href="destinatario.php?id=865" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=865&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LETICIA DAMIN</td>
                  <td>CURITIBA</td>
                  <td>PR</td>
                  <td>LOKICIARS@HOTMAIL.COM</td>
                  <td>(41) 9924-6680</td>
                  <td>
                    <a href="cliente.php?id=204">Ver</a> <br />
                    <a href="edita-cliente.php?id=204">Editar</a> <br />
                    <a href="destinatario.php?id=204" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=204&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Letícia Filgueira</td>
                  <td>naõfornecida</td>
                  <td>SP</td>
                  <td>ferunp@hotmail.com</td>
                  <td>84 99916-3361</td>
                  <td>
                    <a href="cliente.php?id=1194">Ver</a> <br />
                    <a href="edita-cliente.php?id=1194">Editar</a> <br />
                    <a href="destinatario.php?id=1194" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1194&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LIDIANE APARECIDA RODRIGUES ALMEIDA</td>
                  <td>ANGRA DOS REIS</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=622">Ver</a> <br />
                    <a href="edita-cliente.php?id=622">Editar</a> <br />
                    <a href="destinatario.php?id=622" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=622&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lierson de Paula Rodrigues</td>
                  <td>VOLTA REDONDA</td>
                  <td>RJ</td>
                  <td>lierson.rodrigues@live.com</td>
                  <td>(24) 98152-5787</td>
                  <td>
                    <a href="cliente.php?id=259">Ver</a> <br />
                    <a href="edita-cliente.php?id=259">Editar</a> <br />
                    <a href="destinatario.php?id=259" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=259&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LILANA GENONADIO PRACIDELLI</td>
                  <td>OSASCO</td>
                  <td>SP</td>
                  <td>lilanagenonadio@gmail.com</td>
                  <td>11 993547914</td>
                  <td>
                    <a href="cliente.php?id=67">Ver</a> <br />
                    <a href="edita-cliente.php?id=67">Editar</a> <br />
                    <a href="destinatario.php?id=67" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=67&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LILIAN DE ANDRADE</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>MINHARTESMINHARTES@UOL.COM.BR</td>
                  <td>11-99459-1909 </td>
                  <td>cpf: 01381495000109</td>
                  <td>
                    <a href="cliente.php?id=83">Ver</a> <br />
                    <a href="edita-cliente.php?id=83">Editar</a> <br />
                    <a href="destinatario.php?id=83" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=83&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LILIAN HUTTERER RICCA</td>
                  <td>SÃO BERNARDO DO CAMPO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=383">Ver</a> <br />
                    <a href="edita-cliente.php?id=383">Editar</a> <br />
                    <a href="destinatario.php?id=383" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=383&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LINO FIRMANO JUNIOR</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>linofirmano@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=460">Ver</a> <br />
                    <a href="edita-cliente.php?id=460">Editar</a> <br />
                    <a href="destinatario.php?id=460" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=460&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lino Firmano Júnior</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>linofirmano@gmail.com</td>
                  <td>11 94783-3890 </td>
                  <td>cpf: 04598138890</td>
                  <td>
                    <a href="cliente.php?id=1027">Ver</a> <br />
                    <a href="edita-cliente.php?id=1027">Editar</a> <br />
                    <a href="destinatario.php?id=1027" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1027&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Liria Ayako Yoneshige</td>
                  <td>Vila Pompeia</td>
                  <td>SP</td>
                  <td>liriayoneshige@gmail.com</td>
                  <td>(11) 3297-9514</td>
                  <td>
                    <a href="cliente.php?id=212">Ver</a> <br />
                    <a href="edita-cliente.php?id=212">Editar</a> <br />
                    <a href="destinatario.php?id=212" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=212&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LISIANE ALBERTI</td>
                  <td>LONDRINA</td>
                  <td>PR</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=414">Ver</a> <br />
                    <a href="edita-cliente.php?id=414">Editar</a> <br />
                    <a href="destinatario.php?id=414" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=414&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Liziane Coriolano Pinheiro</td>
                  <td>Fortaleza CE</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8596190818</td>
                  <td>
                    <a href="cliente.php?id=901">Ver</a> <br />
                    <a href="edita-cliente.php?id=901">Editar</a> <br />
                    <a href="destinatario.php?id=901" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=901&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lorena</td>
                  <td>nao informada</td>
                  <td>PR</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>42 9941-2546</td>
                  <td>
                    <a href="cliente.php?id=1336">Ver</a> <br />
                    <a href="edita-cliente.php?id=1336">Editar</a> <br />
                    <a href="destinatario.php?id=1336" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1336&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LORENA LIMA</td>
                  <td>IPU</td>
                  <td>CE</td>
                  <td>lorenaipu@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=477">Ver</a> <br />
                    <a href="edita-cliente.php?id=477">Editar</a> <br />
                    <a href="destinatario.php?id=477" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=477&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LORENA MARINE SILVA DO NASCIMENTO</td>
                  <td>Recife</td>
                  <td>PE</td>
                  <td>loly.marine@gmail.com</td>
                  <td>81 9 96736775</td>
                  <td>
                    <a href="cliente.php?id=1296">Ver</a> <br />
                    <a href="edita-cliente.php?id=1296">Editar</a> <br />
                    <a href="destinatario.php?id=1296" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1296&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lorrena Marine Silva do Nascimento</td>
                  <td>Recife</td>
                  <td>PE</td>
                  <td>loly.marine@gmail.com</td>
                  <td>81 9 96736775 </td>
                  <td>cpf 10260768464</td>
                  <td>
                    <a href="cliente.php?id=1292">Ver</a> <br />
                    <a href="edita-cliente.php?id=1292">Editar</a> <br />
                    <a href="destinatario.php?id=1292" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1292&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lorrena Marine Silva do Nascimento</td>
                  <td>Recife</td>
                  <td>PE</td>
                  <td>loly.marine@gmail.com</td>
                  <td>81 996736775 </td>
                  <td>cpf: 10260768464</td>
                  <td>
                    <a href="cliente.php?id=1293">Ver</a> <br />
                    <a href="edita-cliente.php?id=1293">Editar</a> <br />
                    <a href="destinatario.php?id=1293" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1293&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lorrena Marine Silva do Nascimento</td>
                  <td>Recife</td>
                  <td>PE</td>
                  <td>loly.marine@gmail.com</td>
                  <td>81 996736775 </td>
                  <td>cpf: 10260768464</td>
                  <td>
                    <a href="cliente.php?id=1294">Ver</a> <br />
                    <a href="edita-cliente.php?id=1294">Editar</a> <br />
                    <a href="destinatario.php?id=1294" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1294&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lorrena Marine Silva do Nascimento</td>
                  <td>Recife</td>
                  <td>PE</td>
                  <td>loly.marine@gmail.com</td>
                  <td>81 996736775 </td>
                  <td>cpf: 10260768464</td>
                  <td>
                    <a href="cliente.php?id=1295">Ver</a> <br />
                    <a href="edita-cliente.php?id=1295">Editar</a> <br />
                    <a href="destinatario.php?id=1295" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1295&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    LUANA FERREIRA BENTES DE OLIVEIRA - Aos Cuidados de SIDNEI
                    JOSE DE OLIVEIRA
                  </td>
                  <td>OBIDOS</td>
                  <td>PA</td>
                  <td>moneycorret@yahoo.com.br</td>
                  <td>(69) 9-8427-4817 </td>
                  <td>cpf 678.227.202-44</td>
                  <td>
                    <a href="cliente.php?id=286">Ver</a> <br />
                    <a href="edita-cliente.php?id=286">Editar</a> <br />
                    <a href="destinatario.php?id=286" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=286&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luana Garcia Corintino</td>
                  <td>Belém</td>
                  <td>PA</td>
                  <td>admluanagarcia@gmail.com</td>
                  <td>91 98855-8921</td>
                  <td>
                    <a href="cliente.php?id=1299">Ver</a> <br />
                    <a href="edita-cliente.php?id=1299">Editar</a> <br />
                    <a href="destinatario.php?id=1299" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1299&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luana Garcia Corintino</td>
                  <td>Belém</td>
                  <td>PA</td>
                  <td>admluanagarcia@gmail.com</td>
                  <td>91 98855-8921</td>
                  <td>
                    <a href="cliente.php?id=1300">Ver</a> <br />
                    <a href="edita-cliente.php?id=1300">Editar</a> <br />
                    <a href="destinatario.php?id=1300" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1300&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUANA REIS DOS SANTOS</td>
                  <td>ananindeua</td>
                  <td>PA</td>
                  <td>luanars@hotmail.com</td>
                  <td>91 998315050</td>
                  <td>
                    <a href="cliente.php?id=338">Ver</a> <br />
                    <a href="edita-cliente.php?id=338">Editar</a> <br />
                    <a href="destinatario.php?id=338" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=338&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUCAS CASTRO VOLOSKI</td>
                  <td>CAMAQUÃN</td>
                  <td>RS</td>
                  <td>LABORATORIO.VIANATURAL@HOTMAIL.COM</td>
                  <td>51 980554615</td>
                  <td>
                    <a href="cliente.php?id=479">Ver</a> <br />
                    <a href="edita-cliente.php?id=479">Editar</a> <br />
                    <a href="destinatario.php?id=479" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=479&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lucas Correia Caiafa Maffei</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>lucasmaffei@gmail.com</td>
                  <td>(13)97405-8579 (13)3040-2022</td>
                  <td>
                    <a href="cliente.php?id=13">Ver</a> <br />
                    <a href="edita-cliente.php?id=13">Editar</a> <br />
                    <a href="destinatario.php?id=13" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=13&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lucas Gomes Xavier</td>
                  <td>Luz</td>
                  <td>MG</td>
                  <td>xavierlucas502@gmail.com</td>
                  <td>37 9956-4469 </td>
                  <td>cpf: 138.762.476-83</td>
                  <td>
                    <a href="cliente.php?id=1054">Ver</a> <br />
                    <a href="edita-cliente.php?id=1054">Editar</a> <br />
                    <a href="destinatario.php?id=1054" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1054&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lucas Gonzalez</td>
                  <td>Atibaia</td>
                  <td>SP</td>
                  <td>marciaroque@gmail.com</td>
                  <td>13982202373</td>
                  <td>
                    <a href="cliente.php?id=1150">Ver</a> <br />
                    <a href="edita-cliente.php?id=1150">Editar</a> <br />
                    <a href="destinatario.php?id=1150" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1150&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lucas lima Ferreira</td>
                  <td>Mesquita</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 99660-5092</td>
                  <td>
                    <a href="cliente.php?id=863">Ver</a> <br />
                    <a href="edita-cliente.php?id=863">Editar</a> <br />
                    <a href="destinatario.php?id=863" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=863&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Lucas Natalino de Almeida Christianelli</td>
                  <td>Sumaré</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>19 99479-8423</td>
                  <td>
                    <a href="cliente.php?id=722">Ver</a> <br />
                    <a href="edita-cliente.php?id=722">Editar</a> <br />
                    <a href="destinatario.php?id=722" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=722&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciana Aparecida de Jesus Santos-Alecrim Aromas</td>
                  <td>Campo Grande</td>
                  <td>MS</td>
                  <td>luciana@alecrimaromas.com.br</td>
                  <td>6792021290</td>
                  <td>
                    <a href="cliente.php?id=1187">Ver</a> <br />
                    <a href="edita-cliente.php?id=1187">Editar</a> <br />
                    <a href="destinatario.php?id=1187" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1187&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciana Fernanda Rodrigues Martinho</td>
                  <td>Uberaba MG</td>
                  <td>MG</td>
                  <td>fernandes.luciane72@gmail.com</td>
                  <td>3492005151</td>
                  <td>
                    <a href="cliente.php?id=881">Ver</a> <br />
                    <a href="edita-cliente.php?id=881">Editar</a> <br />
                    <a href="destinatario.php?id=881" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=881&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUCIANA GUIZELI ALCAZAR</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>inglesonline28@gmail.com</td>
                  <td>19998370412</td>
                  <td>
                    <a href="cliente.php?id=1088">Ver</a> <br />
                    <a href="edita-cliente.php?id=1088">Editar</a> <br />
                    <a href="destinatario.php?id=1088" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1088&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciana Renata Lima Maranhão</td>
                  <td>Limoeiro do Norte</td>
                  <td>CE</td>
                  <td>lucianarenata1606@gmail.com</td>
                  <td>88 9342-4710</td>
                  <td>
                    <a href="cliente.php?id=1163">Ver</a> <br />
                    <a href="edita-cliente.php?id=1163">Editar</a> <br />
                    <a href="destinatario.php?id=1163" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1163&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciano da Silva Santos</td>
                  <td>Cabo Frio</td>
                  <td>RJ</td>
                  <td>lualmeida1706@gmail.com</td>
                  <td>21 98849-6670 </td>
                  <td>cnpj: 37206977000170</td>
                  <td>
                    <a href="cliente.php?id=968">Ver</a> <br />
                    <a href="edita-cliente.php?id=968">Editar</a> <br />
                    <a href="destinatario.php?id=968" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=968&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciano de Souza</td>
                  <td>Sorocaba</td>
                  <td>SP</td>
                  <td>ul.clan.ls@gmail.com</td>
                  <td>15 98809-8815 </td>
                  <td>cpf: 258.353.098-48</td>
                  <td>
                    <a href="cliente.php?id=1356">Ver</a> <br />
                    <a href="edita-cliente.php?id=1356">Editar</a> <br />
                    <a href="destinatario.php?id=1356" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1356&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUCIENE BARBOSA GOBO</td>
                  <td>VILA VELHA</td>
                  <td>ES</td>
                  <td>luciene-barbosa2014@outlook.com.br</td>
                  <td>27- 99715-4477</td>
                  <td>
                    <a href="cliente.php?id=324">Ver</a> <br />
                    <a href="edita-cliente.php?id=324">Editar</a> <br />
                    <a href="destinatario.php?id=324" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=324&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luciene Firmino</td>
                  <td>Cricíúma</td>
                  <td>SC</td>
                  <td>fluciene22102005@gmail</td>
                  <td>48 996222181 </td>
                  <td>cpf: 104.964.749-92</td>
                  <td>
                    <a href="cliente.php?id=1026">Ver</a> <br />
                    <a href="edita-cliente.php?id=1026">Editar</a> <br />
                    <a href="destinatario.php?id=1026" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1026&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis Antonio Ornelas Fernandes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>luizcorretor2012@gmail.com</td>
                  <td>(021)983234512</td>
                  <td>
                    <a href="cliente.php?id=969">Ver</a> <br />
                    <a href="edita-cliente.php?id=969">Editar</a> <br />
                    <a href="destinatario.php?id=969" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=969&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis Antonio Ornelas Fernandes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>luizcorretor2012@gmail.com</td>
                  <td>(021)983234512</td>
                  <td>
                    <a href="cliente.php?id=970">Ver</a> <br />
                    <a href="edita-cliente.php?id=970">Editar</a> <br />
                    <a href="destinatario.php?id=970" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=970&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis Antonio Ornelas Fernandes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>luizcorretor2012@gmail.com</td>
                  <td>021 983234512</td>
                  <td>
                    <a href="cliente.php?id=971">Ver</a> <br />
                    <a href="edita-cliente.php?id=971">Editar</a> <br />
                    <a href="destinatario.php?id=971" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=971&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luís Carlos Pelechate</td>
                  <td>PARANAGUÁ</td>
                  <td>PR</td>
                  <td>luispelechate@outlook.com</td>
                  <td>42 8844-9866</td>
                  <td>
                    <a href="cliente.php?id=63">Ver</a> <br />
                    <a href="edita-cliente.php?id=63">Editar</a> <br />
                    <a href="destinatario.php?id=63" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=63&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luis de Souza Oliveira</td>
                  <td>Santíssimo</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 96427-7378</td>
                  <td>
                    <a href="cliente.php?id=983">Ver</a> <br />
                    <a href="edita-cliente.php?id=983">Editar</a> <br />
                    <a href="destinatario.php?id=983" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=983&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUÍS FERNANDO BRAGA</td>
                  <td>GUARARAPES</td>
                  <td>SP</td>
                  <td>lu_braga22@hotmail.com</td>
                  <td>18 981276636</td>
                  <td>
                    <a href="cliente.php?id=269">Ver</a> <br />
                    <a href="edita-cliente.php?id=269">Editar</a> <br />
                    <a href="destinatario.php?id=269" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=269&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Silveira</td>
                  <td>BRASÍLIA</td>
                  <td>DF</td>
                  <td>luizsilveirafoto@yahoo.com.br</td>
                  <td>(61) 8413-5369</td>
                  <td>
                    <a href="cliente.php?id=188">Ver</a> <br />
                    <a href="edita-cliente.php?id=188">Editar</a> <br />
                    <a href="destinatario.php?id=188" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=188&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Antonio Ornelas Fernandes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>luizcorretor2012@gmail.com</td>
                  <td>(21) 98-3234512 </td>
                  <td>cpf 056.649.837-52</td>
                  <td>
                    <a href="cliente.php?id=973">Ver</a> <br />
                    <a href="edita-cliente.php?id=973">Editar</a> <br />
                    <a href="destinatario.php?id=973" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=973&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUIZ AUGUSTO RODRIGUES DE QUEIROZ</td>
                  <td>MANAUS</td>
                  <td>AM</td>
                  <td>holyessencias@live.com</td>
                  <td>92 8475-3887</td>
                  <td>
                    <a href="cliente.php?id=797">Ver</a> <br />
                    <a href="edita-cliente.php?id=797">Editar</a> <br />
                    <a href="destinatario.php?id=797" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=797&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Carlos Dallapasqua</td>
                  <td>CASCAVEL</td>
                  <td>SP</td>
                  <td>tecno-shop1@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=302">Ver</a> <br />
                    <a href="edita-cliente.php?id=302">Editar</a> <br />
                    <a href="destinatario.php?id=302" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=302&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Fernando Roman Goncalves</td>
                  <td>Bela Vista de Goiás</td>
                  <td>GO</td>
                  <td>luizfernandoroman@terra.com.br</td>
                  <td>61 9985-0950</td>
                  <td>
                    <a href="cliente.php?id=890">Ver</a> <br />
                    <a href="edita-cliente.php?id=890">Editar</a> <br />
                    <a href="destinatario.php?id=890" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=890&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUIZ HENRIQUE</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>luizhenriquecaze@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=220">Ver</a> <br />
                    <a href="edita-cliente.php?id=220">Editar</a> <br />
                    <a href="destinatario.php?id=220" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=220&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Henrique Mansano</td>
                  <td>PENAPOLIS</td>
                  <td>SP</td>
                  <td>luizmmansano31@hotmail.com</td>
                  <td>(18) 981650908</td>
                  <td>
                    <a href="cliente.php?id=602">Ver</a> <br />
                    <a href="edita-cliente.php?id=602">Editar</a> <br />
                    <a href="destinatario.php?id=602" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=602&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUIZ HENRIQUE PETTY DE SÁ SILVA</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>luiz.h.petty@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=169">Ver</a> <br />
                    <a href="edita-cliente.php?id=169">Editar</a> <br />
                    <a href="destinatario.php?id=169" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=169&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUIZ PAULO OLIVEIRA RODRIGUES</td>
                  <td>PRAIA GRANDE</td>
                  <td>SP</td>
                  <td>lporodrigues@gmail.com</td>
                  <td>11 99733-1267</td>
                  <td>
                    <a href="cliente.php?id=476">Ver</a> <br />
                    <a href="edita-cliente.php?id=476">Editar</a> <br />
                    <a href="destinatario.php?id=476" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=476&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Luiz Peri</td>
                  <td>São Vicente</td>
                  <td>SP</td>
                  <td>comercial@jpambiental.com.br</td>
                  <td>13 3034-5158</td>
                  <td>
                    <a href="cliente.php?id=680">Ver</a> <br />
                    <a href="edita-cliente.php?id=680">Editar</a> <br />
                    <a href="destinatario.php?id=680" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=680&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUIZA LAUDEMIRA</td>
                  <td>ALVARES MACHADO</td>
                  <td>SP</td>
                  <td>luizalaudemira@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=363">Ver</a> <br />
                    <a href="edita-cliente.php?id=363">Editar</a> <br />
                    <a href="destinatario.php?id=363" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=363&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>LUZ INDÚSTRIA - A/C CARINA CASTRO</td>
                  <td>SERRA</td>
                  <td>ES</td>
                  <td>carinacastro@berlian.com.br</td>
                  <td>27 981191881</td>
                  <td>
                    <a href="cliente.php?id=492">Ver</a> <br />
                    <a href="edita-cliente.php?id=492">Editar</a> <br />
                    <a href="destinatario.php?id=492" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=492&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maciel Machado</td>
                  <td>Campo Alegre</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(82) 9954 6644</td>
                  <td>
                    <a href="cliente.php?id=31">Ver</a> <br />
                    <a href="edita-cliente.php?id=31">Editar</a> <br />
                    <a href="destinatario.php?id=31" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=31&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MAGISTRAL HOMEOCOSMIATRIA - A/C JANA TORRES</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>85 3264-3264</td>
                  <td>
                    <a href="cliente.php?id=499">Ver</a> <br />
                    <a href="edita-cliente.php?id=499">Editar</a> <br />
                    <a href="destinatario.php?id=499" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=499&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MAGNA PEREIRA SIQUEIRA</td>
                  <td>PALMAS</td>
                  <td>CE</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=191">Ver</a> <br />
                    <a href="edita-cliente.php?id=191">Editar</a> <br />
                    <a href="destinatario.php?id=191" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=191&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maiana Lima da Costa</td>
                  <td>São Luis</td>
                  <td>MA</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>98 8350-3174 </td>
                  <td>cpf 90556500300</td>
                  <td>
                    <a href="cliente.php?id=1009">Ver</a> <br />
                    <a href="edita-cliente.php?id=1009">Editar</a> <br />
                    <a href="destinatario.php?id=1009" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1009&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARA KNAUL</td>
                  <td>ITUPORANGA</td>
                  <td>SC</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=432">Ver</a> <br />
                    <a href="edita-cliente.php?id=432">Editar</a> <br />
                    <a href="destinatario.php?id=432" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=432&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mara Leurany Oliveira Rocha de Souza</td>
                  <td>Barro vermelho</td>
                  <td>RN</td>
                  <td>maraleurany@hotmail.com</td>
                  <td>8499379461 </td>
                  <td>cpf:70415650410</td>
                  <td>
                    <a href="cliente.php?id=1251">Ver</a> <br />
                    <a href="edita-cliente.php?id=1251">Editar</a> <br />
                    <a href="destinatario.php?id=1251" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1251&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCELA REIS</td>
                  <td>BARROSO</td>
                  <td>MG</td>
                  <td>marlopes.lopes25@gmail.com</td>
                  <td>32 991554909 - </td>
                  <td>cpf-057335186-42</td>
                  <td>
                    <a href="cliente.php?id=595">Ver</a> <br />
                    <a href="edita-cliente.php?id=595">Editar</a> <br />
                    <a href="destinatario.php?id=595" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=595&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelle Aparecida chaves de Araújo</td>
                  <td>Mongaguá</td>
                  <td>SP</td>
                  <td>marcelle.aparecida39@gmail.com</td>
                  <td></td>
                  <td>cpf 329.432.568-11 / 35947938 / 13 988750559</td>
                  <td>
                    <a href="cliente.php?id=855">Ver</a> <br />
                    <a href="edita-cliente.php?id=855">Editar</a> <br />
                    <a href="destinatario.php?id=855" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=855&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo Assis</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>aaaaa@aaaa.com</td>
                  <td>13 991272922</td>
                  <td>
                    <a href="cliente.php?id=958">Ver</a> <br />
                    <a href="edita-cliente.php?id=958">Editar</a> <br />
                    <a href="destinatario.php?id=958" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=958&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo da Silva Pinto</td>
                  <td>Niterói</td>
                  <td>RJ</td>
                  <td>mtlft@yahoo.com.br</td>
                  <td>21 98461-1260 </td>
                  <td>cpf.:029.862.027-80</td>
                  <td>
                    <a href="cliente.php?id=1077">Ver</a> <br />
                    <a href="edita-cliente.php?id=1077">Editar</a> <br />
                    <a href="destinatario.php?id=1077" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1077&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo de Moura</td>
                  <td>Santo André</td>
                  <td>SP</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(11) 44529435</td>
                  <td>
                    <a href="cliente.php?id=38">Ver</a> <br />
                    <a href="edita-cliente.php?id=38">Editar</a> <br />
                    <a href="destinatario.php?id=38" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=38&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCELO GONÇALVES CAMERO</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=388">Ver</a> <br />
                    <a href="edita-cliente.php?id=388">Editar</a> <br />
                    <a href="destinatario.php?id=388" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=388&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCELO MARIANO</td>
                  <td>GOIANIA</td>
                  <td>GO</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=548">Ver</a> <br />
                    <a href="edita-cliente.php?id=548">Editar</a> <br />
                    <a href="destinatario.php?id=548" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=548&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo Moura da Silva</td>
                  <td>Nilópolis</td>
                  <td>RJ</td>
                  <td>bpprmarcelomoura@hotmail.com</td>
                  <td>21 98291-7430 21 96568-7342 </td>
                  <td>cnpj: 48308302/0001-5</td>
                  <td>
                    <a href="cliente.php?id=961">Ver</a> <br />
                    <a href="edita-cliente.php?id=961">Editar</a> <br />
                    <a href="destinatario.php?id=961" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=961&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCELO NUNES ALVES</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=464">Ver</a> <br />
                    <a href="edita-cliente.php?id=464">Editar</a> <br />
                    <a href="destinatario.php?id=464" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=464&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo Peres da Silva</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>peres.mpds@hotmail.com</td>
                  <td>(11) 979754668 - </td>
                  <td>cnpj 14.707.189/0001-61</td>
                  <td>
                    <a href="cliente.php?id=21">Ver</a> <br />
                    <a href="edita-cliente.php?id=21">Editar</a> <br />
                    <a href="destinatario.php?id=21" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=21&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>marcelo Santos Carrozza</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marceloscrj@hotmail.com</td>
                  <td>21992335200</td>
                  <td>
                    <a href="cliente.php?id=1181">Ver</a> <br />
                    <a href="edita-cliente.php?id=1181">Editar</a> <br />
                    <a href="destinatario.php?id=1181" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1181&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcelo Vale</td>
                  <td>Belo Horizonte</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(31) 86195681</td>
                  <td>
                    <a href="cliente.php?id=27">Ver</a> <br />
                    <a href="edita-cliente.php?id=27">Editar</a> <br />
                    <a href="destinatario.php?id=27" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=27&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Márcia</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 988379525</td>
                  <td>
                    <a href="cliente.php?id=614">Ver</a> <br />
                    <a href="edita-cliente.php?id=614">Editar</a> <br />
                    <a href="destinatario.php?id=614" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=614&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA BALDI</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11996082534</td>
                  <td>
                    <a href="cliente.php?id=764">Ver</a> <br />
                    <a href="edita-cliente.php?id=764">Editar</a> <br />
                    <a href="destinatario.php?id=764" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=764&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcia Batista</td>
                  <td>Cachoeirinha</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=35">Ver</a> <br />
                    <a href="edita-cliente.php?id=35">Editar</a> <br />
                    <a href="destinatario.php?id=35" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=35&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Márcia Cláudia Oliveira da Silva</td>
                  <td>naoinformada</td>
                  <td>RJ</td>
                  <td>marciaclaudiasilva@gmail.com</td>
                  <td>22 992318-7081</td>
                  <td>
                    <a href="cliente.php?id=1192">Ver</a> <br />
                    <a href="edita-cliente.php?id=1192">Editar</a> <br />
                    <a href="destinatario.php?id=1192" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1192&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcia Correa</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>Marciaroque@gmail.com</td>
                  <td>13996426068</td>
                  <td>
                    <a href="cliente.php?id=905">Ver</a> <br />
                    <a href="edita-cliente.php?id=905">Editar</a> <br />
                    <a href="destinatario.php?id=905" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=905&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA COSTA DE AVILA</td>
                  <td>PORTO ALEGRE</td>
                  <td>RS</td>
                  <td>contato@marciaavila.com.br</td>
                  <td>51 9286-4150 </td>
                  <td>cpf: 415092340-04</td>
                  <td>
                    <a href="cliente.php?id=841">Ver</a> <br />
                    <a href="edita-cliente.php?id=841">Editar</a> <br />
                    <a href="destinatario.php?id=841" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=841&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Márcia Cristina Brandimarti</td>
                  <td>Mirassol</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>17 99645-0057</td>
                  <td>
                    <a href="cliente.php?id=826">Ver</a> <br />
                    <a href="edita-cliente.php?id=826">Editar</a> <br />
                    <a href="destinatario.php?id=826" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=826&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA LIMA</td>
                  <td>TREMEMBE</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>12991192440</td>
                  <td>
                    <a href="cliente.php?id=884">Ver</a> <br />
                    <a href="edita-cliente.php?id=884">Editar</a> <br />
                    <a href="destinatario.php?id=884" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=884&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA LIMA</td>
                  <td>TREMEMBE</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>12991192440</td>
                  <td>
                    <a href="cliente.php?id=885">Ver</a> <br />
                    <a href="edita-cliente.php?id=885">Editar</a> <br />
                    <a href="destinatario.php?id=885" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=885&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MÁRCIA M. LEITE</td>
                  <td>JOSÉ BONIFACIO</td>
                  <td>SP</td>
                  <td>espacoestetivo@live.com</td>
                  <td>17- 98117-2828</td>
                  <td>
                    <a href="cliente.php?id=321">Ver</a> <br />
                    <a href="edita-cliente.php?id=321">Editar</a> <br />
                    <a href="destinatario.php?id=321" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=321&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA MARIA DA SILVA FERNANDES</td>
                  <td>NATAL</td>
                  <td>RN</td>
                  <td>marciam_sf@yahoo.com.br</td>
                  <td>(85) 9987-6765</td>
                  <td>
                    <a href="cliente.php?id=57">Ver</a> <br />
                    <a href="edita-cliente.php?id=57">Editar</a> <br />
                    <a href="destinatario.php?id=57" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=57&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIA ROQUE DE OLIVEIRA LIMA</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=715">Ver</a> <br />
                    <a href="edita-cliente.php?id=715">Editar</a> <br />
                    <a href="destinatario.php?id=715" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=715&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marciano Maciel da Costa</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>mariciaroque1970@gmail.com</td>
                  <td>8599804713 </td>
                  <td>cpf: 48424005368</td>
                  <td>
                    <a href="cliente.php?id=897">Ver</a> <br />
                    <a href="edita-cliente.php?id=897">Editar</a> <br />
                    <a href="destinatario.php?id=897" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=897&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Márcio Bratfich</td>
                  <td>Dracena</td>
                  <td>SP</td>
                  <td>mrbratfisch@hotmail.com</td>
                  <td>18 99676-5388</td>
                  <td>
                    <a href="cliente.php?id=1169">Ver</a> <br />
                    <a href="edita-cliente.php?id=1169">Editar</a> <br />
                    <a href="destinatario.php?id=1169" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1169&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MÁRCIO DE AGUIAR CALDAS</td>
                  <td>MACAÉ</td>
                  <td>RJ</td>
                  <td>marcioimoveis.br@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=687">Ver</a> <br />
                    <a href="edita-cliente.php?id=687">Editar</a> <br />
                    <a href="destinatario.php?id=687" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=687&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIO FERREIRA LIMA</td>
                  <td>Ananindeua</td>
                  <td>PA</td>
                  <td>MARCIO911@GMAIL.COM</td>
                  <td>(91) 98324-9195 / </td>
                  <td>cnpj-16.478.610/0001-35</td>
                  <td>
                    <a href="cliente.php?id=242">Ver</a> <br />
                    <a href="edita-cliente.php?id=242">Editar</a> <br />
                    <a href="destinatario.php?id=242" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=242&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcio Jose de Sousa</td>
                  <td>Carapicuiba</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11974919632</td>
                  <td>
                    <a href="cliente.php?id=568">Ver</a> <br />
                    <a href="edita-cliente.php?id=568">Editar</a> <br />
                    <a href="destinatario.php?id=568" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=568&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIO LUCIO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>marciolucio135@gmail.com</td>
                  <td>85 8660-1587</td>
                  <td>
                    <a href="cliente.php?id=801">Ver</a> <br />
                    <a href="edita-cliente.php?id=801">Editar</a> <br />
                    <a href="destinatario.php?id=801" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=801&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcio Oliveira Santana</td>
                  <td>São Paulo SP</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11969199420</td>
                  <td>
                    <a href="cliente.php?id=1015">Ver</a> <br />
                    <a href="edita-cliente.php?id=1015">Editar</a> <br />
                    <a href="destinatario.php?id=1015" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1015&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Márcio Queiroz - PALOMA DA SILVA FALCÃO</td>
                  <td>Manaus</td>
                  <td>AM</td>
                  <td>marciosacramento98@gmail.com</td>
                  <td>(92) 99998-2881 </td>
                  <td>cpf 971.619.422-68</td>
                  <td>
                    <a href="cliente.php?id=959">Ver</a> <br />
                    <a href="edita-cliente.php?id=959">Editar</a> <br />
                    <a href="destinatario.php?id=959" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=959&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCIO ROBERTO VIEIRA DOS SANTOS</td>
                  <td>ITAPETININGA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=497">Ver</a> <br />
                    <a href="edita-cliente.php?id=497">Editar</a> <br />
                    <a href="destinatario.php?id=497" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=497&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcius Vinicius LEÃO</td>
                  <td>Araruama</td>
                  <td>RJ</td>
                  <td>vemaromatizante@gmail.com</td>
                  <td>(22) 20222270 - 981243851</td>
                  <td>
                    <a href="cliente.php?id=41">Ver</a> <br />
                    <a href="edita-cliente.php?id=41">Editar</a> <br />
                    <a href="destinatario.php?id=41" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=41&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>marco Antoni de Oliveira Pardal</td>
                  <td>Florianópolis</td>
                  <td>SC</td>
                  <td>marco.worldtech@gmail.com</td>
                  <td>4896206250</td>
                  <td>
                    <a href="cliente.php?id=1170">Ver</a> <br />
                    <a href="edita-cliente.php?id=1170">Editar</a> <br />
                    <a href="destinatario.php?id=1170" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1170&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marco Cardoso</td>
                  <td>Santos</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(13) 78057832</td>
                  <td>
                    <a href="cliente.php?id=26">Ver</a> <br />
                    <a href="edita-cliente.php?id=26">Editar</a> <br />
                    <a href="destinatario.php?id=26" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=26&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marco da Rocha</td>
                  <td>Catanduva</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>xxxxxxxxxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=40">Ver</a> <br />
                    <a href="edita-cliente.php?id=40">Editar</a> <br />
                    <a href="destinatario.php?id=40" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=40&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcos Dias</td>
                  <td>santos</td>
                  <td>SP</td>
                  <td>lilianbernaders@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=535">Ver</a> <br />
                    <a href="edita-cliente.php?id=535">Editar</a> <br />
                    <a href="destinatario.php?id=535" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=535&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCOS PAULO DOS SANTOS FIGUEIREDO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>marcospaulosfig@gmail.com</td>
                  <td>(21) 3186-6606</td>
                  <td>
                    <a href="cliente.php?id=224">Ver</a> <br />
                    <a href="edita-cliente.php?id=224">Editar</a> <br />
                    <a href="destinatario.php?id=224" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=224&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcos Rodrigues da Silva</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marcosrsdd@gmail.com</td>
                  <td>21979790889</td>
                  <td>
                    <a href="cliente.php?id=1171">Ver</a> <br />
                    <a href="edita-cliente.php?id=1171">Editar</a> <br />
                    <a href="destinatario.php?id=1171" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1171&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcos Sanches</td>
                  <td>OSASCO</td>
                  <td>SP</td>
                  <td>sanchesvendas@outlook.com.br</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=391">Ver</a> <br />
                    <a href="edita-cliente.php?id=391">Editar</a> <br />
                    <a href="destinatario.php?id=391" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=391&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marcos Vinícius / Químicas e Essências</td>
                  <td>APODI</td>
                  <td>RN</td>
                  <td>quimica.essencias@gmail.com</td>
                  <td>(84) 9101-1453</td>
                  <td>
                    <a href="cliente.php?id=158">Ver</a> <br />
                    <a href="edita-cliente.php?id=158">Editar</a> <br />
                    <a href="destinatario.php?id=158" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=158&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCUS FLORENTINO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>21 983089567</td>
                  <td>
                    <a href="cliente.php?id=376">Ver</a> <br />
                    <a href="edita-cliente.php?id=376">Editar</a> <br />
                    <a href="destinatario.php?id=376" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=376&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARCUS VINICIUS TAVARES</td>
                  <td>Orlândia</td>
                  <td>SP</td>
                  <td>marcus-vinicius-tavares@hotmail.com</td>
                  <td>(16) 99167-2642</td>
                  <td>
                    <a href="cliente.php?id=596">Ver</a> <br />
                    <a href="edita-cliente.php?id=596">Editar</a> <br />
                    <a href="destinatario.php?id=596" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=596&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mari cabelereira</td>
                  <td>SV</td>
                  <td>SP</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>xxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=533">Ver</a> <br />
                    <a href="edita-cliente.php?id=533">Editar</a> <br />
                    <a href="destinatario.php?id=533" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=533&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA ANDREA MOURA</td>
                  <td>CAPELA</td>
                  <td>SE</td>
                  <td>mouraandrea28@outlook.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=474">Ver</a> <br />
                    <a href="edita-cliente.php?id=474">Editar</a> <br />
                    <a href="destinatario.php?id=474" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=474&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Aparecida Freire</td>
                  <td>Marilia</td>
                  <td>SP</td>
                  <td>sememail@sememail.com</td>
                  <td>14 99722-6651 / 14 3221-9374</td>
                  <td>
                    <a href="cliente.php?id=178">Ver</a> <br />
                    <a href="edita-cliente.php?id=178">Editar</a> <br />
                    <a href="destinatario.php?id=178" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=178&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Aparecida Pereira Carriel</td>
                  <td>Itapetininga</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>xxxxxxxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=30">Ver</a> <br />
                    <a href="edita-cliente.php?id=30">Editar</a> <br />
                    <a href="destinatario.php?id=30" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=30&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA C. SENA SILVA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>mariaasenna@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=834">Ver</a> <br />
                    <a href="edita-cliente.php?id=834">Editar</a> <br />
                    <a href="destinatario.php?id=834" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=834&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Carla da Silva Campelo</td>
                  <td>Currais Novos</td>
                  <td>RN</td>
                  <td>holyessencias@live.com</td>
                  <td>84 9900-3606 / </td>
                  <td>cpf 083.290.004-43</td>
                  <td>
                    <a href="cliente.php?id=860">Ver</a> <br />
                    <a href="edita-cliente.php?id=860">Editar</a> <br />
                    <a href="destinatario.php?id=860" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=860&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DA CONCEIÇÃO CHAGAS</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>81 99497330</td>
                  <td>
                    <a href="cliente.php?id=230">Ver</a> <br />
                    <a href="edita-cliente.php?id=230">Editar</a> <br />
                    <a href="destinatario.php?id=230" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=230&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DA CONCEIÇÃO PINTO MATIAS</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>oslecperfumes@hotmail.com</td>
                  <td>(85)34982843/986137647/988630106</td>
                  <td>
                    <a href="cliente.php?id=162">Ver</a> <br />
                    <a href="edita-cliente.php?id=162">Editar</a> <br />
                    <a href="destinatario.php?id=162" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=162&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria da Paixão Rios</td>
                  <td>capim grosso Bahia</td>
                  <td>BA</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>7491108828</td>
                  <td>
                    <a href="cliente.php?id=820">Ver</a> <br />
                    <a href="edita-cliente.php?id=820">Editar</a> <br />
                    <a href="destinatario.php?id=820" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=820&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Dalviane Queiroz</td>
                  <td>naoinformada</td>
                  <td>SP</td>
                  <td>maria.queiroz.silva@seducam.pro.br</td>
                  <td>92 99102-5336</td>
                  <td>
                    <a href="cliente.php?id=1193">Ver</a> <br />
                    <a href="edita-cliente.php?id=1193">Editar</a> <br />
                    <a href="destinatario.php?id=1193" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1193&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DAS GRAÇAS</td>
                  <td>ITANHAÉM</td>
                  <td>CE</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>13 34222135</td>
                  <td>
                    <a href="cliente.php?id=187">Ver</a> <br />
                    <a href="edita-cliente.php?id=187">Editar</a> <br />
                    <a href="destinatario.php?id=187" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=187&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DE FATIMA TOAZZA</td>
                  <td>CANASVIEIRAS</td>
                  <td>SC</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>4898539060</td>
                  <td>
                    <a href="cliente.php?id=795">Ver</a> <br />
                    <a href="edita-cliente.php?id=795">Editar</a> <br />
                    <a href="destinatario.php?id=795" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=795&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria de Jesus Pinheiro / Encontro Cosméticos</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>85 8869-3172</td>
                  <td>
                    <a href="cliente.php?id=848">Ver</a> <br />
                    <a href="edita-cliente.php?id=848">Editar</a> <br />
                    <a href="destinatario.php?id=848" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=848&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DO CARMO CAVALCANTE</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=150">Ver</a> <br />
                    <a href="edita-cliente.php?id=150">Editar</a> <br />
                    <a href="destinatario.php?id=150" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=150&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA DO SOCORRO ALVES DA SILVA</td>
                  <td>MAUA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>11 4309-2316</td>
                  <td>
                    <a href="cliente.php?id=227">Ver</a> <br />
                    <a href="edita-cliente.php?id=227">Editar</a> <br />
                    <a href="destinatario.php?id=227" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=227&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA EDUARDA NUNES</td>
                  <td>CAMPINAS</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>19 99738-3005</td>
                  <td>
                    <a href="cliente.php?id=902">Ver</a> <br />
                    <a href="edita-cliente.php?id=902">Editar</a> <br />
                    <a href="destinatario.php?id=902" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=902&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Eveline de Andrade</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>emariacarolino@hotmail.com</td>
                  <td>(85) 98751 4743</td>
                  <td>
                    <a href="cliente.php?id=28">Ver</a> <br />
                    <a href="edita-cliente.php?id=28">Editar</a> <br />
                    <a href="destinatario.php?id=28" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=28&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Gorete Barbosa dos Santos</td>
                  <td>Ribeirão das Neves</td>
                  <td>MG</td>
                  <td>samuel_b.santos@hotmail.com</td>
                  <td>31 98470-3514</td>
                  <td>
                    <a href="cliente.php?id=74">Ver</a> <br />
                    <a href="edita-cliente.php?id=74">Editar</a> <br />
                    <a href="destinatario.php?id=74" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=74&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Marta Cardinalli Mateus</td>
                  <td>nao fornecida</td>
                  <td>MG</td>
                  <td>cardinallimartinha@gmail.com</td>
                  <td>35 9991-0259 </td>
                  <td>cpf 00916771652</td>
                  <td>
                    <a href="cliente.php?id=1090">Ver</a> <br />
                    <a href="edita-cliente.php?id=1090">Editar</a> <br />
                    <a href="destinatario.php?id=1090" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1090&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Rozena Faustina de Rezende</td>
                  <td>Ceilândia norte</td>
                  <td>DF</td>
                  <td>mariarozenarezende@gmail.com</td>
                  <td>61 9345-7229</td>
                  <td>
                    <a href="cliente.php?id=812">Ver</a> <br />
                    <a href="edita-cliente.php?id=812">Editar</a> <br />
                    <a href="destinatario.php?id=812" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=812&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Maria Thais Barroso Cavalcante</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>8587628156</td>
                  <td>
                    <a href="cliente.php?id=766">Ver</a> <br />
                    <a href="edita-cliente.php?id=766">Editar</a> <br />
                    <a href="destinatario.php?id=766" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=766&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIA VICENTINA SANTOS</td>
                  <td>São José dos Campos</td>
                  <td>SP</td>
                  <td>martina.artes@bol.com.br</td>
                  <td>(12) 3302-4030</td>
                  <td>
                    <a href="cliente.php?id=181">Ver</a> <br />
                    <a href="edita-cliente.php?id=181">Editar</a> <br />
                    <a href="destinatario.php?id=181" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=181&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIANA BOSSO</td>
                  <td>ITAPIRA</td>
                  <td>SP</td>
                  <td>marianna.bosso@hotmail.com</td>
                  <td>(19) 99500-1975</td>
                  <td>
                    <a href="cliente.php?id=281">Ver</a> <br />
                    <a href="edita-cliente.php?id=281">Editar</a> <br />
                    <a href="destinatario.php?id=281" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=281&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mariana Mendes</td>
                  <td>Cidade Porto feliz</td>
                  <td>SP</td>
                  <td>marneiff@gmail.com</td>
                  <td>(15) 99760-5076</td>
                  <td>
                    <a href="cliente.php?id=197">Ver</a> <br />
                    <a href="edita-cliente.php?id=197">Editar</a> <br />
                    <a href="destinatario.php?id=197" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=197&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARIANGELA ROCHA DA SILVA</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>15 981603404</td>
                  <td>
                    <a href="cliente.php?id=453">Ver</a> <br />
                    <a href="edita-cliente.php?id=453">Editar</a> <br />
                    <a href="destinatario.php?id=453" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=453&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mariangela Rocha da Silva</td>
                  <td>Vila Barão Sorocaba</td>
                  <td>SP</td>
                  <td>m-roque@ig.com.br</td>
                  <td>015981603404</td>
                  <td>
                    <a href="cliente.php?id=620">Ver</a> <br />
                    <a href="edita-cliente.php?id=620">Editar</a> <br />
                    <a href="destinatario.php?id=620" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=620&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marieli Maciel</td>
                  <td>NONOAI</td>
                  <td>RS</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=656">Ver</a> <br />
                    <a href="edita-cliente.php?id=656">Editar</a> <br />
                    <a href="destinatario.php?id=656" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=656&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mariles Aparecida Marques</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11945</td>
                  <td>
                    <a href="cliente.php?id=859">Ver</a> <br />
                    <a href="edita-cliente.php?id=859">Editar</a> <br />
                    <a href="destinatario.php?id=859" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=859&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARILIA BARBOSA RAPHAEL</td>
                  <td>BARUERI SP</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>11.99413.1400</td>
                  <td>
                    <a href="cliente.php?id=814">Ver</a> <br />
                    <a href="edita-cliente.php?id=814">Editar</a> <br />
                    <a href="destinatario.php?id=814" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=814&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marina Vaz de Assis</td>
                  <td>CHAPECÓ</td>
                  <td>SC</td>
                  <td>horusaromas@gmail.com</td>
                  <td>49-9-99500063 </td>
                  <td>cpf 846.239.429-53</td>
                  <td>
                    <a href="cliente.php?id=633">Ver</a> <br />
                    <a href="edita-cliente.php?id=633">Editar</a> <br />
                    <a href="destinatario.php?id=633" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=633&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marinez Alves Coutinho</td>
                  <td>Volta Redonda</td>
                  <td>RJ</td>
                  <td>malvesc026@gmail.com</td>
                  <td>24 993155564</td>
                  <td>
                    <a href="cliente.php?id=39">Ver</a> <br />
                    <a href="edita-cliente.php?id=39">Editar</a> <br />
                    <a href="destinatario.php?id=39" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=39&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mario Cesar Felix</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>mraziel_br@yahoo.com</td>
                  <td>85 986813458 996215143 30381317 </td>
                  <td>cpf: 46364242391</td>
                  <td>
                    <a href="cliente.php?id=29">Ver</a> <br />
                    <a href="edita-cliente.php?id=29">Editar</a> <br />
                    <a href="destinatario.php?id=29" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=29&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mario Cesar Felix Nogueira</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>cesar.mario7@gmail.com</td>
                  <td>8596215143</td>
                  <td>
                    <a href="cliente.php?id=1045">Ver</a> <br />
                    <a href="edita-cliente.php?id=1045">Editar</a> <br />
                    <a href="destinatario.php?id=1045" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1045&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mario Cesar Felix Nogueira</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>cesar.mario7@gmail.com</td>
                  <td>85 9621-5143</td>
                  <td>
                    <a href="cliente.php?id=1047">Ver</a> <br />
                    <a href="edita-cliente.php?id=1047">Editar</a> <br />
                    <a href="destinatario.php?id=1047" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1047&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARISA KOLLING ECKHARDT</td>
                  <td>Cidade Lajeado</td>
                  <td>RS</td>
                  <td>marisake@gmail.com</td>
                  <td>(51) 9770-3894</td>
                  <td>
                    <a href="cliente.php?id=185">Ver</a> <br />
                    <a href="edita-cliente.php?id=185">Editar</a> <br />
                    <a href="destinatario.php?id=185" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=185&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marizi Nakashima /Dirceia</td>
                  <td>Pariquera Açu</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>(041)92537869</td>
                  <td>
                    <a href="cliente.php?id=716">Ver</a> <br />
                    <a href="edita-cliente.php?id=716">Editar</a> <br />
                    <a href="destinatario.php?id=716" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=716&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marleide dos Santos Calixto</td>
                  <td>Barreiras</td>
                  <td>BA</td>
                  <td>holyessencias@live.com</td>
                  <td>77 9954-9586</td>
                  <td>
                    <a href="cliente.php?id=730">Ver</a> <br />
                    <a href="edita-cliente.php?id=730">Editar</a> <br />
                    <a href="destinatario.php?id=730" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=730&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marli Quirino da Silva Santos - </td>
                  <td>cpf 260334998-83</td>
                  <td>Cubatão</td>
                  <td>SP</td>
                  <td>marli_quirino@hotmail.com</td>
                  <td>13 97404-6442</td>
                  <td>
                    <a href="cliente.php?id=944">Ver</a> <br />
                    <a href="edita-cliente.php?id=944">Editar</a> <br />
                    <a href="destinatario.php?id=944" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=944&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Marta de Carvalho Cavalcante</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>martasantosconnect@gmail.com</td>
                  <td>00000000000</td>
                  <td>
                    <a href="cliente.php?id=1348">Ver</a> <br />
                    <a href="edita-cliente.php?id=1348">Editar</a> <br />
                    <a href="destinatario.php?id=1348" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1348&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MARYON APARECIDA PORTES SOMBRIO</td>
                  <td>não fornecido</td>
                  <td>SP</td>
                  <td>maryon.portess@hotmail.com</td>
                  <td>47 984378504</td>
                  <td>
                    <a href="cliente.php?id=1055">Ver</a> <br />
                    <a href="edita-cliente.php?id=1055">Editar</a> <br />
                    <a href="destinatario.php?id=1055" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1055&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MATEUS COSTA MEDEIROS</td>
                  <td>NATAL</td>
                  <td>RN</td>
                  <td>holyessencias@li.vecon</td>
                  <td>84 88873004</td>
                  <td>
                    <a href="cliente.php?id=647">Ver</a> <br />
                    <a href="edita-cliente.php?id=647">Editar</a> <br />
                    <a href="destinatario.php?id=647" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=647&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MATEUS MARTINS / BONSAI COMERCIAL EIRELI - ME</td>
                  <td>Caratinga</td>
                  <td>MG</td>
                  <td>martins@revistabonsai.com.br</td>
                  <td>33 3322-2882</td>
                  <td>
                    <a href="cliente.php?id=445">Ver</a> <br />
                    <a href="edita-cliente.php?id=445">Editar</a> <br />
                    <a href="destinatario.php?id=445" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=445&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Matheus Ferreira de Castilho - Paulo César - </td>
                  <td>cnpj 50.718.797/0001-35</td>
                  <td>Nova Odessa</td>
                  <td>SP</td>
                  <td>nao_fornecido@mao_fornecido.com</td>
                  <td>19 98609-5130</td>
                  <td>
                    <a href="cliente.php?id=972">Ver</a> <br />
                    <a href="edita-cliente.php?id=972">Editar</a> <br />
                    <a href="destinatario.php?id=972" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=972&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MATHEUS ROQUE DE OLIVEIRA LIMA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=394">Ver</a> <br />
                    <a href="edita-cliente.php?id=394">Editar</a> <br />
                    <a href="destinatario.php?id=394" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=394&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mauricio Dib</td>
                  <td>São José do Rio Preto</td>
                  <td>SP</td>
                  <td>maurcio.dib@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=883">Ver</a> <br />
                    <a href="edita-cliente.php?id=883">Editar</a> <br />
                    <a href="destinatario.php?id=883" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=883&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mauricio Mittermayer dos Reis.</td>
                  <td>Ffreguesia do O</td>
                  <td>SP</td>
                  <td>gdmayer@terra.com.br</td>
                  <td>( 11 ) 9 6280 8900 / 3487 7505</td>
                  <td>
                    <a href="cliente.php?id=290">Ver</a> <br />
                    <a href="edita-cliente.php?id=290">Editar</a> <br />
                    <a href="destinatario.php?id=290" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=290&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mauricio Thyedson de Farias Lima</td>
                  <td>MOSSORO</td>
                  <td>RN</td>
                  <td>thyedson@gmail.com</td>
                  <td>84 86297776</td>
                  <td>
                    <a href="cliente.php?id=879">Ver</a> <br />
                    <a href="edita-cliente.php?id=879">Editar</a> <br />
                    <a href="destinatario.php?id=879" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=879&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MAURO R. DE SOUZA</td>
                  <td>Comendador Levy Gasparian;</td>
                  <td>RJ</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>24 98180991</td>
                  <td>
                    <a href="cliente.php?id=494">Ver</a> <br />
                    <a href="edita-cliente.php?id=494">Editar</a> <br />
                    <a href="destinatario.php?id=494" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=494&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mauro Simões</td>
                  <td>Aracaju</td>
                  <td>SE</td>
                  <td>mscosmeticoseacessorios@hotmail.com</td>
                  <td>(079) 9 9976-2260 vivo (079) 9 8832-3699 oi</td>
                  <td>
                    <a href="cliente.php?id=287">Ver</a> <br />
                    <a href="edita-cliente.php?id=287">Editar</a> <br />
                    <a href="destinatario.php?id=287" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=287&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mayara Aragão dias Guimarães</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>naofinformado@naoinformado.com</td>
                  <td>13 99610-1379</td>
                  <td>
                    <a href="cliente.php?id=1286">Ver</a> <br />
                    <a href="edita-cliente.php?id=1286">Editar</a> <br />
                    <a href="destinatario.php?id=1286" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1286&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mayara Coutinho</td>
                  <td>TATUÍ</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>15 98100-9175</td>
                  <td>
                    <a href="cliente.php?id=893">Ver</a> <br />
                    <a href="edita-cliente.php?id=893">Editar</a> <br />
                    <a href="destinatario.php?id=893" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=893&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mayara Garcia</td>
                  <td>RIBEIRÃO PRETO</td>
                  <td>SP</td>
                  <td>mayaratrevisani@gmail.com</td>
                  <td>16 988396696 / </td>
                  <td>cpf-383041188-07</td>
                  <td>
                    <a href="cliente.php?id=17">Ver</a> <br />
                    <a href="edita-cliente.php?id=17">Editar</a> <br />
                    <a href="destinatario.php?id=17" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=17&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mayk Henrique Gomes de Oliveira</td>
                  <td>APODI</td>
                  <td>RN</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>84 9668-8778 </td>
                  <td>cpf 08538428411</td>
                  <td>
                    <a href="cliente.php?id=832">Ver</a> <br />
                    <a href="edita-cliente.php?id=832">Editar</a> <br />
                    <a href="destinatario.php?id=832" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=832&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MAYLSON GUILHERME DA SILVA S.</td>
                  <td>BANGU</td>
                  <td>RJ</td>
                  <td>maylsonguilherme@yahoo.com.br</td>
                  <td>(21)96429-0861</td>
                  <td>
                    <a href="cliente.php?id=395">Ver</a> <br />
                    <a href="edita-cliente.php?id=395">Editar</a> <br />
                    <a href="destinatario.php?id=395" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=395&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Medformula Ltda</td>
                  <td>Primavera do Leste</td>
                  <td>MT</td>
                  <td>medformulapva@gmail.com</td>
                  <td>66 8436-7784 </td>
                  <td>cnpj 03.695.09</td>
                  <td>
                    <a href="cliente.php?id=982">Ver</a> <br />
                    <a href="edita-cliente.php?id=982">Editar</a> <br />
                    <a href="destinatario.php?id=982" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=982&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MEDIPULARES</td>
                  <td>Primavera do Leste</td>
                  <td>MT</td>
                  <td>Medformulapva@gmail.com</td>
                  <td>66 8436-7784</td>
                  <td>
                    <a href="cliente.php?id=740">Ver</a> <br />
                    <a href="edita-cliente.php?id=740">Editar</a> <br />
                    <a href="destinatario.php?id=740" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=740&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mellinda Cosméticos</td>
                  <td>Patrocínio Paulista</td>
                  <td>SP</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(16) 31451261 /16 993650746</td>
                  <td>
                    <a href="cliente.php?id=23">Ver</a> <br />
                    <a href="edita-cliente.php?id=23">Editar</a> <br />
                    <a href="destinatario.php?id=23" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=23&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MENEGHETTI IND. QUÍMICA - A/C CAIO MANEGHETTI</td>
                  <td>DOIS CÓRREGOS</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>14 3652-9090</td>
                  <td>
                    <a href="cliente.php?id=266">Ver</a> <br />
                    <a href="edita-cliente.php?id=266">Editar</a> <br />
                    <a href="destinatario.php?id=266" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=266&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mercia Siqueira Batista</td>
                  <td>MATA DE SÃO JOÃO</td>
                  <td>BA</td>
                  <td>mercia136@gmail.com</td>
                  <td>(71) 36234766 / 99247-2340</td>
                  <td>
                    <a href="cliente.php?id=37">Ver</a> <br />
                    <a href="edita-cliente.php?id=37">Editar</a> <br />
                    <a href="destinatario.php?id=37" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=37&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Meson Quimica - Carlos Eduardo</td>
                  <td>Jardim Santo Amaro-Cambe</td>
                  <td>PR</td>
                  <td>CONTATO@MESONQUIMICA.COM.BR</td>
                  <td>04333395156</td>
                  <td>
                    <a href="cliente.php?id=709">Ver</a> <br />
                    <a href="edita-cliente.php?id=709">Editar</a> <br />
                    <a href="destinatario.php?id=709" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=709&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MICAL CAVALCANTE</td>
                  <td>SÃO JOSÉ DO RIO PRETO</td>
                  <td>SP</td>
                  <td>mikicaval@hotmail.com</td>
                  <td>(17) 98144-7300</td>
                  <td>
                    <a href="cliente.php?id=202">Ver</a> <br />
                    <a href="edita-cliente.php?id=202">Editar</a> <br />
                    <a href="destinatario.php?id=202" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=202&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MICHELE DANTAS</td>
                  <td>Três Lagoas</td>
                  <td>MS</td>
                  <td>michele.dantas@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=529">Ver</a> <br />
                    <a href="edita-cliente.php?id=529">Editar</a> <br />
                    <a href="destinatario.php?id=529" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=529&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MICHELE REGINA CARVALHO</td>
                  <td>SETE LAGOAS</td>
                  <td>MG</td>
                  <td>carolcarvalhogomide@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=362">Ver</a> <br />
                    <a href="edita-cliente.php?id=362">Editar</a> <br />
                    <a href="destinatario.php?id=362" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=362&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Michelle de Azevedo Souza</td>
                  <td>Duque de Caxias</td>
                  <td>RJ</td>
                  <td>michele2009.rj@hotmail.com</td>
                  <td>021998712256</td>
                  <td>
                    <a href="cliente.php?id=836">Ver</a> <br />
                    <a href="edita-cliente.php?id=836">Editar</a> <br />
                    <a href="destinatario.php?id=836" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=836&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Michelli Macedo Machado</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>Michelli.shiatsu@gmail.com</td>
                  <td>15 99849-9202</td>
                  <td>
                    <a href="cliente.php?id=1213">Ver</a> <br />
                    <a href="edita-cliente.php?id=1213">Editar</a> <br />
                    <a href="destinatario.php?id=1213" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1213&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MIGUEL CRUZ LOUREIRO FILHO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>miguel_rj1@outlook.com</td>
                  <td>TEL: 21969261806-</td>
                  <td>cpf:14563217735-</td>
                  <td>cnpj:273073340001</td>
                  <td>
                    <a href="cliente.php?id=566">Ver</a> <br />
                    <a href="edita-cliente.php?id=566">Editar</a> <br />
                    <a href="destinatario.php?id=566" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=566&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MILSON PEREIRA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=223">Ver</a> <br />
                    <a href="edita-cliente.php?id=223">Editar</a> <br />
                    <a href="destinatario.php?id=223" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=223&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Milton</td>
                  <td>Tarumã</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>xxxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=33">Ver</a> <br />
                    <a href="edita-cliente.php?id=33">Editar</a> <br />
                    <a href="destinatario.php?id=33" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=33&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mirian Cristina da Silva Santos Silva Santos</td>
                  <td>Uberlândia</td>
                  <td>MG</td>
                  <td>cristinassmirian@gmail.com</td>
                  <td>0000000</td>
                  <td>
                    <a href="cliente.php?id=154">Ver</a> <br />
                    <a href="edita-cliente.php?id=154">Editar</a> <br />
                    <a href="destinatario.php?id=154" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=154&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MIRIAN FASSARELLA</td>
                  <td>Cachoeiro de Itapemirim</td>
                  <td>ES</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>28 99999-1798</td>
                  <td>
                    <a href="cliente.php?id=346">Ver</a> <br />
                    <a href="edita-cliente.php?id=346">Editar</a> <br />
                    <a href="destinatario.php?id=346" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=346&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MJ FRAGRÂNCIAS</td>
                  <td>Teresópolis</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 96818-8950</td>
                  <td>
                    <a href="cliente.php?id=993">Ver</a> <br />
                    <a href="edita-cliente.php?id=993">Editar</a> <br />
                    <a href="destinatario.php?id=993" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=993&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Moisés Wallancuella</td>
                  <td>Petrolina</td>
                  <td>PE</td>
                  <td>Marciaroque1970@gmailcom</td>
                  <td>087 9676.5421</td>
                  <td>
                    <a href="cliente.php?id=641">Ver</a> <br />
                    <a href="edita-cliente.php?id=641">Editar</a> <br />
                    <a href="destinatario.php?id=641" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=641&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MONAH IDALINA</td>
                  <td>FLORIANÓPOLIS</td>
                  <td>SC</td>
                  <td>monahidalina21@gmail.com</td>
                  <td>48- 9624-3258</td>
                  <td>
                    <a href="cliente.php?id=323">Ver</a> <br />
                    <a href="edita-cliente.php?id=323">Editar</a> <br />
                    <a href="destinatario.php?id=323" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=323&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Monica Mayolino</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>61 8496-2254</td>
                  <td>
                    <a href="cliente.php?id=760">Ver</a> <br />
                    <a href="edita-cliente.php?id=760">Editar</a> <br />
                    <a href="destinatario.php?id=760" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=760&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mônica Vera Cruz dos Santos</td>
                  <td>Guarujá</td>
                  <td>SP</td>
                  <td>saboneteeartes@gmail.com</td>
                  <td>13 991004212 </td>
                  <td>cnpj: 428547280001/20</td>
                  <td>
                    <a href="cliente.php?id=960">Ver</a> <br />
                    <a href="edita-cliente.php?id=960">Editar</a> <br />
                    <a href="destinatario.php?id=960" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=960&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Mundo das Essências - Rondinelli / Ivanea</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(21) 24647413 997912844</td>
                  <td>
                    <a href="cliente.php?id=24">Ver</a> <br />
                    <a href="edita-cliente.php?id=24">Editar</a> <br />
                    <a href="destinatario.php?id=24" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=24&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Murillo Scasciott</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>murillo.fts@gmail.com</td>
                  <td>xxxxxxxxxxxxxxxxxx</td>
                  <td>
                    <a href="cliente.php?id=36">Ver</a> <br />
                    <a href="edita-cliente.php?id=36">Editar</a> <br />
                    <a href="destinatario.php?id=36" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=36&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Murilo Miguel Aparecido da Silva Carvalho</td>
                  <td>Campo Limpo Paulista</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>972232319</td>
                  <td>
                    <a href="cliente.php?id=824">Ver</a> <br />
                    <a href="edita-cliente.php?id=824">Editar</a> <br />
                    <a href="destinatario.php?id=824" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=824&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NADIA</td>
                  <td>EMBARE - SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13988164320</td>
                  <td>
                    <a href="cliente.php?id=793">Ver</a> <br />
                    <a href="edita-cliente.php?id=793">Editar</a> <br />
                    <a href="destinatario.php?id=793" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=793&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NADIA ALVARENGA</td>
                  <td>FARTURA</td>
                  <td>SP</td>
                  <td>nadia_alvarenga_duarte@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=327">Ver</a> <br />
                    <a href="edita-cliente.php?id=327">Editar</a> <br />
                    <a href="destinatario.php?id=327" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=327&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nadilson Gomes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 96650-1559</td>
                  <td>
                    <a href="cliente.php?id=1123">Ver</a> <br />
                    <a href="edita-cliente.php?id=1123">Editar</a> <br />
                    <a href="destinatario.php?id=1123" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1123&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nagoia Cosméticos Ltda - Moisés Renato</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 96540-8392</td>
                  <td>
                    <a href="cliente.php?id=1309">Ver</a> <br />
                    <a href="edita-cliente.php?id=1309">Editar</a> <br />
                    <a href="destinatario.php?id=1309" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1309&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NAIÁ TERESINHA PÊS</td>
                  <td>PRESIDENTE PRUDENTE</td>
                  <td>SP</td>
                  <td>naiapes45@hotmail.com</td>
                  <td>18 98118 7789</td>
                  <td>
                    <a href="cliente.php?id=343">Ver</a> <br />
                    <a href="edita-cliente.php?id=343">Editar</a> <br />
                    <a href="destinatario.php?id=343" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=343&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NAIELE TARGA</td>
                  <td>São Jose do Rio Preto</td>
                  <td>SP</td>
                  <td>naiele_targa@hotmail.com</td>
                  <td>17 32215470</td>
                  <td>
                    <a href="cliente.php?id=270">Ver</a> <br />
                    <a href="edita-cliente.php?id=270">Editar</a> <br />
                    <a href="destinatario.php?id=270" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=270&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nair Costa (Alcides)</td>
                  <td>Centro-Americana</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>6294476469 / 8587052011</td>
                  <td>
                    <a href="cliente.php?id=666">Ver</a> <br />
                    <a href="edita-cliente.php?id=666">Editar</a> <br />
                    <a href="destinatario.php?id=666" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=666&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nara Roberta Dozzi Tezza</td>
                  <td>Leme</td>
                  <td>SP</td>
                  <td>dozzitezzanara@gmail.com</td>
                  <td>19 99280-0086</td>
                  <td>
                    <a href="cliente.php?id=1275">Ver</a> <br />
                    <a href="edita-cliente.php?id=1275">Editar</a> <br />
                    <a href="destinatario.php?id=1275" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1275&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Narcisio Nunes</td>
                  <td>não informada</td>
                  <td>SP</td>
                  <td>aaa@naoinformado.com</td>
                  <td>11996124767</td>
                  <td>
                    <a href="cliente.php?id=998">Ver</a> <br />
                    <a href="edita-cliente.php?id=998">Editar</a> <br />
                    <a href="destinatario.php?id=998" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=998&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nátuz Cosméticos / Nilson Santos</td>
                  <td>CURITIBA</td>
                  <td>PR</td>
                  <td>nilson_hermes@hotmail.com</td>
                  <td>41 9945-1196</td>
                  <td>
                    <a href="cliente.php?id=845">Ver</a> <br />
                    <a href="edita-cliente.php?id=845">Editar</a> <br />
                    <a href="destinatario.php?id=845" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=845&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nauro Paulino Filho / ONE BY ONE</td>
                  <td>IPANEMA</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>21970007185</td>
                  <td>
                    <a href="cliente.php?id=786">Ver</a> <br />
                    <a href="edita-cliente.php?id=786">Editar</a> <br />
                    <a href="destinatario.php?id=786" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=786&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NAYARA AMARAL</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11958731576</td>
                  <td>
                    <a href="cliente.php?id=913">Ver</a> <br />
                    <a href="edita-cliente.php?id=913">Editar</a> <br />
                    <a href="destinatario.php?id=913" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=913&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nayara de Melo Rocha</td>
                  <td>São Paulo SP</td>
                  <td>RS</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8999823813</td>
                  <td>
                    <a href="cliente.php?id=750">Ver</a> <br />
                    <a href="edita-cliente.php?id=750">Editar</a> <br />
                    <a href="destinatario.php?id=750" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=750&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nayara Martins Alves</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>85 9257-5310 </td>
                  <td>cpf: 053.878.943-35</td>
                  <td>
                    <a href="cliente.php?id=1109">Ver</a> <br />
                    <a href="edita-cliente.php?id=1109">Editar</a> <br />
                    <a href="destinatario.php?id=1109" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1109&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nayara Roberta</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>n.r.a.s.silveira@gamil.com</td>
                  <td>31 99226-0248</td>
                  <td>
                    <a href="cliente.php?id=1089">Ver</a> <br />
                    <a href="edita-cliente.php?id=1089">Editar</a> <br />
                    <a href="destinatario.php?id=1089" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1089&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NEIDE BARBOSA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>Neidybarbosa133@gmail.com</td>
                  <td>8585778771 </td>
                  <td>cpf: 012123833-46</td>
                  <td>
                    <a href="cliente.php?id=882">Ver</a> <br />
                    <a href="edita-cliente.php?id=882">Editar</a> <br />
                    <a href="destinatario.php?id=882" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=882&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NEILA I.</td>
                  <td>São Sebastião</td>
                  <td>SP</td>
                  <td>neila_itavo@uol.com.br</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=537">Ver</a> <br />
                    <a href="edita-cliente.php?id=537">Editar</a> <br />
                    <a href="destinatario.php?id=537" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=537&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Neimar Silva</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>supremafragrancia@gmail.com</td>
                  <td>(31)987758402</td>
                  <td>
                    <a href="cliente.php?id=407">Ver</a> <br />
                    <a href="edita-cliente.php?id=407">Editar</a> <br />
                    <a href="destinatario.php?id=407" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=407&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nelma T dos Santos</td>
                  <td>Cascavel</td>
                  <td>PR</td>
                  <td>nelmatsantos@hotmail.com</td>
                  <td>45 99961-4058 </td>
                  <td>cpf: 52451739991</td>
                  <td>
                    <a href="cliente.php?id=1079">Ver</a> <br />
                    <a href="edita-cliente.php?id=1079">Editar</a> <br />
                    <a href="destinatario.php?id=1079" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1079&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NEUSA MEDEIROS</td>
                  <td>VITORIA</td>
                  <td>ES</td>
                  <td>ne-medeiros@hotmail.com</td>
                  <td>27 3034-0845</td>
                  <td>
                    <a href="cliente.php?id=610">Ver</a> <br />
                    <a href="edita-cliente.php?id=610">Editar</a> <br />
                    <a href="destinatario.php?id=610" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=610&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NEW LIFE ESSÊNCIAS - A/C VIVIANE SOUZA PINTO</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>finessence.essencias@gmail.com</td>
                  <td>21 2407-8033 / 21 98908-3035</td>
                  <td>
                    <a href="cliente.php?id=495">Ver</a> <br />
                    <a href="edita-cliente.php?id=495">Editar</a> <br />
                    <a href="destinatario.php?id=495" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=495&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Neyleth Hisis Silva Oliveira</td>
                  <td>Carapicuíba</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=399">Ver</a> <br />
                    <a href="edita-cliente.php?id=399">Editar</a> <br />
                    <a href="destinatario.php?id=399" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=399&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NILSON DA SILVA</td>
                  <td>HORIZONTE</td>
                  <td>CE</td>
                  <td>nilsons687@gmail.com</td>
                  <td>85991968628</td>
                  <td>
                    <a href="cliente.php?id=517">Ver</a> <br />
                    <a href="edita-cliente.php?id=517">Editar</a> <br />
                    <a href="destinatario.php?id=517" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=517&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nilson da Silva Marinho</td>
                  <td>Mauá</td>
                  <td>SP</td>
                  <td>nilsonsmarinho@gmail.com</td>
                  <td>11 9 7581-8292 331.458.958-18</td>
                  <td>
                    <a href="cliente.php?id=1000">Ver</a> <br />
                    <a href="edita-cliente.php?id=1000">Editar</a> <br />
                    <a href="destinatario.php?id=1000" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1000&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nilson da Silva Marinho</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>niw_marinho@hotmail.com</td>
                  <td>11942153939</td>
                  <td>
                    <a href="cliente.php?id=1329">Ver</a> <br />
                    <a href="edita-cliente.php?id=1329">Editar</a> <br />
                    <a href="destinatario.php?id=1329" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1329&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NILTON RAMOS</td>
                  <td>GUARUJA</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13982176142</td>
                  <td>
                    <a href="cliente.php?id=779">Ver</a> <br />
                    <a href="edita-cliente.php?id=779">Editar</a> <br />
                    <a href="destinatario.php?id=779" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=779&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nilton Rodrigues</td>
                  <td>Bauru</td>
                  <td>RJ</td>
                  <td>miriambernardes.s@gmail.com</td>
                  <td>(14) 37777378 - 988128571</td>
                  <td>
                    <a href="cliente.php?id=32">Ver</a> <br />
                    <a href="edita-cliente.php?id=32">Editar</a> <br />
                    <a href="destinatario.php?id=32" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=32&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nilton Ruy dos Santos</td>
                  <td>Ouro Fino MG</td>
                  <td>MG</td>
                  <td>marciaroque@gmail.com</td>
                  <td>3597120352</td>
                  <td>
                    <a href="cliente.php?id=798">Ver</a> <br />
                    <a href="edita-cliente.php?id=798">Editar</a> <br />
                    <a href="destinatario.php?id=798" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=798&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nívea Dias Andrade Valverde</td>
                  <td>Salvador</td>
                  <td>BA</td>
                  <td>niveadias@uol.com.br</td>
                  <td>71 999824805 </td>
                  <td>cpf: 037.606.984-84</td>
                  <td>
                    <a href="cliente.php?id=988">Ver</a> <br />
                    <a href="edita-cliente.php?id=988">Editar</a> <br />
                    <a href="destinatario.php?id=988" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=988&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>NOEMIA PEREIRA LIMA DINIZ</td>
                  <td>nãofornecida</td>
                  <td>SP</td>
                  <td>noemiapereirasp@gmail.com</td>
                  <td>11 95281-3798</td>
                  <td>
                    <a href="cliente.php?id=1138">Ver</a> <br />
                    <a href="edita-cliente.php?id=1138">Editar</a> <br />
                    <a href="destinatario.php?id=1138" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1138&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Norca de farias vieira Santos</td>
                  <td>Tucumã</td>
                  <td>PA</td>
                  <td>holyessencias@live.com</td>
                  <td>(94)99265.9586</td>
                  <td>
                    <a href="cliente.php?id=928">Ver</a> <br />
                    <a href="edita-cliente.php?id=928">Editar</a> <br />
                    <a href="destinatario.php?id=928" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=928&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Norca de Farias Vieira Santos. </td>
                  <td>cpf: 933.226.582.87</td>
                  <td>Tucumã</td>
                  <td>PA</td>
                  <td>carloslimpeza9@gmail.com</td>
                  <td>94 9 92659586</td>
                  <td>
                    <a href="cliente.php?id=949">Ver</a> <br />
                    <a href="edita-cliente.php?id=949">Editar</a> <br />
                    <a href="destinatario.php?id=949" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=949&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Octávio Tenório</td>
                  <td>não fornecida</td>
                  <td>SP</td>
                  <td>aaa@naofornecido.com</td>
                  <td>000000 nao informado</td>
                  <td>
                    <a href="cliente.php?id=1001">Ver</a> <br />
                    <a href="edita-cliente.php?id=1001">Editar</a> <br />
                    <a href="destinatario.php?id=1001" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1001&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Octávio Tenório</td>
                  <td>Santo André</td>
                  <td>SP</td>
                  <td>contato@n2print.com.br</td>
                  <td>11 4472-2170 </td>
                  <td>cnpj: 130.12.546.0001-04</td>
                  <td>
                    <a href="cliente.php?id=1002">Ver</a> <br />
                    <a href="edita-cliente.php?id=1002">Editar</a> <br />
                    <a href="destinatario.php?id=1002" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1002&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Odair Bellini</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>Odairbellini@gmail.com</td>
                  <td></td>
                  <td>cpf. 166.398.788-28 11 99399-2260</td>
                  <td>
                    <a href="cliente.php?id=872">Ver</a> <br />
                    <a href="edita-cliente.php?id=872">Editar</a> <br />
                    <a href="destinatario.php?id=872" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=872&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>OLFATIVAS AROMAS- A/C FLÁVIO</td>
                  <td>ARARUAMA</td>
                  <td>RJ</td>
                  <td>olfativa.aromas@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=606">Ver</a> <br />
                    <a href="edita-cliente.php?id=606">Editar</a> <br />
                    <a href="destinatario.php?id=606" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=606&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ONICE MELLO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>ommello@uol.com.br</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=532">Ver</a> <br />
                    <a href="edita-cliente.php?id=532">Editar</a> <br />
                    <a href="destinatario.php?id=532" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=532&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ordeniz Domingos Pires</td>
                  <td>Vila velha</td>
                  <td>ES</td>
                  <td>ordenizpires58@hotmail.com</td>
                  <td>27 98170-2506</td>
                  <td>
                    <a href="cliente.php?id=965">Ver</a> <br />
                    <a href="edita-cliente.php?id=965">Editar</a> <br />
                    <a href="destinatario.php?id=965" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=965&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ORGAN LIFE - A/C THIAGO RODRIGUES</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>11 31863744</td>
                  <td>
                    <a href="cliente.php?id=496">Ver</a> <br />
                    <a href="edita-cliente.php?id=496">Editar</a> <br />
                    <a href="destinatario.php?id=496" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=496&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ORIEL JUNIOR</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>orbital.construcoes@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=630">Ver</a> <br />
                    <a href="edita-cliente.php?id=630">Editar</a> <br />
                    <a href="destinatario.php?id=630" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=630&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ORISVALDO RAFAEL FURTADO COSTA</td>
                  <td>PINHEIRO MARANHÃO</td>
                  <td>MA</td>
                  <td>Infinitypurfam420@gmail.com</td>
                  <td>9884998950</td>
                  <td>
                    <a href="cliente.php?id=794">Ver</a> <br />
                    <a href="edita-cliente.php?id=794">Editar</a> <br />
                    <a href="destinatario.php?id=794" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=794&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ORLANDO ALVES</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>orlando.albuns@hotmail.com</td>
                  <td>(85) 9 8613 1615</td>
                  <td>
                    <a href="cliente.php?id=644">Ver</a> <br />
                    <a href="edita-cliente.php?id=644">Editar</a> <br />
                    <a href="destinatario.php?id=644" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=644&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>OSMAIR</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>nadinesenna@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=600">Ver</a> <br />
                    <a href="edita-cliente.php?id=600">Editar</a> <br />
                    <a href="destinatario.php?id=600" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=600&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Osvaldo Pinto de Souza Neto</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>21971182815</td>
                  <td>
                    <a href="cliente.php?id=875">Ver</a> <br />
                    <a href="edita-cliente.php?id=875">Editar</a> <br />
                    <a href="destinatario.php?id=875" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=875&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pablo Augusto De Oliveira</td>
                  <td>Sorocaba</td>
                  <td>SP</td>
                  <td>pablo2604.oliveira@gmail.com</td>
                  <td>15 99657-6884</td>
                  <td>
                    <a href="cliente.php?id=1297">Ver</a> <br />
                    <a href="edita-cliente.php?id=1297">Editar</a> <br />
                    <a href="destinatario.php?id=1297" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1297&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pablo Cardoso</td>
                  <td>VIGIA DE NAZARÉ</td>
                  <td>PA</td>
                  <td>amazonfetiche07@gmail.com</td>
                  <td>91 987614820 / 998178127</td>
                  <td>
                    <a href="cliente.php?id=268">Ver</a> <br />
                    <a href="edita-cliente.php?id=268">Editar</a> <br />
                    <a href="destinatario.php?id=268" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=268&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pablo Luis de Sá Leitão Cunha</td>
                  <td>Ponta Negra-Natal</td>
                  <td>RN</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>08488992915</td>
                  <td>
                    <a href="cliente.php?id=676">Ver</a> <br />
                    <a href="edita-cliente.php?id=676">Editar</a> <br />
                    <a href="destinatario.php?id=676" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=676&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paloma Falcão Affonso</td>
                  <td>MANAUS</td>
                  <td>AM</td>
                  <td>holyessencias@live.com</td>
                  <td>92 8475-3887 </td>
                  <td>cpf 048.759.792-31</td>
                  <td>
                    <a href="cliente.php?id=818">Ver</a> <br />
                    <a href="edita-cliente.php?id=818">Editar</a> <br />
                    <a href="destinatario.php?id=818" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=818&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paolla Theodoro Turienzo</td>
                  <td>Ibira</td>
                  <td>SP</td>
                  <td>t.turienzo@outlook.com</td>
                  <td>13981367918</td>
                  <td>
                    <a href="cliente.php?id=936">Ver</a> <br />
                    <a href="edita-cliente.php?id=936">Editar</a> <br />
                    <a href="destinatario.php?id=936" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=936&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PATRICIA FERREIRA BEZERRA PEDROSA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>(21) 2499-2679/(21) 2442-9818/(21) 99942-3308</td>
                  <td>
                    <a href="cliente.php?id=361">Ver</a> <br />
                    <a href="edita-cliente.php?id=361">Editar</a> <br />
                    <a href="destinatario.php?id=361" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=361&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Patricia Fernandes</td>
                  <td>são Paulo</td>
                  <td>SP</td>
                  <td>patricia.fernandes29@hotmail.com</td>
                  <td>(11)98967.4711</td>
                  <td>
                    <a href="cliente.php?id=573">Ver</a> <br />
                    <a href="edita-cliente.php?id=573">Editar</a> <br />
                    <a href="destinatario.php?id=573" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=573&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Patricia Gerhardt</td>
                  <td>SANTA MARIA</td>
                  <td>RS</td>
                  <td>live@.com.br</td>
                  <td>55 9925-6285</td>
                  <td>
                    <a href="cliente.php?id=724">Ver</a> <br />
                    <a href="edita-cliente.php?id=724">Editar</a> <br />
                    <a href="destinatario.php?id=724" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=724&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PATRICIA LOPES ( ESPAÇO MAGNIFICA BEAUTY )</td>
                  <td>JACAREI</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=393">Ver</a> <br />
                    <a href="edita-cliente.php?id=393">Editar</a> <br />
                    <a href="destinatario.php?id=393" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=393&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PATRICIA MENESES DE LIMA</td>
                  <td>BOQUEIRÃO SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13974225484</td>
                  <td>
                    <a href="cliente.php?id=775">Ver</a> <br />
                    <a href="edita-cliente.php?id=775">Editar</a> <br />
                    <a href="destinatario.php?id=775" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=775&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Patrícia Nóbrega Duarte</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>85 9773-8575</td>
                  <td>
                    <a href="cliente.php?id=858">Ver</a> <br />
                    <a href="edita-cliente.php?id=858">Editar</a> <br />
                    <a href="destinatario.php?id=858" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=858&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Patricia Nobrega Duarte</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=909">Ver</a> <br />
                    <a href="edita-cliente.php?id=909">Editar</a> <br />
                    <a href="destinatario.php?id=909" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=909&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Patricia Spinola de Carvalho</td>
                  <td>Niterói</td>
                  <td>RJ</td>
                  <td>spinolacarvalho@hotmail.com</td>
                  <td>21 98168-7393</td>
                  <td>
                    <a href="cliente.php?id=1218">Ver</a> <br />
                    <a href="edita-cliente.php?id=1218">Editar</a> <br />
                    <a href="destinatario.php?id=1218" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1218&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paula da Silva Passos</td>
                  <td>Rio de Janeiro</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 98771-6311</td>
                  <td>
                    <a href="cliente.php?id=1206">Ver</a> <br />
                    <a href="edita-cliente.php?id=1206">Editar</a> <br />
                    <a href="destinatario.php?id=1206" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1206&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PAULA FONGARO CINTO</td>
                  <td>VOTORANTIM</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>15991776769</td>
                  <td>
                    <a href="cliente.php?id=685">Ver</a> <br />
                    <a href="edita-cliente.php?id=685">Editar</a> <br />
                    <a href="destinatario.php?id=685" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=685&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paula França</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>pamaf123@gmail.com</td>
                  <td>13 99713-5549 </td>
                  <td>cpf: 32379343802</td>
                  <td>
                    <a href="cliente.php?id=1355">Ver</a> <br />
                    <a href="edita-cliente.php?id=1355">Editar</a> <br />
                    <a href="destinatario.php?id=1355" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1355&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PAULA GHIDINI MUNERATO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 99160-8138</td>
                  <td>
                    <a href="cliente.php?id=896">Ver</a> <br />
                    <a href="edita-cliente.php?id=896">Editar</a> <br />
                    <a href="destinatario.php?id=896" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=896&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paula Hernandes / Good Vibes</td>
                  <td>Sao Paulo Capital</td>
                  <td>SP</td>
                  <td>paulabortole@gmail.com</td>
                  <td>11989339152</td>
                  <td>
                    <a href="cliente.php?id=1070">Ver</a> <br />
                    <a href="edita-cliente.php?id=1070">Editar</a> <br />
                    <a href="destinatario.php?id=1070" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1070&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paula Marcondes ( D´Perfume Importado Artesanal )</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>contato@dperfume.com.br</td>
                  <td>(12) 98251-2029</td>
                  <td>
                    <a href="cliente.php?id=440">Ver</a> <br />
                    <a href="edita-cliente.php?id=440">Editar</a> <br />
                    <a href="destinatario.php?id=440" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=440&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paula Marcondes Ferres Rodrigues</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>paulamar.rp@gmail.com</td>
                  <td>13 99178-7282</td>
                  <td>
                    <a href="cliente.php?id=891">Ver</a> <br />
                    <a href="edita-cliente.php?id=891">Editar</a> <br />
                    <a href="destinatario.php?id=891" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=891&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Cesar de Souza</td>
                  <td>Campinas</td>
                  <td>SP</td>
                  <td>paulogps09@hotmail.com</td>
                  <td>19988134230</td>
                  <td>
                    <a href="cliente.php?id=1028">Ver</a> <br />
                    <a href="edita-cliente.php?id=1028">Editar</a> <br />
                    <a href="destinatario.php?id=1028" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1028&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Cesar de Souza</td>
                  <td>Campinas</td>
                  <td>SP</td>
                  <td>paulogps09@hotmail.com</td>
                  <td>19988134230</td>
                  <td>
                    <a href="cliente.php?id=1029">Ver</a> <br />
                    <a href="edita-cliente.php?id=1029">Editar</a> <br />
                    <a href="destinatario.php?id=1029" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1029&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PAULO HENRIQUE LUIZ BARATA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>11954304603</td>
                  <td>
                    <a href="cliente.php?id=657">Ver</a> <br />
                    <a href="edita-cliente.php?id=657">Editar</a> <br />
                    <a href="destinatario.php?id=657" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=657&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Henrique Mendes Dutra</td>
                  <td>São Luis</td>
                  <td>MA</td>
                  <td>habitualviceversa@gmail.com</td>
                  <td>98 8881-7600 </td>
                  <td>cnpj 27.326.283/0001-12 </td>
                  <td>cpf: 238.</td>
                  <td>
                    <a href="cliente.php?id=1157">Ver</a> <br />
                    <a href="edita-cliente.php?id=1157">Editar</a> <br />
                    <a href="destinatario.php?id=1157" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1157&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Henrique Mendes Dutra</td>
                  <td>São Luiz</td>
                  <td>MA</td>
                  <td>habitualviceversa@gmail.com</td>
                  <td>9888817600</td>
                  <td>
                    <a href="cliente.php?id=1166">Ver</a> <br />
                    <a href="edita-cliente.php?id=1166">Editar</a> <br />
                    <a href="destinatario.php?id=1166" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1166&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Henrique Nicolau do Nascimento</td>
                  <td>São José dos Campos</td>
                  <td>SP</td>
                  <td>nelita.paulo@gmail.com</td>
                  <td>12 98877-4396 </td>
                  <td>cpf: 21572874856</td>
                  <td>
                    <a href="cliente.php?id=1024">Ver</a> <br />
                    <a href="edita-cliente.php?id=1024">Editar</a> <br />
                    <a href="destinatario.php?id=1024" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1024&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Henrique Rocha do Nascimento</td>
                  <td>Itapõa DF</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>6194456513</td>
                  <td>
                    <a href="cliente.php?id=1048">Ver</a> <br />
                    <a href="edita-cliente.php?id=1048">Editar</a> <br />
                    <a href="destinatario.php?id=1048" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1048&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Roberto Matta Pires</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>paulorobertomattapires@gmail.com</td>
                  <td>71-999100769 </td>
                  <td>cpf: 237.606.995-53</td>
                  <td>
                    <a href="cliente.php?id=609">Ver</a> <br />
                    <a href="edita-cliente.php?id=609">Editar</a> <br />
                    <a href="destinatario.php?id=609" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=609&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Roberto Rufino</td>
                  <td>JARDIM PLANALTO SP</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>19993182532</td>
                  <td>
                    <a href="cliente.php?id=821">Ver</a> <br />
                    <a href="edita-cliente.php?id=821">Editar</a> <br />
                    <a href="destinatario.php?id=821" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=821&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Rodrigues</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>paulolirios@hotmail.com</td>
                  <td>85 8898-8630 </td>
                  <td>cpf 447.844.653-91</td>
                  <td>
                    <a href="cliente.php?id=926">Ver</a> <br />
                    <a href="edita-cliente.php?id=926">Editar</a> <br />
                    <a href="destinatario.php?id=926" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=926&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Sérgio Corrêa da Costa</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 9 5905-3994 </td>
                  <td>cpf: 04764181789</td>
                  <td>
                    <a href="cliente.php?id=987">Ver</a> <br />
                    <a href="edita-cliente.php?id=987">Editar</a> <br />
                    <a href="destinatario.php?id=987" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=987&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Paulo Sergio de Souza</td>
                  <td>São João da Boa Vista</td>
                  <td>SP</td>
                  <td>sociper@hotmail.com</td>
                  <td>19-36232026 / 19 99153-6727 (Whatsapp)</td>
                  <td>
                    <a href="cliente.php?id=613">Ver</a> <br />
                    <a href="edita-cliente.php?id=613">Editar</a> <br />
                    <a href="destinatario.php?id=613" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=613&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PAVANNI PARFUMS</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>11 2092-8224 / 11 98643-2833</td>
                  <td>
                    <a href="cliente.php?id=257">Ver</a> <br />
                    <a href="edita-cliente.php?id=257">Editar</a> <br />
                    <a href="destinatario.php?id=257" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=257&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Guilherme Monte Carvalho</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>pedroguilherme.mc@gmail.com</td>
                  <td>21 979352795</td>
                  <td>
                    <a href="cliente.php?id=1308">Ver</a> <br />
                    <a href="edita-cliente.php?id=1308">Editar</a> <br />
                    <a href="destinatario.php?id=1308" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1308&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Henrique Damas Lemos de Souza</td>
                  <td>Franca</td>
                  <td>SP</td>
                  <td>Phenriquedamas@hotmail.com</td>
                  <td>16 99180-6099</td>
                  <td>
                    <a href="cliente.php?id=1314">Ver</a> <br />
                    <a href="edita-cliente.php?id=1314">Editar</a> <br />
                    <a href="destinatario.php?id=1314" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1314&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Horacio Antunes Viana Felipe de Souza</td>
                  <td>Redenção</td>
                  <td>PR</td>
                  <td>pedro_de_souza10@hotmail.com</td>
                  <td>9491202526</td>
                  <td>
                    <a href="cliente.php?id=1273">Ver</a> <br />
                    <a href="edita-cliente.php?id=1273">Editar</a> <br />
                    <a href="destinatario.php?id=1273" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1273&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PEDRO LUIZ SANCHEZ</td>
                  <td>SANTO ANDRÉ</td>
                  <td>SP</td>
                  <td>sanchezpedro@terra.com.br</td>
                  <td>11 991542956 / 9.9236.2016</td>
                  <td>
                    <a href="cliente.php?id=213">Ver</a> <br />
                    <a href="edita-cliente.php?id=213">Editar</a> <br />
                    <a href="destinatario.php?id=213" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=213&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Müller</td>
                  <td>Florianópolis</td>
                  <td>SC</td>
                  <td>pedrommuller@gmail.com</td>
                  <td>48 8499-4909</td>
                  <td>
                    <a href="cliente.php?id=1158">Ver</a> <br />
                    <a href="edita-cliente.php?id=1158">Editar</a> <br />
                    <a href="destinatario.php?id=1158" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1158&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Paulo Costa Baltazar</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>grupocosta085@gmail.com</td>
                  <td>85 9411-5179</td>
                  <td>
                    <a href="cliente.php?id=1317">Ver</a> <br />
                    <a href="edita-cliente.php?id=1317">Editar</a> <br />
                    <a href="destinatario.php?id=1317" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1317&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PEDRO PAULO COSTA BALTAZAR</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>Srjoias504@gmail.com</td>
                  <td>85 7601-1880</td>
                  <td>
                    <a href="cliente.php?id=248">Ver</a> <br />
                    <a href="edita-cliente.php?id=248">Editar</a> <br />
                    <a href="destinatario.php?id=248" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=248&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Renan Rezende dos Santos</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>pedro.rrs@hotmail.com</td>
                  <td>13 99789-7531</td>
                  <td>
                    <a href="cliente.php?id=940">Ver</a> <br />
                    <a href="edita-cliente.php?id=940">Editar</a> <br />
                    <a href="destinatario.php?id=940" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=940&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pet Ponta da Praia</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>000000000</td>
                  <td>
                    <a href="cliente.php?id=697">Ver</a> <br />
                    <a href="edita-cliente.php?id=697">Editar</a> <br />
                    <a href="destinatario.php?id=697" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=697&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Petronio Filho</td>
                  <td>FORTALEZA CE</td>
                  <td>CE</td>
                  <td>camposfilho84@gmail.com</td>
                  <td>00000000000000000</td>
                  <td>
                    <a href="cliente.php?id=635">Ver</a> <br />
                    <a href="edita-cliente.php?id=635">Editar</a> <br />
                    <a href="destinatario.php?id=635" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=635&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Philipéia Industria Química Ltda.</td>
                  <td>João Pessoa</td>
                  <td>PB</td>
                  <td>inovacao@phip.com.br</td>
                  <td>83 3508-8688 83 9809-7371 https: phiq.com.br</td>
                  <td>
                    <a href="cliente.php?id=1195">Ver</a> <br />
                    <a href="edita-cliente.php?id=1195">Editar</a> <br />
                    <a href="destinatario.php?id=1195" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1195&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Pilar Chapur Fernandez - 00647127881</td>
                  <td>Mauá</td>
                  <td>SP</td>
                  <td>pilarchapur@gmail.com</td>
                  <td>11 95877-7894</td>
                  <td>
                    <a href="cliente.php?id=1067">Ver</a> <br />
                    <a href="edita-cliente.php?id=1067">Editar</a> <br />
                    <a href="destinatario.php?id=1067" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1067&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>POLYANA VALVERDE</td>
                  <td>VITÓRIA</td>
                  <td>ES</td>
                  <td>polyanavalverde@icloud.com</td>
                  <td>27 - 32270033 /27 981323155</td>
                  <td>
                    <a href="cliente.php?id=73">Ver</a> <br />
                    <a href="edita-cliente.php?id=73">Editar</a> <br />
                    <a href="destinatario.php?id=73" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=73&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PRISCILA BRITO</td>
                  <td>BARUERI</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=360">Ver</a> <br />
                    <a href="edita-cliente.php?id=360">Editar</a> <br />
                    <a href="destinatario.php?id=360" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=360&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PRISCILA VIEIRA DA SILVA</td>
                  <td>MARICA</td>
                  <td>RJ</td>
                  <td>wcaema@gmail.com</td>
                  <td>21 994831248</td>
                  <td>
                    <a href="cliente.php?id=632">Ver</a> <br />
                    <a href="edita-cliente.php?id=632">Editar</a> <br />
                    <a href="destinatario.php?id=632" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=632&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rafael Batista Graciano</td>
                  <td>Queimados</td>
                  <td>RJ</td>
                  <td>HOLYESSSENCIAS@LIVE.COM</td>
                  <td>21 97942-5251</td>
                  <td>
                    <a href="cliente.php?id=915">Ver</a> <br />
                    <a href="edita-cliente.php?id=915">Editar</a> <br />
                    <a href="destinatario.php?id=915" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=915&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rafael Botelho Doria</td>
                  <td>Aracajú</td>
                  <td>SE</td>
                  <td>rafabota@gmail.com</td>
                  <td>79 9144-0515 </td>
                  <td>cpf 010.699.685-10</td>
                  <td>
                    <a href="cliente.php?id=1127">Ver</a> <br />
                    <a href="edita-cliente.php?id=1127">Editar</a> <br />
                    <a href="destinatario.php?id=1127" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1127&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAFAEL FORT CHEIRO</td>
                  <td>FORTALEZA CE</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8586952373</td>
                  <td>
                    <a href="cliente.php?id=734">Ver</a> <br />
                    <a href="edita-cliente.php?id=734">Editar</a> <br />
                    <a href="destinatario.php?id=734" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=734&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAFAEL HENRIQUE</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>rafael_mendesmonteiro@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=261">Ver</a> <br />
                    <a href="edita-cliente.php?id=261">Editar</a> <br />
                    <a href="destinatario.php?id=261" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=261&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rafael Miceli</td>
                  <td>São José do Rio Preto</td>
                  <td>SP</td>
                  <td>alquimiamiceli@gmail.com</td>
                  <td>17 981162525</td>
                  <td>
                    <a href="cliente.php?id=1100">Ver</a> <br />
                    <a href="edita-cliente.php?id=1100">Editar</a> <br />
                    <a href="destinatario.php?id=1100" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1100&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAFAEL SILVA DOS SANTOS</td>
                  <td>GUARUJÁ</td>
                  <td>SP</td>
                  <td>rafaelfilth00@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=392">Ver</a> <br />
                    <a href="edita-cliente.php?id=392">Editar</a> <br />
                    <a href="destinatario.php?id=392" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=392&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAFAEL SOBRAL</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>rafaelpelais@hotmail.com</td>
                  <td>13 981627873</td>
                  <td>
                    <a href="cliente.php?id=146">Ver</a> <br />
                    <a href="edita-cliente.php?id=146">Editar</a> <br />
                    <a href="destinatario.php?id=146" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=146&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAFAEL TAVARES</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>RAFAELT.SGANZERLA@HOTMAIL.COM</td>
                  <td>13 981383174</td>
                  <td>
                    <a href="cliente.php?id=513">Ver</a> <br />
                    <a href="edita-cliente.php?id=513">Editar</a> <br />
                    <a href="destinatario.php?id=513" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=513&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rafaela Valverde Valenca</td>
                  <td>SALVADOR</td>
                  <td>BA</td>
                  <td>rafaelavalverde1@gmail.com</td>
                  <td></td>
                  <td>cpf 07992051505 / TEL 71 9177-2793</td>
                  <td>
                    <a href="cliente.php?id=866">Ver</a> <br />
                    <a href="edita-cliente.php?id=866">Editar</a> <br />
                    <a href="destinatario.php?id=866" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=866&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rahuan Flores Ribeiro</td>
                  <td>Registro</td>
                  <td>SP</td>
                  <td>rahuan_flores@hotmail.com</td>
                  <td>13996056217</td>
                  <td>
                    <a href="cliente.php?id=912">Ver</a> <br />
                    <a href="edita-cliente.php?id=912">Editar</a> <br />
                    <a href="destinatario.php?id=912" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=912&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raimunda Iraneide Fernandes Santos</td>
                  <td>NAO FORNECIDO</td>
                  <td>SP</td>
                  <td>neidefashion6@gmail.com</td>
                  <td>91 98208-1463</td>
                  <td>
                    <a href="cliente.php?id=1104">Ver</a> <br />
                    <a href="edita-cliente.php?id=1104">Editar</a> <br />
                    <a href="destinatario.php?id=1104" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1104&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAIMUNDA SANTOS</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>ramundasantossantos@bol.com.br</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=390">Ver</a> <br />
                    <a href="edita-cliente.php?id=390">Editar</a> <br />
                    <a href="destinatario.php?id=390" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=390&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAIMUNDA SILVA FALCÃO</td>
                  <td>Manaus</td>
                  <td>AM</td>
                  <td>marciosacramento98@gmail.com</td>
                  <td>92 99998-2881 </td>
                  <td>cpf: 971.619.422-68</td>
                  <td>
                    <a href="cliente.php?id=963">Ver</a> <br />
                    <a href="edita-cliente.php?id=963">Editar</a> <br />
                    <a href="destinatario.php?id=963" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=963&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAPHAEL BARCELOS BARBARIOLI</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 996674436</td>
                  <td>
                    <a href="cliente.php?id=683">Ver</a> <br />
                    <a href="edita-cliente.php?id=683">Editar</a> <br />
                    <a href="destinatario.php?id=683" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=683&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raphaella Giordano</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>raphaellagiordano@hotmail.com</td>
                  <td>13 997033343</td>
                  <td>
                    <a href="cliente.php?id=155">Ver</a> <br />
                    <a href="edita-cliente.php?id=155">Editar</a> <br />
                    <a href="destinatario.php?id=155" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=155&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raquel Cardoso</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>perfumesparys@outlook.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=402">Ver</a> <br />
                    <a href="edita-cliente.php?id=402">Editar</a> <br />
                    <a href="destinatario.php?id=402" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=402&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raquel Cristine Silva Barcelos</td>
                  <td>Itaara</td>
                  <td>RS</td>
                  <td>raquelcsbarcelos@gmail.com</td>
                  <td>55 9.9982.8339 </td>
                  <td>cpf</td>
                  <td>
                    <a href="cliente.php?id=981">Ver</a> <br />
                    <a href="edita-cliente.php?id=981">Editar</a> <br />
                    <a href="destinatario.php?id=981" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=981&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAQUEL LOUREIRO</td>
                  <td>MANAUS</td>
                  <td>AM</td>
                  <td>raquelparah@gmail.com</td>
                  <td>92 99378-7965</td>
                  <td>
                    <a href="cliente.php?id=60">Ver</a> <br />
                    <a href="edita-cliente.php?id=60">Editar</a> <br />
                    <a href="destinatario.php?id=60" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=60&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RAQUEL SILVA</td>
                  <td>MAUA</td>
                  <td>SP</td>
                  <td>raquelharazin@bol.com.br</td>
                  <td>(11) 98202-3823</td>
                  <td>
                    <a href="cliente.php?id=412">Ver</a> <br />
                    <a href="edita-cliente.php?id=412">Editar</a> <br />
                    <a href="destinatario.php?id=412" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=412&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raul Nalbert</td>
                  <td>Araucária</td>
                  <td>PR</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>41 9954-0097</td>
                  <td>
                    <a href="cliente.php?id=1103">Ver</a> <br />
                    <a href="edita-cliente.php?id=1103">Editar</a> <br />
                    <a href="destinatario.php?id=1103" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1103&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Raulin Carmo de Andrade</td>
                  <td>Goiânia</td>
                  <td>GO</td>
                  <td>andraderaulin7@gmail.com</td>
                  <td>62 9259-5941 </td>
                  <td>cpf: 885.311.551-34 </td>
                  <td>cnpj: 40.292.</td>
                  <td>
                    <a href="cliente.php?id=1052">Ver</a> <br />
                    <a href="edita-cliente.php?id=1052">Editar</a> <br />
                    <a href="destinatario.php?id=1052" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1052&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Regiane Carvalho</td>
                  <td>TATUI</td>
                  <td>SP</td>
                  <td>regiane.sfc@gmail.com</td>
                  <td>(15) 99616-6710 (15) 3251-4031</td>
                  <td>
                    <a href="cliente.php?id=411">Ver</a> <br />
                    <a href="edita-cliente.php?id=411">Editar</a> <br />
                    <a href="destinatario.php?id=411" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=411&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>REGINA SANTOS</td>
                  <td>SÃO LUIZ DO PARAITINGA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>12 9963-10331</td>
                  <td>
                    <a href="cliente.php?id=330">Ver</a> <br />
                    <a href="edita-cliente.php?id=330">Editar</a> <br />
                    <a href="destinatario.php?id=330" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=330&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>REGINA TAVARES</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>ACQUAFLOESSENCIAS@HOTMAIL.COM</td>
                  <td>13 98878-8809/ 3366-0308</td>
                  <td>
                    <a href="cliente.php?id=89">Ver</a> <br />
                    <a href="edita-cliente.php?id=89">Editar</a> <br />
                    <a href="destinatario.php?id=89" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=89&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>REGINALDO DE OLIVEIRA COSTA</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>naldinho_vc2@hotmail.com</td>
                  <td>21 3868-0323</td>
                  <td>
                    <a href="cliente.php?id=149">Ver</a> <br />
                    <a href="edita-cliente.php?id=149">Editar</a> <br />
                    <a href="destinatario.php?id=149" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=149&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Regis Silva</td>
                  <td>Caucaia</td>
                  <td>CE</td>
                  <td>re-08@outlook.com</td>
                  <td>8589713666</td>
                  <td>
                    <a href="cliente.php?id=918">Ver</a> <br />
                    <a href="edita-cliente.php?id=918">Editar</a> <br />
                    <a href="destinatario.php?id=918" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=918&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Reinaldo Brocanelli Junior</td>
                  <td>SÃO BERNARDO DO CAMPO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=413">Ver</a> <br />
                    <a href="edita-cliente.php?id=413">Editar</a> <br />
                    <a href="destinatario.php?id=413" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=413&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>REINALDO DA COSTA MOREIRA NETO - Las Vegas Perfumes</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>contato@lasvegasperfumes.com.br</td>
                  <td>(85)98617-3709</td>
                  <td>
                    <a href="cliente.php?id=235">Ver</a> <br />
                    <a href="edita-cliente.php?id=235">Editar</a> <br />
                    <a href="destinatario.php?id=235" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=235&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rejane Baldez</td>
                  <td>PORTO ALEGRE</td>
                  <td>RS</td>
                  <td>rejanebaldez@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=511">Ver</a> <br />
                    <a href="edita-cliente.php?id=511">Editar</a> <br />
                    <a href="destinatario.php?id=511" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=511&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rejane Bernardo</td>
                  <td>GRAVATAI</td>
                  <td>RS</td>
                  <td>rejane.locacao@gmail.com</td>
                  <td>51-98184-1402</td>
                  <td>
                    <a href="cliente.php?id=435">Ver</a> <br />
                    <a href="edita-cliente.php?id=435">Editar</a> <br />
                    <a href="destinatario.php?id=435" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=435&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rejane Silva da Rocha</td>
                  <td>Jacarepaguá</td>
                  <td>RJ</td>
                  <td>formasabs@gmail.com</td>
                  <td>21 969797267</td>
                  <td>
                    <a href="cliente.php?id=1319">Ver</a> <br />
                    <a href="edita-cliente.php?id=1319">Editar</a> <br />
                    <a href="destinatario.php?id=1319" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1319&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RENAN PIRES</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>nadinesenna@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=607">Ver</a> <br />
                    <a href="edita-cliente.php?id=607">Editar</a> <br />
                    <a href="destinatario.php?id=607" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=607&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RENATO RODRIGUES</td>
                  <td>REGISTRO</td>
                  <td>SP</td>
                  <td>lilian_bernardes@hotmail.com</td>
                  <td>13 38217989</td>
                  <td>
                    <a href="cliente.php?id=48">Ver</a> <br />
                    <a href="edita-cliente.php?id=48">Editar</a> <br />
                    <a href="destinatario.php?id=48" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=48&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RENNE DIOGO</td>
                  <td>Caraúbas</td>
                  <td>RN</td>
                  <td>r3nner_diogo@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=605">Ver</a> <br />
                    <a href="edita-cliente.php?id=605">Editar</a> <br />
                    <a href="destinatario.php?id=605" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=605&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>REVISTA BONSAI</td>
                  <td>CARATINGA</td>
                  <td>MG</td>
                  <td>holyessencias@live.com</td>
                  <td>3384123487</td>
                  <td>
                    <a href="cliente.php?id=653">Ver</a> <br />
                    <a href="edita-cliente.php?id=653">Editar</a> <br />
                    <a href="destinatario.php?id=653" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=653&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ricardo Augusto Pereira Amorim</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>21 97021-7373 </td>
                  <td>cpf:01202347770</td>
                  <td>
                    <a href="cliente.php?id=671">Ver</a> <br />
                    <a href="edita-cliente.php?id=671">Editar</a> <br />
                    <a href="destinatario.php?id=671" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=671&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RICARDO CASTRO</td>
                  <td>IBIPORÃ</td>
                  <td>PR</td>
                  <td>ricardo.castro1806@hotmail.com</td>
                  <td>(43) 31583660 / (43) 96597344,</td>
                  <td>
                    <a href="cliente.php?id=52">Ver</a> <br />
                    <a href="edita-cliente.php?id=52">Editar</a> <br />
                    <a href="destinatario.php?id=52" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=52&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RICARDO DOS SANTOS TEIXEIRA</td>
                  <td>PRESIDENTE PRUDENTE</td>
                  <td>SP</td>
                  <td>diretoria.impactoperfumes@gmail.com</td>
                  <td>18 997391-963</td>
                  <td>
                    <a href="cliente.php?id=80">Ver</a> <br />
                    <a href="edita-cliente.php?id=80">Editar</a> <br />
                    <a href="destinatario.php?id=80" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=80&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RICARDO MOREIRA ( BRASIL COSMÉTICOS)</td>
                  <td>IBICARAÍ</td>
                  <td>BA</td>
                  <td>brasilcosmetics@outlook.com</td>
                  <td>73-3242-1803 /73-98131-274</td>
                  <td>
                    <a href="cliente.php?id=455">Ver</a> <br />
                    <a href="edita-cliente.php?id=455">Editar</a> <br />
                    <a href="destinatario.php?id=455" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=455&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RICHARD PEREIRA DA SILVA</td>
                  <td>belford roxo.</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>21 97934-6538</td>
                  <td>
                    <a href="cliente.php?id=618">Ver</a> <br />
                    <a href="edita-cliente.php?id=618">Editar</a> <br />
                    <a href="destinatario.php?id=618" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=618&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RITA CARUSO</td>
                  <td>SERRA NEGRA</td>
                  <td>SP</td>
                  <td>ritaperfurmesimportados@gmail.com</td>
                  <td>19 3842-3443 / 99804-5570</td>
                  <td>
                    <a href="cliente.php?id=345">Ver</a> <br />
                    <a href="edita-cliente.php?id=345">Editar</a> <br />
                    <a href="destinatario.php?id=345" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=345&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBÉRIO KILDARE VIEIRA DE ARAÚJO</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>roberiokildare88@gmail.com</td>
                  <td>85 8888-5757</td>
                  <td>
                    <a href="cliente.php?id=903">Ver</a> <br />
                    <a href="edita-cliente.php?id=903">Editar</a> <br />
                    <a href="destinatario.php?id=903" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=903&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roberio Soares</td>
                  <td>Nanuque</td>
                  <td>MG</td>
                  <td>central@outlook.com</td>
                  <td>3399884845</td>
                  <td>
                    <a href="cliente.php?id=1037">Ver</a> <br />
                    <a href="edita-cliente.php?id=1037">Editar</a> <br />
                    <a href="destinatario.php?id=1037" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1037&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roberta Kelly Guarnieri Dornellas Perreira</td>
                  <td>Capão Bonito</td>
                  <td>SP</td>
                  <td>roberta@expressaofeminina.com</td>
                  <td>(15) 998415763 /35423615</td>
                  <td>
                    <a href="cliente.php?id=483">Ver</a> <br />
                    <a href="edita-cliente.php?id=483">Editar</a> <br />
                    <a href="destinatario.php?id=483" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=483&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBERTA MONTINGELLI</td>
                  <td>BIGORRILHO</td>
                  <td>PR</td>
                  <td>rmontigelli@gmail.com</td>
                  <td>41 9950 1766</td>
                  <td>
                    <a href="cliente.php?id=378">Ver</a> <br />
                    <a href="edita-cliente.php?id=378">Editar</a> <br />
                    <a href="destinatario.php?id=378" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=378&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBERTA REIS MELO GONÇALVES</td>
                  <td>GOIANIA</td>
                  <td>GO</td>
                  <td>aaa@mail.com</td>
                  <td>6299222009</td>
                  <td>
                    <a href="cliente.php?id=768">Ver</a> <br />
                    <a href="edita-cliente.php?id=768">Editar</a> <br />
                    <a href="destinatario.php?id=768" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=768&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBERTO BORGES PONTES</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>robertoobvitta@gmail.com</td>
                  <td>8599968091 53.803.239/0001-66</td>
                  <td>
                    <a href="cliente.php?id=637">Ver</a> <br />
                    <a href="edita-cliente.php?id=637">Editar</a> <br />
                    <a href="destinatario.php?id=637" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=637&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roberto Carlos Xavier dos Santos</td>
                  <td>São Pedro da Aldeia</td>
                  <td>RJ</td>
                  <td>carlos64xavier@gmail.com</td>
                  <td>22981562628/</td>
                  <td>
                    <a href="cliente.php?id=1244">Ver</a> <br />
                    <a href="edita-cliente.php?id=1244">Editar</a> <br />
                    <a href="destinatario.php?id=1244" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1244&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roberto Rosato de Jesus</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>rosato.jesus@yahoo.com.br</td>
                  <td>021 994638477</td>
                  <td>
                    <a href="cliente.php?id=955">Ver</a> <br />
                    <a href="edita-cliente.php?id=955">Editar</a> <br />
                    <a href="destinatario.php?id=955" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=955&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roberto Rosato de Jesus</td>
                  <td>Rio de janeiro</td>
                  <td>RJ</td>
                  <td>rosato.jesus@yahoo.com.br</td>
                  <td>21994638477</td>
                  <td>
                    <a href="cliente.php?id=1064">Ver</a> <br />
                    <a href="edita-cliente.php?id=1064">Editar</a> <br />
                    <a href="destinatario.php?id=1064" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1064&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBSOM DE ARAUJO BARROS</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>barrosr@gmail.com</td>
                  <td>81 99258-9422 </td>
                  <td>cpf: 69303088468</td>
                  <td>
                    <a href="cliente.php?id=591">Ver</a> <br />
                    <a href="edita-cliente.php?id=591">Editar</a> <br />
                    <a href="destinatario.php?id=591" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=591&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Robsom de Araújo Barros</td>
                  <td>RECIFE</td>
                  <td>PE</td>
                  <td>barrosr@gmail.com</td>
                  <td>81 99258-9422</td>
                  <td>
                    <a href="cliente.php?id=593">Ver</a> <br />
                    <a href="edita-cliente.php?id=593">Editar</a> <br />
                    <a href="destinatario.php?id=593" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=593&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBSON ALVES</td>
                  <td>São Bernardo do Campo</td>
                  <td>SP</td>
                  <td>advantages@hotmail.com</td>
                  <td>(11) 98345-1095 (Tim) e (11) 96786-1379 (Oi)</td>
                  <td>
                    <a href="cliente.php?id=153">Ver</a> <br />
                    <a href="edita-cliente.php?id=153">Editar</a> <br />
                    <a href="destinatario.php?id=153" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=153&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Robson da Silva Rocha</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 99128-0260</td>
                  <td>
                    <a href="cliente.php?id=827">Ver</a> <br />
                    <a href="edita-cliente.php?id=827">Editar</a> <br />
                    <a href="destinatario.php?id=827" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=827&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROBSON ROCHA</td>
                  <td>NOVA CINTRA SANTOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>13991280260</td>
                  <td>
                    <a href="cliente.php?id=789">Ver</a> <br />
                    <a href="edita-cliente.php?id=789">Editar</a> <br />
                    <a href="destinatario.php?id=789" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=789&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Robson Vieira Leão</td>
                  <td>Campinas</td>
                  <td>SP</td>
                  <td>rtja1985@gmail.com</td>
                  <td>19 993550619 </td>
                  <td>cpf/</td>
                  <td>cnpj 27127072817</td>
                  <td>
                    <a href="cliente.php?id=1173">Ver</a> <br />
                    <a href="edita-cliente.php?id=1173">Editar</a> <br />
                    <a href="destinatario.php?id=1173" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1173&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RODOLFO F R SILVA</td>
                  <td>SALTO</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>011 97661-1105</td>
                  <td>
                    <a href="cliente.php?id=562">Ver</a> <br />
                    <a href="edita-cliente.php?id=562">Editar</a> <br />
                    <a href="destinatario.php?id=562" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=562&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rodolfo Lopes Ferreira</td>
                  <td>BELFORD ROXO</td>
                  <td>RJ</td>
                  <td>rodolfolf@yahoo.com.br</td>
                  <td>21 96748-0843</td>
                  <td>
                    <a href="cliente.php?id=851">Ver</a> <br />
                    <a href="edita-cliente.php?id=851">Editar</a> <br />
                    <a href="destinatario.php?id=851" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=851&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RODRIGO FRAMESCHI</td>
                  <td>GOVERNADOR VALADARES</td>
                  <td>MG</td>
                  <td>rodrigoframeschi@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=46">Ver</a> <br />
                    <a href="edita-cliente.php?id=46">Editar</a> <br />
                    <a href="destinatario.php?id=46" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=46&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rodrigo Kauffman</td>
                  <td>São Bernardo</td>
                  <td>SP</td>
                  <td>kauffman.27@gmail.com</td>
                  <td>11 94549-5262 </td>
                  <td>cpf 270 495 528</td>
                  <td>
                    <a href="cliente.php?id=997">Ver</a> <br />
                    <a href="edita-cliente.php?id=997">Editar</a> <br />
                    <a href="destinatario.php?id=997" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=997&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rodrigo Segreto Rosa</td>
                  <td>PATROCÍNIO PAULISTA</td>
                  <td>SP</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>16 981221105 </td>
                  <td>cpf 028.371.527-81</td>
                  <td>
                    <a href="cliente.php?id=700">Ver</a> <br />
                    <a href="edita-cliente.php?id=700">Editar</a> <br />
                    <a href="destinatario.php?id=700" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=700&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rogério Alves</td>
                  <td>Indaiatuba</td>
                  <td>SP</td>
                  <td>alves-rogerio1@hotmail.com</td>
                  <td>19 99305-7171</td>
                  <td>
                    <a href="cliente.php?id=1131">Ver</a> <br />
                    <a href="edita-cliente.php?id=1131">Editar</a> <br />
                    <a href="destinatario.php?id=1131" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1131&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rogério Carneiro dos Santos</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>rogeiocarneiro@gmail.com</td>
                  <td>85-98737-3927 018.394.763-03</td>
                  <td>
                    <a href="cliente.php?id=984">Ver</a> <br />
                    <a href="edita-cliente.php?id=984">Editar</a> <br />
                    <a href="destinatario.php?id=984" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=984&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROGERIO LUIZ DE BITES VIALLE</td>
                  <td>SANTA HELENA</td>
                  <td>MT</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>6584356710</td>
                  <td>
                    <a href="cliente.php?id=744">Ver</a> <br />
                    <a href="edita-cliente.php?id=744">Editar</a> <br />
                    <a href="destinatario.php?id=744" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=744&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rogério Santos</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naofinformado@naoinformado.com</td>
                  <td>21 98776-7509</td>
                  <td>
                    <a href="cliente.php?id=1132">Ver</a> <br />
                    <a href="edita-cliente.php?id=1132">Editar</a> <br />
                    <a href="destinatario.php?id=1132" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1132&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Romildo Andrade</td>
                  <td>não fornecida</td>
                  <td>SP</td>
                  <td>andrade.6102@gmail.com</td>
                  <td>71 98637-0742</td>
                  <td>
                    <a href="cliente.php?id=1204">Ver</a> <br />
                    <a href="edita-cliente.php?id=1204">Editar</a> <br />
                    <a href="destinatario.php?id=1204" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1204&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rômulo Henrique Moreira da Rocha</td>
                  <td>Volta Redonda</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformada.com.br</td>
                  <td>24 99834-2612</td>
                  <td>
                    <a href="cliente.php?id=1350">Ver</a> <br />
                    <a href="edita-cliente.php?id=1350">Editar</a> <br />
                    <a href="destinatario.php?id=1350" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1350&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ronaldo Gonçalves</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>goncaronaldo10@gmail.com</td>
                  <td>(15)98823-0582</td>
                  <td>
                    <a href="cliente.php?id=1219">Ver</a> <br />
                    <a href="edita-cliente.php?id=1219">Editar</a> <br />
                    <a href="destinatario.php?id=1219" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1219&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ronaldo Peres de Sousa</td>
                  <td>IPÚ</td>
                  <td>CE</td>
                  <td>ronaldoipu@hotmail.com</td>
                  <td>88 99673-8783</td>
                  <td>
                    <a href="cliente.php?id=239">Ver</a> <br />
                    <a href="edita-cliente.php?id=239">Editar</a> <br />
                    <a href="destinatario.php?id=239" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=239&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rondinelle Barbosa Gonçalves</td>
                  <td>Manaus</td>
                  <td>AM</td>
                  <td>mecapneusam@gmail.com</td>
                  <td>92 984241709 </td>
                  <td>cnpj: 36665491000137</td>
                  <td>
                    <a href="cliente.php?id=1318">Ver</a> <br />
                    <a href="edita-cliente.php?id=1318">Editar</a> <br />
                    <a href="destinatario.php?id=1318" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1318&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RONILTON SAVIO BERTHOUD</td>
                  <td>ATIBAIA</td>
                  <td>SP</td>
                  <td>perolafragrancias@gmail.com</td>
                  <td>11 97321-5682</td>
                  <td>
                    <a href="cliente.php?id=678">Ver</a> <br />
                    <a href="edita-cliente.php?id=678">Editar</a> <br />
                    <a href="destinatario.php?id=678" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=678&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ronnie Bonete de Souza</td>
                  <td>Manaus</td>
                  <td>AM</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>92 8487-2908</td>
                  <td>
                    <a href="cliente.php?id=1281">Ver</a> <br />
                    <a href="edita-cliente.php?id=1281">Editar</a> <br />
                    <a href="destinatario.php?id=1281" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1281&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ronny Batista</td>
                  <td>Ibicaraí</td>
                  <td>BA</td>
                  <td>ronnyineagles@hotmail.com</td>
                  <td>73 3242-1803 / 73 98195-4512</td>
                  <td>
                    <a href="cliente.php?id=260">Ver</a> <br />
                    <a href="edita-cliente.php?id=260">Editar</a> <br />
                    <a href="destinatario.php?id=260" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=260&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosana Aparecida Gonçalves</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>marciaqroque1970@gmail.com</td>
                  <td>981157651</td>
                  <td>
                    <a href="cliente.php?id=908">Ver</a> <br />
                    <a href="edita-cliente.php?id=908">Editar</a> <br />
                    <a href="destinatario.php?id=908" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=908&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosana Fereira Agostinho</td>
                  <td>Americana</td>
                  <td>SP</td>
                  <td>montecristoakitem@gmail.com</td>
                  <td>19 99660-3600 </td>
                  <td>cpf 319 303 828 80</td>
                  <td>
                    <a href="cliente.php?id=1042">Ver</a> <br />
                    <a href="edita-cliente.php?id=1042">Editar</a> <br />
                    <a href="destinatario.php?id=1042" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1042&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROSANA TORRES</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>rotorres@hotmail.com. br</td>
                  <td>13 98100-1354 </td>
                  <td>cpf 062.2</td>
                  <td>
                    <a href="cliente.php?id=967">Ver</a> <br />
                    <a href="edita-cliente.php?id=967">Editar</a> <br />
                    <a href="destinatario.php?id=967" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=967&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosangela Ana dos Santos Montenegro</td>
                  <td>Araraquara</td>
                  <td>SP</td>
                  <td>rosangela70@hotmail.com</td>
                  <td>16 99785-0756</td>
                  <td>
                    <a href="cliente.php?id=1254">Ver</a> <br />
                    <a href="edita-cliente.php?id=1254">Editar</a> <br />
                    <a href="destinatario.php?id=1254" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1254&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROSANGELA DIAS</td>
                  <td>ITAPETININGA</td>
                  <td>SP</td>
                  <td>rdpg_1@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=342">Ver</a> <br />
                    <a href="edita-cliente.php?id=342">Editar</a> <br />
                    <a href="destinatario.php?id=342" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=342&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROSANGELA DOS SANTOS</td>
                  <td>Pindorama</td>
                  <td>SP</td>
                  <td>ro.with@hotmail.com</td>
                  <td>(17)981284755</td>
                  <td>
                    <a href="cliente.php?id=183">Ver</a> <br />
                    <a href="edita-cliente.php?id=183">Editar</a> <br />
                    <a href="destinatario.php?id=183" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=183&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosangela Rodrigues de Amorim</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>rosangelaamorim81@yahoo.com</td>
                  <td>13991844306</td>
                  <td>
                    <a href="cliente.php?id=929">Ver</a> <br />
                    <a href="edita-cliente.php?id=929">Editar</a> <br />
                    <a href="destinatario.php?id=929" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=929&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rose Hiroko Akahori Motta</td>
                  <td>Taubaté</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>12 98242-4100</td>
                  <td>
                    <a href="cliente.php?id=1145">Ver</a> <br />
                    <a href="edita-cliente.php?id=1145">Editar</a> <br />
                    <a href="destinatario.php?id=1145" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1145&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rose Maria Souza Mendes</td>
                  <td>naoinformada</td>
                  <td>SP</td>
                  <td>roose.mendes@hotmail.com</td>
                  <td>11 94202-1539</td>
                  <td>
                    <a href="cliente.php?id=1220">Ver</a> <br />
                    <a href="edita-cliente.php?id=1220">Editar</a> <br />
                    <a href="destinatario.php?id=1220" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1220&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROSELI DA SILVA OLIVEIRA</td>
                  <td>Belém</td>
                  <td>PA</td>
                  <td>ro3379@gmail.com</td>
                  <td>91 98122-6650</td>
                  <td>
                    <a href="cliente.php?id=1282">Ver</a> <br />
                    <a href="edita-cliente.php?id=1282">Editar</a> <br />
                    <a href="destinatario.php?id=1282" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1282&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosemary do Nascimento das Flores</td>
                  <td>Natal</td>
                  <td>RN</td>
                  <td>mary1425ro@gmail.com</td>
                  <td>84 9670-6991</td>
                  <td>
                    <a href="cliente.php?id=1139">Ver</a> <br />
                    <a href="edita-cliente.php?id=1139">Editar</a> <br />
                    <a href="destinatario.php?id=1139" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1139&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosilene dos Santos da Rocha</td>
                  <td>Joinville</td>
                  <td>SC</td>
                  <td>rosilenedossantos1967@gmail.com</td>
                  <td>47 99628-8247</td>
                  <td>
                    <a href="cliente.php?id=1156">Ver</a> <br />
                    <a href="edita-cliente.php?id=1156">Editar</a> <br />
                    <a href="destinatario.php?id=1156" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1156&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ROSIMEIRE DE OLIVEIRA DA SILVA</td>
                  <td>não informada</td>
                  <td>SP</td>
                  <td>oliveirarosi2907@gmail.com</td>
                  <td>11980781830</td>
                  <td>
                    <a href="cliente.php?id=1083">Ver</a> <br />
                    <a href="edita-cliente.php?id=1083">Editar</a> <br />
                    <a href="destinatario.php?id=1083" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1083&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Rosimeire Sereno Vieira Silva</td>
                  <td>Cedral</td>
                  <td>SP</td>
                  <td>meiresereno@gmail.com</td>
                  <td>17 99628-8601</td>
                  <td>
                    <a href="cliente.php?id=1276">Ver</a> <br />
                    <a href="edita-cliente.php?id=1276">Editar</a> <br />
                    <a href="destinatario.php?id=1276" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1276&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Roydnier Candido da Silva Neiva</td>
                  <td>Catalão</td>
                  <td>GO</td>
                  <td>roydnier@gmail.com</td>
                  <td>64 993199314 </td>
                  <td>cnpj: 52550695000189</td>
                  <td>
                    <a href="cliente.php?id=1337">Ver</a> <br />
                    <a href="edita-cliente.php?id=1337">Editar</a> <br />
                    <a href="destinatario.php?id=1337" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1337&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RUBENS PEREIRA DUARTE</td>
                  <td>APARECIDA DE GOIANIA GO</td>
                  <td>GO</td>
                  <td>RUBENSPDUARTE@GMAIL.COM</td>
                  <td>062 98158 6200</td>
                  <td>
                    <a href="cliente.php?id=589">Ver</a> <br />
                    <a href="edita-cliente.php?id=589">Editar</a> <br />
                    <a href="destinatario.php?id=589" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=589&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>RUBIA C. SOUZA</td>
                  <td>PATROCÍNIO PAULISTA</td>
                  <td>SP</td>
                  <td>rubia@mellinda.com.br</td>
                  <td>1631451216</td>
                  <td>
                    <a href="cliente.php?id=72">Ver</a> <br />
                    <a href="edita-cliente.php?id=72">Editar</a> <br />
                    <a href="destinatario.php?id=72" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=72&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Samuel Almeida</td>
                  <td>SBC</td>
                  <td>SP</td>
                  <td>holyessencias@.com.br</td>
                  <td>11 99020-4242</td>
                  <td>
                    <a href="cliente.php?id=726">Ver</a> <br />
                    <a href="edita-cliente.php?id=726">Editar</a> <br />
                    <a href="destinatario.php?id=726" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=726&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SAMUEL NASCIMENTO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>contabil@teixeiracontabil.com.br</td>
                  <td>13 33247708</td>
                  <td>
                    <a href="cliente.php?id=553">Ver</a> <br />
                    <a href="edita-cliente.php?id=553">Editar</a> <br />
                    <a href="destinatario.php?id=553" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=553&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SAMUEL NOVAIS</td>
                  <td>Jundiai</td>
                  <td>SP</td>
                  <td>samuelnovais-@hotmail.com</td>
                  <td>000000000</td>
                  <td>
                    <a href="cliente.php?id=77">Ver</a> <br />
                    <a href="edita-cliente.php?id=77">Editar</a> <br />
                    <a href="destinatario.php?id=77" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=77&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Samuel Novais e Silva</td>
                  <td>BARRA DA ESTIVA</td>
                  <td>BA</td>
                  <td>sememail@sememail.com</td>
                  <td>77 9858-8580</td>
                  <td>
                    <a href="cliente.php?id=878">Ver</a> <br />
                    <a href="edita-cliente.php?id=878">Editar</a> <br />
                    <a href="destinatario.php?id=878" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=878&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Samuel Trindade de Oliveira</td>
                  <td>Rio de Janeiro - Zona Norte</td>
                  <td>RJ</td>
                  <td>samueltrindade.oliveira00@gmail.com</td>
                  <td>21 99238-6508</td>
                  <td>
                    <a href="cliente.php?id=815">Ver</a> <br />
                    <a href="edita-cliente.php?id=815">Editar</a> <br />
                    <a href="destinatario.php?id=815" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=815&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SAMUEL VIEIRA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>sasylva@ig.com.br</td>
                  <td>11-99961-4107</td>
                  <td>
                    <a href="cliente.php?id=173">Ver</a> <br />
                    <a href="edita-cliente.php?id=173">Editar</a> <br />
                    <a href="destinatario.php?id=173" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=173&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sandoval de oliveira Cavalcante</td>
                  <td>Maceió</td>
                  <td>AL</td>
                  <td>sandovaloliveira284@gmail.com</td>
                  <td></td>
                  <td>cpf: 09508379464 21 99025-8912</td>
                  <td>
                    <a href="cliente.php?id=1288">Ver</a> <br />
                    <a href="edita-cliente.php?id=1288">Editar</a> <br />
                    <a href="destinatario.php?id=1288" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1288&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sandra Marcelina de Moura</td>
                  <td>Suzano</td>
                  <td>SP</td>
                  <td>Sandramoura10@hotmail.com</td>
                  <td>01197131.0059</td>
                  <td>
                    <a href="cliente.php?id=446">Ver</a> <br />
                    <a href="edita-cliente.php?id=446">Editar</a> <br />
                    <a href="destinatario.php?id=446" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=446&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sandro - Maria Rita Cruz Reis</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>mapaddbm@gmail.com</td>
                  <td>21 99607-4122</td>
                  <td>
                    <a href="cliente.php?id=743">Ver</a> <br />
                    <a href="edita-cliente.php?id=743">Editar</a> <br />
                    <a href="destinatario.php?id=743" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=743&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SANDRO - MARIA RITA CRUZ REIS - ( Cascadura )</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>mapaddbm@gmail.com</td>
                  <td>21 99607-4122</td>
                  <td>
                    <a href="cliente.php?id=895">Ver</a> <br />
                    <a href="edita-cliente.php?id=895">Editar</a> <br />
                    <a href="destinatario.php?id=895" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=895&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sandro Roberto Alves</td>
                  <td>Itanha?m</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 996784791</td>
                  <td>
                    <a href="cliente.php?id=721">Ver</a> <br />
                    <a href="edita-cliente.php?id=721">Editar</a> <br />
                    <a href="destinatario.php?id=721" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=721&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SANDRO SPINA</td>
                  <td>Itanhaém</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>13 99678-4791</td>
                  <td>
                    <a href="cliente.php?id=839">Ver</a> <br />
                    <a href="edita-cliente.php?id=839">Editar</a> <br />
                    <a href="destinatario.php?id=839" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=839&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SANTA TEIXEIRA</td>
                  <td>DIADEMA</td>
                  <td>SP</td>
                  <td>lilianbernades@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=387">Ver</a> <br />
                    <a href="edita-cliente.php?id=387">Editar</a> <br />
                    <a href="destinatario.php?id=387" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=387&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SARA ALVES</td>
                  <td>Santa Rita do Passa Quatro</td>
                  <td>SP</td>
                  <td>sarah_sini@hotmail.com</td>
                  <td>19- 99311-9574</td>
                  <td>
                    <a href="cliente.php?id=333">Ver</a> <br />
                    <a href="edita-cliente.php?id=333">Editar</a> <br />
                    <a href="destinatario.php?id=333" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=333&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SARA OTERO MOREIRA</td>
                  <td>Ribeirão Preto</td>
                  <td>SP</td>
                  <td>sarahomoreira@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=527">Ver</a> <br />
                    <a href="edita-cliente.php?id=527">Editar</a> <br />
                    <a href="destinatario.php?id=527" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=527&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sarah Ferreira Menezes</td>
                  <td>Não fornecida</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>não fornecido</td>
                  <td>
                    <a href="cliente.php?id=1020">Ver</a> <br />
                    <a href="edita-cliente.php?id=1020">Editar</a> <br />
                    <a href="destinatario.php?id=1020" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1020&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SAULO KIM VALDEZ GUILHON</td>
                  <td>Manaus</td>
                  <td>AM</td>
                  <td>eng.sauloguilhon@gmail.com</td>
                  <td>92 9438-4800</td>
                  <td>
                    <a href="cliente.php?id=1217">Ver</a> <br />
                    <a href="edita-cliente.php?id=1217">Editar</a> <br />
                    <a href="destinatario.php?id=1217" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1217&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SEBASTIÃO GERONIMO</td>
                  <td>PEDERNEIRAS</td>
                  <td>SP</td>
                  <td>sebastiaogeronimo@bol.com.br</td>
                  <td>(14) 3284-5915</td>
                  <td>
                    <a href="cliente.php?id=144">Ver</a> <br />
                    <a href="edita-cliente.php?id=144">Editar</a> <br />
                    <a href="destinatario.php?id=144" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=144&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SENSUALLE ESSÊNCIAS - AC/ AMÉLIA MARIA CAMPASSI</td>
                  <td>IBITINGA</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>16 3342-6928</td>
                  <td>
                    <a href="cliente.php?id=487">Ver</a> <br />
                    <a href="edita-cliente.php?id=487">Editar</a> <br />
                    <a href="destinatario.php?id=487" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=487&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SERGI MAIA</td>
                  <td>BARRA MANSA</td>
                  <td>RJ</td>
                  <td>segi.maia@yahoo.com.br</td>
                  <td>24 9 7402-3992 / 9 9835-5666</td>
                  <td>
                    <a href="cliente.php?id=347">Ver</a> <br />
                    <a href="edita-cliente.php?id=347">Editar</a> <br />
                    <a href="destinatario.php?id=347" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=347&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SERGIO FERREIRA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>jjhony_sa@hotmail.com</td>
                  <td>85 9 8898-3682 </td>
                  <td>cpf : 017.568.683-10</td>
                  <td>
                    <a href="cliente.php?id=519">Ver</a> <br />
                    <a href="edita-cliente.php?id=519">Editar</a> <br />
                    <a href="destinatario.php?id=519" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=519&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sergio Ferreira da Silva</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>rj.sernil@gmail.com</td>
                  <td>(21) 98117-6660/(21) 3586-7494</td>
                  <td>
                    <a href="cliente.php?id=458">Ver</a> <br />
                    <a href="edita-cliente.php?id=458">Editar</a> <br />
                    <a href="destinatario.php?id=458" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=458&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SHEYLA BUGE</td>
                  <td>VILA VELHA</td>
                  <td>ES</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=332">Ver</a> <br />
                    <a href="edita-cliente.php?id=332">Editar</a> <br />
                    <a href="destinatario.php?id=332" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=332&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Shirley</td>
                  <td>SANTOS</td>
                  <td>RJ</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>3464.1107837</td>
                  <td>
                    <a href="cliente.php?id=696">Ver</a> <br />
                    <a href="edita-cliente.php?id=696">Editar</a> <br />
                    <a href="destinatario.php?id=696" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=696&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SHIRLEY LIMA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>shirley-comercial2@hotmail.com</td>
                  <td>83 3032-7101</td>
                  <td>
                    <a href="cliente.php?id=486">Ver</a> <br />
                    <a href="edita-cliente.php?id=486">Editar</a> <br />
                    <a href="destinatario.php?id=486" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=486&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sidnei Mariano</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>gvt.mariano@hotmail.com</td>
                  <td>13988485339</td>
                  <td>
                    <a href="cliente.php?id=1085">Ver</a> <br />
                    <a href="edita-cliente.php?id=1085">Editar</a> <br />
                    <a href="destinatario.php?id=1085" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1085&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sidney Barbosa</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>21 99705-9177</td>
                  <td>
                    <a href="cliente.php?id=1351">Ver</a> <br />
                    <a href="edita-cliente.php?id=1351">Editar</a> <br />
                    <a href="destinatario.php?id=1351" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1351&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sidney Gonçalves de Camargo</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>sidneygcamargo@yahoo.com.br</td>
                  <td>CEL 13 99647-9637 </td>
                  <td>cpf 97132535820</td>
                  <td>
                    <a href="cliente.php?id=871">Ver</a> <br />
                    <a href="edita-cliente.php?id=871">Editar</a> <br />
                    <a href="destinatario.php?id=871" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=871&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SILVANA SATUCHENGO</td>
                  <td>SANTO ANDRÉ</td>
                  <td>SP</td>
                  <td>ssatuchengo@gmail.com</td>
                  <td>11 987676090</td>
                  <td>
                    <a href="cliente.php?id=328">Ver</a> <br />
                    <a href="edita-cliente.php?id=328">Editar</a> <br />
                    <a href="destinatario.php?id=328" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=328&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Silvane Dlugokenski</td>
                  <td>NONOAI</td>
                  <td>RS</td>
                  <td>silvane_dlugokenski@hotmail.com</td>
                  <td>054 996107404</td>
                  <td>
                    <a href="cliente.php?id=796">Ver</a> <br />
                    <a href="edita-cliente.php?id=796">Editar</a> <br />
                    <a href="destinatario.php?id=796" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=796&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Silvia Marisa Vigato</td>
                  <td>CAMPO GRANDE</td>
                  <td>MS</td>
                  <td>silvia_vigato@hotmail.com</td>
                  <td>(67) 3391-4648 /981452208</td>
                  <td>
                    <a href="cliente.php?id=142">Ver</a> <br />
                    <a href="edita-cliente.php?id=142">Editar</a> <br />
                    <a href="destinatario.php?id=142" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=142&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Silvia Rinaldi</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=355">Ver</a> <br />
                    <a href="edita-cliente.php?id=355">Editar</a> <br />
                    <a href="destinatario.php?id=355" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=355&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Silvio Antônio Gonçalves da Silva</td>
                  <td>0000000000</td>
                  <td>SP</td>
                  <td>silvioatuante@gmail.com</td>
                  <td>014 99834-6929</td>
                  <td>
                    <a href="cliente.php?id=1274">Ver</a> <br />
                    <a href="edita-cliente.php?id=1274">Editar</a> <br />
                    <a href="destinatario.php?id=1274" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1274&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Silvio Antonio Gonçaves da Silva</td>
                  <td>Botucatu</td>
                  <td>SP</td>
                  <td>fajiollitopservice@gmail.com</td>
                  <td>14998346929</td>
                  <td>
                    <a href="cliente.php?id=1301">Ver</a> <br />
                    <a href="edita-cliente.php?id=1301">Editar</a> <br />
                    <a href="destinatario.php?id=1301" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1301&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SILVIO JULIANI</td>
                  <td>AMERICANA</td>
                  <td>SP</td>
                  <td>saboariaflorabrasil@yahoo.com</td>
                  <td>(19) 3012-6005 / (19) 99427-5775</td>
                  <td>
                    <a href="cliente.php?id=352">Ver</a> <br />
                    <a href="edita-cliente.php?id=352">Editar</a> <br />
                    <a href="destinatario.php?id=352" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=352&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SIMONE CELEGHINI ALBINO</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>COSMETICOSESTER@GMAIL.COM</td>
                  <td>31 986739818</td>
                  <td>
                    <a href="cliente.php?id=459">Ver</a> <br />
                    <a href="edita-cliente.php?id=459">Editar</a> <br />
                    <a href="destinatario.php?id=459" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=459&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Simone Ferreira Costa</td>
                  <td>Diadema</td>
                  <td>SP</td>
                  <td>simone-fcosta@bol.com.br</td>
                  <td>(11)948990135</td>
                  <td>
                    <a href="cliente.php?id=482">Ver</a> <br />
                    <a href="edita-cliente.php?id=482">Editar</a> <br />
                    <a href="destinatario.php?id=482" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=482&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Simone Freitas</td>
                  <td>São Sebastião</td>
                  <td>SP</td>
                  <td>simoneabf@hotmail.com</td>
                  <td>(12) 3892.3056</td>
                  <td>
                    <a href="cliente.php?id=530">Ver</a> <br />
                    <a href="edita-cliente.php?id=530">Editar</a> <br />
                    <a href="destinatario.php?id=530" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=530&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Simone Pimenta</td>
                  <td>Araputanga</td>
                  <td>MT</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>43 984776651</td>
                  <td>
                    <a href="cliente.php?id=1340">Ver</a> <br />
                    <a href="edita-cliente.php?id=1340">Editar</a> <br />
                    <a href="destinatario.php?id=1340" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1340&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SIMONE RIBEIRO PERES</td>
                  <td>IBIRITÉ</td>
                  <td>MG</td>
                  <td>charmosaslembrancinhasatelie@gmail.com</td>
                  <td>31 9258-1616</td>
                  <td>
                    <a href="cliente.php?id=64">Ver</a> <br />
                    <a href="edita-cliente.php?id=64">Editar</a> <br />
                    <a href="destinatario.php?id=64" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=64&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SIMONE SOUZA</td>
                  <td>FRANCA</td>
                  <td>SP</td>
                  <td>emporiodasbolhas@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=369">Ver</a> <br />
                    <a href="edita-cliente.php?id=369">Editar</a> <br />
                    <a href="destinatario.php?id=369" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=369&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SIMONE TAVARES</td>
                  <td>SUZANO</td>
                  <td>SP</td>
                  <td>simonenoguei@hotmail.com</td>
                  <td>7880-2536/98181-0513</td>
                  <td>
                    <a href="cliente.php?id=186">Ver</a> <br />
                    <a href="edita-cliente.php?id=186">Editar</a> <br />
                    <a href="destinatario.php?id=186" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=186&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sione Thaíse Oliveira</td>
                  <td>Brasília</td>
                  <td>DF</td>
                  <td>sthaise@gmail.com</td>
                  <td>61 8520-9568</td>
                  <td>
                    <a href="cliente.php?id=817">Ver</a> <br />
                    <a href="edita-cliente.php?id=817">Editar</a> <br />
                    <a href="destinatario.php?id=817" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=817&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sirlen Natália Baima Gomes</td>
                  <td>São José de Ribamar</td>
                  <td>SP</td>
                  <td>sirlenjansen@gmial.com</td>
                  <td>98 8547-3449</td>
                  <td>
                    <a href="cliente.php?id=1201">Ver</a> <br />
                    <a href="edita-cliente.php?id=1201">Editar</a> <br />
                    <a href="destinatario.php?id=1201" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1201&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SK PERFUMES - A/C CARLA MONIZA R. REIS</td>
                  <td>BIRIGUI</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>18 996971334</td>
                  <td>
                    <a href="cliente.php?id=501">Ver</a> <br />
                    <a href="edita-cliente.php?id=501">Editar</a> <br />
                    <a href="destinatario.php?id=501" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=501&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SN FRAGRÂNCIAS - A/C SILVANA NELLI</td>
                  <td>SANTO ANDRÉ</td>
                  <td>SP</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11 98767-6090</td>
                  <td>
                    <a href="cliente.php?id=493">Ver</a> <br />
                    <a href="edita-cliente.php?id=493">Editar</a> <br />
                    <a href="destinatario.php?id=493" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=493&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SOLANGE JANOTA GUIMARÃES</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>solangejanota@gmail.com</td>
                  <td>11 5042-0118 / 99828-4926</td>
                  <td>
                    <a href="cliente.php?id=308">Ver</a> <br />
                    <a href="edita-cliente.php?id=308">Editar</a> <br />
                    <a href="destinatario.php?id=308" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=308&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Solange Quintella</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>solangequintella@hotmail.com</td>
                  <td>0000000</td>
                  <td>
                    <a href="cliente.php?id=351">Ver</a> <br />
                    <a href="edita-cliente.php?id=351">Editar</a> <br />
                    <a href="destinatario.php?id=351" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=351&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Solange Rodrigues - Sol7essencias</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>soldebaly@gmail.com</td>
                  <td>47 99908-2552</td>
                  <td>
                    <a href="cliente.php?id=1095">Ver</a> <br />
                    <a href="edita-cliente.php?id=1095">Editar</a> <br />
                    <a href="destinatario.php?id=1095" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1095&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SOLINEI MARTINI</td>
                  <td>UMUARAMA</td>
                  <td>PR</td>
                  <td>SOLINEIIMPORTADOS@HOTMAIL.COM</td>
                  <td>44 91277080 /67 9.99426155</td>
                  <td>
                    <a href="cliente.php?id=49">Ver</a> <br />
                    <a href="edita-cliente.php?id=49">Editar</a> <br />
                    <a href="destinatario.php?id=49" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=49&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sonia Cristina Silva Hiunes</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>soniahiunes1960@gmail.com</td>
                  <td>21 99848-3284 </td>
                  <td>cpf 88525171700</td>
                  <td>
                    <a href="cliente.php?id=1006">Ver</a> <br />
                    <a href="edita-cliente.php?id=1006">Editar</a> <br />
                    <a href="destinatario.php?id=1006" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1006&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SÔNIA MARIA SANTAELA GARCIA ARAUJO</td>
                  <td>nao fornecida</td>
                  <td>SP</td>
                  <td>garcia.sonia22@outlook.com</td>
                  <td>44 99974-4658</td>
                  <td>
                    <a href="cliente.php?id=1096">Ver</a> <br />
                    <a href="edita-cliente.php?id=1096">Editar</a> <br />
                    <a href="destinatario.php?id=1096" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1096&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sônia Maria Santaela Garcia Araujo</td>
                  <td>Cunha</td>
                  <td>SP</td>
                  <td>garciasonia22@outlook.com</td>
                  <td>44 999744658 </td>
                  <td>cpf 060404839/46</td>
                  <td>
                    <a href="cliente.php?id=1133">Ver</a> <br />
                    <a href="edita-cliente.php?id=1133">Editar</a> <br />
                    <a href="destinatario.php?id=1133" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1133&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SONIA PINHEIRO</td>
                  <td>Águas de São Pedro</td>
                  <td>SP</td>
                  <td>liianbernardes@hotmail.com</td>
                  <td>11 968281807</td>
                  <td>
                    <a href="cliente.php?id=274">Ver</a> <br />
                    <a href="edita-cliente.php?id=274">Editar</a> <br />
                    <a href="destinatario.php?id=274" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=274&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SONIA TEREZINHA DE ARAUJO ARMANI</td>
                  <td>BELO HORIZONTE</td>
                  <td>MG</td>
                  <td>holyessencias@live.com</td>
                  <td>031 32882876</td>
                  <td>
                    <a href="cliente.php?id=785">Ver</a> <br />
                    <a href="edita-cliente.php?id=785">Editar</a> <br />
                    <a href="destinatario.php?id=785" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=785&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Stefanny Dayane Marciano Sousa</td>
                  <td>Goiania</td>
                  <td>GO</td>
                  <td>lollacasaecorpo@gmail.com</td>
                  <td>6291995258</td>
                  <td>
                    <a href="cliente.php?id=1172">Ver</a> <br />
                    <a href="edita-cliente.php?id=1172">Editar</a> <br />
                    <a href="destinatario.php?id=1172" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1172&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Stephany Oliveira Fernandes</td>
                  <td>Sao Leopoldo</td>
                  <td>RS</td>
                  <td>ateph.fernandes.oliv@gmail.com</td>
                  <td>5198712188</td>
                  <td>
                    <a href="cliente.php?id=1112">Ver</a> <br />
                    <a href="edita-cliente.php?id=1112">Editar</a> <br />
                    <a href="destinatario.php?id=1112" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1112&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sueli Benevento</td>
                  <td>PRAIA GRANDE</td>
                  <td>SP</td>
                  <td>Suelibenevento@gmail.com</td>
                  <td>(011) 98550.8768</td>
                  <td>
                    <a href="cliente.php?id=579">Ver</a> <br />
                    <a href="edita-cliente.php?id=579">Editar</a> <br />
                    <a href="destinatario.php?id=579" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=579&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Sueli Favero</td>
                  <td>Sao paulo</td>
                  <td>SP</td>
                  <td>suelifavero02@gmail.com</td>
                  <td>(11) 2653-5633 93038-7536 </td>
                  <td>cpf 254128758 58</td>
                  <td>
                    <a href="cliente.php?id=156">Ver</a> <br />
                    <a href="edita-cliente.php?id=156">Editar</a> <br />
                    <a href="destinatario.php?id=156" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=156&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SUELI PEREIRA BARBOSA</td>
                  <td>CUIABÁ</td>
                  <td>MT</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=300">Ver</a> <br />
                    <a href="edita-cliente.php?id=300">Editar</a> <br />
                    <a href="destinatario.php?id=300" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=300&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>SUELI SCARPANTI SILVA</td>
                  <td>ITUPEVA</td>
                  <td>SP</td>
                  <td>sueliscarpanti@hotmail.com</td>
                  <td>11 996622536</td>
                  <td>
                    <a href="cliente.php?id=65">Ver</a> <br />
                    <a href="edita-cliente.php?id=65">Editar</a> <br />
                    <a href="destinatario.php?id=65" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=65&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Susana Bianque</td>
                  <td>Américo Brasiliense</td>
                  <td>SP</td>
                  <td>bianque.novidades@hotmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=525">Ver</a> <br />
                    <a href="edita-cliente.php?id=525">Editar</a> <br />
                    <a href="destinatario.php?id=525" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=525&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Susi Cristiani Paschoalim</td>
                  <td>Primavera do Leste</td>
                  <td>MT</td>
                  <td>paschoalims7@gmail.com</td>
                  <td>66 8436-7784 </td>
                  <td>cpf: 763.071.311-87</td>
                  <td>
                    <a href="cliente.php?id=1327">Ver</a> <br />
                    <a href="edita-cliente.php?id=1327">Editar</a> <br />
                    <a href="destinatario.php?id=1327" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1327&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Suzana Bezerra Spuldaro Freitas</td>
                  <td>Altamira</td>
                  <td>PA</td>
                  <td>suzanabspuldaro@gmail.com</td>
                  <td>Tel: 93 99191-6471 </td>
                  <td>cpf 54689740291</td>
                  <td>
                    <a href="cliente.php?id=1030">Ver</a> <br />
                    <a href="edita-cliente.php?id=1030">Editar</a> <br />
                    <a href="destinatario.php?id=1030" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1030&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Suzy Pinheiro</td>
                  <td>Fortaleza</td>
                  <td>CE</td>
                  <td>suzy.pinheiro@hotmail.com</td>
                  <td>85 8869-3172 / 85 9913-5477</td>
                  <td>
                    <a href="cliente.php?id=94">Ver</a> <br />
                    <a href="edita-cliente.php?id=94">Editar</a> <br />
                    <a href="destinatario.php?id=94" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=94&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Taiane Rosa Cruz Costa</td>
                  <td>Salvador</td>
                  <td>BA</td>
                  <td>dtudosasa@gmail.com</td>
                  <td>71 99615-8557 </td>
                  <td>cnpj: 44.680.315/0001-00</td>
                  <td>
                    <a href="cliente.php?id=1019">Ver</a> <br />
                    <a href="edita-cliente.php?id=1019">Editar</a> <br />
                    <a href="destinatario.php?id=1019" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1019&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TAINÃ FREIRE</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>nadinesenna@hotmail.com</td>
                  <td>11 987684380</td>
                  <td>
                    <a href="cliente.php?id=612">Ver</a> <br />
                    <a href="edita-cliente.php?id=612">Editar</a> <br />
                    <a href="destinatario.php?id=612" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=612&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TALES CIRÍACO</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>exclusiveparfums@outlook.com</td>
                  <td>85 88088048 / 85 96962633</td>
                  <td>
                    <a href="cliente.php?id=100">Ver</a> <br />
                    <a href="edita-cliente.php?id=100">Editar</a> <br />
                    <a href="destinatario.php?id=100" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=100&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TALITA FRAPORTI</td>
                  <td>Chapecó</td>
                  <td>SC</td>
                  <td>talitafraporti@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=238">Ver</a> <br />
                    <a href="edita-cliente.php?id=238">Editar</a> <br />
                    <a href="destinatario.php?id=238" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=238&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Talita kuster Portela</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>emailnaofornecido@naosei.com</td>
                  <td>21 99343-6417 </td>
                  <td>cnpj: 41.374.449/0001-05</td>
                  <td>
                    <a href="cliente.php?id=976">Ver</a> <br />
                    <a href="edita-cliente.php?id=976">Editar</a> <br />
                    <a href="destinatario.php?id=976" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=976&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tallison Morais</td>
                  <td>APODI</td>
                  <td>RN</td>
                  <td>tallisonmorais30@gmail.com</td>
                  <td>(84) 99153-3440</td>
                  <td>
                    <a href="cliente.php?id=289">Ver</a> <br />
                    <a href="edita-cliente.php?id=289">Editar</a> <br />
                    <a href="destinatario.php?id=289" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=289&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tamylles Maria da Silva</td>
                  <td>Universitaria - Maceio</td>
                  <td>AL</td>
                  <td>exitosistemas.mcz.al@gmail.com</td>
                  <td>8287019894</td>
                  <td>
                    <a href="cliente.php?id=1321">Ver</a> <br />
                    <a href="edita-cliente.php?id=1321">Editar</a> <br />
                    <a href="destinatario.php?id=1321" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1321&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TARCIZO MIGUEL DOS SANTOS</td>
                  <td>PENEDO</td>
                  <td>AL</td>
                  <td>tarcizomiguel@gmail.com</td>
                  <td>7799391846</td>
                  <td>
                    <a href="cliente.php?id=710">Ver</a> <br />
                    <a href="edita-cliente.php?id=710">Editar</a> <br />
                    <a href="destinatario.php?id=710" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=710&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tatiana Vasquez</td>
                  <td>Macapá</td>
                  <td>AP</td>
                  <td>tatianavr1909@gmail.com</td>
                  <td>57 312 2734610 </td>
                  <td>cpf 12222679184</td>
                  <td>
                    <a href="cliente.php?id=1347">Ver</a> <br />
                    <a href="edita-cliente.php?id=1347">Editar</a> <br />
                    <a href="destinatario.php?id=1347" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1347&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tatiane Campos Vidal</td>
                  <td>Lagoa da Prata</td>
                  <td>MG</td>
                  <td>tatitatylp@hotmail.com</td>
                  <td>3798213465</td>
                  <td>
                    <a href="cliente.php?id=1270">Ver</a> <br />
                    <a href="edita-cliente.php?id=1270">Editar</a> <br />
                    <a href="destinatario.php?id=1270" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1270&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tatiane Campos Vidal</td>
                  <td>Lagoa da Prata</td>
                  <td>MG</td>
                  <td>tatitatylp@hotmail.com</td>
                  <td>3798213465</td>
                  <td>
                    <a href="cliente.php?id=1271">Ver</a> <br />
                    <a href="edita-cliente.php?id=1271">Editar</a> <br />
                    <a href="destinatario.php?id=1271" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1271&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tatiane Gleria</td>
                  <td>santos</td>
                  <td>SP</td>
                  <td>marciaqroque1970@gmail.com</td>
                  <td>981568527</td>
                  <td>
                    <a href="cliente.php?id=852">Ver</a> <br />
                    <a href="edita-cliente.php?id=852">Editar</a> <br />
                    <a href="destinatario.php?id=852" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=852&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tatiane Silva</td>
                  <td>Osasco</td>
                  <td>SP</td>
                  <td>tatianesilva.j7@gmail.com</td>
                  <td>00000000</td>
                  <td>
                    <a href="cliente.php?id=254">Ver</a> <br />
                    <a href="edita-cliente.php?id=254">Editar</a> <br />
                    <a href="destinatario.php?id=254" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=254&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TATIANE SIMÕES</td>
                  <td>SÃO BERNARDO DO CAMPO</td>
                  <td>SP</td>
                  <td>tatisbc85@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=366">Ver</a> <br />
                    <a href="edita-cliente.php?id=366">Editar</a> <br />
                    <a href="destinatario.php?id=366" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=366&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TATIELY FERNANDA DA SILVA</td>
                  <td>Não fornecida</td>
                  <td>PR</td>
                  <td>tatielyes@gmail.com</td>
                  <td>44 99702 3734</td>
                  <td>
                    <a href="cliente.php?id=1110">Ver</a> <br />
                    <a href="edita-cliente.php?id=1110">Editar</a> <br />
                    <a href="destinatario.php?id=1110" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1110&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Taynah Cecília Camargos Leão</td>
                  <td>Divinópolis</td>
                  <td>MG</td>
                  <td>taynahleao782@gmail.com</td>
                  <td>37 99831-8275 </td>
                  <td>cpf: 13639701607</td>
                  <td>
                    <a href="cliente.php?id=1012">Ver</a> <br />
                    <a href="edita-cliente.php?id=1012">Editar</a> <br />
                    <a href="destinatario.php?id=1012" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1012&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Telma Vieira</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>telma.vieira2011@gmail.com</td>
                  <td>21971083092</td>
                  <td>
                    <a href="cliente.php?id=1357">Ver</a> <br />
                    <a href="edita-cliente.php?id=1357">Editar</a> <br />
                    <a href="destinatario.php?id=1357" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1357&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Telma Vieira</td>
                  <td>Rio de Janeiro</td>
                  <td>RJ</td>
                  <td>telma.vieira2011@gmail.com</td>
                  <td>21971083092</td>
                  <td>
                    <a href="cliente.php?id=1358">Ver</a> <br />
                    <a href="edita-cliente.php?id=1358">Editar</a> <br />
                    <a href="destinatario.php?id=1358" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1358&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Teste</td>
                  <td>teste</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>99999999</td>
                  <td>
                    <a href="cliente.php?id=1311">Ver</a> <br />
                    <a href="edita-cliente.php?id=1311">Editar</a> <br />
                    <a href="destinatario.php?id=1311" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1311&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thabata Rufino Xavier</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>organizatha@outlook.com</td>
                  <td>13991618455</td>
                  <td>
                    <a href="cliente.php?id=1323">Ver</a> <br />
                    <a href="edita-cliente.php?id=1323">Editar</a> <br />
                    <a href="destinatario.php?id=1323" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1323&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thabata Rufino Xavier</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>organizatha@outlook.com</td>
                  <td>13991618455</td>
                  <td>
                    <a href="cliente.php?id=1324">Ver</a> <br />
                    <a href="edita-cliente.php?id=1324">Editar</a> <br />
                    <a href="destinatario.php?id=1324" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1324&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>thais Cremasco</td>
                  <td>Vitoria</td>
                  <td>ES</td>
                  <td>thais.cremasco06@gmail.com</td>
                  <td>27997691107</td>
                  <td>
                    <a href="cliente.php?id=1165">Ver</a> <br />
                    <a href="edita-cliente.php?id=1165">Editar</a> <br />
                    <a href="destinatario.php?id=1165" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1165&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THAIS DA SILVA FERNANDES</td>
                  <td>VARJOTA</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8896001746</td>
                  <td>
                    <a href="cliente.php?id=799">Ver</a> <br />
                    <a href="edita-cliente.php?id=799">Editar</a> <br />
                    <a href="destinatario.php?id=799" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=799&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THAIS LEME</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>thsleme@gmail.com</td>
                  <td>13 3301-7387</td>
                  <td>
                    <a href="cliente.php?id=425">Ver</a> <br />
                    <a href="edita-cliente.php?id=425">Editar</a> <br />
                    <a href="destinatario.php?id=425" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=425&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THAIS NUNES</td>
                  <td>Caucaia</td>
                  <td>CE</td>
                  <td>thaisnunes214@gmail.com</td>
                  <td>85 9640-1938 </td>
                  <td>cnpj: 26985914/0001-42</td>
                  <td>
                    <a href="cliente.php?id=886">Ver</a> <br />
                    <a href="edita-cliente.php?id=886">Editar</a> <br />
                    <a href="destinatario.php?id=886" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=886&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thais Rodrigues - (Pet Petisco)</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>thais_lupo@hotmail.com</td>
                  <td>13 988227433</td>
                  <td>
                    <a href="cliente.php?id=586">Ver</a> <br />
                    <a href="edita-cliente.php?id=586">Editar</a> <br />
                    <a href="destinatario.php?id=586" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=586&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THALISSON DE OLIVEIRA</td>
                  <td>CANINDEZINHO- FORTALEZA</td>
                  <td>CE</td>
                  <td>thalissonmota012@gmail.com</td>
                  <td>85 988546094 / </td>
                  <td>cpf -061962293-89</td>
                  <td>
                    <a href="cliente.php?id=542">Ver</a> <br />
                    <a href="edita-cliente.php?id=542">Editar</a> <br />
                    <a href="destinatario.php?id=542" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=542&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THALYTA</td>
                  <td>SÃO VICENTE</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=515">Ver</a> <br />
                    <a href="edita-cliente.php?id=515">Editar</a> <br />
                    <a href="destinatario.php?id=515" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=515&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thammara Santiago de Andrade</td>
                  <td>Goiania</td>
                  <td>GO</td>
                  <td>santine.cosmeticos@gmail.com</td>
                  <td>6285467269</td>
                  <td>
                    <a href="cliente.php?id=1087">Ver</a> <br />
                    <a href="edita-cliente.php?id=1087">Editar</a> <br />
                    <a href="destinatario.php?id=1087" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1087&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THAYANA CAVALCANTE</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>8588250725</td>
                  <td>
                    <a href="cliente.php?id=791">Ver</a> <br />
                    <a href="edita-cliente.php?id=791">Editar</a> <br />
                    <a href="destinatario.php?id=791" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=791&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thayane Álvares Costa</td>
                  <td>Guatabira</td>
                  <td>PB</td>
                  <td>thayanealvaressc@gmail.com</td>
                  <td>83 8178-7353</td>
                  <td>
                    <a href="cliente.php?id=1236">Ver</a> <br />
                    <a href="edita-cliente.php?id=1236">Editar</a> <br />
                    <a href="destinatario.php?id=1236" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1236&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THAYS SOUSA DA SILVA</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>thays__sousa@hotmail.com</td>
                  <td>13 991293136</td>
                  <td>
                    <a href="cliente.php?id=263">Ver</a> <br />
                    <a href="edita-cliente.php?id=263">Editar</a> <br />
                    <a href="destinatario.php?id=263" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=263&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thiago Cascales</td>
                  <td>Itaim Paulista SP</td>
                  <td>SP</td>
                  <td>thiagocascales@hotmail.com</td>
                  <td>11944721916</td>
                  <td>
                    <a href="cliente.php?id=941">Ver</a> <br />
                    <a href="edita-cliente.php?id=941">Editar</a> <br />
                    <a href="destinatario.php?id=941" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=941&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THIAGO CORREIA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=431">Ver</a> <br />
                    <a href="edita-cliente.php?id=431">Editar</a> <br />
                    <a href="destinatario.php?id=431" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=431&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thiago de Carvalho Cruz</td>
                  <td>Rio de Janeiro</td>
                  <td>SP</td>
                  <td>thiago.carvalho0108@gmail.com</td>
                  <td>21 97916-1173</td>
                  <td>
                    <a href="cliente.php?id=1232">Ver</a> <br />
                    <a href="edita-cliente.php?id=1232">Editar</a> <br />
                    <a href="destinatario.php?id=1232" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1232&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thiago Dias dos Santos Cascales</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11934978407</td>
                  <td>
                    <a href="cliente.php?id=800">Ver</a> <br />
                    <a href="edita-cliente.php?id=800">Editar</a> <br />
                    <a href="destinatario.php?id=800" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=800&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THIAGO GOMEZ FERRAIOLO GASPAR</td>
                  <td>RIO DO JANEIRO RJ</td>
                  <td>RJ</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>21998375301</td>
                  <td>
                    <a href="cliente.php?id=747">Ver</a> <br />
                    <a href="edita-cliente.php?id=747">Editar</a> <br />
                    <a href="destinatario.php?id=747" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=747&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thiago Henrique Cordeiro Cavalcanti</td>
                  <td>Cabo de Santo Agostinho</td>
                  <td>PE</td>
                  <td>Thiagocavalcanti2011@gmail.com</td>
                  <td>8196535637</td>
                  <td>
                    <a href="cliente.php?id=1161">Ver</a> <br />
                    <a href="edita-cliente.php?id=1161">Editar</a> <br />
                    <a href="destinatario.php?id=1161" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1161&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THIAGO MANSINHO</td>
                  <td>Ferraz de Vasconcelos</td>
                  <td>SP</td>
                  <td>thiago.mansinho@lidertel.com.br</td>
                  <td>11991433069</td>
                  <td>
                    <a href="cliente.php?id=20">Ver</a> <br />
                    <a href="edita-cliente.php?id=20">Editar</a> <br />
                    <a href="destinatario.php?id=20" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=20&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Thiago Mansinho - Trabalho</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>thiago.mansinho@lidertel.com.br</td>
                  <td>11-91288-8688</td>
                  <td>
                    <a href="cliente.php?id=904">Ver</a> <br />
                    <a href="edita-cliente.php?id=904">Editar</a> <br />
                    <a href="destinatario.php?id=904" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=904&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>THIAGO PEREIRA</td>
                  <td>RIO GRANDE</td>
                  <td>RS</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>595985443885</td>
                  <td>
                    <a href="cliente.php?id=763">Ver</a> <br />
                    <a href="edita-cliente.php?id=763">Editar</a> <br />
                    <a href="destinatario.php?id=763" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=763&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tiago Rocha</td>
                  <td>Ferraz de Vasconcelos</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>11 91288-8688 230.513.278-</td>
                  <td>
                    <a href="cliente.php?id=1008">Ver</a> <br />
                    <a href="edita-cliente.php?id=1008">Editar</a> <br />
                    <a href="destinatario.php?id=1008" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1008&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Tiago Virques</td>
                  <td>Guaruja</td>
                  <td>SP</td>
                  <td>thiagovirques@gmail.com</td>
                  <td>9921265665</td>
                  <td>
                    <a href="cliente.php?id=934">Ver</a> <br />
                    <a href="edita-cliente.php?id=934">Editar</a> <br />
                    <a href="destinatario.php?id=934" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=934&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TRANS MINAS TRANSPORTES LTDA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>sp@transminas.net.br</td>
                  <td>112987-1191</td>
                  <td>
                    <a href="cliente.php?id=698">Ver</a> <br />
                    <a href="edita-cliente.php?id=698">Editar</a> <br />
                    <a href="destinatario.php?id=698" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=698&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TRANSPORTADORA ECONOMICA - A/C CONFERENTE</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>1142180909</td>
                  <td>
                    <a href="cliente.php?id=645">Ver</a> <br />
                    <a href="edita-cliente.php?id=645">Editar</a> <br />
                    <a href="destinatario.php?id=645" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=645&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>TRANSPORTADORA EXPRESSO M 2000</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>comercial3@expressom2000.com.br</td>
                  <td>11 2179-0200</td>
                  <td>
                    <a href="cliente.php?id=649">Ver</a> <br />
                    <a href="edita-cliente.php?id=649">Editar</a> <br />
                    <a href="destinatario.php?id=649" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=649&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ubiraci A Silva</td>
                  <td>Franco da Rocha</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11975823968</td>
                  <td>
                    <a href="cliente.php?id=704">Ver</a> <br />
                    <a href="edita-cliente.php?id=704">Editar</a> <br />
                    <a href="destinatario.php?id=704" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=704&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ubirajara ( Mari Cabelereira )</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>HOLYESSENCIAS@LIVE.COM</td>
                  <td>3271-7095</td>
                  <td>
                    <a href="cliente.php?id=194">Ver</a> <br />
                    <a href="edita-cliente.php?id=194">Editar</a> <br />
                    <a href="destinatario.php?id=194" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=194&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>UN PARFUMS - EDUARDODE MORAIS - ANA PAULA ROZENO</td>
                  <td>ASSIS</td>
                  <td>SP</td>
                  <td>UMPARFUMS@OUTLOOK.COM.BR</td>
                  <td>18 996599943 </td>
                  <td>cnpj 17912431000127 IE 189332198119</td>
                  <td>
                    <a href="cliente.php?id=1354">Ver</a> <br />
                    <a href="edita-cliente.php?id=1354">Editar</a> <br />
                    <a href="destinatario.php?id=1354" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1354&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Univaldo Martins Junior</td>
                  <td>Aparecida do Rio Doce GO</td>
                  <td>GO</td>
                  <td>univaldoj@hotmail.com</td>
                  <td>64992804360</td>
                  <td>
                    <a href="cliente.php?id=1080">Ver</a> <br />
                    <a href="edita-cliente.php?id=1080">Editar</a> <br />
                    <a href="destinatario.php?id=1080" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1080&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Ursula de Souza farias</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>ursulasouzaf12@gmail.com</td>
                  <td>13997642412</td>
                  <td>
                    <a href="cliente.php?id=1066">Ver</a> <br />
                    <a href="edita-cliente.php?id=1066">Editar</a> <br />
                    <a href="destinatario.php?id=1066" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1066&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VAGNER CARVALHO</td>
                  <td>ITU</td>
                  <td>SP</td>
                  <td>ninacristyperfumes@gmail.com</td>
                  <td>(11) 97336-3352</td>
                  <td>
                    <a href="cliente.php?id=172">Ver</a> <br />
                    <a href="edita-cliente.php?id=172">Editar</a> <br />
                    <a href="destinatario.php?id=172" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=172&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VALDETE SIRLEI MEIRA</td>
                  <td>SÃO PAULO</td>
                  <td>SP</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>11957950694</td>
                  <td>
                    <a href="cliente.php?id=475">Ver</a> <br />
                    <a href="edita-cliente.php?id=475">Editar</a> <br />
                    <a href="destinatario.php?id=475" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=475&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VALDISON BATISTA DA SILVA / BURANA COSMÉTICOS</td>
                  <td>ITABERAÍ</td>
                  <td>GO</td>
                  <td>compras@buranacosmeticos.com</td>
                  <td>62 3375-4099</td>
                  <td>
                    <a href="cliente.php?id=485">Ver</a> <br />
                    <a href="edita-cliente.php?id=485">Editar</a> <br />
                    <a href="destinatario.php?id=485" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=485&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Valéria Candida Costa e Silva</td>
                  <td>Goiânia</td>
                  <td>GO</td>
                  <td>lilianbernardes@gmail.com</td>
                  <td>11974919632</td>
                  <td>
                    <a href="cliente.php?id=581">Ver</a> <br />
                    <a href="edita-cliente.php?id=581">Editar</a> <br />
                    <a href="destinatario.php?id=581" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=581&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Valnei Kohlrausc</td>
                  <td>Jaraguá do Sul</td>
                  <td>SC</td>
                  <td>kvalnei@gmail.com</td>
                  <td>(47) 99196-0552 </td>
                  <td>cpf: 977.511.380-68</td>
                  <td>
                    <a href="cliente.php?id=1078">Ver</a> <br />
                    <a href="edita-cliente.php?id=1078">Editar</a> <br />
                    <a href="destinatario.php?id=1078" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1078&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VALTER CARDOSO</td>
                  <td>PINDAMONHANGABA</td>
                  <td>SP</td>
                  <td>SEMEMAIL@SEMEMAIL.COM</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=208">Ver</a> <br />
                    <a href="edita-cliente.php?id=208">Editar</a> <br />
                    <a href="destinatario.php?id=208" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=208&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vanderlei Luis Leonhardt</td>
                  <td>Tres de Maio</td>
                  <td>RS</td>
                  <td>vanderleiluis.tm@hotmail.com</td>
                  <td>5596573255</td>
                  <td>
                    <a href="cliente.php?id=1241">Ver</a> <br />
                    <a href="edita-cliente.php?id=1241">Editar</a> <br />
                    <a href="destinatario.php?id=1241" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1241&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vanderlei Luis Leonhardt</td>
                  <td>Tres de Maio</td>
                  <td>RS</td>
                  <td>vanderleiluis.tm@hotmail.com</td>
                  <td>5596573255</td>
                  <td>
                    <a href="cliente.php?id=1242">Ver</a> <br />
                    <a href="edita-cliente.php?id=1242">Editar</a> <br />
                    <a href="destinatario.php?id=1242" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1242&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VANDERLEY DE JESUS ( A/C VAN) - Laboratório LPI</td>
                  <td>ITABUNA</td>
                  <td>BA</td>
                  <td>vandosaude@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=436">Ver</a> <br />
                    <a href="edita-cliente.php?id=436">Editar</a> <br />
                    <a href="destinatario.php?id=436" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=436&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VANDERSON FERREIRA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>vandersonsilva.contato@gmail.com</td>
                  <td>85996696132</td>
                  <td>
                    <a href="cliente.php?id=634">Ver</a> <br />
                    <a href="edita-cliente.php?id=634">Editar</a> <br />
                    <a href="destinatario.php?id=634" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=634&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VANESSA (POÁ PARFUM)</td>
                  <td>ARIRIBÁ- BALNEÁRIO Camboriu</td>
                  <td>SC</td>
                  <td>holyessencias@live.com</td>
                  <td>47 96063077</td>
                  <td>
                    <a href="cliente.php?id=137">Ver</a> <br />
                    <a href="edita-cliente.php?id=137">Editar</a> <br />
                    <a href="destinatario.php?id=137" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=137&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VANESSA / ROBERTO</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=639">Ver</a> <br />
                    <a href="edita-cliente.php?id=639">Editar</a> <br />
                    <a href="destinatario.php?id=639" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=639&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vânia Crestani</td>
                  <td>DOIS IRMÃOS</td>
                  <td>RS</td>
                  <td>banhomaria@bol.com.br</td>
                  <td>0000000000</td>
                  <td>
                    <a href="cliente.php?id=617">Ver</a> <br />
                    <a href="edita-cliente.php?id=617">Editar</a> <br />
                    <a href="destinatario.php?id=617" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=617&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vânia dos Santos Marques</td>
                  <td>Pedro Leopoldo</td>
                  <td>MG</td>
                  <td>financeirolojaoi@hotmail.com</td>
                  <td>000000</td>
                  <td>
                    <a href="cliente.php?id=736">Ver</a> <br />
                    <a href="edita-cliente.php?id=736">Editar</a> <br />
                    <a href="destinatario.php?id=736" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=736&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vania Nobre</td>
                  <td>Fortaleza CE</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>08586511513</td>
                  <td>
                    <a href="cliente.php?id=900">Ver</a> <br />
                    <a href="edita-cliente.php?id=900">Editar</a> <br />
                    <a href="destinatario.php?id=900" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=900&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vânia Regina Ferreira de Lima</td>
                  <td>Carapicuíba</td>
                  <td>SP</td>
                  <td>vanialima82@hotmail.com</td>
                  <td>11 96949-7062 </td>
                  <td>cpf 321.876.668.08</td>
                  <td>
                    <a href="cliente.php?id=1044">Ver</a> <br />
                    <a href="edita-cliente.php?id=1044">Editar</a> <br />
                    <a href="destinatario.php?id=1044" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1044&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VANIA RODRIGUES LOBO VIANA</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>vania.loboviana@gmail.com</td>
                  <td>11 5827-2635</td>
                  <td>
                    <a href="cliente.php?id=148">Ver</a> <br />
                    <a href="edita-cliente.php?id=148">Editar</a> <br />
                    <a href="destinatario.php?id=148" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=148&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vanja Maria Tenório - São Jerônimo</td>
                  <td>naofornecida</td>
                  <td>SP</td>
                  <td>vanjamtenorio@gmail.com</td>
                  <td>69992402670</td>
                  <td>
                    <a href="cliente.php?id=1036">Ver</a> <br />
                    <a href="edita-cliente.php?id=1036">Editar</a> <br />
                    <a href="destinatario.php?id=1036" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1036&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vanusa Rodrigues de Castro</td>
                  <td>Rio de Janeiro</td>
                  <td>SP</td>
                  <td>VANUSARCASTRO@GMAIL.COM</td>
                  <td>21 9 8441-5854 </td>
                  <td>cpf: 13717174789</td>
                  <td>
                    <a href="cliente.php?id=986">Ver</a> <br />
                    <a href="edita-cliente.php?id=986">Editar</a> <br />
                    <a href="destinatario.php?id=986" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=986&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VENEZA COSMÉTICOS / AC - LEONARDO</td>
                  <td>CAMBÉ</td>
                  <td>PR</td>
                  <td>leonardo@terc.vnz.ind.br</td>
                  <td>43 3154-7000 </td>
                  <td>cnpj: 02705260/0001-98</td>
                  <td>
                    <a href="cliente.php?id=919">Ver</a> <br />
                    <a href="edita-cliente.php?id=919">Editar</a> <br />
                    <a href="destinatario.php?id=919" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=919&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vênus Olyvier</td>
                  <td>MUQUI</td>
                  <td>ES</td>
                  <td>lilianbernardes@hotmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=400">Ver</a> <br />
                    <a href="edita-cliente.php?id=400">Editar</a> <br />
                    <a href="destinatario.php?id=400" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=400&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VERA LUCIA BARROS DA SILVA</td>
                  <td>PETROLINA</td>
                  <td>PE</td>
                  <td>verinha@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=892">Ver</a> <br />
                    <a href="edita-cliente.php?id=892">Editar</a> <br />
                    <a href="destinatario.php?id=892" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=892&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vera Lucia Santos Guedes</td>
                  <td>Pedra Branca do Amaparí</td>
                  <td>AP</td>
                  <td>franciscobispo.ap@gmail.com</td>
                  <td>96 9909-6302</td>
                  <td>
                    <a href="cliente.php?id=1058">Ver</a> <br />
                    <a href="edita-cliente.php?id=1058">Editar</a> <br />
                    <a href="destinatario.php?id=1058" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1058&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vera Lucia Santos Guedes</td>
                  <td>Santos</td>
                  <td>SP</td>
                  <td>franciscobispo.ap@gmail.com</td>
                  <td>9699096302</td>
                  <td>
                    <a href="cliente.php?id=1059">Ver</a> <br />
                    <a href="edita-cliente.php?id=1059">Editar</a> <br />
                    <a href="destinatario.php?id=1059" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1059&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VICTOR BRITO OU MARILIA ALMEIDA</td>
                  <td>CANDEAL</td>
                  <td>BA</td>
                  <td>MARCIAROQUE1970@GMAIL.COM</td>
                  <td>7196875502</td>
                  <td>
                    <a href="cliente.php?id=807">Ver</a> <br />
                    <a href="edita-cliente.php?id=807">Editar</a> <br />
                    <a href="destinatario.php?id=807" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=807&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VICTOR HUGO DA COSTA TAVARES</td>
                  <td>Niteroi</td>
                  <td>RJ</td>
                  <td>hugotavaresvictor@gmail.com</td>
                  <td>21968768371</td>
                  <td>
                    <a href="cliente.php?id=1333">Ver</a> <br />
                    <a href="edita-cliente.php?id=1333">Editar</a> <br />
                    <a href="destinatario.php?id=1333" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1333&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Victor Pannunzio Domingues</td>
                  <td>Santo André</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>+353 83 075 0760</td>
                  <td>
                    <a href="cliente.php?id=731">Ver</a> <br />
                    <a href="edita-cliente.php?id=731">Editar</a> <br />
                    <a href="destinatario.php?id=731" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=731&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vilson Carneiro</td>
                  <td>BALNEARIO CAMBORIU</td>
                  <td>SC</td>
                  <td>contato@jumobc.com.br</td>
                  <td>47 32640239/996113666</td>
                  <td>
                    <a href="cliente.php?id=430">Ver</a> <br />
                    <a href="edita-cliente.php?id=430">Editar</a> <br />
                    <a href="destinatario.php?id=430" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=430&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vinicius Baia</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>viniciusrj_31@hotmail.com</td>
                  <td>21986380895</td>
                  <td>
                    <a href="cliente.php?id=408">Ver</a> <br />
                    <a href="edita-cliente.php?id=408">Editar</a> <br />
                    <a href="destinatario.php?id=408" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=408&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VINICIUS CANEDO</td>
                  <td>CERES</td>
                  <td>GO</td>
                  <td>farmaceutico@saojosemanipulacao.com.br</td>
                  <td>62 3323-1916</td>
                  <td>
                    <a href="cliente.php?id=417">Ver</a> <br />
                    <a href="edita-cliente.php?id=417">Editar</a> <br />
                    <a href="destinatario.php?id=417" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=417&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vinícius Jodas Ferreira</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>holyessencias@live.com</td>
                  <td>18 99624-9775</td>
                  <td>
                    <a href="cliente.php?id=725">Ver</a> <br />
                    <a href="edita-cliente.php?id=725">Editar</a> <br />
                    <a href="destinatario.php?id=725" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=725&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vinicius Montero</td>
                  <td>Itajai</td>
                  <td>SC</td>
                  <td>viniciusmontero89@gmail.com</td>
                  <td>04788740296</td>
                  <td>
                    <a href="cliente.php?id=1124">Ver</a> <br />
                    <a href="edita-cliente.php?id=1124">Editar</a> <br />
                    <a href="destinatario.php?id=1124" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1124&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vinicius Montero</td>
                  <td>Itajai</td>
                  <td>SC</td>
                  <td>viniciusmontero89@gmail.com</td>
                  <td>04788740296</td>
                  <td>
                    <a href="cliente.php?id=1125">Ver</a> <br />
                    <a href="edita-cliente.php?id=1125">Editar</a> <br />
                    <a href="destinatario.php?id=1125" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1125&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vinicius Mora Benetti</td>
                  <td>Piraju</td>
                  <td>SP</td>
                  <td>sacqwx@gmail.com</td>
                  <td>(14) 9-9839 9007</td>
                  <td>
                    <a href="cliente.php?id=520">Ver</a> <br />
                    <a href="edita-cliente.php?id=520">Editar</a> <br />
                    <a href="destinatario.php?id=520" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=520&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vitor</td>
                  <td>BICAS</td>
                  <td>MG</td>
                  <td>vkrepresentacoes@hotmail.com</td>
                  <td>00000</td>
                  <td>
                    <a href="cliente.php?id=231">Ver</a> <br />
                    <a href="edita-cliente.php?id=231">Editar</a> <br />
                    <a href="destinatario.php?id=231" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=231&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VITOR DE PAULA SILVA</td>
                  <td>SANTO ANDRÉ</td>
                  <td>SP</td>
                  <td>HOLY6ESSENCIAS@LIVE.COM</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=654">Ver</a> <br />
                    <a href="edita-cliente.php?id=654">Editar</a> <br />
                    <a href="destinatario.php?id=654" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=654&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vitor Hugo Chaves Silva Reis</td>
                  <td>Mongagua</td>
                  <td>SP</td>
                  <td>vitor_hc@hotmail.com.br</td>
                  <td>981576752</td>
                  <td>
                    <a href="cliente.php?id=668">Ver</a> <br />
                    <a href="edita-cliente.php?id=668">Editar</a> <br />
                    <a href="destinatario.php?id=668" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=668&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vitor Hugo da Costa Tavares</td>
                  <td>Niterói</td>
                  <td>RJ</td>
                  <td>hugotavaresvictor@gmail.com</td>
                  <td>21 96876-8371</td>
                  <td>
                    <a href="cliente.php?id=1332">Ver</a> <br />
                    <a href="edita-cliente.php?id=1332">Editar</a> <br />
                    <a href="destinatario.php?id=1332" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1332&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VIVIANE ALMEIDA</td>
                  <td>AMERICANA</td>
                  <td>SP</td>
                  <td>vivix.vip@gmail.com</td>
                  <td>19 99220-4808</td>
                  <td>
                    <a href="cliente.php?id=320">Ver</a> <br />
                    <a href="edita-cliente.php?id=320">Editar</a> <br />
                    <a href="destinatario.php?id=320" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=320&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>VIVIANE DIAS DOS SANTOS</td>
                  <td>Santo André</td>
                  <td>SP</td>
                  <td>mar.celo_cco@hotmail.com</td>
                  <td>11 99416-4032</td>
                  <td>
                    <a href="cliente.php?id=267">Ver</a> <br />
                    <a href="edita-cliente.php?id=267">Editar</a> <br />
                    <a href="destinatario.php?id=267" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=267&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Vladimir Miranda</td>
                  <td>Aruja</td>
                  <td>SP</td>
                  <td>mfperfumes@terra.com.br</td>
                  <td>(11) 96612-2771</td>
                  <td>
                    <a href="cliente.php?id=180">Ver</a> <br />
                    <a href="edita-cliente.php?id=180">Editar</a> <br />
                    <a href="destinatario.php?id=180" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=180&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WACKER QUIMICA - Paulo Teixeira</td>
                  <td>nao informado</td>
                  <td>SP</td>
                  <td>naoinformado@naoinformado.com</td>
                  <td>11954923166</td>
                  <td>
                    <a href="cliente.php?id=1257">Ver</a> <br />
                    <a href="edita-cliente.php?id=1257">Editar</a> <br />
                    <a href="destinatario.php?id=1257" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1257&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WAGNER BRAGA</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>wagnersbraga@gmail.com</td>
                  <td>58 996296257 - 58985391217</td>
                  <td>
                    <a href="cliente.php?id=549">Ver</a> <br />
                    <a href="edita-cliente.php?id=549">Editar</a> <br />
                    <a href="destinatario.php?id=549" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=549&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WAGNER MACEDO SILVA - 22 98823-5617</td>
                  <td>ARARUAMA</td>
                  <td>RJ</td>
                  <td>holyessencias@live.com</td>
                  <td>22 98823-5617</td>
                  <td>
                    <a href="cliente.php?id=690">Ver</a> <br />
                    <a href="edita-cliente.php?id=690">Editar</a> <br />
                    <a href="destinatario.php?id=690" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=690&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WANDER DO CARMO BREDA</td>
                  <td>Campinas</td>
                  <td>SP</td>
                  <td>wanderbreda@yahoo.com.br</td>
                  <td>(19) 3281-2608 - Ramal 250 ou (19) 3281-6875 / (1</td>
                  <td>
                    <a href="cliente.php?id=140">Ver</a> <br />
                    <a href="edita-cliente.php?id=140">Editar</a> <br />
                    <a href="destinatario.php?id=140" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=140&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wanderson Barros</td>
                  <td>Limoeiro de Anadia</td>
                  <td>AL</td>
                  <td>wandersonbarros689@gmail.com</td>
                  <td>82 9434-8370</td>
                  <td>
                    <a href="cliente.php?id=1264">Ver</a> <br />
                    <a href="edita-cliente.php?id=1264">Editar</a> <br />
                    <a href="destinatario.php?id=1264" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1264&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WANESSA BRAGA</td>
                  <td>CUBATÃO</td>
                  <td>SP</td>
                  <td>wanessa.dbraga@gmail.com</td>
                  <td>0000</td>
                  <td>
                    <a href="cliente.php?id=284">Ver</a> <br />
                    <a href="edita-cliente.php?id=284">Editar</a> <br />
                    <a href="destinatario.php?id=284" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=284&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WDESIGNER CORPORATION LTDA.-ME - A/C GUILHERME BORGES</td>
                  <td>Vitória</td>
                  <td>ES</td>
                  <td>sales@wdcorp.com.br</td>
                  <td>27 3055 0137</td>
                  <td>
                    <a href="cliente.php?id=512">Ver</a> <br />
                    <a href="edita-cliente.php?id=512">Editar</a> <br />
                    <a href="destinatario.php?id=512" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=512&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wellington Barbosa Lage</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>naofornecido@naofornecido.com</td>
                  <td>11 91120-3354</td>
                  <td>
                    <a href="cliente.php?id=1199">Ver</a> <br />
                    <a href="edita-cliente.php?id=1199">Editar</a> <br />
                    <a href="destinatario.php?id=1199" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1199&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WELLINGTON QUADROS</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>wellingtonjquadros@gmail.com</td>
                  <td>00</td>
                  <td>
                    <a href="cliente.php?id=295">Ver</a> <br />
                    <a href="edita-cliente.php?id=295">Editar</a> <br />
                    <a href="destinatario.php?id=295" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=295&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wender Octácio Teixeira</td>
                  <td>VITORIA DA CONQUISTA</td>
                  <td>BA</td>
                  <td>WENDER.MEIRA@HOTMAIL.COM</td>
                  <td>(77) 98812-6102 - </td>
                  <td>cpf- 041.031.585-06</td>
                  <td>
                    <a href="cliente.php?id=43">Ver</a> <br />
                    <a href="edita-cliente.php?id=43">Editar</a> <br />
                    <a href="destinatario.php?id=43" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=43&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Weslen - Fabiana Lopes da Silva</td>
                  <td>São Paulo</td>
                  <td>SP</td>
                  <td>marciaroque1970@gmail.com</td>
                  <td>11958555702</td>
                  <td>
                    <a href="cliente.php?id=914">Ver</a> <br />
                    <a href="edita-cliente.php?id=914">Editar</a> <br />
                    <a href="destinatario.php?id=914" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=914&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WESLEN CARDOSO</td>
                  <td>SAO PAULO</td>
                  <td>SP</td>
                  <td>impactofragrancia@gmail.com</td>
                  <td>11 2722-6218</td>
                  <td>
                    <a href="cliente.php?id=276">Ver</a> <br />
                    <a href="edita-cliente.php?id=276">Editar</a> <br />
                    <a href="destinatario.php?id=276" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=276&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wesley Franco Silva</td>
                  <td>Mata de São João</td>
                  <td>BA</td>
                  <td>wesleyfrancosilva.17@gmail.com</td>
                  <td>7196076194</td>
                  <td>
                    <a href="cliente.php?id=1266">Ver</a> <br />
                    <a href="edita-cliente.php?id=1266">Editar</a> <br />
                    <a href="destinatario.php?id=1266" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1266&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WILLIAN BORGES</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>wborges@metrosp.com.br</td>
                  <td>15 98133-3190 </td>
                  <td>cpf: 116.453.278-25</td>
                  <td>
                    <a href="cliente.php?id=240">Ver</a> <br />
                    <a href="edita-cliente.php?id=240">Editar</a> <br />
                    <a href="destinatario.php?id=240" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=240&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Willian Diego Mezanini</td>
                  <td>SOROCABA</td>
                  <td>SP</td>
                  <td>willianmezanini@gmail.com</td>
                  <td>15 99177-6406 </td>
                  <td>cpf: 35814492856</td>
                  <td>
                    <a href="cliente.php?id=87">Ver</a> <br />
                    <a href="edita-cliente.php?id=87">Editar</a> <br />
                    <a href="destinatario.php?id=87" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=87&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WILMA ROSA</td>
                  <td>Queimados</td>
                  <td>RJ</td>
                  <td>wrosa.3@gmail.com</td>
                  <td></td>
                  <td>cpf 584721187-20 tel (21) 991355752</td>
                  <td>
                    <a href="cliente.php?id=629">Ver</a> <br />
                    <a href="edita-cliente.php?id=629">Editar</a> <br />
                    <a href="destinatario.php?id=629" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=629&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>WILSON JÚNIOR</td>
                  <td>RIO DE JANEIRO</td>
                  <td>RJ</td>
                  <td>wilson.junior729@gmail.com</td>
                  <td>000</td>
                  <td>
                    <a href="cliente.php?id=200">Ver</a> <br />
                    <a href="edita-cliente.php?id=200">Editar</a> <br />
                    <a href="destinatario.php?id=200" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=200&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wilson Junior</td>
                  <td>FORTALEZA</td>
                  <td>CE</td>
                  <td>josewilsonjunior@gmail.com</td>
                  <td>85 9 9793-4642</td>
                  <td>
                    <a href="cliente.php?id=297">Ver</a> <br />
                    <a href="edita-cliente.php?id=297">Editar</a> <br />
                    <a href="destinatario.php?id=297" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=297&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wilson Rogerio Sanchez</td>
                  <td>Praia Grande</td>
                  <td>SP</td>
                  <td>rogeriosanchezpg@gmail.com</td>
                  <td>13 991534022 </td>
                  <td>cpf 085.368.688.21</td>
                  <td>
                    <a href="cliente.php?id=1003">Ver</a> <br />
                    <a href="edita-cliente.php?id=1003">Editar</a> <br />
                    <a href="destinatario.php?id=1003" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1003&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Wyslley Douglas Alves Paiva</td>
                  <td>Caraúbas</td>
                  <td>RN</td>
                  <td>douglas-edmais@hotmail.com</td>
                  <td>(84) 99939-1002 </td>
                  <td>cpf 061.393.114-97</td>
                  <td>
                    <a href="cliente.php?id=538">Ver</a> <br />
                    <a href="edita-cliente.php?id=538">Editar</a> <br />
                    <a href="destinatario.php?id=538" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=538&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>YAGO NAZÁRIO</td>
                  <td>BLUMENAU</td>
                  <td>SC</td>
                  <td>YAGONAZARIO@HOTMAIL.COM</td>
                  <td>47 33301792/99184517</td>
                  <td>
                    <a href="cliente.php?id=55">Ver</a> <br />
                    <a href="edita-cliente.php?id=55">Editar</a> <br />
                    <a href="destinatario.php?id=55" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=55&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Yasmin Torres Paiva</td>
                  <td>SANTOS</td>
                  <td>SP</td>
                  <td>yasmintpaiva@gmail.com</td>
                  <td>(13) 996436833</td>
                  <td>
                    <a href="cliente.php?id=825">Ver</a> <br />
                    <a href="edita-cliente.php?id=825">Editar</a> <br />
                    <a href="destinatario.php?id=825" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=825&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Yeraldin Yecenia Murillo Torres</td>
                  <td>Varzea Grande</td>
                  <td>MT</td>
                  <td>Yeratorrest@gmail.com</td>
                  <td>6596709532</td>
                  <td>
                    <a href="cliente.php?id=1168">Ver</a> <br />
                    <a href="edita-cliente.php?id=1168">Editar</a> <br />
                    <a href="destinatario.php?id=1168" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1168&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Yuri Alves Magalhaes</td>
                  <td>João Pinheiro</td>
                  <td>MG</td>
                  <td>yuriealves0115@gmail.com</td>
                  <td>38 98836-5268 </td>
                  <td>cpf: 149.410.576-43</td>
                  <td>
                    <a href="cliente.php?id=1330">Ver</a> <br />
                    <a href="edita-cliente.php?id=1330">Editar</a> <br />
                    <a href="destinatario.php?id=1330" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1330&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ZADAKELMA MARIA MARQUES DE LIMA FERNANDES</td>
                  <td>Olinda</td>
                  <td>PE</td>
                  <td>zadakelma@hotmail.com</td>
                  <td>81 987659681 </td>
                  <td>cnpj 31115636000102</td>
                  <td>
                    <a href="cliente.php?id=1135">Ver</a> <br />
                    <a href="edita-cliente.php?id=1135">Editar</a> <br />
                    <a href="destinatario.php?id=1135" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1135&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Zaida Maria Pereira Cruz</td>
                  <td>Goiania</td>
                  <td>GO</td>
                  <td>zadiamaria1@gmail.com</td>
                  <td>(62) 999786895.</td>
                  <td>
                    <a href="cliente.php?id=1306">Ver</a> <br />
                    <a href="edita-cliente.php?id=1306">Editar</a> <br />
                    <a href="destinatario.php?id=1306" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=1306&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>ZN LOG LOGÍSTICA E TRANSPORTE</td>
                  <td>GUARULHOS</td>
                  <td>SP</td>
                  <td>znlog@znlog.com.br</td>
                  <td>(11) 3717-0690</td>
                  <td>
                    <a href="cliente.php?id=256">Ver</a> <br />
                    <a href="edita-cliente.php?id=256">Editar</a> <br />
                    <a href="destinatario.php?id=256" target="_blank">
                      Destinatário
                    </a>{" "}
                    <br />
                    <a href="exclui-cliente.php?p1=1RHujmjkFcvaaUyDUkOx1innQ&amp;id=256&amp;p2=1RHujmjkFcvaaUyDUkOx1innQ">
                      Excluir
                    </a>
                  </td>
                </tr>

              {/* {tableInfo?.map((product, index) => {
                return (
                  <RowInfo key={index}>
                    <Item>{index + 1}</Item>
                    <Item>{parseName(product.nameProduct)}</Item>
                    <Item>{product.codProd}</Item>
                    <Item>
                      <Value
                        value={product.priceSellDolar}
                        displayType="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"US$ "}
                      />
                    </Item>
                  </RowInfo>
                );
              })} */}
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
