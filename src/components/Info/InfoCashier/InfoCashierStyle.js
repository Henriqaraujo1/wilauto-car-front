import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivOrgExplain = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 115px;
  left: 150px;
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

export const DivBtnClose = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 25px;
  height: 25px;
  background: ${Colors.ButtonsColors.Canceled};
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;

export const TitleExplain = styled.strong`
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivOrgInfo = styled.div`
  width: 80%;
  height: 80%;
  padding: 10px;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
`;

export const DivExplain = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid black;
  border-radius: 25px;
  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }
`;
export const DivOrgContent = styled.div`
    width: 100%;
    padding: 2px;
    display: flex;
    margin-bottom: 5px;
    justify-content: center;
`;

export const TitleInfo = styled.strong`
    font-size: 0.9rem;
    font-weight: bold;
`;

export const ExplainInfo = styled.p`
    font-size: 0.9rem;
`;
