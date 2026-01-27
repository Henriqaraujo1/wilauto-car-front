import React, { useEffect, useState } from "react";
import {
  BtnRemoveUser,
  DivBtnSearchUser,
  DivNewUser,
  DivOrgUser,
  FormUser,
  InputUser,
  LabelUser,
  SubmitUser,
  // TitleNewUser,
  DivOrgValidation,
  ValidationOptions,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  SelectOption,
} from "./UpdateUserStyle";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@styled-icons/material";

import { useDispatch } from "react-redux";
import {
  useLazyGetEmailUserQuery,
  useLazyGetUsernameQuery,
  useUpUserMutation,
} from "../../../store/registers/users/users.api";
import { PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdateUser({
  permissions,
  dataUserUpdate,
  userPopUp,
  setUserPopUp,
}) {
  const userDetail = dataUserUpdate;
  const listPermissions = permissions;

  const [
    updtUser,
    { isLoading: clientLoading, isError: clientIsError, error: clientError },
  ] = useUpUserMutation();
  const [infoUsername] = useLazyGetUsernameQuery();
  const [infoEmail] = useLazyGetEmailUserQuery();

  const dispatch = useDispatch();
  const emailRegex = new RegExp(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  );
  const [userInfo, setUserInfo] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [loadingUpdateUser, setLoadingUpdateUser] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectPermission, setSelectPermission] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isClearable, setIsClearable] = useState(true);

  const [username, setUsername] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [usernameSearch] = useDebounce(username, 500);
  const [emailSearch] = useDebounce(emailUser, 500);
  const [usernameError, setUsernameError] = useState([]);
  const [emailError, setEmailError] = useState([]);

  const optionsPermissions = listPermissions.map((permissions) => ({
    value: permissions.idPermission,
    label: permissions.namePermission,
  }));
  const userPermissions = userDetail?.permissions?.map((permissions) => ({
    value: permissions.idPermission,
    label: permissions.namePermission,
  }));

  const [dataUser, setDataUser] = useState({
    username: userDetail.username || "",
    firstName: userDetail.firstName || "",
    lastName: userDetail.lastName || "",
    email: userDetail.email || "",
    phoneNumber: userDetail.phoneNumber || "",
    permissions: userPermissions || "",
  });

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Email deve ser um valido, exemplo @dominio.com")
      .required("Digite um e-mail")
      .email("Digite um e-mail valido"),
    username: Yup.string()
      .required("Digite um usuario")
      .min(4, "Usuario deve ter mais que 4 digitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const sendPermissions = (permissions) => {
    setDataUser({ ...dataUser, permissions: permissions });
  };

  const userUpdt = async () => {
    setLoadingUpdateUser(true);
    dataUser.idUser = userDetail.idUser;
    if (selectPermission.length > 0) {
      dataUser.permissions = selectPermission;
    }
    if (phoneNumber !== undefined) {
      dataUser.phoneNumber = phoneNumber;
    }

    const upUser = await updtUser({
      idUser: userDetail.idUser,
      dataUser: dataUser,
    });
    setUserInfo(upUser.data || upUser.error.data);
    setTimeout(() => {
      setLoadingUpdateUser(false);
    }, 1000);
    setTimeout(() => {
      setUsernameError([]);
      setEmailError([]);
      setUserPopUp(false);
    }, 3000);
  };

  const getUsername = async (username) => {
    const usernameExists = await infoUsername(username);
    setUsernameError(usernameExists.data || usernameExists.error.data);
  };

  const getEmailUser = async (emailUser) => {
    const emailExists = await infoEmail(emailUser);
    setEmailError(emailExists.data || emailExists.error.data);
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
    if (usernameSearch?.length === 0) {
      setUsernameError(usernameSearch);
    }

    if (usernameSearch) {
      getUsername(usernameSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameSearch]);

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
    if (usernameError.codeStatus === 200 || emailError.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [usernameError, emailError]);

  return (
    <DivNewUser show={userPopUp}>
      <FormUser onSubmit={handleSubmit(userUpdt)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setUserPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgUser>
          <LabelUser>Nome Usuario</LabelUser>
          <InputUser
            value={dataUser.username}
            {...register("username", {
              onChange: (e) => {
                setDataUser({
                  ...dataUser,
                  username: e.target.value,
                });
                setUsername(e.target.value);
              },
            })}
          />
        </DivOrgUser>
        {usernameError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe uma conta com esse nome</InfoResult>
          </DivOrgResults>
        )}
        {errors.username && (
          <DivOrgValidation>
            <ValidationOptions>{errors.username.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivOrgUser>
          <LabelUser>Nome</LabelUser>
          <InputUser
            value={parseName(dataUser.firstName)}
            {...register("name", {
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
            value={parseName(dataUser.lastName)}
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
            value={dataUser.email}
            {...register("email", {
              onChange: (e) => {
                setDataUser({
                  ...dataUser,
                  email: e.target.value,
                });
                setEmailUser(e.target.value);
              },
            })}
          />
        </DivOrgUser>
        {emailError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe uma conta com esse email</InfoResult>
          </DivOrgResults>
        )}
        {errors.email && (
          <DivOrgValidation>
            <ValidationOptions>{errors.email.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivOrgUser>
          <LabelUser>Numero</LabelUser>
          <PatternFormat
            value={dataUser.phoneNumber}
            customInput={InputUser}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setPhoneNumber(values.value);
            }}
          />
          {/* <InputUser {...register("phoneNumber")} /> */}
        </DivOrgUser>
        <DivOrgUser>
          <LabelUser>Permissões</LabelUser>
          <SelectOption
            placeholder="Selecione"
            isMulti
            value={dataUser.permissions}
            isClearable={isClearable}
            options={optionsPermissions}
            onChange={sendPermissions}
          />
        </DivOrgUser>
        {errors.numberUser && (
          <DivOrgValidation>
            <ValidationOptions>{errors.numberUser.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivBtnSearchUser>
          <BtnRemoveUser type="button" onClick={() => setUserPopUp(false)}>
            Cancelar
          </BtnRemoveUser>
          <SubmitUser type="submit" disabled={disableBtn}>
            Salvar
          </SubmitUser>
        </DivBtnSearchUser>
        {loadingUpdateUser ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (userInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{userInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (userInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{userInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormUser>
    </DivNewUser>
  );
}
