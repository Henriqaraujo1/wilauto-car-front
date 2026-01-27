import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../../variable";

export const DivOrgPrintDelivery = styled.div`
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: -1;
  @media print {
    width: 100%;
    height: 500px;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;
export const DivPrintDelivery = styled.div`
  background-color: ${Colors.Text.White};
  width: 50%;
  height: 100%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Phone_media.Phone_Form}
  ${Tablet_media.Tablet_Form}
      @media screen and (min-width: 320px) and (max-width: 940px) {
    height: 40%;
  }
  @media print {
    @page {
      size: "A4 portrait";
      margin: 0px;
    }
    border: none;
    width: 95%;
    height: max-content;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;
export const Divclient = styled.div`
  width: 400px;
  height: 150px;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid black;
`;
export const DivCompany = styled.div`
  width: 400px;
  height: 150px;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid black;
`;
export const DivOrgTitleDelivery = styled.div``;
export const TitleDelivery = styled.h2``;
export const DivOrgInfo = styled.div``;
export const NameClient = styled.h4``;
export const InfoDelivery = styled.p`
  margin: 5px 0;
`;
