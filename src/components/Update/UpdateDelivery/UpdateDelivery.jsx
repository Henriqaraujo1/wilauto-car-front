import React, { useState } from "react";
import {
  DivUpdateDelivery,
  FormDelivery,
  DivOrgDelivery,
  LabelDelivery,
  InputDelivery,
  SubmitDelivery,
  DivBtnDelivery,
  BtnRemoveDelivery,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdateDeliveryStyle";
// import {  } from "./UpdateDeliveryStyle";
import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import { useUpDeliveryMutation } from "../../../store/registers/delivery/delivery.api";
import { useDispatch } from "react-redux";
import { NumericFormat } from "react-number-format";
import { ClipLoader } from "react-spinners";

export default function UpdateDelivery(props) {
  const deliveryDetail = props.dataDeliveryUpdate;

  const [updtDelivery, { isLoading: deliveryLoading }] =
    useUpDeliveryMutation();
  const { register, handleSubmit } = useForm();
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [loadingUpdateDelivery, setLoadingUpdateDelivery] = useState();
  const [valueDistrict, setValueDistrict] = useState();
  const [dataDelivery, setDataDelivery] = useState({
    idDelivery: deliveryDetail.idDelivery || "",
    districtName: deliveryDetail.districtName || "",
    cityName: deliveryDetail.cityName || "",
    valueDelivery: deliveryDetail.valueDelivery || "",
  });

  const deliveryUptd = async () => {
    setLoadingUpdateDelivery(true);
    if (valueDistrict !== undefined) {
      dataDelivery.valueDelivery = valueDistrict;
    }
    const upDelivery = await updtDelivery({
      idDelivery: dataDelivery.idDelivery,
      infoDelivery: dataDelivery,
    });
    setDeliveryInfo(upDelivery.data || upDelivery.error.data);
    setTimeout(() => {
      setLoadingUpdateDelivery(false);
    });
    if (upDelivery.data.successStatus === true) {
      setTimeout(() => {
        props.setDeliveryPopUp(false);
      }, 3000);
    }
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = firstName.concat("", lastName);
    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  return (
    <DivUpdateDelivery show={props.DeliveryPopUp}>
      <FormDelivery onSubmit={handleSubmit(deliveryUptd)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => props.setDeliveryPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgDelivery>
          <LabelDelivery>Codigo Delivery</LabelDelivery>
          <LabelDelivery>{dataDelivery.idDelivery}</LabelDelivery>
        </DivOrgDelivery>
        <DivOrgDelivery>
          <LabelDelivery>Bairro</LabelDelivery>
          <InputDelivery
            value={parseName(dataDelivery.districtName)}
            {...register("nameDelivery", {
              onChange: (e) => {
                setDataDelivery({
                  ...dataDelivery,
                  districtName: e.target.value,
                });
              },
            })}
          />
        </DivOrgDelivery>
        <DivOrgDelivery>
          <LabelDelivery>Cidade</LabelDelivery>
          <InputDelivery
            value={dataDelivery.cityName}
            {...register("cityDelivery", {
              onChange: (e) => {
                setDataDelivery({
                  ...dataDelivery,
                  cityName: e.target.value,
                });
              },
            })}
          />
        </DivOrgDelivery>
        <DivOrgDelivery>
          <LabelDelivery>Valor</LabelDelivery>
          <NumericFormat
            value={dataDelivery.valueDelivery}
            placeholder="R$"
            customInput={InputDelivery}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
            onValueChange={(values, sourceInfo) => {
              setValueDistrict(Number(values.value));
            }}
          />
        </DivOrgDelivery>
        <DivBtnDelivery>
          <BtnRemoveDelivery
            type="cancel"
            onClick={() => {
              props.setDeliveryPopUp(false);
            }}
          >
            Cancelar
          </BtnRemoveDelivery>
          <SubmitDelivery type="submit">Salvar</SubmitDelivery>
        </DivBtnDelivery>
        {loadingUpdateDelivery ? (
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
      </FormDelivery>
    </DivUpdateDelivery>
  );
}
