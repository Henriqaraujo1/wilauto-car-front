import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgExpense = styled.div`
  width: 100%;
  border-radius: 25px;
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
export const DivInfoExpense = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
`;

export const DivOrgDates = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
`;
export const NameExpense = styled.p`
  font-size: 0.8rem;
`;


export const DivOrgInfo = styled.div`
  margin: 1.5px;
  border-radius: 25px;
  padding: 7px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
  width: 5%;
  background: none;
  /* border: 1px solid black; */
  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(4px);
    /* box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton}; */
  }
`;
