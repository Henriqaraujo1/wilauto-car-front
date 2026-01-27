import React, { useEffect, useState } from "react";
import {
  BodyInfo,
  SellDetail,
  DivOrgInfo,
  DivOrgTitle,
  HeaderInfo,
  InfoSellDetails,
  Item,
  NameInfo,
  RowInfo,
  TableSell,
  TableInfo,
  TitleIn,
  Value,
  DivFilter,
  DivOrgFilter,
  FilterLabel,
  CodInput,
  InputDate,
  DivOrgBtn,
  BtnCancel,
  BtnSearch,
  DivOrgBtnTable,
  BtnPrices,
  DivOrgLoading,
} from "./DetailSellStyle";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { Close, Search } from "@styled-icons/material";
import { DivOrgInputs } from "../../Tables/TableInfoClient/TableInfoClientStyle";
import ExcelPrintOrders from "../../Tables/PrintsTable/TablePrintOrders/FilePrint/ExcelPrintOrders";
import { ClipLoader } from "react-spinners";

export default function DetailSell({ resumeOrders, infoFilter }) {
  const infoOrders = resumeOrders;
  // Instancia de formatação de datas
  const formatDate = new FormatDatesFront();

  const [showList, setShowList] = useState();
  // Estado para filtros
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterDateStartOrder, setFilterDateStartOrder] = useState("");
  const [filterDateFinishOrder, setFilterDateFinishOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [printPopUp, setPrintPopUp] = useState(false);

  // ! - usar para formatar dois nomes Ex. (henrique silva)
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

  const createList = (dataOrders) => {
    setShowList(true);
    if (showList) {
      setFilterInfoOrder(dataOrders);
    }
  };

  useEffect(() => {
    if (!infoOrders) return setFilterInfoOrder([]);

    let filtered = infoOrders;

    if (filterCodOrder) {
      filtered = filtered.filter((order) => {
        return String(order.idOrder).startsWith(String(filterCodOrder));
      });
    }
    if (filterDateStartOrder) {
      filtered = filtered.filter((order) => {
        return (
          formatDate.compareDatesAfter(order.dateEntry, filterDateStartOrder) >=
          0
        );
      });
    }
    if (filterDateFinishOrder) {
      filtered = filtered.filter((order) => {
        return (
          formatDate.compareDatesAfter(
            order.dateEntry,
            filterDateFinishOrder
          ) <= -0
        );
      });
    }

    setFilterInfoOrder(filtered);
  }, [infoOrders, filterCodOrder, filterDateStartOrder, filterDateFinishOrder]);

  useEffect(() => {
    createList(infoOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrders]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, [infoOrders]);

  return (
    <TableSell>
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
          {/* <DivOrgBtn>
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
          </DivOrgBtn> */}
        </DivOrgFilter>
      </DivFilter>
      <InfoSellDetails>
        <SellDetail>
          <DivOrgTitle>
            <TitleIn>Vendas</TitleIn>
          </DivOrgTitle>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <DivOrgInfo>
              <TableInfo>
                <HeaderInfo>
                  <RowInfo>
                    <NameInfo>ID</NameInfo>
                    <NameInfo>Data de Venda</NameInfo>
                    <NameInfo>Desconto</NameInfo>
                    <NameInfo>Valor com Desconto</NameInfo>
                    <NameInfo>Valor sem desconto</NameInfo>
                    <NameInfo>Valor do Desconto</NameInfo>
                    <NameInfo>Valor pago</NameInfo>
                    <NameInfo>Valor do troco</NameInfo>
                    <NameInfo>Cliente</NameInfo>
                    <NameInfo>Cod. Itens</NameInfo>
                  </RowInfo>
                </HeaderInfo>
                <BodyInfo>
                  {filterInfoOrder?.map((order, index) => {
                    return (
                      <RowInfo key={index}>
                        <Item>{index + 1}</Item>
                        <Item>{order.dateCreated}</Item>
                        <Item>{order.discountOption}</Item>
                        <Item>
                          <Value
                            value={order.valueWithDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueNoDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueDiscount}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueClientPayed}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>
                          <Value
                            value={order.valueChange}
                            displayType="text"
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </Item>
                        <Item>{parseName(order?.nameClient)}</Item>
                        <Item>{order?.itens.join(", ")}</Item>
                      </RowInfo>
                    );
                  })}
                </BodyInfo>
              </TableInfo>
            </DivOrgInfo>
          )}
        </SellDetail>
      </InfoSellDetails>
      <DivOrgBtnTable>
        <BtnPrices type="button" onClick={() => setPrintPopUp(!printPopUp)}>
          Gerar Excel
        </BtnPrices>
      </DivOrgBtnTable>
      <ExcelPrintOrders
        printPopUp={printPopUp}
        infoOrders={filterInfoOrder}
        setPrintPopUp={setPrintPopUp}
        infoFilter={infoFilter}
      />
    </TableSell>
  );
}
