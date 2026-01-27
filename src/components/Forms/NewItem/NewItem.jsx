import { useEffect, useState } from "react";
import {
  DivItemStockEntry,
  FormItemStockEntry,
  DivOrgItemStockEntry,
  LabelItemStockEntry,
  InputSmall,
  LabelCalcResult,
  SelectOption,
  Options,
  SubmitFormItemStockEntry,
  DivOrgInput,
  DivOrgScreen,
  TitleDelivery,
  SelectProvider,
  SelectProduct,
  DivOrgBtnCancel,
  BtnCancel,
  DivOrgResults,
  InfoResult,
  DivBtnSubProduct,
  BtnSubProduct,
} from "./NewItemStyle";
import TableItem from "../../Tables/TableItem/TableItem";

import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Close } from "@styled-icons/material";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { getInfoIdStockEntry } from "../../../store/stock/itemEntryStock/newItemStock.action";
// import { useLazyGetCodProductQuery } from "../../../store/registers/products/product.api";
import { useLazyListSubProductProductQuery } from "../../../store/registers/subItems/subItems.api";
import InfoListSubProduct from "../../Info/InfoListSubProduct/InfoListSubProduct";

export default function NewItem({ providersData, productsInfo }) {
  const listProviders = providersData.provider;
  const listProducts = productsInfo?.product;

  const dispatch = useDispatch();
  const [getSubProducts] = useLazyListSubProductProductQuery();

  const [priceUnitFormated, setPriceUnitFormated] = useState("");
  const [productStock, setProductStock] = useState([]);

  const [idStockEntry, setIdStockEntry] = useState("");
  const [infoEntryStock] = useDebounce(idStockEntry, 500);
  const [disableIdStockEntry, setDisableIdStockEntry] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [infoIdStockEntry, setInfoIdStockEntry] = useState([]);

  // ! - usado para busca de codigo de barra
  // const [productId, setProductId] = useState(0);
  // const [productInfo, setProductInfo] = useState({});
  // const [productSearch] = useDebounce(productId, 300);
  const [valueDelivery, setValueDelivery] = useState(0);
  const [infoQtd, setInfoQtd] = useState("");

  // const [inputData, setInputData] = useState("");
  const [inputDelivery, setInputDelivery] = useState(0);
  const [infoOrderStock, setInfoOrderStock] = useState([]);

  const [isClearable] = useState(true);
  const [provider, setProvider] = useState([]);
  const [optionsProviders, setOptionsProviders] = useState([]);

  const [product, setProduct] = useState([]);
  const [optionsProducts, setOptionsProducts] = useState([]);
  const [statusSubProduct, setStatusSubProduct] = useState([]);
  const [listSubProduct, setListSubProduct] = useState([]);
  const [popUpList, setPopUpList] = useState(false);

  const [statusNewItem, setStatusNewItem] = useState(false);
  const [valueFinalOrder, setValueFinalOrder] = useState(null);

  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: {
      priceTotal: 0,
    },
  });

  // Aqui faz o envio de um objeto e retorna o valor inicial
  const sendProductToStock = (dataProduct) => {
    let errors = [];

    // Validação do preço unitário
    const priceUnit = Number(priceUnitFormated);
    if (isNaN(priceUnit) || priceUnit <= 0) {
      errors.push("O preço unitário deve ser maior que 0.");
    } else {
      dataProduct.priceUnit = priceUnit;
    }

    // Validação do produto
    if (!product.value) {
      errors.push("Favor selecionar um Produto.");
    } else {
      dataProduct.nameProduct = product.label;
      dataProduct.idProduct = product.value;
      dataProduct.codProd = product.codProd;
      dataProduct.priceUnit = priceUnit;
      dataProduct.priceSell = Number(product.priceSell.toFixed(2));
      dataProduct.priceTotal = Number(valueFinalOrder.toFixed(2));
      dataProduct.idStockEntry = parseInt(idStockEntry);
      dataProduct.subItem = product.subItem;
    }

    // Validação do fornecedor
    if (!provider.value) {
      errors.push("Favor selecionar um Fornecedor.");
    } else {
      dataProduct.idProvider = provider.value;
    }

    // Validação da quantidade
    const quantity = Number(infoQtd);
    if (isNaN(quantity) || quantity <= 0) {
      errors.push("Favor colocar uma quantidade maior que 0.");
    } else {
      dataProduct.qtdItems = quantity;
    }

    // Se houver erros, interrompe
    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      return;
    }

    // Valor do frete
    dataProduct.valueDelivery = Number(valueDelivery) || 0;

    setInfoOrderStock({
      statusDelivery: dataProduct.statusDelivery,
      valueDelivery: Number(valueDelivery),
      idProvider: provider.value,
      nameProvider: provider.label,
      idStockEntry: parseInt(idStockEntry),
    });

    delete dataProduct.statusDelivery;
    setDisableIdStockEntry(true);

    // -----------------------------
    // construção da LISTA FINAL
    // -----------------------------
    const finalList = [];

    // Produto principal
    finalList.push({
      ...dataProduct,
    });

    // Subprodutos (se existirem)
    if (
      listSubProduct.codeStatus === 200 &&
      listSubProduct.subProduct?.length > 0
    ) {
      for (const subItem of listSubProduct.subProduct) {
        finalList.push({
          codProd: subItem.codProd,
          // idProduct: subItem.idProduct,
          // idSubProduct: subItem.idSubProduct,
          idProvider: provider.value,
          nameProvider: provider.label,
          idStockEntry: parseInt(idStockEntry),
          nameProduct: subItem.nameProduct,
          priceTotal: 0,
          priceUnit: 0,
          qtdItems: 0,
          valueDelivery: Number(valueDelivery),
        });
      }
    }

    // -----------------------------
    // Salva TUDO de uma vez só
    // -----------------------------
    setProductStock({
      priceTotal: dataProduct.priceTotal,
      idStockEntry: parseInt(idStockEntry),
      listProducts: finalList,
    });
  };

  // Validação do codigo do pedido
  const getIdStockEntry = async () => {
    const infoIdStockEntry = await dispatch(
      getInfoIdStockEntry(infoEntryStock)
    );

    if (infoIdStockEntry?.payload?.codeStatus === 200) {
      setDisableBtn(true);
      setInfoIdStockEntry(infoIdStockEntry.payload);
    } else if (infoIdStockEntry?.payload?.codeStatus === 404) {
      setDisableBtn(false);
      setInfoIdStockEntry(infoIdStockEntry.payload);
    }
  };

  const getListSubProducts = async (idProduct) => {
    const subProductByProduct = await getSubProducts(idProduct);
    setListSubProduct(subProductByProduct.data);
  };

  const qtdItems = Number(infoQtd);
  const priceUnit = Number(priceUnitFormated);

  const disableScroll = (e) => {
    e.target.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  const sendProvider = (provider) => {
    setProvider(provider);
  };
  const sendProduct = (product) => {
    setProduct(product);
  };

  useEffect(() => {
    if (infoEntryStock?.length === 0) {
      setInfoIdStockEntry(infoEntryStock);
    } else if (infoEntryStock) {
      getIdStockEntry(infoEntryStock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoEntryStock]);

  useEffect(() => {
    let totalPrice;

    if (qtdItems > 0) {
      totalPrice = qtdItems * priceUnitFormated;
      if (totalPrice) {
        setValueFinalOrder(Number(totalPrice));
      } else {
        setValueFinalOrder(0);
      }
    }
    // getProductInfo(productSearch)
  }, [qtdItems, priceUnit, setValue, priceUnitFormated]);

  // ! Usado para busca de codigo de barra
  // useEffect(() => {
  //   if (productSearch.length === 0) {
  //     setProductInfo(productSearch);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productSearch]);

  useEffect(() => {
    if (product?.subItem === true) {
      getListSubProducts(product?.value);
      setStatusSubProduct(true);
    } else {
      setStatusSubProduct(false);
    }
  }, [product]);

  useEffect(() => {
    if (formState.isSubmitted) {
      setTimeout(() => {
        // reset();
        setPriceUnitFormated("");
        setInfoQtd("");
        sendProduct(null);
        setValueFinalOrder("");
        setListSubProduct([]);
        // setProductInfo([]);
        // setProductId(0);
      }, 1500);
    }
  }, [formState.isSubmitted, reset]);

  useEffect(() => {
    if (listProviders?.length > 0) {
      const optionsProviders = listProviders.map((providers) => ({
        value: providers.idProvider,
        label: providers.nameProvider,
      }));
      setOptionsProviders(optionsProviders);
    }
    if (listProducts?.length > 0) {
      const optionsProducts = listProducts.map((product) => ({
        value: product.idProduct,
        label:
          product.codProd +
          " / " +
          product.nameProduct +
          " / " +
          product.nameBrand,
        priceSell: product.priceSell,
        codProd: product.codProd,
        subItem: product.subItem,
      }));
      setOptionsProducts(optionsProducts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProducts]);

  useEffect(() => {
    if (statusNewItem) {
      setProduct(null);
      setProvider(null);
      setStatusNewItem(false);
      setPriceUnitFormated(null);
      setInfoQtd(null);
      setDisableIdStockEntry();
      setIdStockEntry(0);
      setInfoIdStockEntry([]);
    }
  }, [statusNewItem]);

  return (
    <DivOrgScreen>
      <DivItemStockEntry>
        <FormItemStockEntry onSubmit={handleSubmit(sendProductToStock)}>
          <DivOrgItemStockEntry>
            <LabelItemStockEntry>Codigo Pedido</LabelItemStockEntry>
            <DivOrgBtnCancel>
              <InputSmall
                value={idStockEntry}
                type="number"
                step="any"
                onChange={(e) => {
                  setIdStockEntry(e.target.value);
                }}
                disabled={disableIdStockEntry}
                onFocus={disableScroll}
              />
              {idStockEntry?.length > 0 ? (
                <BtnCancel
                  type="button"
                  onClick={() => {
                    setDisableIdStockEntry(false);
                  }}
                >
                  <Close />
                </BtnCancel>
              ) : (
                <></>
              )}
            </DivOrgBtnCancel>
          </DivOrgItemStockEntry>
          {infoIdStockEntry.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>Já existe um pedido com esse Número</InfoResult>
            </DivOrgResults>
          )}
          <DivOrgItemStockEntry>
            <LabelItemStockEntry>Nome do Produto</LabelItemStockEntry>
            <SelectProduct
              name="product"
              value={product}
              placeholder="Selecione"
              options={optionsProducts}
              isClearable={isClearable}
              onChange={sendProduct}
            />
          </DivOrgItemStockEntry>
          {statusSubProduct ? (
            <DivOrgItemStockEntry>
              <LabelItemStockEntry>
                Esse produto possui sub-produto
              </LabelItemStockEntry>
              <DivBtnSubProduct>
                <BtnSubProduct
                  type="button"
                  onClick={() => setPopUpList(!popUpList)}
                >
                  Sub-Produtos
                </BtnSubProduct>
              </DivBtnSubProduct>
            </DivOrgItemStockEntry>
          ) : (
            <></>
          )}

          <DivOrgItemStockEntry>
            <DivOrgInput>
              <LabelItemStockEntry>Quantidade</LabelItemStockEntry>
              <InputSmall
                value={infoQtd}
                type="number"
                step="any"
                onChange={(e) => {
                  setInfoQtd(e.target.value);
                }}
                onFocus={disableScroll}
              />
            </DivOrgInput>
          </DivOrgItemStockEntry>
          <DivOrgItemStockEntry>
            <DivOrgInput>
              {/* colocar para utilizar valores em decimal e formatar R$00.000.00*/}
              <LabelItemStockEntry>Preço Unitario</LabelItemStockEntry>
              <NumericFormat
                value={priceUnitFormated}
                defaultValue={0}
                customInput={InputSmall}
                placeholder="R$ "
                allowEmptyFormatting
                mask="_"
                decimalSeparator=","
                fixedDecimalScale
                thousandSeparator="."
                decimalScale={2}
                prefix={"R$"}
                onValueChange={(values) => {
                  setPriceUnitFormated(Number(values.value));
                }}
              />
            </DivOrgInput>
            <DivOrgInput>
              <LabelItemStockEntry>Preço Total</LabelItemStockEntry>
              <NumericFormat
                customInput={LabelCalcResult}
                displayType="text"
                value={valueFinalOrder || 0}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgInput>
          </DivOrgItemStockEntry>
          <DivOrgItemStockEntry>
            <LabelItemStockEntry>Fornecedor</LabelItemStockEntry>
            <SelectProvider
              name="provider"
              placeholder="Selecione"
              options={optionsProviders}
              isClearable={isClearable}
              onChange={sendProvider}
            />
          </DivOrgItemStockEntry>
          <TitleDelivery>Valor do Frete</TitleDelivery>
          <DivOrgItemStockEntry>
            <DivOrgInput>
              <LabelItemStockEntry>Frete</LabelItemStockEntry>
              <SelectOption
                {...register("statusDelivery", {
                  onChange: (e) => {
                    setInputDelivery(e.target.value);
                  },
                })}
              >
                <Options value="">Selecionar</Options>
                <Options value="sim">Sim</Options>
                <Options value="nao">Não</Options>
              </SelectOption>
            </DivOrgInput>
            {inputDelivery === "sim" && (
              <DivOrgInput>
                <LabelItemStockEntry>Valor</LabelItemStockEntry>
                <NumericFormat
                  placeholder="R$ "
                  customInput={InputSmall}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$"}
                  onValueChange={(values) => {
                    setValueDelivery(Number(values.value));
                  }}
                />
              </DivOrgInput>
            )}
          </DivOrgItemStockEntry>
          <SubmitFormItemStockEntry type="submit" disabled={disableBtn}>
            Adicionar
          </SubmitFormItemStockEntry>
        </FormItemStockEntry>
      </DivItemStockEntry>
      {/* Passa um objeto, resetar os inputs apos enviar */}
      <TableItem
        productStock={productStock}
        infoOrderStock={infoOrderStock}
        setStatusNewItem={setStatusNewItem}
      />
      <InfoListSubProduct
        popUpList={popUpList}
        setPopUpList={setPopUpList}
        listSubProduct={listSubProduct}
      />
    </DivOrgScreen>
  );
}
