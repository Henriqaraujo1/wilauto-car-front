import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivPosition = styled.div`
  width: 1100px;
  height: 600px;
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

export const DivScreenPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
export const TitlePosition = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
