import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllUsers = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("users/", {
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
export const getIdUser = async (idUser) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`users/info-user/${idUser}`, {
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
export const getUsername = async (username) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`users/username/`, {
      params: { infoUser: username },
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
export const getEmailUser = async (emailUser) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`users/email/`, {
      params: { infoUser: emailUser },
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
export const newUser = async (dataUser) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("users/new-user", dataUser, {
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
export const updateUser = async (dataUser) => {
  try {
    const keyToken = Cookies.get("token");
    const idUser = dataUser.idUser;
    return await API.put(`users/update-user/${idUser}`, dataUser, {
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

export const updatePassWord = async (dataUser) => {
  try {
    const keyToken = Cookies.get("token");
    const idUser = dataUser.idUser;
    return await API.put(`users/change-password/${idUser}`, dataUser, {
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

export const deleteUser = async (idUser) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`users/delete-user/${idUser}`, {
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
