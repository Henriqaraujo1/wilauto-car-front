import styled from "styled-components";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivOrgTable = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivTableDetailStock = styled.div`
  width: 95%;
  height: 460px;
  padding: 10px;
  margin: 10px auto;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_table};
  ${Tablet_media.Tablet_table};
`;

export const DivCardDetailsProduct = styled.div`
  width: 100%;
  height: 15%;
  margin: 5px auto;
  padding: 5px;
  background: ${Colors.BackgroundColors.BkCards.White};
  border-radius: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    height: 20%;
  }
`;

export const DivOrgInfo = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoProduct = styled.p`
  font-size: 0.9em;
`;
export const InfoQtd = styled.p`
  font-size: 0.85em;
`;

export const InfoPrice = styled(Numeric)`
  width: 80%;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
`;

export const TableDetailStock = styled.div`
  width: 100%;
  height: 100%;
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
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.ShadowButton};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkComponent};
  }
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
