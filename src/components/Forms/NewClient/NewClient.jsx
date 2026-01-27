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
  SelectCity,
  DivOrgCity,
  DivOrgInputCity,
  DivOrgInputState,
} from "./NewClientStyles";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getClientCEP } from "../../../store/registers/clients/clients.actions";
import { PatternFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";
import { Close } from "@styled-icons/material";
import {
  useCreateClientMutation,
  useLazyGetDocClientQuery,
} from "../../../store/registers/clients/clients.api";
import { useDebounce } from "use-debounce";
import {
  useGetEstadosQuery,
  useGetMunicipiosByUfQuery,
} from "../../../store/utils/ibge/ibge.api";

export default function NewClient() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
    setValue,
  } = useForm();

  const [createClient, { isLoading, isError, error }] =
    useCreateClientMutation();
  const [getClientByDoc] = useLazyGetDocClientQuery();

  const [docClient, setDocClient] = useState("");
  const [selectDoc, setSelectDoc] = useState("cpf");
  const [phoneClient, setPhoneClient] = useState("");
  const [houseNumClient, setHouseNumClient] = useState("");
  const [infoAddres, setInfoAddress] = useState(null);
  const [cepClient, setCepClient] = useState(null);
  const [cepSearch] = useDebounce(cepClient, 500);

  const [filterCityClient, setFilterCityClient] = useState(null);
  const [filterStateClient, setFilterStateClient] = useState(null);

  const [clientInfo, setClientInfo] = useState([]);
  const [clientErro, setClientErro] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [showAdress, setShowAdress] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingListClients, setLoadingListClients] = useState(false);

  // Busca estados
  const { data: estados = [], isLoading: loadingEstados } =
    useGetEstadosQuery();

  // Busca municípios de acordo com o UF selecionado
  const { data: municipios = [], isLoading: loadingMunicipios } =
    useGetMunicipiosByUfQuery(filterStateClient?.sigla, {
      skip: !filterStateClient,
    });

  const estadosOptions = estados.map((e) => ({
    value: e.sigla,
    label: `${e.sigla}`,
    ...e,
  }));

  const municipiosOptions = municipios.map((m) => ({
    value: m.nome,
    label: m.nome,
    ...m,
  }));

  const newClient = async (dataClient) => {
    if (!docClient || !phoneClient) {
      alert(
        "Por favor, preencha todos os campos obrigatórios:\n- Nome\n- Sobrenome\n- CPF/CNPJ\n- Telefone"
      );
      return;
    } else {
      setLoading(true);

      dataClient.docClient = docClient;
      dataClient.numberPhone = phoneClient;
      dataClient.localNumber = houseNumClient;
      dataClient.cep = cepClient;

      const clientCreate = await createClient(dataClient);

      setClientInfo(clientCreate.data || clientCreate.error);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setTimeout(() => {
        setLoadingListClients(true);
      }, 1500);
    }
  };

  const getClientInfo = async (docClient) => {
    const clientDocClient = await getClientByDoc(docClient);

    setClientErro(clientDocClient.data || clientDocClient.error.data);
  };

  const getCepClientInfo = async (cepInfo) => {
    const infoClient = await dispatch(getClientCEP(cepInfo));

    setInfoAddress(infoClient.payload);
  };

  useEffect(() => {
    if (errors.clientName) {
      alert("Por favor Preencha os campos nome");
    }
    if (errors.lastName) {
      alert("Por favor Preencha os campos sobrenome");
    }
  }, [errors]);

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

  useEffect(() => {
    if (cepSearch?.length > 0) {
      getCepClientInfo(cepSearch);
    } else {
      setInfoAddress(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepSearch]);

  useEffect(() => {
    if (cepSearch?.length > 0) {
      getCepClientInfo(cepSearch);
    } else {
      setInfoAddress(null);
      setValue("street", "");
      setValue("district", "");
      setFilterCityClient(null);
      setFilterStateClient(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepSearch]);

  useEffect(() => {
    if (infoAddres) {
      setValue("street", infoAddres.logradouro || "");
      setValue("district", infoAddres.bairro || "");

      // Seta o estado no select
      const estadoOption = estadosOptions.find(
        (e) => e.value === infoAddres.uf
      );
      if (estadoOption) {
        setFilterStateClient(estadoOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoAddres]);

  // 2. Quando os municípios daquele estado estiverem carregados
  useEffect(() => {
    if (infoAddres && municipiosOptions.length > 0) {
      const cidadeOption = municipiosOptions.find(
        (c) => c.value.toLowerCase() === infoAddres.localidade?.toLowerCase()
      );

      if (cidadeOption && cidadeOption.value !== filterCityClient?.value) {
        setFilterCityClient(cidadeOption);
      }
    }
  }, [infoAddres, municipiosOptions]);

  return (
    <DivNewClient>
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
            type="button"
            onClick={() => {
              setShowAdress(!showAdress);
            }}
          >
            Adicionar Endereço
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
            <LabelClient>CEP</LabelClient>
            <PatternFormat
              placeholder="CEP"
              value={cepClient}
              customInput={InputMedium}
              format="#####-###"
              onValueChange={(values, sourceInfo) => {
                setCepClient(values.value);
              }}
            />
          </DivOrgClient>
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
            <InputMedium type="text" maxLength={30} {...register("district")} />
          </DivOrgClient>
          <DivOrgCity>
            <DivOrgInputState>
              {/* <NameLabel>Estado</NameLabel> */}
              <SelectCity
                options={estadosOptions}
                value={filterStateClient}
                isClearable={true}
                onChange={(option) => {
                  setFilterStateClient(option);
                  setFilterCityClient(null); // resetar cidade quando mudar estado
                }}
                isLoading={loadingEstados}
                placeholder="Selecione um Estado"
              />
            </DivOrgInputState>

            <DivOrgInputCity>
              {/* <NameLabel>Cidade</NameLabel> */}
              <SelectCity
                options={municipiosOptions}
                value={filterCityClient}
                onChange={setFilterCityClient}
                isLoading={loadingMunicipios}
                placeholder={
                  filterStateClient
                    ? "Selecione uma Cidade"
                    : "Escolha primeiro um estado"
                }
                isDisabled={!filterStateClient}
              />
            </DivOrgInputCity>
          </DivOrgCity>
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
  );
}
