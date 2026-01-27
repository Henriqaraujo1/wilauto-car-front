import { useEffect, useState } from "react";
import UpdateSubProduct from "../../Update/UpdateSubProduct/UpdateSubProduct";
import InfoSubProduct from "../../Info/InfoSubProduct/InfoSubProduct";
import {
  Edit,
  DeleteForever,
  Visibility,
  Close,
  FormatListBulleted,
} from "@styled-icons/material";
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
  DivOrgBtnTable,
  BtnPrices,
  BtnItems,
} from "./SearchSubProduct.style";

import { ClipLoader } from "react-spinners";

export default function SearchSubProduct({
  subProductByProduct,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [subProductPopUp, setSubProductPopUp] = useState(false);
  const [selectedProductView, setSelectedProductView] = useState();
  const [filterCodProduct, setFilterCodProduct] = useState("");
  const [filterNameProduct, setFilterNameProduct] = useState("");
  const [filterInfoProduct, setFilterInfoProduct] = useState([]);

  const [subProductView, setProductView] = useState(false);
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
    if (!subProductByProduct) return setFilterInfoProduct([]);

    let filtered = subProductByProduct;

    const filterCod = Number(filterCodProduct);
    if (filterCodProduct && !isNaN(filterCod)) {
      filtered = filtered.filter(
        (subProduct) => subProduct.codSubProd === filterCod
      );
    }

    if (filterNameProduct.length > 0) {
      filtered = filtered.filter((subProduct) =>
        subProduct.nameProduct
          .toLowerCase()
          .includes(filterNameProduct.toLowerCase())
      );
    }

    setFilterInfoProduct(filtered);
  }, [subProductByProduct, filterCodProduct, filterNameProduct]);

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
    <DivSearchSubProduct>
      <DivSearch>
        <TitleProduct>Consulta Sub-Produtos</TitleProduct>
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
                setFilterInfoProduct(subProductByProduct);
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
                        {parseName(infoProduct.nameSubProduct)}
                      </SpanName>
                      <SpanCod>Codigo: {infoProduct.codSubProd}</SpanCod>
                    </DivProductInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      type="button"
                      onClick={() => {
                        setSubProductPopUp(!subProductPopUp);
                        setDataProductsUpdate(infoProduct);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    <BtnView
                      type="button"
                      onClick={() => {
                        setProductView(!subProductView);
                        setSelectedProductView(infoProduct);
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
        {subProductPopUp && (
          <UpdateSubProduct
            dataSubProductsUpdate={dataProductsUpdate}
            subProductPopUp={subProductPopUp}
            setProductPopUp={setSubProductPopUp}
          />
        )}
      </DivTableSearch>
      <DivOrgBtnTable>
        <BtnPrices type="button" to="print-subProducts">
          Tabela de Preços
        </BtnPrices>
      </DivOrgBtnTable>
    </DivSearchSubProduct>
  );
}
