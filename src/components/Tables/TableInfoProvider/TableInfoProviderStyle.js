import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivTableProvider = styled.div`
  width: 95%;
  height: 350px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_table}
`;

export const DivOrgResume = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DivTableInfo = styled.div`
  width: 100%;
  height: 100%;
  /* margin: 10px;
  padding: 10px; */
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
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

export const DivProvider = styled.div`
  width: 90%;
  margin: 5px auto;
  border-radius: 25px;
  padding: 15px;
  background-color: ${Colors.BackgroundColors.BkInputs.White};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const DivOrgProviderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DivProviderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const DivOrgId = styled.div`
  width: max-content;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const IdProvider = styled.p`
  /* width: 100%; */
  margin-right: 5px;
  font-size: 0.9rem;
`;

export const InfoOrders = styled.p`
  font-size: 0.8rem;
`;

export const DivOrgInfo = styled.p`
  font-size: 0.75rem;
  margin: 5px;
  text-align: center;
`;
export const DivBtnDetail = styled.div`
  width: 30%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BtnEdit = styled.button`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 25px;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;
export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgCard = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const DivBtnView = styled.div`
  width: 20%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnView = styled.button`
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
`;
export const BtnExpense = styled.button`
  padding: 8px;
  margin: 0 5px;
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

export const DivFilter = styled.div`
  width: 100%;
  /* margin: 5px; */
  padding: 5px;
`;
export const DivOrgFilter = styled.div`
  width: 95%;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  ${Phone_media.Phone_column}
`;
export const DivBtnSearch = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }
`;

export const DivOrgInputs = styled.div`
  width: 20%;
  margin: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${Phone_media.Phone_Inputs}
`;

export const FilterLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;
export const FilterInput = styled.input`
  width: 80%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
`;
export const CodInput = styled(Numeric)`
  width: 80%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9em;
  margin-right: 10px;
`;
export const InputDate = styled.input`
  width: 70%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8rem;
  /* margin-right: 10px; */
`;