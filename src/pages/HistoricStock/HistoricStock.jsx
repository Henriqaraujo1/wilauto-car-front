import React, { useState, useEffect } from "react";
import HistoricEntry from "../../components/Resume/HistoricEntry/HistoricEntry";
import HistoricOut from "../../components/Resume/HistoricOut/HistoricOut";
import {
  DivHistoricStock,
  TitleHistoricStock,
  DivScreenHistoricStock,
} from "./HistoricStockStyle";

import { useDispatch } from "react-redux";
import { idProductEntry } from "../../store/stock/itemEntryStock/newItemStock.action";
import { idProductOut } from "../../store/stock/ItemOutStock/itemOut.actions";
import { useLocation } from "react-router-dom";

export default function HistoricStock() {
  const dispatch = useDispatch();
  const location = useLocation();
  let { productStock } = 0;
  productStock = location.state;
  const listProductStock = productStock?.productStock;
  const [productEntry, setProductEntry] = useState([]);
  const [productOut, setProductOut] = useState([]);

  const getProductEntry = async (idProduct) => {
    const idEntryProduct = idProduct;
    const listProductEntry = await dispatch(idProductEntry(idEntryProduct));

    setProductEntry(listProductEntry.payload);
  };

  const getProductOut = async (idProduct) => {
    const idOutProduct = idProduct;
    const listProductOut = await dispatch(idProductOut(idOutProduct));

    setProductOut(listProductOut.payload);
  };

  useEffect(() => {
    getProductEntry(listProductStock.idProduct);
    getProductOut(listProductStock.idProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductStock]);

  return (
    <DivHistoricStock>
      <TitleHistoricStock>
        Historico de entrada e saida do Produto
      </TitleHistoricStock>
      <DivScreenHistoricStock>
        <HistoricEntry
          productEntry={productEntry.productEntry}
          getProductEntry={getProductEntry}
        />
        <HistoricOut productOut={productOut.productOut} />
      </DivScreenHistoricStock>
    </DivHistoricStock>
  );
}
