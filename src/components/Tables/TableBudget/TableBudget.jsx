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
  BtnPrint,
  DivBtnFinish,
  BtnFinish,
  BtnCanceled,
  DivOrgResults,
  InfoResult,
  DivBtnEdit,
  BtnEdit,
  SelectClient,
  DivOrgChangeClient,
  DivOrgInfoBudget,
  BtnClose,
} from "./TableBudget.style";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { ClipLoader } from "react-spinners";
import {
  Close,
  MonetizationOn,
  Print,
  Visibility,
} from "@styled-icons/material";
import InfoResumeClientPayment from "../../Info/InfoResumeClientPayment/InfoResumeClientPayment";
import InfoResumeBudgetDetail from "../../Info/InfoResumeBudget/InfoResumeBudget";
import { NumericFormat } from "react-number-format";
import ReprintBudget from "../../Details/ReprintBudget/ReprintBudget";
import { useDispatch } from "react-redux";
import { getNextNumberOrder } from "../../../store/commercial/finishOrder.actions";
import {
  upBudgetClient,
  upBudgetOrder,
} from "../../../store/budget/budget.actions";
import { checkoutOrder } from "../../../store/commercial/finishOrder.actions";

export default function TableBudget({
  listBudgets,
  setLoadingBudgets,
  listClient,
}) {
  const infoBudgets = listBudgets;
  const listClientsInfo = listClient;
  const dispatch = useDispatch();

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

  // Estado para filtros
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterDateStartOrder, setFilterDateStartOrder] = useState("");
  const [filterDateFinishOrder, setFilterDateFinishOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrder] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const [nextNumber, setNextNumber] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [orderStatusById, setOrderStatusById] = useState({});

  // Estado para mudança de cliente
  const [optionsClients, setOptionsClients] = useState([]);
  const [editingClientIndex, setEditingClientIndex] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);

  // Estado para forma de pagamento
  const [statusPayment, setStatusPayment] = useState({});
  const [formPayment, setFormPayment] = useState([]);

  const createListOrders = (dataClient) => {
    setLoading(true);
    setShowList(true);
    console.log(dataClient);
    if (showList) {
      setFilterInfoOrder(dataClient);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const nextNumberOrder = async () => {
    const numberOrder = await dispatch(getNextNumberOrder());

    setNextNumber(numberOrder.payload);
  };

  const cancelBudget = async (dataBudget) => {
    const budgetId = dataBudget.idBudget;
    setLoadingOrderId(budgetId);

    const infoBudget = {
      idBudget: dataBudget.idBudget,
      statusBudget: "reprovado",
    };

    const upBudget = await dispatch(upBudgetOrder(infoBudget));

    setOrderStatusById((prev) => ({
      ...prev,
      [budgetId]: upBudget.payload,
    }));

    setTimeout(() => {
      setLoadingOrderId(null);
    }, 700);

    setTimeout(() => {
      setOrderStatusById({});

      setLoadingBudgets(true);
    }, 2000);
  };

  const createOrder = async (dataBudget) => {
    const budgetId = dataBudget.idBudget;
    setLoadingOrderId(budgetId);

    const infoOrder = { ...dataBudget };

    infoOrder.idOrder = nextNumber.lastNumber + 1;
    infoOrder.discountOption = dataBudget.infoPayment.discountOption;
    infoOrder.formPayment = Object.values(formPayment)[0];
    infoOrder.valueChange = dataBudget.infoPayment.valueChange;
    infoOrder.valueClientPayed = dataBudget.infoPayment.valueClientPayed;
    infoOrder.valueDelivery = dataBudget.infoPayment.valueDelivery;
    infoOrder.valueDiscount = dataBudget.infoPayment.valueDiscount;
    infoOrder.valueNoDiscount = dataBudget.infoPayment.valueNoDiscount;
    infoOrder.valueWithDiscount = dataBudget.infoPayment.valueWithDiscount;
    const percentDiscount =
      infoOrder.priceNoDiscount > 0
        ? (infoOrder.valueDiscount / infoOrder.priceNoDiscount) * 100
        : 0;

    infoOrder.percentDiscount = Number(percentDiscount.toFixed(2));

    console.log(infoOrder);

    delete infoOrder.infoPayment;

    const newOrder = await dispatch(checkoutOrder(infoOrder));

    setOrderStatusById((prev) => ({
      ...prev,
      [budgetId]: newOrder.payload,
    }));

    setTimeout(() => {
      setLoadingOrderId(null);
    }, 700);

    setTimeout(() => {
      setFormPayment([]);
      nextNumberOrder();
    }, 2000);
  };

  useEffect(() => {
    console.log(statusPayment);
  }, [statusPayment]);

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

  const confirmNewClient = async (index, option) => {
    const budgetId = index;
    setLoadingOrderId(budgetId);

    if (option.length === 0)
      return alert("Selecione um cliente antes de confirmar.");

    const dataBudget = { idClient: option.value, idBudget: index };
    const newClient = await dispatch(upBudgetClient(dataBudget));

    setOrderStatusById((prev) => ({
      ...prev,
      [budgetId]: newClient.payload,
    }));

    setTimeout(() => {
      setLoadingOrderId(null);
    }, 100);

    setTimeout(() => {
      setEditingClientIndex(budgetId);
      setLoadingBudgets(true);
      setOrderStatusById({});
    }, 4000);
  };

  useEffect(() => {
    if (!infoBudgets) return setFilterInfoOrder([]);

    let filtered = infoBudgets;

    if (filterCodOrder) {
      filtered = filtered.filter((order) => {
        return String(order.idBudget).startsWith(String(filterCodOrder));
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
  }, [
    infoBudgets,
    filterCodOrder,
    filterDateStartOrder,
    filterDateFinishOrder,
  ]);

  useEffect(() => {
    createListOrders(infoBudgets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoBudgets]);

  useEffect(() => {
    nextNumberOrder();
  }, []);

  useEffect(() => {
    if (listClientsInfo?.length > 0) {
      const optionsClients = listClientsInfo.map((client) => ({
        value: client.idClient,
        label:
          client.clientName + " " + client.lastName + " / " + client.docClient,
        cpf: client.docClient,
      }));
      setOptionsClients(optionsClients);
    }
  }, [listClientsInfo]);

  useEffect(() => {
    console.log(filterInfoOrder);
    if (filterInfoOrder.length > 0) {
      setStatusPayment((prev) => {
        console.log(prev);
        const newStatus = { ...prev };
        filterInfoOrder.forEach((info) => {
          // Só define se ainda não existir
          if (newStatus[info.idBudget] === undefined) {
            newStatus[info.idBudget] = true;
          }
        });
        return newStatus;
      });
    }
  }, [filterInfoOrder]);

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
            filterInfoOrder.map((infoBudgets, index) => {
              const isEditing = editingClientIndex === index;
              return (
                // Div de cada Item
                <DivClient key={index}>
                  <DivClientInfo>
                    <DivOrgChangeClient>
                      Cliente:{" "}
                      {isEditing ? (
                        <SelectClient
                          name="nameClient"
                          placeholder="Buscar nome do Cliente"
                          options={optionsClients}
                          isClearable={true}
                          onChange={setSelectedClients}
                        />
                      ) : (
                        <>
                          {parseName(
                            infoBudgets.infoClient.clientName,
                            infoBudgets.infoClient.lastName
                          )}
                        </>
                      )}
                    </DivOrgChangeClient>
                    <DivBtnEdit>
                      {isEditing ? (
                        <BtnEdit
                          type="button"
                          onClick={() =>
                            confirmNewClient(
                              infoBudgets.idBudget,
                              selectedClients
                            )
                          }
                        >
                          Confirmar Cliente
                        </BtnEdit>
                      ) : (
                        <BtnEdit
                          type="button"
                          onClick={() => setEditingClientIndex(index)}
                        >
                          Mudar Cliente
                        </BtnEdit>
                      )}
                    </DivBtnEdit>
                  </DivClientInfo>
                  <DivClientInfo>
                    <DivOrgCard>
                      <DivOrgInfo>
                        Nº do Pedido: <br />
                        {infoBudgets.idBudget}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        Orçamento realizado em: <br />
                        {infoBudgets.dateCreated}
                      </DivOrgInfo>
                      {infoBudgets.valueDiscount > 0 && (
                        <DivOrgInfo>
                          Desconto do pedido <br />
                          <NumericFormat
                            value={infoBudgets.valueDiscount}
                            placeholder=""
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"US$ "}
                          />
                        </DivOrgInfo>
                      )}
                      <DivOrgInfo>
                        Total <br />
                        <NumericFormat
                          value={infoBudgets.totalBudget || 0}
                          placeholder=""
                          displayType="text"
                          decimalSeparator=","
                          thousandSeparator="."
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </DivOrgInfo>
                      {/* <DivOrgInfo>
                        Vendedor: <br />
                        {infoBudgets.nameEmployee}
                      </DivOrgInfo> */}
                      <DivOrgInfo>
                        Quantidade de Itens: <br />
                        {infoBudgets.qtdItens}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        QTD: <br />
                        {infoBudgets.sizeItens}
                      </DivOrgInfo>
                      <DivOrgInfo>
                        Status: <br />
                        {infoBudgets.statusBudget}
                      </DivOrgInfo>
                    </DivOrgCard>
                    <DivBtnView>
                      <BtnView
                        type="button"
                        onClick={() => {
                          setSelectDetailView(infoBudgets);
                          setDetailView(!detailView);
                          setPaymentView(false);
                        }}
                      >
                        <Visibility />
                      </BtnView>
                      <BtnPayment
                        type="button"
                        onClick={() => {
                          setSelectPayView(infoBudgets);
                          setPaymentView(!paymentView);
                          setDetailView(false);
                        }}
                      >
                        <MonetizationOn />
                      </BtnPayment>
                      <BtnPrint
                        type="button"
                        onClick={() => {
                          setSelectPrintView(infoBudgets);
                          setPrintView(!paymentView);
                          setDetailView(false);
                        }}
                      >
                        <Print />
                      </BtnPrint>
                    </DivBtnView>
                  </DivClientInfo>
                  {infoBudgets.statusBudget === "em analise" && (
                    <DivBtnFinish>
                      <BtnFinish
                        type="button"
                        onClick={() => {
                          createOrder(infoBudgets);
                          // setOpenPayments(true);
                        }}
                        disabled={!!statusPayment[infoBudgets.idBudget]}
                      >
                        {statusPayment[infoBudgets.idBudget]
                          ? "Adicione a Forma de Pagamento"
                          : "Aprovar"}
                      </BtnFinish>
                      <BtnCanceled
                        type="button"
                        onClick={() => cancelBudget(infoBudgets)}
                      >
                        Reprovar
                      </BtnCanceled>
                    </DivBtnFinish>
                  )}
                  <DivOrgInfoBudget>
                    {loadingOrderId === infoBudgets.idBudget ? (
                      <DivOrgLoading>
                        <ClipLoader speedMultiplier={3} color={"#000"} />
                      </DivOrgLoading>
                    ) : orderStatusById[infoBudgets.idBudget]?.errorStatus ? (
                      <DivOrgResults>
                        <InfoResult>
                          {orderStatusById[infoBudgets.idBudget].message}
                        </InfoResult>
                        <BtnClose
                          type="button"
                          onClick={() => {
                            setLoadingBudgets(true);
                            setOrderStatusById({});
                            setStatusPayment((prev) => ({
                              ...prev,
                              [infoBudgets.idBudget]: true, // volta para o estado inicial
                            }));
                          }}
                        >
                          <Close />
                        </BtnClose>
                      </DivOrgResults>
                    ) : orderStatusById[infoBudgets.idBudget]?.successStatus ? (
                      <DivOrgResults>
                        <InfoResult>
                          {orderStatusById[infoBudgets.idBudget].message}
                        </InfoResult>
                        <BtnClose
                          type="button"
                          onClick={() => {
                            setLoadingBudgets(true);
                            setOrderStatusById({});
                          }}
                        >
                          <Close />
                        </BtnClose>
                      </DivOrgResults>
                    ) : null}
                  </DivOrgInfoBudget>
                  {detailView &&
                    infoBudgets.idBudget === selectDetailView.idBudget && (
                      <InfoResumeBudgetDetail
                        selectDetailView={selectDetailView}
                        detailView={detailView}
                        setDetailView={setDetailView}
                        reloading={setLoadingBudgets}
                      />
                    )}
                  {paymentView &&
                    infoBudgets.idBudget === selectPayView.idBudget && (
                      <InfoResumeClientPayment
                        key={infoBudgets?.idBudget}
                        infoPayment={selectPayView}
                        paymentView={paymentView}
                        setPaymentView={setPaymentView}
                        formPaymentInfo={
                          formPayment[infoBudgets?.idBudget] || []
                        }
                        setStatusPayment={(value) =>
                          setStatusPayment((prev) => ({
                            ...prev,
                            [infoBudgets.idBudget]: value,
                          }))
                        }
                        setFormPayment={(data) =>
                          setFormPayment((prev) => ({
                            ...prev,
                            [infoBudgets?.idBudget]: data,
                          }))
                        }
                      />
                    )}
                  {printView &&
                    infoBudgets.idBudget === selectPrintView.idBudget && (
                      <ReprintBudget
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
