import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { PatternFormat as FormatInfo } from "react-number-format";

export const DivSearchUser = styled.div`
  width: 60%;
  height: 550px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 0px 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_table}
`;
export const DivSearch = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    height: 40%;
  }
`;

export const TitleSearchUser = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivBtnFilter = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px;
  display: ${({ show }) => (show ? "none" : "flex")};
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 420px) and (max-width: 940px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const DivOrgInputs = styled.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DivOrgBtn = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
`;

export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 1em;
`;
export const NameInput = styled.input`
  width: 25%;
  height: 30px;
  margin: 0 5px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  ${Phone_media.Phone_Inputs}/* margin-right: 10px; */
`;
export const EmailInput = styled.input`
  width: 40%;
  height: 30px;
  margin: 0 5px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  ${Phone_media.Phone_Inputs_Email};
`;

export const FormatNumberText = styled(FormatInfo)`
  font-size: 0.9rem;
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnCancel = styled.button`
  width: 30px;
  border: 1px solid black;
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

export const DivTableSearch = styled.div`
  width: 100%;
  height: 80%;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    /* display: none; */
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;
export const DivUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const DivInfo = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
`;

export const DivOrgId = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
`;

export const DivIdUser = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
`;
export const DivUserInfo = styled.div`
  width: 90%;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;
export const SpanName = styled.span`
  font-size: 0.8em;
`;

export const InfoUser = styled.p`
  font-size: 0.8em;
  border: 1px solid black;
  width: 100%;
`;

export const SpanCod = styled.span`
  font-size: 1rem;
  font-style: italic;
`;
export const DivBtnEdit = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BtnEdit = styled.button`
  width: 30%;
  height: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border: 1px solid black;
  border-radius: 100%;

  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnRemove = styled.button`
  width: 30%;
  height: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnPassword = styled.button`
  width: 30%;
  height: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Actions};
  border: 1px solid black;
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnView = styled.button`
  width: 20%;
  height: 60%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  border: 1px solid black;
  color: black;
  border-radius: 100%;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
