import React, { useEffect, useState } from "react";
import {
  DivInfoProvider,
  DivInfoProviderTable,
  DivDetailProvider,
  DivInfoProviderCard,
  DivInfoDetailsProvider,
  DivBtn,
  DivId,
  IdSpan,
  NameProvider,
  Value,
  LinkPage,
  DivOrgInfo,
  DivOrgValues,
  PriceBuyed,
  DivOrgLoading,
  DivFilter,
  DivOrgFilter,
  LabelFilter,
  InputFilter,
  BtnFilter,
  DivOrgBtn,
  BtnCancel,
  FormatCnpj,
  FormatCnpjText,
  DivOrgInfoProvider,
} from "./ProviderResumeStyle";

import { ClipLoader } from "react-spinners";
import { Close, Search } from "@styled-icons/material";
import { DivOrgBuyProviders } from "../../../pages/FinancialEntryOrders/FinancialEntryOrdersStyle";

export default function ProviderResume(props) {
  const infoProviderFinancial = props.infoEntryOrders;

  const [loadingProviders, setLoadingProviders] = useState(false);

  const [showList, setShowList] = useState("");
  const [filterCnpj, setFilterCnpj] = useState("");
  const [filterNameProvider, setFilterNameProvider] = useState("");
  const [filterInfoProvider, setFilterInfoProvider] = useState([]);

  const createListProviders = (dataProviders) => {
    setLoadingProviders(true);
    setShowList(true);
    if (showList) {
      setFilterInfoProvider(dataProviders);
    }
    setTimeout(() => {
      setLoadingProviders(false);
    }, 1500);
  };

  const parseName = (oneName) => {
    const fullName = oneName;

    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    if (!infoProviderFinancial) return setFilterInfoProvider([]);

    let filtered = infoProviderFinancial;

    if (filterNameProvider.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.nameProvider
          .toLowerCase()
          .includes(filterNameProvider.toLowerCase())
      );
    }

    if (filterCnpj.length > 0) {
      filtered = filtered.filter((provider) =>
        provider.cnpj.startsWith(filterCnpj)
      );
    }

    setFilterInfoProvider(filtered);
  }, [infoProviderFinancial, filterCnpj, filterNameProvider]);

  useEffect(() => {
    createListProviders(infoProviderFinancial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoProviderFinancial]);

  return (
    <DivOrgBuyProviders>
      <DivFilter show={props.disableFilter}>
        <DivOrgFilter>
          <LabelFilter>Nome</LabelFilter>
          <InputFilter
            value={filterNameProvider}
            onChange={(e) => setFilterNameProvider(e.target.value)}
          />
          <LabelFilter>CNPJ</LabelFilter>
          <FormatCnpj
            value={filterCnpj}
            format="##.###.###/####-##"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setFilterCnpj(values.value);
            }}
          />
        </DivOrgFilter>
      </DivFilter>
      <DivInfoProvider>
        <DivInfoProviderTable>
          {loadingProviders ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterInfoProvider.map((providerOrders, index) => {
              return (
                <DivInfoProviderCard key={index}>
                  <DivDetailProvider>
                    <DivId>
                      <IdSpan>{index + 1}</IdSpan>
                    </DivId>
                    <DivInfoDetailsProvider>
                      <DivOrgInfoProvider>
                        <NameProvider>
                          {parseName(providerOrders.nameProvider)}
                        </NameProvider>
                        <FormatCnpjText
                          displayType="text"
                          value={providerOrders.cnpj}
                          format="CNPJ: ##.###.###/####-##"
                          allowEmptyFormatting
                        />
                      </DivOrgInfoProvider>
                      <DivOrgInfo>
                        <DivOrgValues>
                          <Value>Valor Pago</Value>
                          <PriceBuyed
                            displayType="text"
                            value={providerOrders.expensePayed}
                            decimalSeparator=","
                            thousandSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>Valor a pagar</Value>
                          <PriceBuyed
                            displayType="text"
                            value={providerOrders.expenseNotPayed}
                            decimalSeparator=","
                            thousandSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>Total Comprado</Value>
                          <PriceBuyed
                            displayType="text"
                            value={providerOrders.totalOrder}
                          />
                        </DivOrgValues>
                      </DivOrgInfo>
                    </DivInfoDetailsProvider>
                  </DivDetailProvider>
                  <DivBtn>
                    <LinkPage
                      to="resume-provider"
                      state={{ idProvider: providerOrders.idProvider }}
                    >
                      Pedidos
                    </LinkPage>
                  </DivBtn>
                </DivInfoProviderCard>
              );
            })
          )}
        </DivInfoProviderTable>
      </DivInfoProvider>
    </DivOrgBuyProviders>
  );
}
