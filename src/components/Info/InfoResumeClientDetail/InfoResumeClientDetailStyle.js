import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgResumeClientDetail = styled.div`
  width: 100%;
  height: 250px;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  animation: grow 0.1s ease-in;
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

export const DivOrgTitle = styled.div`
  width: 100%;
  height: 15%;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleInfoOrder = styled.h4``;

export const DivInfoTable = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;

  overflow: auto;

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

export const DivCardProduct = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  padding: 5px;
  flex-direction: row;
  border: 1px solid black;
`;
export const DivOrgId = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 20%;
    height: 50%;
  }
`;
export const IdProduct = styled.p`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivOrgInfoProduct = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
`;
export const NameProduct = styled.p`
  font-size: 0.9em;
`;
export const ProductInfo = styled.p`
  font-size: 0.8em;
`;
export const PriceFormat = styled(Numeric)`
  font-size: 0.8em;
`;
export const PercentFormat = styled(Numeric)`
  font-size: 0.9em;
`;

export const DivOrgPrices = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const DivOrgInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    margin: 2px 0;
  }
`;

export const DivOrgInfoName = styled.div`
  width: 100%;
  padding: 5px;
`;
export const DivBtnClose = styled.div`
  width: 100%;
  height: 20%;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  background: ${Colors.ButtonsColors.Canceled};
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;

export const InfoResumeClientDetailResult = styled.p`
  font-size: 0.8em;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoLoading = styled.p`
  color: ${Colors.Text.White};
`;
