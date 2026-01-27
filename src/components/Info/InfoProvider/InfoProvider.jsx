import React from "react";
import {
  DivOrgProvider,
  DivInfoProvider,
  InfoProviderResult,
  DivOrgInfo,
  DivBtnClose,
  BtnClose,
} from "./InfoProviderStyle";
import { Close } from "@styled-icons/material";

export default function InfoProvider(props) {
  const providerInfo = props.selectedProviderView;
  return (
    <DivOrgProvider show={props.providerView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setProviderView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivInfoProvider>
        <DivOrgInfo>
          <InfoProviderResult>Rua: {providerInfo.street} Nº {providerInfo.localNumber}</InfoProviderResult>
          {/* <NameProvider>CNPJ: {providerInfo.cnpj}</NameProvider> */}
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoProviderResult>Bairro: {providerInfo.district} Cidade: {providerInfo.city} Estado: {providerInfo.state}</InfoProviderResult>

        </DivOrgInfo>
      </DivInfoProvider>
    </DivOrgProvider>
  );
}
