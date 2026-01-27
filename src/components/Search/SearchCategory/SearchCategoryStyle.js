import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivSearchCategory = styled.div`
  width: 50%;
  height: 500px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 0 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_table}
`;
export const DivFilter = styled.div`
  width: 100%;
  height: 20%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    height: 40%;
    margin: 5px auto;
  }
`;

export const TitleSearchCategory = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

export const DivOrgFilter = styled.div`
  width: 100%;
  flex-direction: row;
  display: ${({ show }) => (show ? "none" : "flex")};
  justify-content: center;
  align-content: center;
  align-items: center;
  ${Phone_media.Phone_column}
`;
export const DivBtnSearch = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  ${Phone_media.Phone_Filter_Btn};
`;
export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 1em;
`;
export const NameInput = styled.input`
  width: 30%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  ${Phone_media.Phone_Input}
`;
export const CodInput = styled(Numeric)`
  width: 25%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
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
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.SearchButton};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkTable};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    height: 60%;
  }
`;
export const DivCategory = styled.div`
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
  width: 60%;
  display: flex;
  flex-direction: row;
`;

export const DivIdCategory = styled.div`
  width: 10%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
`;
export const DivCategoryInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DivOrgInfo = styled.div`
  width: 75%;
  /* padding: 0 2px; */
  display: flex;
  justify-content: space-between;
`;

export const SpanName = styled.span`
  font-size: 1rem;
`;
export const SpanCod = styled.span`
  font-size: 1rem;
  font-style: italic;
`;
export const DivBtnEdit = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 320px) and (max-width: 940px) {
align-items: center;
  }
`;
export const BtnEdit = styled.button`
  width: 20%;
  padding: 5px;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnNewSubCategory = styled.button`
  width: 20%;
  padding: 5px;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnRemove = styled.button`
  width: 20%;
  padding: 5px;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;

export const BtnView = styled.button`
  width: 20%;
  padding: 5px;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Search};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
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
