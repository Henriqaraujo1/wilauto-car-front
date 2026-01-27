import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivHistoricStock = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
export const TitleHistoricStock = styled.h1`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
export const DivScreenHistoricStock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
