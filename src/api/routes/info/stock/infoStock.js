import Cookies from "js-cookie";
import API from "../../../../store/client";

export const resumeStock = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/info-stock", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
      responseType: "json",
    }).then((response) => response.data);
  } catch (err) {
    console.log(err.response.data)
    return err.response.data;
  }
};
export const resumeStockMoviments = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/info-stock-moviments", {
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
export const resumeStockOut = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/stock-out", {
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
