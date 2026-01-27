import Cookies from "js-cookie";
import API from "../../../store/client";

export const getAllCashier = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/cashier", {
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
export const getDayCashier = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/cashier/cashier-day`, {
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
export const newCashier = async (dataCashier) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("financial/cashier/new-cashier", dataCashier, {
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
export const closedCashier = async (dataCashier) => {
  try {
    const keyToken = Cookies.get("token");
    const idCashier = dataCashier.idCashier;
    return await API.put(
      `financial/cashier/update-cashier/${idCashier}`,
      dataCashier,
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
export const deleteCashier = async (_idCashier) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`financial/cashier/deletecashier/${_idCashier}`, {
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
