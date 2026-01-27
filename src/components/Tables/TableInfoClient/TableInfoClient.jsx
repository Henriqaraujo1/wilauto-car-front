import React, { useEffect, useState } from "react";
import {
  DivTableClient,
  DivTableInfo,
  DivClient,
  DivClientInfo,
  DivOrgInfo,
  DivOrgLoading,
  BtnView,
  DivBtnView,
  BtnPayment,
  DivOrgCard,
  DivFilter,
  DivOrgFilter,
  DivOrgInputs,
  FilterLabel,
  CodInput,
  InputDate,
  DivOrgBtn,
  BtnPrint,
  BtnFormPayment,
} from "./TableInfoClientStyle";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import InfoResumeClientDetail from "../../Info/InfoResumeClientDetail/InfoResumeClientDetail";
import { ClipLoader } from "react-spinners";
import {
  Close,
  MonetizationOn,
  Money,
  Print,
  Search,
  Visibility,
} from "@styled-icons/material";
import PrintOrder from "../../Details/PrintOrder/PrintOrder";
import InfoReceiveOrder from "../../Info/InfoReceive/InfoReceive";
import InfoResumeClientPayed from "../../Info/InfoResumeClientPayed/InfoResumeClientPayed";
import { DollarSign } from "lucide-react";

