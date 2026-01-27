import styled from "styled-components";
import { Phone_media, Colors } from "../../../variable";

export const DivNewCategory = styled.div`
  width: 50%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_column}
`;

export const TitleNewCategory = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const FormCategory = styled.form`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const DivOrgCategory = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelCategory = styled.label`
  font-size: 15px;
  width: 40%;
`;
export const InputCategory = styled.input`
  width: 60%;
  height: 36px;
  background-color: #fff;
  border-radius: 25px;
  padding-left: 10px;
`;

export const DivBtnCategory = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const BtnRemoveCategory = styled.button`
  width: 40%;
  height: 47px;
  color: ${Colors.Text.Black};
  background: rgba(255, 0, 0, 0.6);
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: rgba(255, 0, 0, 0.6);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
export const SubmitCategory = styled.button`
  width: 40%;
  height: 47px;
  color: ${Colors.Text.Black};
  background: rgba(182, 255, 170, 0.88);
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: rgba(182, 255, 170, 0.88);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;

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
