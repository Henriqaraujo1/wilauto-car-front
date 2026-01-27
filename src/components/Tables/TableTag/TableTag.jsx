import { Remove } from "@styled-icons/material";
import React, { useEffect, useState } from "react";
import {
  BtnRemoveTag,
  CodeTag,
  DivDetailsItens,
  DivOrgDetails,
  DivTagDetails,
  DivIdTag,
  DivInfoTag,
  DivTagAdd,
  DivOrgNumbers,
  DivTableTags,
  Id,
  NameTag,
  TitleNumber,
  Value,
  BtnAddTag,
  DivOrgBtn,
  DivOrgTotalOrder,
  ValueTotalOrder,
  DivOrgInfoOrder,
  DivBtnInfo,
  DivOrgCardProduct,
  ValueProduct,
  TitleTagPrint,
} from "./TableTagStyles";

import PrintTag from "../../Details/PrintViewTag/PrintTag";

export default function TableTag(props) {
  let productsTag = props.productTag;

  const [listProducts, setListProducts] = useState([]);
  const [totalQtd, setTotalQtd] = useState([]);
  const [qtdFinal, setQtdFinal] = useState(0);
  const [allTags, setAllTags] = useState([]);
  const [popUpPrint, setPopUpPrint] = useState(false);

  // const [stockInfo, setTagInfo] = useState([]);
  const [countId, setCountId] = useState(0);
  const [show, setShow] = useState(false);

  const createList = (dataProduct) => {
    const productList = Array.from(listProducts);
    const qtdTag = Array.from(totalQtd);

    setCountId((countId) => countId + 1);
    dataProduct.id = countId;

    // ! - Adiciona cada total do produto na lista
    qtdTag.push(dataProduct.qtdItems);
    const qtdTagFinal = qtdTag.reduce((total, product) => total + product, 0);
    productList.push(dataProduct);

    setShow(true);
    if (show) {
      //Salva todos os totais de cada etique por produto
      setTotalQtd(qtdTag);
      // Salva o total de etiquetas para imprimir
      setQtdFinal(qtdTagFinal);
      // Salva cada item adicionado a lista
      setListProducts(productList);
    }
  };

  const removeProductList = (idProduct) => {
    const newList = listProducts.filter((item) => item.id !== idProduct);
    newList.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    // Reorganiza somente o id que vai renderizar para o cliente
    const newListUpdate = newList.map((productListOf, id) => ({
      ...productListOf,
      id: id + 1,
    }));
    setCountId(newListUpdate.length + 1);
    setListProducts(newListUpdate);
    const newTotalOrder = newListUpdate.map(
      (valueTotal) => valueTotal.priceTotal
    );
    setTotalQtd(newTotalOrder);
    const qtdFinalTag = newListUpdate.reduce(
      (total, product) => total + product.qtdItems,
      0
    );
    setQtdFinal(qtdFinalTag);
  };

  const sendListTag = (infoTag) => {
    if (infoTag.length === 0) {
      window.alert("Adicione itens para ser impresso");
    } else {
      setPopUpPrint(!popUpPrint);
      setAllTags(infoTag);
    }
  };

  useEffect(() => {
    createList(productsTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsTag]);

  return (
    <DivTableTags>
      <TitleTagPrint>Etiquetas para imprimir</TitleTagPrint>
      <DivDetailsItens>
        {listProducts.map((product, id) => {
          return (
            <DivTagAdd key={id}>
              <DivOrgCardProduct>
                <DivTagDetails>
                  <DivIdTag>
                    <Id>{product.id}</Id>
                  </DivIdTag>
                  <DivInfoTag>
                    <NameTag>{product.nameProduct}</NameTag>
                    <CodeTag>{product.codProduct}</CodeTag>
                  </DivInfoTag>
                </DivTagDetails>
                <DivOrgDetails>
                  {/* <DivNumbers> */}
                  <DivOrgNumbers>
                    <TitleNumber>QTD</TitleNumber>
                    <Value>{product.qtdItems}</Value>
                  </DivOrgNumbers>

                  <DivOrgNumbers>
                    <TitleNumber>Preço Venda</TitleNumber>
                    <ValueProduct
                      displayType="text"
                      value={product.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgNumbers>
                </DivOrgDetails>
                <DivBtnInfo>
                  <BtnRemoveTag onClick={() => removeProductList(product.id)}>
                    <Remove />
                  </BtnRemoveTag>
                </DivBtnInfo>
              </DivOrgCardProduct>
            </DivTagAdd>
          );
        })}
      </DivDetailsItens>
      <DivOrgBtn>
        <DivOrgInfoOrder>
          <DivOrgTotalOrder>
            <ValueTotalOrder>Total do Etiquetas: </ValueTotalOrder>
            <ValueTotalOrder>{qtdFinal || 0}</ValueTotalOrder>
          </DivOrgTotalOrder>
        </DivOrgInfoOrder>
        <BtnAddTag
          type="button"
          onClick={() => {
            sendListTag(listProducts);
          }}
        >
          Gerar Etiquetas
        </BtnAddTag>
      </DivOrgBtn>
      <PrintTag
        popUpPrint={popUpPrint}
        setPopUpPrint={setPopUpPrint}
        allTags={allTags}
      />
    </DivTableTags>
  );
}
