import API from "../../../store/client";
import Cookies from "js-cookie";

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    }).then((response) => response.data);

    if (res.codeStatus === 200) {
      Cookies.set("token", res.infoUser.token, {
        expires: 1,
        sameSite: "Strict",
      });
    }
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const isLoggedIn = async () => {
  try {
    const keyToken = Cookies.get("token");
    return await API.get("auth/check-user-status", {
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

export const LogoutUser = async () => {
  try {
    const keyTokenLogout = Cookies.get("token");
    const res = await API.post(
      "/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyTokenLogout}`,
        },
        responseType: "json",
      }
    ).then((response) => response.data);

    Cookies.remove("token");

    return res;
  } catch (err) {
    throw err.response.data;
  }
};
