import { Close, Edit, Search, Visibility } from "@styled-icons/material";
import React, { useEffect, useState } from "react";
import UpdateProductOut from "../../Update/UpdateProductOut/UpdateProductOut";
import InfoProductOut from "../../Info/InfoProductOut/InfoProductOut";

import {
  DivSearchItemOut,
  TitleItemOut,
  DivFilter,
  FilterLabel,
  FilterInput,
  BtnSearch,
  TableItemOut,
  DivItemOut,
  TypeItemOut,
  DivItemOutInfo,
  InfoItemOut,
  DivItemOutEdit,
  BtnEdit,
  IdItemOut,
  BtnView,
  DivInfo,
  DivOrgLoading,
  DivOrgData,
  DivOrgQtd,
  DivOrgPrice,
  DivOrgCard,
  InputDate,
  DivOrgInputs,
  DivOrgFilter,
  CodInput,
  BtnCancel,
  DivOrgId,
  CodItemOut,
  InputFilter,
} from "./SearchStockOutStyle";

import { ClipLoader } from "react-spinners";
import { DivOrgBtn } from "../../Search/SearchUser/SearchUserStyle";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function SearchStockOut(props) {
  const listProductOut = props.productOut;
  const formatDate = new FormatDatesFront();

  const [updtProductPopUp, setUpdtProductPopUp] = useState(false);
  const [selectedItemOutView, setSelectedItemOutView] = useState();

  const [productOutView, setProductOutView] = useState(false);

  const [filterCodStockOut, setFilterCodStockOut] = useState("");
  const [filterProductStockOut, setFilterProductStockOut] = useState("");
  const [filterDateStartOut, setFilterDateStartOut] = useState("");
  const [filterDateFinishOut, setFilterDateFinishOut] = useState("");
  const [filterInfoStockOut, setFilterInfoStockOut] = useState([]);

  const [loading, setLoading] = useState();
  const [loadingItemOut, setLoadingItemOut] = useState(false);
  const [showList, setShowList] = useState(false);
  const [dataItemOutUpdate, setDataItemOutUpdate] = useState([]);

  const createListStockOut = (dataStockOut) => {
    setLoading(true);
    setShowList(true);
    if (showList) {
      setFilterInfoStockOut(dataStockOut);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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

  const filterStockOut = () => {
    const filterList = listProductOut
      .filter((product) =>
        filterProductStockOut.length > 0
          ? product.nameProduct.includes(parseName(filterProductStockOut))
          : product
      )
      .filter((product) =>
        filterCodStockOut > 0 ? product.codProd === filterCodStockOut : product
      )
      .filter((product) =>
        filterDateStartOut
          ? formatDate.compareDatesAfter(product.dateOut, filterDateStartOut) >=
            0
          : product
      )
      .filter((product) =>
        filterDateFinishOut
          ? formatDate.compareDatesAfter(
              product.dateOut,
              filterDateFinishOut
            ) <= 0
          : product
      );

    setFilterInfoStockOut(filterList);
  };

  useEffect(() => {
    createListStockOut(listProductOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductOut]);

  useEffect(() => {
    setLoading(true);
    if (loadingItemOut) {
      props.setLoadingItens(true);
    }
    setTimeout(() => {
      setLoadingItemOut(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingItemOut]);

  return (
    <DivSearchItemOut>
      <TitleItemOut>Historico de Retirada de Itens</TitleItemOut>
      <DivFilter show={props.disableFilter}>
        <DivOrgFilter>
          <DivOrgInputs>
            <FilterLabel>Produto</FilterLabel>
            <FilterInput
              value={filterProductStockOut}
              onChange={(e) => setFilterProductStockOut(e.target.value)}
            />
            <FilterLabel>Codigo do Produto</FilterLabel>
            <InputFilter
              value={filterCodStockOut}
              onChange={(e) => setFilterCodStockOut(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <FilterLabel>Data Inicio</FilterLabel>
            <InputDate
              type="date"
              value={filterDateStartOut}
              onChange={(e) => setFilterDateStartOut(e.target.value)}
            />
            <FilterLabel>Data Final</FilterLabel>
            <InputDate
              type="date"
              value={filterDateFinishOut}
              onChange={(e) => setFilterDateFinishOut(e.target.value)}
            />
            <DivOrgBtn>
              <BtnSearch type="button" onClick={filterStockOut}>
                <Search />
              </BtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterCodStockOut("");
                  setFilterProductStockOut("");
                  setFilterDateStartOut("");
                  setFilterDateFinishOut("");
                  setFilterInfoStockOut(listProductOut);
                }}
              >
                <Close />
              </BtnCancel>
            </DivOrgBtn>
          </DivOrgInputs>
        </DivOrgFilter>
      </DivFilter>
      <TableItemOut>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoStockOut.map((productOutInfo, index) => {
            return (
              <DivItemOut key={index}>
                <DivOrgCard>
                  <DivOrgId>
                    <IdItemOut>{index + 1}</IdItemOut>
                  </DivOrgId>
                  <DivInfo>
                    <TypeItemOut>
                      Produto: {productOutInfo.nameProduct}
                    </TypeItemOut>
                    <CodItemOut>Cod: {productOutInfo.codProd}</CodItemOut>
                  </DivInfo>
                  <DivItemOutInfo>
                    <DivOrgData>
                      <InfoItemOut>Data Saida: </InfoItemOut>
                      <InfoItemOut>{productOutInfo.dateOut}</InfoItemOut>
                    </DivOrgData>
                    <DivOrgQtd>
                      <InfoItemOut>QTD</InfoItemOut>
                      <InfoItemOut>
                        {productOutInfo.qtdRemoveNoBatch ||
                          productOutInfo.qtdRemoveByBatch ||
                          productOutInfo.qtdToRemove}
                      </InfoItemOut>
                    </DivOrgQtd>
                    <DivOrgPrice>
                      <InfoItemOut>P. UN</InfoItemOut>
                      <CodInput
                        value={productOutInfo.priceUnit}
                        placeholder=""
                        displayType="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                      {/* <InfoItemOut>R$ {}</InfoItemOut> */}
                    </DivOrgPrice>
                    <DivOrgPrice>
                      <InfoItemOut>P.Total:</InfoItemOut>
                      <CodInput
                        value={productOutInfo.valueTotalRemove}
                        placeholder=""
                        displayType="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </DivOrgPrice>
                  </DivItemOutInfo>
                  <DivItemOutEdit>
                    <BtnEdit
                      onClick={() => {
                        setUpdtProductPopUp(!updtProductPopUp);
                        setDataItemOutUpdate(productOutInfo);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {updtProductPopUp &&
                      productOutInfo.idStockOut ===
                        dataItemOutUpdate.idStockOut && (
                        <UpdateProductOut
                          dataItemOutUpdate={dataItemOutUpdate}
                          updtProductPopUp={updtProductPopUp}
                          setUpdtProductPopUp={setUpdtProductPopUp}
                          setLoadingItemOut={setLoadingItemOut}
                        />
                      )}
                    <BtnView
                      onClick={() => {
                        setProductOutView(!productOutView);
                        setSelectedItemOutView(productOutInfo);
                      }}
                    >
                      <Visibility />
                    </BtnView>
                  </DivItemOutEdit>
                </DivOrgCard>
                {productOutView &&
                  productOutInfo.idStockOut ===
                    selectedItemOutView.idStockOut && (
                    <InfoProductOut
                      selectedItemOutView={selectedItemOutView}
                      productOutView={productOutView}
                      setProductOutView={setProductOutView}
                    />
                  )}
              </DivItemOut>
            );
          })
        )}
      </TableItemOut>
    </DivSearchItemOut>
  );
}
