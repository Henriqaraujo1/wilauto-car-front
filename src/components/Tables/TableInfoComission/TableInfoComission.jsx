import React, { useEffect, useState } from "react";
import {
  DivTableComission,
  DivTableInfo,
  DivComission,
  DivComissionInfo,
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
  BtnSearch,
  BtnCancel,
  Info,
  PriceInfo,
} from "./TableInfoComissionStyle";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { ClipLoader } from "react-spinners";
import {
  Close,
  MonetizationOn,
  Search,
  Visibility,
} from "@styled-icons/material";
import InfoResumeClientDetail from "../../Info/InfoResumeClientDetail/InfoResumeClientDetail";
import InfoResumeClientPayment from "../../Info/InfoResumeClientPayment/InfoResumeClientPayment";

export default function TableInfoComission(props) {
  const infoOrders = props.detailsComission;

  // Instancia de formatação de datas
  const formatDate = new FormatDatesFront();

  // Estado para visualização de detalhes do pedido
  const [selectDetailView, setSelectDetailView] = useState();
  const [detailView, setDetailView] = useState(false);

  // Estado para visualização de detalhes de pagamento
  const [selectPayView, setSelectPayView] = useState();
  const [paymentView, setPaymentView] = useState(false);

  // Estado para filtros
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterDateStartOrder, setFilterDateStartOrder] = useState("");
  const [filterDateFinishOrder, setFilterDateFinishOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrder] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const createListOrders = (dataComission) => {
    setLoading(true);
    setShowList(true);
    if (showList) {
      setFilterInfoOrder(dataComission);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filterOrders = () => {
    const filterList = infoOrders
      .filter((order) =>
        filterCodOrder > 0 ? order.idOrder === filterCodOrder : order
      )
      .filter((product) =>
        filterDateStartOrder
          ? formatDate.compareDatesAfter(
              product.dateCreated,
              filterDateStartOrder
            ) >= 0
          : product
      )
      .filter((product) =>
        filterDateFinishOrder
          ? formatDate.compareDatesAfter(
              product.dateCreated,
              filterDateFinishOrder
            ) <= -0
          : product
      );

    setFilterInfoOrder(filterList);
  };

  useEffect(() => {
    createListOrders(infoOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders]);

  return (
    <>
      <DivFilter>
        <DivOrgFilter>
          <DivOrgInputs>
            <FilterLabel>Nº do pedido</FilterLabel>
            <CodInput
              value={filterCodOrder}
              onValueChange={(values, sourceInfo) => {
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
          <DivOrgBtn>
            <BtnSearch type="button" onClick={filterOrders}>
              <Search />
            </BtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCodOrder("");
                setFilterDateStartOrder("");
                setFilterDateFinishOrder("");
                setFilterInfoOrder(infoOrders);
              }}
            >
              <Close />
            </BtnCancel>
          </DivOrgBtn>
        </DivOrgFilter>
      </DivFilter>
      <DivTableComission>
        <DivTableInfo>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#fff"} />
            </DivOrgLoading>
          ) : (
            filterInfoOrder.map((infoOrders, index) => {
              return (
                <DivComission key={index}>
                  <DivComissionInfo>
                    <DivOrgCard>
                      <DivOrgInfo>
                        <Info>Numero do Pedido: </Info>
                        <Info>{infoOrders?.idOrder}</Info>
                      </DivOrgInfo>
                      <DivOrgInfo>
                        <Info>Pedido realizado em:</Info>
                        <Info>{infoOrders?.dateCreated}</Info>
                      </DivOrgInfo>
                      {infoOrders?.valueDiscount > 0 && (
                        <DivOrgInfo>
                          <Info>Desconto do pedido</Info>
                          <PriceInfo
                            displayType="text"
                            value={infoOrders?.valueDiscount}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgInfo>
                      )}
                      <DivOrgInfo>
                        <Info>Total Vendido</Info>
                        <PriceInfo
                          displayType="text"
                          value={infoOrders?.totalOrder}
                          decimalSeparator=","
                          fixedDecimalScale
                          thousandSeparator="."
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </DivOrgInfo>
                      <DivOrgInfo>
                        <Info>Valor da Comissão</Info>
                        <PriceInfo
                          displayType="text"
                          value={infoOrders?.valueComission}
                          decimalSeparator=","
                          fixedDecimalScale
                          thousandSeparator="."
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </DivOrgInfo>
                      <DivOrgInfo>
                        <Info>Status Comissão</Info>
                        <Info>{infoOrders?.statusPaymentComission}</Info>
                      </DivOrgInfo>
                      {infoOrders?.statusPaymentComission ? (
                        <></>
                      ) : (
                        <DivOrgInfo>
                          <Info>Pagamento comissão</Info>
                          <Info>
                            {formatDate.formatDateInput(
                              infoOrders?.datePaymentComission
                            ) || "Ainda não foi paga"}
                          </Info>
                        </DivOrgInfo>
                      )}
                    </DivOrgCard>
                    <DivBtnView>
                      <BtnView
                        onClick={() => {
                          setSelectDetailView(infoOrders);
                          setDetailView(!detailView);
                          setPaymentView(false);
                        }}
                      >
                        <Visibility />
                      </BtnView>
                      <BtnPayment
                        onClick={() => {
                          setSelectPayView(infoOrders);
                          setPaymentView(!paymentView);
                          setDetailView(false);
                        }}
                      >
                        <MonetizationOn />
                      </BtnPayment>
                    </DivBtnView>
                  </DivComissionInfo>
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
                      <InfoResumeClientPayment
                        selectPayView={selectPayView}
                        paymentView={paymentView}
                        setPaymentView={setPaymentView}
                      />
                    )}
                </DivComission>
              );
            })
          )}
        </DivTableInfo>
      </DivTableComission>
    </>
  );
}
