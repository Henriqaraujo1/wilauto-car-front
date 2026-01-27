import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllEntryStock = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("stock-entry/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => error.json());
  } catch (err) {
    return err.response.data;
  }
};

export const getIdProductEntry = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`stock-entry/${idProduct}`, {
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

export const getIdStockEntry = async (idStockEntry) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`stock-entry/${idStockEntry}`, {
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

export const newProductEntry = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("stock-entry/new-entry", dataProduct, {
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

export const updateEntryProduct = async (dataProduct) => {
  try {
    const keyToken = Cookies.get("token");
    const idStockEntry = dataProduct.idStockEntry;
    return await API.put(
      `stock-entry/update-stock-entry/${idStockEntry}`,
      dataProduct,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
      }
    ).then((response) => response.data);
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export const deleteEntryProductStock = async (_idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`stock-entry/${_idProduct}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
    }).then((response) => response.data);
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
