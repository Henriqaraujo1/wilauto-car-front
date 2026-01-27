import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
export const DivOrgMessage = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  width: 100%;
  height: 35%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const DivBtnClose = styled.div`
  width: 90%;
  padding: 5px;
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

export const InfoClient = styled.div`
  background-color: ${Colors.BackgroundColors.BkComponent};
  width: 90%;
  height: 100%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
@media screen and (min-width: 320px) and (max-width: 940px) {
    height: 40%;
  }
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleInfo = styled.span`
  font-size: 1rem;
`;
export const DivOrgInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 10px;
  border-radius: 25px;
  background-color: ${Colors.BackgroundColors.BkItem};
`;
export const NameClient = styled.span`
  margin: 5px auto;
`;
export const NumberClient = styled.span`
  margin: 5px auto;
`;

export const DivOrgChange = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 5px;
`;
export const BtnChange = styled.button`
  /* width: 35%; */
  height: 25px;
  padding: 10px;
  /* margin: 5px; */
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ changeColor }) =>
    changeColor
      ? `${Colors.ButtonsColors.Printer}`
      : `${Colors.ButtonsColors.Confirm}`};
  cursor: pointer;

  &:active {
    background-color: ${({ changeColor }) =>
    changeColor
      ? `${Colors.ButtonsColors.Printer}`
      : `${Colors.ButtonsColors.Confirm}`};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
`;
export const BtnSend = styled.button`
  /* width: 1%; */
  height: 25px;
  padding: 10px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border: 1px solid black;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;
export const DivStatusMsg = styled.div`
      width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LabelWpp = styled.label`
  font-size: 0.9rem;
  margin: 0 auto;
`;
export const DivOrgInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
export const InputNumber = styled.input`
  width: 204px;
  height: 26px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;
  border: 1px solid black;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

export const DivOrgResults = styled.div`
  width: 80%;
  height: 20%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
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