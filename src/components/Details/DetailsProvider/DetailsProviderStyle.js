import styled from "styled-components";
import { Colors } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivFilterProvider = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: max-content;
    flex-wrap: wrap;
  }
`;
export const DivOrgPopUp = styled.div`
  width: 181px;
  height: 81px;
  margin-bottom: 10px;

  background: ${Colors.BackgroundColors.BkCards.Info};
  border-radius: 25px;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
`;
export const TitleInfo = styled.h4`
  font-size: 0.9rem;
`;
export const Value = styled.p`
margin-top: 5px;
  font-size: 1rem;
`;

export const PriceBuyed = styled(Numeric)`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  font-size: 1em;
`;
