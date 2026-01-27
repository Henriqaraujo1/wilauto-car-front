import React, { useEffect, useState } from "react";
import {
  BtnClose,
  BtnNewOrder,
  DivOrderAnimation,
  DivOrgBtnClose,
  DivOrgBtnOrder,
  // StatusOrder,
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
  DivOptions,
  InfoWorldSoft,
  BtnPdf,
  BtnDelivery,
} from "./FinishOrderAnimationStyle";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { Close } from "@styled-icons/material";
// import { ClipLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import FormatDatesFront from "../../utils/formatDateFront.mjs";
import Wpp from "../../images/wpp.ico";
import WhatsappMsg from "../Integrations/Whatsapp/Whatsapp";
import PrintDelivery from "../Details/PrintDelivery/PrintDelivery";

export default function FinishOrderAnimation(props) {
  // const orderResponse = props.trueAnimation;
  const infoFinishOrder = props.infoFinishOrder.order;
  console.log(infoFinishOrder)
  const infoClient = props.infoClientLocal;
  const infoEmployee = props.employee;
  const FormatDate = new FormatDatesFront();

  // const orderResponse = true;
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState([]);
  // const [showList, setShowList] = useState(false);
  const [typePaper, setTypePaper] = useState();
  const [showList, setShowList] = useState(false);
  const [dateChange, setDateChange] = useState();
  const [sendWpp, setSendWpp] = useState(false);

  // const [finishOrder, setFinishOrder] = useState({ message: "pendente" });
  // const [infoPrint, setInfoPrint] = useState(false);

  const createListOrders = (dataClient) => {
    setShowList(true);
    if (showList) {
      setOrderList(dataClient);
    }
  };

  const printRef = React.useRef();
  const printDeliveryRef = React.useRef();
  const printOrder = useReactToPrint({
    contentRef: printRef,
  });

  const printDeliveryOrder = useReactToPrint({
    contentRef: printDeliveryRef,
  });

  const exportPDF = () => {
    const element = printRef.current;

    const options = {
      margin: 0.3,
      filename: `nota-${infoFinishOrder?.idOrder || "pedido"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  };

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
    createListOrders(infoFinishOrder?.itemsCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFinishOrder?.itemsCart]);

  useEffect(() => {
    const dateCreated = infoFinishOrder?.dateCreated;

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
      updatedDate.setUTCDate(updatedDate.getUTCDate() + 7);

      // Exibe a nova data
      setDateChange(
        FormatDate.formatDateInput(updatedDate.toISOString().slice(0, 10))
      ); // Saída no formato YYYY-MM-DD
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFinishOrder]);

  return (
    <DivOrderAnimation
      show={props.showAnimation}
      // show={true}
    >
      <DivOrgScreen>
        <DivOrgInfoAnimation>
          <DivOrgTable ref={printRef} papersType={typePaper}>
            <DivOrgInfoCompany>
              <DivInfoCompany>
                <InfoCompany>
                  {import.meta.env.VITE_NAME_EMPRESA}
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
                  Vendedor: {parseName(infoEmployee?.label || "")}
                </InfoCompany>
              </DivInfoCompany>
              <DivInfoClient>
                <InfoCompany>Cliente: {infoClient.nameClient}</InfoCompany>
                <InfoCompany>Nº Pedido: {infoFinishOrder?.idOrder}</InfoCompany>
                <InfoDate>
                  Data da compra: {infoFinishOrder?.dateCreated}
                </InfoDate>
                <InfoDate>Data de troca ate: {dateChange}</InfoDate>
              </DivInfoClient>
            </DivOrgInfoCompany>
            <DivOrgTitle>
              <TitlePrint>Nota Não fiscal</TitlePrint>
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
                {orderList.map((itemsCart, index) => {
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
                          value={itemsCart.valueTotalItem || 0}
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
                  <TdValues>{infoFinishOrder?.formPayment}</TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Valor do Frete</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishOrder?.valueDelivery}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>QTD Itens</TdPayments>
                    <TdValues>{infoFinishOrder?.qtdItens}</TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Total do pedido</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishOrder?.valueNoDiscount}
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
                      value={infoFinishOrder?.valueDiscount}
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
                      value={infoFinishOrder?.valueWithDiscount}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Valor Pago</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishOrder?.valueClientPayed}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Troco</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoFinishOrder?.valueChange}
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

        <DivOrgBtnOrder>
          <DivOrgBtnClose>
            <TitleAnimation>Venda realizada com sucesso</TitleAnimation>
            <BtnClose
              onClick={() => {
                props.setShowAnimation(false);
                props.setTrueAnimation(false);
                navigate("/comercial");
              }}
            >
              <Close />
            </BtnClose>
          </DivOrgBtnClose>
          <DivOptions>
            <DivOrgSelect>
              <SelectPaper
                defaultValue={0}
                onChange={(e) => setTypePaper(e.target.value)}
              >
                <OptionsPaper value={true}>A4</OptionsPaper>
                <OptionsPaper value={false}>Cupom</OptionsPaper>
              </SelectPaper>
            </DivOrgSelect>
            <BtnNewOrder type="button" to="/comercial">
              Novo Pedido
            </BtnNewOrder>
            <BtnPrint type="button" onClick={printOrder}>
              Imprimir Comprovante
            </BtnPrint>
            <BtnPdf type="button" onClick={exportPDF}>
              Baixar Comprovante em PDF
            </BtnPdf>
            <BtnDelivery type="button" onClick={printDeliveryOrder}>
              Imprimir Etiqueta Correios
            </BtnDelivery>
            <PrintDelivery ref={printDeliveryRef} infoDelivery={infoClient} />
            {/* <BtnWpp type="button" onClick={() => setSendWpp(!sendWpp)}>
            Enviar no WhatsApp
            <IconWpp src={Wpp} />
          </BtnWpp> */}
          </DivOptions>
          {/* <BtnMail>Enviar por E-mail</BtnMail> */}
          <WhatsappMsg sendWpp={sendWpp} setSendWpp={setSendWpp} />
        </DivOrgBtnOrder>
      </DivOrgScreen>
    </DivOrderAnimation>
  );
}
