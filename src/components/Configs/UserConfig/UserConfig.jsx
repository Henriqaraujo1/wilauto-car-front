import {
  SpanLink,
  SpanConfig,
  InputFont,
  DivBtnConfirm,
  // BtnConfirm,
  SpanOut,
} from "./UserConfigStyle";
import { Check } from "@styled-icons/material";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../store/auth/auth.actions";

export default function UserConfigDropdown() {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.persisted.auth);

  const logout = async () => {
    await dispatch(userLogout());
  };


  return (
    <>
      <SpanLink to="/user-account" state={{ idUser: infoUser.idUser }}>
        <SpanConfig>Configurações</SpanConfig>
      </SpanLink>
      {/* <SpanConfig>
        Fonte do Sistema
        <InputFont
          type="number"
          value={fontSize}
          min={14}
          max={20}
          onChange={(e) => setFontSize(e.target.valueAsNumber)}
        />
        <DivBtnConfirm type="button" onClick={confirmFont}>
        </DivBtnConfirm>
      </SpanConfig> */}
      <SpanLink to="">
        <SpanOut onClick={logout}>Sair</SpanOut>
      </SpanLink>
    </>
  );
}
