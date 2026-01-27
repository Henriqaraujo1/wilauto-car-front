import Cookies from "js-cookie";
import API from "../../../store/client";

export const getAllFinancial = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/", {
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
export const getMonthFinancial = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/info-month/", {
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
export const getMonthOrders = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/resume-sell/", {
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
