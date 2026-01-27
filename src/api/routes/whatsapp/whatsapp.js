import API from "../../../store/client";
import Cookies from "js-cookie";

export const configWhatsapp = async (idClient) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("whatsapp/config-whatsapp/", {
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
export const sendNote = async (infoWpp) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("whatsapp/send-note/", infoWpp, {
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
