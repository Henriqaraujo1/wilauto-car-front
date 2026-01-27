import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DivLogin,
  DivTitle,
  TitleLogin,
  InputValue,
  DivPass,
  DivBtn,
  BtnLogin,
  DivOrgLoading,
  FormLogin,
  DivOrgResults,
  InfoResult,
  DivOrgShow,
  ShowPass,
  LabelPass,
} from "./LoginStyle";

import { userLogin } from "../../../store/auth/auth.actions";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [infoLogin, setInfoLogin] = useState({});
  const [username, setUsername] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [infoPassShow, setInfoPassShow] = useState("password")

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    credentials.username = username;
    const userInfoLogin = await dispatch(userLogin(credentials));
    
    setInfoLogin(userInfoLogin.payload);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
      if (infoLogin?.response?.codeStatus === 200) {
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/${infoLogin?.response?.path}`);
        }, 2000);
      }
  }, [infoLogin, infoLogin.response, navigate]);

  useEffect(() => {
    if(passShow) {
      setInfoPassShow("text")
    } else {
      setInfoPassShow("password")
    }
  }, [passShow]);

  return (
    <DivLogin>
      <DivTitle>
        <TitleLogin>Bem vindo a {import.meta.env.VITE_NAME_EMPRESA}</TitleLogin>
      </DivTitle>

      <FormLogin onSubmit={handleSubmit(handleLogin)}>
        <InputValue
          placeholder="Usuario"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase());
          }}
        />
        <InputValue
          placeholder="Senha"
          type={infoPassShow}
          {...register("password", { required: true })}
        />
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
        <DivBtn>
          <BtnLogin type="submit">Login</BtnLogin>
        </DivBtn>
      </FormLogin>
      {isLoading ? (
        <DivOrgLoading>
          <TypeAnimation
            sequence={["Verificando usuario", 100]}
            speed={80}
            cursor={false}
          />
          <ClipLoader speedMultiplier={3} color="#000" />
        </DivOrgLoading>
      ) : (
        (infoLogin?.codeStatus === 401 && (
          <DivOrgResults>
            <InfoResult>{infoLogin?.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (infoLogin?.codeStatus === 404 && (
          <DivOrgResults>
            <InfoResult>{infoLogin?.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (infoLogin?.response?.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>{infoLogin?.response?.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivLogin>
  );
}
