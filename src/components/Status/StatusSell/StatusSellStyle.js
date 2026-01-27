import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const Control = styled.div`
  width: 48%;
  height: 95%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkDiv};
  border: 1px solid ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;

  ${Phone_media.Phone_column}
`;

export const Title = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const Total = styled.span`
  font-size: 50px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const Graph = styled.div`
  width: 100%;
  height: 210px;
  background-color: #000;
  margin: auto;
  border-radius: 25px;

  /* ${Phone_media.Phone_column} */
  ${Tablet_media.Tablet_column}
`;

export const LinkOrder = styled(Link)`
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  font-size: 1rem;

  background-color: ${Colors.ButtonsColors.Actions};
  width: 150px;
  height: 50px;
  border: 1px solid ${Colors.Text.Black};
  box-sizing: border-box;
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(3px);
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
