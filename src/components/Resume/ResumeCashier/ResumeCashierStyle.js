import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivResumeCashier = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  ${Phone_media.Phone_table}
`;

export const TitleResumeCashier = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

export const DivSpent = styled.div`
  background: ${Colors.BackgroundColors.BkComponent};
  width: 95%;
  height: 93%;
  padding: 10px;
  border-radius: 25px;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgPopUps = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 25%;
  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const DivOrgPop = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
  border: 1px solid black;
`;
export const TitlePop = styled.h4`
  margin-bottom: 2.5px;
`;
export const ValuesCashier = styled(Numeric)`
  font-size: 0.85rem;
`;

export const DivFilter = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
`;
export const DivOrgInputs = styled.div`
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputFilter = styled.input`
  width: 75%;
  height: 60%;
  padding: 5px;
  margin: 2px;
  border-radius: 25px;
`

export const LabelFilter = styled.p`
  font-size: 0.9rem;
`;
export const SelectOption = styled.select`
  width: 90%;
  height: 60%;
  padding: 5px;
  margin: 2px;
  border-radius: 25px;
  color: ${Colors.Text.Black};
`;
export const Options = styled.option`
  text-align: center;
  font-size: 0.8rem;
`;
export const DivOrgBtn = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.SearchButton};
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

export const DivOrgTable = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 8px;
  margin: 5px auto;
  border: 1px solid black;
  background-color: ${Colors.BackgroundColors.BkDiv};
`;

export const TableResumeCashier = styled.div`
  width: 100%;
  height: 100%;
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

export const DivCardCashier = styled.div`
  width: 100%;
  height: 25%;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1px auto;
  background-color: ${Colors.BackgroundColors.BkCards.White};
`;
export const InfoCashier = styled.p`
  font-size: 0.7rem;
`;
export const TitleCard = styled.h5`
  font-size: 0.75rem;
`;
export const DivOrgCard = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const DivOrgCardUser = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: ${Colors.Text.White};
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
