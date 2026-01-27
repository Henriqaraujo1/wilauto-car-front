import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgResume = styled.div`
  width: 100%;
  height: 100%;
`;

export const DivOrgCashierDay = styled.div`
  width: 100%;
  height: 90%;
  padding: 5px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  border: 1px solid black;
`;

export const TitleCashierDay = styled.h2`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

export const TitleInfo = styled.h4`
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;
export const InfoDay = styled.div`
  height: 93%;
  padding: 10px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${Colors.Text.White};
`;

export const DivOrgAllValues = styled.div`
  width: 100%;
  height: 85%;
`;
export const DivOrgValueFinal = styled.div`
  width: 100%;
  height: 15%;
`;

export const DivOrgValues = styled.div`
  width: 100%;
  height: 5%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid black;
`;
export const DivOrgInfo = styled.div`
  width: 100%;
  height: 5%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
export const DivOrgFinal = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;
export const InfoValue = styled.span`
  font-size: 0.75rem;
`;
export const InfoValueFinal = styled.span`
  font-size: 1rem;
`;

export const Value = styled(Numeric)`
  font-size: 0.85rem;
`;
export const ValueFinal = styled(Numeric)`
  font-size: 1rem;
`;
export const ValueInfo = styled.span`
  font-size: 0.85rem;
`;

export const DivOrgFormPayment = styled.div``;
export const InfoPayment = styled.span`
  font-size: 0.85rem;
`;
export const ListOption = styled.ul`
  margin: 2px;
  list-style-type: none;
  padding-left: 15px;
`;
export const Option = styled.li`
  font-size: 0.85rem;
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BtnExplain = styled.button`
  width: 150px;
  height: 26px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};


  &:active {
    background: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const ControlCashier = styled.div`
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const DivOrgBtnCashier = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BtnOpenCashier = styled.button`
  width: 120px;
  height: 36px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;
export const BtnCloseCashier = styled.button`
  width: 120px;
  height: 36px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};
  &:active {
    background: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnDetails = styled.button`
  color: ${Colors.Text.Black};
  width: 100px;
  height: 30px;

  background-color: ${Colors.ButtonsColors.Actions};

  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(3px);
  }
`;
