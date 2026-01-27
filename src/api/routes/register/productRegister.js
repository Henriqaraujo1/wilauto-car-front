import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllProducts = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("product/", {
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
export const getIdProduct = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`product/${idProduct}`, {
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

export const getNameProductInfo = async (infoProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`product/info-product/`, {
      params: {
        product: infoProduct,
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
export const getNewCodProduct = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("product/cod-prod", {
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

export const newProduct = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    
    return await API.post("product/new-product", dataProduct, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data
  }
};
export const updateProduct = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    const idProduct = dataProduct.idProduct;
    return await API.put(`product/${idProduct}`, dataProduct, {
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

export const deleteProduct = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`product/delete-product/${idProduct}`, {
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
