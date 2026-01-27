import React, { useEffect, useState } from "react";
import {
  DivStockItem,
  TitleStockItem,
  DivScreenStockItem,
} from "./PriceTagStyles";
import NewTag from "../../components/Forms/NewTag/NewTag";


import { useDispatch } from "react-redux";
import { allStock } from "../../store/stock/stockNow/stockNow.actions";

export default function PriceTag() {
  const dispatch = useDispatch();
  const [productsInfo, setProductsInfo] = useState([]);

  const getListProducts = async () => {
    const listProducts = await dispatch((allStock()));
    setProductsInfo(listProducts.payload);
  };

  useEffect(() => {
    getListProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DivStockItem>
      <TitleStockItem>Painel de Etiquetas</TitleStockItem>
      <DivScreenStockItem>
        {/* Eu posso juntar os dois componentes em caso de passar props entre eles */}
        <NewTag productsInfo={productsInfo} />
      </DivScreenStockItem>
    </DivStockItem>
  );
}
