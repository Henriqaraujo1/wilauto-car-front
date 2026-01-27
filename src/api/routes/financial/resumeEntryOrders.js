import Cookies from "js-cookie";
import API from "../../../store/client";

export const getResumeEntryOrders = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/resume-entry-orders/`, {
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
export const getResumeMonthEntryOrders = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/resume-entry-orders/info-month`, {
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
