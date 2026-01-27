import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import Select from "react-select";

export const DivComission = styled.div`
  width: 95%;
  height: 375px;
  padding: 10px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_table}
`;

export const DivOrgSales = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DivFilter = styled.div`
  width: 95%;
  display: ${({ show }) => (show ? "none" : "flex")};
  justify-content: flex-end;

  padding: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const DivOrgBtnComission = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: flex-start;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
    flex-direction: column;
  }
`;
export const BtnComission = styled.button`
  color: ${Colors.Text.Black};
  height: 32px;
  padding: 5px;
  font-size: 0.9rem;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;
export const LabelFilter = styled.label`
  display: flex;
  align-items: center;
  padding-right: 5px;

  font-size: 15px;
`;
export const InputFilter = styled.input`
  width: 240px;
  height: 30px;
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.Gray};
  border-radius: 25px;

  border: transparent;
`;

export const DivOrgBtn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 50%;
    margin: 5px auto;
  }
`;

export const BtnFilter = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
  @media screen and (max-width: 599px) {
    width: 30px;
    height: 30px;
    margin-left: 5px;
  }
`;

export const BtnCancel = styled.button`
  width: 30px;
  border: 1px solid black;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivComissionTable = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
`;
export const DivComissionCard = styled.div`
  width: 65%;
  height: 25%;
  border: 1px solid black;
  margin: 5px auto;
  background: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 599px) {
    width: 95%;
    height: 28%;
    padding: 10px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const DivDetailClient = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  @media screen and (max-width: 599px) {
    width: 95%;
    height: 60%;
    justify-content: space-between;
  }
`;
export const DivIdClient = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivInfoDetailsClient = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const DivOrgValues = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  margin: 0 2px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const DivBtn = styled.div`
  width: 15;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
    width: 95%;
    height: 35%;
  }
`;
export const IdSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border: 1px solid black;
  border-radius: 50%;
`;
export const NameClient = styled.h5`
  text-align: inline;
  font-size: 14px;
  margin-bottom: 5px;
`;
export const Value = styled.span`
  font-size: 10px;
  text-align: center;
  /* text-align: center; */
`;
export const InfoValue = styled.span`
  font-size: 12px;
  display: flex;
  justify-content: center;
`;

export const LinkPage = styled(Link)`
  text-decoration: none;
  color: ${Colors.Text.Black};
  padding: 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  font-size: 0.8rem;

  background-color: ${Colors.ButtonsColors.Actions};
  box-sizing: border-box;
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 940px) {
    height: 40px;
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PriceBuyed = styled(Numeric)`
  display: flex;
  justify-content: center;
  font-size: 0.7em;
  margin-left: 2px;
`;

export const DivFilterSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const SelectOption = styled(Select)`
  width: 250px;
  text-align: center;

  /* border-radius: 25px; */
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
