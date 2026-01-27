import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivOrgUser = styled.div`
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

export const DivOrgTitle = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
`;
export const TitleAccount = styled.h2`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivScreenAccount = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  /* padding: 4px; */
  flex-direction: row;
  justify-content: center;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;