import React, { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./ProductRegisterStyle";
import NewProduct from "../../components/Forms/NewProduct/NewProduct";
import SearchProduct from "../../components/Search/SearchProduct/SearchProduct";
import { useGetAllProductQuery } from "../../store/registers/products/product.api";
import { useGetAllBrandsQuery } from "../../store/registers/brand/brand.api";

export default function ProductRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: products,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // * GetBrandName
  const { data: brands } = useGetAllBrandsQuery();

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
      <TitleProduct>Cadastro de Produto</TitleProduct>
      <DivScreenProduct>
        <NewProduct brandsData={brands?.brand} />
        <SearchProduct
          productsInfo={products?.product}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
