import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgPopUp = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 115px;
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

export const DivBtnClose = styled.div`
  width: 100%;
  margin-right: 15px;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 35px;
  height: 35px;
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

export const DivCloseCashier = styled.div`
  width: 40%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid black;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 80%;
    height: 25%;
    border: 1px solid black;
  }
`;

export const TitleCloseCashier = styled.h1`
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const BtnCloseCashier = styled.button`
  width: 120px;
  height: 36px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const FormClose = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DivOrgClose = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Phone_media.Phone_Form}
`;
export const InputBigClose = styled.input`
  width: 150px;
  height: 26px;
  padding: 10px;
  display: flex;
  border: transparent;
  background: ${Colors.BackgroundColors.BkInputs.Gray};
  border-radius: 25px;
`;

export const InfoUsername = styled.p`
  font-size: 14px;
`;

export const LabelClose = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const InputCashier = styled(Numeric)`
  width: 150px;
  height: 26px;
  padding: 10px;
  display: flex;
  border: transparent;
  background: ${Colors.BackgroundColors.BkInputs.Gray};
  border-radius: 25px;
`;

export const DivBtn = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const DivOrgStatus = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StatusCashier = styled.p`
  font-size: 0.8rem;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
