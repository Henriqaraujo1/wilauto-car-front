import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgClient = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;

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

export const DivInfoClient = styled.div`
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
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
  width: 10%;
  padding-top: 5px;
  display: flex;
  justify-content: center; 
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
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;

export const InfoClientResult = styled.p`
  font-size: 0.8em;
`;
