import { Close } from "@styled-icons/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  DivUpdateProduct,
  FormProduct,
  DivFormProduct,
  DivOrgProduct,
  LabelProduct,
  InputProduct,
  InputProductName,
  DivBtnProduct,
  BtnRemoveProduct,
  SubmitProduct,
  DivBtnClose,
  BtnClose,
  TitleUpdate,
  DivOrgTitle,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  SelectType,
  DivOrgPrices,
  DivOrgColumn,
  DivOrgProductCol,
  SelectOption,
  Options,
  ErrorMessage,
} from "./UpdateProductStyle";

import { useForm } from "react-hook-form";
import {
  // updtProduct,
  getProduct,
} from "../../../store/registers/products/products.actions";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { NumericFormat, PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { useUpdateProductMutation } from "../../../store/registers/products/product.api";
import { useGetAllBrandsQuery } from "../../../store/registers/brand/brand.api";

export default function UpdateProduct({
  dataProductsUpdate,
  productPopUp,
  setProductPopUp,
}) {
  const productDetail = dataProductsUpdate;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [brandInfo, setBrandInfo] = useState([]);

  // const [percentSellProduct, setPercentSellProduct] = useState();
  const [productInfo, setProductInfo] = useState({});
  const [productDataInfo, setProductDataInfo] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [codProduct, setCodProduct] = useState();
  const [buttonHide, setButtonHide] = useState(false);
  const [productSearch] = useDebounce(codProduct, 500);
  const [loadingUpdateProduct, setLoadingUpdateProduct] = useState();

  const [dataProduct, setDataProduct] = useState({
    codProd: productDetail.codProd || "",
    nameProduct: productDetail.nameProduct || "",
    percentProfit: parseFloat(productDetail.percentProfit) || 0,
    type: productDetail.type || "",
    priceBuy: parseFloat(productDetail.priceBuy) || 0,
    priceSell: parseFloat(productDetail.priceSell) || 0,
    priceProfit: parseFloat(productDetail.priceProfit) || 0,
    idBrand: productDetail.idBrand || "",
    nameBrand: productDetail.nameBrand || "",
  });

  const [updtProduct] = useUpdateProductMutation();
  const { data: brandsData } = useGetAllBrandsQuery();

  const brandsOptions = useMemo(() => {
    return (
      brandsData?.brand?.map((brand) => ({
        value: brand.idBrand,
        label: brand.brandName,
      })) || []
    );
  }, [brandsData]);

  const getProductCod = async (dataProduct) => {
    setLoadingProduct(true);
    const nameProductInfo = await dispatch(getProduct(dataProduct));
    setProductDataInfo(nameProductInfo.payload);
    setLoadingProduct(false);
  };

  const productUpdt = async () => {
    setLoadingUpdateProduct(true);
    let errors = [];
    dataProduct.idProduct = productDetail.idProduct;

    if (isNaN(dataProduct.priceBuy) || dataProduct.priceBuy <= 0) {
      errors.push("O preço de compra deve ser maior que 0.");
    }

    if (isNaN(dataProduct.priceSell) || dataProduct.priceSell <= 0) {
      errors.push("O preço de venda deve ser maior que 0.");
    } else if (dataProduct.priceSell < dataProduct.priceBuy) {
      errors.push("O preço de venda deve ser maior que o preço de compra.");
    }

    if (brandInfo?.brand?.idBrand !== undefined) {
      dataProduct.idBrand = brandInfo?.brand?.idBrand;
    } else {
      dataProduct.idBrand = productDetail.idBrand;
    }

    // Se houver erros, interrompe
    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      setLoadingUpdateProduct(false);
      return;
    }

    const upProduct = await updtProduct(dataProduct);
    setProductInfo(upProduct.data);
    setTimeout(() => {
      setLoadingUpdateProduct(false);
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

  const sendBrand = (brand) => {
    setBrandInfo(brand);
    setDataProduct({
      ...dataProduct,
      idBrand: brand.value,
      nameBrand: brand.label,
    });
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

    const valueSell = parseFloat(dataProduct?.priceSell);
    const buy = parseFloat(dataProduct?.priceBuy);
    const priceProfit = valueSell - buy;

    if (isNaN(valueSell) || isNaN(buy) || buy === 0) {
      percentProduct = 0;
    } else {
      percentProduct = ((valueSell - buy) / buy) * 100;
    }

    setDataProduct({
      ...dataProduct,
      percentProfit: Number(percentProduct.toFixed(2)),
      priceProfit: priceProfit,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct?.priceSell, dataProduct?.priceBuy]);

  useEffect(() => {
    if (!brandsOptions.length || !productDetail?.idBrand) return;

    // evita setState desnecessário
    if (brandInfo?.value === productDetail.idBrand) return;

    const selectedBrand = brandsOptions.find(
      (brand) => brand.value === productDetail.idBrand,
    );

    if (selectedBrand) {
      setBrandInfo(selectedBrand);
      setDataProduct((prev) => ({
        ...prev,
        idBrand: selectedBrand.value,
        nameBrand: selectedBrand.label,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsOptions, productDetail?.idBrand]);

  return (
    <DivUpdateProduct show={productPopUp}>
      <FormProduct onSubmit={handleSubmit(productUpdt)}>
        <DivBtnClose>
          <DivOrgTitle>
            <TitleUpdate>Atualizar Produto</TitleUpdate>
          </DivOrgTitle>
          <BtnClose onClick={() => setProductPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivFormProduct>
          <DivOrgProduct>
            <LabelProduct>Codigo do Produto</LabelProduct>
            <InputProduct
              value={dataProduct.codProd}
              {...register("codProd", {
                required: "O produto precisa ter um codigo",
                onChange: (e) => {
                  setDataProduct({
                    ...dataProduct,
                    codProd: e.target.value,
                  });
                  setCodProduct(e.target.value);
                },
              })}
            />
          </DivOrgProduct>
          {errors.codProd && (
            <ErrorMessage>{errors.codProd.message}</ErrorMessage>
          )}
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
              value={parseName(dataProduct.nameProduct)}
              {...register("nameProduct", {
                required: "Digite o nome do produto",
                onChange: (e) => {
                  setDataProduct({
                    ...dataProduct,
                    nameProduct: e.target.value,
                  });
                },
              })}
            />
          </DivOrgProduct>
          {errors.nameProduct && (
            <ErrorMessage>{errors.nameProduct.message}</ErrorMessage>
          )}
          <DivOrgProduct>
            <LabelProduct>Tipo</LabelProduct>
            <SelectOption
              {...register("type", {
                required: "Selecione o tipo do produto",
                onChange: (e) => {
                  setDataProduct({
                    ...dataProduct,
                    type: e.target.value,
                  });
                },
              })}
              value={dataProduct?.type}
            >
              <Options value="" disabled selected>
                Selecione
              </Options>
              <Options value="produto">Produto</Options>
              <Options value="servico">Serviço</Options>
            </SelectOption>
          </DivOrgProduct>
          {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
          <DivOrgPrices>
            <DivOrgColumn>
              <DivOrgProductCol>
                <LabelProduct>Preço de Compra</LabelProduct>
                <NumericFormat
                  customInput={InputProduct}
                  value={dataProduct.priceBuy}
                  placeholder="R$"
                  mask="_"
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$"}
                  onValueChange={(values) => {
                    setDataProduct({
                      ...dataProduct,
                      priceBuy: Number(values.value),
                    });
                  }}
                />
                {/* <InputProduct {...register("priceBuy")} /> */}
              </DivOrgProductCol>
              <DivOrgProductCol>
                <LabelProduct>Valor da venda</LabelProduct>
                <NumericFormat
                  customInput={InputProduct}
                  value={dataProduct.priceSell}
                  placeholder="US$"
                  mask="_"
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$"}
                  onValueChange={(values) => {
                    setDataProduct({
                      ...dataProduct,
                      priceSell: Number(values.value),
                    });
                  }}
                />
              </DivOrgProductCol>
            </DivOrgColumn>
          </DivOrgPrices>
          <DivOrgProduct>
            <LabelProduct>Porcentagem de Venda (%)</LabelProduct>
            <PatternFormat
              displayType="text"
              value={dataProduct.percentProfit || 0}
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
              value={dataProduct.priceProfit}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
              onValueChange={(values) => {
                setDataProduct({
                  ...dataProduct,
                  priceProfit: Number(values.value),
                });
              }}
            />
          </DivOrgProduct>
          <DivOrgProduct>
            <LabelProduct>Categoria</LabelProduct>
            {/* Buscar uma marca */}
            <SelectType
              placeholder="Selecione um tipo"
              options={brandsOptions}
              value={brandInfo}
              onChange={sendBrand}
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
        {loadingUpdateProduct ? (
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
    </DivUpdateProduct>
  );
}
