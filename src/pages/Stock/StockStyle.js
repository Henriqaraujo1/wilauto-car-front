import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivStock = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivFilter = styled.div`
  width: 95%;
  height: 60px;
  margin: 5px auto;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const TitleStock = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
