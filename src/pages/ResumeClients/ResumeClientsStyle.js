import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivResumeClients = styled.div`
  width: 1100px;
  height: 600px;
  margin: 15px auto;

  display: flex;
  align-content: center;
  flex-direction: column;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 95%;
    align-items: center;
  }
`;
export const DivScreenClient = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
export const TitleResumeClients = styled.h1`
  font-size: 1.2rem;
  display: flex;
  text-align: top;
  margin: 10px auto;
`;
