import React, { useEffect, useState } from "react";
import {
  DivNewTag,
  FormNewTag,
  DivOrgNewTag,
  LabelNewTag,
  SubmitFormNewTag,
  DivOrgInput,
  DivOrgScreen,
  SelectProduct,
  DivOrgInfo,
  DivTag,
  TitleTag,
  DivOrgContent,
  DivOrgExampleInfo,
  NameTag,
  CodTag,
  PriceTag,
  DivOrgImg,
  DivOrgTitle,
} from "./NewTagStyle";
import TableTag from "../../Tables/TableTag/TableTag";

import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export default function NewItem(props) {
  const listProducts = props.productsInfo.productStock;

  const [productTag, setProductTag] = useState([]);
  const [selectProduct, setSelectProduct] = useState([]);
  const [optionsProducts, setOptionsProducts] = useState([]);

  const { handleSubmit, reset, formState } = useForm();

  // Aqui faz o envio de um ojbeto e retorna o valor inicial
  function sendProductToTag(dataProduct) {
    // envia o valor unitario do item
    dataProduct.priceSell = selectProduct?.priceSell;
    // enviar o id do produto
    dataProduct.idProduct = selectProduct?.value;
    //Envia o nome do produto
    dataProduct.nameProduct = selectProduct?.label;
    //Envia a quantidade
    dataProduct.qtdItems = selectProduct?.qtdItems;
    // Envia o codigo de barra
    dataProduct.codProd = selectProduct?.codProd;

    if (dataProduct.idProduct === undefined) {
      window.alert("Escolhe um item para gerar etiqueta");
    } else {
      setProductTag(dataProduct);
      setSelectProduct(null);
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(() => {
        reset();
        // setProductTag([])
      }, 1500);
    }
  }, [formState, reset]);

  useEffect(() => {
    if (listProducts?.length > 0) {
      const optionsProducts = listProducts.map((product) => ({
        value: product.idProduct,
        label: product.nameProduct,
        codProd: product.codProd,
        // label: product.nameProduct + " / " + product.brandName,
        priceSell: product.priceSell,
        qtdItems: product.totalQtd,
      }));
      setOptionsProducts(optionsProducts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProducts]);

  return (
    <DivOrgScreen>
      <DivOrgContent>
        <DivNewTag>
          <TitleTag>Criar etiqueta</TitleTag>
          <FormNewTag onSubmit={handleSubmit(sendProductToTag)}>
            <DivOrgNewTag>
              <LabelNewTag>Nome do Produto</LabelNewTag>
              <SelectProduct
                name="product"
                placeholder="Selecione"
                value={selectProduct}
                options={optionsProducts}
                isClearable
                onChange={setSelectProduct}
              />
            </DivOrgNewTag>
            <DivOrgNewTag>
              <LabelNewTag>Codigo de Barra</LabelNewTag>
              <LabelNewTag>{selectProduct?.codProd || 0}</LabelNewTag>
            </DivOrgNewTag>
            <DivOrgInfo>
              <DivOrgInput>
                <LabelNewTag>Quantidade</LabelNewTag>
                <LabelNewTag>{selectProduct?.qtdItems || 0}</LabelNewTag>
              </DivOrgInput>
              <DivOrgInput>
                <LabelNewTag>Preço de Venda</LabelNewTag>
                <NumericFormat
                  placeholder=""
                  displayType="text"
                  value={selectProduct?.priceSell || 0}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </DivOrgInput>
            </DivOrgInfo>
            <SubmitFormNewTag type="submit">Adicionar</SubmitFormNewTag>
          </FormNewTag>
        </DivNewTag>
        <DivTag>
          <DivOrgImg>
            {/* <ImageTag src={Logo} alt="logo etiqueta" /> */}
            <DivOrgTitle>
              <NameTag>*Etiqueta de Exemplo*</NameTag>
              <TitleTag>Nome do Produto</TitleTag>
              <PriceTag>R$ 25.00</PriceTag>
            </DivOrgTitle>
          </DivOrgImg>
          <DivOrgExampleInfo>
            <CodTag value="125" width={4} />
          </DivOrgExampleInfo>
        </DivTag>
      </DivOrgContent>
      {/* Passa um objeto, resetar os inputs apos enviar */}
      <TableTag productTag={productTag} />
    </DivOrgScreen>
  );
}
