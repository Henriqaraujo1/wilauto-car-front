import { Details, Info, More, PlusOne, Remove } from "@styled-icons/material";
import React, { useEffect, useState } from "react";
import {
  BtnRemoveItem,
  CodeItem,
  DivDetailsItens,
  DivOrgDetails,
  DivItemDetails,
  DivIdItem,
  DivInfoItem,
  DivItemAdd,
  DivOrgNumbers,
  DivTableItems,
  Id,
  NameItem,
  TitleNumber,
  Value,
  BtnAddStock,
  DivOrgBtn,
  DivOrgResult,
  NumberOrder,
  DivOrgTotalOrder,
  ValueTotalOrder,
  PriceTotal,
  DivOrgInfoOrder,
  BtnInfo,
  DivBtnInfo,
  DivOrgMoreDetails,
  DivOrgCardProduct,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./TableDevolutionStyles";

import { useDispatch } from "react-redux";
import {
  createProductEntryStock,
  lastNumberOder,
} from "../../store/stock/itemEntryStock/newItemStock.action";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

export default function TableItem(props) {
  let productsEntry = props.productStock;
  const dispatch = useDispatch();
  const [listProducts, setListProducts] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [priceFinal, setPriceFinal] = useState(0);
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loadingNewOrder, setLoadingNewOrder] = useState();
  // const [totalDelivery, setTotalDelivery] = useState([]);
  // const [priceFinalDelivery, setPriceFinalDelivery] = useState(0);

  const [stockInfo, setStockInfo] = useState([]);
  const [lastOrderNumber, setLastOrderNumber] = useState([]);
  const [countId, setCountId] = useState(0);
  const [show, setShow] = useState(false);

  const getLastOrdStockEntry = async () => {
    const lastNumber = await dispatch(lastNumberOder());
    setLastOrderNumber(lastNumber.payload);
  };

  const createList = (dataProduct) => {
    const productList = Array.from(listProducts);
    const valueTotalOrder = Array.from(totalOrder);
    setCountId((countId) => countId + 1);
    dataProduct.id = countId;
    dataProduct.orderStockEntry = lastOrderNumber.lastNumber;
    // Adiciona cada total do produto na lista
    valueTotalOrder.push(dataProduct.priceTotal);
    const priceFinalOrder = valueTotalOrder.reduce(
      (total, product) => total + product,
      0
    );
    productList.push(dataProduct);
    setShow(true);
    if (show) {
      //Salva todos os totais de cada produto
      setTotalOrder(valueTotalOrder);
      // Salva o valor total do pedido
      setPriceFinal(priceFinalOrder);
      // Salva cada item adicionado a lista
      setListProducts(productList);
    }
    // setLoading(false)
  };

  // useEffect(() => {
  //   if (stockInfo.codeStatus === 200) {
  //     alert(stockInfo.message);
  //   } else if (stockInfo.codeStatus === 400) {
  //     alert(stockInfo.message)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stockInfo.codeStatus]);

  const newProductStock = async (dataProduct) => {
    setLoadingNewOrder(true);
    setListProducts([]);
    setCountId(1);
    if (dataProduct.length === 0) {
      alert("Pedido deve conter um item para ser adicionado");
    } else {
      const productEntryCreate = await dispatch(
        createProductEntryStock(dataProduct)
      );
      setStockInfo(productEntryCreate.payload);
    }
    setTimeout(() => {
      setLoadingNewOrder(false);
    }, 500);

    setTimeout(() => {
      setPriceFinal(0);
      setTotalOrder(0);
      getLastOrdStockEntry();
      setStockInfo([]);
      productsEntry = [];
    }, 4000);
  };

  const removeProductList = (idProduct) => {
    const newList = listProducts.filter((item) => item.id !== idProduct);
    newList.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    // Reorganiza somente o id que vai renderizar para o cliente
    const newListUpdate = newList.map((productListOf, id) => ({
      ...productListOf,
      id: id + 1,
    }));
    setCountId(newListUpdate.length + 1);
    setListProducts(newListUpdate);
    const newTotalOrder = newListUpdate.map(
      (valueTotal) => valueTotal.priceTotal
    );
    setTotalOrder(newTotalOrder);
    const priceFinalOrder = newListUpdate.reduce(
      (total, product) => total + product.priceTotal,
      0
    );
    setPriceFinal(priceFinalOrder);
  };

  useEffect(() => {
    createList(productsEntry);
  }, [productsEntry]);

  useEffect(() => {
    getLastOrdStockEntry();
  }, []);

  return (
    <DivTableItems>
      <DivDetailsItens>
        {listProducts.map((product, id) => {
          return (
            <DivItemAdd key={product.id}>
              <DivOrgCardProduct>
                <DivItemDetails>
                  <DivIdItem>
                    <Id>{product.id}</Id>
                  </DivIdItem>
                  <DivInfoItem>
                    <NameItem>{product.nameProduct}</NameItem>
                    <CodeItem>{product.codProduct}</CodeItem>
                  </DivInfoItem>
                </DivItemDetails>
                <DivOrgDetails>
                  {/* <DivNumbers> */}
                  <DivOrgNumbers>
                    <TitleNumber>QTD</TitleNumber>
                    <Value>{product.newQtd}</Value>
                  </DivOrgNumbers>

                  <DivOrgNumbers>
                    <TitleNumber>Preço Uni</TitleNumber>
                    <Value>R$ {product.priceUnit}</Value>
                  </DivOrgNumbers>
                  <DivOrgNumbers>
                    <TitleNumber>Total</TitleNumber>
                    <Value>R$ {product.priceTotal}</Value>
                  </DivOrgNumbers>
                  {/* </DivNumbers> */}
                </DivOrgDetails>
                <DivBtnInfo>
                  {/* <DivBtnItem> */}
                  <BtnRemoveItem onClick={() => removeProductList(product.id)}>
                    <Remove />
                  </BtnRemoveItem>
                  <BtnInfo
                    onClick={() => {
                      setDetails(!details);
                      setSelectedProduct(product);
                    }}
                  >
                    <Info />
                  </BtnInfo>
                </DivBtnInfo>
              </DivOrgCardProduct>
              {details && product.idProduct === selectedProduct.idProduct && (
                <DivOrgMoreDetails
                  details={details}
                  selectedProduct={selectedProduct}
                >
                  <DivOrgNumbers>
                    <TitleNumber>Medida</TitleNumber>
                    <Value>{selectedProduct.measure}</Value>
                  </DivOrgNumbers>
                  <DivOrgNumbers>
                    <TitleNumber>Data de Vencimento</TitleNumber>
                    <Value>{selectedProduct.dueDataProduct}</Value>
                  </DivOrgNumbers>
                </DivOrgMoreDetails>
              )}
            </DivItemAdd>
          );
        })}
      </DivDetailsItens>
      <DivOrgBtn>
        <DivOrgInfoOrder>
          <DivOrgResult>
            <NumberOrder>
              Número do pedido: {lastOrderNumber.lastNumber || ""}
            </NumberOrder>
          </DivOrgResult>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Total do Pedido: </ValueTotalOrder>
            <NumericFormat
              customInput={PriceTotal}
              displayType="text"
              value={priceFinal}
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Valor do Frete:</ValueTotalOrder>
            <NumericFormat
              customInput={PriceTotal}
              displayType="text"
              value={productsEntry.valueDelivery}
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
        </DivOrgInfoOrder>
        <BtnAddStock onClick={() => newProductStock(listProducts)}>
          Adicionar Estoque
        </BtnAddStock>
      </DivOrgBtn>
      {loadingNewOrder ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (stockInfo.errorStatus && (
          <DivOrgResults>
            <InfoResult>{stockInfo.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (stockInfo.successStatus && (
          <DivOrgResults>
            <InfoResult>{stockInfo.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
      {/* <InvoiceModal listPro/> */}
    </DivTableItems>
  );
}
