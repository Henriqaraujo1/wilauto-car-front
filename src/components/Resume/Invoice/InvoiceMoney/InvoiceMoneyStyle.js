import styled from "styled-components";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors } from "../../../../variable";

export const DivInvoiceMoney = styled.div`
  width: 100%;
  height: 45%;
  border-radius: 25px;
  background-color: ${Colors.BackgroundColors.BkCards.BkCashier};
  border: 1px solid black;
  padding: 10px;
`;
export const DivTitle = styled.div`
  display: flex;
  justify-content: center;
`;
export const TitleInvoice = styled.h4`
  font-size: 1.2rem;
  `;

export const InfoFilter = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 10px;
`;
export const InfoCard = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  /* margin: 0 10px; */
`;
export const InfoCardSmall = styled.p`
  font-size: 0.73rem;
  font-weight: bold;
  margin: 2px 0;
`;
export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
`;


export const DivInfoInvoice = styled.div`
  border: 1px solid black;
  padding: 5px;
  border-radius: 25px;
  display: flex;
  justify-content:center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const DivInfo = styled.div`
    width: 40%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 25px;
    display: flex;
    justify-content:center;
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
  height: 15%;
  margin: 2px auto;
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