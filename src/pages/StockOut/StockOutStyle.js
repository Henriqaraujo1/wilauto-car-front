import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivStockOut = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  justify-content: center;
  flex-direction: column;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  @media screen and (min-width: 769px) and (max-width: 1024px){
    width: 95%;
    align-items: center;
  }
`;

export const DivScreenStockOut = styled.div`
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;

export const TitleStock = styled.h1`
  font-size: 1.1rem;
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_column};
`;


export const DivOrgSelect = styled.div`
  width: max-content;
  border: 1px solid black;
  margin: 5px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectMonth = styled.select`
  width: max-content;
  height: 100%;
  font-size: 1.1rem;
  margin: 3px;
  background-color: transparent;
  border-radius: 25px;
  color: ${Colors.Text.Black};
`;
export const OptionMonth = styled.option`
  text-align: center;
  background-color: transparent;
  border: 1px solid black;
`;

export const DivOrgBtnFilter = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BtnSearch = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid black;
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
  width: 25px;
  border: 1px solid black;
  height: 25px;
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

