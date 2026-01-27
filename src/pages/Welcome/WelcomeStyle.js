import styled from "styled-components";
import { Colors } from "../../variable";

export const DivWelcomeBody = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  @media screen and (max-width: 599px){
    height: 730px;
    padding: 10px;
  }
`;

export const DivWelcome = styled.div `
    width: 70%;
    height: 750px;
    /* margin: 0px auto; */
    display: flex;
    flex-direction: row;
    
    @media screen and (max-width: 599px) {
      width: 100%;
      height: 690px;
      margin: 0px 15px;
      flex-direction: column;
      padding: 5px;
    }
`

export const DivLogo = styled.div `
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #000;
  background: ${Colors.BackgroundColors.BkLogin};
  border-radius: 25px 0px 0px 25px;

  @media screen and (max-width: 599px) {
    width: 100%;
    height: 40%;
    border-radius: 25px 25px 0px 0px;
  }
`

export const Image = styled.img `
  width: 100%;
  height: auto;

  @media screen and (max-width: 599px) {
    width: 70%;
    height: auto;
  }
`