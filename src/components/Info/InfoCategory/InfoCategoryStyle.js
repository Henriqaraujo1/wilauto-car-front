import styled from "styled-components";
import { Colors } from "../../../variable";

export const DivOrgCategory = styled.div`
  width: 100%;
  height: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;

  animation: grow 0.1s linear;
  @keyframes grow {
    0% {
      height: 10px;
    }
    50% {
      height: 30px;
    }
    100% {
      height: 60px;
    }
  }
`;

export const DivInfoTable = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;

  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  height: 15%;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleInfoCategory = styled.h4``;
export const DivInfoCategory = styled.div``;
export const NameSubCategory = styled.p`
  font-size: 0.8rem;
`;

export const DivCardSubCategory = styled.div`
  width: 100%;
  padding: 3px;
  margin: 5px auto;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
`;
export const DivOrgCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const DivOrgInfoSubCategory = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`;
export const DivOrgId = styled.div`
  width: 15%;
  height: 100%;
  padding: 3px;
`;
export const IdSubCategory = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border-radius: 100%;
  border: 1px solid black;
  background-color: ${Colors.BackgroundColors.BkComponent};
`;
export const DivOrgInfoName = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
`;
export const DivOrgBtn = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;
export const BtnEdit = styled.button`
  width: 25%;
  padding: 5px;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;
export const BtnDelete = styled.button`
  width: 25%;
  padding: 5px;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
`;

export const DivBtnClose = styled.div`
  width: 100%;
  height: 15%;
  margin: 5px auto;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 5%;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  color: ${Colors.Text.White};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
