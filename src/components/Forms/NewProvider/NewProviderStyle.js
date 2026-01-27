import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";

export const DivNewProvider = styled.div`
  width: 50%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
export const FormProvider = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const DivOrgProvider = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivOrgCity = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DivOrgInputCity = styled.div`
  width: 60%;
`;
export const DivOrgInputState = styled.div`
  width: 35%;
`;

export const LabelProvider = styled.label`
  font-size: 15px;
`;
export const InputProvider = styled.input`
  width: 65%;
  height: 36px;
  background-color: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70%;
  }
`;

export const LabelProviderStreet = styled.label`
  width: 40%;
  font-size: 15px;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30%;
  }
`;

export const InputProviderStreet = styled.input`
  width: 50%;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px 0 0 25px;
  outline: none;
  padding-left: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 50%;
  }
`;
export const InputProviderNumber = styled.input`
  width: 87px;
  height: 36px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 0 25px 25px 0;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 20%;
  }
`;

export const InputMedium = styled.input`
  width: 200px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 50%;
  }
`;
export const DivBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitForm = styled.button`
  width: 164px;
  height: 47px;
  margin-top: 10px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30%;
  }
`;
export const BtnRemove = styled.button`
  width: 164px;
  height: 47px;
  margin-top: 10px;
  margin-right: 10px;
  color: ${Colors.Text.Black};

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30%;
  }
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
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
  color: ${Colors.Text.Black};
  cursor: pointer;
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
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgCnpj = styled.div`
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: space-around;
    width: 80%;
  }
`;

export const BtnCNPJ = styled.button`
  width: 80px;
  border: 1px solid black;
  height: 30px;
  border-radius: 25px;
  background-color: ${Colors.ButtonsColors.Invoice};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Invoice};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const SelectState = styled(Select)`
  text-align: center;
  width: 100%;

  border-radius: 25px;
  /* background-color: ${Colors.Text.White}; */
`;
export const SelectCity = styled(Select)`
  text-align: center;
  width: 100%;
  border-radius: 25px;
`;
