import { useEffect, useState } from "react";
import {
  DivOrgProduct,
  BtnView,
  TitleProduct,
  DivBtnEdit,
  DivBtnSearch,
  DivProduct,
  DivProductInfo,
  DivSearch,
  DivSearchSubProduct,
  DivTableSearch,
  DivInfo,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgCard,
  IdProduct,
  DivOrgId,
  DivBtnFilter,
  BtnCancel,
  CodInput,
  DivBtnClose,
  BtnClose,
} from "./InfoListSubProduct.style";
import { Close, Visibility } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import InfoSubProduct from "../InfoSubProduct/InfoSubProduct";

export default function InfoListSubProduct({
  popUpList,
  setPopUpList,
  listSubProduct,
}) {
  const [filterCodProduct, setFilterCodProduct] = useState("");
  const [filterNameProduct, setFilterNameProduct] = useState("");
  const [filterInfoProduct, setFilterInfoProduct] = useState([]);
  const [selectedProductView, setSelectProductView] = useState([]);

  const [subProductView, setProductView] = useState(false);
  const [showList, setShowList] = useState(false);


  const parseName = (oneName) => {
    const fullName = oneName;

    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    setShowList(true);
    if (!listSubProduct?.subProduct) return setFilterInfoProduct([]);

    let filtered = listSubProduct?.subProduct;

    const filterCod = Number(filterCodProduct);
    if (filterCodProduct && !isNaN(filterCod)) {
      filtered = filtered.filter(
        (subProduct) => subProduct.codSubProd === filterCod
      );
    }

    if (filterNameProduct.length > 0) {
      filtered = filtered.filter((subProduct) =>
        subProduct.nameSubProduct
          .toLowerCase()
          .includes(filterNameProduct.toLowerCase())
      );
    }

    setFilterInfoProduct(filtered);
  }, [listSubProduct, filterCodProduct, filterNameProduct]);

  return (
    <DivOrgProduct show={popUpList}>
      <DivSearchSubProduct>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setPopUpList(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivSearch>
          <TitleProduct>Consulta Sub-Produtos</TitleProduct>
          <DivBtnFilter>
            <NameLabel>Nome</NameLabel>
            <NameInput
              value={filterNameProduct}
              onChange={(e) => setFilterNameProduct(e.target.value)}
            />
            <NameLabel>Codigo</NameLabel>
            <CodInput
              value={filterCodProduct}
              onValueChange={(values) => {
                setFilterCodProduct(values.value);
              }}
            />
            <DivBtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterCodProduct("");
                  setFilterNameProduct("");
                  setFilterInfoProduct(listSubProduct);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivBtnFilter>
        </DivSearch>
        <DivTableSearch>
          {!showList ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterInfoProduct.map((infoProduct, index) => {
              return (
                <DivProduct key={index}>
                  <DivOrgCard>
                    <DivInfo>
                      <DivOrgId>
                        <IdProduct>{index + 1}</IdProduct>
                      </DivOrgId>
                      <DivProductInfo>
                        <SpanName>
                          {parseName(infoProduct.nameProduct)}
                        </SpanName>
                        <SpanCod>Codigo: {infoProduct.codProd}</SpanCod>
                      </DivProductInfo>
                    </DivInfo>
                    <DivBtnEdit>
                      <BtnView
                        type="button"
                        onClick={() => {
                          setProductView(!subProductView);
                          setSelectProductView(infoProduct);
                        }}
                      >
                        <Visibility />
                      </BtnView>
                    </DivBtnEdit>
                  </DivOrgCard>
                  {subProductView &&
                    infoProduct.idSubProduct ===
                      selectedProductView.idSubProduct && (
                      <InfoSubProduct
                        selectedProductView={selectedProductView}
                        subProductView={subProductView}
                        setProductView={setProductView}
                      />
                    )}
                </DivProduct>
              );
            })
          )}
        </DivTableSearch>
      </DivSearchSubProduct>
    </DivOrgProduct>
  );
}
