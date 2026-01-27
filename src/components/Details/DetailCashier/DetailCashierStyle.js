import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgDetail = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 115px;
  left: 150px;
  right: 170px;
  width: 80%;
  height: 80%;
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
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleDetail = styled.h2``;

export const DivBtnClose = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
`;

export const BtnClose = styled.button`
  width: 35px;
  height: 35px;
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

export const TableCashier = styled.div`
  width: 95%;
  height: 90%;
  margin: 10px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  ${Phone_media.Phone_table};
  ${Tablet_media.Tablet_table};
`;

export const InfoCashierDetails = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  padding: 10px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
`;

export const CashierDetail = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${Colors.Text.White};
  border: 1px solid black;
  border-radius: 25px;
`;

export const TitleIn = styled.h3`
  font-size: 1.2rem;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  height: 85%;
  padding: 10px;

  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 940px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }

  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 0px;
  }
`;

export const TableInfo = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* font-size: 18px; */
  text-align: center;
`;
export const HeaderInfo = styled.thead``;
export const RowInfo = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;
export const NameInfo = styled.th``;
export const BodyInfo = styled.tbody`
  border-bottom: 1px solid #dddddd;
`;
export const Item = styled.td`
  text-align: center;
`;

export const Value = styled(Numeric)`
  font-size: 0.85rem;
`;
