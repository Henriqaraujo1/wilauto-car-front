import React, { useEffect, useState } from "react";
import {
  DivTableStock,
  DivTableInput,
  DivCardItem,
  DivItem,
  NameItem,
  BrandItem,
  QtdItem,
  DivBtn,
  DivFilter,
  LinkPage,
  IdItem,
  DivId,
  DivItemQtd,
  DivOrgCard,
  DivOrgInfo,
  CodItem,
  DivOrgInput,
  BrandInput,
  NameInput,
  CodInput,
  DivOrgInputsFilter,
  InfoLabel,
  DivOrgStock,
  DivOrgLoading,
  DivOrgBtnTable,
  BtnExport,
} from "./TableStockStyle";
import ButtonAdd from "../../Button/ButtonAdd";
import { ClipLoader } from "react-spinners";
import { History, More } from "@styled-icons/material";

export default function TableStock({ stockNow, disableFilter }) {
  const listProductStock = stockNow;
  const [showList, setShowList] = useState(false);

  const [filterCodStock, setFilterCodStock] = useState("");
  const [filterProductStock, setFilterProductStock] = useState("");
  const [filterBrandStock, setFilterBrandStock] = useState("");
  const [filterInfoStock, setFilterInfoStock] = useState([]);
  const [loading, setLoading] = useState(false);

  const createListStock = (dataStock) => {
    setShowList(true);

    if (showList) {
      setFilterInfoStock(dataStock);
    }
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
    if (!listProductStock) return setFilterInfoStock([]);

    let filtered = listProductStock;

    if (filterProductStock.length > 0) {
      filtered = filtered.filter((item) =>
        item.nameProduct
          .toLowerCase()
          .includes(filterProductStock.toLowerCase())
      );
    }

    if (filterBrandStock.length > 0) {
      filtered = filtered.filter((item) =>
        item.brandName.toLowerCase().includes(filterBrandStock.toLowerCase())
      );
    }

    if (filterCodStock > 0) {
      filtered = filtered.filter((item) => {
        return String(item.codProd).startsWith(String(filterCodStock));
      });
    }

    setFilterInfoStock(filtered);
  }, [listProductStock, filterProductStock, filterCodStock, filterBrandStock]);

  useEffect(() => {
    createListStock(listProductStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductStock]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [filterInfoStock]);

  return (
    <DivOrgStock>
      <DivFilter>
        <ButtonAdd />
        <DivOrgInput show={disableFilter}>
          <DivOrgInputsFilter>
            <InfoLabel>Nome do Produto</InfoLabel>
            <NameInput
              value={filterProductStock}
              onChange={(e) => setFilterProductStock(e.target.value)}
            />
          </DivOrgInputsFilter>
          <DivOrgInputsFilter>
            <InfoLabel>Categoria</InfoLabel>
            <BrandInput
              value={filterBrandStock}
              onChange={(e) => setFilterBrandStock(e.target.value)}
            />
          </DivOrgInputsFilter>
          <DivOrgInputsFilter>
            <InfoLabel>Codigo do Produto</InfoLabel>
            <CodInput
              value={filterCodStock}
              onValueChange={(values) => {
                setFilterCodStock(Number(values.value));
              }}
            />
          </DivOrgInputsFilter>
        </DivOrgInput>
      </DivFilter>
      <DivTableStock>
        <DivTableInput>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color="#fff" />
            </DivOrgLoading>
          ) : (
            filterInfoStock.map((productStock, id) => {
              return (
                <DivCardItem key={id}>
                  <DivId>
                    <IdItem>{id + 1}</IdItem>
                  </DivId>
                  <DivOrgCard>
                    <DivItem>
                      <NameItem>{parseName(productStock.nameProduct)}</NameItem>
                      <DivOrgInfo>
                        <CodItem>Código: {productStock.codProd}</CodItem>
                        <BrandItem>
                          Categoria: {parseName(productStock.brandName)}
                        </BrandItem>
                      </DivOrgInfo>
                    </DivItem>
                    <DivOrgInfo>
                      <DivItemQtd>
                        <QtdItem>QTD Total</QtdItem>
                        <QtdItem>{productStock.totalQtd}</QtdItem>
                      </DivItemQtd>
                    </DivOrgInfo>
                  </DivOrgCard>

                  <DivBtn>
                    <LinkPage
                      to="historic-stock"
                      state={{ productStock: productStock }}
                    >
                      <History />
                    </LinkPage>
                    <LinkPage
                      to="details"
                      state={{ productStock: productStock }}
                    >
                      <More />
                    </LinkPage>
                  </DivBtn>
                </DivCardItem>
              );
            })
          )}
        </DivTableInput>
        <DivOrgBtnTable>
          <BtnExport type="button" to="print-stock">
            Exportar para Excel
          </BtnExport>
        </DivOrgBtnTable>
      </DivTableStock>
    </DivOrgStock>
  );
}
