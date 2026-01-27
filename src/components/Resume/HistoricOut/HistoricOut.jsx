import React, { useEffect, useState } from "react";
import {
  DivHistoricOut,
  TitleHistoricOut,
  TableHistoricOut,
  ItemOut,
  DivNameProductOut,
  TitleProductOut,
  InfoProductOut,
  DivInfoProductOut,
  DivOrgInfoOut,
  DivOrgLoading,
  DivFilterOut,
  FormProductOut,
  FilterInput,
  DivOrgInput,
  DivOrgBtn,
  BtnSearch,
  BtnCancel,
  LabelFilter,
  FormatValues,
  CodInput,
} from "./HistoricOutStyles";
import { ClipLoader } from "react-spinners";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { Close, Search } from "@styled-icons/material";

export default function HistoricOut(props) {
  const listProductOut = props.productOut;

  const formatDate = new FormatDatesFront();

  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(true);

  // State para filtros
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateFinish, setFilterDateFinish] = useState("");
  const [filterCodOrder, setFilterCodOrder] = useState("");
  const [filterInfoOrder, setFilterInfoOrders] = useState([]);

  const createListOutStock = (dataProductOut) => {
    setShowList(true);
    if (showList) {
      setFilterInfoOrders(dataProductOut);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filterOutOrders = () => {
    const filterList = listProductOut.filter((entryOrders) =>
      filterCodOrder > 0
        ? entryOrders.idStockOut === Number(filterCodOrder)
        : entryOrders
    ).filter((product) =>
    filterDateStart
      ? formatDate.compareDatesAfter(
          product.dateOut,
          filterDateStart
        ) >= 0
      : product
  )
  .filter((product) =>
    filterDateFinish
      ? formatDate.compareDatesAfter(
          product.dateOut,
          filterDateFinish
        ) <= -0
      : product
  );

    setFilterInfoOrders(filterList);
  };

  useEffect(() => {
    createListOutStock(listProductOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductOut]);

  return (
    <DivHistoricOut>
      <TitleHistoricOut>Saida</TitleHistoricOut>
      <DivFilterOut>
        <FormProductOut>
          <DivOrgInput>
            <LabelFilter>Nº do Pedido</LabelFilter>
            <CodInput
              value={filterCodOrder}
              onChange={(e) => setFilterCodOrder(Number(e.target.value))}
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
        </FormProductOut>
        <DivOrgBtn>
          <BtnSearch type="button" onClick={filterOutOrders}>
            <Search />
          </BtnSearch>
          <BtnCancel
            type="button"
            onClick={() => {
              setFilterCodOrder("");
              setFilterDateFinish("");
              setFilterDateStart("");
              setFilterInfoOrders(listProductOut);
            }}
          >
            <Close />
          </BtnCancel>
        </DivOrgBtn>
      </DivFilterOut>
      <TableHistoricOut>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoOrder.map((productOut, id) => {

            return (
              <ItemOut key={id}>
                <DivNameProductOut>
                  <TitleProductOut>{productOut.nameProduct}</TitleProductOut>
                  <InfoProductOut>Cod: {productOut.codProduct}</InfoProductOut>
                </DivNameProductOut>
                <DivInfoProductOut>
                  <DivOrgInfoOut>
                    <TitleProductOut>Nº Pedido</TitleProductOut>
                    <InfoProductOut>{productOut.idStockOut}</InfoProductOut>
                  </DivOrgInfoOut>
                  <DivOrgInfoOut>
                    <TitleProductOut>Data do Pedido</TitleProductOut>
                    <InfoProductOut>{productOut.dateOut}</InfoProductOut>
                  </DivOrgInfoOut>
                  <DivOrgInfoOut>
                    <TitleProductOut>QTD</TitleProductOut>
                    {(productOut.qtdRemoveByBatch > 0 && (
                      <InfoProductOut>
                        {productOut.qtdRemoveByBatch}
                      </InfoProductOut>
                    )) ||
                      (productOut.qtdRemoveNoBatch > 0 && (
                        <InfoProductOut>
                          {productOut.qtdRemoveNoBatch}
                        </InfoProductOut>
                      ))}
                  </DivOrgInfoOut>
                  <DivOrgInfoOut>
                    <TitleProductOut>Preço Unitario</TitleProductOut>
                    <FormatValues
                      placeholder=""
                      displayType="text"
                      value={productOut.priceUnit}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfoOut>
                  <DivOrgInfoOut>
                    <TitleProductOut>Total Retirado</TitleProductOut>
                    <FormatValues
                      placeholder=""
                      displayType="text"
                      value={productOut.valueTotalRemove}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfoOut>
                </DivInfoProductOut>
              </ItemOut>
            );
          })
        )}
      </TableHistoricOut>
    </DivHistoricOut>
  );
}
