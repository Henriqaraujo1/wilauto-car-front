import { useEffect, useState } from "react";
import {
  DivOrder,
  TitleOrder,
  OrderForm,
  InputBig,
  Label,
  LabelInfo,
  BtnForm,
  DivOrg,
  DivTotal,
  DivOrgResults,
  InfoResult,
  DivOrgScreen,
  InputSmall,
  SelectDoc,
  Options,
  DivAlerts,
  TitleAlert,
  Alerts,
  SelectCodProduct,
  SelectClient,
  BtnAddClient,
  DivOrgBtn,
  BtnReloading,
  DivOrgLoading,
  DivBtnCashier,
  BtnCashier,
  BtnCancel,
} from "./OrderStyle";
import DetailOrder from "../../Details/DetailOrder/DetailOrder";

import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useLazyGetCodProductQuery } from "../../../store/registers/products/product.api";
import { getClient } from "../../../store/registers/clients/clients.actions";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import { NumericFormat } from "react-number-format";
import { Close, Loop, PersonAdd } from "@styled-icons/material";
import NewClientPopUp from "../NewClientPopUp/NewClientPopUp";

export default function Order({
  infoOrder,
  listProduct,
  listClient,
  setReloadingClient,
  reloadingClient,
  dataCashier,
}) {
  const dispatch = useDispatch();

  const [getCodProduct] = useLazyGetCodProductQuery();

  // items para alterações
  const infoOrderChange = infoOrder;
  const infoClientChange = infoOrder;
  const listProducts = listProduct;
  const listClientsInfo = listClient;
  const infoCashier = dataCashier;

  // Cart states guide
  const [cartItem, setCartItem] = useState([]);
  const [infoClient, setInfoClient] = useState([]);
  // Product States guide
  const [productId, setProductId] = useState(0);
  const [productsInfo, setProductsInfo] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productSearch] = useDebounce(productId, 300);
  const [valueDiscount, setValueDiscount] = useState(0);
  const [showAlertQtd, setShowAlertQtd] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [qtdSell, setQtdSell] = useState(0);
  const [qtdDisable, setQtdDisable] = useState(false);
  const [showAlertProduct, setShowAlertProduct] = useState(false);

  const [selectProd, setSelectProd] = useState("nome");
  // const [codProduct, setCodProduct] = useState("");
  const [isClearable] = useState(true);
  // const [product, setProduct] = useState([]);
  const [optionsProducts, setOptionsProducts] = useState([]);

  const [showAlertZero, setShowAlertZero] = useState(false);

  // Client State guide
  const [clientId, setClientId] = useState("");
  const [clientsInfo, setClientsInfo] = useState([]);
  const [optionsClients, setOptionsClients] = useState([]);
  const [clientSearch] = useDebounce(clientId, 300);
  const [showPopClient, setShowPopClient] = useState(false);
  const [disableClient, setDisableClient] = useState(false);

  // const [priceUnit, setPriceUnit] = useState(null);

  const [statusCashier, setStatusCashier] = useState(false);

  const { register, handleSubmit, watch, setValue, reset, formState } = useForm(
    {
      defaultValues: {
        priceWithDiscount: 0,
        priceNoDiscount: 0,
        valueDiscount: 0,
        qtd: 0,
      },
    }
  );

  const getInfoProduct = async (codProduct) => {
    setLoadingProduct(true);
    const valueProduct = { codProd: codProduct };
    const productId = await getCodProduct(valueProduct);

    setProductsInfo(productId.data || productId.error.data);
    setLoadingProduct(false);
  };

  const getIdClient = async (idClient) => {
    const valueClient = idClient.cpf;
    const client = await dispatch(getClient(valueClient));

    setClientsInfo(client.payload);
  };

  function parseName(oneName, secondName) {
    const firstName = oneName || " ";
    const lastName = secondName || " ";
    var fullName = firstName.concat(" ", lastName) || "";
    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    const result = formatName.join(" ");

    return result;
  }

  function sendProductToCheckout(dataProduct) {
    if (nameProduct === undefined) {
      setShowAlertProduct(true);
    } else {
      setShowAlertProduct(false);
      // preço unitarios
      dataProduct.valueDiscount = discount;
      dataProduct.nameProduct = nameProduct;
      dataProduct.codProd = productSearch;
      dataProduct.idProduct = idProduct;
      dataProduct.qtd = parseFloat(qtdSell);
      dataProduct.priceSell = productsInfo?.product?.priceSell;

      if (clientsInfo?.client?.clientName === undefined) {
        setInfoClient({
          nameClient: "Cliente Não identificado",
        });
      } else {
        const clientNameFormat = parseName(
          clientsInfo?.client?.clientName,
          clientsInfo?.client?.lastName
        );
        setInfoClient({
          nameClient: clientNameFormat,
          cpf: clientsInfo.client.cpf,
          idClient: clientsInfo.client.idClient,
          city: clientsInfo.client.city,
          district: clientsInfo.client.district,
          street: clientsInfo.client.street,
          localNumber: clientsInfo.client.localNumber,
          state: clientsInfo.client.state,
          complement: clientsInfo.client.complement,
        });
      }

      setCartItem(dataProduct);
      setDisableClient(true);
    }
  }

  const disableScroll = (e) => {
    e.target.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  };

  const sendProduct = (product) => {
    if (product != null) {
      setProductId(product.codProd);
    } else {
      setProductsInfo(productSearch);
    }
  };

  useEffect(() => {
    // * Verificação do caixa
    if (infoCashier === true) {
      setStatusCashier(true);
    } else {
      setStatusCashier(false);
    }
  }, [infoCashier]);

  let qtd = qtdSell;

  // Garante que seja número, mesmo que venha como string
  let priceUnit = productsInfo?.product?.priceSell.toFixed(2);
  let nameProduct = productsInfo?.product?.nameProduct;
  let idProduct = productsInfo?.product?.idProduct;
  let discount = Number(valueDiscount) || 0;

  useEffect(() => {
    let totalPrice;
    if (discount > 0) {
      const priceNoDiscount = qtd * priceUnit;
      const valueDiscount = parseFloat(
        (qtd * priceUnit * discount) / 100
      ).toFixed(2);
      totalPrice = qtd * priceUnit - discount;
      setValue("priceWithDiscount", Number(totalPrice.toFixed(2)));
      setValue("priceNoDiscount", Number(priceNoDiscount.toFixed(2)));
      setValue("valueDiscount", Number(valueDiscount));
    } else {
      totalPrice = qtd * priceUnit;
      setValue("valueDiscount", 0);
      setValue("priceWithDiscount", Number(totalPrice.toFixed(2)));
      setValue("priceNoDiscount", Number(totalPrice.toFixed(2)));
    }
    // setValue("totalValue", totalPrice);
  }, [qtd, discount, setValue, priceUnit]);

  useEffect(() => {
    if (productSearch?.length === 0) {
      setProductsInfo(productSearch);
    }
    if (productSearch) {
      getInfoProduct(productSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch]);

  useEffect(() => {
    if (clientSearch?.length === 0) {
      setClientsInfo(clientSearch);
    }
    if (clientSearch) {
      getIdClient(clientSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSearch]);

  useEffect(() => {
    if (infoClientChange?.detailOrder?.infoClient?.nameClient.length > 0) {
      setClientId(infoClientChange?.detailOrder.infoClient.cpf);
      setClientsInfo([]);
      setInfoClient(infoClientChange?.detailOrder?.infoClient);
    }
  }, [infoClientChange]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(() => {
        reset();
        setProductsInfo([]);
        setValueDiscount("");
        setQtdSell(0);
      }, 1500);
    }
  }, [formState, reset, setValue]);

  useEffect(() => {
    if (
      qtdSell > productsInfo?.product?.qtdNow ||
      productsInfo?.product?.qtdNow === 0
    ) {
      setShowAlertQtd(true);
      setDisableBtn(true);
    } else {
      setShowAlertQtd(false);
      setDisableBtn(false);
    }
  }, [productsInfo, qtdSell]);

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

  useEffect(() => {
    if (productsInfo?.product?.type === "serviço") {
      setQtdSell(1);
      setQtdDisable(true);
    } else if (productsInfo?.product?.type === "produto") {
      setQtdSell(0);
      setQtdDisable(false);
    }
  }, [productsInfo]);

  useEffect(() => {}, [qtdSell]);

  useEffect(() => {
    if (listProducts?.length > 0) {
      const optionsProducts = listProducts.map((product) => ({
        value: product.codProd,
        label: "Cod: " + product.codProd + " - " + product.nameProduct,
        codProd: product.codProd,
      }));
      setOptionsProducts(optionsProducts);
    }
    if (listClientsInfo?.length > 0) {
      const optionsClients = listClientsInfo.map((client) => ({
        value: client.idClient,
        label:
          client.clientName + " " + client.lastName + " / " + client.docClient,
        cpf: client.docClient,
      }));
      setOptionsClients(optionsClients);
    }
  }, [listProducts, listClientsInfo]);

  // useEffect(() => {
  //   if (selectProd === "nome") {
  //     setProductId("");
  //   }
  // }, [selectProd]);

  return (
    <DivOrgScreen>
      <DivOrder>
        <TitleOrder>Adicionar Produto</TitleOrder>
        <OrderForm
          autoComplete="off"
          onSubmit={handleSubmit(sendProductToCheckout)}
        >
          <DivOrg>
            {/* <Label>Nome Cliente</Label> */}
            <SelectClient
              name="nameClient"
              placeholder="Buscar nome do Cliente"
              options={optionsClients}
              isClearable={isClearable}
              onChange={setClientId}
              // isDisabled={disableClient}
            />
            {disableClient ? (
              <DivOrgBtn>
                <BtnCancel
                  type="button"
                  onClick={() => setDisableClient(false)}
                >
                  <Close />
                </BtnCancel>
              </DivOrgBtn>
            ) : (
              <DivOrgBtn>
                <BtnAddClient
                  type="button"
                  onClick={() => setShowPopClient(!showPopClient)}
                >
                  <PersonAdd />
                </BtnAddClient>
                <BtnReloading
                  type="button"
                  onClick={() => setReloadingClient(true)}
                >
                  <Loop />
                </BtnReloading>
              </DivOrgBtn>
            )}
          </DivOrg>
          <DivOrgLoading show={reloadingClient}>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
          <DivOrg>
            <Label>
              <SelectDoc onChange={(e) => setSelectProd(e.target.value)}>
                <Options value="nome">Nome</Options>
                <Options value="codigo">Codigo</Options>
              </SelectDoc>
              Produto
            </Label>
            {selectProd === "nome" ? (
              <SelectCodProduct
                name="product"
                placeholder="Selecione um produto"
                options={optionsProducts}
                isClearable
                onChange={sendProduct}
              />
            ) : (
              <InputBig
                onFocus={disableScroll}
                type="number"
                placeholder="Codigo"
                {...register("codProd")}
                onChange={(e) => setProductId(e.target.value)}
              />
            )}
          </DivOrg>
          {productsInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{productsInfo.message}</InfoResult>
            </DivOrgResults>
          )}

          <DivOrg>
            <Label>Nome Produto</Label>
            <LabelInfo>
              {loadingProduct ? (
                <ClipLoader speedMultiplier={3} />
              ) : (
                productsInfo?.product?.nameProduct || "-"
              )}
            </LabelInfo>
          </DivOrg>
          <DivOrg>
            <Label>Preço de venda</Label>
            <LabelInfo>
              <NumericFormat
                value={productsInfo?.product?.priceSell || 0}
                placeholder=""
                customInput={LabelInfo}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </LabelInfo>
          </DivOrg>

          <DivOrg>
            <Label>Quantidade</Label>
            <NumericFormat
              customInput={InputSmall}
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
          </DivOrg>
          <DivOrg>
            <Label>Desconto</Label>
            <NumericFormat
              value={valueDiscount}
              customInput={InputSmall}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
              onValueChange={(values, sourceInfo) => {
                setValueDiscount(values.value);
              }}
            />
          </DivOrg>
          {showAlertQtd && (
            <DivAlerts>
              <TitleAlert>AVISO!!</TitleAlert>
              <Alerts>
                A quantidade a ser vendida é maior que o estoque atual de{" "}
                {productsInfo?.product?.qtdNow} a venda não pode ser realizada
              </Alerts>
            </DivAlerts>
          )}
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
          <DivTotal>
            <Label>Total</Label>
            <NumericFormat
              placeholder=""
              customInput={LabelInfo}
              displayType="text"
              value={watch("priceWithDiscount") || 0}
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
            {/* <LabelInfo>{watch("totalValue") || 0}</LabelInfo> */}
          </DivTotal>
          <BtnForm type="submit" disabled={disableBtn}>
            Adicionar
          </BtnForm>
        </OrderForm>
        <NewClientPopUp
          showPopClient={showPopClient}
          setShowPopClient={setShowPopClient}
        />
      </DivOrder>
      <DetailOrder
        cartItem={cartItem}
        infoClient={infoClient}
        infoOrderChange={infoOrderChange}
      />
    </DivOrgScreen>
  );
}
