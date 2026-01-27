import styled from "styled-components";

export const DivWhatsappBody = styled.div`
  width: 80%;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  @media screen and (max-width: 599px) {
    height: 730px;
    padding: 10px;
  }
`;

export const DivWhatsappCode = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DivOrgTitle = styled.div``;
export const TitleWpp = styled.h4``;

export const QrdCode = styled.img`
  width: 20%;
  height: auto;

  @media screen and (max-width: 599px) {
    width: 70%;
    height: auto;
  }
`;

export const FormWpp = styled.form``;
export const DivOrgInfo = styled.div``;
export const DivOrgStatus = styled.div`
  width: 100;
  display: flex;
  justify-content: center;
`;
export const Info = styled.p``;

export const DivOrgMessage = styled.div`
  width: 100%;
  margin: 5px;
`;
export const MessageContate = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 25px;
  display: flex;
`;

export const DivOrgBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export const BtnSave = styled.button`
  width: 40%;
  height: 47px;

  background: rgba(182, 255, 170, 0.88);
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(182, 255, 170, 0.88);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
export const BtnQrCode = styled.button`
  /* width: 40%; */
  padding: 5px;
  height: 30px;

  background: rgba(182, 255, 170, 0.88);
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(182, 255, 170, 0.88);
    box-shadow: 0 5px rgba(0, 0, 0, 0.3);
    transform: translateY(4px);
  }
`;
