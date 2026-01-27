import API from "../../../store/client";
import Cookies from "js-cookie";

export const getAllStock = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("stock/", {
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

export const getIdProductStock = async (idProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get(`stock/${idProduct}`, {
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

export const updateStatusProductStock = async (_idProduct, statusProduct) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.put(`stock/updatestatus/${_idProduct}`, statusProduct, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keyToken}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => error.json());
  } catch (error) {
    const { dataError } = error.response;
    alert(dataError.message);
  }
};
