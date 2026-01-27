import API from "../../../store/client";
import Cookies from "js-cookie";

export const getBrands = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("brand/", {
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

export const getBrand = async (infoBrand) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("brand/info-brand/", {
      params: {
        brand: infoBrand,
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

export const newBrand = async (dataBrand) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.post("brand/new-brand", dataBrand, {
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

export const updateBrand = async (dataBrand) => {
  try {
    const keyToken = Cookies.get("token");
    const idBrand = dataBrand.idBrand;
    return await API.put(`brand/${idBrand}`, dataBrand, {
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

export const deleteBrand = async (idBrand) => {
  try {
    const keyToken = Cookies.get("token");
    return await API.delete(`brand/delete-brand/${idBrand}`, {
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
