import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Colors, Phone_media } from "../../variable";

export const DivOrgScreen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${Phone_media.Phone_column}
`;

export const DivChangeOrder = styled.div`
  width: 55%;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  ${Phone_media.Phone_table}
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const TitleChangeOrder = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivChangeItems = styled.div`
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

  @media screen and (min-width: 320px) and (max-width: 940px) {
    padding: 0px;
  }
`;

export const Item = styled.div`
  width: 95%;
  height: 60px;
  background-color: ${Colors.BackgroundColors.BkItem};
  border-radius: 25px;
  padding: 5px;
  margin: 5px;
  border: 1px solid ${Colors.Text.Black};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 940px) {
    flex-direction: column;
    width: 95%;
    height: 30%;
  }
`;

export const DivItem = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivInfo = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 25px;
  border: 1px solid black;
  ${Phone_media.Phone_row}
`;

export const DivName = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: column;
`;

export const QtdItem = styled.span`
  font-size: 25px;
  border: 1px solid black;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-right: 5px;
`;
export const CodItem = styled.span`
  font-size: 0.7em;
  width: 100%;
`;
export const NameItem = styled.p`
  font-size: 0.7em;
  width: 100%;
  height: 100%;
`;
export const PriceUnit = styled.span`
  font-size: 0.7em;
  text-align: center;
`;

export const Qtd = styled.p`
  font-size: 0.7em;
`;
export const Discount = styled.p`
  font-size: 0.7em;
`;

export const PriceTotal = styled.span`
  font-size: 0.7em;
`;

export const DivPrice = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const DivQtd = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  align-items: center;
`;
export const DivDiscount = styled.div`
  width: 40%;
  display: flex;
  text-align: center;
  flex-direction:column;
  justify-content: space-around;
  align-items: center;
`;

export const DivOrgDiscount = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const DivTotal = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

export const BtnChange = styled(Link)`
  width: 150px;
  height: 50px;
  border: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;

  @media screen and (max-width: 940px) {
    font-size: 18px;
  }

  font-size: 25px;

  background: ${Colors.ButtonsColors.Change};
  border-radius: 25px;

  &:active {
    margin-top: 3px;
  }
`;