export default function TableInfoClient({ detailsClient, setLoadingPayments }) {
  const infoOrders = detailsClient;

  // Instancia de formatação de datas
  const formatDate = new FormatDatesFront();

  // Estado para visualização de detalhes do pedido
  const [selectDetailView, setSelectDetailView] = useState();
  const [detailView, setDetailView] = useState(false);

  // Estado para visualização de impressão do pedido
  const [selectPrintView, setSelectPrintView] = useState();
  const [printView, setPrintView] = useState(false);

  // Estado para visualização de detalhes de pagamento
  const [selectPayView, setSelectPayView] = useState();
  const [paymentView, setPaymentView] = useState(false);
  const [infoPayment, setInfoPayment] = useState(false);

  // Estado para filtros
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterDateStartOrder, setFilterDateStartOrder] = useState("");
  const [filterDateFinishOrder, setFilterDateFinishOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrder] = useState([]);

  //
  const [selectFormPayment, setSelectFormPayment] = useState([]);
  const [formPaymentView, setFormPaymentView] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const createListOrders = (dataClient) => {
    setLoading(true);
    setShowList(true);

    if (showList) {
      setFilterInfoOrder(dataClient);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!infoOrders?.ordersList) return setFilterInfoOrder([]);

    let filtered = infoOrders?.ordersList;

    if (filterCodOrder > 0) {
      filtered = filtered.filter((order) => {
        return String(order.idOrder).startsWith(String(filterCodOrder));
      });
    }
    if (filterDateStartOrder) {
      filtered = filtered.filter((order) => {
        return (
          formatDate.compareDatesAfter(
            order.dateCreated,
            filterDateStartOrder
          ) >= 0
        );
      });
    }
    if (filterDateFinishOrder) {
      filtered = filtered.filter((order) => {
        return (
          formatDate.compareDatesAfter(
            order.dateCreated,
            filterDateFinishOrder
          ) <= 0
        );
      });
    }

    setFilterInfoOrder(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders, filterCodOrder, filterDateStartOrder, filterDateFinishOrder]);

  useEffect(() => {
    createListOrders(infoOrders?.ordersList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders?.ordersList]);

  return (
    <>
      <DivFilter>
        <DivOrgFilter>
          <DivOrgInputs>
            <FilterLabel>Nº do pedido</FilterLabel>
            <CodInput
              value={filterCodOrder}
              onValueChange={(values) => {
                setFilterCodOrder(parseInt(values.value));
              }}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <FilterLabel>Data Inicio</FilterLabel>
            <InputDate
              type="date"
              value={filterDateStartOrder}
              onChange={(e) => setFilterDateStartOrder(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <FilterLabel>Data Final</FilterLabel>
            <InputDate
              type="date"
              value={filterDateFinishOrder}
              onChange={(e) => setFilterDateFinishOrder(e.target.value)}
            />
          </DivOrgInputs>
        </DivOrgFilter>
      </DivFilter>
      <DivTableClient>
        <DivTableInfo>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#fff"} />
            </DivOrgLoading>
          ) : (
            filterInfoOrder.map((infoOrders, index) => {
              return (
                // Div de cada Item
                <DivClient key={index}>
                  <DivClientInfo>
                    <DivOrgCard>
                      <DivOrgInfo>
                        Nº do Pedido: <br />
                        {infoOrders.idOrder}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        Pedido realizado em: <br />
                        {infoOrders.dateCreated}
                      </DivOrgInfo>
                      {infoOrders.valueDiscount && (
                        <DivOrgInfo>
                          Desconto do pedido <br />
                          {infoOrders.valueDiscount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </DivOrgInfo>
                      )}
                      <DivOrgInfo>
                        Total <br />
                        {infoOrders.totalOrder.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        Vendedor: <br />
                        {infoOrders.nameEmployee}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        Quantidade Itens: <br />
                        {infoOrders.qtdItens}
                      </DivOrgInfo>

                      <DivOrgInfo>
                        Status: <br />
                        {infoOrders.statusOrder}
                      </DivOrgInfo>
                    </DivOrgCard>
                    <DivBtnView>
                      <DivOrgBtn>
                        <BtnView
                          type="button"
                          onClick={() => {
                            setSelectDetailView(infoOrders);
                            setDetailView(!detailView);
                            setPaymentView(false);
                            setFormPaymentView(false)
                          }}
                        >
                          <Visibility />
                        </BtnView>
                      {!infoOrders.infoPaymentsOrder && (
                        <BtnFormPayment
                          type="button"
                          onClick={() => {
                            setSelectFormPayment(infoOrders);
                            setFormPaymentView(!formPaymentView);
                            setDetailView(false);
                          }}
                        >
                          <DollarSign />
                        </BtnFormPayment>
                      )}
                        <BtnPrint
                          type="button"
                          onClick={() => {
                            setSelectPrintView(infoOrders);
                            setPrintView(!paymentView);
                            setDetailView(false);
                            setFormPaymentView(false)
                          }}
                        >
                          <Print />
                        </BtnPrint>
                      </DivOrgBtn>
                      {infoOrders.infoPaymentsOrder && (
                        <BtnPayment
                          type="button"
                          onClick={() => {
                            setSelectPayView(infoOrders);
                            setPaymentView(!paymentView);
                            setDetailView(false);
                          }}
                        >
                          Recebimento
                        </BtnPayment>
                      )}

                    </DivBtnView>
                  </DivClientInfo>
                  {detailView &&
                    infoOrders.idOrder === selectDetailView.idOrder && (
                      <InfoResumeClientDetail
                        selectDetailView={selectDetailView}
                        detailView={detailView}
                        setDetailView={setDetailView}
                      />
                    )}
                  {paymentView &&
                    infoOrders.idOrder === selectPayView.idOrder && (
                      <InfoReceiveOrder
                        selectPayView={selectPayView.idOrder}
                        paymentView={paymentView}
                        setPaymentView={setPaymentView}
                        setLoadingPayments={setLoadingPayments}
                        setInfoPayment={setInfoPayment}
                      />
                    )}
                  {formPaymentView &&
                    infoOrders.idOrder === selectFormPayment.idOrder && (
                      <InfoResumeClientPayed
                        selectFormPayment={selectFormPayment}
                        formPaymentView={formPaymentView}
                        setFormPaymentView={setFormPaymentView}
                      />
                    )}
                  {printView &&
                    infoOrders.idOrder === selectPrintView.idOrder && (
                      <PrintOrder
                        selectPrintView={selectPrintView}
                        printView={printView}
                        setPrintView={setPrintView}
                      />
                    )}
                </DivClient>
              );
            })
          )}
        </DivTableInfo>
      </DivTableClient>
    </>
  );
}
