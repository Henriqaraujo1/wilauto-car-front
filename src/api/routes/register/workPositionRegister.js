import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllPosition = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("work-position/", {
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

export const getNamePosition = async (namePosition) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`work-position/info-position`, {
      params: {
        category: namePosition,
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
export const getIdPosition = async (idPosition) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`work-position/${idPosition}`, {
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

export const newPosition = async (dataPosition) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("work-position/new-position", dataPosition, {
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
export const updatePosition = async (dataPosition) => {
  try {
    const keyToken = Cookies.get("token");
    const idPosition = dataPosition.idPosition;
    return await API.put(`work-position/${idPosition}`, dataPosition, {
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
export const deletePosition = async (idPosition) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`work-position/${idPosition}`, {
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
