import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivHistoricEntry = styled.div`
  width: 49%;
  height: 90%;
  margin: 10px auto;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ${Phone_media.Phone_column};
`;

export const DivFilterEntry = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
  ${Phone_media.Phone_column}
  /* ${Phone_media.Phone_Filter} */
`;

export const FormProductEntry = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  align-content: center;
  `;
export const DivOrgInput = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export const LabelFilter = styled.label`
  font-size: 0.9rem;
`;
export const FilterInput = styled.input`
  width: 95%;
  height: 25px;
  margin: 5px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8rem;
`;

export const CodInput = styled(Numeric)`
  width: 85%;
  height: 25px;
  display: flex;
  margin: 5px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8em;
`;

export const DivOrgBtn = styled.div`
  width: 18%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${Phone_media.Phone_Filter_Btn}
`;
export const DivOrgBtnEdit = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${Phone_media.Phone_Filter_Btn}
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnCancel = styled.button`
  width: 30px;
  border: 1px solid black;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const TitleHistoricEntry = styled.h1`
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
export const TableHistoricEntry = styled.div`
  width: 100%;
  height: 85%;
  padding: 10px;
  border-radius: 25px;
  margin: 10px auto;
  background-color: ${Colors.BackgroundColors.BkTable};
  overflow: auto;
  overflow-y: auto;
  ${Phone_media.Phone_table};

  ::-webkit-scrollbar {
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 6px;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.Actions};
  }
`;
export const ItemEntry = styled.div`
  width: 100%;
  border-radius: 25px;
  margin: 10px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkInputs.White};
`;
export const DivNameProduct = styled.div`
  display: flex;
  /* border: 1px solid black; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TitleProduct = styled.h5`
  font-size: 0.8rem;
`;

export const InfoProductTitle = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const InfoProduct = styled.span`
  font-size: 0.8rem;
`;

export const FormatValues = styled(Numeric)`
  font-size: 0.8rem;
`;

export const DivInfoProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DivOrgInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  text-align: center;

  margin: 5px;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const BtnEdit = styled.button`
  width: 30px;
  margin: 1px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  border: 1px solid black;

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;

export const DivOrgName = styled.div`
  width: 70%;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
`