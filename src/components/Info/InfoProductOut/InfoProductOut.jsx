import React from "react";
import {
  DivOrgProductOut,
  DivInfoProductOut,
  InfoProductOutResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
  DivOrgPrices,
  DivOrgInfoDetails,
  InfoProductDetails,
} from "./InfoProductOutStyle";
import { Close } from "@styled-icons/material";

export default function InfoProductOut(props) {
  const productOutInfo = props.selectedItemOutView;

  
  return (
    <DivOrgProductOut show={props.productOutView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setProductOutView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivInfoProductOut>
        <DivOrgPrices>
          <DivOrgInfo>
            <InfoProductOutResult>Quantidade anterior: </InfoProductOutResult>
            &nbsp;
            <InfoProductOutResult>
              {productOutInfo.oldTotalQtd}
            </InfoProductOutResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoProductOutResult>Quantidade removida: </InfoProductOutResult>
            &nbsp;
            <InfoProductOutResult>
              {productOutInfo.qtdRemoveByBatch || productOutInfo.qtdRemoveNoBatch}
            </InfoProductOutResult>
          </DivOrgInfo>
          <DivOrgInfo>
            <InfoProductOutResult>Motivo: </InfoProductOutResult>
            &nbsp;
            <InfoProductOutResult>{productOutInfo.reason}</InfoProductOutResult>
          </DivOrgInfo>
        </DivOrgPrices>
        <DivOrgPrices>
          {productOutInfo.productBatch ? (
            <>
              <DivOrgInfo>
                <InfoProductOutResult>Lote:</InfoProductOutResult>
                &nbsp;
                <InfoProductOutResult>
                  {productOutInfo.productBatch}
                </InfoProductOutResult>
              </DivOrgInfo>
              <DivOrgInfo>
                <InfoProductOutResult>Data de vencimento</InfoProductOutResult>
                &nbsp;
                <InfoProductOutResult>
                  {productOutInfo.dueDateProduct}
                </InfoProductOutResult>
              </DivOrgInfo>
              {/* <DivOrgInfo>
                <InfoProductOutResult>
                  Quantidade anterior com o lote:
                </InfoProductOutResult>
                &nbsp;
                <InfoProductOutResult>
                  {productOutInfo.qtdByBatch}
                </InfoProductOutResult>
              </DivOrgInfo>
              <DivOrgInfo>
                <InfoProductOutResult>Quantidade removida com o lote</InfoProductOutResult>
                &nbsp;<InfoProductOutResult>{productOutInfo.qtdRemoveBybatch}</InfoProductOutResult>
              </DivOrgInfo> */}
            </>
          ) : (
            <></>
          )}
        </DivOrgPrices>
      </DivInfoProductOut>
      <DivOrgInfoDetails>
        <InfoProductDetails>
          Detalhes: {productOutInfo.details}
        </InfoProductDetails>
      </DivOrgInfoDetails>
    </DivOrgProductOut>
  );
}
