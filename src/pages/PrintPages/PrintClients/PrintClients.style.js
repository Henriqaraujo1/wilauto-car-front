import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivProductRegister = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;

  ${Phone_media.Phone_column}
`;

export const TitleProduct = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivScreenProduct = styled.div`
  height: 100%;
  display: flex;
  padding: 5px;
  flex-direction: row;
  justify-content: center;

  ${Phone_media.Phone_column}/* ${Tablet_media.Tablet_row} */
`;
