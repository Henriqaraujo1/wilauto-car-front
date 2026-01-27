import { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./PrintOrdersByProvider.style";
import { useGetAllProductQuery } from "../../../store/registers/products/product.api";
import { useGetAllBrandsQuery } from "../../../store/registers/brand/brand.api";
import TablePrintClients from "../../../components/Tables/PrintsTable/TablePrintClient/TablePrintClient";

export default function PrintClients() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: products,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: brands,
    // refetch,
  } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (products?.errorStatus === true) {
      alert(products?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [products]);

  return (
    <DivProductRegister>
      <TitleProduct>Gerar Tabela de Preços</TitleProduct>
      <DivScreenProduct>
        <TablePrintClients productsInfo={products?.product} />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
