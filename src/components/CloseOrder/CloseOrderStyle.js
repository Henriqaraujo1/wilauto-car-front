import styled from "styled-components";
import { Search, Check } from "@styled-icons/material";
import { Colors, Phone_media } from "../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import Select from "react-select";

export const DivCloseOrder = styled.div`
  width: 44%;
  /* height: 100%; */
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  /* margin: 10px; */
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_column};
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 55%;
  }
`;

export const FormFinal = styled.form`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DivLocal = styled.div`
  width: 100%;
  padding: 5px;
  border: 1px solid black;
  background: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LabelLocal = styled.label`
  font-size: 16px;
`;
export const InputLocal = styled.input`
  width: 60%;
  height: 35px;
  border-radius: 25px;
  padding: 0px 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
    height: 70%;
  }
`;
export const BtnSearch = styled(Search)`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  background-color: ${Colors.ButtonsColors.Search};

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 10%;
    height: 90%;
  }
`;

export const BtnCheck = styled(Check)`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  background: ${Colors.ButtonsColors.Confirm};

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 10%;
    height: 90%;
  }
`;

export const DivFind = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  /* margin-top: 15px; */
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;
export const LabelLocalFind = styled.label`
  font-size: 18px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 30px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const DivTotal = styled.div`
  width: 100%;
  border: 1px solid black;
  margin: 10px auto;
  padding: 5px;
  background: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;
export const DivOrder = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
export const DivOrgOrder = styled.div`
  width: 75%;
  margin: 2px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DivOrgSelect = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleOrder = styled.h5`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
export const PriceOrder = styled.span`
  /* font-size: 18px; */
  font-size: ${({ theme }) => theme.fontSize};
`;
export const Line = styled.hr`
  width: 90%;
  margin: 10px auto;
  border-top: 2px dashed ${Colors.Text.Black};
`;
export const DivOptions = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
`;

export const SelectOptionsToPay = styled.select`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.Text.Black};
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.ButtonsColors.Actions};
`;
export const SelectDescont = styled.select`
  width: 80px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  color: ${Colors.Text.Black};
  background-color: ${Colors.ButtonsColors.Actions};
`;

export const DivInputChange = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ChangeLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
`;
export const ChangeInput = styled.input`
  width: 80px;
  height: 34px;
  margin: 10px 0px;
  text-align: center;
  border-radius: 25px;
  font-size: 15px;
`;
export const ValuePay = styled.input`
  width: 120px;
  height: 34px;
  margin: 10px 0px;
  padding: 2px;
  text-align: center;
  border-radius: 25px;
  /* font-size: 15px; */
    font-size: ${({ theme }) => theme.fontSize};
`;
export const OptionsPay = styled.option`
  border-radius: 25px;
`;

export const DivOrgBtnOrder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

export const BtnFinish = styled.button`
  /* width: 127px; */
  height: 33px;
  padding: 10px;
  display: flex;
  justify-content:center;
  align-items:center;
  margin: 5px;
  font-size: 18px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const BtnBudget = styled.button`
  width: 127px;
  height: 33px;
  margin: 5px;
  border: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  cursor: pointer;

  @media screen and (max-width: 940px) {
    font-size: 18px;
  }

  font-size: 18px;

  background: ${Colors.ButtonsColors.Search};
  border-radius: 25px;

  &:active {
    margin-top: 3px;
  }
`;

export const TitleLocal = styled.h4``;
export const DivBtnDelivery = styled.div`
  width: 100%;
  display: flex;
  margin: 5px;
  justify-content: center;
  flex-direction: row;
`;
export const BtnDelivery = styled.button`
  width: 40%;
  height: 20px;
  display: flex;
  cursor: pointer;
  color: ${Colors.Text.Black};
  justify-content: center;
  align-items: center;
  background: ${Colors.ButtonsColors.Actions};
  border-radius: 25px 0 0 25px;
  font-size: 15px;
  box-shadow: inset 0 0 0 0 ${Colors.ButtonsColors.Confirm};
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;

  &:focus {
    box-shadow: inset -400px 0 0 0 ${Colors.ButtonsColors.Confirm};
  }

  &:after {
    background-color: ${Colors.ButtonsColors.Confirm};
  }
`;
export const BtnGetOrder = styled.button`
  width: 40%;
  height: 20px;
  display: flex;
  cursor: pointer;
  color: ${Colors.Text.Black};
  justify-content: center;
  align-items: center;
  background: ${Colors.ButtonsColors.Actions};
  border-radius: 0px 25px 25px 0;
  font-size: 15px;
  box-shadow: inset 0 0 0 0 ${Colors.ButtonsColors.Confirm};
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;

  &:focus {
    box-shadow: inset 400px 0 0 0 ${Colors.ButtonsColors.Confirm};
  }

  &:active:after {
    background-color: #fff;
  }
