import React, { useEffect } from "react";
import {
  DivOrgPrintDelivery,
  DivPrintDelivery,
  Divclient,
  DivCompany,
  DivOrgTitleDelivery,
  TitleDelivery,
  DivOrgInfo,
  NameClient,
  InfoDelivery,
} from "./PrintDelivery.style"; // ou onde estiverem seus estilos
import { PatternFormat } from "react-number-format";

const PrintDelivery = React.forwardRef(({ infoDelivery }, ref) => {
  return (
    <DivOrgPrintDelivery ref={ref}>
      <DivPrintDelivery>
        <Divclient>
          {/* Exemplo: */}
          <DivOrgTitleDelivery>
            <TitleDelivery>Destinatário</TitleDelivery>
          </DivOrgTitleDelivery>
          <DivOrgInfo>
            <NameClient>{infoDelivery?.nameClient}</NameClient>
            <InfoDelivery>
              {infoDelivery?.street}, Nº{infoDelivery?.localNumber},{" "}
              {infoDelivery?.complement}
            </InfoDelivery>
            <InfoDelivery>
              {infoDelivery?.district}, {infoDelivery?.city} -{" "}
              {infoDelivery?.state}
            </InfoDelivery>
            <InfoDelivery>
              CEP:
              <PatternFormat
                value={infoDelivery?.cep}
                displayType="text"
                format="#####-###"
              />
            </InfoDelivery>
          </DivOrgInfo>
        </Divclient>
        <DivCompany>
          {/* Exemplo: */}
          <DivOrgTitleDelivery>
            <TitleDelivery>Remetente</TitleDelivery>
          </DivOrgTitleDelivery>
          <DivOrgInfo>
            <NameClient>{import.meta.env.VITE_NAME_CLIENT}</NameClient>
            <InfoDelivery>{import.meta.env.VITE_ENDERECO_EMPRESA}</InfoDelivery>
            <InfoDelivery>
              {import.meta.env.VITE_BAIRRO_EMPRESA},{" "}
              {import.meta.env.VITE_CIDADE_EMPRESA} -{" "}
              {import.meta.env.VITE_ESTADO_EMPRESA}
            </InfoDelivery>
            <InfoDelivery>
              CEP:
              <PatternFormat
                value={import.meta.env.VITE_CEP_EMPRESA}
                displayType="text"
                format="#####-###"
              />
            </InfoDelivery>
          </DivOrgInfo>
        </DivCompany>
      </DivPrintDelivery>
    </DivOrgPrintDelivery>
  );
});

export default PrintDelivery;
