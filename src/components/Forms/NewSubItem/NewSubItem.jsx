import { useEffect, useState } from "react";
import {
  DivNewSubItem,
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
  DivItemStockEntry,
} from "./NewSubItem.style";
import { NumericFormat, PatternFormat } from "react-number-format";
// import TableSubItem from "../../Tables/TableSubItem/TableSubItem";
import { useForm } from "react-hook-form";

import {
  useLazyGetIdSubProductQuery,
  useLazyGetNameSubProductQuery,
  useNewSubProductMutation,
} from "../../../store/registers/subItems/subItems.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewSubItemm({ infoProduct }) {
  const [priceBuyProduct, setPriceBuyProduct] = useState(null);
  const [priceProfitProduct, setPriceProfitProduct] = useState(null);
  const [percentProfitProduct, setPercentProfitProduct] = useState();
  const [priceSellProduct, setPriceSellProduct] = useState(0);
  const [loadingListProducts, setLoadingListProducts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [codSubProduct, setCodSubProduct] = useState();
  const [productInfo, setProductInfo] = useState(null);
  const [productCreated, setProductCreated] = useState([]);
  const [nameProduct, setNameSubProduct] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [codSubProductSearch] = useDebounce(codSubProduct, 500);
  const [nameProductSearch] = useDebounce(nameProduct, 500);
  const [buttonHide, setButtonHide] = useState(false);

  // // Info Money
  // const [valueProfit, setValueProfit] = useState(0);
  // const [valueBuy, setValueBuy] = useState(0);

  // CreateProduct and
  const [createProduct] = useNewSubProductMutation();

  // * GetNameCode
  const [getNameProduct] = useLazyGetNameSubProductQuery();
  const [getCodProduct] = useLazyGetIdSubProductQuery();

  const { register, handleSubmit, reset, setValue } = useForm();

  const getProductName = async (dataProduct) => {
    const nameProductInfo = await getNameProduct(dataProduct);

    setProductInfo({
      ...productInfo,
      nameProductStatus: nameProductInfo.data || nameProductInfo.error.data,
    });
  };
  const getProductCod = async (dataProduct) => {
    const codSubProductInfo = await getCodProduct(dataProduct);

    setProductInfo({
      ...productInfo,
      codSubProductStatus:
        codSubProductInfo.data || codSubProductInfo.error.data,
    });
  };

  const newProduct = async (dataProduct) => {
    setIsSubmitting(true);
    setLoadingProduct(true);

    // Formatação dos preços
    const priceBuy = Number(parseFloat(priceBuyProduct || 0).toFixed(2));
    const priceSell = Number(parseFloat(priceSellProduct || 0).toFixed(2));
    const priceProfit = Number(parseFloat(priceProfitProduct || 0).toFixed(2));

    // Atribuindo os valores formatados
    dataProduct.codSubProd = codSubProduct;
    dataProduct.percentProfit = percentProfitProduct;
    dataProduct.priceBuy = priceBuy;
    dataProduct.priceSell = priceSell;
    dataProduct.priceProfit = priceProfit;
    dataProduct.idProduct = infoProduct.idProduct;

    // --- Validações ---
    if (!priceBuy || priceBuy <= 0) {
      alert("Por favor, insira o valor de compra");
      setIsSubmitting(false);
      setLoadingProduct(false);
      return;
    }

    if (!priceSell || priceSell <= 0) {
      alert("Por favor, insira o valor de venda");
      setIsSubmitting(false);
      setLoadingProduct(false);
      return;
    }

    const productCreate = await createProduct(dataProduct);
    setProductCreated(productCreate.data || productCreate.error.data);

    // Finalização com delay
    setTimeout(() => {
      setLoadingListProducts(true);
      setLoadingProduct(false);
      setIsSubmitting(false);
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
  const priceSell = priceSellProduct;

  useEffect(() => {
    if (isSubmitting) return;

    console.log(nameProductSearch);

    if (nameProductSearch === undefined || nameProductSearch?.length === 0) {
      setProductInfo(nameProductSearch);
    } else {
      getProductName(nameProductSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameProductSearch, isSubmitting]);

  useEffect(() => {
    if (isSubmitting) return; // <- impede disparo no submit

    console.log(codSubProductSearch);

    if (
      codSubProductSearch === undefined ||
      codSubProductSearch?.length === 0
    ) {
      setProductInfo(codSubProductSearch);
    } else {
      getProductCod(codSubProductSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codSubProductSearch, isSubmitting]);

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
    setPercentProfitProduct(parseFloat(percentProduct.toFixed(2)));
    setPriceProfitProduct(parseFloat(valueProfit.toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceSell, priceBuy, setValue]);

  useEffect(() => {
    if (
      productInfo?.nameProductStatus?.successStatus === true ||
      productInfo?.codSubProductStatus?.successStatus === true
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
        setPriceSellProduct("")
        setPercentProfitProduct("");
        setPriceProfitProduct("");
      }, 3000);
      setTimeout(() => {
        setProductCreated([]);
        setProductInfo([]);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCreated]);

  return (
    <DivNewSubItem>
      <DivItemStockEntry>
        <FormProduct onSubmit={handleSubmit(newProduct)}>
          <DivFormProduct>
            <DivOrgProduct>
              <LabelProduct>Codigo do Sub Produto</LabelProduct>
              <InputCodProduct
                type="number"
                {...register("codSubProd", {
                  required: true,
                })}
                onFocus={disableScroll}
                onChange={(e) => {
                  setCodSubProduct(e.target.value);
                }}
              />
            </DivOrgProduct>
            {productInfo?.codSubProductStatus?.successStatus && (
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
                {...register("nameSubProduct", {
                  required: true,
                })}
                onChange={(e) => {
                  setNameSubProduct(e.target.value);
                }}
              />
            </DivOrgProduct>
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
                  setPriceBuyProduct(values.value);
                }}
              />
            </DivOrgProduct>
            <DivOrgProduct>
              <LabelProduct>Preço de Venda</LabelProduct>
              <NumericFormat
                customInput={InputSmall}
                placeholder="R$"
                value={priceSellProduct || 0}
                mask="_"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$"}
                onValueChange={(values) => {
                  setPriceSellProduct(values.value);
                }}
              />
            </DivOrgProduct>

            <DivOrgProduct>
              <LabelProduct>Porcentagem de reajuste (%)</LabelProduct>
              <PatternFormat
                displayType="text"
                value={percentProfitProduct}
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
                value={priceProfitProduct}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
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

        {loadingProduct ? (
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
      </DivItemStockEntry>
      {/* <TableSubItem /> */}
    </DivNewSubItem>
  );
}
