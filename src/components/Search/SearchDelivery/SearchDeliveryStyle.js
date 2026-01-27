import styled from "styled-components";
import { Colors, Phone_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivSearchDelivery = styled.div`
  width: 50%;
  height: 550px;
  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  margin: 0 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_table}
`;

export const TitleSearchDelivery = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

export const DivFilter = styled.div`
  width: 100%;
  height: 25%;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
    height: 40%;
  }
`;

export const DivOrgFilter = styled.div`
  width: 100%;
  margin: 5px;
  display: ${({ show }) => (show ? "none" : "flex")};
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    justify-content: center;
    flex-direction: column;
  }
`

export const DivBtnSearch = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  ${Phone_media.Phone_Filter_Btn}
`;

export const DivOrgInputs = styled.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const NameLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 1em;
`;
export const NameInput = styled.input`
  width: 204px;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
`;
export const CodInput = styled(Numeric)`
  width: 20%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
`;
export const CityInput = styled.input`
  width: 40%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
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

export const DivTableSearch = styled.div`
  width: 100%;
  height: 80%;
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
    -webkit-box-shadow: inset 0 0 6px ${Colors.ButtonsColors.SearchButton};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${Colors.BackgroundColors.BkTable};
  }
`;
export const DivDelivery = styled.div`
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
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  `;

export const DivIdDelivery = styled.p`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: ${Colors.BackgroundColors.BkComponent};
  border: 1px solid ${Colors.Text.Black};
  border-radius: 100%;
  `;
export const DivDeliveryInfo = styled.div`
  width: 80%;
  margin: 0 5px;
  display: flex;
  flex-direction: column;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${Phone_media.Phone_column}
`;

export const DivOrgPrices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const DivOrgCod = styled.div`
  width: 40%;
`;

export const SpanName = styled.p`
  font-size: 0.9rem;
`;
export const SpanCod = styled.p`
  font-size: 0.9rem;
  font-style: italic;
`;
export const DivBtnEdit = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 30%;
  }
`;
export const BtnEdit = styled.button`
  width: 35%;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid black;
  background-color: ${Colors.ButtonsColors.Confirm};
  color: black;
  border-radius: 100%;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px ${Colors.ButtonsColors.ShadowButton};
  }
`;
export const BtnRemove = styled.button`
  width: 35%;
  padding: 5px;
  margin: 0 5px;
  background-color: ${Colors.ButtonsColors.Canceled};
  color: black;
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid black;

  &:active {
    transform: translateY(2px);
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
  width: 100%;
  display: flex;
  flex-direction: row;

  
`;

export const FormatValueDelivery = styled(Numeric)`
  width: 30%;
  height: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 0.9rem;
  margin-right: 10px;
`;
export const FormatValueDeliveryText = styled(Numeric)`
  font-size: 0.9rem;
  margin: 0 10px;
`;
