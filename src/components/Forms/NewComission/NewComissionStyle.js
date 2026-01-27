import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import Select from "react-select";

export const DivOrgComission = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 145px;
  left: 150px;
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

export const FormComission = styled.form`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 40%;
  /* height: 1%; */
  border-radius: 25px;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  /* ${Phone_media.Phone_Pop_UP} */
  ${Tablet_media.Tablet_Form}
`;

export const DivBtnClose = styled.div`
  width: 100%;
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

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;

export const DivOrgInput = styled.div`
  width: 100%;
  /* height: 36px; */
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LabelComission = styled.label`
  font-size: 15px;
`;

export const SelectOption = styled(Select)`
  width: 250px;
  text-align: center;
  /* border-radius: 25px; */
  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const PriceBuyed = styled(Numeric)`
  font-size: 1em;
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
`;
export const BtnFinishComission = styled.button`
  /* width: 105px; */
  height: 32px;
  padding: 5px;
  font-size: 0.9rem;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgResults = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;
export const InfoResult = styled.p`
  // width: 150px;
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