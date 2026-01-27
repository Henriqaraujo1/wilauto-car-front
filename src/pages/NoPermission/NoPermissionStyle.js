import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";
import { NavLink as Link } from "react-router-dom";

export const DivNoPermission = styled.div`
  width: 1100px;
  height: 600px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_row}
`;
export const DivTitle = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;
export const TitleNoPermission = styled.h2``;
export const DivInfo = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const DivInfoPage = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;
export const InfoPage = styled.p`
    font-size: 1.2rem;
`;
export const DivBtn = styled.div`
  width: 100%;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
`;
export const BtnBack = styled(Link)`
  /* width: 150px; */
  font-size: 1.2rem;
  padding: 7px;
  border: 1px solid black;
  border-radius: 25px;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;
  text-decoration: none;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;  
