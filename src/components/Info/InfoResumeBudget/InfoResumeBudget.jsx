import React, { useEffect, useState } from "react";
import {
  DivOrgResumeBudgetDetail,
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
  DivBtnCancelItem,
  BtnEditBudget,
  DivBtnEditBudget,
  DivCardNewProduct,
  FormNewItem,
  DivOrgInput,
  LabelItem,
  InputItem,
  DivOrgNameProduct,
  DivOrgInfoPrices,
  DivOrgCod,
  DivBtnSave,
  DivOrgNewItem,
  SelectProduct,
  DivOrgBtnAdd,
  BtnAddItem,
  DivAlerts,
  TitleAlert,
  Alerts,
  DivOrgResults,
  InfoResult,
} from "./InfoResumeBudget.style";
import { Add, Close, Remove } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { getProduct } from "../../../store/registers/products/products.actions";
import {
  getItensByBudgets,
  upBudgetItens,
} from "../../../store/budget/budget.actions";
import { useGetAllProductQuery } from "../../../store/registers/products/product.api";
import { useDebounce } from "use-debounce";
import { useForm } from "react-hook-form";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { useGetAllStockNowQuery } from "../../../store/stock/stockNow/stockNow.api";

export default function InfoResumeBudgetDetail(props) {
  const infoOrder = props.selectDetailView;

  const dateFront = new FormatDatesFront();
  const dispatch = useDispatch();

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      priceWithDiscount: 0,
      priceNoDiscount: 0,
      valueDiscount: 0,
      qtd: 0,
    },
  });

  const [itemsCart, setItemsCart] = useState({});
  const [loading, setLoading] = useState();
  const [showList, setShowList] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [newItemStatus, setNewItemStatus] = useState(false);

  // State Items Budget
  const [finalOrder, setFinalOrder] = useState(0);
  const [totalOrder, setTotalOrder] = useState([]);
  const [totalQtd, setTotalQtd] = useState([]);
  const [countId, setCountId] = useState(0);

  // State Product
  const [product, setProduct] = useState([]);
  const [isClearable] = useState(true);
  const [optionsProducts, setOptionsProducts] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productSearch] = useDebounce(productId, 300);
  const [qtdSell, setQtdSell] = useState(0);
  const [valueDiscount, setValueDiscount] = useState(0);
  const [qtdDisable, setQtdDisable] = useState(false);
  const [showAlertProduct, setShowAlertProduct] = useState(false);
  const [showAlertZero, setShowAlertZero] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loadingBudget, setLoadingBudget] = useState(false);
  const [infoStatusBudget, setInfoStatusBudget] = useState([]);
  const [priceUnitReal, setPriceUnitReal] = useState(null);

  const { data: listProducts } = useGetAllStockNowQuery();


  const getItensByOrder = async (dataBudget) => {
    const idBudget = dataBudget.idBudget;

    const itensOrders = await dispatch(getItensByBudgets(idBudget));
    setItemsCart(itensOrders.payload);
  };

  const getIdProduct = async (idProduct) => {
    const valueProduct = idProduct;
    const productId = await dispatch(getProduct(valueProduct));

    setProductsInfo(productId.payload);
  };

  const sendProduct = (product) => {
    if (product != null) {
      setProductId(product.codProd);
    } else {
      setProductsInfo(productSearch);
    }
  };

  const updateBudgetItems = async (dataBudget) => {
    setLoadingBudget(true);
    let countQtd = 0;
    dataBudget.filter((itens) => {
      if (itens.status !== "removido") {
        countQtd++;
      }
    });
    const newInfoBudget = {
      newItensBudget: dataBudget,
      idBudget: infoOrder.idBudget,
      dateCreated: dateFront.getDateNoHour(),
      valueDiscount: Number(valueDiscount.toFixed(2)),
      valueNoDiscount: Number(finalOrder.toFixed(2)),
      valueWithDiscount:
        Number(finalOrder.toFixed(2)) - Number(valueDiscount.toFixed(2)),
    };

    const upBudget = await dispatch(upBudgetItens(newInfoBudget));

    setInfoStatusBudget(upBudget.payload);
    setTimeout(() => {
      setLoadingBudget(false);
    }, 500);

    if (upBudget.payload.codeStatus === 200) {
      setTimeout(() => {
        props.reloading(true);
      }, 3000);
    }
  };

  // normaliza um item vindo do front/servidor e garante campos numéricos
  const normalizeItem = (raw, idFallback) => {
    const item = { ...raw };
    // se o servidor já trouxe um id (ex: idBudgetItem), usa esse
    if (item.id == null && item.idBudgetItem != null) {
      item.id = item.idBudgetItem;
    } else if (item.id == null) {
      item.id = idFallback; // fallback pra id sequencial local
    }

    item.priceWithDiscount = Number(
      item.priceWithDiscount ?? item.price_with_discount ?? 0
    );
    item.qtd = Number(item.qtd ?? item.quantity ?? item.qtdSell ?? 0);

    return item;
  };

  // função que adiciona um item OU um array de itens ao final da lista existente
  const addItemsToCart = (itemBudget) => {
    if (!itemBudget) {
      console.warn("addItemsToCart: nenhum dado recebido");
      return;
    }
    itemBudget.valueDiscount = discount;
    itemBudget.nameProduct = nameProduct;
    itemBudget.codProd = productSearch;
    itemBudget.idProduct = idProduct;
    itemBudget.qtd = parseFloat(qtdSell);

    const itemsToAdd = Array.isArray(itemBudget) ? itemBudget : [itemBudget];

    setListItems((prevList) => {
      // cria items normalizados com ids sequenciais baseados no tamanho atual
      const startIndex = prevList.length;
      const normalized = itemsToAdd.map((it, idx) =>
        normalizeItem(it, startIndex + idx + 1)
      );

      const updatedList = [...prevList, ...normalized];

      // recomputa totais a partir do updatedList (fonte única da verdade)
      const activeItems = updatedList.filter(
        (item) => item.status !== "removido"
      );
      const newTotalOrderArr = activeItems.map((i) => i.priceWithDiscount ?? 0);
      const priceFinal = newTotalOrderArr.reduce((a, b) => a + b, 0);
      const finalQtd = activeItems.reduce((a, b) => a + (b.qtd ?? 0), 0);

      // atualiza outros estados (pode chamar setState dentro do functional updater)
      setTotalOrder(newTotalOrderArr);
      setFinalOrder(priceFinal);
      setTotalQtd(finalQtd);
      setCountId(updatedList.length + 1); // próximo id disponível
      setShowList(true);

      return updatedList;
    });
  };

  // função para substituir completamente a lista pelos itens retornados do servidor
  // (útil no useEffect quando você recebe itemsCart)
  const replaceListFromServer = (items) => {
    if (!items || items.length === 0) {
      // limpa a lista se não veio nada
      setListItems([]);
      setTotalOrder([]);
      setFinalOrder(0);
      setTotalQtd(0);
      setCountId(1);
      setShowList(false);
      return;
    }

    // normaliza mantendo (se existir) idBudgetItem ou criando ids sequenciais
    const normalized = items.map((it, idx) => normalizeItem(it, idx + 1));

    setListItems(normalized);

    const newTotalOrderArr = normalized.map((i) => i.priceWithDiscount ?? 0);
    const priceFinal = newTotalOrderArr.reduce((a, b) => a + b, 0);
    const finalQtd = normalized.reduce((a, b) => a + (b.qtd ?? 0), 0);

    setTotalOrder(newTotalOrderArr);
    setFinalOrder(priceFinal);
    setTotalQtd(finalQtd);
    setCountId(normalized.length + 1);
    setShowList(true);
  };

  const removeItemBudget = (idToRemove) => {
    setListItems((prevList) => {
      const updatedList = prevList
        .map((item) => {
          if (item.id === idToRemove) {
            if (item.idBudgetItem) {
              // Item que já existe no servidor → apenas marca como removido
              return { ...item, status: "removido" };
            } else {
              // Item novo → remove direto
              return null;
            }
          }
          return item;
        })
        .filter(Boolean); // remove os null (itens novos excluídos)

      // reatribui ids sequenciais só para controle interno
      const reindexed = updatedList.map((item, idx) => ({
        ...item,
        id: idx + 1,
      }));

      // recalcula totais ignorando os removidos
      const activeItems = reindexed.filter((i) => i.status !== "removido");
      const newTotalOrderArr = activeItems.map((i) => i.priceWithDiscount ?? 0);
      const priceFinal = newTotalOrderArr.reduce((a, b) => a + b, 0);
      const finalQtd = activeItems.reduce((a, b) => a + (b.qtd ?? 0), 0);

      // atualiza estados relacionados
      setTotalOrder(newTotalOrderArr);
      setFinalOrder(priceFinal);
      setTotalQtd(finalQtd);
      setCountId(reindexed.length + 1);

      // se lista ficou sem itens ativos, fecha o "showList"
      if (activeItems.length === 0) {
        setShowList(false);
      }

      return reindexed;
    });
  };

  useEffect(() => {
    if (
      productsInfo?.product?.qtdNow === 0 &&
      productsInfo?.product?.type === "produto"
    ) {
      setShowAlertZero(true);
      setDisableBtn(true);
    } else {
      setShowAlertZero(false);
      setDisableBtn(false);
    }
  }, [productsInfo]);

  // requisita os itens da lista
  useEffect(() => {
    getItensByOrder(infoOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOrder]);

  // Monta a lista
  useEffect(() => {
    if (itemsCart?.itemsBudgets) {
      replaceListFromServer(itemsCart.itemsBudgets);
    }
  }, [itemsCart]);

  useEffect(() => {
    console.log(listProducts)
    if (listProducts?.productStock.length > 0) {
      const optionsProducts = listProducts?.productStock.map((product) => ({
        value: product.idProduct,
        label:
          "Cod: " + product.codProd +
          " - " +
          product.nameProduct,
        priceSell: product.priceSell,
        codProd: product.codProd,
      }));
      setOptionsProducts(optionsProducts);
    }
  }, [listProducts]);

  useEffect(() => {
    if (productSearch?.length === 0) {
      setProductsInfo(productSearch);
    }
    if (productSearch) {
      getIdProduct(productSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch]);

  let qtd = qtdSell;

  // Garante que seja número, mesmo que venha como string
  let priceSell = productsInfo?.product?.priceSell
  let nameProduct = productsInfo?.product?.nameProduct;
  let idProduct = productsInfo?.product?.idProduct;
  let discount = Number(valueDiscount) || 0;

  useEffect(() => {
    const priceNoDiscount = qtd * priceSell;

    const valueDiscount = Number(discount.toFixed(2));
    const totalPrice = Math.max(
      0,
      Number((priceNoDiscount - valueDiscount).toFixed(2))
    );

    setValue("priceWithDiscount", totalPrice);
    setValue("priceNoDiscount", Number(priceNoDiscount.toFixed(2)));
    setValue("valueDiscount", valueDiscount);
    setValue("priceSell", priceSell);
  }, [qtd, discount, setValue, priceSell]);

  return (
    <DivOrgResumeBudgetDetail show={props.detailView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setDetailView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <DivBtnEditBudget>
          <BtnEditBudget
            type="button"
            onClick={() => setNewItemStatus(!newItemStatus)}
          >
            Editar Orçamento
          </BtnEditBudget>
        </DivBtnEditBudget>
        <TitleInfoOrder>Itens do Orçamento</TitleInfoOrder>
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
                    <NameProduct>Produto: {infoItems?.nameProduct}</NameProduct>
                    <NameProduct>Cod: {infoItems?.codProd}</NameProduct>
                      <ProductInfo>Quantidade: {infoItems?.qtd}</ProductInfo>
                  </DivOrgInfoName>
                </DivOrgInfoProduct>
                <DivOrgPrices>
                  <DivOrgInfo>
                    <ProductInfo>Valor Unitario</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems?.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>
                  <DivOrgInfo>
                    <ProductInfo>Valor do desconto</ProductInfo>
                    <PriceFormat
                      displayType="text"
                      value={infoItems.valueDiscount}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgInfo>

                  <DivOrgInfo>
                    <ProductInfo>Valor Total</ProductInfo>
                    {infoItems.valueDiscount > 0 ? (
                      <PriceFormat
                        displayType="text"
                        value={infoItems?.priceWithDiscount}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    ) : (
                      <PriceFormat
                        displayType="text"
                        value={infoItems?.priceNoDiscount}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    )}
                  </DivOrgInfo>
                  {infoItems?.status && (
                    <DivOrgInfo>
                      <ProductInfo>Status</ProductInfo>
                      <ProductInfo>{infoItems?.status}</ProductInfo>
                    </DivOrgInfo>
                  )}
                </DivOrgPrices>
                {newItemStatus && (
                  <DivBtnCancelItem>
                    <BtnClose
                      type="button"
                      onClick={() => removeItemBudget(infoItems.id)}
                    >
                      <Remove />
                    </BtnClose>
                  </DivBtnCancelItem>
                )}
              </DivCardProduct>
            );
          })
        )}
        <DivOrgNewItem show={newItemStatus}>
          <DivCardNewProduct>
            <FormNewItem onSubmit={handleSubmit(addItemsToCart)}>
              <DivOrgCod>
                <LabelItem>Nome Produto</LabelItem>
                {/* <InputItem /> */}
                <SelectProduct
                  name="product"
                  // value={product}
                  placeholder="Buscar o produto"
                  options={optionsProducts}
                  isClearable={isClearable}
                  onChange={sendProduct}
                />
              </DivOrgCod>
              <DivOrgInfoPrices>
                <DivOrgInput>
                  <LabelItem>Preço Unit</LabelItem>
                  <PriceFormat
                    placeholder=""
                    value={productsInfo?.product?.priceSell || 0}
                    displayType="text"
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                  />
                </DivOrgInput>
                <DivOrgInput>
                  <LabelItem>Qtd</LabelItem>
                  <PriceFormat
                    customInput={InputItem}
                    value={qtdSell}
                    decimalSeparator="."
                    allowNegative={false}
                    fixedDecimalScale={true}
                    placeholder="Quantidade"
                    disabled={qtdDisable}
                    onValueChange={(values, sourceInfo) => {
                      setQtdSell(values.value);
                    }}
                  />
                </DivOrgInput>
                <DivOrgInput>
                  <LabelItem>Desconto</LabelItem>
                  <PriceFormat
                    value={valueDiscount}
                    customInput={InputItem}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                    onValueChange={(values, sourceInfo) => {
                      setValueDiscount(values.value);
                    }}
                  />
                </DivOrgInput>
                <DivOrgInput>
                  <LabelItem>Total</LabelItem>
                  <PriceFormat
                    value={watch("priceWithDiscount") || 0}
                    placeholder=""
                    displayType="text"
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                  />
                </DivOrgInput>
              </DivOrgInfoPrices>
              <DivOrgBtnAdd>
                <BtnAddItem type="submit">
                  <Add />
                </BtnAddItem>
              </DivOrgBtnAdd>
            </FormNewItem>
          </DivCardNewProduct>
          {showAlertZero && (
            <DivAlerts>
              <TitleAlert>AVISO!!</TitleAlert>
              <Alerts>
                Esse item está com quantidade zero no estoque, a venda não pode
                ser realizada
              </Alerts>
            </DivAlerts>
          )}
          {showAlertProduct && (
            <DivAlerts>
              <TitleAlert>AVISO!!</TitleAlert>
              <Alerts>
                É necessario selecionar um item para adicionar ao pedido
              </Alerts>
            </DivAlerts>
          )}
          {loadingBudget ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color="#fff" />
            </DivOrgLoading>
          ) : (
            (infoStatusBudget.errorStatus && (
              <DivOrgResults>
                <InfoResult>{infoStatusBudget.message}</InfoResult>
              </DivOrgResults>
            )) ||
            (infoStatusBudget.successStatus && (
              <DivOrgResults>
                <InfoResult>{infoStatusBudget.message}</InfoResult>
              </DivOrgResults>
            ))
          )}
          <DivBtnSave>
            <BtnEditBudget
              type="button"
              onClick={() => updateBudgetItems(listItems)}
            >
              Salvar
            </BtnEditBudget>
          </DivBtnSave>
        </DivOrgNewItem>
      </DivInfoTable>
    </DivOrgResumeBudgetDetail>
  );
}
