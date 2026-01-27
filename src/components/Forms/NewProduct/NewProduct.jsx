import { useEffect, useState } from "react";
import {
  DivNewProduct,
  FormProduct,
  DivFormProduct,
  DivOrgProduct,
  LabelProduct,
  InputProductName,
  DivBtnProduct,
  BtnRemoveProduct,
  SubmitProduct,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  SelectType,
  InputSmall,
  InputCodProduct,
  SelectOption,
  Options,
  ErrorMessage,
} from "./NewProductStyle";

import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useLazyGetCodProductQuery,
  useLazyGetNameProductQuery,
} from "../../../store/registers/products/product.api";
import { useDebounce } from "use-debounce";
import { NumericFormat, PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

export default function NewProduct({ brandsData }) {
  const [priceBuyProduct, setPriceBuyProduct] = useState(0);
  const [priceProfit, setPriceProfit] = useState(null);
  const [percentProfit, setPercentProfit] = useState();
  const [priceSell, setPriceSell] = useState(0);
  const [brandInfo, setBrandInfo] = useState([]);
  const [loadingListProducts, setLoadingListProducts] = useState(false);
  const [loading, setLoading] = useState();

  const [codProduct, setCodProduct] = useState();
  const [productInfo, setProductInfo] = useState(null);
  const [productCreated, setProductCreated] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [codProductSearch] = useDebounce(codProduct, 500);
  const [nameProductSearch] = useDebounce(nameProduct, 500);
  const [buttonHide, setButtonHide] = useState(false);

  // // Info Money
  const [statusSubItem, setStatusSubItem] = useState(false);
  // const [valueProfit, setValueProfit] = useState(0);
  // const [valueBuy, setValueBuy] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // CreateProduct and
  const [createProduct] = useCreateProductMutation();

  // * GetNameCode
  const [getNameProduct] = useLazyGetNameProductQuery();
  const [getCodProduct] = useLazyGetCodProductQuery();

  const brandsOptions = brandsData?.map((brand) => ({
    value: brand.idBrand,
    label: brand.brandName,
  }));

  const getProductName = async (dataProduct) => {
    const infoProduct = { nameProduct: dataProduct };
    const nameProductInfo = await getNameProduct(infoProduct);

    setProductInfo({
      ...productInfo,
      nameProductStatus: nameProductInfo.data || nameProductInfo.error.data,
    });
  };
  const getProductCod = async (dataProduct) => {
    const infoProduct = { codProduct: dataProduct };
    const codProductInfo = await getCodProduct(infoProduct);

    setProductInfo({
      ...productInfo,
      codProductStatus: codProductInfo.data || codProductInfo.error.data,
    });
  };

  const newProduct = async (dataProduct) => {
    setLoading(true);
    let errors = [];

    if (isNaN(priceBuyProduct) || priceBuyProduct <= 0) {
      errors.push("O preço de compra deve ser maior que 0.");
    } else {
      dataProduct.priceBuy = parseFloat(priceBuyProduct);
    }

    if (isNaN(priceSell) || priceSell <= 0) {
      errors.push("O preço de venda deve ser maior que 0.");
    } else if (priceSell < priceBuyProduct) {
      errors.push("O preço de venda deve ser maior que o preço de compra.");
    } else {
      dataProduct.priceSell = priceSell;
    }

    if (brandInfo.length === 0) {
      errors.push("O produto deve ter uma categoria.");
    } else {
      dataProduct.idBrand = brandInfo.value;
    }

    // Se houver erros, interrompe
    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      setLoading(false);
      return;
    }

    dataProduct.codProd = codProduct;
    dataProduct.percentProfit = percentProfit;
    dataProduct.subItem = Boolean(dataProduct.subItem);
    dataProduct.priceProfit = priceProfit;

    const productCreate = await createProduct(dataProduct);

    setProductCreated(productCreate.data || productCreate.error.data);
    setTimeout(() => {
      setLoadingListProducts(true);
      setLoading(false);
    }, 1000);
  };

  const disableScroll = (e) => {
    e.target.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  const priceBuy = priceBuyProduct;

  useEffect(() => {
    if (nameProductSearch === undefined || nameProductSearch?.length === 0) {
      setProductInfo(nameProductSearch);
    } else {
      getProductName(nameProductSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameProductSearch]);

  useEffect(() => {
    if (codProductSearch === undefined || codProductSearch?.length === 0) {
      setProductInfo(codProductSearch);
    } else {
      getProductCod(codProductSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codProductSearch]);

  useEffect(() => {
    // Calcula o percentual de lucro com base no preço de compra e no preço de venda
    let percentProduct = 0;

    const valueSell = parseFloat(priceSell);
    const buy = parseFloat(priceBuy);
    const valueProfit = valueSell - buy;

    if (isNaN(valueSell) || isNaN(buy) || buy === 0) {
      percentProduct = 0;
    } else {
      percentProduct = ((valueSell - buy) / buy) * 100;
    }
    // Atualiza o estado ou formulário com o valor calculado
    setPercentProfit(parseFloat(percentProduct.toFixed(2)));
    setPriceProfit(parseFloat(valueProfit.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceSell, priceBuy, setValue]);

  useEffect(() => {
    if (
      productInfo?.nameProductStatus?.successStatus === true ||
      productInfo?.codProductStatus?.successStatus === true
    ) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingListProducts(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingListProducts]);

  useEffect(() => {
    if (productCreated.codeStatus === 200) {
      setTimeout(() => {
        reset();
        setPriceBuyProduct("");
        setPriceSell("");
        setPercentProfit("");
        setPercentProfit("");
        setPriceProfit("");
        setBrandInfo(null);
      }, 3000);
      setTimeout(() => {
        setProductCreated([]);
        setProductInfo([]);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCreated]);

  return (
    <DivNewProduct>
      <FormProduct onSubmit={handleSubmit(newProduct)}>
        <DivFormProduct>
          <DivOrgProduct>
            <LabelProduct>Codigo do Produto</LabelProduct>
            <InputCodProduct
              type="number"
              {...register("codProd", {
                required: "O produto precisa ter um codigo",
              })}
              onFocus={disableScroll}
              onChange={(e) => {
                setCodProduct(e.target.value);
              }}
            />
          </DivOrgProduct>
          {errors.codProd && (
            <ErrorMessage>{errors.codProd.message}</ErrorMessage>
          )}
          {productInfo?.codProductStatus?.successStatus && (
            <DivOrgResults>
              <InfoResult>
                Produto já cadastrado, use outro código para cadastrar esse
                produto.
              </InfoResult>
            </DivOrgResults>
          )}
          <DivOrgProduct>
            <LabelProduct>Nome</LabelProduct>
            <InputProductName
              type="text"
              maxLength={100}
              {...register("nameProduct", {
                required: "Digite um nome do produto",
              })}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
          </DivOrgProduct>
          {errors.nameProduct && (
            <ErrorMessage>{errors.nameProduct.message}</ErrorMessage>
          )}
          {productInfo?.nameProductStatus?.successStatus && (
            <DivOrgResults>
              <InfoResult>
                Produto já cadastrado, use outro nome para cadastrar esse
                produto.
              </InfoResult>
            </DivOrgResults>
          )}
          <DivOrgProduct>
            <LabelProduct>Preço de Compra</LabelProduct>
            <NumericFormat
              value={priceBuyProduct || 0}
              customInput={InputSmall}
              placeholder="R$"
              mask="_"
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$"}
              onValueChange={(values) => {
                setPriceBuyProduct(Number(values.value));
              }}
            />
          </DivOrgProduct>
          <DivOrgProduct>
            <LabelProduct>Possui Sub-itens</LabelProduct>
            <SelectOption
              {...register("subItem", {
                required: "Selecione se terá sub-item",
              })}
              onChange={(e) => {
                setStatusSubItem(e.target.value);
              }}
            >
              <Options value="" disabled selected>
                Selecione
              </Options>
              <Options value={false}>Sim</Options>
              <Options value={true}>Não</Options>
            </SelectOption>
          </DivOrgProduct>
          {errors.subItem && (
            <ErrorMessage>{errors.subItem.message}</ErrorMessage>
          )}
          {statusSubItem === "false" ? (
            <></>
          ) : (
            <DivOrgProduct>
              <LabelProduct>Preço de Venda</LabelProduct>
              <NumericFormat
                customInput={InputSmall}
                placeholder="R$"
                value={priceSell || 0}
                mask="_"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$"}
                onValueChange={(values) => {
                  setPriceSell(Number(values.value));
                }}
              />
            </DivOrgProduct>
          )}

          <DivOrgProduct>
            <LabelProduct>Porcentagem de reajuste (%)</LabelProduct>
            <PatternFormat
              displayType="text"
              value={percentProfit}
              format="######%"
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
              value={priceProfit}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          </DivOrgProduct>
          <DivOrgProduct>
            <LabelProduct>Categoria</LabelProduct>
            {/* Buscar uma marca */}
            <SelectType
              options={brandsOptions}
              placeholder="Selecione um tipo"
              value={brandInfo}
              onChange={(option) => {
                setBrandInfo(option);
              }}
            />
          </DivOrgProduct>
          <DivBtnProduct>
            <BtnRemoveProduct type="reset">Cancelar</BtnRemoveProduct>
            <SubmitProduct type="submit" disabled={buttonHide}>
              Cadastrar
            </SubmitProduct>
          </DivBtnProduct>
        </DivFormProduct>
      </FormProduct>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (productCreated.errorStatus && (
          <DivOrgResults>
            <InfoResult>{productCreated.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (productCreated.successStatus && (
          <DivOrgResults>
            <InfoResult>{productCreated.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivNewProduct>
  );
}
