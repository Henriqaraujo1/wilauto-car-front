import { useEffect, useState } from "react";
import {
  DivTableProvider,
  DivTableInfo,
  DivProvider,
  IdProvider,
  DivProviderInfo,
  DivOrgInfo,
  DivOrgLoading,
  DivOrgProviderInfo,
  DivOrgCard,
  BtnView,
  DivBtnView,
  // BtnPayment,
  DivFilter,
  DivOrgFilter,
  DivOrgInputs,
  FilterLabel,
  CodInput,
  InputDate,
  DivOrgId,
  InfoOrders,
  DivOrgResume,
  BtnExpense,
} from "./TableInfoProviderStyle";

import { ClipLoader } from "react-spinners";
import {
  Close,
  // MonetizationOn,
  Search,
  Visibility,
} from "@styled-icons/material";

import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import InfoResumeProviderDetail from "../../Info/InfoResumeProviderDetail/InfoResumeProviderDetail";
import { NumericFormat } from "react-number-format";
import InfoPaymentStock from "../../Info/InfoPaymentStock/InfoPaymentStock";

export default function TableInfoProvider({
  detailsProvider,
  setLoadingPayments,
}) {
  const infoOrders = detailsProvider;

  const formatDate = new FormatDatesFront();

  // Estado para visualização de detalhes do pedido
  const [selectDetailView, setSelectDetailView] = useState();
  const [detailView, setDetailView] = useState(false);
  const [paymentView, setPaymentView] = useState(false);

  // Estado para visualização de detalhes de pagamento
  // const [selectPayView, setSelectPayView] = useState();
  // const [paymentView, setPaymentView] = useState(false);

  // Estado para filtros
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterDateStartOrder, setFilterDateStartOrder] = useState("");
  const [filterDateFinishOrder, setFilterDateFinishOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrder] = useState([]);

  const [loading, setLoading] = useState();
  const [showList, setShowList] = useState();

  const createListOrders = (dataProvider) => {
    setLoading(true);
    setShowList(true);
    if (showList) {
      setFilterInfoOrder(dataProvider);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!infoOrders?.orderList) return setFilterInfoOrder([]);

    let filtered = infoOrders?.orderList;

    if (filterCodOrder) {
      filtered = filtered.filter((order) => {
        return String(order.idStockEntry).startsWith(String(filterCodOrder));
      });
    }
    if (filterDateStartOrder) {
      filtered = filtered.filter((order) => {
        return formatDate.compareDatesAfter(order.dateEntry, filterDateStartOrder) >=
          0;
      });
    }
    if (filterDateFinishOrder) {
      filtered = filtered.filter((order) => {
        return formatDate.compareDatesAfter(order.dateEntry, filterDateFinishOrder) <=
          0;
      });
    }

    setFilterInfoOrder(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders, filterCodOrder, filterDateStartOrder, filterDateFinishOrder]);

  useEffect(() => {
    createListOrders(infoOrders?.orderList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders]);

  return (
    <DivOrgResume>
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
      <DivTableProvider>
        <DivTableInfo>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterInfoOrder.map((infoOrders, index) => {
              return (
                <DivProvider key={index}>
                  <DivProviderInfo>
                    <DivOrgCard>
                      <DivOrgId>
                        <IdProvider>Cod:</IdProvider>
                        <InfoOrders>{infoOrders.idStockEntry}</InfoOrders>
                      </DivOrgId>
                      <DivOrgProviderInfo>
                        <DivOrgInfo>
                          Data da Compra: <br />
                          {infoOrders.dateEntry}
                        </DivOrgInfo>
                        <DivOrgInfo>
                          Quantidade: <br />
                          {infoOrders.qtdItems}
                        </DivOrgInfo>
                        <DivOrgInfo>
                          Valor do Dolar foi de <br />
                          <NumericFormat
                            value={infoOrders?.valueDolar}
                            placeholder=""
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgInfo>
                        <DivOrgInfo>
                          Valor Total em Real
                          <br />
                          <NumericFormat
                            value={infoOrders?.valueFinalOrder}
                            placeholder=""
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgInfo>
                        {infoOrders.statusDelivery === "sim" && (
                          <DivOrgInfo>
                            Valor do Frete <br />
                            {infoOrders.valueDelivery.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </DivOrgInfo>
                        )}
                      </DivOrgProviderInfo>
                    </DivOrgCard>
                    <DivBtnView>
                      <BtnView
                        type="button"
                        onClick={() => {
                          setSelectDetailView(infoOrders);
                          setDetailView(!detailView);
                          // setPaymentView(false);
                        }}
                      >
                        <Visibility />
                      </BtnView>
                      <BtnExpense
                        type="button"
                        onClick={() => {
                          setSelectDetailView(infoOrders);
                          setPaymentView(!detailView);
                        }}
                      >
                        Pagamento
                      </BtnExpense>
                    </DivBtnView>
                  </DivProviderInfo>
                  {detailView &&
                    infoOrders.idStockEntry ===
                      selectDetailView.idStockEntry && (
                      <InfoResumeProviderDetail
                        selectDetailView={selectDetailView}
                        detailView={detailView}
                        setDetailView={setDetailView}
                      />
                    )}
                  {paymentView &&
                    infoOrders.idStockEntry ===
                      selectDetailView.idStockEntry && (
                      <InfoPaymentStock
                        selectDetailView={selectDetailView}
                        paymentView={paymentView}
                        setPaymentView={setPaymentView}
                        setLoadingPayments={setLoadingPayments}
                      />
                    )}
                </DivProvider>
              );
            })
          )}
        </DivTableInfo>
      </DivTableProvider>
    </DivOrgResume>
  );
}
