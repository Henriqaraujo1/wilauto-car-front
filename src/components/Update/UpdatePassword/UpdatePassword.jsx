import React, { useEffect, useState } from "react";
import {
  DivOrgPassword,
  DivInfoPassword,
  TitlePassword,
  DivBtnClose,
  BtnClose,
  DivOrgValidation,
  ValidationOptions,
  LabelPassword,
  InputPassword,
  FormPassword,
  InfoUser,
  SubmitPassword,
  DivOrgResults,
  InfoResult,
  BtnCancel,
  DivBtn,
  DivOrgLoading,
  DivPass,
  DivOrgShow,
  ShowPass,
  LabelPass,
} from "./UpdatePasswordStyle";
import { useUpPasswordMutation } from "../../../store/registers/users/users.api";

import * as Yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@styled-icons/material";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

export default function UpdatePassword({
  dataPassUserInfo,
  passwordPopUp,
  setPasswordPopUp,
}) {
  const userDetail = dataPassUserInfo;

  const [
    updtPassword,
  ] = useUpPasswordMutation();

  const [passwordInfo, setPasswordInfo] = useState([]);
  const [loadingUpdatePass, setLoadingUpdatePass] = useState();
  const [passShow, setPassShow] = useState(false);
  const [infoPassShow, setInfoPassShow] = useState("password");
  const [dataPassUser, setDataPassUser] = useState({
    username: userDetail?.username || "",
    idUser: userDetail?.idUser || "",
  });

  const passwordValidation = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Digite uma senha")
      .matches(/^(?=.*[a-z])/, "A senha deve conter uma letra minuscula")
      .matches(/^(?=.*[A-Z])/, "A senha deve conter uma letra maiuscula")
      .matches(/^(?=.*[0-9])/, "A senha deve conter um número")
      .matches(
        /^(?=.*[!@#\\$%\\^&\\*])/,
        "A senha deve conter um caracter especial",
      ),
    password: Yup.string()
      .required("Digite uma senha")
      .matches(/^(?=.*[a-z])/, "A senha deve conter uma letra minuscula")
      .matches(/^(?=.*[A-Z])/, "A senha deve conter uma letra maiuscula")
      .matches(/^(?=.*[0-9])/, "A senha deve conter um número")
      .test(
        "Senhas são diferentes",
        "Nova senha é igual a antiga",
        function (password) {
          return password !== this.parent.oldPassword;
        },
      )
      .matches(
        /^(?=.*[!@#\\$%\\^&\\*])/,
        "A senha deve conter um caracter especial",
      ),
    cpassword: Yup.string()
      .required("Confirme a senha")
      .oneOf([Yup.ref("password")], "As senhas não são iguais"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordValidation),
  });

  const passwordUpdt = async (dataPass) => {
    setLoadingUpdatePass(true);
    dataPass.idUser = dataPassUser.idUser;
    dataPass.username = dataPassUser.username;
    const upPassword = await updtPassword({
      idUser: dataPassUser.idUser,
      dataPass: dataPass,
    });
    setPasswordInfo(upPassword.data || upPassword.error.data);
    setTimeout(() => {
      setLoadingUpdatePass(false);
    }, 1000);
    if (upPassword.data.successStatus === true) {
      setTimeout(() => {
        setPasswordPopUp(false);
        setPasswordInfo([]);
        reset();
      }, 5000);
    }
  };

  useEffect(() => {
    setDataPassUser(userDetail);
  }, [userDetail, dataPassUser]);

  useEffect(() => {
    if (passShow) {
      setInfoPassShow("text");
    } else {
      setInfoPassShow("password");
    }
  }, [passShow]);

  return (
    <DivOrgPassword show={passwordPopUp}>
      <FormPassword onSubmit={handleSubmit(passwordUpdt)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setPasswordPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <TitlePassword>Alterar Senha</TitlePassword>
        <DivInfoPassword>
          <InfoUser>Usuario:</InfoUser>
          <InfoUser>{dataPassUser?.username}</InfoUser>
        </DivInfoPassword>
        <DivInfoPassword>
          <LabelPassword>Senha atual</LabelPassword>
          <InputPassword type={infoPassShow} {...register("oldPassword")} />
        </DivInfoPassword>
        {errors.oldPassword && (
          <DivOrgValidation>
            <ValidationOptions>{errors.oldPassword.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivInfoPassword>
          <LabelPassword>Nova Senha</LabelPassword>
          <InputPassword type={infoPassShow} {...register("password")} />
        </DivInfoPassword>

        {errors.password && (
          <DivOrgValidation>
            <ValidationOptions>{errors.password.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivInfoPassword>
          <LabelPassword>Confirmar senha</LabelPassword>
          <InputPassword type={infoPassShow} {...register("cpassword")} />
        </DivInfoPassword>
        {errors.cpassword && (
          <DivOrgValidation>
            <ValidationOptions>{errors.cpassword.message}</ValidationOptions>
          </DivOrgValidation>
        )}

        <DivPass>
          <DivOrgShow>
            <ShowPass
              type="checkbox"
              name="Mostrar Senha?"
              onClick={() => setPassShow(!passShow)}
            />
            <LabelPass>Mostrar Senha</LabelPass>
          </DivOrgShow>
        </DivPass>
        <DivBtn>
          <BtnCancel type="button" onClick={() => setPasswordPopUp(false)}>
            Cancelar
          </BtnCancel>
          <SubmitPassword type="submit">Alterar</SubmitPassword>
        </DivBtn>
        {loadingUpdatePass ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (passwordInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{passwordInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (passwordInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{passwordInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormPassword>
    </DivOrgPassword>
  );
}
