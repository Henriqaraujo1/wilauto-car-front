import { useEffect, useState } from "react";
import {
  BtnEdit,
  BtnRemove,
  BtnSearch,
  BtnView,
  DivBtnEdit,
  DivBtnFilter,
  DivIdClient,
  DivClient,
  DivInfo,
  DivClientInfo,
  DivSearch,
  DivSearchClient,
  DivTableSearch,
  NameInput,
  NameLabel,
  IdInfo,
  SpanName,
  DivOrgLoading,
  DivCardClient,
  DivBtnSearch,
  FormatCPF,
  BtnCancel,
  FormatCPFText,
  SelectDoc,
  Options,
  DivOrgInput,
  TitleClient,
  DivOrgFilter,
  SelectOption,
  DivOrgBtnTable,
  BtnPrices,
  SelectState,
  SelectCity,
  DivOrgSelectCity,
  DivOrgSelectState,
  BtnCar,
} from "./SearchClientStyle";
import UpdateClient from "../../Update/UpdateClient/UpdateClient";
import InfoClient from "../../Info/InfoClient/InfoClient";
import DeleteClient from "../../DeleteComponent/DeleteClient/DeleteClient";
// import { infoState } from "../../../utils/infoState.mjs";

import { Close, Edit, PersonRemove, Visibility } from "@styled-icons/material";

import { ClipLoader } from "react-spinners";
import {
  useGetEstadosQuery,
  useGetMunicipiosByUfQuery,
} from "../../../store/utils/ibge/ibge.api";
import { Car } from "lucide-react";
import NewCar from "../../Forms/NewCar/NewCar";
import CarRegister from "../../../pages/CarRegister/CarRegister";

