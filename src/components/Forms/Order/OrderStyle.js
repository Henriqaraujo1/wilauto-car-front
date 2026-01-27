import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import Select from "react-select";
import { NavLink as Link } from "react-router-dom";

export const DivOrgScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Phone_media.Phone_column}
`;

export const DivOrder = styled.div`
  width: 40%;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;

  ${Phone_media.Phone_column}
`;

export const SelectDoc = styled.select`
  width: 70px;
  margin: 0 5px;
  height: 36px;
  text-align: center;
  color: ${Colors.Text.Black};
  border-radius: 25px;
  border: 1px solid black;
  background-color: transparent;
`;

export const TitleOrder = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const InputBig = styled.input`
  min-width: 35%;
  height: 36px;
  padding: 10px;
  display: flex;

  border: transparent;
  background: ${Colors.BackgroundColors.BkInputs.Gray};
  border-radius: 25px;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputSmall = styled.input`
  width: 25%;
  height: 36px;
  border: transparent;
  padding: 10px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  background: ${Colors.BackgroundColors.BkInputs.Gray};
  border-radius: 25px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize};
`;

export const LabelInfo = styled.p`
  font-size: 15px;
`;

export const InfoDateDolar = styled.small`
  font-size: 0.7rem;
`;

export const BtnForm = styled.button`
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
export const DivOrg = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DivOrgClient = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DivTotal = styled.div`
  display: flex;
  justify-content: space-around;
  width: 245px;
  margin: 20px;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
`;
export const InfoResult = styled.p`
  width: 150px;
  text-align: center;
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

export const DivOrgCancel = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const DivOrgBtnCancel = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
`;
export const BtnCancel = styled.button`
  width: 30px;
  height: 30px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border: 1px solid black;
  border-radius: 100%;

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  cursor: pointer;
  &:active {
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgLoading = styled.div`
  width: 50%;
  height: 100%;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

export const Options = styled.option``;

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

export const SelectCodProduct = styled(Select)`
  text-align: center;
  width: 70%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
export const SelectClient = styled(Select)`
  text-align: center;
  width: 75%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const DivOrgBtn = styled.div`
  width: 20%;
  padding: 3px;
  display: flex;
  justify-content: space-between;
`;
export const BtnAddClient = styled.button`
  width: 40%;
  padding: 5px;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 50%;
  }
`;

export const DivBtnCashier = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px;
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

export const BtnReloading = styled.button`
  width: 40%;
  padding: 5px;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Search};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 50%;
  }
`;
