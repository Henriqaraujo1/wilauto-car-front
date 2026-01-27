import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import { PatternFormat as FormatInfo } from "react-number-format";

export const DivInfoProvider = styled.div`
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
export const DivInfoProviderTable = styled.div`
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
  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 0px;
  }
`;

export const DivFilter = styled.div`
  width: 95%;
  display: ${({ show }) => (show ? "none" : "flex")};
  justify-content: flex-end;
  padding: 10px;
`;

export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  ${Phone_media.Phone_column}
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

export const FormatCnpj = styled(FormatInfo)`
  width: 25%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  ${Phone_media.Phone_Inputs}
`;
export const FormatCnpjText = styled(FormatInfo)`
  font-size: 0.9rem;
  margin: 0 10px;
`;

export const DivOrgBtn = styled.div`
  width: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${Phone_media.Phone_Filter_Btn}
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

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivInfoProviderCard = styled.div`
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
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 95%;
    height: max-content;
    border: 1px solid green;
    padding: 10px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const DivDetailProvider = styled.div`
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
export const DivId = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivInfoDetailsProvider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
export const DivBtn = styled.div`
  width: 20%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 599px) {
    width: 95%;
    height: 35%;
  }
`;
export const IdSpan = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border: 1px solid black;
  border-radius: 50%;
`;

export const DivOrgInfoProvider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NameProvider = styled.h5`
  text-align: inline;
  font-size: 16px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;
export const Value = styled.p`
  font-size: 12px;
  text-align: center;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  display: flex;
`;

export const PriceBuyed = styled(Numeric)`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnDetail = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 10px;
  background: ${Colors.ButtonsColors.Actions};
  border-radius: 25px;

  &:active {
    margin-top: 5px;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Actions};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
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
  /* border: 1px solid ${Colors.Text.Black}; */
  box-sizing: border-box;
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;
