import Cookies from "js-cookie";
import API from "../../../store/client";

export const getAllExpense = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/expense/", {
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
export const getExpenseMonth = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/expense/info-month", {
      params: {
        infoDate: infoMonth,
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
export const getIdExpenseByReceiver = async (idReceiver) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/expense/receiver/${idReceiver}`, {
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
export const getIdExpenseByType = async (idExpense) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/expense/type-expense/${idExpense}`, {
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
export const newExpense = async (dataExpense) => {
  try {
    const keyToken = Cookies.get("token");

    return await API.post("financial/expense/new-expense", dataExpense, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
export const updateExpense = async (dataExpense) => {
  try {
    const keyToken = Cookies.get("token");
    const idExpense = dataExpense.idExpense;
    return await API.put(`financial/expense/${idExpense}`, dataExpense, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
export const updateExpenseByProvider = async (dataExpense) => {
  try {
    const keyToken = Cookies.get("token");
    const idExpense = dataExpense.idExpense;
    return await API.put(`financial/expense/provider/${idExpense}`, dataExpense, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    return err.response.data;
  }
};
export const deleteExpense = async (idExpense) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`financial/expense/${idExpense}`, {
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
