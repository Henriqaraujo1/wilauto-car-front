import React from "react";
import {
  BtnBack,
  DivBtn,
  DivInfo,
  DivNoPermission,
  DivTitle,
  InfoPage,
  TitleNoPermission,
} from "./NoPermissionStyle";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/Navbar";

export default function NoPermission(props) {
  const infoUser = useSelector((state) => state.auth);

  return (
    <>
      <NavBar />
      <DivNoPermission>
        <DivTitle>
          <TitleNoPermission>Página sem acesso</TitleNoPermission>
        </DivTitle>

        <DivInfo>
          <InfoPage>
            Seu usuario não tem permissão para essa página, favor entrar em
            contato com o seu superior
          </InfoPage>
          <DivBtn>
            <BtnBack to={"/" + infoUser.path}>Voltar a tela anterior</BtnBack>
          </DivBtn>
        </DivInfo>
      </DivNoPermission>
    </>
  );
}
