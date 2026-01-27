import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";

export const DivUpdateProduct = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 280px;
  right: 170px;
  width: 80%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BKBlur};
  backdrop-filter: blur(10px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
  border-radius: 25px;

  animation: scale-in-tr 0.1s both;
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

  ${Phone_media.Phone_Pop_UP}
  ${Tablet_media.Tablet_Pop_Up}
`;

export const FormProduct = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;
export const DivImg = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export const DivOrgTitle = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleUpdate = styled.h3``;

export const InputImgPreview = styled.img`
  width: 100px;
  height: 100px;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
`;
export const DivButtonsProduct = styled.div`
  width: 150px;
  height: 41px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LabelImg = styled.label`
  width: 40px;
  height: 40px;
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.White};
  }
`;

export const InputImgAdd = styled.input`
  display: none;
`;

export const ButtonRemoveImage = styled.button`
  width: 40px;
  height: 40px;

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.White};
  }
`;
export const DivFormProduct = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 10px;
    margin: 0px;
  }
`;

export const DivOrgProduct = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  margin: 5px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 100%;
    margin: 3px;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  height: 25px;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  font-size: 12px;
  background: #fff;
  border: 1px solid black;
`;

export const InfoDateDolar = styled.small`
  font-size: 0.7rem;
`;

export const DivOrgPrices = styled.div`
  width: 100%;
`;

export const DivOrgColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const DivOrgProductCol = styled.div`
  width: 100%;
  /* height: 36px; */
  display: flex;
  margin: 5px 0px;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 100%;
    margin: 3px;
  }
`;

export const LabelProduct = styled.label`
  font-size: 15px;
`;

export const LabelCalcResult = styled.label``;

export const InputProduct = styled.input`
  width: 60%;
  height: 36px;
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 55%;
  }
`;
export const InputProductName = styled.input`
  width: 350px;
  /* height: 36px; */
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 350px;
  }
`;

export const DivBtnProduct = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }
`;

export const SubmitProduct = styled.button`
  width: 40%;
  height: 47px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
    margin-left: 30px;
  }
`;
export const BtnRemoveProduct = styled.button`
  width: 40%;
  height: 47px;

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
  }
`;
export const DivBtnClose = styled.div`
  width: 100%;
  margin-right: 15px;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 30px;
  height: 30px;
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

export const InputSmall = styled.input`
  width: 35%;
  height: 36px;
  margin: 0 10px;
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 55%;
  }
`;

export const DivOrgResults = styled.div`
  width: 100%;
  margin: 5px 0;
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
`;
export const InfoResult = styled.p`
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectType = styled(Select)`
  width: 230px;
  /* height: 30px; */
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const SelectOption = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  margin-right: 10px;
`;
export const Options = styled.option``;
