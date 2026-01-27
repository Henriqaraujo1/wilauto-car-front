import styled from "styled-components";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors, Phone_media } from "../../../../variable";

export const DivProfitMonth = styled.div`
  width: 35%;
  height: 40%;
  border-radius: 25px;
  background-color: ${Colors.BackgroundColors.BkCards.BkMoney};
  border: 1px solid black;
  padding: 10px;
  ${Phone_media.Phone_column}
`;
export const DivTitle = styled.div`
  display: flex;
  justify-content: center;
`;
export const TitleProfit = styled.h4`
  font-size: 1.2rem;
`;
export const DivFilter = styled.div`
  padding: 5px;
  margin: 5px;
  display: flex;
  justify-content: space-around;
`;
export const InfoFilter = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 10px;
`;
export const InfoCard = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  /* margin: 0 10px; */
`;
export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
`;
export const SelectDay = styled.input`
  height: 25px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 25px;
`;

export const DivOrgBtn = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: space-between;
`;

export const BtnSearch = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnCancel = styled.button`
  width: 25px;
  border: 1px solid black;
  height: 25px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivInfoProfit = styled.div`
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
  padding: 5px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const FormatValue = styled(Numeric)`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const DivOrgSelect = styled.div`
  width: max-content;
  border: 1px solid black;
  margin: 0 5px 5px 5px;
  border-radius: 25px;
`;

export const SelectMonth = styled.select`
  width: max-content;
  height: 100%;
  font-size: 1.1rem;
  margin: 3px;
  background-color: transparent;
  /* border: 1px solid black; */
  border-radius: 25px;
`;
export const OptionMonth = styled.option`
  text-align: center;
  background-color: transparent;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items:center;
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
  margin: 0   auto;
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


