import Cookies from "js-cookie";
import API from "../../../store/client";

export const getBudgetNumber = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("comercial/next-budget", {
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

export const NewItemBudget = async (product, qty) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post(
      "/cart/items",
      { product, qty },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => error.json());
  } catch (error) {
    const { dataError } = error.response;
    alert(dataError.message);
  }
};

export const createBudget = async (infoBudget) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("/comercial/new-budget", infoBudget, {
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
export const allBudgets = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/comercial/all-budgets", {
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
export const getItemsByIdBudget = async (idBudget) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`/comercial/info-budgets/${idBudget}`, {
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

export const updateBudget = async (dataBudget) => {
  try {
    const keyToken = Cookies.get("token");
    const idBudget = dataBudget.idBudget;
    return await API.put(`/comercial/up-budget/${idBudget}`, dataBudget, {
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
export const updateBudgetByClient = async (dataBudget) => {
  try {
    const keyToken = Cookies.get("token");
    const idBudget = dataBudget.idBudget;
    return await API.put(
      `/comercial/up-budget/new-client/${idBudget}`,
      dataBudget,
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
export const updateBudgetItens = async (dataBudget) => {
  try {
    const keyToken = Cookies.get("token");
    const idBudget = dataBudget.idBudget;
    return await API.put(`/comercial/up-itens/${idBudget}`, dataBudget, {
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
