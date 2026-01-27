import styled from "styled-components";
import { Colors } from "../../../variable";
import Select from "react-select";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgResumeBudgetDetail = styled.div`
  width: 100%;
  height: 450px;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  animation: grow 0.1s ease-in;
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

export const DivOrgTitle = styled.div`
  width: 100%;
  height: 15%;
  margin: 3px;
  display: flex;
  flex-direction: row;
`;
export const TitleInfoOrder = styled.h4`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivInfoTable = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;

export const DivCardProduct = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  padding: 5px;
  flex-direction: row;
  border: 1px solid black;
`;
export const DivCardNewProduct = styled.div`
  width: 100%;

  margin: 5px auto;

  display: flex;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 8px;
  flex-direction: row;
  border: 1px solid black;
`;
export const DivOrgId = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 20%;
    height: 50%;
  }
`;
export const IdProduct = styled.p`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivOrgInfoProduct = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
`;
export const NameProduct = styled.p`
  font-size: 0.9em;
`;
export const ProductInfo = styled.p`
  font-size: 0.8em;
`;
export const PriceFormat = styled(Numeric)`
  font-size: 0.8em;
`;
export const PercentFormat = styled(Numeric)`
  font-size: 0.9em;
`;

export const DivOrgPrices = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const DivOrgInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    margin: 2px 0;
  }
`;

export const DivOrgInfoName = styled.div`
  width: 100%;
  padding: 5px;
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
  width: 30px;
  height: 30px;
  padding: 3px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;

export const InfoResumeBudgetDetailResult = styled.p`
  font-size: 0.8em;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoLoading = styled.p`
  color: ${Colors.Text.White};
`;

export const DivBtnCancelItem = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivBtnEditBudget = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivBtnSave = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnEditBudget = styled.button`
  width: 150px;
  height: 35px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border: 1px solid black;
  color: black;
  border-radius: 25px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;

export const FormNewItem = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const DivOrgInput = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const DivOrgCod = styled.div`
  width: 50%;
`;

export const DivOrgNewItem = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
`;

export const DivOrgInfoPrices = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
`;
export const DivOrgNameProduct = styled.div`
  width: 30%;
`;
export const LabelItem = styled.label`
  font-size: 0.8rem;
`;
export const InputItem = styled.input`
  width: 90%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9em;
  margin-right: 10px;
  background-color: ${Colors.BackgroundColors.BkInputs};
`;

export const SelectProduct = styled(Select)`
  width: 90%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const DivOrgBtnAdd = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnAddItem = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;

export const DivAlerts = styled.div`
  /* width: 50%; */
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

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  padding-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
  /* width: 250px; */
  text-align: center;
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

