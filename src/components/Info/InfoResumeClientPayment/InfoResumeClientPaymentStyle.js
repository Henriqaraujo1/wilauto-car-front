import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgResumeClientPayment = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  /* animation: grow 0.1s ease-in; */
  /* @keyframes grow {
    0% {
      height: 10px;
    }
    50% {
      height: 30px;
    }
    100% {
      height: 60px;
    }
  } */
`;

export const DivInfoResumeClientPayment = styled.div`
  width: 90%;
  padding: 10px;
  display: flex;
  margin: 5px auto;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
`;

export const DivOrgPrices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
  }
`;

export const DivOrgInfo = styled.div`
  width: 40%;
  height: 100%;
  border: 1px solid black;
  margin: 1.5px;
  border-radius: 25px;
  padding: 10px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`;
export const DivOrgInfoTable = styled.div`
  width: 60%;
  height: 100%;
  border: 1px solid black;
  margin: 1.5px;
  border-radius: 25px;
  padding: 10px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`;
export const DivBtnClose = styled.div`
  width: 100%;
  height: 20%;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;

export const InfoResumeClientPaymentResult = styled.p`
  font-size: 0.9em;
`;

export const SelectOptionsToPay = styled.select`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.Text.Black};
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.ButtonsColors.Actions};
`;

export const OptionsPay = styled.option`
  border-radius: 25px;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  height: 15%;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleInfoOrder = styled.h4``;

export const DivOrgInstallments = styled.div`
  width: 100%;
  /* height: 50%; */
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
export const TitleDetailPayment = styled.h2`
  font-size: 1.2rem;
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

export const FormatPaymentTable = styled(Numeric)`
  font-size: 0.9rem;
  color: ${Colors.Text.White};
`;
export const FormatPayment = styled(Numeric)`
  font-size: 0.9rem;
`;

export const DivOrgPayment = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputPayment = styled.input`
  width: 60%;
  border: 1px solid black;
  height: 36px;
  background-color: #fff;
  border-radius: 25px;
  padding-left: 10px;
`;
export const InputQtd = styled.input`
  width: 30%;
  height: 36px;
  background-color: #fff;
  border: 1px solid black;
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

export const DivOrgBtn = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnPayment = styled.button`
  width: 120px;
  height: 35px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border: 1px solid black;
  color: black;
  border-radius: 25px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;


export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
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