import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import Select from "react-select";

export const DivNewUser = styled.div`
  width: 50%;
  height: 550px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin-right: 10px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_column}
`;

export const TitleNewUser = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const FormUser = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
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
export const DivOrgUserSelect = styled.div`
  width: 80%;
  // height: 36px;
  margin: 20px auto;
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

export const DivBtnSearchUser = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitUser = styled.button`
  width: 40%;
  height: 47px;
  color: ${Colors.Text.Black};
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
  width: 40%;
  height: 47px;
  margin-right: 20px;
  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgValidation = styled.div`
  color: ${Colors.Text.Black};
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const ValidationOptions = styled.p`
  border-radius: 25px;
  font-size: 0.7rem;
  padding: 5px;
  border: 1px solid black;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
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

export const SelectOption = styled(Select)`
  text-align: center;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;
export const Options = styled.option``;

export const DivPass = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

export const DivOrgShow = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  /* border: 1px solid black; */
`;
export const ShowPass = styled.input`
  width: 5%;
`;

export const LabelPass = styled.label`
  font-size: 0.9rem;
`;
