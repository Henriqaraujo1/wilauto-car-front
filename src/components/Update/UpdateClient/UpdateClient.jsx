import React, { useEffect, useState } from "react";
import { Close } from "@styled-icons/material";
import {
  DivUpdateClient,
  FormClient,
  DivOrgClient,
  LabelClient,
  LabelClientStreet,
  InputClientStreet,
  InputClientNumber,
  InputClient,
  SubmitFormClient,
  InputMedium,
  DivBtnClose,
  BtnClose,
  SelectOption,
  Options,
  BtnCancel,
  DivBtn,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdateClientStyle";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { infoState } from "../../../utils/infoState.mjs";
import {
  useUpdateClientMutation,
  useLazyGetDocClientQuery,
} from "../../../store/registers/clients/clients.api";
import { getClientCEP } from "../../../store/registers/clients/clients.actions";
import { PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdateClient(props) {
  const clientDetail = props.dataClientUpdate;
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: clientDetail,
  });

  const [
    updtClient,
    { isLoading: clientLoading, isError: clientIsError, error: clientError },
  ] = useUpdateClientMutation();
  const [getClientDoc] = useLazyGetDocClientQuery();

  const [clientErro, setClientErro] = useState([]);

  const [clientInfo, setClientInfo] = useState({});
  const [docClient, setDocClient] = useState();
  const [phoneClient, setPhoneClient] = useState();
  const [houseNumClient, setHouseNumClient] = useState();
  const [infoAddres, setInfoAddress] = useState(null);
  const [cepClient, setCepClient] = useState(null);
  const [cepSearch] = useDebounce(cepClient, 500);

  const [loadingUpdateClient, setLoadingUpdateClient] = useState();
  const [disableBtn, setDisableBtn] = useState(false);

  const clientUpdt = async (dataClient) => {
    setLoadingUpdateClient(true);
    dataClient.idClient = clientDetail.idClient;
    if (docClient !== undefined) {
      dataClient.docClient = docClient;
    }
    if (phoneClient !== undefined) {
      dataClient.numberPhone = phoneClient;
    }
    if (houseNumClient !== undefined) {
      dataClient.localNumber = houseNumClient;
    }
    if (cepClient !== undefined) {
      dataClient.cep = cepClient;
    }
    const upClient = await updtClient({
      idClient: clientDetail.idClient,
      dataClient: dataClient,
    });

      setClientInfo(upClient.data || upClient.error.data);
    setTimeout(() => {
      setLoadingUpdateClient(false);
    }, 500);
    setTimeout(() => {
      props.setClientPopUp(false);
    }, 3000);
  };

  const getClientCPF = async (docClient) => {
    const clientCpf = await getClientDoc(docClient);

    setClientErro(clientCpf.data || clientCpf.error.data);
  };

  const getCepClientInfo = async (cepInfo) => {
    const infoClient = await dispatch(getClientCEP(cepInfo));

    setInfoAddress(infoClient.payload);
  };

  const parseName = (oneName) => {
    const fullName = oneName;

    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    if (docClient?.length === 11) {
      getClientCPF(docClient);
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

  useEffect(() => {
    if (cepSearch?.length > 0) {
      getCepClientInfo(cepSearch);
    } else {
      setInfoAddress(null);
    }
  }, [cepSearch]);

  useEffect(() => {
    if (infoAddres) {
      setValue("street", infoAddres.logradouro || "");
      setValue("district", infoAddres.bairro || "");
      setValue("city", infoAddres.localidade || "");
      setValue("state", infoAddres.uf || "");
    }
  }, [infoAddres]);

  return (
    <DivUpdateClient show={props.clientPopUp}>
      <FormClient onSubmit={handleSubmit(clientUpdt)}>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setClientPopUp(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgClient>
          {clientDetail.docClient.length > 11 ? (
            <LabelClient>CNPJ</LabelClient>
          ) : (
            <LabelClient>CPF</LabelClient>
          )}
          {clientDetail.docClient.length > 11 ? (
            <PatternFormat
              value={clientDetail.docClient}
              customInput={InputMedium}
              format="##.###.###/####-##"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values, sourceInfo) => {
                setDocClient(values.value);
              }}
            />
          ) : (
            <PatternFormat
              value={clientDetail.docClient}
              customInput={InputMedium}
              format="###.###.###-##"
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
            <InfoResult>Já existe um cliente com esse CPF</InfoResult>
          </DivOrgResults>
        )}
        <DivOrgClient>
          <LabelClient>Nome</LabelClient>
          <InputMedium {...register("clientName")} />
        </DivOrgClient>
        <DivOrgClient>
          <LabelClient>Sobrenome</LabelClient>
          <InputMedium {...register("lastName")} />
        </DivOrgClient>
        <DivOrgClient>
          <LabelClient>Telefone</LabelClient>
          <PatternFormat
            value={clientDetail.numberPhone}
            customInput={InputMedium}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setPhoneClient(values.value);
            }}
          />
        </DivOrgClient>
        <DivOrgClient>
          <LabelClient>CEP</LabelClient>
          <PatternFormat
            placeholder="CEP"
            value={clientDetail.cep}
            customInput={InputMedium}
            format="#####-###"
            onValueChange={(values, sourceInfo) => {
              setCepClient(values.value);
            }}
          />
        </DivOrgClient>
        <DivOrgClient>
          <LabelClientStreet>Rua</LabelClientStreet>
          <InputClientStreet {...register("street")} />
          <PatternFormat
            value={clientDetail.localNumber}
            placeholder="Nº"
            customInput={InputClientNumber}
            format="Nº #####"
            onValueChange={(values, sourceInfo) => {
              setHouseNumClient(values.value);
            }}
          />
        </DivOrgClient>
        <DivOrgClient>
          <LabelClient>Bairro</LabelClient>
          <InputMedium {...register("district")} />
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
        <DivBtn>
          <BtnCancel type="button" onClick={() => props.setClientPopUp(false)}>
            Cancelar
          </BtnCancel>
          <SubmitFormClient type="submit" disabled={disableBtn}>
            Salvar
          </SubmitFormClient>
        </DivBtn>
        {loadingUpdateClient ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (clientInfo.codeStatus === 409 && (
            <DivOrgResults>
              <InfoResult>{clientInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (clientInfo.codeStatus === 404 && (
            <DivOrgResults>
              <InfoResult>{clientInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (clientInfo.codeStatus === 200 && (
            <DivOrgResults>
              <InfoResult>{clientInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormClient>
    </DivUpdateClient>
  );
}
