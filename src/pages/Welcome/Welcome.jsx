import Login from "../../components/Forms/Login/Login";
import { DivWelcomeBody, DivWelcome, DivLogo, Image } from "./WelcomeStyle";
import LogoInicio from "../../images/LogoInicio.png";

export default function Welcome() {
  return (
    <DivWelcomeBody>
      <DivWelcome>
        <DivLogo>
          <Image src={LogoInicio}></Image>
        </DivLogo>
        <Login />
      </DivWelcome>
    </DivWelcomeBody>
  );
}
