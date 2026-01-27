import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivItemStockOut = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
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

export const TitleProductOut = styled.h2`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const TitleProductOutChange = styled.h4`
  font-size: 15px;
`;

export const FormItemStockOut = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  margin: 5px auto;
  border-radius: 25px;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const DivOrgItemStockOut = styled.div`
  width: 100%;
  height: 36px;
  margin: 5px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DivOrgDetails = styled.div`
  width: 100%;
  height: 50px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelItemStockOut = styled.label`
  margin-left: 10px;
  font-size: 15px;
`;

export const FormatValue = styled(Numeric)`
  font-size: 0.9rem;
  text-align: center;
`;

export const InputBig = styled.input`
  width: 304px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;
export const InputMedium = styled.input`
  width: 204px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;
export const InputSmall = styled.input`
  width: 104px;
  height: 36px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }
`;

export const LabelResult = styled.label`
  width: 20%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextItemStockOut = styled.textarea`
  width: 305px;
  height: 56px;
  margin-left: 5px;
  background: rgba(255, 255, 255);
  border-radius: 25px;
  resize: none;
  padding: 10px;
`;

export const DivBtnSubmit = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items:center;
`;

export const SubmitFormItemStockOut = styled.button`
  width: 120px;
  height: 30px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;
  color: ${Colors.Text.Black};

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

export const Line = styled.hr`
  width: 90%;
  margin: 10px auto;
  border-top: 2px dashed ${Colors.Text.Black};
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

export const DivBtnClose = styled.div`
  width: 100%;
  margin-right: 15px;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 7%;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
