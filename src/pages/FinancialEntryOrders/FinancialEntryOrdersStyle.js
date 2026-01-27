import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivFinancial = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgBuyProviders = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const DivOrgTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_column}
`;

export const TitleFinEntryOrders = styled.h1`
  font-size: 1.1rem;
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
  color: ${Colors.Text.Black};
  border-radius: 25px;
`;
export const OptionMonth = styled.option`
  text-align: center;
  background-color: transparent;
  border: 1px solid black;
`;