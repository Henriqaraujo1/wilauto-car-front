import Cookies from "js-cookie";
import API from "../../../../store/client";

export const resumeInvoice = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/invoice", {
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
export const resumeCashier = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    console.log(infoDate);
    return await API.get("/resume/cashier", {
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
