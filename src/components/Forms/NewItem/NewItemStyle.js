import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";
import { NavLink as Link } from "react-router-dom";

export const DivOrgScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Phone_media.Phone_column};
`;

export const DivItemStockEntry = styled.div`
  width: 45%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const FormItemStockEntry = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const DivOrgItemStockEntry = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoResult = styled.p`
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

export const DivOrgIdStockEntry = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivOrgInput = styled.div`
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoDateDolar = styled.small`
  font-size: 0.7rem;
`;

export const LabelItemStockEntry = styled.label`
  font-size: 15px;
`;

export const InputBig = styled.input`
  width: 304px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const InputSmall = styled.input`
  width: 104px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;
export const InputDate = styled.input`
  width: 110px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const LabelResult = styled.label`
  width: 70%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LabelCalcResult = styled.label`
  width: 50%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextItemStockEntry = styled.textarea`
  width: 305px;
  height: 56px;
  background: rgba(255, 255, 255);
  border-radius: 25px;
  margin-top: 5px;
  resize: none;
  padding: 10px;
`;

export const SelectOption = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;
export const Options = styled.option``;

export const SubmitFormItemStockEntry = styled.button`
  width: 105px;
  height: 32px;
  font-size: 18px;
  display: ${({ show }) => (show ? "none" : "flex")};
  justify-content: center;
  flex-direction: column;
  align-content: center;

  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 0 5px;
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
`;
export const InfoResults = styled.p`
  width: 150px;
  text-align: center;
  font-size: 12px;
  font-style: italic;
  border: 1px solid ${Colors.Text.Black};
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
`;

export const DivAlerts = styled.div`
  width: 90%;
  /* height: 10%; */
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${Colors.Text.Alert};
  border: 1px solid black;
  border-radius: 25px;
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};

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

export const Alerts = styled.span`
  font-size: 1em;
  font-style: italic;
  white-space: pre-wrap;
  /* text-align: center; */
`;

export const TitleAlert = styled.h4`
  font-size: 1.1em;
`;

export const TitleDelivery = styled.h4`
  font-size: 0.9em;
`;

export const SelectProvider = styled(Select)`
  text-align: center;
  width: 50%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
export const SelectProduct = styled(Select)`
  text-align: center;
  width: 70%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const DivBtnCashier = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px;
`;

export const DivOrgBtnCancel = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const BtnCancel = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  background: ${Colors.ButtonsColors.Canceled};
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;

export const BtnCashier = styled(Link)`
  width: 40%;
  padding: 5px;
  border: 1px solid black;
  text-decoration: none;
  text-align: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 25px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;

export const DivBtnSubProduct = styled.div``;
export const BtnSubProduct = styled.button`
  /* width: 1px; */
  height: 30px;
  padding: 5px;
  margin: 0 5px;
  background: ${Colors.ButtonsColors.Search};
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;
