import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivResumeFin = styled.div`
  width: 1100px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_column}
`;

export const TitleResumeFin = styled.h1`
  font-size: 1.1rem;
`;

export const DivOrgPopUp = styled.div`
  width: 100%;
  padding: 10px;

`

