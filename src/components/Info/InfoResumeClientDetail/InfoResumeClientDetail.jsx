import React, { useEffect, useState } from "react";
import {
  DivOrgResumeClientDetail,
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
} from "./InfoResumeClientDetailStyle";
import { Close } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { getClientItensByOrder } from "../../../store/financial/resumeClient/resumeClient.actions";

export default function InfoResumeClientDetail(props) {
  const infoOrder = props.selectDetailView;
  const dispatch = useDispatch();

  const [itemsCart, setItemsCart] = useState([]);
  const [loading, setLoading] = useState();
  const [showList, setShowList] = useState(false);
  const [listItems, setListItems] = useState([]);

  const getItensByOrder = async (dataOrder) => {
    const idOrder = dataOrder.idOrder;

    const itensOrders = await dispatch(getClientItensByOrder(idOrder));

    setItemsCart(itensOrders.payload);
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
    <DivOrgResumeClientDetail show={props.detailView}>
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
                      Quantidade vendida: {infoItems.qtd}
                    </ProductInfo>
                  </DivOrgInfoName>
                </DivOrgInfoProduct>
                <DivOrgPrices>
                  <DivOrgInfo>
                    <ProductInfo>Valor Unitario</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <ProductInfo>Valor do desconto</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.valueDiscount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      decimalSeparator=","
                      thousandSeparator="."
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>

                  <DivOrgInfo>
                    <ProductInfo>Valor Total</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.valueTotalItem.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      decimalSeparator=","
                      thousandSeparator="."
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
    </DivOrgResumeClientDetail>
  );
}
