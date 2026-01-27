import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllClient = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("client/", {
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

export const getIdClient = async (idClient) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`client/${idClient}`, {
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
export const getInfoCep = async (cep) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`client/cep/${cep}`, {
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

export const newClient = async (dataClient) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("client/new-client", dataClient, {
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
export const updateClient = async (dataClient) => {
  try {
    const keyToken = Cookies.get("token");
    const idClient = dataClient.idClient;
    return await API.put(`client/${idClient}`, dataClient, {
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
export const deleteClient = async (idClient) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`client/${idClient}`, {
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
