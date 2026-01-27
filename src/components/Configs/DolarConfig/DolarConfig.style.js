import { NumericFormat as Numeric } from "react-number-format";
import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivScreenDolar = styled.div`
  width: 80%;
  height: 70%;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 5px;
  }
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  height: 50%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const InfoLabel = styled.label`
  margin: 5px 0;
  font-size: 1.4rem;
`;

export const DivOrgInfoDolar = styled.div`
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
`

export const InfoDolarDay = styled.p`
  font-size: 0.8rem;
`

export const InputDolar = styled(Numeric)`
  width: 60%;
  height: 36px;
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 55%;
  }
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnDolarConfirm = styled.button`
  width: 20%;
  height: 47px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  color: ${Colors.Text.Black};

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
    margin-left: 30px;
  }
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
  margin: 5px 0;
  padding-right: 40px;
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