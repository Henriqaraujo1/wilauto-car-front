import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivBrand = styled.div`
  width: 1100px;
  height: 650px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivScreenBrand = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
export const TitleBrand = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
