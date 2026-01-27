import { useEffect, useState } from "react";
import { Close } from "@styled-icons/material";
import {
  DivUpdateProvider,
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
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  SelectOption,
  Options,
} from "./UpdateProviderStyle";
import { infoState } from "../../../utils/infoState.mjs";
import { useForm } from "react-hook-form";
import {
  useUpProviderMutation,
  useLazyGetDocProviderQuery,
} from "../../../store/registers/provider/provider.api";
import { ClipLoader } from "react-spinners";
import { PatternFormat } from "react-number-format";

export default function UpdateProvider({
  dataProviderUpdate,
  providerPopUp,
  setProviderPopUp,
}) {
  const providerDetail = dataProviderUpdate;

  const [
    updtProvider,
    {
      isLoading: providerLoading,
      isError: providerIsError,
      error: providerError,
    },
  ] = useUpProviderMutation();
  const [getCnpjProvider] = useLazyGetDocProviderQuery();

  const { register, handleSubmit } = useForm();
  const [providerInfo, setProviderInfo] = useState([]);
  const [loadingUpdateProvider, setLoadingUpdateProvider] = useState(false);
  const [CNPJProvider, setCNPJProvider] = useState();
  const [phoneProvider, setPhoneProvider] = useState();
  const [localNumProvider, setLocalNumProvider] = useState();
  const [providerErro, setProviderErro] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [dataProvider, setDataProvider] = useState({
    cnpj: providerDetail.cnpj || "",
    nameProvider: providerDetail.nameProvider || "",
    street: providerDetail.street || "",
    numberPhone: providerDetail.numberPhone || "",
    district: providerDetail.district || "",
    city: providerDetail.city || "",
    state: providerDetail.state || "",
    localNumber: providerDetail.localNumber || "",
  });

  const providerUpdt = async () => {
    setLoadingUpdateProvider(true);
    dataProvider.idProvider = providerDetail.idProvider;
    if (CNPJProvider !== undefined) {
      dataProvider.cnpj = CNPJProvider;
    }
    if (phoneProvider !== undefined) {
      dataProvider.numberPhone = phoneProvider;
    }
    if (localNumProvider !== undefined) {
      dataProvider.localNumber = localNumProvider;
    }
    const upProvider = await updtProvider({
      idProvider: providerDetail.idProvider,
      dataProvider: dataProvider,
    });
    setProviderInfo(upProvider.data || upProvider.error.data);
    setTimeout(() => {
      setLoadingUpdateProvider(false);
    }, 1000);
    setTimeout(() => {
      setProviderPopUp(false);
    }, 3000);
  };

  const verifyProvider = async (infoProvider) => {
    const cnpjProvider = await getCnpjProvider(infoProvider);

    setProviderErro(cnpjProvider.data || cnpjProvider.error.data);
  };

  useEffect(() => {
    if (CNPJProvider?.length === 14) {
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

  return (
    <DivUpdateProvider show={providerPopUp}>
      <FormProvider onSubmit={handleSubmit(providerUpdt)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setProviderPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgProvider>
          <LabelProvider>Nome</LabelProvider>
          <InputProvider
            value={dataProvider.nameProvider}
            {...register("nameProvider", {
              onChange: (e) => {
                setDataProvider({
                  ...dataProvider,
                  nameProvider: e.target.value,
                });
              },
            })}
          />
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProvider>CNPJ</LabelProvider>
          <PatternFormat
            value={dataProvider.cnpj}
            customInput={InputMedium}
            format="##.###.###/####-##"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setCNPJProvider(values.value);
            }}
          />
        </DivOrgProvider>
        {providerErro.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já Existe outro Fornecedor com esse CNPJ</InfoResult>
          </DivOrgResults>
        )}
        <DivOrgProvider>
          <LabelProvider>Telefone</LabelProvider>
          <PatternFormat
            value={dataProvider.numberPhone}
            customInput={InputMedium}
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
            onValueChange={(values, sourceInfo) => {
              setPhoneProvider(values.value);
            }}
          />
          {/* <InputMedium {...register("numberProvider")} /> */}
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProviderStreet>Rua</LabelProviderStreet>
          <InputProviderStreet
            value={dataProvider.street}
            {...register("street", {
              onChange: (e) => {
                setDataProvider({
                  ...dataProvider,
                  street: e.target.value,
                });
              },
            })}
          />
          <PatternFormat
            value={dataProvider.localNumber}
            placeholder="Nº"
            customInput={InputProviderNumber}
            format="Nº #####"
            onValueChange={(values, sourceInfo) => {
              setLocalNumProvider(values.value);
            }}
          />
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProvider>Bairro</LabelProvider>
          <InputMedium
            value={dataProvider.district}
            {...register("district", {
              onChange: (e) => {
                setDataProvider({
                  ...dataProvider,
                  district: e.target.value,
                });
              },
            })}
          />
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProvider>Cidade</LabelProvider>
          <InputMedium
            value={dataProvider.city}
            {...register("city", {
              onChange: (e) => {
                setDataProvider({
                  ...dataProvider,
                  city: e.target.value,
                });
              },
            })}
          />
        </DivOrgProvider>
        <DivOrgProvider>
          <LabelProvider>Estado</LabelProvider>
          <SelectOption
            value={dataProvider.state}
            {...register("state", {
              onChange: (e) => {
                setDataProvider({
                  ...dataProvider,
                  state: e.target.value,
                });
              },
            })}
          >
            <Options value="">Selecione</Options>
            {infoState.map((infoStates, index) => {
              return (
                <Options key={index} value={infoStates.value}>
                  {infoStates.value}
                </Options>
              );
            })}
          </SelectOption>
        </DivOrgProvider>
        <DivBtn>
          <BtnRemove type="button" onClick={() => setProviderPopUp(false)}>
            Cancelar
          </BtnRemove>
          <SubmitForm type="submit" disabled={disableBtn}>
            Salvar
          </SubmitForm>
        </DivBtn>
        {loadingUpdateProvider ? (
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
      </FormProvider>
    </DivUpdateProvider>
  );
}
