import React, { useEffect, useState } from "react";
import {
  Close,
  DeleteForever,
  Edit,
  PlusOne,
  Visibility,
} from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import {
  BtnEdit,
  BtnRemove,
  BtnSearch,
  BtnView,
  DivBtnEdit,
  DivBtnSearch,
  DivIdCategory,
  DivCategory,
  DivCategoryInfo,
  DivSearchCategory,
  DivTableSearch,
  DivInfo,
  TitleSearchCategory,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgInfo,
  DivOrgCard,
  BtnNewSubCategory,
  DivFilter,
  CodInput,
  DivOrgFilter,
  BtnCancel,
} from "./SearchCategoryStyle";
import UpdateCategory from "../../Update/UpdateCategory/UpdateCategory";
import InfoCategory from "../../Info/InfoCategory/InfoCategory";
import DeleteCategory from "../../DeleteComponent/DeleteCategory/DeleteCategory";
import NewSubCategory from "../../Forms/NewSubCategory/NewSubCategory";

export default function SearchCategory({
  categorysInfo,
  disableFilter,
  isLoading,
  isFetching,
}) {
  // const [categoryInfo, setCategoryInfo] = useState([]);
  const [categoryPopUp, setCategoryPopUp] = useState(false);
  const [delCategoryOption, setDelCategoryOption] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategoryView, setSelectedCategoryView] = useState();
  const [filterCodCategory, setFilterCodCategory] = useState("");
  const [filterNameCategory, setFilterNameCategory] = useState("");
  const [filterInfoCategory, setFilterInfoCategory] = useState([]);

  const [selectNewSub, setSelectNewSub] = useState();
  const [dataNewSub, setDataNewSub] = useState();
  const [newSubPop, setNewSubPop] = useState(false);

  const [categoryView, setCategoryView] = useState(false);
  const [showList, setShowList] = useState(false);

  const [dataCategoryUpdate, setDataCategoryUpdate] = useState([]);

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (!categorysInfo) return setFilterInfoCategory([]);

    let filtered = categorysInfo;

    const filterCod = Number(filterCodCategory);
    if (filterCodCategory && !isNaN(filterCod)) {
      filtered = filtered.filter(
        (category) => category.idCategory === filterCod
      );
    }

    if (filterNameCategory.length > 0) {
      filtered = filtered.filter((category) =>
        category.categoryName.toLowerCase().includes(filterNameCategory)
      );
    }

    setFilterInfoCategory(filtered);
  }, [categorysInfo, filterCodCategory, filterNameCategory]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchCategory>
      <DivFilter>
        <TitleSearchCategory>Consultar Categorias</TitleSearchCategory>
        <DivOrgFilter show={disableFilter}>
          <NameLabel>Nome</NameLabel>
          <NameInput
            value={filterNameCategory}
            onChange={(e) => setFilterNameCategory(e.target.value)}
          />
          <NameLabel>Codigo</NameLabel>
          <CodInput
            value={filterCodCategory}
            onValueChange={(values) => {
              setFilterCodCategory(parseInt(values.value));
            }}
          />
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCodCategory("");
                setFilterNameCategory("");
                setFilterInfoCategory(categorysInfo);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivOrgFilter>
      </DivFilter>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoCategory.map((categoryInfo, index) => {
            return (
              <DivCategory key={index}>
                <DivOrgCard>
                  <DivInfo>
                    <DivIdCategory>{index + 1}</DivIdCategory>
                    <DivCategoryInfo>
                      <SpanName>
                        Categoria: {parseName(categoryInfo.categoryName)}
                      </SpanName>
                      <DivOrgInfo>
                        <SpanCod>Codigo: {categoryInfo.idCategory}</SpanCod>
                        {/* <SpanCod>Valor: {categoryInfo.valueCategory}</SpanCod> */}
                      </DivOrgInfo>
                    </DivCategoryInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setCategoryPopUp(!categoryPopUp);
                        setDataCategoryUpdate(categoryInfo);
                        setSelectedCategory(categoryInfo);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {categoryPopUp &&
                      categoryInfo.idCategory ===
                        selectedCategory.idCategory && (
                        <UpdateCategory
                          dataCategoryUpdate={dataCategoryUpdate}
                          categoryPopUp={categoryPopUp}
                          setCategoryPopUp={setCategoryPopUp}
                        />
                      )}
                    <BtnView
                      onClick={() => {
                        setCategoryView(!categoryView);
                        setSelectedCategoryView(categoryInfo);
                        setDelCategoryOption(false);
                      }}
                    >
                      <Visibility />
                    </BtnView>
                    <BtnNewSubCategory
                      onClick={() => {
                        setNewSubPop(!newSubPop);
                        setSelectNewSub(categoryInfo);
                        setDataNewSub(categoryInfo);
                      }}
                    >
                      <PlusOne />
                    </BtnNewSubCategory>
                    {newSubPop &&
                      categoryInfo.idCategory === selectNewSub.idCategory && (
                        <NewSubCategory
                          dataNewSub={dataNewSub}
                          newSubPop={newSubPop}
                          setNewSubPop={setNewSubPop}
                        />
                      )}

                    <BtnRemove
                      onClick={() => {
                        setDelCategoryOption(!delCategoryOption);
                        setSelectedCategory(categoryInfo);
                        setCategoryView(false);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {categoryView &&
                  categoryInfo.idCategory ===
                    selectedCategoryView.idCategory && (
                    <InfoCategory
                      selectedCategoryView={selectedCategoryView}
                      categoryView={categoryView}
                      setCategoryView={setCategoryView}
                    />
                  )}
                {delCategoryOption &&
                  categoryInfo.idCategory === selectedCategory.idCategory && (
                    <DeleteCategory
                      selectedCategory={selectedCategory}
                      delCategoryOption={delCategoryOption}
                      setDelCategoryOption={setDelCategoryOption}
                    />
                  )}
              </DivCategory>
            );
          })
        )}
      </DivTableSearch>
    </DivSearchCategory>
  );
}
