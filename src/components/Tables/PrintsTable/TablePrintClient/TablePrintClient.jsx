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
  DivOrgCardClient,
  DivOrgInfo,
  DivOrgFilter,
  FormatCPFText,
  DivSearch,
  TitleClient,
  DivBtnFilter,
  DivOrgInput,
  Options,
  NameLabel,
  NameInput,
  DivBtnSearch,
  BtnCancel,
  SelectState,
} from "./TablePrintClient.style";

import { infoState } from "../../../../utils/infoState.mjs";
import { Close } from "@styled-icons/material";
import ExcelPrintClients from "./FilePrint/ExcelPrintClients";

export default function TablePrintClients({ clientsInfo, infoCategorys }) {
  const [selectedClient, setSelectedClient] = useState([]);

  const [isClearable] = useState(true);

  const [filterCityClient, setFilterCityClient] = useState("");
  const [filterStateClient, setFilterStateClient] = useState("");

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
    if (!clientsInfo) return;

    let filtered = [...clientsInfo];

    if (filterCityClient.length > 0) {
      filtered = filtered.filter((client) =>
        client.city.toLowerCase().includes(filterCityClient.toLowerCase())
      );
    }

    if (filterStateClient.length > 0) {
      filtered = filtered.filter((client) =>
        client.state.toLowerCase().includes(filterStateClient.toLowerCase())
      );
    }

    setSelectedClient(filtered);
  }, [clientsInfo, filterCityClient, filterStateClient]);

  return (
    <DivTableItems>
      <DivSearch>
        <TitleClient>Consulta Cliente</TitleClient>
        <DivBtnFilter>
          <DivOrgFilter>
            <DivOrgInput>
              <NameLabel>Cidade</NameLabel>
              <NameInput
                value={filterCityClient}
                onChange={(e) => setFilterCityClient(e.target.value)}
              />
            </DivOrgInput>

            <DivOrgInput>
              <NameLabel>Estado</NameLabel>
              <SelectState
                value={filterStateClient}
                onChange={(e) => setFilterStateClient(e.target.value)}
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
                  setFilterCityClient("");
                  setFilterStateClient("");
                  setSelectedClient(clientsInfo || []);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivOrgFilter>
        </DivBtnFilter>
      </DivSearch>
      <DivDetailsItens>
        {selectedClient?.map((client, index) => {
          return (
            <DivItemAdd key={index}>
              <DivOrgCardClient>
                <DivItemDetails>
                  <DivIdItem>
                    <Id>{index}</Id>
                  </DivIdItem>
                  <DivInfoItem>
                    <NameItem>
                      {parseName(client.clientName , client.lastName)}
                    </NameItem>
                    {client.docClient.length > 11 ? (
                      <FormatCPFText
                        displayType="text"
                        value={client.docClient}
                        format="CNPJ: ##.###.###/####-##"
                        allowEmptyFormatting
                        mask="_"
                      />
                    ) : (
                      <FormatCPFText
                        displayType="text"
                        value={client.docClient || "00000000000"}
                        format="CPF: ###.###.###-##"
                        allowEmptyFormatting
                        mask="_"
                      />
                    )}
                    <FormatCPFText
                      displayType="text"
                      value={client.numberPhone}
                      format="(##) #####-####"
                      allowEmptyFormatting
                      mask="_"
                    />
                  </DivInfoItem>
                </DivItemDetails>
                <DivOrgDetails>
                  <DivInfoItem>
                    <NameItem>CEP</NameItem>
                    <FormatCPFText
                      displayType="text"
                      placeholder="CEP"
                      value={client?.cep}
                      format="#####-###"
                    />
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Rua</NameItem>
                    <CodeItem>
                      {client?.street} Nº {client?.localNumber}
                    </CodeItem>
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Bairro</NameItem>
                    <CodeItem>{client?.district}</CodeItem>
                  </DivInfoItem>
                  <DivInfoItem>
                    <NameItem>Cidade/Estado</NameItem>
                    <CodeItem>
                      {client?.district}/{client?.state}
                    </CodeItem>
                  </DivInfoItem>
                </DivOrgDetails>
              </DivOrgCardClient>
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
      <ExcelPrintClients
        printPopUp={printPopUp}
        infoClient={selectedClient}
        setPrintPopUp={setPrintPopUp}
      />
    </DivTableItems>
  );
}
