import React from "react";
import {
  DivWhatsappBody,
  DivWhatsapp,
  DivOrgTitle,
  TitleConfigWpp,
} from "./WhatsappConfigStyles";
import ConfigCode from "../../components/Configs/UserWpp/UserWpp";

export default function WhatsappConfig() {
  return (
    <DivWhatsappBody>
      <DivOrgTitle>
        <TitleConfigWpp>Configuração do Whatsapp</TitleConfigWpp>
      </DivOrgTitle>
      <DivWhatsapp>
        <ConfigCode />
      </DivWhatsapp>
    </DivWhatsappBody>
  );
}
