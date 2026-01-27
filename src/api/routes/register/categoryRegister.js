import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllCategorys = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("category/", {
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

export const getInfoCategory = async (nameCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`category/info-category/`, {
      params: {
        category: nameCategory,
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

export const newCategory = async (dataCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("category/new-category", dataCategory, {
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

export const updateCategory = async (dataCategory) => {
  try {
    const keyToken = Cookies.get("token");
    const idCategory = dataCategory.idCategory;
    return await API.put(`category/${idCategory}`, dataCategory, {
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

export const deleteCategory = async (idCategory) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`category/delete-Category/${idCategory}`, {
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
