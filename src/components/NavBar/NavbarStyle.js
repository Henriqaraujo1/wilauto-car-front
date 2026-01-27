import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twirl } from "hamburger-react";
import { Colors } from "../../variable";

export const DivNav = styled.div`
  width: 260px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.05);
  left: 0;
  top: 0;
  transition: width 0.3s ease-in-out;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    box-shadow: none;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

export const ImgLogo = styled.img`
  width: 120px;
  height: auto;
  border-radius: 16px;
  margin-bottom: 1rem;
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bars = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0 1rem;
  }
`;

export const Bar = styled(Twirl)`
  color: ${Colors?.BackgroundColors?.BKBar || "#333"};
`;

export const NavMenu = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    background: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin-top: 10px;
    padding: 1rem;
  }
`;

export const LiDiv = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
`;

export const OptionMenu = styled.div`
  width: 100%;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  svg {
    stroke-width: 1.6;
    flex-shrink: 0;
  }

  &:hover {
    color: #0066ff;
    background: #f9fafb;
  }
`;

export const DivDrop = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 1.5rem;
  background: #f9fafb;
  border-left: 3px solid #0066ff;
`;

export const DropMenuSpan = styled(Link)`
  font-size: 0.95rem;
  color: #555;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s;

  &:hover {
    color: #0066ff;
  }
`;

export const NavLinkImg = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DivOrgMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

export const DivOrgUser = styled.div`
  width: 100%;
  padding: 12px 24px;
`
