import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import Select from "react-select";

export const DivItemStockOut = styled.div`
  width: 45%;
  height: 100%;
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
export const FormItemStockOut = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const DivOrgItemStockOut = styled.div`
  width: 100%;
  height: 36px;
  margin: 5px auto;
  padding: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelItemStockOut = styled.label`
  width: 20%;
  font-size: 0.8em;
`;

export const InputMedium = styled.input`
  width: 204px;
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
  width: 95px;
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
  width: 20%;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LabelTotal = styled(Numeric)`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LabelResultName = styled.label`
  width: 70%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LabelResultStock = styled.label`
  width: 20%;
  font-size: 16px;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextItemStockOut = styled.textarea`
  width: 305px;
  height: 56px;
  background: rgba(255, 255, 255);
  border-radius: 25px;
  margin-top: 5px;
  resize: none;
  padding: 10px;
`;

export const SubmitFormItemStockOut = styled.button`
  margin-top: 25px;
  width: 164px;
  height: 47px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgResults = styled.div`
  width: 100%;

  margin: 5px 0;
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
`;
export const InfoResults = styled.p`
  /* width: 150px; */
  text-align: center;
  padding: 3px;
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

export const Line = styled.hr`
  width: 90%;
  margin: 10px auto;
  border-top: 2px dashed ${Colors.Text.Black};
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const LabelResultQtd = styled.p`
  font-size: 10px;
`;

export const SelectProduct = styled(Select)`
  text-align: center;
  width: 70%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
