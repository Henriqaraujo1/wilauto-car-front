import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import { NavLink as Link } from "react-router-dom";

export const DivOrgProduct = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 270px;
  width: 80%;
  height: 90%;
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
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;
export const DivBtnClose = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 15px;
  height: 10%;
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

export const DivSearchSubProduct = styled.div`
  width: 60%;
  height: 580px;
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
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    height: 40%;
  }
`;
export const DivBtnFilter = styled.div`
  height: 40px;
  display: ${({ show }) => (show ? "none" : "flex")};
  justify-content: flex-end;
  align-items: center;
  ${Phone_media.Phone_column}
`;
export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 1em;
`;

export const TitleProduct = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const NameInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  ${Phone_media.Phone_Inputs}
`;
export const CodInput = styled(Numeric)`
  width: 100px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  ${Phone_media.Phone_Inputs}
`;

export const DivBtnSearch = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  margin: 5px auto;
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
export const DivProduct = styled.div`
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

export const DivOrgId = styled.div`
  width: 10%;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IdProduct = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
`;
export const DivProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
export const SpanName = styled.p`
  font-size: 0.9rem;
`;
export const SpanCod = styled.p`
  font-size: 0.8rem;
  font-style: italic;
`;
export const DivBtnEdit = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-around;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 35%;
    align-items: center;
  }
`;
export const BtnItems = styled(Link)`
  width: 20%;
  padding: 3px;
  background-color: ${Colors.ButtonsColors.Search};
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
export const BtnEdit = styled.button`
  width: 20%;
  padding: 3px;
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

export const BtnView = styled.button`
  width: 35px;
  height: 35px;
  padding: 4px;
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
