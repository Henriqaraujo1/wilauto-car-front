import API from "../../../store/client";
import Cookies from "js-cookie";

export const getSubCategorysById = async (idCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`subcategory/info-subcategory/${idCategory}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};

export const getInfoSubCategory = async (nameSubCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`subcategory/verify-subcategory`, {
      params: {
        infoSubCategory: nameSubCategory,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};

export const newSubCategory = async (dataSubCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("subcategory/new-subcategory", dataSubCategory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};

export const updateSubCategory = async (dataSubCategory) => {
  try {
    const keyToken = Cookies.get("token");
    const idSubCategory = dataSubCategory.idSubCategory;
    return await API.put(`subcategory/${idSubCategory}`, dataSubCategory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};

export const deleteSubCategory = async (idSubCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`subcategory/delete-subcategory/${idSubCategory}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
