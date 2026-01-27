import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllProviders = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("provider/", {
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
export const getIdProvider = async (idProvider) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`/provider/${idProvider}`, {
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
export const newProvider = async (dataProvider) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("/provider/new-provider", dataProvider, {
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
export const updateProvider = async (dataProvider) => {
  try {
    const keyToken = Cookies.get("token");
    const idProvider = dataProvider.idProvider;
    return await API.put(`provider/${idProvider}`, dataProvider, {
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
export const deleteProvider = async (idProvider) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`provider/delete-provider/${idProvider}`, {
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
