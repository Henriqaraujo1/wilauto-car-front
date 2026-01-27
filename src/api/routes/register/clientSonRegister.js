import API from "../client";
import Cookies from "js-cookie";

export const getClientSonsById = async (idFather) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`son/info-client-son/${idFather}`, {
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

export const getInfoClientSon = async (nameClientSon) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`son/verify-client-son`, {
      params: {
        infoClientSon: nameClientSon,
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

export const newClientSon = async (dataClientSon) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("son/new-client-son", dataClientSon, {
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

export const updateClientSon = async (dataClientSon) => {
  try {
    const keyToken = Cookies.get("token");
    const idClientSon = dataClientSon.idClientSon;
    return await API.put(`son/${idClientSon}`, dataClientSon, {
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

export const deleteClientSon = async (idClientSon) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`son/delete-son/${idClientSon}`, {
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
