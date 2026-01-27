import React, { useEffect, useState } from "react";
import {
  DivOrgCategory,
  DivBtnClose,
  BtnClose,
  NameSubCategory,
  TitleInfoCategory,
  DivInfoTable,
  DivOrgTitle,
  DivOrgLoading,
  DivCardSubCategory,
  DivOrgInfoSubCategory,
  DivOrgId,
  IdSubCategory,
  DivOrgInfoName,
  DivOrgBtn,
  BtnEdit,
  BtnDelete,
  DivOrgCard,
} from "./InfoCategoryStyle";
import { Close, DeleteForever, Edit } from "@styled-icons/material";
import { useDispatch } from "react-redux";
import { getAllSubCategoryById } from "../../../store/registers/subCategory/subCategory.actions";
import { ClipLoader } from "react-spinners";
import UpdateSubCategory from "../../Update/UpdateSubCategory/UpdateSubCategory";
import DeleteSubCategory from "../../DeleteComponent/DeleteSubCategory/DeleteSubCategory";

export default function InfoCategory(props) {
  const categoryInfo = props.selectedCategoryView;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [showList, setShowList] = useState();
  const [infoSubCategory, setInfoSubCategory] = useState([]);
  const [listSubCategory, setListSubCategory] = useState([]);
  const [loadingSubCategory, setLoadingSubCategory] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [dataSubCategory, setDataSubCategory] = useState([]);
  const [subCategoryPop, setSubCategoryPop] = useState(false);
  const [delSubCategory, setDelSubCategory] = useState(false);

  const getSubCategorysByCategory = async (dataCategory) => {
    const idCategory = dataCategory.idCategory;
    
    const getSubCategorys = await dispatch(getAllSubCategoryById(idCategory));
    setInfoSubCategory(getSubCategorys.payload);
  };

  const createListSubCategorys = async (dataSubCategory) => {
    setLoading(true);
    setShowList(true);
    if (showList && dataSubCategory !== undefined) {
      setListSubCategory(dataSubCategory);
    }

    setTimeout(() => setLoading(false), 1000);
  };

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
    getSubCategorysByCategory(categoryInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryInfo]);

  useEffect(() => {
    createListSubCategorys(infoSubCategory.subCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSubCategory]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoadingSubCategory(false);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSubCategory]);


  return (
    <DivOrgCategory show={props.categoryView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setCategoryView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivOrgTitle>
        <TitleInfoCategory>
          Sub-categorias de {parseName(categoryInfo.categoryName)}
        </TitleInfoCategory>
      </DivOrgTitle>
      <DivInfoTable>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
            Carregando Informações
          </DivOrgLoading>
        ) : (
          listSubCategory.map((infoSubCategory, index) => {
            return (
              <DivCardSubCategory key={index}>
                <DivOrgCard>
                  <DivOrgInfoSubCategory>
                    <DivOrgId>
                      <IdSubCategory>{index + 1}</IdSubCategory>
                    </DivOrgId>
                    <DivOrgInfoName>
                      <NameSubCategory>
                        Sub-Categoria:{" "}
                        {parseName(infoSubCategory.subCategoryName)}
                      </NameSubCategory>
                    </DivOrgInfoName>
                  </DivOrgInfoSubCategory>
                  <DivOrgBtn>
                    <BtnEdit
                      onClick={() => {
                        setSubCategoryPop(!subCategoryPop);
                        setDataSubCategory(infoSubCategory);
                        setSelectSubCategory(infoSubCategory);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {subCategoryPop &&
                      infoSubCategory.idSubCategory ===
                        selectSubCategory.idSubCategory && (
                        <UpdateSubCategory
                          setLoadingSubCategory={setLoadingSubCategory}
                          dataSubCategory={dataSubCategory}
                          subCategoryPop={subCategoryPop}
                          setSubCategoryPop={setSubCategoryPop}
                        />
                      )}
                    <BtnDelete
                      onClick={() => {
                        setSelectSubCategory(infoSubCategory);
                        setDelSubCategory(!delSubCategory);
                      }}
                    >
                      <DeleteForever />
                    </BtnDelete>
                  </DivOrgBtn>
                </DivOrgCard>
                {delSubCategory &&
                  infoSubCategory.idSubCategory ===
                    selectSubCategory.idSubCategory && (
                    <DeleteSubCategory
                      delSubCategory={delSubCategory}
                      setDelSubCategory={setDelSubCategory}
                      selectSubCategory={selectSubCategory}
                    />
                  )}
              </DivCardSubCategory>
            );
          })
        )}
      </DivInfoTable>
    </DivOrgCategory>
  );
}
