import styled from "styled-components";
import { Colors } from "../../../variable";
import { Stars } from "@styled-icons/material/Stars";
import { NumericFormat as Numeric } from "react-number-format";


export const DivFilterClients = styled.div`
  width: 1054px;
  height: 81px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 40%;
    flex-wrap: wrap;
  }
`;
export const DivOrgPopUpClients = styled.div`
    width: 181px;
    height: 81px;
    margin-bottom: 10px;

    background: ${Colors.BackgroundColors.BkCards.Info};
    border-radius: 25px;
    padding:10px;

    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 5px ${Colors.ButtonsColors.ShadowButton};
`;

export const DivReview = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    width: 100%;
    height: 100%;
`

export const InfoClient = styled.h4`
  font-size: 0.9rem;
`;

export const StarsReview = styled(Stars)`
    width:15%;
    padding-left: 5px;
`

export const Value = styled.span`
    font-size: 1rem;
`;

export const PriceBuyed = styled(Numeric)`
  display: flex;
  justify-content: center;
  font-size: 1em;
`;
