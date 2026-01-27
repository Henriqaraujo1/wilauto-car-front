import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NavLink as Link } from "react-router-dom";

export const DivNewExpense = styled.div`
  width: 50%;
  /* height: 530px; */
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 0 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleExpense = styled.h3``;

export const FormExpense = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const DivOrgExpense = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivOrgInputs = styled.div`
  width: 90%;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivOrgPayment = styled.div`
  width: 65%;
  height: 36px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelExpense = styled.label`
  font-size: 15px;
`;

export const InputBig = styled.input`
  width: 65%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;
export const InputMedium = styled.input`
  width: 38%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;
export const InputSmall = styled.input`
  width: 25%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const TextExpense = styled.textarea`
  width: 305px;
  height: 56px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  margin-top: 5px;
  resize: none;
  padding: 10px;
`;

export const DivOrgSubmit = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitFormExpenses = styled.button`
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

export const SelectStatus = styled.select`
  width: 25%;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;
export const SelectCategory = styled.select`
  width: 40%;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;

export const OptionsStatus = styled.option`
  border-radius: 25px;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
`;
export const InfoResults = styled.p`
  padding: 5px;
  text-align: center;
  font-size: 12px;
  font-style: italic;
  border: 1px solid ${Colors.Text.Black};
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivAlerts = styled.div`
  width: 70%;
  /* height: 10%; */
  margin: 15px auto;
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
  font-size: 0.9rem;
  font-style: italic;
  white-space: pre-wrap;
  /* text-align: center; */
`;

export const TitleAlert = styled.h4`
  font-size: 1em;
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
