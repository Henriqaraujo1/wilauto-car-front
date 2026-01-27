import { useEffect, useState } from "react";
import {
  FormDelivery,
  DivOrgDelivery,
  LabelDelivery,
  InputDelivery,
  SubmitDelivery,
  TitleNewDelivery,
  DivBtnDelivery,
  BtnRemoveDelivery,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./NewDeliveryStatus";
import { DivNewDelivery } from "./NewDeliveryStatus";
import { useForm } from "react-hook-form";
import { useCreateDeliveryMutation } from "../../../store/registers/delivery/delivery.api";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

export default function NewDelivery() {
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [valueDelivery, setValueDelivery] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingListDeliverys, setLoadingListDeliverys] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  // * RTK - createDelivery
  // * CreateUser RTX
  const [
    createDelivery,
    {
      isLoading: deliveryLoading,
      isError: deliveryIsError,
      error: deliveryError,
    },
  ] = useCreateDeliveryMutation();

  // Cadastrar Delivery
  const newDelivery = async (dataDelivery) => {
    setLoading(true);
    const newDelivery = {
      cityName: dataDelivery.cityName.toLowerCase(),
      districtName: dataDelivery.districtName.toLowerCase(),
    };

    newDelivery.valueDelivery = Number(valueDelivery.toFixed(2));
    
    const deliveryCreate = await createDelivery(newDelivery);
    setDeliveryInfo(deliveryCreate.data || deliveryCreate.error.data);
    setTimeout(setLoading(false), 150);
    setTimeout(setLoadingListDeliverys(true), 1500);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset();
        setValueDelivery("");
      }, 1000);
      setTimeout(() => {
        setDeliveryInfo([]);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset, setValueDelivery]);

  return (
    <DivNewDelivery>
      <TitleNewDelivery>Cadastro do Delivery</TitleNewDelivery>
      <FormDelivery id="form-delivery" onSubmit={handleSubmit(newDelivery)}>
        <DivOrgDelivery>
          <LabelDelivery>Nome do Bairro</LabelDelivery>
          <InputDelivery
            type="text"
            maxLength={30}
            {...register("districtName")}
          />
        </DivOrgDelivery>
        <DivOrgDelivery>
          <LabelDelivery>Nome da Cidade</LabelDelivery>
          <InputDelivery type="text" maxLength={30} {...register("cityName")} />
        </DivOrgDelivery>
        <DivOrgDelivery>
          <LabelDelivery>Valor</LabelDelivery>
          <NumericFormat
            placeholder=""
            value={valueDelivery}
            customInput={InputDelivery}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
            onValueChange={(values, sourceInfo) => {
              setValueDelivery(Number(values.value));
            }}
          />
        </DivOrgDelivery>
        <DivBtnDelivery>
          <BtnRemoveDelivery type="reset">Cancelar</BtnRemoveDelivery>
          <SubmitDelivery type="submit">Adicionar</SubmitDelivery>
        </DivBtnDelivery>
      </FormDelivery>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (deliveryInfo.errorStatus && (
          <DivOrgResults>
            <InfoResult>{deliveryInfo.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (deliveryInfo.successStatus && (
          <DivOrgResults>
            <InfoResult>{deliveryInfo.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivNewDelivery>
  );
}
