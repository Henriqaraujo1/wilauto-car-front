import { useEffect, useState } from "react";
import {
  CodeItem,
  DivDetailsItens,
  DivOrgDetails,
  DivItemDetails,
  DivIdItem,
  DivInfoItem,
  DivItemAdd,
  DivTableItems,
  Id,
  NameItem,
  BtnAddStock,
  DivOrgBtn,
  DivOrgCardProvider,
  DivOrgInfo,
  DivOrgFilter,
  FormatCPFText,
  DivSearch,
  TitleProvider,
  DivBtnFilter,
  DivOrgInput,
  Options,
  NameLabel,
  NameInput,
  DivBtnSearch,
  BtnCancel,
  SelectState,
} from "./TablePrintProvider.style";

import { infoState } from "../../../../utils/infoState.mjs";
import { Close } from "@styled-icons/material";
import ExcelPrintProviders from "./FilePrint/ExcelPrintProviders";

export default function TablePrintProviders({ providersInfo }) {
  const [selectedProvider, setSelectedProvider] = useState([]);

  const [isClearable] = useState(true);

  const [filterCityProvider, setFilterCityProvider] = useState("");
  const [filterStateProvider, setFilterStateProvider] = useState("");

  const [printPopUp, setPrintPopUp] = useState(false);

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (!providersInfo) return;

    let filtered = [...providersInfo];

    if (filterCityProvider.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.city.toLowerCase().includes(filterCityProvider.toLowerCase())
      );
    }

    if (filterStateProvider.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.state.toLowerCase().includes(filterStateProvider.toLowerCase())
      );
    }

    setSelectedProvider(filtered);
  }, [providersInfo, filterCityProvider, filterStateProvider]);

  return (
    <DivTableItems>
      <DivSearch>
        <TitleProvider>Consulta Fornecedores</TitleProvider>
        <DivBtnFilter>
          <DivOrgFilter>
            <DivOrgInput>
              <NameLabel>Cidade</NameLabel>
              <NameInput
                value={filterCityProvider}
                onChange={(e) => setFilterCityProvider(e.target.value)}
              />
            </DivOrgInput>

            <DivOrgInput>
              <NameLabel>Estado</NameLabel>
              <SelectState
                value={filterStateProvider}
                onChange={(e) => setFilterStateProvider(e.target.value)}
              >
                <Options value="">Selecione</Options>
                {infoState.map((infoStates, index) => {
                  return (
                    <Options key={index} value={infoStates.value}>
                      {infoStates.value}
                    </Options>
                  );
                })}
              </SelectState>
            </DivOrgInput>
            <DivBtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterCityProvider("");
                  setFilterStateProvider("");
                  setSelectedProvider(providersInfo || []);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivOrgFilter>
        </DivBtnFilter>
      </DivSearch>
      <DivDetailsItens>
        {selectedProvider?.map((provider, index) => {
          return (
            <DivItemAdd key={index}>
              <DivOrgCardProvider>
                <DivItemDetails>
                  <DivIdItem>
                    <Id>{index}</Id>
                  </DivIdItem>
                  <DivInfoItem>
                    <NameItem>{parseName(provider.nameProvider)}</NameItem>

                    <FormatCPFText
                      displayType="text"
                      value={provider.cnpj}
                      format="##.###.###/####-##"
                      allowEmptyFormatting
                      mask="_"
                    />
                    <FormatCPFText
                      displayType="text"
                      value={provider.numberPhone}
                      format="(##) #####-####"
                      allowEmptyFormatting
                      mask="_"
                    />
                  </DivInfoItem>
                </DivItemDetails>
                {/* <DivOrgDetails>
                  <DivInfoItem>
                    <NameItem>CEP</NameItem>
                    <FormatCPFText
                      displayType="text"
                      placeholder="CEP"
                      value={provider?.cep}
                      format="#####-###"
                    />
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Rua</NameItem>
                    <CodeItem>
                      {provider?.street} Nº {provider?.localNumber}
                    </CodeItem>
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Bairro</NameItem>
                    <CodeItem>{provider?.district}</CodeItem>
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Cidade/Estado</NameItem>
                    <CodeItem>
                      {provider?.district}/{provider?.state}
                    </CodeItem>
                  </DivInfoItem>
                </DivOrgDetails>*/}
              </DivOrgCardProvider>
            </DivItemAdd>
          );
        })}
      </DivDetailsItens>
      <DivOrgInfo>
        <DivOrgBtn>
          <BtnAddStock type="button" onClick={() => setPrintPopUp(!printPopUp)}>
            Gerar Tabela em Excel
          </BtnAddStock>
        </DivOrgBtn>
      </DivOrgInfo>
      <ExcelPrintProviders
        printPopUp={printPopUp}
        infoProvider={selectedProvider}
        setPrintPopUp={setPrintPopUp}
      />
    </DivTableItems>
  );
}
