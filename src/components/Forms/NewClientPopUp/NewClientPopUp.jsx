import React, { useEffect, useState } from "react";
import {
  DivNewClient,
  FormClient,
  DivOrgClient,
  LabelClient,
  LabelClientStreet,
  InputClientStreet,
  InputClientNumber,
  InputClient,
  SubmitFormClient,
  InputMedium,
  SelectOption,
  Options,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  SelectDoc,
  DivOrgShowAdress,
  DivBtnShow,
  BtnShow,
  BtnCloseAdress,
  DivOrgClose,
  DivPopUpNewClient,
  DivBtnClose,
  BtnClose,
  TitleNewClient,
} from "./NewClientPopUpStyles";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createClient,
  getClient,
} from "../../../store/registers/clients/clients.actions";
import { PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { infoState } from "../../../utils/infoState.mjs";
import { Close } from "@styled-icons/material";

export default function NewClientPopUp(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();

  const [docClient, setDocClient] = useState("");
  const [selectDoc, setSelectDoc] = useState("cpf");
  const [phoneClient, setPhoneClient] = useState("");
  const [houseNumClient, setHouseNumClient] = useState("");

  const [clientInfo, setClientInfo] = useState([]);
  const [clientErro, setClientErro] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [showAdress, setShowAdress] = useState(true);

  const [loading, setLoading] = useState(false);

  const newClient = async (dataClient) => {
    setLoading(true);
    dataClient.docClient = docClient;
    dataClient.numberPhone = phoneClient;
    dataClient.localNumber = houseNumClient;
    const clientCreate = await dispatch(createClient(dataClient));
    setClientInfo(clientCreate.payload);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getClientInfo = async (docClient) => {
    const clientDocClient = await dispatch(getClient(docClient));
    setClientErro(clientDocClient.payload);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setDocClient("");
        setHouseNumClient("");
        setPhoneClient("");
        setClientInfo([]);
      }, 5000);
    }
  }, [
    formState,
    reset,
    setDocClient,
    setClientInfo,
    setPhoneClient,
    setHouseNumClient,
  ]);

  useEffect(() => {
    if (docClient.length === 11) {
      getClientInfo(docClient);
    } else {
      setClientErro([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docClient]);

  useEffect(() => {
    if (clientErro?.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [clientErro]);

  return (
    <DivPopUpNewClient show={props.showPopClient}>
      <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setShowPopClient(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
      <DivNewClient>
        <TitleNewClient>Adicionar Cliente</TitleNewClient>
        <FormClient onSubmit={handleSubmit(newClient)}>
          <DivOrgClient>
            <SelectDoc onChange={(e) => setSelectDoc(e.target.value)}>
              <Options value="cpf">CPF</Options>
              <Options value="cnpj">CNPJ</Options>
            </SelectDoc>
            {selectDoc === "cpf" ? (
              <PatternFormat
                customInput={InputMedium}
                value={docClient}
                format="###.###.###-##"
                allowEmptyFormatting
                mask="_"
                onValueChange={(values, sourceInfo) => {
                  setDocClient(values.value);
                }}
              />
            ) : (
              <PatternFormat
                customInput={InputMedium}
                value={docClient}
                format="##.###.###/####-##"
                allowEmptyFormatting
                mask="_"
                onValueChange={(values, sourceInfo) => {
                  setDocClient(values.value);
                }}
              />
            )}
          </DivOrgClient>
          {clientErro.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>Já existe cliente com esse CPF</InfoResult>
            </DivOrgResults>
          )}
          <DivOrgClient>
            <LabelClient>Nome</LabelClient>
            <InputMedium
              type="text"
              maxLength={20}
              {...register("clientName", {
                required: true,
              })}
            />
          </DivOrgClient>
          <DivOrgClient>
            <LabelClient>Sobrenome</LabelClient>
            <InputMedium
              type="text"
              maxLength={20}
              {...register("lastName", {
                required: true,
              })}
            />
          </DivOrgClient>
          <DivOrgClient>
            <LabelClient>Telefone</LabelClient>
            <PatternFormat
              customInput={InputMedium}
              value={phoneClient}
              format="(##) #####-####"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values, sourceInfo) => {
                setPhoneClient(values.value);
              }}
            />
          </DivOrgClient>
          <DivBtnShow show={showAdress}>
            <BtnShow
              onClick={() => {
                setShowAdress(!showAdress);
              }}
            >
              Cadastrar Endereço
            </BtnShow>
          </DivBtnShow>
          <DivOrgShowAdress show={showAdress}>
            <DivOrgClose>
              <BtnCloseAdress
                onClick={() => {
                  setShowAdress(!showAdress);
                }}
              >
                <Close />
              </BtnCloseAdress>
            </DivOrgClose>
            <DivOrgClient>
              <LabelClientStreet>Rua</LabelClientStreet>
              <InputClientStreet
                type="text"
                maxLength={70}
                {...register("street")}
              />
              <PatternFormat
                placeholder="Nº"
                value={houseNumClient}
                customInput={InputClientNumber}
                format="Nº #####"
                onValueChange={(values, sourceInfo) => {
                  setHouseNumClient(values.value);
                }}
              />
            </DivOrgClient>
            <DivOrgClient>
              <LabelClient>Bairro</LabelClient>
              <InputMedium
                type="text"
                maxLength={30}
                {...register("district")}
              />
            </DivOrgClient>
            <DivOrgClient>
              <LabelClient>Cidade</LabelClient>
              <InputMedium {...register("city")} />
              <LabelClient>Estado</LabelClient>
              <SelectOption {...register("state")}>
                <Options value="">Selecione</Options>
                {infoState.map((infoStates, index) => {
                  return (
                    <Options key={index} value={infoStates.value}>
                      {infoStates.value}
                    </Options>
                  );
                })}
              </SelectOption>
            </DivOrgClient>
            <DivOrgClient>
              <LabelClient>Complemento</LabelClient>
              <InputClient {...register("complement")} />
            </DivOrgClient>
          </DivOrgShowAdress>
          <SubmitFormClient type="submit" disabled={disableBtn}>
            Cadastrar
          </SubmitFormClient>
        </FormClient>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (clientInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{clientInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (clientInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{clientInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </DivNewClient>
    </DivPopUpNewClient>
  );
}
