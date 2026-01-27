import React, { useEffect, useState } from "react";
import {
  DivNewProvider,
  FormProvider,
  DivOrgProvider,
  LabelProvider,
  InputProvider,
  LabelProviderStreet,
  InputProviderStreet,
  InputProviderNumber,
  InputMedium,
  SubmitForm,
  DivBtn,
  BtnRemove,
  SelectOption,
  Options,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  DivOrgShowAdress,
  DivBtnShow,
  BtnShow,
  DivOrgClose,
  BtnCloseAdress,
  BtnCNPJ,
  DivOrgCnpj,
  SelectState,
  SelectCity,
  DivOrgCity,
  DivOrgInputCity,
  DivOrgInputState,
} from "./NewProviderStyle";
import { useForm } from "react-hook-form";
import {
  useNewProviderMutation,
  useLazyGetDocProviderQuery,
} from "../../../store/registers/provider/provider.api";
import { ClipLoader } from "react-spinners";
import { PatternFormat } from "react-number-format";
import { Close } from "@styled-icons/material";
import { gerarCNPJ } from "../../../utils/generateCNPJ";
import {
  useGetEstadosQuery,
  useGetMunicipiosByUfQuery,
} from "../../../store/utils/ibge/ibge.api";
import { getClientCEP } from "../../../store/registers/clients/clients.actions";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

