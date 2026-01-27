import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import { NumericFormat as Numeric } from "react-number-format";

export const DivTableTags = styled.div`
  width: 53%;
  height: 550px;
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

export const TitleTagPrint = styled.h1`
  font-size: 1.2rem;
`

export const DivDetailsItens = styled.div`
  width: calc(100% - 20px);
  height: 430px;
  background: ${Colors.BackgroundColors.BkTable};
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
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

export const DivTagDetails = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 320px) and (max-width: 940px) {
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
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 100%;
  }
`;

export const DivTagAdd = styled.div`
  width: 100%;
  padding: 10px;
  margin: 5px 0;

  background-color: ${Colors.Text.White};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    margin: 10px;
    flex-direction: column;
    height: 30%;
  }
`;

export const DivIdTag = styled.div`
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
export const DivInfoTag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* border: 1px solid black; */
  /* margin: auto; */
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    flex-direction: row;
    padding: 10px;
  }
`;
export const CodeTag = styled.span`
  font-size: 0.8em;
`;
export const NameTag = styled.span`
  font-size: 1em;
`;
export const DivNumbers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 60%;
  }
`;
export const DivOrgNumbers = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TitleNumber = styled.span`
  font-size: 0.8rem;
  text-align: center;
`;
export const Value = styled.p`
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 70px;
  }
`;

export const ValueProduct = styled(Numeric)`
  /* display: flex;
  justify-content: center; */
  font-size: 0.8rem;
`;

export const DivBtnInfo = styled.div`
  width: 15%;
  margin: 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BtnRemoveTag = styled.button`
  width: 45%;
  height: 60%;
  /* padding: 8px; */
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

export const DivOrgBtn = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 599px) {
    width: 100%;
    justify-content: center;
    margin: 0px;
  }
`;

export const DivOrgResult = styled.div`
  width: 100%;
`;

export const NumberOrder = styled.span`
  font-size: 1em;
  font-style: italic;
`;

export const BtnAddTag = styled.button`
  width: 173px;
  height: 40px;

  background: ${Colors.ButtonsColors.Confirm};
  border-radius: 25px;
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
  }
`;

export const DivOrgInfoOrder = styled.div`
  width: 70%;
  padding: 5px;
  margin: auto 10px;
  border-radius: 25px;
`;

export const DivOrgTotalOrder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
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

export const DivOrgCardProduct = styled.div`
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
