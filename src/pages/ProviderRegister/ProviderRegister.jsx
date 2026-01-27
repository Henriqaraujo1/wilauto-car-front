import React, { useEffect, useState } from "react";
import {
  DivProvider,
  DivScreenProvider,
  TitleProviderReg,
} from "./ProviderRegisterStyle";
import NewProvider from "../../components/Forms/NewProvider/NewProvider";
import SearchProvider from "../../components/Search/SearchProvider/SearchProvider";

import { useGetAllProvidersQuery } from "../../store/registers/provider/provider.api";

export default function ProviderRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: providers,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllProvidersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (providers?.errorStatus === true) {
      alert(providers?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [providers]);

  return (
    <DivProvider>
      <TitleProviderReg>Cadastro Fornecedor</TitleProviderReg>
      <DivScreenProvider>
        <NewProvider />
        <SearchProvider
          providersInfo={providers?.provider}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenProvider>
    </DivProvider>
  );
}
