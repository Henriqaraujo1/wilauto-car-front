import { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./PrintProducts.style";
import {
  useGetAllProductQuery,
} from "../../../store/registers/products/product.api";
import { useGetAllBrandsQuery } from "../../../store/registers/brand/brand.api";
import TablePrintProducts from "../../../components/Tables/PrintsTable/TablePrintProduct/TablePrintProduct";

export default function PrintProducts() {
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
        <TablePrintProducts
          productsInfo={products?.product}
          infoCategorys={brands?.brand}
        />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
