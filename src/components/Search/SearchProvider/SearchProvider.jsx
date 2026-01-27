import { useEffect, useState } from "react";
import { Close, Edit, PersonRemove, Visibility } from "@styled-icons/material";
import {
  BtnEdit,
  BtnRemove,
  TitleProvider,
  BtnView,
  DivBtnEdit,
  DivBtnSearch,
  DivIdProvider,
  DivProvider,
  DivProviderInfo,
  DivSearch,
  DivSearchProvider,
  DivTableSearch,
  DivInfo,
  NameInput,
  NameLabel,
  SpanName,
  DivOrgLoading,
  DivOrgCard,
  FormatCnpj,
  DivBtnFilter,
  FormatCnpjText,
  BtnCancel,
  IdInfo,
  DivOrgBtnTable,
  BtnPrices,
} from "./SearchProviderStyle";
import UpdateProvider from "../../Update/UpdateProvider/UpdateProvider";
import InfoProvider from "../../Info/InfoProvider/InfoProvider";
import DeleteProvider from "../../DeleteComponent/DeleteProvider/DeleteProvider";

import { ClipLoader } from "react-spinners";

export default function SearchProvider({
  providersInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [showList, setShowList] = useState(false);
  // const [provider, setProvider] = useState([]);
  const [providerPopUp, setProviderPopUp] = useState(false);
  const [delProviderOption, setDelProviderOption] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();
  const [selectedProviderView, setSelectedProviderView] = useState([]);
  const [filterCnpj, setFilterCnpj] = useState();
  const [filterNameProvider, setFilterNameProvider] = useState("");
  const [filterInfoProvider, setFilterInfoProvider] = useState([]);

  const [providerView, setProviderView] = useState(false);
  const [dataProviderUpdate, setDataProviderUpdate] = useState([]);

  const parseName = (oneName) => {
    if (oneName) {
      const firstName = oneName || "";

      var fullName = firstName.concat("");

      const formatName = fullName.split(" ");
      for (var i = 0; i < formatName.length; i++) {
        formatName[i] =
          formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
      }
      let result = formatName?.join(" ");

      return result;
    }
  };

  useEffect(() => {
    if (!providersInfo) return setFilterInfoProvider([]);

    let filtered = providersInfo;

    if (filterCnpj?.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.cnpj.startsWith(filterCnpj)
      );
    }

    if (filterNameProvider.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.nameProvider.includes(filterNameProvider.toLocaleLowerCase())
      );
    }

    setFilterInfoProvider(filtered);
  }, [providersInfo, filterCnpj, filterNameProvider]);

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
    <DivSearchProvider>
      <DivSearch>
        <TitleProvider>Consulta Fornecedor</TitleProvider>
        <DivBtnFilter show={disableFilter}>
          <NameLabel>CNPJ</NameLabel>
          <FormatCnpj
            value={filterCnpj}
            format="##.###.###/####-##"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values) => {
              setFilterCnpj(values.value);
            }}
          />
          <NameLabel>Nome</NameLabel>
          <NameInput
            value={filterNameProvider}
            onChange={(e) => setFilterNameProvider(e.target.value)}
          />
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCnpj("");
                setFilterNameProvider("");
                setFilterInfoProvider(providersInfo);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoProvider.map((infoProvider, id) => {
            return (
              <DivProvider key={id}>
                <DivOrgCard>
                  <DivInfo>
                    <DivIdProvider>
                      <IdInfo>{infoProvider.idProvider}</IdInfo>
                    </DivIdProvider>
                    <DivProviderInfo>
                      <SpanName>
                        {parseName(infoProvider.nameProvider)}
                      </SpanName>
                      <FormatCnpjText
                        displayType="text"
                        value={infoProvider.cnpj}
                        format="CNPJ: ##.###.###/####-##"
                        allowEmptyFormatting
                        mask="_"
                      />
                    </DivProviderInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setProviderPopUp(!providerPopUp);
                        setDataProviderUpdate(infoProvider);
                      }}
                    >
                      <Edit />
                    </BtnEdit>

                    <BtnView
                      onClick={() => {
                        setProviderView(!providerView);
                        setSelectedProviderView(infoProvider);
                        setDelProviderOption(false);
                      }}
                    >
                      <Visibility />
                    </BtnView>

                    <BtnRemove
                      onClick={() => {
                        setDelProviderOption(!delProviderOption);
                        setSelectedProvider(infoProvider);
                        setProviderView(false);
                      }}
                    >
                      <PersonRemove />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {providerView &&
                  infoProvider.idProvider ===
                    selectedProviderView.idProvider && (
                    <InfoProvider
                      selectedProviderView={selectedProviderView}
                      providerView={providerView}
                      setProviderView={setProviderView}
                    />
                  )}
                {delProviderOption &&
                  infoProvider.idProvider === selectedProvider.idProvider && (
                    <DeleteProvider
                      selectedProvider={selectedProvider}
                      delProviderOption={delProviderOption}
                      setDelProviderOption={setDelProviderOption}
                    />
                  )}
              </DivProvider>
            );
          })
        )}
        {providerPopUp && (
          <UpdateProvider
            dataProviderUpdate={dataProviderUpdate}
            providerPopUp={providerPopUp}
            setProviderPopUp={setProviderPopUp}
          />
        )}
      </DivTableSearch>
      <DivOrgBtnTable>
        <BtnPrices type="button" to="print-providers">
          Tabela de Fornecedores
        </BtnPrices>
      </DivOrgBtnTable>
    </DivSearchProvider>
  );
}
