import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgCar = styled.div`
  width: 100%;
  /* height: 100px; */
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  animation: grow 0.1s ease-in;
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

export const DivInfoCar = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
`;

export const DivOrgPrices = styled.div`
  width: 49%;
  display: flex;
  flex-direction:column;
`

export const DivOrgInfo = styled.div`
  width: 100%;
  /* height: 25%; */
  margin: 5px 0;
  border-radius: 25px;
  padding: 5px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items:center;
`;
export const DivBtnClose = styled.div`
  width: 10%;
  padding-top: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 50%;
  height: 25%;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    /* transform: translateY(2px); */
    /* box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton}; */
    color: ${Colors.Text.Black};
  }
`;

export const InfoCarResult = styled.p`
  font-size: 0.8em;
`;
