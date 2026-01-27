import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const PopUp = styled.div`
display: ${({ show }) => (show ? "none" : "flex")};
  position: fixed;
  inset: 0;
  z-index: 9999;

  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);

  animation: ${({ show }) =>
    show ? "fadeOut 0.2s ease-in forwards" : "fadeIn 0.25s ease-out"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;

export const WelcomeInfo = styled.div`
  width: 100vw;
  max-width: 1400px;
  max-height: 100vh;

  background: #fff;
  border-radius: 20px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: scaleUp 0.25s ease-out;

animation: ${({ show }) =>
    show ? "scaleOut 0.2s ease-in forwards" : "scaleIn 0.25s ease-out"};

  @keyframes scaleIn {
    from {
      transform: scale(0.95) translateY(10px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  @keyframes scaleOut {
    to {
      transform: scale(0.95) translateY(10px);
      opacity: 0;
    }
  }
`;

export const CanvaWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  overflow: hidden;
  border-radius: 12px;
`;

export const CanvaIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const Footer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

export const BtnWelcome = styled.button`
  width: 250px;
  height: 50px;
  padding: 0 5px;
  margin: 5px;
  border: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  cursor: pointer;

  @media screen and (max-width: 940px) {
    font-size: 18px;
  }

  font-size: 15px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;