export default function NewProvider() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState, setValue } = useForm();

  const [createProvider] = useNewProviderMutation();
  const [getProviderByDoc] = useLazyGetDocProviderQuery();

  const [providerInfo, setProviderInfo] = useState([]);
  const [CNPJProvider, setCNPJProvider] = useState("");
  const [phoneProvider, setPhoneProvider] = useState("");
  const [localNumProvider, setLocalNumProvider] = useState("");
  const [providerErro, setProviderErro] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdress, setShowAdress] = useState(true);

  const [filterCityProvider, setFilterCityProvider] = useState(null);
  const [filterStateProvider, setFilterStateProvider] = useState(null);

  const [infoAddres, setInfoAddress] = useState(null);
  const [cepProvider, setCepProvider] = useState(null);
  const [cepSearch] = useDebounce(cepProvider, 500);

  // Busca estados
  const { data: estados = [], isLoading: loadingEstados } =
    useGetEstadosQuery();

  // Busca municípios de acordo com o UF selecionado
  const { data: municipios = [], isLoading: loadingMunicipios } =
    useGetMunicipiosByUfQuery(filterStateProvider?.sigla, {
      skip: !filterStateProvider,
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

  const newProvider = async (dataProvider) => {
    setLoading(true);
    dataProvider.cnpj = CNPJProvider;
    dataProvider.numberPhone = phoneProvider;
    dataProvider.localNumber = localNumProvider;
    if (dataProvider.cnpj.length === 14) {
      const providerCreate = await createProvider(dataProvider);

      setProviderInfo(providerCreate.data || providerCreate.error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      window.alert(
        "O CNPJ não é valido ou está sem preencher, iremos gerar um numero aleatorio, altere quando achar melhor"
      );
      setCNPJProvider(gerarCNPJ());
      setLoading(false);
    }
  };

  const getCepProviderInfo = async (cepInfo) => {
    const infoProvider = await dispatch(getClientCEP(cepInfo));

    setInfoAddress(infoProvider.payload);
  };

  const verifyProvider = async (infoProvider) => {
    const cnpjProvider = await getProviderByDoc(infoProvider);

    setProviderErro(cnpjProvider.data || cnpjProvider.error.data);
  };

  useEffect(() => {
    if (providerInfo.codeStatus === 200) {
      setTimeout(() => {
        reset();
        setLocalNumProvider("");
        setPhoneProvider("");
        setCNPJProvider("");
        setProviderInfo([]);
      }, 3000);
    }
  }, [
    reset,
    formState,
    setLocalNumProvider,
    setCNPJProvider,
    setPhoneProvider,
    setProviderInfo,
    providerInfo,
  ]);

  useEffect(() => {
    if (CNPJProvider.length === 14) {
      verifyProvider(CNPJProvider);
    } else {
      setProviderErro([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CNPJProvider]);

  useEffect(() => {
    if (providerErro?.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [providerErro]);

  useEffect(() => {
    if (cepSearch?.length > 0) {
      getCepProviderInfo(cepSearch);
    } else {
      setInfoAddress(null);
      setValue("street", "");
      setValue("district", "");
      setFilterCityProvider(null);
      setFilterStateProvider(null);
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
        setFilterStateProvider(estadoOption);
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

      if (cidadeOption && cidadeOption.value !== filterCityProvider?.value) {
        setFilterCityProvider(cidadeOption);
      }
    }
  }, [infoAddres, municipiosOptions]);

  return (
    <DivNewProvider>
      <FormProvider onSubmit={handleSubmit(newProvider)}>
        <DivOrgProvider>
          <LabelProvider>Nome</LabelProvider>
          <InputProvider
            type="text"
            maxLength={100}
            {...register("nameProvider", {
              required: true,
            })}
          />
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProvider>Cnpj</LabelProvider>
          <DivOrgCnpj>
            <PatternFormat
              customInput={InputMedium}
              value={CNPJProvider}
              format="##.###.###/####-##"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values) => {
                setCNPJProvider(values.value);
              }}
            />
            {/* <DivBtnCreate> */}
            <BtnCNPJ
              type="button"
              onClick={() => {
                setCNPJProvider(gerarCNPJ);
              }}
            >
              Gerar CNPJ
            </BtnCNPJ>
          </DivOrgCnpj>
          {/* </DivBtnCreate> */}
        </DivOrgProvider>
        {providerErro.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe um fornecedor com esse CNPJ</InfoResult>
          </DivOrgResults>
        )}
        <DivOrgProvider>
          <LabelProvider>Telefone</LabelProvider>
          <PatternFormat
            customInput={InputMedium}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            value={phoneProvider}
            onValueChange={(values) => {
              setPhoneProvider(values.value);
            }}
          />
        </DivOrgProvider>
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
          <DivOrgProvider>
            <LabelProvider>CEP</LabelProvider>
            <PatternFormat
              placeholder="CEP"
              value={cepProvider}
              customInput={InputMedium}
              format="#####-###"
              onValueChange={(values) => {
                setCepProvider(values.value);
              }}
            />
          </DivOrgProvider>
          <DivOrgProvider>
            <LabelProviderStreet>Rua</LabelProviderStreet>
            <InputProviderStreet
              type="text"
              maxLength={70}
              {...register("street")}
            />
            <PatternFormat
              placeholder="Nº"
              customInput={InputProviderNumber}
              format="Nº #####"
              value={localNumProvider}
              onValueChange={(values) => {
                setLocalNumProvider(values.value);
              }}
            />
          </DivOrgProvider>
          <DivOrgProvider>
            <LabelProvider>Bairro</LabelProvider>
            <InputMedium type="text" maxLength={50} {...register("district")} />
          </DivOrgProvider>
          <DivOrgCity>
            <DivOrgInputState>
              {/* <NameLabel>Estado</NameLabel> */}
              <SelectState
                options={estadosOptions}
                value={filterStateProvider}
                isClearable={true}
                onChange={(option) => {
                  setFilterStateProvider(option);
                  setFilterCityProvider(null); // resetar cidade quando mudar estado
                }}
                isLoading={loadingEstados}
                placeholder="Selecione um Estado"
              />
            </DivOrgInputState>

            <DivOrgInputCity>
              {/* <NameLabel>Cidade</NameLabel> */}
              <SelectCity
                options={municipiosOptions}
                value={filterCityProvider}
                onChange={setFilterCityProvider}
                isLoading={loadingMunicipios}
                placeholder={
                  filterStateProvider
                    ? "Selecione uma Cidade"
                    : "Escolha primeiro um estado"
                }
                isDisabled={!filterStateProvider}
              />
            </DivOrgInputCity>
          </DivOrgCity>
        </DivOrgShowAdress>
        <DivBtn>
          <BtnRemove type="reset">Cancelar</BtnRemove>
          <SubmitForm type="submit" disabled={disableBtn}>
            Cadastrar
          </SubmitForm>
        </DivBtn>
      </FormProvider>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (providerInfo.errorStatus && (
          <DivOrgResults>
            <InfoResult>{providerInfo.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (providerInfo.successStatus && (
          <DivOrgResults>
            <InfoResult>{providerInfo.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivNewProvider>
  );
}
