import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivCarRegister = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 280px;
  right: 170px;
  width: 80%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BKBlur};
  backdrop-filter: blur(10px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
  border-radius: 25px;

  animation: scale-in-tr 0.1s both;
  @keyframes scale-in-tr {
    0% {
      transform: scale(0);
      transform-origin: 100% 0%;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      transform-origin: 100% 0%;
      opacity: 1;
    }
  }
  ${Phone_media.Phone_Pop_UP}
  ${Tablet_media.Tablet_Pop_Up}
`;

export const TitleCar = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivScreenCar = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;

  ${Phone_media.Phone_column}
    /* ${Tablet_media.Tablet_row} */
`;


export const DivBtnClose = styled.div`
  width: 50%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const BtnClose = styled.button`
  width: 30px;
  height: 30px;
  background: ${Colors.ButtonsColors.Canceled};
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;