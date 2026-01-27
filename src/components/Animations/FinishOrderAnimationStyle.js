import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors, Phone_media, Tablet_media } from "../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrderAnimation = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 300px;
  right: 170px;
  width: 80%;
  height: 95%;
  padding: 15px;
  background-color: ${Colors.BackgroundColors.BKGreenBlur};
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

export const DivOrgScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const DivOrgBtnClose = styled.div`
  width: 100%;
  /* margin-right: 15px; */
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

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;
export const TitleAnimation = styled.h2`
  font-style: italic;
  margin: 10px auto;
`;
export const DivOrgInfoAnimation = styled.div`
  width: 60%;
  border: 1px solid black;
  padding: 10px;
  margin: 10px auto;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 85%;
  }
`;

export const StatusOrder = styled.p`
  font-size: ${({ theme }) => theme.fontSize};
`;
export const DivOrgBtnOrder = styled.div`
  height: 100%;
  width: 40%;
  padding: 10px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 55%;
  }
`;
export const BtnNewOrder = styled(Link)`
  height: 25px;
  padding: 5px;
  border-radius: 25px;
  margin: 5px;
  text-decoration: none;
  color: ${Colors.Text.White};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Invoice};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const BtnDelivery = styled.button`
  height: 25px;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;
export const BtnPdf = styled.button`
  height: 25px;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;
export const BtnPrint = styled.button`
  height: 25px;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Printer};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Printer};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;
export const BtnWpp = styled.button`
  width: 35%;
  height: 25px;
  padding: 5px;
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

export const IconWpp = styled.img`
  width: 10%;
  height: auto;
  margin: 10px;
`;

export const BtnMail = styled.button`
  height: 25px;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.White};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;
export const DivOrgLoading = styled.div`
  width: 50%;
  height: 5%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TitlePrint = styled.h5`
  font-size: ${({ theme }) => theme.fontSize};
`;
export const AlertChange = styled.p`
  font-size: ${({ theme }) => theme.fontSize};
  text-decoration: underline;
`;

export const DivInfoCompany = styled.div`
  width: 60%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* margin: 10px; */
`;
export const DivInfoClient = styled.div`
  width: 40%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* margin: 10px; */
`;
export const InfoCompany = styled.h5`
  font-size: ${({ theme }) => theme.fontSize};
`;
export const InfoWorldSoft = styled.p`
  font-size: ${({ theme }) => theme.fontSize};
  text-align: center;
  margin: 2px auto;
`;
export const InfoDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize};
`;

export const DivOrgInfoCompany = styled.div`
  width: 100%;
  /* height: 100%; */
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const DivOrgTable = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  padding: 10px;
  background-color: ${Colors.Text.White};
  border-radius: 25px;

  @media print {
    @page {
      size: ${({ papersType }) =>
        papersType ? "A4 portrait" : "50mm 150mm portrait"};
      margin: 0px;
    }
    width: 95%;
    height: max-content;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 10px;
`;
export const TableHead = styled.thead`
  width: 100%;
  display: block;
  margin-bottom: 10px;
  border-bottom: 1px dashed black;
  border-top: 1px dashed black;
  border-left: 1px dashed black;
`;

export const TableBody = styled.tbody`
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
  height: 190px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow-y: auto;

  @media print {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
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

export const ThTable = styled.th`
  font-size: ${({ theme }) => theme.fontSize};
  border-right: 1px dashed black;
  width: 100px;

  @media print {
    font-size: 0.6rem;
  }
`;
export const ThTableDesc = styled.th`
  font-size: ${({ theme }) => theme.fontSize};
  width: 400px;
  border-right: 1px dashed black;

  @media print {
    font-size: 0.6rem;
  }
`;

export const ThTablePrices = styled.th`
  font-size: ${({ theme }) => theme.fontSize};
  width: 150px;
  border-right: 1px dashed black;

  @media print {
    font-size: 0.6rem;
  }
`;

export const TrTable = styled.tr`
  /* height: 10%; */
  width: 100%;
  @media print {
    font-size: 0.6rem;
  }
`;

export const TdTableDesc = styled.td`
  width: 400px;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize};
  border-left: 1px dashed black;
  border-bottom: 1px dashed black;
  @media print {
    font-size: 0.6rem;
  }
`;

export const TdTablePrices = styled.td`
  width: 150px;
  font-size: ${({ theme }) => theme.fontSize};
  text-align: center;
  border-left: 1px dashed black;
  border-bottom: 1px dashed black;
  @media print {
    font-size: 0.6rem;
  }
`;

export const TdTable = styled.td`
  font-size: ${({ theme }) => theme.fontSize};
  width: 100px;
  text-align: center;
  border-bottom: 1px dashed black;
  border-left: 1px dashed black;
  @media print {
    font-size: 0.6rem;
  }
`;

export const TablePayments = styled.table`
  width: 100%;
  margin-top: 25px;
`;

export const TableFoot = styled.tfoot`
  width: 60%;
`;

export const TrPayments = styled.tr`
  width: 100%;
`;

export const TdPayments = styled.td`
  font-size: ${({ theme }) => theme.fontSize};
  width: 80%;
  border-bottom: 1px dashed black;
  @media print {
    font-size: 0.6rem;
  }
`;
export const TdValues = styled.td`
  font-size: ${({ theme }) => theme.fontSize};
  width: 20%;
  border-bottom: 1px dashed black;
  @media print {
    font-size: 0.6rem;
  }
`;

export const DivOrgItems = styled.div`
  width: 100%;
`;

export const Line = styled.hr`
  width: 100%;
  margin: 10px auto;
  border-top: 1px dashed ${Colors.Text.Black};
`;

export const PricesFormat = styled(Numeric)`
  font-size: ${({ theme }) => theme.fontSize};
`;

export const DivOptions = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DivOrgSelect = styled.div`
  width: 100%;
  display: flex;
  margin: 5px auto;
  justify-content: center;
  align-items: center;
`;

export const SelectPaper = styled.select`
  width: 80px;
  height: 36px;
  text-align: center;
  border-radius: 25px;
  background-color: ${Colors.ButtonsColors.Actions};
`;

export const OptionsPaper = styled.option`
  border-radius: 25px;
`;

export const DivOrgBtn = styled.div`
  width: 40%;
`;

export const DivDelivery = styled.div`
  width: 100%;
  /* height: 0%; */
  border: 1px dashed black;
  padding: 5px;
  margin: 5px 0;
`;

export const DivOrgTitleDelivery = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleDelivery = styled.h6`
  font-size: ${({ theme }) => theme.fontSize};
`;

export const InfoDelivery = styled.p`
  font-size: ${({ theme }) => theme.fontSize};
`;
