import Cookies from "js-cookie";
import API from "../../../../store/client";

export const resumeExpensePayed = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/expense", {
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
export const resumeExpenseNoPayed = async (infoDate) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("/resume/expense-nopayed", {
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
