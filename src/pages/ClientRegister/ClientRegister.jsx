import { useState, useEffect } from "react";
import {
  DivClientRegister,
  TitleClientReg,
  DivScreenClient,
} from "./ClientRegisterStyle";
import NewClient from "../../components/Forms/NewClient/NewClient";
import SearchClient from "../../components/Search/SearchClient/SearchClient";
import { useGetAllClientsQuery } from "../../store/registers/clients/clients.api";

export default function ClienteRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: clients,
    isFetching,
    isLoading,
  } = useGetAllClientsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (clients?.errorStatus === true) {
      alert(clients?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [clients]);

  return (
    <DivClientRegister>
      <TitleClientReg>Cadastro de Cliente</TitleClientReg>
      <DivScreenClient>
        <NewClient />
        <SearchClient
          clientsInfo={clients?.client}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenClient>
    </DivClientRegister>
  );
}
