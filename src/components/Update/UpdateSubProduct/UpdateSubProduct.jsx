import { Close } from "@styled-icons/material";
import React, { useEffect, useState } from "react";
import {
  DivUpdateSubProduct,
  FormProduct,
  DivFormProduct,
  DivOrgProduct,
  LabelProduct,
  LabelCalcResult,
  InputProduct,
  InputProductName,
  DivBtnProduct,
  BtnRemoveProduct,
  SubmitProduct,
  DivBtnClose,
  BtnClose,
  InputSmall,
  TitleUpdate,
  DivOrgTitle,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  SelectType,
  DivOrgPrices,
  DivOrgColumn,
  DivOrgProductCol,
  InfoDateDolar,
  SelectOption,
  Options,
} from "./UpdateSubProduct.style";

import { useForm } from "react-hook-form";
import {
  // updtSubProduct,
  getProduct,
} from "../../../store/registers/products/products.actions";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { NumericFormat, PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { useUpSubProductMutation } from "../../../store/registers/subItems/subItems.api";

export default function UpdateSubProduct({
  dataSubProductsUpdate,
  subProductPopUp,
  setProductPopUp,
}) {
  const productDetail = dataSubProductsUpdate;

  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();

  // const [percentSellProduct, setPercentSellProduct] = useState();
  const [productInfo, setProductInfo] = useState({});
  const [productDataInfo, setProductDataInfo] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [codSubProduct, setCodProduct] = useState();
  const [buttonHide, setButtonHide] = useState(false);
  const [productSearch] = useDebounce(codSubProduct, 500);
  const [loadingUpdateSubProduct, setLoadingUpdateSubProduct] = useState();
  const [statusSubItem, setStatusSubItem] = useState(false);

  const [dataSubProduct, setDataProduct] = useState({
    codSubProd: productDetail.codSubProd || "",
    nameSubProduct: productDetail.nameSubProduct || "",
    percentProfit: parseFloat(productDetail.percentProfit) || 0,
    priceBuy: parseFloat(productDetail.priceBuy) || 0,
    priceSell: parseFloat(productDetail.priceSell) || 0,
    priceProfit: parseFloat(productDetail.priceProfit) || 0,
  });

  const [updtSubProduct] = useUpSubProductMutation();

  const getProductCod = async (dataSubProduct) => {
    setLoadingProduct(true);
    const nameSubProductInfo = await dispatch(getProduct(dataSubProduct));
    setProductDataInfo(nameSubProductInfo.payload);
    setLoadingProduct(false);
  };

  const productUpdt = async () => {
    setLoadingUpdateSubProduct(true);
    dataSubProduct.idProduct = productDetail.idProduct;
    // if (priceBuy !== undefined) {
    //   dataSubProduct.priceBuy = Number(priceBuy);
    // }
    // if (percentSell !== undefined) {
    //   dataSubProduct.percentSell = percentSell;
    // }
    // if (priceSell !== undefined) {
    //   dataSubProduct.priceSell = Number(priceSell);
    // }
    console.log(dataSubProduct)
    const upProduct = await updtSubProduct(dataSubProduct);
    setProductInfo(upProduct.data);
    setTimeout(() => {
      setLoadingUpdateSubProduct(false);
    }, 1000);
    setTimeout(() => {
      setProductPopUp(false);
    }, 3000);
  };

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
    if (productSearch) {
      getProductCod(productSearch);
      if (productDataInfo.successStatus === true) {
        setButtonHide(true);
      } else {
        setButtonHide(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch, productDataInfo.successStatus]);

  useEffect(() => {
    let percentProduct = 0;

    const valueSell = parseFloat(dataSubProduct?.priceSell);
    const buy = parseFloat(dataSubProduct?.priceBuy);
    const priceProfit = valueSell - buy;

    if (isNaN(valueSell) || isNaN(buy) || buy === 0) {
      percentProduct = 0;
    } else {
      percentProduct = ((valueSell - buy) / buy) * 100;
    }

    setDataProduct({
      ...dataSubProduct,
      percentProfit: percentProduct,
      priceProfit: priceProfit,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubProduct?.priceSell, dataSubProduct?.priceBuy]);

  return (
    <DivUpdateSubProduct show={subProductPopUp}>
      <FormProduct onSubmit={handleSubmit(productUpdt)}>
        <DivBtnClose>
          <DivOrgTitle>
            <TitleUpdate>Atualizar Sub Produto {parseName(dataSubProduct?.nameSubProduct)}</TitleUpdate>
          </DivOrgTitle>
          <BtnClose onClick={() => setProductPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivFormProduct>
          <DivOrgProduct>
            <LabelProduct>Codigo do Produto</LabelProduct>
            <InputProduct
              value={dataSubProduct.codSubProd}
              {...register("codSubProd", {
                onChange: (e) => {
                  setDataProduct({
                    ...dataSubProduct,
                    codSubProd: e.target.value,
                  });
                  setCodProduct(e.target.value);
                },
              })}
            />
          </DivOrgProduct>
          {loadingProduct ? (
            <ClipLoader speedMultiplier={2} />
          ) : (
            productDataInfo.successStatus && (
              <DivOrgResults>
                <InfoResult>Já existe Produto com esse código</InfoResult>
              </DivOrgResults>
            )
          )}

          <DivOrgProduct>
            <LabelProduct>Nome</LabelProduct>
            <InputProductName
              value={parseName(dataSubProduct.nameSubProduct)}
              {...register("nameSubProduct", {
                onChange: (e) => {
                  setDataProduct({
                    ...dataSubProduct,
                    nameSubProduct: e.target.value,
                  });
                },
              })}
            />
          </DivOrgProduct>
          <DivOrgPrices>
            <DivOrgColumn>
              <DivOrgProductCol>
                <LabelProduct>Preço de Compra</LabelProduct>
                <NumericFormat
                  customInput={InputProduct}
                  value={dataSubProduct.priceBuy}
                  placeholder="R$"
                  mask="_"
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$"}
                  onValueChange={(values) => {
                    setDataProduct({
                      ...dataSubProduct,
                      priceBuy: Number(values.value),
                    });
                  }}
                />
                {/* <InputProduct {...register("priceBuy")} /> */}
              </DivOrgProductCol>

              {statusSubItem === "true" ? (
                <></>
              ) : (
                <DivOrgProductCol>
                  <LabelProduct>Valor da venda</LabelProduct>
                  <NumericFormat
                    customInput={InputProduct}
                    value={dataSubProduct.priceSell}
                    placeholder="US$"
                    mask="_"
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$"}
                    onValueChange={(values) => {
                      setDataProduct({
                        ...dataSubProduct,
                        priceSell: Number(values.value),
                      });
                    }}
                  />
                </DivOrgProductCol>
              )}
            </DivOrgColumn>
          </DivOrgPrices>
          <DivOrgProduct>
            <LabelProduct>Porcentagem de Venda (%)</LabelProduct>
            <PatternFormat
              displayType="text"
              value={dataSubProduct.percentProfit || 0}
              format="######%"
              allowEmptyFormatting
              placeholder="%"
              isAllowed={(values) => {
                if (!values.value) return true;
                const { floatValue } = values;
                return floatValue <= 100;
              }}
            />
          </DivOrgProduct>
          <DivOrgProduct>
            <LabelProduct>Valor do lucro</LabelProduct>
            <NumericFormat
              placeholder=""
              displayType="text"
              value={dataSubProduct.priceProfit}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
              onValueChange={(values) => {
                setDataProduct({
                  ...dataSubProduct,
                  priceProfit: Number(values.value),
                });
              }}
            />
          </DivOrgProduct>
        </DivFormProduct>
        <DivBtnProduct>
          <BtnRemoveProduct
            type="button"
            onClick={() => setProductPopUp(false)}
          >
            Cancelar
          </BtnRemoveProduct>
          <SubmitProduct type="submit" disabled={buttonHide}>
            Salvar
          </SubmitProduct>
        </DivBtnProduct>
        {loadingUpdateSubProduct ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (productInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{productInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (productInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{productInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormProduct>
    </DivUpdateSubProduct>
  );
}
