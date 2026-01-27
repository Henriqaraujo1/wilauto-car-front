import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
export const DivOrgProductOut = styled.div`
  width: 100%;
  /* height: 100px; */
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

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

export const DivInfoProductOut = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 3px auto;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
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

export const DivOrgPrices = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  height: 25%;
  margin: 1.5px;
  border-radius: 25px;
  padding: 0 5px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
`;

export const DivOrgInfoDetails = styled.div`
  width: 80%;
  height: 50px;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  margin: 5px auto;
`

export const DivBtnClose = styled.div`
  width: 100%;
  /* height: 50%; */
  margin: 5px auto;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 5%;
  height: 100%;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    /* box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton}; */
  }
`;

export const InfoProductOutResult = styled.p`
  font-size: 0.8em;
`;
export const InfoProductDetails = styled.p`
  font-size: 0.8em;
`;

export const ResultPriceInfo = styled(Numeric)`
  font-size: 0.8em;
`
