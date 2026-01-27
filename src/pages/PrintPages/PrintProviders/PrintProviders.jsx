import { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./PrintProviders.style";
import {
  useGetAllProvidersQuery,
} from "../../../store/registers/provider/provider.api";
import TablePrintProviders from "../../../components/Tables/PrintsTable/TablePrintProvider/TablePrintProvider";

export default function PrintClients() {
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
    <DivProductRegister>
      <TitleProduct>Gerar Tabela de Fornecedores</TitleProduct>
      <DivScreenProduct>
        <TablePrintProviders
          providersInfo={providers?.provider}
        />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
