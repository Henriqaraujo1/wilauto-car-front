import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivUpdatePrint = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 10px;
  left: 300px;
  right: 170px;
  width: 80%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BKBlur};
  backdrop-filter: blur(32px);
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

export const DivDetailsItens = styled.div`
  width: calc(100% - 20px);
  height: 430px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 932px) {
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

  @media screen and (min-width: 320px) and (max-width: 932px) {
    padding: 0px;
  }
`;

export const PrintDetail = styled.div`
  width: 100%;
  /* height: 50%; */
  margin: 5px;
  padding: 10px;
  background-color: ${Colors.Text.White};
  border: 1px solid black;
  border-radius: 25px;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const InputInfoTable = styled.textarea`
  width: 305px;
  height: 56px;
  background: ${Colors.BackgroundColors.BkInputs.White};
  border-radius: 25px;
  margin-top: 5px;
  resize: none;
  padding: 10px;
`;

export const DivOrgPrint = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LabelPrint = styled.label`
  font-size: 15px;
`;

export const DivBtnPrint = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubmitPrint = styled.button`
  width: 150px;
  height: 47px;
  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
export const BtnPdf = styled.button`
  width: 150px;
  height: 47px;
  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
export const NameInfo = styled.th`
  font-size: 0.8rem;
`;
export const BodyInfo = styled.tbody`
  border-bottom: 1px solid #dddddd;
`;
export const Item = styled.td`
  font-size: 0.8rem;
  text-align: center;
`;

export const Value = styled(Numeric)`
  font-size: 0.85rem;
`;
