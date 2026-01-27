import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgItem = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  animation: grow 0.1s linear;
  @keyframes grow {
    0% {
      height: 10px;
    }
    50% {
      height: 30px;
    }
    100% {
      height: 60px;
    }
  }
`;

export const DivInfoItem = styled.div`
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 0 auto;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  flex-direction: column;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 20px;
`;
export const DivBtnClose = styled.div`
  width: 100%;
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
  color: ${Colors.Text.Black};s

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
  margin: 5px auto;
`;

export const InfoItemResult = styled.p`
  font-size: 0.8em;
`;

export const FormItem = styled.form`
  width: 100%;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
`;

export const DivOrgInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LabelItem = styled.label`
  font-size: 0.9rem;
`;
export const InputItem = styled(Numeric)`
  width: 50%;
  height: 25px;
  display: flex;
  margin: 5px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8em;
`;

export const DivOrgSubmit = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    height: 50%;
  }
`;

export const BtnCancel = styled.button`
  width: 100px;
  height: 27px;

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

export const BtnSubmit = styled.button`
  width: 100px;
  height: 27px;
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
  padding: 5px;
  text-align: center;
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