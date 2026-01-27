import React, { useEffect, useState } from "react";
import {
  DivOrgTitle,
  DivOrgUser,
  DivScreenAccount,
  TitleAccount,
} from "./UserAccountStyle";
import UserOptions from "../../components/Configs/UserOptions/UserOptions";
import { useDispatch } from "react-redux";
import { idUser } from "../../store/registers/users/user.actions";
import { useLocation } from "react-router-dom";

export default function UserAccount() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const [userStatus, setUserStatus] = useState(false);
  const location = useLocation();
  let { infoAuth } = 0;
  infoAuth = location.state;

  const infoUser = async (infoUser) => {
    const user = await dispatch(idUser(infoUser));
    setUserInfo(user.payload.username);
  };

  useEffect(() => {
    if (infoAuth !== null) {
      infoUser(infoAuth.idUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoAuth]);

  useEffect(() => {
    if (userStatus) {
      infoUser(infoAuth.idUser);
    }
    setUserStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus]);

  return (
    <DivOrgUser>
      <DivOrgTitle>
        <TitleAccount>Alterar Dados do Usuario</TitleAccount>
      </DivOrgTitle>
      <DivScreenAccount>
        <UserOptions userDetails={userInfo} setUserStatus={setUserStatus} />
      </DivScreenAccount>
    </DivOrgUser>
  );
}
