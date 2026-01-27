import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { PatternFormat as FormatInfo } from "react-number-format";
import { NavLink as Link } from "react-router-dom";

export const DivSearchProvider = styled.div`
  width: 50%;
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
  height: 25%;
`;
export const DivBtnFilter = styled.div`
  width: 100%;
  height: 40px;
  display: ${({ show }) => (show ? "none" : "flex")};
  /* justify-content: flex-end; */
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
  }
`;

export const TitleProvider = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 0.9rem;
`;
export const NameInput = styled.input`
  width: 40%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
`;

export const DivBtnSearch = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
`;

export const BtnSearch = styled.button`
  width: 30px;
  /* height: 30px; */
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
  /* height: 30px; */
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
  height: 85%;
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
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.ShadowButton};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;
export const DivProvider = styled.div`
  width: 100%;
  /* height: 50px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const DivInfo = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

export const DivIdProvider = styled.div`
  width: 10%;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivProviderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const FormatCnpj = styled(FormatInfo)`
  width: 30%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
`;
export const FormatCnpjText = styled(FormatInfo)`
  font-size: 0.9rem;
`;

export const SpanName = styled.p`
  font-size: 1rem;
`;
export const IdInfo = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
`;

export const DivBtnEdit = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 35%;
    align-items: center;
  }
`;
export const BtnEdit = styled.button`
  width: 20%;
  padding: 3px;
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
    padding: 5px;
  }
`;

export const BtnRemove = styled.button`
  width: 20%;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Canceled};
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
    padding: 5px;
  }
`;

export const BtnView = styled.button`
  width: 20%;
  padding: 3px;
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
    padding: 2px;
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
