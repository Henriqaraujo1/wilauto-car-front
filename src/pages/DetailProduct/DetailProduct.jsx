import React from "react";
import {
  DivResumeFin,
  TitleResumeFin,
  DivOrgTitle,
  DivOrgPopUp,
} from "./DetailProductStyle.js";

import DetailStock from "../../components/Details/DetailStock/DetailStock.jsx";
import { useLocation } from "react-router-dom";
import { PopUpProduct } from "../../components/Cards/Cards.jsx";

export default function DetailProduct() {
  const location = useLocation();
  let { productStock } = 0;
  productStock = location.state;
  const infoStock = productStock?.productStock;

  return (
    <DivResumeFin>
      <DivOrgTitle>
        <TitleResumeFin>
          Detalhes do produto: {infoStock.nameProduct} no estoque atual
        </TitleResumeFin>
      </DivOrgTitle>
    <DivOrgPopUp>
      <PopUpProduct detailStockInfo={infoStock} />
    </DivOrgPopUp>
      <DetailStock selectedProduct={infoStock} />
    </DivResumeFin>
  );
}
