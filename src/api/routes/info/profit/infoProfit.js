import Cookies from "js-cookie";
import API from "../../../../store/client";

export const resumeProfit = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/profit", {
      params: {
        infoDate: infoDate,
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
export const resumeProfitMonth = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume-profit", {
      params: {
        infoDate: infoDate,
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
