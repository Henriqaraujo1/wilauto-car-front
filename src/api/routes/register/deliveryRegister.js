import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllDeliverys = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("delivery/", {
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

export const getInfoDelivery = async (infoDelivery) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`delivery/info-delivery/`, {
      params: {
        deliveryName: infoDelivery,
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

export const newDelivery = async (dataDelivery) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("delivery/new-delivery", dataDelivery, {
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

export const updateDelivery = async (dataDelivery) => {
  try {
    const keyToken = Cookies.get("token");
    const idDelivery = dataDelivery.idDelivery;
    return await API.put(`delivery/${idDelivery}`, dataDelivery, {
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

export const deleteDelivery = async (idDelivery) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`delivery/delete-Delivery/${idDelivery}`, {
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
