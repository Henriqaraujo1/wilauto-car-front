import React, { useEffect, useRef, useState } from "react";
import {
  BtnClose,
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
  InfoWorldSoft,
  DivOrgImg,
  ImgCompany,
  DivOrgInput,
  LabelDays,
  InputDays,
  InputMsg,
} from "./ReprintBudget.style";
import html2pdf from "html2pdf.js";
import { Close } from "@styled-icons/material";
import { useReactToPrint } from "react-to-print";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import WhatsappMsg from "../../Integrations/Whatsapp/Whatsapp";
import { getItensByBudgets } from "../../../store/budget/budget.actions";
import { useDispatch } from "react-redux";
import LogoCompany from "../../../images/LogoInicio.png";

export default function ReprintBudget(props) {
  const infoClient = props.selectPrintView?.infoClient;
  const payments = props.selectPrintView?.infoPayment;

  const infoPrint = props.selectPrintView;
  const FormatDate = new FormatDatesFront();

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderList, setBudgetList] = useState([]);
  const [typePaper, setTypePaper] = useState();
  const [showList, setShowList] = useState(false);
  const [dateChange, setDateChange] = useState();
  const [sendWpp, setSendWpp] = useState(false);
  const [infoDay, setInfoDays] = useState(2);
  const [infoMessage, setInfoMessage] = useState(
    `Segue o orçamento conforme solicitado, informamos orçamento é válido por `
  );

  const [printWidth, setPrintWidth] = useState(false);
  const [infoBudget, setInfoBudget] = useState([]);
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
    idBudget: infoPrint?.idBudget,
    status: infoPrint?.status,
  });
  const getInfoBudget = async (idBudget) => {
    const orderData = await dispatch(getItensByBudgets(idBudget));

    if (orderData.payload.codeStatus === 200) {
      setInfoBudget(orderData.payload);
    }
  };

  useEffect(() => {
    getInfoBudget(infoCompany?.idBudget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCompany?.idBudget]);

  const createListBudgets = (dataClient) => {
    setShowList(true);
    if (showList) {
      setBudgetList(dataClient);
    }
  };

  const printRef = React.useRef();
  const printBudget = useReactToPrint({
    contentRef: printRef,

    // onAfterPrint: () => {
    //   navigate("/financial/");
    // },
  });

  const exportPDF = () => {
    const element = printRef.current;

    const options = {
      margin: 0.3,
      filename: `nota-${infoCompany?.idBudget || "pedido"}.pdf`,
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

  useEffect(() => {
    createListBudgets(infoBudget?.itemsBudgets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoBudget?.itemsBudgets]);

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
    <DivBudgetAnimation
      // show={props.printView}
      show={true}
    >
      <DivOrgScreen>
        <DivOrgInfoAnimation>
          <DivOrgTable ref={printRef} papersType={typePaper}>
            <DivOrgInfoCompany>
              <DivOrgImg>
                <ImgCompany src={LogoCompany} changePrint={printWidth} />
              </DivOrgImg>
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
                <InfoCompany>
                  Cliente:{" "}
                  {parseName(infoClient?.clientName, infoClient?.lastName)}
                </InfoCompany>
                <InfoCompany>Nº Orçamento: {infoCompany?.idBudget}</InfoCompany>
                <InfoDate>Data da compra: {infoCompany?.dateCreated}</InfoDate>
                <InfoDate>valido ate: {dateChange}</InfoDate>
              </DivInfoClient>
            </DivOrgInfoCompany>

            <DivOrgTitle>
              <TitlePrint>
                Prezado Sr(a).{" "}
                {parseName(infoClient?.clientName, infoClient?.lastName)} <br />
                <br />
                {infoMessage}
                válido por {infoDay} dias
              </TitlePrint>
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
                  console.log(itemsCart);
                  return (
                    <TrTable key={index}>
                      <TdTable>{index + 1}</TdTable>
                      <TdTable>{itemsCart.codProd}</TdTable>
                      <TdTableDesc>{itemsCart.nameProduct}</TdTableDesc>
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
                      <TdTable>{itemsCart.qtd}</TdTable>
                      <TdTablePrices>
                        {itemsCart.priceWithDiscount <
                        itemsCart.priceNoDiscount ? (
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
                        ) : (
                          <PricesFormat
                            placeholder=""
                            displayType="text"
                            value={itemsCart.priceNoDiscount || 0}
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        )}
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
                  <TdPayments>QTD Itens</TdPayments>
                    <TdValues>{infoPrint?.sizeItens}</TdValues>
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
            <InfoWorldSoft>Desenvolvido por Worldsoft Inc</InfoWorldSoft>
          </DivOrgTable>
        </DivOrgInfoAnimation>

        <DivOrgBtnBudget>
          <DivOrgBtnClose>
            <TitleAnimation>Reimpressão de Orçamento</TitleAnimation>
            <BtnClose
              onClick={() => {
                props.setPrintView(false);
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
                <OptionsPaper value={false}>Cupom</OptionsPaper>
              </SelectPaper>
            </DivOrgSelect>
            {/* <BtnPrint type="button" onClick={printBudget}>
              Imprimir Comprovante
            </BtnPrint> */}
            <BtnPrint type="button" onClick={exportPDF}>
              Baixar Comprovante em PDF
            </BtnPrint>
          </DivOptions>
          <WhatsappMsg sendWpp={sendWpp} setSendWpp={setSendWpp} />
        </DivOrgBtnBudget>
      </DivOrgScreen>
    </DivBudgetAnimation>
  );
}
