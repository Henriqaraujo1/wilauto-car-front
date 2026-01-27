import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors } from "../../variable";

export const DivAlert = styled.div`
  width: 20%;
  border: 1px solid black;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin: 0px auto 7px;
`;

export const BtnAlert = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${Colors.ButtonsColors.Actions};
  border-radius: 25px;
  font-size: 18px;
    cursor: pointer;


  &:active {
    background-color: ${Colors.ButtonsColors.Actions};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;



export const Span = styled.span`
  border: transparent;
  position: relative;
  top: -25px;
  left: 15px;
  background-color: ${Colors.Text.Red};
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 50%;
`;

export const BtnAdd = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;


  background: ${Colors.ButtonsColors.Actions};

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${Colors.ButtonsColors.Action};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;
export const LinkPage = styled(Link)`
  color: ${Colors.Text.White};
  &:active{
    color: ${Colors.Text.White};
  }
`;
