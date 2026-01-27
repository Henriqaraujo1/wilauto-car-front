import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivOrgCompany = styled.div`
  width: 1100px;
  height: 650px;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 10px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;
export const DivOrgTitle = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: center;
`;
export const TitleCompany = styled.h2`
  font-size: 1.5rem;
`;

export const DivOrgScreen = styled.div`
  width: 100%;
  height: 90%;
`;

export const DivOrgDates = styled.div`
  width: 50%;
  margin: 0 auto;
  ${Phone_media.Phone_column}
`;

export const DivFilter = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-around;
  ${Phone_media.Phone_column}
`;

export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
  ${Phone_media.Phone_Filter}
`;

export const InfoFilter = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 10px;
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
  ${Phone_media.Phone_Filter_Btn}
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

export const DivFirstScreen = styled.div`
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${Phone_media.Phone_column}

`;
export const DivResumeFin = styled.div`
  width: 50%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  align-items: space-around;
  ${Phone_media.Phone_column}

  `;
export const DivResumeExpense = styled.div`
  width: 49%;
  height: 100%;
  ${Phone_media.Phone_column}
`;
export const DivResumeStock = styled.div`
  width: 25%;
  height: 100%;
  border: 1px solid black;
`;
export const DivResumeProfit = styled.div`
  width: 100%;
  height: 95%;
  padding: 0 5px;
  
  margin: 5px auto;
`;
export const DivProfit = styled.div``;
