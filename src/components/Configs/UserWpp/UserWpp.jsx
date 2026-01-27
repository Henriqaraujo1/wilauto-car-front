import React, { useEffect } from "react";
import {
    BtnQrCode,
  BtnSave,
  DivOrgBtn,
  DivOrgInfo,
  DivOrgMessage,
  DivOrgStatus,
  DivOrgTitle,
  DivWhatsappBody,
  DivWhatsappCode,
  FormWpp,
  Info,
  MessageContate,
  QrdCode,
  TitleWpp,
} from "./UserWppStyle";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import QrCodeTest from "../../../images/qrcode.png"
import { configureWpp } from "../../../store/whatsapp/whatsapp.actions";

export default function ConfigCode() {
  const { register, handleSubmit, reset, formState } = useForm();
  const dispatch = useDispatch();

  const createMessage = async () => {};

  const configWpp = async () => {
    const conectWpp = await dispatch(configureWpp())

    console.log(conectWpp.payload)
  };

  useEffect(() => {
    configWpp();
  }, [])

  return (
    <DivWhatsappBody>
      <DivOrgTitle>
        <TitleWpp>Escaneie o QR-Code, para configurar o Whatsapp</TitleWpp>
      </DivOrgTitle>
      <DivWhatsappCode>
        <QrdCode src={QrCodeTest}/>
        <DivOrgBtn>
            <BtnQrCode>Salvar Whatsapp</BtnQrCode>
        </DivOrgBtn>
        <DivOrgStatus>
          <ClipLoader speedMultiplier={3} />
        </DivOrgStatus>

      </DivWhatsappCode>
      <FormWpp>
        <DivOrgInfo>
          <Info>Configure a mensagem padrão de envio junto com a Nota</Info>
        </DivOrgInfo>

        <DivOrgMessage>
          <MessageContate />
        </DivOrgMessage>
        <DivOrgBtn>
          <BtnSave>Salvar</BtnSave>
        </DivOrgBtn>
      </FormWpp>
    </DivWhatsappBody>
  );
}
