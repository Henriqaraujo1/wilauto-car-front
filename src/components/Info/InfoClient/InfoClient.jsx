import React from "react";
import {
  DivOrgClient,
  DivInfoClient,
  InfoClientResult,
  DivBtnClose,
  BtnClose,
  DivOrgInfo,
} from "./InfoClientStyle";
import { Close } from "@styled-icons/material";
import { PatternFormat } from "react-number-format";

export default function InfoClient(props) {
  const clientInfo = props.selectedClientView;

  return (
    <DivOrgClient show={props.clientView}>
      <DivInfoClient>
        <DivOrgInfo>
          <InfoClientResult>
            <PatternFormat
              displayType="text"
              placeholder="CEP"
              value={clientInfo?.cep}
              format="CEP: #####-###"
            />
          </InfoClientResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoClientResult>
            Rua: {clientInfo?.street} Nº {clientInfo?.localNumber}
          </InfoClientResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoClientResult>
            Complemento: {clientInfo?.complement}
          </InfoClientResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoClientResult>Status: {clientInfo?.status}</InfoClientResult>
        </DivOrgInfo>

        <DivOrgInfo>
          <InfoClientResult>Bairro: {clientInfo?.district}</InfoClientResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoClientResult>
            Cidade: {clientInfo?.city} Estado: {clientInfo?.state}
          </InfoClientResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoClientResult>
            Ultima alteração {clientInfo?.dateUpdate}
          </InfoClientResult>
        </DivOrgInfo>
      </DivInfoClient>
      <DivBtnClose>
        <BtnClose onClick={() => props.setClientView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
    </DivOrgClient>
  );
}
