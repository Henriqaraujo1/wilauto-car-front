import React, { useEffect, useState } from "react";
import {
  DivResumeProvider,
  TitleResumeProvider,
  DivScreenResumeProvider,
} from "./ResumeProviderStyle";
import DetailsProvider from "../../components/Details/DetailsProvider/DetailsProvider";
import TableInfoProvider from "../../components/Tables/TableInfoProvider/TableInfoProvider";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProviderFinancial } from "../../store/financial/resumeProviders/resumeProviders.action";

export default function ResumeProvider() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [detailsProvider, setDetailsProvider] = useState([]);
  const [infoProviderData, setInfoProviderData] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  let { infoProvidersEntry } = 0;
  infoProvidersEntry = location.state;
  const providersInfo = infoProvidersEntry;

  const getProviderInfo = async (idProvider) => {
    const getFinancialProvider = await dispatch(
      getProviderFinancial(idProvider)
    );
    setDetailsProvider(getFinancialProvider.payload);
    setInfoProviderData(getFinancialProvider.payload.orders.infoProvider);
  };

  const parseName = (oneName) => {
    if (oneName) {
      const firstName = oneName || "";

      var fullName = firstName.concat(" ");

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
    getProviderInfo(providersInfo.idProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersInfo.idProvider]);

  useEffect(() => {
    if (loadingPayments) {
      getProviderInfo(providersInfo.idProvider);
      setTimeout(() => {
        setLoadingPayments(false);
      }, 1500);
    }
  }, [loadingPayments, providersInfo.idProvider]);

  return (
    <DivResumeProvider>
      <TitleResumeProvider>
        Resumo de Compras Com o Fornecedor{" "}
        {parseName(infoProviderData.nameProvider)}
      </TitleResumeProvider>
      <DivScreenResumeProvider>
        <DetailsProvider detailsProvider={detailsProvider?.orders} />
        <TableInfoProvider
          detailsProvider={detailsProvider?.orders}
          setLoadingPayments={setLoadingPayments}
        />
      </DivScreenResumeProvider>
    </DivResumeProvider>
  );
}
