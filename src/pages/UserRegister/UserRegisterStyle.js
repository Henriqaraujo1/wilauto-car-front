import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivUserRegister = styled.div`
  width: 1100px;
  height: 600px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivScreenUser = styled.div`
  height: 100%;
  display: flex;
  /* padding: 4px; */
  flex-direction: row;
  justify-content: space-between;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;

export const TitleUser = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
