import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Select from "react-select";

export const DivNewCar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Phone_media.Phone_column};
`;

export const DivItemStockEntry = styled.div`
  width: 100%;
  background: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
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

export const FormCar = styled.form`
  width: 100%;
  height: 90%;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_column}
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

export const InputImgPreview = styled.img`
  width: 150px;
  height: 150px;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
`;
export const DivButtonsCar = styled.div`
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
export const DivFormCar = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 10px;
    margin: 0px;
  }
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

export const DivOrgCar = styled.div`
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
export const DivOrgCarCol = styled.div`
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

export const LabelCar = styled.label`
  font-size: 15px;
`;

export const LabelCalcResult = styled.label``;

export const InputSmall = styled.input`
  width: 50%;
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
export const InputCar = styled.input`
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
export const InputCarName = styled.input`
  width: 281px;
  height: 36px;
  padding: 10px;

  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 350px;
  }
`;
export const InputCodCar = styled.input`
  width: 150px;
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
    width: 350px;
  }
`;

export const DivBtnCar = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }
`;

export const SubmitCar = styled.button`
  width: 40%;
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

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
    margin-left: 30px;
  }
`;
export const BtnRemoveCar = styled.button`
  width: 40%;
  height: 47px;
  color: ${Colors.Text.Black};

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 30%;
  }
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

export const DivBtnBrand = styled.div`
  width: 10%;
  padding: 5px;
`;

export const BtnCreateBrand = styled.button`
  width: 100%;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;

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
  margin-right: 10px;
`;
export const Options = styled.option``;

export const InputData = styled.input`
  width: 200px;
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

export const SelectType = styled(Select)`
  width: 230px;
  /* height: 30px; */
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
