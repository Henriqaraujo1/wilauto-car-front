import styled from "styled-components";
import {Colors} from '../../../variable'


export const DivLogin = styled.div `
    width: 721px;
    height: 100%;
    padding: 10px;
    background: ${Colors.BackgroundColors.BkComponent};
    border-radius: 0px 25px 25px 0px;
    border: 1px solid #000000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 599px) {
        width: 100%;
        height: 100%;
        border-radius: 0px 0px 25px 25px;
    }
`

export const DivTitle = styled.div`
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleLogin = styled.h1 `
    font-size: 40px;
    color: #fff;

    @media screen and (max-width: 599px) {
        font-size: 30px;
    }
`
export const FormLogin = styled.form `
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 599px) {
        width: 100%;
        height: 80%;
        padding: 10px;
        margin: 0px;
    }
`
export const InputValue = styled.input `
    width: 70%;
    height: 50px;
    margin-bottom: 10px;

    background: ${Colors.BackgroundColors.BkInputs.Gray};
    border-radius: 25px;
    border: none;

    font-size: 19px;
    padding: 20px;

    @media screen and (max-width: 599px) {
        width: 100%;
    }

`

export const DivPass = styled.div `
    width: 90%;
    display: flex;
    justify-content: flex-end;
`

export const DivOrgShow = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    /* border: 1px solid black; */

`
export const ShowPass = styled.input`
    width: 5%;
`

export const LabelPass  = styled.label`
    font-size: 0.9rem;
`


export const AlertMessage = styled.p`
    margin: 5px;
    color: ${Colors.Text.Black}
` 
export const DivBtn = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;

    @media screen and (max-width: 599px) {
       height: 30%;
       display: flex;
       justify-content: center;
       align-items: center;
    }
`

export const BtnLogin = styled.button `
    width: 265px;
    height: 82px;
    border: 1px solid #000;
    border-radius: 25px;
    box-sizing: border-box; 
    background-color: #fff;

    font-size: 40px;
    font-weight: 400;
    font-style: italic;
    background: linear-gradient(to right, #000 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all .2s ease-out;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    cursor: pointer;
    &:hover {
        background-position: left bottom;
        color: #fff;
    }
`

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 15%;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
  padding: 5px;
  font-size: 1rem;
  font-style: italic;
  border: 1px solid ${Colors.Text.Black};
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};

  overflow-y: auto;
  animation: scale-in-tr 0.2s both;
  @keyframes scale-in-tr {
    0% {
      transform: scale(0);
      transform-origin: 100% 0%;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      transform-origin: 100% 0%;
      opacity: 1;
    }
  }
`;