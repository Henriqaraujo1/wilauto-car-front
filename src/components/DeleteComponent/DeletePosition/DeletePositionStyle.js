import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgDelete = styled.div`
  width: 100%;
  height: 120px;
  margin: auto;
  display: flex;
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

export const DivOrgCardDelete = styled.div`
  width: 80%;
  height: 60px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  margin: 3px auto;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  flex-direction: column;
  animation: grow 0.2s linear;
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
export const DivOrgBtnClose = styled.div`
  width: 50%;
  margin: 5px auto;
  display: flex;
  justify-content: flex-end;
`;
export const BtnClose = styled.button`
  width: 7%;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;
export const DivOrgLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const LabelDelete = styled.p`
  font-size: 0.85em;
`;
export const DivOrgBtn = styled.div`
  width: 70%;
  height: 50%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
`;
export const BtnConfirm = styled.button`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;
export const BtnCancel = styled.button`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
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
