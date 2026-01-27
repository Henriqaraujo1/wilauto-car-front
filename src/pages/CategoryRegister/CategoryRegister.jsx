import React, { useEffect, useState } from "react";
import {
  DivCategory,
  TitleCategory,
  DivScreenCategory,
} from "./CategoryRegisterStyle";
import NewCategory from "../../components/Forms/NewCategory/NewCategory";
import SearchCategory from "../../components/Search/SearchCategory/SearchCategory";

import { useGetAllCategoryQuery } from "../../store/registers/category/category.api";

export default function CategoryRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: categorys,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (categorys?.errorStatus === true) {
      alert(categorys?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [categorys]);
  return (
    <DivCategory>
      <TitleCategory>Cadastro de Categoria de Despesa</TitleCategory>
      <DivScreenCategory>
        <NewCategory />
        <SearchCategory
          categorysInfo={categorys?.allCategories}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenCategory>
    </DivCategory>
  );
}
