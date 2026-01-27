import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import { NavLink as Link } from "react-router-dom";

export const DivOrgDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 120px;
  left: 10px;
  right: 0;
  width: 80%;
  height: 75%;
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
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 96%;
    height: 80%;
    left: 5px;
    right: 380px;
  }

  ${Tablet_media.Tablet_Pop_Up}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleDetail = styled.h2``;

export const DivBtnClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
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

export const DivFilter = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content:center;
`;
export const DivOrgFilter = styled.div`
  width: 95%;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
`;
export const DivBtnSearch = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }
`;

export const FilterLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;
export const FilterInput = styled.input`
  width: 80%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
`;

export const CodInput = styled(Numeric)`
  width: 80%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9em;
  margin-right: 10px;
`;


export const InputDate = styled.input`
  width: 70%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8rem;
  /* margin-right: 10px; */
`;
export const DivOrgBtn = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 50%;
  }
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};

  &:hover {
    cursor: pointer;
  }

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

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const TableSell = styled.div`
  width: 95%;
  height: 90%;
  margin: 10px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  ${Phone_media.Phone_table};
  ${Tablet_media.Tablet_table};
`;

export const InfoSellDetails = styled.div`
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

export const SellDetail = styled.div`
  width: 100%;
  height: 100%;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;