import { Close } from "@styled-icons/material";
import {
  BtnChange,
  BtnClose,
  BtnSend,
  DivBtnClose,
  DivOrgBtn,
  DivOrgChange,
  DivOrgInfo,
  DivOrgInput,
  DivOrgMessage,
  DivOrgResults,
  DivOrgTitle,
  DivStatusMsg,
  InfoClient,
  InfoResult,
  InputNumber,
  LabelWpp,
  NameClient,
  NumberClient,
  TitleInfo,
} from "./WhatsappStyle";
import { PatternFormat } from "react-number-format";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function WhatsappMsg(props) {
  const [phoneClient, setPhoneClient] = useState(82996873399);
  const [changeNumber, setChangeNumber] = useState(true);
  const [loadingSendNote, setLoadingSendNote]= useState(false)
  const [sendNoteInfo, setSendNodeInfo] = useState({});

  return (
    <DivOrgMessage show={props.sendWpp}>
      <InfoClient>
        <DivBtnClose>
          <BtnClose onClick={() => props.setSendWpp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgTitle>
          <TitleInfo>Envie o comprovante para seu Cliente</TitleInfo>
        </DivOrgTitle>
        <DivOrgInfo>
          <NameClient>Cliente: Henrique Silva</NameClient>
          {changeNumber === true ? (
            <NumberClient>
              Numero:
              <PatternFormat
                displayType="text"
                customInput={InputNumber}
                value={phoneClient}
                format="(##) #####-####"
                allowEmptyFormatting
                mask="_"
                onValueChange={(values, sourceInfo) => {
                  setPhoneClient(values.value);
                }}
              />
            </NumberClient>
          ) : (
            <DivOrgInput>
              <LabelWpp>Novo Número</LabelWpp>
              <PatternFormat
                customInput={InputNumber}
                value={phoneClient}
                format="(##) #####-####"
                allowEmptyFormatting
                mask="_"
                onValueChange={(values, sourceInfo) => {
                  setPhoneClient(values.value);
                }}
              />
            </DivOrgInput>
          )}

          <DivOrgChange>
            <BtnChange
              type="button"
              onClick={() => setChangeNumber(!changeNumber)}
              changeColor={changeNumber}
            >
              {changeNumber === true ? "Alterar Número" : "Confirmar Número"}
            </BtnChange>
          </DivOrgChange>
        </DivOrgInfo>
        <DivOrgBtn show={changeNumber}>
          <BtnSend type="submit">Enviar Nota</BtnSend>
        </DivOrgBtn>
        </InfoClient>
        {loadingSendNote ? (
          <DivStatusMsg>
            <ClipLoader speedMultiplier={3} />
          </DivStatusMsg>
        ) : (
          (sendNoteInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{sendNoteInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (sendNoteInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{sendNoteInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      
    </DivOrgMessage>
  );
}
