import React, { useEffect, useState } from "react";
import {
  DivDetailOrder,
  TitleDetailOrder,
  DivDetailItems,
  DivItem,
  DivTotal,
  DivName,
  DivPrice,
  Item,
  QtdItem,
  CodItem,
  NameItem,
  PriceUnit,
  Qtd,
  PriceTotal,
  BtnPayment,
  // NumberOrder,
  DivOrgBtn,
  DivOrgDetailCart,
  DivBtnRemove,
  BtnRemoveItem,
  DivQtd,
  DivDiscount,
  Discount,
  DivOrgTotalOrder,
  ValueTotalOrder,
  DivOrgInfoOrder,
  NameClient,
  DivOrgDiscount,
  FormatPrices,
} from "./DetailOrderStyle";
import { Remove } from "@styled-icons/material";
import { getNextNumberOrder } from "../../../store/commercial/finishOrder.actions";
import { useDispatch } from "react-redux";

export default function DetailOrder(props) {
  const dispatch = useDispatch();
  const [listProductsCart, setListProductsCart] = useState([]);
  const [detailOrder, setDetailOrder] = useState({});
  const [totalOrder, setTotalOrder] = useState([]);
  const [totalQtd, setTotalQtd] = useState([]);
  const [finalOrder, setFinalOrder] = useState(0);
  const [finalSize, setFinalSize] = useState(0);

  const [nextNumber, setNextNumber] = useState([]);
  const [show, setShow] = useState(false);
  const [countId, setCountId] = useState(0);

  const productsCheckout = props.cartItem;
  const infoClient = props.infoClient;

  let infoChange = { ...props.infoOrderChange };
  const [infoOrderChange, setInfoOrderChange] = useState(infoChange);

  const createListCart = (dataProduct) => {
    const productListCart = Array.from(listProductsCart);
    const valueTotalOrder = Array.from(totalOrder);
    const valueTotalQtd = Array.from(totalQtd);

    setCountId((countId) => countId + 1);
    dataProduct.id = countId;

    // Criar novo pedido somando ultimo mais 1
    valueTotalOrder.push(dataProduct.priceWithDiscount);
    valueTotalQtd.push(dataProduct.qtd);

    const priceFinalOrder = valueTotalOrder.reduce(
      (total, product) => total + product,
      0
    );

    const qtdFinalOrder = valueTotalQtd.reduce(
      (total, product) => total + product,
      0
    );

    productListCart.push(dataProduct);
    setShow(true);
    if (show) {
      //Salva todos os totais de cada produto
      setTotalOrder(valueTotalOrder);
      //Salva as quantidades de cada produto
      setTotalQtd(valueTotalQtd);
      // Salva o peso final dos itens
      setFinalSize(qtdFinalOrder);
      // Salva o valor total do pedido
      setFinalOrder(priceFinalOrder);
      // Salva cada item adicionado a lista
      setListProductsCart(productListCart);
    }
  };

  const nextNumberOrder = async () => {
    const numberOrder = await dispatch(getNextNumberOrder());

    setNextNumber(numberOrder.payload);
  };

  const sendInfoOrder = () => {
    setDetailOrder({
      infoClient,
      numberOrder: nextNumber.lastNumber + 1,
      valueOrder: finalOrder,
      qtdItens: totalQtd.length,
      sizeItens: finalSize,
      infoDolar: Number(props.infoDolar?.valueDolar),
    });
  };

  const checkItemsChange = async (infoChangeItems) => {
    //Passa os itens para a variavel
    const changeItems = infoChangeItems;

    const valueTotalOrder = Array.from(totalOrder);
    const valueTotalQtd = Array.from(totalQtd);
    let priceFinal;
    let finalQtd;
    for await (const priceItems of changeItems) {
      valueTotalOrder.push(priceItems.priceWithDiscount);
      priceFinal = valueTotalOrder.reduce(
        (total, product) => total + product,
        0
      );

      finalQtd = valueTotalQtd.reduce((total, product) => total + product, 0);
    }

    const newListCart = changeItems;
    newListCart.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    // Organizar lista
    newListCart.forEach((productListCart, id) => {
      productListCart.idCartItem = id + 1;
    });

    if (newListCart) {
      setCountId(newListCart?.length + 1);
    }

    //Salva todos os totais de cada produto
    setTotalOrder(valueTotalOrder);
    //Salva as quantidades de cada produto
    setTotalQtd(valueTotalQtd);

    // Salva o valor total do pedido
    setFinalOrder(priceFinal);
    // Salva a quantidade total do pedido
    setTotalQtd(finalQtd);
    setListProductsCart(changeItems);
  };

  useEffect(() => {
    createListCart(productsCheckout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsCheckout]);

  useEffect(() => {
    const listChange = infoOrderChange?.orderInfo;
    if (listChange === undefined) {
      // set
    } else {
      checkItemsChange(listChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrderChange]);

  useEffect(() => {
    nextNumberOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendInfoOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalOrder]);

  const removeItemCart = (idProduct) => {
    const newListCart = listProductsCart.filter(
      (item) => item.id !== idProduct
    );

    newListCart.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    // Organizar lista
    const newListUpdate = newListCart.map((productListCart, id) => ({
      ...productListCart,
      id: id + 1,
    }));
    setCountId(newListUpdate.length + 1);
    setListProductsCart(newListUpdate);
    setInfoOrderChange(newListCart);
    const newTotalOrder = newListUpdate.map(
      (valueTotal) => valueTotal.priceWithDiscount
    );
    setTotalOrder(newTotalOrder);
    const newTotalQtd = newListUpdate.map((valueTotal) => valueTotal.qtd);
    setTotalQtd(newTotalQtd);
    const priceFinal = newListUpdate.reduce(
      (total, product) => total + product.priceWithDiscount,
      0
    );
    setFinalOrder(priceFinal);
    const finalQtd = newListUpdate.reduce(
      (total, product) => total + product.qtd,
      0
    );

    setFinalSize(finalQtd);
  };

  return (
    <DivDetailOrder>
      <TitleDetailOrder>Detalhe do Pedido</TitleDetailOrder>
      <DivDetailItems>
        {listProductsCart.map((product, id) => {
          return (
            <Item key={id}>
              <DivItem>
                <QtdItem>{product.id}</QtdItem>
                <DivName>
                  <NameItem>{product.nameProduct}</NameItem>
                  <CodItem>Cod: {product.codProd}</CodItem>
                </DivName>
              </DivItem>
              <DivOrgDetailCart>
                <DivPrice>
                  <PriceUnit>Preço Un</PriceUnit>
                  <PriceUnit>
                    <FormatPrices
                      displayType="text"
                      value={product.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </PriceUnit>
                </DivPrice>
                <DivQtd>
                  <Qtd>QTD</Qtd>
                  <Qtd>{product.qtd}</Qtd>
                </DivQtd>
                {product?.valueDiscount > 0 && (
                  <DivDiscount>
                    <Discount>Desconto</Discount>
                    <DivOrgDiscount>
                      <FormatPrices
                        displayType="text"
                        value={product.valueDiscount}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </DivOrgDiscount>
                  </DivDiscount>
                )}
                <DivTotal>
                  <PriceTotal>Total</PriceTotal>
                  <FormatPrices
                    displayType="text"
                    value={product.priceWithDiscount}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                  />
                </DivTotal>
              </DivOrgDetailCart>
              <DivBtnRemove>
                <BtnRemoveItem
                  type="button"
                  onClick={() => removeItemCart(product.id)}
                >
                  <Remove />
                </BtnRemoveItem>
              </DivBtnRemove>
            </Item>
          );
        })}
      </DivDetailItems>
      <DivOrgBtn>
        <DivOrgInfoOrder>
          <DivOrgTotalOrder>
            <NameClient>Cliente</NameClient>

            <NameClient>
              {infoClient.nameClient || "Cliente Não identificado"}
            </NameClient>
          </DivOrgTotalOrder>
          <DivOrgTotalOrder>
            {/* <NumberOrder>Numero do Pedido</NumberOrder>
            <NumberOrder>{nextNumber.lastNumber + 1 || 0}</NumberOrder> */}
          </DivOrgTotalOrder>
          <DivOrgTotalOrder>
            <NameClient>QTD Total</NameClient>
            <NameClient>{finalSize}</NameClient>
          </DivOrgTotalOrder>

          <DivOrgTotalOrder>
            <ValueTotalOrder>Total do pedido</ValueTotalOrder>
            <FormatPrices
              displayType="text"
              value={finalOrder || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
        </DivOrgInfoOrder>

        {/* Envia a lista para o checkout */}

        <BtnPayment
          to="end-ord"
          state={{ orderInfo: listProductsCart, detailOrder: detailOrder }}
        >
          Pagamento
        </BtnPayment>
      </DivOrgBtn>
    </DivDetailOrder>
  );
}
