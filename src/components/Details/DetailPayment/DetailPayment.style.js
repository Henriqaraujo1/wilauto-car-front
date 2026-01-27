import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivUpdatePayment = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 150px;
  left: 150px;
  right: 170px;
  width: 80%;
  height: 100%;
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

export const FormPayment = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  height: 80%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}

  
  @media screen and (min-width: 320px) and (max-width: 940px) {
    height: 40%;
  }
`;
export const DivOrgPayment = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelPayment = styled.label`
  font-size: 15px;
  width: 40%;
`;
export const LabelQtd = styled.label`
  font-size: 15px;
  width: 40%;
  color: ${Colors.Text.White};
`;

export const FormatPayment = styled(Numeric)`
  color: ${Colors.Text.White};
`;

export const InputPayment = styled.input`
  width: 60%;
  height: 36px;
  background-color: #fff;
  border-radius: 25px;
  padding-left: 10px;
`;
export const InputQtd = styled.input`
  width: 30%;
  height: 36px;
  background-color: #fff;
  border-radius: 25px;
  padding-left: 10px;
`;
export const InputDate = styled.input`
  width: 20%;
  height: 36px;
  background-color: #fff;
  border-radius: 25px;
  padding-left: 10px;
`;

export const DivBtnPayment = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const BtnRemovePayment = styled.button`
  width: 40%;
  height: 47px;

  background: rgba(255, 0, 0, 0.6);
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(255, 0, 0, 0.6);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
export const SubmitPayment = styled.button`
  width: 40%;
  height: 47px;
  color: ${Colors.Text.Black};
  background: rgba(182, 255, 170, 0.88);
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: rgba(182, 255, 170, 0.88);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
export const DivBtnClose = styled.div`
  width: 100%;
  height: 100%;
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

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
`;
export const TitleDetailPayment = styled.h2`
  font-size: 1.2rem;
`;

export const DivOrgResults = styled.div`
  width: 80%;
  height: 20%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const DivOrgInstallments = styled.div`
  width: 100%;
  height: 50%;
  padding: 10px;
`;

export const DivOrgQtdInputs = styled.div`
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 25px;
  margin: 10px auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivQtdInputs = styled.div`
  width: 100%;
  height: 100%;
  /* margin: 10px; */
  padding: 15px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  /* justify-content:center; */
  align-content: flex-start;
  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    /* display: none; */
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;
