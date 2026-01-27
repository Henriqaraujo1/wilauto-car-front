import React, { useEffect, useRef, useState } from "react";
import {
  BtnClose,
  BtnNewBudget,
  DivBudgetAnimation,
  DivOrgBtnClose,
  DivOrgBtnBudget,
  // StatusBudget,
  TitleAnimation,
  // DivOrgLoading,
  BtnPrint,
  DivOrgInfoAnimation,
  DivInfoCompany,
  DivOrgTable,
  DivOrgTitle,
  InfoCompany,
  Line,
  Table,
  TableBody,
  TableFoot,
  TableHead,
  TablePayments,
  TdPayments,
  TdTable,
  TdTableDesc,
  TdTablePrices,
  TdValues,
  ThTable,
  ThTableDesc,
  ThTablePrices,
  TitlePrint,
  TrPayments,
  TrTable,
  DivOrgInfoCompany,
  DivInfoClient,
  // BtnMail,
  PricesFormat,
  DivOrgSelect,
  SelectPaper,
  OptionsPaper,
  DivDelivery,
  DivOrgTitleDelivery,
  TitleDelivery,
  InfoDelivery,
  DivOrgScreen,
  InfoDate,
  DivOrgInput,
  LabelDays,
  InputDays,
  ImgCompany,
  DivOptions,
  InfoWorldSoft,
  InputMsg,
  DivOrgHeader,
  DivImg,
} from "./PrintBudget.style";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { Close } from "@styled-icons/material";
// import { ClipLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import Wpp from "../../images/wpp.ico";
import WhatsappMsg from "../Integrations/Whatsapp/Whatsapp";
import LogoCompany from "../../images/LogoInicio.png";

