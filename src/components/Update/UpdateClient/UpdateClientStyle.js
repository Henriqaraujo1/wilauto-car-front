import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivUpdateClient = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
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
`;

export const FormClient = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  /* height: 1%; */
  border-radius: 25px;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  /* ${Phone_media.Phone_Pop_UP} */
  ${Tablet_media.Tablet_Form}
`;
export const DivOrgClient = styled.div`
  width: 100%;
  height: 36px;
  margin: 5px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelClient = styled.label`
  font-size: 15px;
`;
export const InputClient = styled.input`
  width: 65%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const InputState = styled.input`
  width: 104px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const InputMedium = styled.input`
  width: 204px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const LabelClientStreet = styled.label`
  font-size: 15px;
  width: 50%;
`;
export const InputClientStreet = styled.input`
  width: 70%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px 0 0 25px;
  outline: none;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 70%;
  }
`;
export const InputClientNumber = styled.input`
  width: 87px;
  height: 36px;
  /* z-index: 1; */

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 0 25px 25px 0;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50px;
    font-size: 0.75em;
  }
`;
export const SubmitFormClient = styled.button`
  width: 164px;
  height: 30px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
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
    width: 30px;
  height: 30px;
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

export const SelectOption = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;
export const Options = styled.option``;

export const BtnCancel = styled.button`
  width: 164px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;

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

export const DivBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;
export const InfoResult = styled.p`
  // width: 150px;
  text-align: center;
  padding: 5px;
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
