import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";
import Barcode from "react-barcode";

export const DivOrgScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Phone_media.Phone_column};
`;

export const DivOrgContent = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-;
  ${Phone_media.Phone_column};
`;

export const DivNewTag = styled.div`
  width: 95%;
  height: 60%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const DivTag = styled.div`
  width: 95%;
  height: 30%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const FormNewTag = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const DivOrgNewTag = styled.div`
  width: 100%;
  padding: 10px;
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

export const LabelNewTag = styled.label`
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

  @media screen and (min-width: 320px) and (max-width: 940px) {
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

  @media screen and (min-width: 320px) and (max-width: 940px) {
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

  @media screen and (min-width: 320px) and (max-width: 940px) {
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

export const TextNewTag = styled.textarea`
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
`;
export const Options = styled.option``;

export const SubmitFormNewTag = styled.button`
  margin-top: 25px;
  width: 164px;
  height: 47px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  color: ${Colors.Text.Black};

  &:hover {
    cursor: pointer;
  }

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
  color: ${Colors.Text.Black};

  &:hover {
    cursor: pointer;
  }

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

export const TitleTag = styled.h4`
  font-size: 1.1em;
`;

export const DivOrgExampleInfo = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
`;
export const DivOrgImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const DivOrgTitle = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const NameTag = styled.p`
  font-size: 0.8rem;
`;
export const ImageTag = styled.img`
  width: 20%;
  height: 80%;
`;

export const DivOrgInfoTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CodTag = styled(Barcode)`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 100px;
  }
`;
export const PriceTag = styled.p`
  font-size: 1.2rem;
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
