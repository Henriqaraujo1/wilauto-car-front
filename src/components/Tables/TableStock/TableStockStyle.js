import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { NumericFormat as Numeric } from "react-number-format";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivTableStock = styled.div`
  width: 95%;
  height: 80%;
  margin: 10px;
  display: flex;
  padding: 10px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background: ${Colors.BackgroundColors.BkComponent};
  border-radius: 25px;
  ${Phone_media.Phone_table};
  ${Tablet_media.Tablet_table};
`;

export const DivOrgStock = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DivFilter = styled.div`
  width: 95%;
  /* height: 60px; */
  margin: 5px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgInputsFilter = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${Phone_media.Phone_column}
`;

export const InfoLabel = styled.label`
  font-size: 0.9rem;
`;

export const DivOrgInput = styled.div`
  width: 80%;
  height: 55px;
  display: ${({ show }) => (show ? "none" : "flex")};
  align-items: center;
  justify-content: space-between;
  ${Phone_media.Phone_column}
`;
export const NameInput = styled.input`
  width: 100%;
  height: 30px;
  margin: 5px;
  border-radius: 25px;
  padding-left: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70%;
  }
`;
export const CodInput = styled(Numeric)`
  width: 70%;
  height: 30px;
  display: flex;
  border-radius: 25px;
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  padding-left: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70%;
    margin-right: 0;
  }
`;
export const BrandInput = styled.input`
  width: 60%;
  height: 30px;
  margin: 5px;
  border-radius: 25px;
  padding-left: 10px;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70%;
  }
`;

export const DivTableInput = styled.div`
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
  ::-webkit-scrollbar {
    display: flex;
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

  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 0px;
  }
`;

export const DivCardItem = styled.div`
  width: 49%;
  /* height: 25%; */
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

export const DivOrgCard = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DivOrgInfo = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;

export const DivId = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

export const IdItem = styled.p`
  font-size: 1.3em;
  width: 100%;
  height: 50%;
  border-radius: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivItem = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  border: 1px solid black;
  border-radius: 25px;
  padding: 10px;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;
export const DivItemValues = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;
export const DivItemQtd = styled.div`
  width: 20%;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;
export const NameItem = styled.p`
  font-size: 0.8em;
`;
export const BrandItem = styled.p`
  font-size: 0.7em;
`;
export const CodItem = styled.p`
  font-size: 0.7em;
  margin-right: 5px;
`;
export const InfoItem = styled.p`
  font-size: 0.8em;
  text-align: center;
`;
export const QtdItem = styled.p`
  font-size: 0.8em;
`;
export const DivBtn = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const BtnStock = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 100%;
  background: ${Colors.ButtonsColors.Actions};
  color: ${Colors.Text.White};
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Actions};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const LinkPage = styled(Link)`
  text-decoration: none;
  color: ${Colors.Text.Black};
  width: 40px;
  height: 40px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-content: center;
  /* margin: 10px auto; */
  font-size: 0.9rem;

  background-color: ${Colors.ButtonsColors.Actions};
  color: ${Colors.Text.White};
  box-sizing: border-box;
  border-radius: 25px;

  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.ColorActive};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const PriceTotalStock = styled(Numeric)`
  font-size: 0.9em;
`;

export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivOrgBtnTable = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
`;

export const BtnExport = styled(Link)`
  /* width: 105px; */
  text-decoration: none;
  /* height: 32px; */
  font-size: 18px;
  padding: 10px;
  justify-content: center;
  flex-direction: column;
  align-content: center;

  color: ${Colors.Text.Black};
  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;
  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;