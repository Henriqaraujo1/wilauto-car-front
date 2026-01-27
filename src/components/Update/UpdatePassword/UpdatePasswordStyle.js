import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivOrgPassword = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 280px;
  right: 170px;
  width: 80%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BKBlur};
  backdrop-filter: blur(10px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
  border-radius: 25px;

  animation: scale-in-tr 0.1s both;
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

  ${Phone_media.Phone_Pop_UP}
  ${Tablet_media.Tablet_Pop_Up}
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
export const FormPassword = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const TitlePassword = styled.h3`
  margin: 10px;
`;

export const InfoUser = styled.p`
  font-size: 20px;
`;
export const DivInfoPassword = styled.div`
  width: 80%;
  height: 36px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;
export const DivBtnClose = styled.div`
  width: 100%;
  margin-right: 15px;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 7%;
  background: ${Colors.ButtonsColors.Canceled};
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;
export const DivOrgValidation = styled.div`
  color: ${Colors.Text.Black};
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const ValidationOptions = styled.p`
  border-radius: 25px;
  font-size: 8.5px;
  background-color: ${Colors.Text.Red};
  color: ${Colors.Text.White};
`;
export const LabelPassword = styled.label`
  font-size: 15px;
`;
export const InputPassword = styled.input`
  width: 204px;
  height: 36px;
  background-color: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;
`;

export const SubmitPassword = styled.button`
  width: 40%;
  height: 47px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgResults = styled.div`
  width: 100%;
  // margin: 5px 0;
  // padding-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
  /* width: 250px; */
  text-align: center;
  padding: 4px;
  font-size: 12px;
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
export const DivBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnCancel = styled.div`
  width: 164px;
  height: 47px;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items:center;

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;
    color: ${Colors.Text.Black};

  &:active {
    background: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    color: ${Colors.Text.Black};
`