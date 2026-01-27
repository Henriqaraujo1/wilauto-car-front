import styled from "styled-components";
import { Colors } from "../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivPopUp = styled.div`
  width: 1054px;
  height: 81px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 20%;
    padding: 5px;
    flex-wrap: wrap;
  }
`;
export const DivStatusPopUp = styled.div`
  width: 200px;
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
export const NamePopUp = styled.h4`
  font-size: 17px;
  margin-bottom: 10px;
  text-align: center;
`;
export const ValuePopUp = styled.span`
  font-size: 1em;
`;

export const PriceValues = styled(Numeric)`
  font-size: 1em;
`;


export const DivOrgLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;