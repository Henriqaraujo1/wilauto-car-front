import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../../variable";
import { NumericFormat as Numeric } from "react-number-format";
import Select from "react-select";

export const DivTableItems = styled.div`
  width: 95%;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_table}
  ${Tablet_media.Tablet_table}
`;

export const DivOrgFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: column;
  }
`;

export const DivFilterSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const SelectOption = styled(Select)`
  text-align: center;
  width: 100%;

  border-radius: 25px;
  background-color: ${Colors.Text.White};
`;

export const DivDetailsItens = styled.div`
  width: 100%;
  height: 85%;
  padding: 10px;
  background-color: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
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

export const DivItemDetails = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 100%;
    height: 50%;
    align-items: center;
    padding: 3px;
  }
`;

export const DivOrgDetails = styled.div`
  width: 55%;
  height: 100%;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 100%;
    height: 100%;
  }
`;

export const DivItemAdd = styled.div`
  width: 45%;
  padding: 10px;
  margin: 5px;

  background-color: ${Colors.Text.White};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    margin: 10px;
    flex-direction: column;
    height: 30%;
  }
`;

export const DivIdItem = styled.div`
  width: 10%;
  height: 50%;
  margin: auto 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100%;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
`;
export const Id = styled.span`
  font-size: 1rem;
`;
export const DivInfoItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 320px) and (max-width: 932px) {
    flex-direction: row;
    padding: 10px;
  }
`;
export const CodeItem = styled.span`
  font-size: 0.8em;
`;
export const NameItem = styled.span`
  font-size: 1em;
`;
export const DivNumbers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 100%;
    height: 60%;
  }
`;
export const DivOrgNumbers = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TitleNumber = styled.span`
  font-size: 0.8rem;
  /* text-align: center; */
`;
export const Value = styled.p`
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 70px;
  }
`;

export const ValueStock = styled(Numeric)`
  font-size: 0.8rem;
`;

export const DivBtnInfo = styled.div`
  width: 15%;
  margin: 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BtnRemoveItem = styled.button`
  width: 45%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Canceled};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnInfo = styled.button`
  width: 45%;
  height: 60%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 100%;
  background-color: ${Colors.ButtonsColors.Invoice};

  cursor: pointer;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
    color: ${Colors.Text.White};
  }
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 932px) {
    margin: 10px;
    flex-direction: column;
    height: 30%;
  }
`;

export const DivOrgBtn = styled.div`
  width: 55%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 100%;
  }
`;

export const DivOrgResult = styled.div`
  width: 100%;
`;

export const NumberOrder = styled.span`
  font-size: 1em;
  font-style: italic;
`;

export const BtnAddStock = styled.button`
  width: 160px;
  height: 40px;
  margin: 0 5px;
  color: ${Colors.Text.Black};

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const BtnAddTag = styled.button`
  width: 160px;
  height: 40px;
  margin: 0 5px;

  background: ${Colors.ButtonsColors.Invoice};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Invoice};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
  @media screen and (min-width: 320px) and (max-width: 932px) {
    display: none;
  }
`;

export const DivOrgInfoOrder = styled.div`
  width: 40%;
  padding: 5px;
  margin: auto 10px;
  border-radius: 25px;

  @media screen and (min-width: 320px) and (max-width: 932px) {
    width: 100%;
  }
`;

export const DivOrgTotalOrder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 932px) {
    justify-content: center;
  }
`;
export const ValueTotalOrder = styled.p`
  font-size: 1em;
  font-style: italic;
  margin-right: 10px;
`;

export const PriceTotal = styled.p`
  font-size: 1em;
`;

export const DivOrgMoreDetails = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 5px auto;
  display: ${({ details }) => (details ? "flex" : "none")};
  justify-content: center;
  flex-direction: row;

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

export const DivOrgCardStock = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
`;

export const DivOrgResults = styled.div`
  width: 80%;
  height: 8%;
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

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivAlertTag = styled.div`
  display:none;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    display:flex;
    margin: 5px auto;
    width: 100%;
    justify-content:center;
    align-items: center;
  }
`

export const AlertTag = styled.span`
  font-size: 0.7em;
  text-align: center;
  color: ${Colors.Text.Red}
`