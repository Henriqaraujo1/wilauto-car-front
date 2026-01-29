import { useEffect, useState } from "react";
import UpdateProduct from "../../Update/UpdateProduct/UpdateProduct";
import InfoProduct from "../../Info/InfoProduct/InfoProduct";
import DeleteProduct from "../../DeleteComponent/DeleteProduct/DeleteProduct";
import { Edit, DeleteForever, Visibility, Close, FormatListBulleted } from "@styled-icons/material";
import {
  BtnEdit,
  BtnRemove,
  BtnView,
  TitleProduct,
  DivBtnEdit,
  DivBtnSearch,
  DivProduct,
  DivProductInfo,
  DivSearch,
  DivSearchProduct,
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
  DivOrgBtnTable,
  BtnPrices,
  BtnItems,
} from "./SearchProductStyle";

import { ClipLoader } from "react-spinners";

export default function SearchProduct({
  productsInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [productPopUp, setProductPopUp] = useState(false);
  const [delProductOption, setDelProductOption] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedProductView, setSelectedProductView] = useState();
  const [filterCodProduct, setFilterCodProduct] = useState("");
  const [filterNameProduct, setFilterNameProduct] = useState("");
  const [filterInfoProduct, setFilterInfoProduct] = useState([]);

  const [productView, setProductView] = useState(false);
  const [showList, setShowList] = useState(false);

  const [dataProductsUpdate, setDataProductsUpdate] = useState([]);

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
    if (!productsInfo) return setFilterInfoProduct([]);

    let filtered = productsInfo;

    const filterCod = Number(filterCodProduct);
    if (filterCodProduct && !isNaN(filterCod)) {
      filtered = filtered.filter((product) => product.codProd === filterCod);
    }

    if (filterNameProduct.length > 0) {
      filtered = filtered.filter((product) =>
        product.nameProduct
          .toLowerCase()
          .includes(filterNameProduct.toLowerCase())
      );
    }

    setFilterInfoProduct(filtered);
  }, [productsInfo, filterCodProduct, filterNameProduct]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchProduct>
      <DivSearch>
        <TitleProduct>Consulta Produto</TitleProduct>
        <DivBtnFilter show={disableFilter}>
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
                setFilterInfoProduct(productsInfo);
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
                      <SpanName>{parseName(infoProduct.nameProduct)}</SpanName>
                      <SpanCod>Codigo: {infoProduct.codProd}</SpanCod>
                    </DivProductInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      type="button"
                      onClick={() => {
                        setProductPopUp(!productPopUp);
                        setDataProductsUpdate(infoProduct);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    <BtnView
                      type="button"
                      onClick={() => {
                        setProductView(!productView);
                        setSelectedProductView(infoProduct);
                        setDelProductOption(false);
                      }}
                    >
                      <Visibility />
                    </BtnView>

                    <BtnRemove
                      type="button"
                      onClick={() => {
                        setDelProductOption(!delProductOption);
                        setSelectedProduct(infoProduct);
                        setProductView(false);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {productView &&
                  infoProduct.idProduct === selectedProductView.idProduct && (
                    <InfoProduct
                      selectedProductView={selectedProductView}
                      productView={productView}
                      setProductView={setProductView}
                    />
                  )}
                {delProductOption &&
                  infoProduct.idProduct === selectedProduct.idProduct && (
                    <DeleteProduct
                      selectedProduct={selectedProduct}
                      delProductOption={delProductOption}
                      setDelProductOption={setDelProductOption}
                    />
                  )}
              </DivProduct>
            );
          })
        )}
        {productPopUp && (
          <UpdateProduct
            dataProductsUpdate={dataProductsUpdate}
            productPopUp={productPopUp}
            setProductPopUp={setProductPopUp}
          />
        )}
      </DivTableSearch>
      <DivOrgBtnTable>
        <BtnPrices type="button" to="print-products">
          Tabela de Preços
        </BtnPrices>
      </DivOrgBtnTable>
    </DivSearchProduct>
  );
}
