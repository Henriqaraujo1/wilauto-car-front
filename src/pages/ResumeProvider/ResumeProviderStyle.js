import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivResumeProvider = styled.div`
  width: 1100px;
  height: 650px;
  margin: 10px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
export const DivScreenResumeProvider = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
export const TitleResumeProvider = styled.h1`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 5px;
`;