export default function PrintBudget(props) {
  // const orderResponse = props.trueAnimation;
  const infoFinishBudget = props.infoFinishBudget.budget;
  const infoClient = props.infoClientLocal;
  const infoEmployee = props.employee;
  const infoDolar = props.infoDolar;

  const FormatDate = new FormatDatesFront();
  const navigate = useNavigate();

  const [budgetList, setBudgetList] = useState([]);
  // const [showList, setShowList] = useState(false);
  const [typePaper, setTypePaper] = useState();
  const [showList, setShowList] = useState(false);
  const [dateChange, setDateChange] = useState();
  const [infoDay, setInfoDays] = useState(2);
  const [sendWpp, setSendWpp] = useState(false);
  const [printWidth, setPrintWidth] = useState(false);
  const [infoMessage, setInfoMessage] = useState(
    `Segue o orçamento conforme solicitado, informamos orçamento é válido por `
  );
  // const [finishBudget, setFinishBudget] = useState({ message: "pendente" });
  // const [infoPrint, setInfoPrint] = useState(false);

  const createListBudgets = (dataClient) => {
    setShowList(true);
    if (showList) {
      setBudgetList(dataClient);
    }
  };

  const printRef = useRef();
  const printBudget = useReactToPrint({
    contentRef: printRef,
  });

  const exportPDF = () => {
    const element = printRef.current;
    setPrintWidth(true);

    const options = {
      margin: 0.3,
      filename: `nota-${infoFinishBudget?.idBudget || "pedido"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  };

  // const sendWpp = () => {

  // }

  const parseName = (oneName) => {
    if (oneName) {
      const firstName = oneName || "";

      var fullName = firstName.concat(" ");

      const formatName = fullName.split(" ");
      for (var i = 0; i < formatName.length; i++) {
        formatName[i] =
          formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
      }
      let result = formatName?.join(" ");

      return result;
    }
  };

  useEffect(() => {
    createListBudgets(infoFinishBudget?.itensOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFinishBudget?.itensOrder]);

  useEffect(() => {
    const dateCreated = infoFinishBudget?.dateCreated;

    if (dateCreated) {
      // Formata a data sem hora
      const formattedDate = new Date(FormatDate.formatDateNoHour(dateCreated));

      // Obtem os valores da data usando UTC
      const updatedDate = new Date(
        Date.UTC(
          formattedDate.getUTCFullYear(),
          formattedDate.getUTCMonth(),
          formattedDate.getUTCDate()
        )
      );

      // Adiciona 7 dias
      updatedDate.setUTCDate(updatedDate.getUTCDate() + Number(infoDay));

      // Exibe a nova data
      setDateChange(
        FormatDate.formatDateInput(updatedDate.toISOString().slice(0, 10))
      ); // Saída no formato YYYY-MM-DD
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFinishBudget, infoDay]);
  return (
    <DivBudgetAnimation
      show={props.showBudget}
      // show={true}
    >
      <DivOrgScreen>
        <DivOrgInfoAnimation>
          <DivOrgTable ref={printRef} papersType={typePaper}>
            <DivOrgHeader>
              <DivImg>
                <ImgCompany src={LogoCompany} changePrint={printWidth} />
              </DivImg>
              <DivOrgInfoCompany>
                <DivInfoCompany>
                  <InfoCompany>
                    Nome da Empresa: {import.meta.env.VITE_NAME_EMPRESA}
                  </InfoCompany>
                  <InfoCompany>
                    CNPJ: {import.meta.env.VITE_CNPJ_EMPRESA}
                  </InfoCompany>
                  <InfoCompany>
                    Endereço: {import.meta.env.VITE_ENDERECO_EMPRESA}
                  </InfoCompany>
                  <InfoCompany>
                    Bairro: {import.meta.env.VITE_BAIRRO_EMPRESA}
                  </InfoCompany>
                  <InfoCompany>
                    Cidade: {import.meta.env.VITE_CIDADE_EMPRESA} /{" "}
                    {import.meta.env.VITE_ESTADO_EMPRESA}
                  </InfoCompany>
                  <InfoCompany>
                    Vendedor: {parseName(infoEmployee?.label) || ""}
                  </InfoCompany>
                </DivInfoCompany>
                <DivInfoClient>
                  <InfoCompany>Cliente: {infoClient.nameClient}</InfoCompany>
                  <InfoCompany>
                    Nº Pedido: {infoFinishBudget?.idBudget}
                  </InfoCompany>
                  <InfoDate>
                    Data do orçamento: {infoFinishBudget?.dateCreated}
                  </InfoDate>
                  <InfoDate>Valido ate: {dateChange}</InfoDate>
                </DivInfoClient>
              </DivOrgInfoCompany>
            </DivOrgHeader>
            <DivOrgTitle>
              <TitlePrint>
                Prezado Sr(a). {infoClient.nameClient} <br />
              </TitlePrint>
              {infoMessage}
              {infoDay} dias
            </DivOrgTitle>
            <Line />
            <Table>
              <TableHead>
                <TrTable>
                  <ThTable>Items</ThTable>
                  <ThTable>Cod.</ThTable>
                  <ThTableDesc>Nome Item</ThTableDesc>
                  <ThTablePrices>Preço Unit</ThTablePrices>
                  <ThTable>QTD</ThTable>
                  <ThTablePrices>Preço Total</ThTablePrices>
                </TrTable>
              </TableHead>
              <TableBody>
                {budgetList?.map((itemsCart, index) => {
                  {
                    /* {products?.map((itemsCart, index) => { */
                  }
                  return (
                    <TrTable key={index}>
                      <TdTable>{index + 1}</TdTable>
                      <TdTable>{itemsCart.codProd}</TdTable>
                      <TdTableDesc>{itemsCart.nameProduct}</TdTableDesc>
                      <TdTablePrices>
                        <PricesFormat
                          placeholder=""
                          displayType="text"
                          value={itemsCart.priceSell || 0}
                          decimalSeparator=","
                          thousandSeparator="."
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </TdTablePrices>
                        <TdTable>{itemsCart.qtd}</TdTable>
                      <TdTablePrices>
                        <PricesFormat
                          placeholder=""
                          displayType="text"
                          value={itemsCart.priceWithDiscount || 0}
                          decimalSeparator=","
                          thousandSeparator="."
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </TdTablePrices>
                    </TrTable>
                  );
                })}
              </TableBody>
            </Table>
            <DivDelivery>
              <DivOrgTitleDelivery>
                <TitleDelivery>Entrega</TitleDelivery>
              </DivOrgTitleDelivery>
              <InfoDelivery>
                Rua: {infoClient?.street} N: {infoClient?.number}
              </InfoDelivery>
              <InfoDelivery>
                Bairro: {infoClient?.district} Cidade: {infoClient?.city}/
                {infoClient?.state}
              </InfoDelivery>
              <InfoDelivery>Complemento: {infoClient?.complement}</InfoDelivery>
            </DivDelivery>

            <TablePayments>
              <TableFoot>
                <TrPayments>
                  <TdPayments>Forma de pagamento</TdPayments>
                  <TdValues>
                    {parseName(infoFinishBudget?.formPayment)}
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Valor do Frete</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishBudget?.valueDelivery}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Qtd Itens</TdPayments>
                    <TdValues>{infoFinishBudget?.sizeItens}</TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Total do pedido</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishBudget?.valueNoDiscount}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Desconto</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishBudget?.valueDiscount}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Valor Final</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishBudget?.valueWithDiscount}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
              </TableFoot>
            </TablePayments>
            <InfoWorldSoft>Desenvolvido por Worldsoft Inc</InfoWorldSoft>
          </DivOrgTable>
        </DivOrgInfoAnimation>

        <DivOrgBtnBudget>
          <DivOrgBtnClose>
            <TitleAnimation>Orçamento realizado</TitleAnimation>
            <BtnClose
              onClick={() => {
                props.setShowBudget(false);
                props.setTrueBudget(false);
                setPrintWidth(false);
                navigate("/comercial");
              }}
            >
              <Close />
            </BtnClose>
          </DivOrgBtnClose>
          <DivOptions>
            <DivOrgInput>
              <LabelDays>Mensagem Informativa</LabelDays>
              <InputMsg
                value={infoMessage}
                onChange={(e) => setInfoMessage(e.target.value)}
              />
            </DivOrgInput>
            <DivOrgInput>
              <LabelDays>Prazo do Orçamento</LabelDays>
              <InputDays
                value={infoDay}
                type="number"
                onChange={(e) => setInfoDays(e.target.value)}
              />
            </DivOrgInput>
            <DivOrgSelect>
              <SelectPaper
                defaultValue={0}
                onChange={(e) => setTypePaper(e.target.value)}
              >
                <OptionsPaper value={true}>A4</OptionsPaper>
              </SelectPaper>
            </DivOrgSelect>
            <BtnNewBudget type="button" to="/comercial">
              Novo Pedido
            </BtnNewBudget>
            <BtnPrint type="button" onClick={printBudget}>
              Imprimir Orçamento
            </BtnPrint>
            <BtnPrint type="button" onClick={exportPDF}>
              Baixar Orçamento em PDF
            </BtnPrint>
            {/* <BtnWpp type="button" onClick={() => setSendWpp(!sendWpp)}>
              Enviar no WhatsApp
              <IconWpp src={Wpp} />
            </BtnWpp> */}
          </DivOptions>
          {/* <BtnMail>Enviar por E-mail</BtnMail> */}
          <WhatsappMsg sendWpp={sendWpp} setSendWpp={setSendWpp} />
        </DivOrgBtnBudget>
      </DivOrgScreen>
    </DivBudgetAnimation>
  );
}
