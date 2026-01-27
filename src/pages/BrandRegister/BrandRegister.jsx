import React, { useEffect, useState } from "react";
import { DivBrand, TitleBrand, DivScreenBrand } from "./BrandRegisterStyle";
import NewBrand from "../../components/Forms/NewBrand/NewBrand";
import SearchBrand from "../../components/Search/SearchBrand/SearchBrand";

import { useGetAllBrandsQuery } from "../../store/registers/brand/brand.api";

export default function BrandRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: brands,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (brands?.errorStatus === true) {
      alert(brands?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [brands]);
  return (
    <DivBrand>
      <TitleBrand>Categoria de Produto</TitleBrand>
      <DivScreenBrand>
        <NewBrand />
        <SearchBrand
          brandsInfo={brands?.brand}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenBrand>
    </DivBrand>
  );
}
