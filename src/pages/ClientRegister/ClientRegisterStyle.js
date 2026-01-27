import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivClientRegister = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
`;

export const DivScreenClient = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;

export const TitleClientReg = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
