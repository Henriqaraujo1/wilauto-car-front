import Cookies from "js-cookie";
import API from "../../../store/client";

export const getComissionByMonth = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("financial/comission/info-month", {
      params: {
        infoMonth: infoMonth,
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
export const getOrderByEmployee = async (infoOrders) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/comission/resume-orders`, {
      params: {
        infoOrder: infoOrders,
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
export const updateComission = async (infoComission) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.put(`financial/comission/up-comission`, infoComission, {
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
