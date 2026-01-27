import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";

export const DivSearchExpense = styled.div`
  width: 50%;
  height: 548px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 0px 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_table}
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 650px;
  }
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ showAnimation }) =>
    showAnimation ? "center" : "space-around"};
  /* justify-content: center; */
`;

export const BtnCloseFilter = styled.button`
  display: ${({ showAnimation }) => (showAnimation ? "none" : "flex")};
  width: 4%;
  border-radius: 100%;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  &:active {
    /* background-color: ${Colors.ButtonsColors.Canceled}; */
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const TitleExpense = styled.h3``;

export const DivOrgAnimationFilter = styled.div`
  display: ${({ showAnimation }) => (showAnimation ? "flex" : "none")};
  width: 90%;
  margin: 5px;
  justify-content: flex-end;
  align-items: center;
`;

export const InfoFilter = styled.p`
  font-size: 0.9rem;
  margin: 5px;
`;

export const BtnFilterAnimation = styled.button`
  width: 7%;
  margin: 5px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Invoice};
  cursor: pointer;
  border: 1px solid black;

  &:active {
    background-color: ${Colors.ButtonsColors.Invoice};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivFilter = styled.div`
  display: ${({ showAnimation }) => (showAnimation ? "none" : "flex")};
  width: 100%;
  height: ${({ showAnimation }) => (showAnimation ? "30%" : "none")};
  margin: 5px;
  padding: 5px;
`;
export const DivOrgFilter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    justify-content: center;
  }
`;

export const DivOrgInputs = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const DivOrgInput = styled.div`
  width: 25%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FilterLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;
export const FilterInput = styled.input`
  width: 98%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.8em;
  /* margin-right: 10px; */
`;

export const SelectOption = styled.select`
  width: 90%;
  height: 30px;
  padding: 5px;
  margin: 2px;
  border-radius: 25px;
  color: ${Colors.Text.Black};
`;
export const Options = styled.option`
  text-align: center;
  font-size: 0.8rem;
`;

export const DivOrgBtnFilter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const BtnSearch = styled.button`
  width: 28px;
  height: 28px;
  margin-right: 5px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};
  border: 1px solid black;
  cursor: pointer;
  color: ${Colors.Text.Black};

  &:active {
    background-color: ${Colors.ButtonsColors.Search};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnCancel = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid black;
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

export const TableExpense = styled.div`
  width: 100%;
  height: ${({ showAnimation }) => (showAnimation ? "100%" : "65%")};
  /* height: 65%; */
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    /* display: none; */
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
export const DivExpense = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 5px;
`;

export const DivInfo = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

export const DivOrgId = styled.div`
  width: 7%;
`;

export const IdExpense = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
`;

export const DivOrgExpenseName = styled.div`
  width: 45%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
`;

export const TypeExpense = styled.p`
  font-size: 0.75rem;
  text-align: center;
  /* margin: 3px; */
  font-weight: bold;
`;
export const DivExpenseInfo = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;
export const LabelExpense = styled.span`
  font-size: 0.7rem;
  /* margin: 5px; */
  text-align: center;
`;
export const DivExpenseEdit = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;  
  @media screen and (min-width: 320px) and (max-width: 940px) {
    align-items: center;
  }
`;
export const BtnEdit = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 2.5px;
  }
`;

export const BtnRemove = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;

  &:active {
    transform: translateY(4px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 2.5px;
  }
`;

export const BtnView = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Invoice};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 2.5px;
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
  width: 100%;
  display: flex;
  flex-direction: row;
`;
