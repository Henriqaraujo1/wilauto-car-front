import Cookies from "js-cookie";
import API from "../../../store/client";

export const getOrderNumber = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("comercial/next-number", {
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

export const NewItemCart = async (product, qty) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post(
      "/cart/items",
      { product, qty },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${keyToken}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => error.json());
  } catch (error) {
    const { dataError } = error.response;
    alert(dataError.message);
  }
};

export const orderCheckout = async (infoOrder) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("/comercial/checkout", infoOrder, {
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
