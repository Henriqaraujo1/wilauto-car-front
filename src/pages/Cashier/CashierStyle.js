import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivCashier = styled.div`
  width: 1100px;
  height: 700px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
  padding: 5px;
`

export const TitleCashier = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

export const InputDate = styled.input`
  width: 30%;
  height: 30px;
  padding: 5px;
  border-radius: 25px;
  margin: 5px;
`

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

export const DivSpentRow = styled.div`
  height: 95%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivSpentRowTwo = styled.div`
  width: 40%;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  ${Phone_media.Phone_column}
`;


