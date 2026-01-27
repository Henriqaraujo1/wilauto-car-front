import styled from "styled-components";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors } from "../../../../variable";

export const DivStockOut = styled.div`
  width: 100%;
  border-radius: 25px;
  margin: 5px 0;
  background-color: ${Colors.BackgroundColors.BkCards.BkStockOut};
  border: 1px solid black;
  padding: 5px;
`;
export const DivTitle = styled.div`
  display: flex;
  justify-content: center;
`;
export const TitleStock = styled.h4`
  font-size: 1.2rem;
  `;
export const DivFilter = styled.div`
  margin: 2.5px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  `;
export const InfoFilter = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 10px;
`;
export const InfoCard = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;

export const DivInfoStock = styled.div`
  padding: 5px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const DivInfo = styled.div`
  width: 30%;
  margin: 5px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;  
export const FormatValue = styled(Numeric)`
    font-size: 0.9rem;
    font-weight:bold;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const DivOrgResults = styled.div`
  width: 80%;
  height: 20%;
  margin: 0 auto;
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
