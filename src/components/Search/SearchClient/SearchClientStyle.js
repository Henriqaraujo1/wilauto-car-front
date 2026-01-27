import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { PatternFormat as FormatInfo } from "react-number-format";
import { NavLink as Link } from "react-router-dom";
import Select from "react-select";

export const DivSearchClient = styled.div`
  width: 60%;
  height: 600px;
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
  height: 20%;
`;

export const DivOrgSelectState = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
`
export const DivOrgSelectCity = styled.div`
  width: 80%;
  margin: 0 5px;
  display: flex;
  flex-direction: row;
`

export const DivOrgInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2px;
  
  `;

export const SelectOption = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.Text.White};
  color: ${Colors.Text.Black};
`;

export const SelectState = styled(Select)`
  text-align: center;
  width: 100%;

  border-radius: 25px;
  /* background-color: ${Colors.Text.White}; */
`;
export const SelectCity = styled(Select)`
  text-align: center;
  width: 100%;
  border-radius: 25px;
`;

export const TitleClient = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  /* margin: 10px auto; */
`;

export const SelectDoc = styled.select`
  width: 90px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  border: 1px solid black;
  background-color: transparent;
  color: ${Colors.Text.Black};
`;

export const Options = styled.option``;

export const DivBtnFilter = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? "none" : "flex")};
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }
`;

export const DivOrgFilter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin-right: 5px;
`;
export const NameInput = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
`;

export const DivBtnSearch = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    margin: 5px auto;
    justify-content: center;
  }
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid black;
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

export const FormatCPF = styled(FormatInfo)`
  width: 150px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
`;
export const FormatCPFText = styled(FormatInfo)`
  font-size: 0.9rem;
`;

export const DivTableSearch = styled.div`
  width: 100%;
  height: 80%;
  padding: 10px;
  margin-top: 5px;
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
  @media screen and (min-width: 320px) and (max-width: 940px) {
    margin-top: 5px;
    height: 70%;
  }
`;
export const DivClient = styled.div`
  width: 100%;
  /* height: 70px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const DivCardClient = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const DivInfo = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

export const DivIdClient = styled.div`
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
export const DivClientInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
export const SpanName = styled.p`
  font-size: 1rem;
`;
export const IdInfo = styled.p`
  font-size: 1rem;
  font-style: italic;
`;
export const DivBtnEdit = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items:center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 35%;
    align-items: center;
  }
`;
export const BtnEdit = styled.button`
  width: 40px;
  height: 40px;
  margin: 1px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;
export const BtnRemove = styled.button`
width: 40px;
  height: 40px;
  margin: 1px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border-radius: 100%;

  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;
export const BtnView = styled.button`
 width: 40px;
  height: 40px;
  margin: 1px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 100%;
  border: 1px solid black;

  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
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

export const BtnNewSon = styled.button`
  width: 20%;
  margin: 1px;
  padding: 8px;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;

export const BtnViewSon = styled.button`
  width: 20%;
  margin: 1px;
  padding: 3px;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Search};
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
    padding: 2px;
  }
`;

export const DivOrgBtnTable = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
`;

export const BtnPrices = styled(Link)`
  /* width: 105px; */
  text-decoration: none;
  height: 32px;
  font-size: 18px;
  padding: 5px;
  justify-content: center;
  flex-direction: column;
  align-content: center;

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
