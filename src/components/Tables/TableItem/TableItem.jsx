import { Info, Remove } from "@styled-icons/material";
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
  ValueProduct,
  BtnAddTag,
  DivOrgInfo,
  DivAlertTag,
  AlertTag,
  InputQtd,
} from "./TableItemStyles";

import { useDispatch } from "react-redux";
import {
  createProductEntryStock,
  // lastNumberOder,
} from "../../../store/stock/itemEntryStock/newItemStock.action";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import DetailPayment from "../../Details/DetailPayment/DetailPayment";
// import PrintTag from "../../Details/PrintViewTag/PrintTag";

export default function TableItem(props) {
  let productsEntry = props.productStock;
  let infoOrderStock = props.infoOrderStock;
  let idStockEntry = props.infoOrderStock?.idStockEntry;

  const dispatch = useDispatch();
  const [listProducts, setListProducts] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [priceFinal, setPriceFinal] = useState(0);
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loadingNewOrder, setLoadingNewOrder] = useState();
  const [totalValueOrder, setTotalValueOrder] = useState("");
  const [totalFinalOrder, setTotalFinalOrder] = useState("");

  const [finalPayment, setFinalPayment] = useState(null);
  const [statusPayment, setStatusPayment] = useState(false);
  const [statusOrder, setStatusOrder] = useState(false);

  // Info Tags
  const [popUpPayment, setPopUpPayment] = useState(false);

  const [stockInfo, setStockInfo] = useState([]);
  const [countId, setCountId] = useState(0);
  const [show, setShow] = useState(false);

  const [infoIdStockEntry, setInfoIdStockEntry] = useState(0);

  const createList = (dataProduct) => {
    // evita mutações diretas
    const productList = [...listProducts];
    const valueTotalOrder = [...totalOrder];

    dataProduct.idStockEntry = idStockEntry;

    // Adiciona total no array
    valueTotalOrder.push(dataProduct.priceTotal);

    const priceFinalOrder = valueTotalOrder.reduce(
      (total, product) => total + product,
      0
    );

    productList.push(...dataProduct.listProducts);

    setShow(true);

    // Salva direto, sem esperar a re-renderização do show
    setTotalOrder(valueTotalOrder);
    setPriceFinal(priceFinalOrder);
    setListProducts(productList);
  };

  const newProductStock = async () => {
    setListProducts([]);
    setCountId(1);
    const dataProduct = {};
    dataProduct.itemsEntryStock = listProducts;
    if (listProducts.length === 0) {
      alert("Pedido deve conter um item para ser adicionado");
    } else {
      setLoadingNewOrder(true);
      dataProduct.valueOrder = totalValueOrder;
      dataProduct.valueFinalOrder = totalFinalOrder;
      dataProduct.valueDelivery = infoOrderStock.valueDelivery;
      dataProduct.idProvider = infoOrderStock.idProvider;
      dataProduct.statusDelivery = infoOrderStock.statusDelivery;
      dataProduct.idStockEntry = idStockEntry;
      dataProduct.paymentsInfo = finalPayment;

      if (dataProduct.paymentsInfo === null) {
        setStatusPayment(true);
      } else {
        setStatusPayment(false);
        console.log(dataProduct)
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
        // getLastOrdStockEntry();
        props.setStatusNewItem(true);
        setStockInfo([]);
        setStatusOrder(true);
        setInfoIdStockEntry(0);
        productsEntry = [];
      }, 4000);
    }
  };

  const removeProductList = (codProd) => {
    // Verificar se existem subitens (qualquer item com o mesmo codProd que NÃO seja o principal)
    const hasSubItems = listProducts.some(
      (product) => product.codProd === codProd && !product.subItem
    );

    // Se tiver subitens, pedir confirmação
    if (hasSubItems) {
      const confirmRemove = window.confirm(
        "Este produto possui subitens. Deseja remover ele e todos os itens relacionados?"
      );

      if (!confirmRemove) return; // usuário cancelou
    }

    // Remover principal + subitens
    const newList = listProducts.filter((item) => item.codProd !== codProd);

    // Ordenação
    newList.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    // Reatribuir IDs
    const newListUpdate = newList.map((productListOf, id) => ({
      ...productListOf,
      id: id + 1,
    }));

    setCountId(newListUpdate.length + 1);
    setListProducts(newListUpdate);

    // Recalcular totais
    const newTotalOrder = newListUpdate.map((item) => item.priceTotal);
    setTotalOrder(newTotalOrder);

    const priceFinalOrder = newListUpdate.reduce(
      (total, product) => total + product.priceTotal,
      0
    );
    setPriceFinal(priceFinalOrder);
  };

  const formPayment = (infoPayment) => {
    if (infoPayment.length === 0) {
      window.alert("Adicione itens para ser impresso");
    } else {
      setPopUpPayment(true);
    }
  };

  useEffect(() => {
    if (productsEntry?.priceTotal > 0) {
      createList(productsEntry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsEntry]);

  useEffect(() => {
    setTotalValueOrder(priceFinal);
    setTotalFinalOrder(priceFinal + infoOrderStock.valueDelivery);
  }, [priceFinal, infoOrderStock.valueDelivery]);

  useEffect(() => {
    setInfoIdStockEntry(idStockEntry);
  }, [idStockEntry]);

  return (
    <DivTableItems>
      <DivDetailsItens>
        {listProducts?.map((product, index) => {
          return (
            <DivItemAdd key={index}>
              <DivOrgCardProduct>
                <DivItemDetails>
                  <DivIdItem>
                    <Id>{index + 1}</Id>
                  </DivIdItem>
                  <DivInfoItem>
                    <NameItem>{product.nameProduct}</NameItem>
                    <CodeItem>Cod: {product.codProd}</CodeItem>
                  </DivInfoItem>
                </DivItemDetails>
                <DivOrgDetails>
                  {/* <DivNumbers> */}
                  <DivOrgNumbers>
                    {!product?.subItem ? (
                      <>
                        <TitleNumber>QTD</TitleNumber>
                        <InputQtd
                          type="number"
                          onChange={(e) => {
                            const newQtd = Number(e.target.value);

                            setListProducts((prev) =>
                              prev.map((item) => 
                                item.codProd === product.codProd
                                  ? { ...item, qtdItems: newQtd }
                                  : item
                              )
                            );
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <TitleNumber>QTD</TitleNumber>
                        <Value>{product.qtdItems}</Value>
                      </>
                    )}
                  </DivOrgNumbers>

                  <DivOrgNumbers>
                    <TitleNumber>Preço Uni</TitleNumber>
                    <ValueProduct
                      displayType="text"
                      value={product.priceUnit}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"US$ "}
                    />
                  </DivOrgNumbers>
                  <DivOrgNumbers>
                    <TitleNumber>Total R$</TitleNumber>
                    <ValueProduct
                      displayType="text"
                      value={product.priceTotal}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgNumbers>
                </DivOrgDetails>
                <DivBtnInfo>
                  <BtnRemoveItem
                    onClick={() => removeProductList(product.codProd)}
                  >
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
      <DivOrgInfo>
        <DivOrgInfoOrder>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Nº Pedido</ValueTotalOrder>
            <ValueTotalOrder>{infoIdStockEntry || 0}</ValueTotalOrder>
          </DivOrgTotalOrder>

          <DivOrgTotalOrder>
            <ValueTotalOrder>Valor do Frete:</ValueTotalOrder>
            <NumericFormat
              customInput={PriceTotal}
              displayType="text"
              value={infoOrderStock.valueDelivery || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Pedido:</ValueTotalOrder>
            <NumericFormat
              customInput={PriceTotal}
              displayType="text"
              value={totalValueOrder || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Total:</ValueTotalOrder>
            <NumericFormat
              customInput={PriceTotal}
              displayType="text"
              value={totalFinalOrder || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgTotalOrder>
        </DivOrgInfoOrder>
        <DivOrgBtn>
          <BtnAddTag
            type="button"
            onClick={() => {
              formPayment(listProducts);
            }}
          >
            Pagamento
          </BtnAddTag>
          <BtnAddStock
            disabled={statusPayment}
            onClick={() => newProductStock()}
          >
            Adicionar Estoque
          </BtnAddStock>
        </DivOrgBtn>
        <DivAlertTag>
          <AlertTag>
            Não recomendamos a impressão de etiqueta pelo celular
          </AlertTag>
        </DivAlertTag>
        <DetailPayment
          popUpPayment={popUpPayment}
          setPopUpPayment={setPopUpPayment}
          infoOrderStock={infoOrderStock}
          totalFinalOrder={totalFinalOrder}
          setFinalPayment={setFinalPayment}
          statusOrder={statusOrder}
        />
        {/* <PrintTag
          popUpPrint={popUpPrint}
          setPopUpPrint={setPopUpPrint}
          allTags={allTags}
        /> */}
      </DivOrgInfo>
      {loadingNewOrder ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (statusPayment === true && (
          <DivOrgResults>
            <InfoResult>Por favor ajuste a forma de pagamento.</InfoResult>
          </DivOrgResults>
        )) ||
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
    </DivTableItems>
  );
}
