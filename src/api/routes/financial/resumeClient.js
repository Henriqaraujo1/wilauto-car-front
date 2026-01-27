import Cookies from "js-cookie";
import API from "../../../store/client";

export const resumeClient = async (idClient) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/resume-client/${idClient}`, {
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
export const resumeClientItensByOrder = async (idOrder) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`financial/resume-client/items-orders/${idOrder}`, {
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
