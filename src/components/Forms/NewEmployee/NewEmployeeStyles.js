import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";

export const DivNewEmployee = styled.div`
  width: 50%;
  height: 550px;
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

export const FormEmployee = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const SelectDoc = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  border: 1px solid black;
  background-color: transparent;
`;

export const DivOrgEmployee = styled.div`
  width: 100%;
  height: 36px;
  margin: 5px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelEmployee = styled.label`
  font-size: 15px;
`;
export const InputEmployee = styled.input`
  width: 65%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const InputState = styled.input`
  width: 104px;
  height: 25px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const InputSmall = styled.input`
  width: 25%;
  height: 25px;
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

export const InputMedium = styled.input`
  width: 204px;
  height: 26px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const LabelEmployeeStreet = styled.label`
  font-size: 15px;
  width: 50%;
`;
export const InputEmployeeStreet = styled.input`
  width: 70%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px 0 0 25px;
  outline: none;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 70%;
  }
`;
export const InputEmployeeNumber = styled.input`
  width: 87px;
  height: 36px;
  /* z-index: 1; */

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 0 25px 25px 0;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50px;
    font-size: 0.75em;
  }
`;
export const SubmitFormEmployee = styled.button`
  width: 164px;
  height: 47px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  color: ${Colors.Text.Black};

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const SelectOption = styled.select`
  width: 90px;
  height: 25px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;
export const Options = styled.option``;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  justify-content: center;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivBtnShow = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  width: 100%;
  justify-content: flex-end;
`;

export const BtnShow = styled.button`
  width: 164px;
  height: 25px;
  background: ${Colors.ButtonsColors.Search};
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    /* background-color: ${Colors.ButtonsColors.Search}; */
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgShowAdress = styled.div`
  display: ${({ show }) => (show ? "none" : "flex")};
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const DivOrgClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const BtnCloseAdress = styled.button`
  width: 30px;
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

export const SelectPosition = styled(Select)`
  width: 230px;
  /* height: 30px; */
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
