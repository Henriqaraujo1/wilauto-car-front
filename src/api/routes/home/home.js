import Cookies from "js-cookie";
import API from "../../../store/client";

export const infoHome = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("home/", {
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
export const monthResume = async (infoMonth) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("home/info-month", {
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
