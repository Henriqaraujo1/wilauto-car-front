import { useEffect, useState } from "react";
import {
  BtnRemoveUser,
  DivBtnSearchUser,
  DivNewUser,
  DivOrgUser,
  FormUser,
  InputUser,
  LabelUser,
  SubmitUser,
  TitleNewUser,
  DivOrgValidation,
  ValidationOptions,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  SelectOption,
  DivOrgUserSelect,
  DivPass,
  DivOrgShow,
  ShowPass,
  LabelPass,
} from "./NewUserStyle";

import { useForm } from "react-hook-form";
import {
  useCreateUserMutation,
  useLazyGetEmailUserQuery,
  useLazyGetUsernameQuery,
} from "../../../store/registers/users/users.api";
import * as Yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewUser({permissionsInfo}) {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  );
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Digite uma senha")
      .matches(/^(?=.*[a-z])/, "A senha deve conter uma letra minuscula")
      .matches(/^(?=.*[A-Z])/, "A senha deve conter uma letra maiuscula")
      .matches(/^(?=.*[0-9])/, "A senha deve conter um número")
      .matches(
        /^(?=.*[!@#\\$%\\^&\\*])/,
        "A senha deve conter um caracter especial"
      ),
    cpassword: Yup.string()
      .required("Confirme a senha")
      .oneOf([Yup.ref("password")], "As senhas não são iguais"),
    // numberPhone: Yup.string().required("Digite o celular"),
    email: Yup.string()
      .matches(emailRegex, "Email deve ser um valido, exemplo @dominio.com")
      .required("Digite um e-mail"),
    // .email("Digite um e-mail valido"),
    username: Yup.string()
      .required("Digite um usuario")
      .min(4, "Usuario deve ter mais que 4 digitos"),
    permissions: Yup.mixed().required("Selecione uma permissão"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });  

    // * CreateUser RTX
    const [
      createUser,
      { isLoading: userLoading, isError: userIsError, error: userError },
    ] = useCreateUserMutation();

    // * GetEmail
    const [infoEmail] = useLazyGetEmailUserQuery();
    // * GetUsername
    const [infoUsername] = useLazyGetUsernameQuery();
    

  const optionsPermission = permissionsInfo?.map((permissions) => ({
    value: permissions.idPermission,
    label: permissions.namePermission,
  }));

  const [userInfo, setUserInfo] = useState([]);
  const [phoneUser, setPhoneUser] = useState("");
  const [permission, setPermission] = useState([]);
  const [username, setUsername] = useState("");
  const [emailUser, setEmailUser] = useState("");

  const [isClearable, setIsClearable] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [infoPassShow, setInfoPassShow] = useState("password");
  const [disableBtn, setDisableBtn] = useState(false);

  const [usernameSearch] = useDebounce(username, 500);
  const [emailSearch] = useDebounce(emailUser, 500);
  const [usernameError, setUsernameError] = useState([]);

  const [emailError, setEmailError] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingListUsers, setLoadingListUsers] = useState(false);

  const sendPermissions = (permissions) => {
    setPermission(permissions);
    setValue("permissions", permissions);
  };

  const newUser = async (dataUser) => {
    setLoading(true);
    dataUser.phoneNumber = phoneUser;
    dataUser.permissions = permission;

    const userCreate = await createUser(dataUser);
    setUserInfo(userCreate.data || userCreate.error.data);
    setTimeout(setLoading(false), 100);
  };

  const getUsername = async (username) => {
    const usernameExists = await infoUsername(username);
    setUsernameError(usernameExists.data || usernameExists.error.data);
  };

  const getEmailUser = async (emailUser) => {
    const emailExists = await infoEmail(emailUser);
    setEmailError(emailExists.data || emailExists.error.data);
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(() => {
        reset();
        setPhoneUser("");
        sendPermissions([]);
        setIsClearable(true);
        setUsernameError([]);
        setEmailError([]);
        setUserInfo([]);
        setPassShow(false);
      }, 4000);
      setTimeout(setLoadingListUsers(true), 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

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

  useEffect(() => {
    if (passShow) {
      setInfoPassShow("text");
    } else {
      setInfoPassShow("password");
    }
  }, [passShow]);

  return (
    <DivNewUser>
      <TitleNewUser>Cadastro de Usuario</TitleNewUser>
      <FormUser onSubmit={handleSubmit(newUser)}>
        <DivOrgUser>
          <LabelUser>Nome Usuario</LabelUser>
          <InputUser
            {...register("username", {
              onChange: (e) => {
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
          <InputUser {...register("firstName")} />
        </DivOrgUser>
        <DivOrgUser>
          <LabelUser>Sobrenome</LabelUser>
          <InputUser {...register("lastName")} />
        </DivOrgUser>
        <DivOrgUser>
          <LabelUser>E-mail</LabelUser>
          <InputUser
            {...register("email", {
              onChange: (e) => {
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
            customInput={InputUser}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            value={phoneUser}
            onValueChange={(values, sourceInfo) => {
              setPhoneUser(values.value);
            }}
          />
        </DivOrgUser>
        {errors.numberUser && (
          <DivOrgValidation>
            <ValidationOptions>{errors.numberUser.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivOrgUserSelect>
          <LabelUser>Permissões</LabelUser>
          <SelectOption
            name="permissions"
            placeholder="Selecione"
            isMulti
            isClearable={isClearable}
            options={optionsPermission}
            onChange={sendPermissions}
          />

          {/* <InputUser {...register("jobFunction")}/> */}
        </DivOrgUserSelect>
        {errors.permissions && (
          <DivOrgValidation>
            <ValidationOptions>{errors.permissions?.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivOrgUser>
          <LabelUser>Senha</LabelUser>

          <InputUser type={infoPassShow} {...register("password")} />
        </DivOrgUser>
        {errors.password && (
          <DivOrgValidation>
            <ValidationOptions>{errors.password.message}</ValidationOptions>
          </DivOrgValidation>
        )}
        <DivOrgUser>
          <LabelUser>Confirmar senha</LabelUser>
          <InputUser type={infoPassShow} {...register("cpassword")} />
        </DivOrgUser>
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
          {/* <PassLink>
            Esqueceu a senha ?
          </PassLink> */}
        </DivPass>
        {/* <DivOrgUser>
          <LabelUser>Permissão</LabelUser>
          <InputUser />
        </DivOrgUser> */}
        <DivBtnSearchUser>
          <BtnRemoveUser type="reset" value="reset">
            Cancelar
          </BtnRemoveUser>
          <SubmitUser type="submit" disabled={disableBtn}>
            Cadastrar
          </SubmitUser>
        </DivBtnSearchUser>
      </FormUser>
      {loading ? (
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
    </DivNewUser>
  );
}