`;
export const DivOrgValuePay = styled.div`
  width: 60%;
  display: flex;
  margin-right: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DivOrgChangeValue = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DivOrgClientInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const DivOrgStreet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const InfoStreet = styled.p`
  font-size: 14px;
  margin: 2px 5px;
`;
// export const = styled.p``
export const DivOrgDistrict = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;
export const InfoDistrict = styled.p`
  font-size: 14px;
  margin: 2px 5px;
`;
export const DivOrgComplement = styled.div`
  width: 100%;
`;
export const InfoComplement = styled.p`
  font-size: 14px;
  margin: 2px 5px;
`;
export const DivOrgNotDelivery = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
`;
export const InfoNotDelivery = styled.p`
  font-size: 0.9rem;
`;
export const DivFormDelivery = styled.div`
  width: ${({ showDiv }) => (showDiv ? "100%" : "40%")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const DivOrgLocal = styled.div`
  width: 80%;
  /* border: 1px solid black; */
  display: ${({ showDiv }) => (showDiv ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DivOrgInputs = styled.div`
  display: ${({ showDiv }) => (showDiv ? "flex" : "none")};
  width: 100%;
  height: 100%;
  padding: 5px;
  flex-direction: column;
`;

export const DivBtnLocal = styled.div`
  width: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
`;

export const DivOrgBtnNewLocal = styled.div`
  width: 50%;
  height: 100%;
`;

export const ButtonNewLocal = styled.button`
  display: ${({ closeBtn }) => (closeBtn ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 25px;
  padding: 1px;
  font-size: 15px;
  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const DivOrgBtnClose = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

export const CloseNewLocal = styled.button`
  display: ${({ showDiv }) => (showDiv ? "flex" : "none")};
  width: 10%;
  height: 100%;
  border-radius: 100%;
  padding: 2px;
  background-color: ${Colors.ButtonsColors.CloseButton};
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.CloseButton};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const DivOrgNewStreet = styled.div`
  width: 100%;
  display: flex;
  margin: 2px auto;
  flex-direction: row;
`;
export const DivOrgNewComplement = styled.div`
  width: 100%;
  margin: 2px auto;
`;
export const DivOrgNewDistrict = styled.div`
  width: 100%;
  margin: 2px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NewStreet = styled.input`
  width: 250px;
  height: 20px;
  padding: 5px;
  margin-right: 5px;
  border-radius: 25px;
`;
export const NewLocalNumber = styled.input`
  width: 70px;
  height: 20px;
  padding: 5px;
  border-radius: 25px;
`;
export const NewComplement = styled.input`
  width: 200px;
  height: 20px;
  padding: 5px;
  border-radius: 25px;
`;
export const NewDistrict = styled.input`
  width: 170px;
  height: 20px;
  padding: 5px;
  border-radius: 25px;
`;
export const NewCity = styled.input`
  width: 100px;
  height: 20px;
  padding: 5px;
  border-radius: 25px;
`;
export const BtnAddLocal = styled.button`
  width: 50px;
  height: 20px;
  font-size: 10px;
  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const SelectOptionNewState = styled.select`
  width: 85px;
  height: 20px;
  text-align: center;
  color: ${Colors.Text.Black};
  padding: 1px;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
export const Options = styled.option``;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  /* padding-right: 40px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
  /* width: 250px; */
  text-align: center;
  padding: 5px;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoadingInfo = styled.p`
  font-size: 0.8rem;
`;

export const DivBtnDistrict = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const BtnCreateDistrict = styled.button`
  width: 30%;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  /* @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
    margin-left: 30px;
  } */
`;

export const DivOrgNewDelivery = styled.div`
  width: 100%;
  /* height: 50%; */
  margin: 10px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* flex-direction: row; */
`;
export const TitleNewDelivery = styled.h4`
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgInput = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const DivOrgValue = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

export const LabelDelivery = styled.label`
  font-size: 0.8rem;
`;

export const ValueDelivery = styled(Numeric)`
  font-size: 0.8rem;
  width: 100px;
  height: 20px;
  padding: 5px;
  border-radius: 25px;
  /* width: 50%; */
`;

export const SelectOption = styled(Select)`
  width: 230px;
  /* height: 30px; */
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
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
