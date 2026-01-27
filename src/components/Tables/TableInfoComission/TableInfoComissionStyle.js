import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivTableComission = styled.div`
  width: 95%;
  height: 350px;
  padding: 10px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 10px auto;

  display: flex;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_table}
`;

export const DivTableInfo = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  /* justify-content:center; */
  align-content: flex-start;
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

export const DivComission = styled.div`
  width: 95%;
  border-radius: 25px;
  margin: 5px auto;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkInputs.White};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
  }
`;
export const DivComissionInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const DivOrgCard = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const DivOrgInfo = styled.div`
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Info = styled.span`
  font-size: 0.9em;
  /* margin: 10px; */
  text-align: center;
`;

export const DivBtnDetail = styled.div`
  width: 30%;
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

export const DivBtnView = styled.div`
  width: 13%;
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 40%;
  }
`;

export const BtnView = styled.button`
  width: 35px;
  height: 35px;
  padding: 3px;
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

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;
export const BtnPayment = styled.button`
  width: 35px;
  height: 35px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  border: 1px solid black;
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;
export const BtnComission = styled.button`
  width: 35px;
  height: 35px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Printer};
  border: 1px solid black;
  color: black;
  border-radius: 100%;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.Black};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30px;
    height: 30px;
    padding: 2px;
  }
`;

export const DivFilter = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
`;
export const DivOrgFilter = styled.div`
  width: 95%;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const DivBtnSearch = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
    align-items: center;
  }
`;

export const DivOrgInputs = styled.div`
  width: 20%;
  margin: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70%;
  }
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
export const PriceInfo = styled(Numeric)`
  font-size: 0.9em;
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
export const DivOrgBtn = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 50%;
  }
`;

export const BtnSearch = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Search};

  &:hover {
    cursor: pointer;
  }

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

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;
