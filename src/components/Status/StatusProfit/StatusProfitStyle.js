import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import { Link } from "react-router-dom";

export const DivFin = styled.div`
  width: 500px;
  height: 320px;

  border: 1px solid red;

  background: ${Colors.BackgroundColors.BkDiv};
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const Profit = styled.div`
  width: 450px;
  height: 110px;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  
  background: ${({ changeColor }) => (changeColor ? Colors.BackgroundColors.BkCards.BkExpense : Colors.BackgroundColors.BkCards.BkMoney)};
  border-radius: 25px;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const TitleStatusFin = styled.h1`
  font-size: 1.1rem;
`;

export const ResumeInfo = styled.p`
    font-size: ${({ theme }) => theme.fontSize};
`;

export const DivOrgResume = styled.div`
  width: 100%;
  padding: 5px;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
`;

export const ValueToday = styled(Numeric)`
  font-size: 1.5rem;
`;

export const ProfitReceiveTitle = styled.p`
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 18px;
  text-decoration: underline;
  margin: 5px;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgBtn = styled.div`
  width: 100%;
`;

export const BtnDetails = styled(Link)`
  text-decoration: none;
  color: ${Colors.Text.Black};
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  font-size: 1rem;

  background-color: ${Colors.ButtonsColors.Actions};
  border: 1px solid ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(3px);
  }
`;


