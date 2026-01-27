import React, { useEffect, useState } from "react";
import {
  DivHistoricEntry,
  TitleHistoricEntry,
  TableHistoricEntry,
  ItemEntry,
  DivNameProduct,
  DivInfoProduct,
  DivOrgInfo,
  TitleProduct,
  InfoProduct,
  DivOrgLoading,
  DivFilterEntry,
  FormProductEntry,
  FilterInput,
  DivOrgInput,
  DivOrgBtn,
  BtnSearch,
  BtnCancel,
  LabelFilter,
  InfoProductTitle,
  FormatValues,
  CodInput,
  BtnEdit,
  DivOrgName,
  DivOrgBtnEdit,
} from "./HistoricEntryStyle";
import { ClipLoader } from "react-spinners";

import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { Close, Edit, Search } from "@styled-icons/material";
import UpdateItem from "../../Update/UpdatePriceItem/UpdatePriceItem";

export default function HistoricEntry(props) {
  const listProductEntry = props.productEntry;

  const formatDate = new FormatDatesFront();

  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(true);

  // State para fitlros
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateFinish, setFilterDateFinish] = useState("");
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrders] = useState([]);

  // State Para editar valores
  const [selectedItemView, setSelectedItemView] = useState();
  const [itemView, setItemView] = useState(false);

  const createListEntryStock = (dataProductEntry) => {
    setShowList(true);
    if (showList) {
      setFilterInfoOrders(dataProductEntry);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filterEntryOrders = () => {
    
    const filterList = listProductEntry
      .filter((entryOrders) =>
        filterCodOrder > 0
          ? entryOrders.idStockEntry === Number(filterCodOrder)
          : entryOrders
      )
      .filter((product) =>
        filterDateStart
          ? formatDate.compareDatesAfter(product.dateEntry, filterDateStart) >=
            0
          : product
      )
      .filter((product) =>
        filterDateFinish
          ? formatDate.compareDatesAfter(product.dateEntry, filterDateFinish) <=
            -0
          : product
      );


    setFilterInfoOrders(filterList);
  };

  useEffect(() => {
    createListEntryStock(listProductEntry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductEntry]);

  return (
    <DivHistoricEntry>
      <TitleHistoricEntry>Entradas</TitleHistoricEntry>
      <DivFilterEntry>
        <FormProductEntry>
          <DivOrgInput>
            <LabelFilter>Nº do Pedido</LabelFilter>
            <CodInput
              value={filterCodOrder}
              onChange={(e) => setFilterCodOrder(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <LabelFilter>Data Inicio</LabelFilter>
            <FilterInput
              type="date"
              value={filterDateStart}
              onChange={(e) => setFilterDateStart(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <LabelFilter>Data Final</LabelFilter>
            <FilterInput
              type="date"
              value={filterDateFinish}
              onChange={(e) => setFilterDateFinish(e.target.value)}
            />
          </DivOrgInput>
        </FormProductEntry>
        <DivOrgBtn>
          <BtnSearch type="button" onClick={filterEntryOrders}>
            <Search />
          </BtnSearch>
          <BtnCancel
            type="button"
            onClick={() => {
              setFilterCodOrder("");
              setFilterDateFinish("");
              setFilterDateStart("");
              setFilterInfoOrders(listProductEntry);
            }}
          >
            <Close />
          </BtnCancel>
        </DivOrgBtn>
      </DivFilterEntry>

      <TableHistoricEntry>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoOrder.map((productsStock, id) => {
            return (
              <ItemEntry key={id}>
                <DivNameProduct>
                  <DivOrgName>
                    <TitleProduct>{productsStock.nameProduct}</TitleProduct>
                    <InfoProduct>Cod: {productsStock.codProduct}</InfoProduct>
                  </DivOrgName>
                  <DivOrgBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setItemView(!itemView);
                        setSelectedItemView(productsStock);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                  </DivOrgBtnEdit>
                </DivNameProduct>
                <DivInfoProduct>
                  <DivOrgInfo>
                    <InfoProductTitle>Nº Pedido</InfoProductTitle>
                    <InfoProduct>{productsStock.idStockEntry}</InfoProduct>
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <TitleProduct>Data do Pedido</TitleProduct>
                    <InfoProduct>{productsStock.dateEntry}</InfoProduct>
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <TitleProduct>QTD</TitleProduct>
                    <InfoProduct>{productsStock.qtd}</InfoProduct>
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <TitleProduct>Preço Unidade</TitleProduct>
                    <FormatValues
                      customInput={InfoProduct}
                      displayType="text"
                      value={productsStock.priceUnit}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"US$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <TitleProduct>Cotação do dia</TitleProduct>
                    <FormatValues
                      customInput={InfoProduct}
                      displayType="text"
                      value={productsStock.valueDolar}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <TitleProduct>Total</TitleProduct>
                    <FormatValues
                      displayType="text"
                      value={productsStock.priceTotal}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                </DivInfoProduct>

                {itemView &&
                  productsStock.idStockEntry ===
                    selectedItemView.idStockEntry && (
                    <UpdateItem
                      selectedItemView={selectedItemView}
                      itemView={itemView}
                      setItemView={setItemView}
                      getProductEntry={props.getProductEntry}
                    />
                  )}
              </ItemEntry>
            );
          })
        )}
      </TableHistoricEntry>
    </DivHistoricEntry>
  );
}
