import React, { useEffect, useState } from "react";
import {
  BtnClose,
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
  AlertChange,
  BtnWpp,
  IconWpp,
  DivOptions,
  BtnPdf,
  BtnDelivery,
} from "./PrintOrderStyle";
import html2pdf from "html2pdf.js";
import { Close } from "@styled-icons/material";
import { useReactToPrint } from "react-to-print";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import WhatsappMsg from "../../Integrations/Whatsapp/Whatsapp";
import { getClientItensByOrder } from "../../../store/financial/resumeClient/resumeClient.actions";
import { useDispatch } from "react-redux";
import PrintDelivery from "../PrintDelivery/PrintDelivery";

export default function PrintOrderr(props) {
  const infoClient = props.selectPrintView?.infoDelivery;
  const payments = props.selectPrintView?.infoPayment;

  const infoPrint = props.selectPrintView;
  const FormatDate = new FormatDatesFront();

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderList, setOrderList] = useState([]);
  const [typePaper, setTypePaper] = useState();
  const [showList, setShowList] = useState(false);
  const [dateChange, setDateChange] = useState();
  // const [sendWpp, setSendWpp] = useState(false);

  const [infoOrder, setInfoOrder] = useState([]);
  const [infoPayment] = useState({
    formPayment: payments?.formPayment,
    valueDelivery: payments?.valueDelivery,
    valueNoDiscount: payments?.valueNoDiscount,
    valueDiscount: payments?.valueDiscount,
    valueWithDiscount: payments?.valueWithDiscount,
    valueClientPayed: payments?.valueClientPayed,
    valueChange: payments?.valueChange,
  });

  const [infoCompany] = useState({
    nameEmployee: infoPrint?.nameEmployee,
    dateCreated: infoPrint?.dateCreated,
    idOrder: infoPrint?.idOrder,
    status: infoPrint?.status,
  });
  const getInfoOrder = async (idOrder) => {
    const orderData = await dispatch(getClientItensByOrder(idOrder));

    if (orderData.payload.codeStatus === 200) {
      setInfoOrder(orderData.payload);
    }
  };

  useEffect(() => {
    getInfoOrder(infoCompany?.idOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCompany]);

  const createListOrders = (dataClient) => {
    setShowList(true);
    if (showList) {
      setOrderList(dataClient);
    }
  };

  const printRef = React.useRef();
  const printDeliveryRef = React.useRef();
  const printOrder = useReactToPrint({
    content: () => printRef.current,

    // onAfterPrint: () => {
    //   navigate("/financial/");
    // },
  });

  const printDeliveryOrder = useReactToPrint({
    contentRef: printDeliveryRef,
  });

  const exportPDF = () => {
    const element = printRef.current;

    const options = {
      margin: 0.3,
      filename: `nota-${infoCompany?.idOrder || "pedido"}.pdf`,
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
    createListOrders(infoOrder?.itemsByOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrder]);

  useEffect(() => {
    const dateCreated = infoCompany?.dateCreated;

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
  }, [infoCompany]);

  return (
    <DivOrderAnimation
      show={props.printView}
      // show={true}
    >
      <DivOrgScreen>
        <DivOrgInfoAnimation>
          <DivOrgTable ref={printRef} papersType={typePaper}>
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
                  Vendedor: {parseName(infoCompany.nameEmployee || "  ")}
                </InfoCompany>
              </DivInfoCompany>
              <DivInfoClient>
                <InfoCompany>Cliente: {infoOrder?.nameClient}</InfoCompany>
                <InfoCompany>Nº Pedido: {infoCompany?.idOrder}</InfoCompany>
                <InfoDate>Data da compra: {infoCompany?.dateCreated}</InfoDate>
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
                  <ThTableDesc>Desc.</ThTableDesc>
                  <ThTable>QTD</ThTable>
                  <ThTablePrices>Preço Unitario</ThTablePrices>
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
                      <TdTable>{itemsCart.qtd}</TdTable>
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
                  <TdValues>
                    {parseName(infoPayment?.formPayment) || 0}
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Valor do Frete</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoPayment?.valueDelivery}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>QTD</TdPayments>
                  <TdValues>{infoPrint?.qtdItens}</TdValues>
                </TrPayments>
                <TrPayments>
                  <TdPayments>Total do pedido</TdPayments>
                  <TdValues>
                    <PricesFormat
                      displayType="text"
                      value={infoPayment?.valueNoDiscount}
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
                      value={infoPayment?.valueDiscount}
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
                      value={infoPayment?.valueWithDiscount}
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
                      value={infoPayment?.valueClientPayed}
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
                      value={infoPayment?.valueChange}
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
          </DivOrgTable>
        </DivOrgInfoAnimation>

        <DivOrgBtnOrder>
          <DivOrgBtnClose>
            <TitleAnimation>Reimpressão de Pedido</TitleAnimation>
            <BtnClose
              onClick={() => {
                props.setPrintView(false);
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
            <BtnPrint type="button" onClick={printOrder}>
              Imprimir Comprovante
            </BtnPrint>
            <BtnPdf type="button" onClick={exportPDF}>
              Baixar Comprovante em PDF
            </BtnPdf>
            <BtnDelivery type="button" onClick={printDeliveryOrder}>
              Imprimir Etiqueta Correios
            </BtnDelivery>
          </DivOptions>
          <PrintDelivery ref={printDeliveryRef} infoDelivery={infoClient} />
          {/* <WhatsappMsg sendWpp={sendWpp} setSendWpp={setSendWpp} /> */}
        </DivOrgBtnOrder>
      </DivOrgScreen>
    </DivOrderAnimation>
  );
}