export default function SearchClient({
  clientsInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [filterCPFClient, setFilterCPFClient] = useState("");
  const [filterNameClient, setFilterNameClient] = useState("");
  const [filterCityClient, setFilterCityClient] = useState(null);
  const [filterStateClient, setFilterStateClient] = useState(null);
  const [filterInfoClient, setFilterInfoClient] = useState([]);
  
  const [clientPopUp, setClientPopUp] = useState(false);
  const [carPopUp, setCarPopUp] = useState(false);
  const [selectDoc, setSelectDoc] = useState("cpf");

  const [delClientOption, setDelClientOption] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedClientView, setSelectedClientView] = useState();

  const [showList, setShowList] = useState(false);
  const [clientView, setClientView] = useState(false);
  const [dataClientUpdate, setDataClientUpdate] = useState([]);
  const [dataClientCar, setDataClientCar] = useState([]);

  // Busca estados
  const { data: estados = [], isLoading: loadingEstados } =
    useGetEstadosQuery();

  // Busca municípios de acordo com o UF selecionado
  const { data: municipios = [], isLoading: loadingMunicipios } =
    useGetMunicipiosByUfQuery(filterStateClient?.sigla, {
      skip: !filterStateClient,
    });

  const estadosOptions = estados.map((e) => ({
    value: e.sigla,
    label: `${e.sigla}`,
    ...e,
  }));

  const municipiosOptions = municipios.map((m) => ({
    value: m.nome,
    label: m.nome,
    ...m,
  }));

  useEffect(() => {
    if (!clientsInfo) return setFilterInfoClient([]);

    let filtered = clientsInfo;

    if (filterCPFClient.length > 0) {
      filtered = filtered.filter((client) =>
        client.docClient.startsWith(filterCPFClient),
      );
    }

    if (filterNameClient.length > 0) {
      filtered = filtered.filter((client) =>
        client.clientName
          .toLowerCase()
          .includes(filterNameClient.toLowerCase()),
      );
    }

    if (filterCityClient !== null) {
      filtered = filtered.filter((client) =>
        client.city
          .toLowerCase()
          .includes(filterCityClient.nome?.toLowerCase()),
      );
    }

    if (filterStateClient !== null) {
      filtered = filtered.filter((client) =>
        client.state
          .toLowerCase()
          .includes(filterStateClient.sigla?.toLowerCase()),
      );
    }

    setFilterInfoClient(filtered);
  }, [
    clientsInfo,
    filterCPFClient,
    filterNameClient,
    filterCityClient,
    filterStateClient,
  ]);

  // ! - usar para formatar dois nomes Ex. (henrique silva)
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
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchClient>
      <DivSearch>
        <TitleClient>Consulta Cliente</TitleClient>
        <DivBtnFilter show={disableFilter}>
          <DivOrgFilter>
            <DivOrgInput>
              <SelectDoc onChange={(e) => setSelectDoc(e.target.value)}>
                <Options value="cpf">CPF</Options>
                <Options value="cnpj">CNPJ</Options>
              </SelectDoc>
              {selectDoc === "cpf" ? (
                <FormatCPF
                  value={filterCPFClient}
                  format="###.###.###-##"
                  allowEmptyFormatting
                  mask="_"
                  onValueChange={(values) => {
                    setFilterCPFClient(values.value);
                  }}
                />
              ) : (
                <FormatCPF
                  value={filterCPFClient}
                  format="##.###.###/####-##"
                  allowEmptyFormatting
                  mask="_"
                  onValueChange={(values) => {
                    setFilterCPFClient(values.value);
                  }}
                />
              )}
            </DivOrgInput>
            <DivOrgInput>
              <NameLabel>Nome</NameLabel>
              <NameInput
                value={filterNameClient}
                onChange={(e) => setFilterNameClient(e.target.value)}
              />
            </DivOrgInput>
          </DivOrgFilter>
          <DivOrgFilter>
            <DivOrgSelectState>
              {/* <NameLabel>Estado</NameLabel> */}
              <SelectState
                options={estadosOptions}
                value={filterStateClient}
                onChange={(option) => {
                  setFilterStateClient(option);
                  setFilterCityClient(null); // resetar cidade quando mudar estado
                }}
                isLoading={loadingEstados}
                placeholder="Selecione um Estado"
              />
            </DivOrgSelectState>

            <DivOrgSelectCity>
              {/* <NameLabel>Cidade</NameLabel> */}
              <SelectCity
                options={municipiosOptions}
                value={filterCityClient}
                onChange={setFilterCityClient}
                isLoading={loadingMunicipios}
                placeholder={
                  filterStateClient
                    ? "Selecione uma Cidade"
                    : "Escolha primeiro um estado"
                }
                isDisabled={!filterStateClient}
              />
            </DivOrgSelectCity>
            <DivBtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterCPFClient("");
                  setFilterNameClient("");
                  setFilterCityClient(null);
                  setFilterStateClient(null);
                  setFilterInfoClient(clientsInfo || []);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivOrgFilter>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoClient.map((infoClient, index) => {
            return (
              <DivClient key={infoClient.idClient}>
                <DivCardClient>
                  <DivInfo>
                    <DivIdClient>
                      <IdInfo>{index + 1}</IdInfo>
                    </DivIdClient>
                    <DivClientInfo>
                      <SpanName>
                        {parseName(infoClient.clientName, infoClient.lastName)}
                      </SpanName>
                      {infoClient.docClient.length > 11 ? (
                        <FormatCPFText
                          displayType="text"
                          value={infoClient.docClient}
                          format="##.###.###/####-##"
                          allowEmptyFormatting
                          mask="_"
                        />
                      ) : (
                        <FormatCPFText
                          displayType="text"
                          value={infoClient.docClient || "00000000000"}
                          format="###.###.###-##"
                          allowEmptyFormatting
                          mask="_"
                        />
                      )}
                      <FormatCPFText
                        value={infoClient.numberPhone}
                        format="(##) #####-####"
                        allowEmptyFormatting
                        mask="_"
                      />
                    </DivClientInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnCar
                      onClick={() => {
                        setCarPopUp(!clientPopUp);
                        setDataClientCar(infoClient);
                      }}
                    >
                      <Car />
                    </BtnCar>
                    <BtnEdit
                      onClick={() => {
                        setClientPopUp(!clientPopUp);
                        setDataClientUpdate(infoClient);
                      }}
                    >
                      <Edit />
                    </BtnEdit>

                    <BtnView
                      onClick={() => {
                        setClientView(!clientView);
                        setSelectedClientView(infoClient);
                        setDelClientOption(false);
                      }}
                    >
                      <Visibility />
                    </BtnView>
                    <BtnRemove
                      onClick={() => {
                        setDelClientOption(!delClientOption);
                        setSelectedClient(infoClient);
                        setClientView(false);
                      }}
                    >
                      <PersonRemove />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivCardClient>
                {clientView &&
                  infoClient.idClient === selectedClientView.idClient && (
                    <InfoClient
                      selectedClientView={selectedClientView}
                      clientView={clientView}
                      setClientView={setClientView}
                    />
                  )}
                {delClientOption &&
                  infoClient.idClient === selectedClient.idClient && (
                    <DeleteClient
                      selectedClient={selectedClient}
                      delClientOption={delClientOption}
                      setDelClientOption={setDelClientOption}
                    />
                  )}
              </DivClient>
            );
          })
        )}
        {clientPopUp && (
          <UpdateClient
            dataClientUpdate={dataClientUpdate}
            clientPopUp={clientPopUp}
            setClientPopUp={setClientPopUp}
          />
        )}

        {carPopUp && (
          <CarRegister carPopUp={carPopUp} dataClientCar={dataClientCar} setCarPopUp={setCarPopUp} />
        )}
      </DivTableSearch>
      <DivOrgBtnTable>
        <BtnPrices type="button" to="print-clients">
          Tabela de Clientes
        </BtnPrices>
      </DivOrgBtnTable>
    </DivSearchClient>
  );
}
