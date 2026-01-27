import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivOrgResumeProviderDetail = styled.div`
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
  height: max-content;
  margin: 5px auto;
  padding: 10px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
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

export const DivCardProduct = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  background-color: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;
  padding: 5px;
  flex-direction: column;
  border: 1px solid black;
  ${Phone_media.Phone_Info_Itens}
`;

export const DivOrgCard = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
`

export const DivOrgId = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  ${Phone_media.Phone_row}
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
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  ${Phone_media.Phone_row}
`;

export const DivOrgInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const InfoResumeProviderDetailResult = styled.p`
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

export const DivOrgBtnPay = styled.div`
  width: 20%;
`;
export const BtnPay = styled.button`
  padding: 8px;
  /* margin: 0 5px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border: 1px solid black;
  color: black;
  border-radius: 25px;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;

export const DivOrgResults = styled.div`
  width: 80%;
  height: 20%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InfoResult = styled.p`
  text-align: center;
  padding: 4px;
  font-size: 12px;
  font-style: italic;
  border: 1px solid ${Colors.Text.Black};
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};

  overflow-y: auto;
  animation: scale-in-tr 0.2s both;
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
`;