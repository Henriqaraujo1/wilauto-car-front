import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgOptions = styled.div`
  width: 50%;
  height: 100%;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
  }
`;

export const DivOptionsRegister = styled.div`
  width: 100%;
  height: 100%;
`;

export const DivFormUser = styled.form`
  width: 100%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 5px;
  }
`;

export const DivOrgUser = styled.div`
  width: 80%;
  height: 36px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;

export const LabelUser = styled.label`
  font-size: 15px;
`;
export const InputUser = styled.input`
  width: 50%;
  height: 30px;
  background-color: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  padding-left: 10px;
`;

export const DivOrgValidation = styled.div`
  color: ${Colors.Text.Black};
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const ValidationOptions = styled.p`
  border-radius: 25px;
  font-size: 8.5px;
  background-color: ${Colors.Text.Red};
  color: ${Colors.Text.White};
`;

export const DivBtnUser = styled.div`
  width: 100%;
  height: 20%;
  padding: 5px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubmitUser = styled.button`
  width: 30%;
  height: 30px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;
export const BtnRemoveUser = styled.button`
  width: 30%;
  height: 30px;

  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnPass = styled.button`
  width: 30%;
  height: 30px;
  /* margin: 20px; */

  background: ${Colors.ButtonsColors.Password};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Password};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
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
