import React, { useEffect, useState } from "react";
import {
  DivItemStockOut,
  FormItemStockOut,
  DivOrgItemStockOut,
  LabelItemStockOut,
  InputMedium,
  InputSmall,
  LabelResult,
  LabelResultStock,
  TextItemStockOut,
  SubmitFormItemStockOut,
  DivOrgResults,
  InfoResults,
  LabelResultName,
  Line,
  LabelTotal,
  DivOrgLoading,
  SelectOption,
  Options,
  LabelResultQtd,
  SelectProduct,
} from "./ItemStockOutStyle";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { idProductStock } from "../../../store/stock/stockNow/stockNow.actions";
import { newProductOut } from "../../../store/stock/ItemOutStock/itemOut.actions";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";

export default function ItemStockOut(props) {
  const listStock = props.productsStock;

  const dispatch = useDispatch();
  const [productStock, setProductStock] = useState([]);
  const [productByBatch, setProductByBatch] = useState([]);
  const [loadingQtdByBatch] = useState(false);

  const [productBatchValue, setProductBatchValue] = useState();
  const [productBatchSearch] = useDebounce(productBatchValue, 900);
  const [batchOption, setBatchOption] = useState();
  // const [listProductBatch, setListProductBatch] = useState();

  // const [selectedBatch] = useState();
  const [priceUnitSelect, setPriceUnitSelect] = useState();
  const [qtdSelect, setQtdSelect] = useState(0);
  const [idStockSelect, setIdStockSelect] = useState();
  const [productInStock, setProductInStock] = useState([]);

  const [erroQtd, setErroQtd] = useState({ status: false, message: "" });
  const [stockResult, setStockResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(0);
  const [productSearch] = useDebounce(productId, 900);
  const [buttonHide, setButtonHide] = useState(false);
  const [loadingProductOut, setLoadingProductOut] = useState(false);
  const [loadingListProductOut, setLoadingListProductOut] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    // formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      valueTotalRemove: 0,
    },
  });

  const getProductStock = async (idProduct) => {
    setLoading(true);
    const valueProductId = idProduct;
    if (valueProductId !== undefined) {
      const getProductInfo = await dispatch(idProductStock(valueProductId));
      setProductStock(getProductInfo.payload);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setBatchOption(getProductInfo?.payload?.productStock?.dueDateOption);
    }
  };

  const removeQtd = watch("qtdRemoveNoBatch");
  // let priceUnitProduct = 0;
  let priceTotalProduct = 0;
  let stockQtdProduct = 0;
  let newQtd = 0;

  useEffect(() => {
    let valueTotalStock = 0;

    if (removeQtd && productStock.productStock) {
      // priceUnitProduct = productStock.productStock.priceUnit;
      var priceUnitProduct = priceUnitSelect;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      priceTotalProduct = productStock.productStock.priceTotal;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stockQtdProduct = productStock.productStock.totalQtd;

      if (removeQtd > stockQtdProduct) {
        setErroQtd({
          status: true,
          message: "O item a ser removido é maior que o valor atual",
        });
        setButtonHide(true);
      } else if (productByBatch.totalQtdByProduct > 0) {
        if (removeQtd > productByBatch.totalQtdByProduct) {
          setErroQtd({
            status: true,
            message: "o item a ser removido é maior que a quantidade do lote",
          });
          setButtonHide(true);
        } else {
          setErroQtd({ status: false, message: "" });
          setButtonHide(false);
          if (removeQtd > 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            newQtd = stockQtdProduct - removeQtd;
            valueTotalStock = priceUnitProduct * removeQtd;
            setValue("valueTotalRemove", Number(valueTotalStock.toFixed(2)));
          }
        }
      } else {
        if (removeQtd > qtdSelect) {
          setErroQtd({
            status: true,
            message: "É maior que o quantidade atual com esse preço",
          });
          setButtonHide(true);
        } else {
          setErroQtd({ status: false, message: "" });
          setButtonHide(false);
          if (removeQtd > 0) {
            newQtd = stockQtdProduct - removeQtd;
            valueTotalStock = priceUnitProduct * removeQtd;

            setValue("valueTotalRemove", Number(valueTotalStock.toFixed(2)));
          }
        }
      }
    } else {
      setErroQtd({ status: false, message: "" });
      setButtonHide(false);
      setValue("valueTotalRemove", Number(valueTotalStock.toFixed(2)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    newQtd,
    priceTotalProduct,
    removeQtd,
    productStock,
    setValue,
    productBatchSearch,
    priceUnitSelect,
    setErroQtd,
  ]);

  const updateQtdStock = async (dataProduct) => {
    setLoadingProductOut(true);
    // dataProduct.priceUnit = productStock.productStock.priceUnit;
    dataProduct.priceUnit = priceUnitSelect;
    dataProduct.idStock = idStockSelect;
    dataProduct.idProduct = productStock.productStock.idProduct;
    dataProduct.qtdByBatch = productByBatch.totalQtdByProduct;
    dataProduct.qtdSelect = qtdSelect;
    dataProduct.oldTotalQtd = productStock.productStock.totalQtd;
    dataProduct.dueDateProduct = productByBatch.dueDateProduct;
    // dataProduct.valueToRemove = valueProductRemove;
    if (dataProduct.qtdByBatch > 0) {
      dataProduct.qtdRemoveByBatch = removeQtd;
      dataProduct.qtdRemoveNoBatch = 0;
      // dataProduct.productBatch = selectedBatch;
    } else {
      dataProduct.qtdRemoveByBatch = 0;
      dataProduct.qtdByBatch = 0;
      dataProduct.productBatch = 0;
      dataProduct.dueDateProduct = "Sem validade";
    }
    // Envio das informações para atualizar item no estoque
    const changeQtd = await dispatch(newProductOut(dataProduct));

    setStockResult(changeQtd.payload);
    setTimeout(() => {
      setLoadingProductOut(false);
    }, 1000);
    setTimeout(() => {
      setLoadingListProductOut(true);
    }, 1500);
  };

  const sendProduct = (product) => {
    if (product != null) {
      setProductId(product.codProd);
    } else {
      setProductStock(productSearch);
    }
  };

  useEffect(() => {
    if (loadingListProductOut) {
      props.setLoadingItens(true);
    }
    setTimeout(() => {
      setLoadingListProductOut(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingListProductOut]);

  useEffect(() => {
    if (productSearch?.length === 0) {
      setProductStock(productSearch);
      setBatchOption();
      setPriceUnitSelect("");
      setQtdSelect(0);
    }
    if (productSearch) {
      getProductStock(productSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset();
      }, 1500);
      setTimeout(() => {
        setProductStock([]);
        setStockResult([]);
        setProductByBatch([]);
        setProductId(0);
        setProductBatchValue();
        setPriceUnitSelect();
        setQtdSelect();
        setIdStockSelect();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    let infoStockProduct = productStock?.productStock;
    let qtdValueByPrice = 0;

    if (priceUnitSelect && infoStockProduct) {
      const filterProduct = infoStockProduct?.infoProduct.filter(
        (priceUnit) => priceUnit.priceUnit === priceUnitSelect
      );

      qtdValueByPrice = filterProduct[0];
      setIdStockSelect(qtdValueByPrice?.idStock);
      setQtdSelect(qtdValueByPrice?.totalQtdByProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceUnitSelect, productStock.productStock, setQtdSelect]);

  useEffect(() => {
    if (listStock?.length > 0) {
      const optionsProducts = listStock.map((product) => ({
        value: product.idProduct,
        label: product.nameProduct + " / " + product.brandName,
        codProd: product.codProd,
      }));
      setProductInStock(optionsProducts);
    }
  }, [listStock]);

  return (
    <DivItemStockOut>
      <FormItemStockOut onSubmit={handleSubmit(updateQtdStock)}>
        {/* <FormItemStockOut> */}
        <DivOrgItemStockOut>
          <LabelItemStockOut>Codigo do Produto</LabelItemStockOut>
          <SelectProduct
            name="product"
            placeholder="Selecione"
            options={productInStock}
            isClearable
            onChange={sendProduct}
          />
        </DivOrgItemStockOut>
        {productStock.errorStatus && (
          <DivOrgResults>
            <InfoResults>{productStock.message}</InfoResults>
          </DivOrgResults>
        )}
        <DivOrgItemStockOut>
          <LabelItemStockOut>Produto</LabelItemStockOut>
          <LabelResultName>
            {loading ? (
              <ClipLoader speedMultiplier={4} />
            ) : (
              productStock?.productStock?.nameProduct || "Nome do Produto"
            )}
          </LabelResultName>
        </DivOrgItemStockOut>
        {/* Trocar para outra DIV */}
        <DivOrgItemStockOut>
          <LabelResult>Quantidade em Estoque</LabelResult>
          <LabelResultStock>
            {loading ? (
              <ClipLoader speedMultiplier={4} />
            ) : (
              productStock?.productStock?.totalQtd || 0
            )}
          </LabelResultStock>
          {/* // ! -Criar uma forma de mostrar todos os preços unitarios e mostrar ao usuario para ele escolher o preço 
          // 
          //   ! - isso foi feito meu caro henrique - ass henrique do futuro 
          // */}

          <LabelItemStockOut>Preço Unitario</LabelItemStockOut>
          <SelectOption
            onChange={(e) => setPriceUnitSelect(Number(e.target.value))}
          >
            <Options value="">Selecione</Options>
            {productStock?.productStock?.infoProduct.map((priceUnit, index) => {
              return (
                <Options key={index} value={priceUnit.priceUnit}>
                  {priceUnit.priceUnit.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) || 0}
                </Options>
              );
            })}
          </SelectOption>
        </DivOrgItemStockOut>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Preço Total em Estoque</LabelItemStockOut>
          <LabelResult>
            {loading ? (
              <ClipLoader speedMultiplier={4} />
            ) : (
              <>
                <LabelTotal
                  value={
                    productStock?.productStock?.priceTotal.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    ) || 0
                  }
                  placeholder=""
                  displayType="text"
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </>
            )}
          </LabelResult>
          {batchOption === "sim" ? (
            <>
              <LabelItemStockOut>Validade</LabelItemStockOut>
              {loadingQtdByBatch ? (
                <DivOrgLoading>
                  <ClipLoader speedMultiplier={3} />
                </DivOrgLoading>
              ) : (
                <>
                  <LabelResult>{productByBatch.dueDateProduct}</LabelResult>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </DivOrgItemStockOut>

        {/* {batchOption === "sim" ? (
          <DivOrgItemStockOut>
            <LabelItemStockOut>Lote</LabelItemStockOut>
            {listProductBatch && (
              <SelectOption onChange={(e) => setSelectedBatch(e.target.value)}>
                <Options value="">Selecione</Options>
                {listProductBatch.map((productBatch, index) => {
                  return (
                    <Options key={index} value={productBatch.productBatch}>
                      {productBatch.productBatch.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) || 0}
                    </Options>
                  );
                })}
              </SelectOption>
            )}
          </DivOrgItemStockOut>
        ) : (
          <></>
        )} */}
        {priceUnitSelect && (
          <LabelResultQtd>
            No estoque tem a quantidade de {qtdSelect} com esse preço unitario{" "}
            {priceUnitSelect.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }) || 0}
          </LabelResultQtd>
        )}
        {erroQtd.status && (
          <DivOrgResults>
            <InfoResults>{erroQtd.message}</InfoResults>
          </DivOrgResults>
        )}
        <Line />
        <DivOrgItemStockOut>
          <LabelItemStockOut>Quantidade á retirar</LabelItemStockOut>
          <InputSmall
            type="number"
            step="any"
            {...register("qtdRemoveNoBatch", {
              valueAsNumber: true,
            })}
          />
          <LabelItemStockOut>Preço Total á Retirar</LabelItemStockOut>
          <LabelTotal
            customInput={LabelResult}
            displayType="text"
            value={
              watch("valueTotalRemove").toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || 0
            }
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            prefix={"R$ "}
          />
          {/* <LabelResult>R$ 150</LabelResult> */}
        </DivOrgItemStockOut>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Motivo</LabelItemStockOut>
          <InputMedium
            {...register("reason", {
              required: true,
            })}
          />
        </DivOrgItemStockOut>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Detalhes</LabelItemStockOut>
          <TextItemStockOut
            maxLength={70}
            {...register("details")}
          ></TextItemStockOut>
        </DivOrgItemStockOut>
        <SubmitFormItemStockOut type="submit" disabled={buttonHide}>
          Remover
        </SubmitFormItemStockOut>
        {loadingProductOut ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (stockResult.errorStatus && (
            <DivOrgResults>
              <InfoResults>{stockResult.message}</InfoResults>
            </DivOrgResults>
          )) ||
          (stockResult.successStatus && (
            <DivOrgResults>
              <InfoResults>{stockResult.message}</InfoResults>
            </DivOrgResults>
          ))
        )}
      </FormItemStockOut>
    </DivItemStockOut>
  );
}
