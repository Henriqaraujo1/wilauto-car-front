import { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./PrintClients.style";
import {
  useGetAllClientsQuery
} from "../../../store/registers/clients/clients.api";
import TablePrintClients from "../../../components/Tables/PrintsTable/TablePrintClient/TablePrintClient";

export default function PrintClients() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: clients,
    isFetching,
    isLoading,
    // refetch,
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
    <DivProductRegister>
      <TitleProduct>Gerar Tabela de Clientes</TitleProduct>
      <DivScreenProduct>
        <TablePrintClients
          clientsInfo={clients?.client}
        />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
