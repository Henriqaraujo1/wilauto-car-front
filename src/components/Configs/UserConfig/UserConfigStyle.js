import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Colors } from "../../../variable";

export const DivUserConfig = styled.div`
  width: 100%;
`;

export const DivBtnUser = styled.div`
  width: 100%;
`;

export const ButtonUser = styled.button`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-weight: 500;

  &:hover {
    background: #f9f9f9;
  }
`;

export const ModalUser = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 1rem;
`;

export const SpanLink = styled(Link)`
  font-size: 0.95rem;
  color: #555;
  text-decoration: none;
  padding: 8px 0;

  &:hover {
    color: #0066ff;
  }
`;

export const SpanConfig = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  padding: 4px 0;
`;

export const SpanOut = styled.span`
  cursor: pointer;
  color: #555;

  &:hover {
    color: #0066ff;
  }
`;

export const InputFont = styled.input`
  width: 40px;
  height: 28px;
  margin-left: 6px;
  padding: 2px 4px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const DivBtnConfirm = styled.div`
  margin-left: 6px;
`;
