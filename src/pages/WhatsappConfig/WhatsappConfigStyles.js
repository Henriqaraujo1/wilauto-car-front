import styled from "styled-components";
import { Colors, Phone_media, Tablet_media } from "../../variable";

export const DivWhatsappBody = styled.div`
  width: 1100px;
  height: 650px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${Colors.BackgroundColors.BkDiv};
  border-radius: 25px;
  padding: 5px;

  ${Phone_media.Phone_column}
  ${Tablet_media.Tablet_column}
`;

export const DivOrgTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TitleConfigWpp = styled.h2``;
export const DivWhatsapp = styled.div`
  width: 100%;
  height: 750px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media screen and (max-width: 599px) {
    width: 100%;
    height: 690px;
    margin: 0px 15px;
    flex-direction: column;
    padding: 5px;
  }
`;

export const DivLogo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #000;
  background: ${Colors.BackgroundColors.BkLogin};
  border-radius: 25px 0px 0px 25px;

  @media screen and (max-width: 599px) {
    width: 100%;
    height: 40%;
    border-radius: 25px 25px 0px 0px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;

  @media screen and (max-width: 599px) {
    width: 70%;
    height: auto;
  }
`;
