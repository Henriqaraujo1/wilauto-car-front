import React, { useEffect, useState } from "react";
import {
  DivOrgResumeProviderDetail,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivInfoTable,
  DivCardProduct,
  DivOrgId,
  IdProduct,
  DivOrgInfoProduct,
  NameProduct,
  PriceFormat,
  ProductInfo,
  DivOrgInfoName,
  DivOrgTitle,
  TitleInfoOrder,
  DivOrgLoading,
  InfoLoading,
} from "./InfoResumeProviderDetailStyle";
import { Close } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { itemsEntryOrder } from "../../../store/financial/resumeProviders/resumeProviders.action";

export default function InfoResumeProviderDetail(props) {
  const infoOrder = props.selectDetailView;
  const dispatch = useDispatch();

  const [itemsCart, setItemsCart] = useState([]);
  const [loading, setLoading] = useState();
  const [showList, setShowList] = useState(false);
  const [listItems, setListItems] = useState([]);

  const getItensByOrder = async (dataOrder) => {
    const idOrder = dataOrder.idStockEntry;
    const itemsOrders = await dispatch(itemsEntryOrder(idOrder));

    setItemsCart(itemsOrders.payload);
  };

  const createListItems = async (dataList) => {
    setLoading(true);
    setShowList(true);

    if (showList) {
      setListItems(dataList);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (itemsCart) {
      createListItems(itemsCart.itemsByOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsCart]);

  useEffect(() => {
    getItensByOrder(infoOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrder]);

  return (
    <DivOrgResumeProviderDetail show={props.detailView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setDetailView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoOrder>Itens do Pedido</TitleInfoOrder>
      </DivOrgTitle>
      <DivInfoTable>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
            <br />
            <InfoLoading>Carregando Produtos</InfoLoading>
          </DivOrgLoading>
        ) : (
          listItems.map((infoItems, index) => {
            return (
              <DivCardProduct key={index}>
                <DivOrgInfoProduct>
                  <DivOrgId>
                    <IdProduct>{index + 1}</IdProduct>
                  </DivOrgId>
                  <DivOrgInfoName>
                    <NameProduct>Produto: {infoItems.nameProduct}</NameProduct>
                    <NameProduct>Cod: {infoItems.codProd}</NameProduct>
                    <ProductInfo>
                      Quantidade Comprada: {infoItems.qtd}
                    </ProductInfo>
                  </DivOrgInfoName>
                </DivOrgInfoProduct>
                <DivOrgPrices>
                  <DivOrgInfo>
                    <ProductInfo>Valor Unitario</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.priceUnit}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"US$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <ProductInfo>Valor do dólar foi de</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.valueDolar}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <ProductInfo>Valor Total</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.priceTotal}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                </DivOrgPrices>
              </DivCardProduct>
            );
          })
        )}
      </DivInfoTable>
    </DivOrgResumeProviderDetail>
  );
}
