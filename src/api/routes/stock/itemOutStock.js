import API from "../../../store/client";
import Cookies from "js-cookie";

export const productOutMonth = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("stock-out/", {
      params: {
        infoDate: infoDate,
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

export const getIdProductOut = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`stock-out/${idProduct}`, {
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

export const createProductOut = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post(`stock-out/new-stock-out`, dataProduct, {
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
export const updateProductOut = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    const idProduct = dataProduct.idStockOut;
    return await API.put(`stock-out/${idProduct}`, dataProduct, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const deleteProductOut = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`stock-out/delete-product/${idProduct}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.json());
  } catch (err) {
    return err.response.data;
  }
};
