import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors, Phone_media } from "../../../variable";

export const DivDetailOrder = styled.div`
  width: 60%;
  height: 548px;
  padding: 10px;
  margin-left: 20px;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_table}
`;

export const TitleDetailOrder = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivDetailItems = styled.div`
  width: 100%;
  height: 398px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  overflow: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 940px) {
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

  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 0px;
  }
  ${Phone_media.Phone_table}
`;

export const Item = styled.div`
  width: 100%;
  height: 75px;
  background-color: ${Colors.BackgroundColors.BkItem};
  border-radius: 25px;
  padding: 5px;
  margin: 5px;

  display: flex;
  flex-direction: row;
`;

export const DivItem = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
`;
export const DivTotal = styled.div`
  width: 25%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${Phone_media.Phone_Info_Itens}
`;
export const DivPrice = styled.div`
  /* width: 25%; */
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  ${Phone_media.Phone_Info_Itens}
`;

export const DivQtd = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_Info_Itens}
`;
export const DivDiscount = styled.div`
  width: 20%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  ${Phone_media.Phone_Info_Itens}
`;

export const DivOrgDiscount = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const DivName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const FormatPrices = styled(Numeric)`
  font-size: 1rem;
  ${Phone_media.Phone_Info_Itens_Row}
`;

export const QtdItem = styled.p`
  font-size: 25px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  align-items: center;
  border-radius: 100%;
  margin-right: 5px;
  ${Phone_media.Phone_Info_Itens}
`;
export const CodItem = styled.p`
  font-size: 0.7em;
  width: 100%;
`;
export const NameItem = styled.p`
  font-size: 0.7em;
`;
export const PriceUnit = styled.p`
  font-size: 0.8em;
`;
export const Qtd = styled.p`
  font-size: 0.8rem;
  overflow: hidden;
`;
export const Discount = styled.p`
  font-size: 0.9em;
`;
export const PriceTotal = styled.p`
  font-size: 0.9em;
`;

export const DivBtn = styled.div`
  width: 573px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 940px) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 95%;
    height: 5%;
    margin: 10px;
  }
`;

export const BtnPayment = styled(Link)`
  width: 150px;
  height: 50px;
  margin: 5px;
  border: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;

  @media screen and (max-width: 940px) {
    font-size: 18px;
  }

  font-size: 15px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;

  &:active {
    margin-top: 3px;
  }
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  height: 60px;
  margin: 10px auto;
  /* margin: 10 auto; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${Phone_media.Phone_Info_Client}

`;

export const NumberOrder = styled.p`
  font-size: 1em;
  font-style: italic;
`;

export const DivBtnRemove = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const DivOrgDetailCart = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
`;
export const DivOrgInfoDetails = styled.div``;

export const BtnRemoveItem = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: ${Colors.ButtonsColors.Canceled};
  color: ${Colors.Text.Black};
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${Colors.ButtonsColors.Canceled};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;


export const NameClient = styled.p`
  font-size: 1em;
  font-style: italic;
`;

export const DivOrgInfoOrder = styled.div`
  width: 50%;
  padding: 10px;
  margin: auto 10px;
  border-radius: 25px;
  border: 1px solid black;
`;

export const DivOrgTotalOrder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;
`;
export const ValueTotalOrder = styled.p`
  font-size: 1.2em;
  font-style: italic;
`;
