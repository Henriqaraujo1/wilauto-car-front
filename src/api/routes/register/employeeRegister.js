import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllEmployee = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("employee/", {
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

export const getDocEmployee = async (docEmployee) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`employee/${docEmployee}`, {
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
export const getCodEmployee = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`employee/cod-employee`, {
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

export const newEmployee = async (dataEmployee) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("employee/new-employee", dataEmployee, {
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
export const updateEmployee = async (dataEmployee) => {
  try {
    const keyToken = Cookies.get("token");
    const idEmployee = dataEmployee.idEmployee;
    return await API.put(`employee/${idEmployee}`, dataEmployee, {
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
export const deleteEmployee = async (idEmployee) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`employee/${idEmployee}`, {
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
