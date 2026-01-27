import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors, Phone_media } from "../../../variable";
import {
  NumericFormat as Numeric,
  PatternFormat as FormatInfo,
} from "react-number-format";

export const DivInfoClient = styled.div`
  width: 95%;
  height: 400px;
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
    flex-direction: column;
  }
`;

export const DivOrgInputFilter = styled.div`
  width: 100%;
  margin: 0 10px;
`

export const DivOrgFilter = styled.div`
  /* width: 80%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
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

export const DivOrgPageSell = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;


export const BtnPageSell = styled(Link)`
  text-decoration: none;
  height: 40px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  background-color: ${Colors.ButtonsColors.Confirm};
  color: ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;

  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;


export const DivInfoClientTable = styled.div`
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
export const DivInfoClientCard = styled.div`
  width: 48%;
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
    height: 25%;
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
  padding: 2px;
  margin: 0 2px;
  flex-direction: column;
  justify-content: center;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  display: flex;
`;

export const DivBtn = styled.div`
  width: 90px;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 599px) {
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
  font-size: 12px;
  text-align: center;
`;
export const InfoValue = styled.span`
  font-size: 12px;
  display: flex;
  justify-content: center;
`;
export const BtnDetail = styled.button`
  width: 100px;
  height: 30px;
  background: ${Colors.ButtonsColors.Actions};
  border-radius: 25px;

  &:active {
    margin-top: 5px;
  }
`;

export const LinkPage = styled(Link)`
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
  width: 100px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
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

export const PriceBuyed = styled(Numeric)`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
`;

export const FormatCPF = styled(FormatInfo)`
  width: 150px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
`;
