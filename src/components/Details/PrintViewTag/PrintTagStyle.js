import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";
import Barcode from "react-barcode";
import { NumericFormat as Numeric } from "react-number-format";

export const DivPrintTag = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  position: absolute;
  top: 105px;
  left: 150px;
  right: 170px;
  width: 80%;
  height: 80%;
  background-color: ${Colors.BackgroundColors.BKBlur};
  backdrop-filter: blur(10px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid black;
  border-radius: 25px;

  animation: scale-in-tr 0.1s both;
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

  ${Phone_media.Phone_Pop_UP}
  ${Tablet_media.Tablet_Pop_Up}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TitleUpdate = styled.h3``;

export const DivOrgBtnClose = styled.div`
  width: 90%;
  margin-right: 15px;
  height: 10%;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
`;

export const BtnClose = styled.button`
  width: 40px;
  height: 40px;
  background: ${Colors.ButtonsColors.Canceled};
  border: 1px solid black;
  border-radius: 100%;
  cursor: pointer;

  &:active {
    transform: translateY(4px);
    box-shadow: 0 3px 3px ${Colors.ButtonsColors.ShadowButton};
  }
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 9%;
  }
`;

export const DivOrgPrint = styled.div`
  /* width: 80%; */
  height: 80%;
  padding: 10px;
  border: 1px solid black;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  border: 1px solid black;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: flex;
    width: 12px;
    @media screen and (min-width: 320px) and (max-width: 932px) {
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

  @media screen and (min-width: 320px) and (max-width: 932px) {
    padding: 0px;
  }
  ${Phone_media.Phone_table}
`;

export const DivGridPrint = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.Text.White};
  border-radius: 25px;
  display: grid;
  grid-template-columns: repeat(5, 144px);
  grid-template-rows: repeat(13, 80px);
  page-break-after: auto;
  gap: 2.5mm 6mm;

  @media print {
    @page {
      size: A4; /* Configura o tamanho da página */
      margin: 11.20mm 4.75mm 11.20mm 4.75mm; /* Margens ajustadas: cima, direita, baixo, esquerda */
    }

    width: calc(100% - 15mm); /* Ajusta a largura para caber nas margens laterais */
  }
  @media screen and (min-width: 320px) and (max-width: 932px) {
    grid-template-columns: repeat(3, 144px);
  }
`;
export const DivTag = styled.div`
  width: 38.1mm;
  height: 21.2mm;
  border: 1px solid black;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
`;

export const DivOrgExampleInfo = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
`;

export const DivOrgImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ImageTag = styled.img`
  width: 20%;
  height: 80%;
`;

export const DivOrgTitleTag = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleTag = styled.p`
  font-size: 0.5rem;
`;

export const CodTag = styled(Barcode)`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 100%;
    height: 40px;
  }
`;

export const DivOrgBtn = styled.div`
  width: 20%;
  padding: 10px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 940px) {
    width: 55%;
  }
`;

export const BtnPrint = styled.button`
  height: 25px;
  padding: 5px;
  margin: 5px;
  border-radius: 25px;
  text-decoration: none;
  color: ${Colors.Text.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.ButtonsColors.Confirm};
  cursor: pointer;

  &:active {
    background-color: ${Colors.ButtonsColors.Confirm};
    box-shadow: 0 3px ${Colors.ButtonsColors.ShadowButton};
    transform: translateY(4px);
    color: ${Colors.Text.Black};
  }
`;

export const PriceTag = styled(Numeric)`
  font-size: 0.8em;
  ${Phone_media.Phone_Info_Itens_Row}
`;