import React, { useEffect, useState } from "react";
import UpdatePassword from "../../Update/UpdatePassword/UpdatePassword";
import { infoEmail, updtUsers } from "../../../store/registers/users/user.actions";
import {
  BtnPass,
  BtnRemoveUser,
  DivBtnUser,
  DivFormUser,
  DivOptionsRegister,
  DivOrgLoading,
  DivOrgOptions,
  DivOrgResults,
  DivOrgUser,
  DivOrgValidation,
  InfoResult,
  InputUser,
  LabelUser,
  SubmitUser,
  ValidationOptions,
} from "./UserOptionsStyle";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import "yup-phone";
import { PatternFormat } from "react-number-format";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UserOptions(props) {
  const userDetails = props.userDetails;

  const dispatch = useDispatch();

  const emailRegex = new RegExp(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Email deve ser um valido, exemplo @dominio.com")
      .required("Digite um e-mail"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [userInfo, setUserInfo] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [emailSearch] = useDebounce(emailUser, 500);
  const [disableBtn, setDisableBtn] = useState(false);
  const [emailError, setEmailError] = useState([]);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [dataUser, setDataUser] = useState({
    idUser: userDetails?.idUser,
    username: userDetails?.username,
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    email: userDetails?.email || "",
    phoneNumber: userDetails?.phoneNumber || "",
  });

  const userUpdt = async () => {
    setLoadingUpdateUser(true);
    if (phoneNumber.length > 0) {
      setDataUser((dataUser.phoneNumber = phoneNumber));
    }
    const upUser = await dispatch(updtUsers(dataUser));

    setUserInfo(upUser.payload);
    setTimeout(() => {
      setLoadingUpdateUser(false);
    }, 1000);
  };

  const getEmailUser = async (emailUser) => {
    const emailExists = await dispatch(infoEmail(emailUser));
    setEmailError(emailExists.payload);
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = firstName.concat("", lastName);
    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    setDataUser(userDetails);
    if (userDetails?.email) {
      setEmailUser(userDetails?.email || "");
    }
  }, [userDetails]);

  useEffect(() => {
    if (emailSearch?.length === 0) {
      setEmailError(emailSearch);
    }

    if (emailSearch) {
      getEmailUser(emailSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSearch]);

  useEffect(() => {
    if (
      emailError.codeStatus === 200 &&
      dataUser?.email !== emailError.user.email
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [dataUser?.email, emailError]);

  useEffect(() => {
    if (userInfo.codeStatus === 200 || loadingUsers) {
      props.setUserStatus(true);
      setLoadingUpdateUser(false);
      setTimeout(() => {
        setUserInfo([]);
      }, 4000);
    }
    setLoadingUsers(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <DivOrgOptions>
      <DivOptionsRegister>
        <DivFormUser onSubmit={handleSubmit(userUpdt)}>
          <DivOrgUser>
            <LabelUser>Nome</LabelUser>
            <InputUser
              value={parseName(dataUser?.firstName)}
              {...register("firstName", {
                onChange: (e) => {
                  setDataUser({
                    ...dataUser,
                    firstName: e.target.value,
                  });
                },
              })}
            />
          </DivOrgUser>
          <DivOrgUser>
            <LabelUser>Sobrenome</LabelUser>
            <InputUser
              value={parseName(dataUser?.lastName)}
              {...register("lastName", {
                onChange: (e) => {
                  setDataUser({
                    ...dataUser,
                    lastName: e.target.value,
                  });
                },
              })}
            />
          </DivOrgUser>
          <DivOrgUser>
            <LabelUser>E-mail</LabelUser>
            <InputUser
              value={emailUser}
              {...register("email", {
                onChange: (e) => {
                  setEmailUser(e.target.value);
                },
              })}
            />
          </DivOrgUser>
          {errors.email && (
            <DivOrgValidation>
              <ValidationOptions>{errors.email.message}</ValidationOptions>
            </DivOrgValidation>
          )}
          <DivOrgUser>
            <LabelUser>Numero</LabelUser>
            <PatternFormat
              value={dataUser?.phoneNumber}
              customInput={InputUser}
              format="(##) #####-####"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values, sourceInfo) => {
                setPhoneNumber(values.value);
              }}
            />
          </DivOrgUser>
          <DivBtnUser>
            <BtnRemoveUser type="reset" value="reset">
              Cancelar
            </BtnRemoveUser>
            <SubmitUser type="submit" disabled={disableBtn}>
              Salvar
            </SubmitUser>
            <BtnPass
              type="button"
              onClick={() => {
                setPasswordPopUp(!passwordPopUp);
              }}
            >
              Alterar Senha
            </BtnPass>
          </DivBtnUser>
          {loadingUpdateUser ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            userInfo.codeStatus === 200 && (
              <DivOrgResults>
                <InfoResult>{userInfo.message}</InfoResult>
              </DivOrgResults>
            )
          )}
        </DivFormUser>
      </DivOptionsRegister>
      <UpdatePassword
        dataPassUser={userDetails}
        setPasswordPopUp={setPasswordPopUp}
        passwordPopUp={passwordPopUp}
        setLoadingUsers={setLoadingUsers}
      />
    </DivOrgOptions>
  );
}
