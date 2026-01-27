import Cookies from "js-cookie";
import API from "../../../store/client";

export const getFinancialProviders = async (idProvider) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/financial-entry-order/${idProvider}`, {
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

export const getItemsEntryOrder = async (idStockEntry) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(
      `financial/financial-entry-order/items-order/${idStockEntry}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
        responseType: "json",
      }
    ).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
export const getPaymentsByProvider = async (idStockEntry) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(
      `financial/financial-entry-order/payments/${idStockEntry}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
        responseType: "json",
      }
    ).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
