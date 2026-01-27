import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";


export const DivComercial = styled.div`
  width: 1200px;
  height: 650px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;

  background-color:${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 15px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
export const TitleComercial = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: auto;
`;
export const DivOrgComercial = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  ${Phone_media.Phone_column}
`;
