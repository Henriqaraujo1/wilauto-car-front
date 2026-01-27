import React, { useEffect, useState } from "react";
import {
  DivUpdateBrand,
  FormBrand,
  DivOrgBrand,
  LabelBrand,
  InputBrand,
  SubmitBrand,
  DivBtnBrand,
  BtnRemoveBrand,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdateBrandStyle";
import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import {
  useUpBrandMutation,
  useLazyGetBrandQuery,
} from "../../../store/registers/brand/brand.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdateBrand({
  dataBrandUpdate,
  brandPopUp,
  setBrandPopUp,
}) {
  const brandDetail = dataBrandUpdate;

  const [
    updtBrand,
    { isLoading: brandLoading, isError: brandIsError, error: brandError },
  ] = useUpBrandMutation();
  const [getBrandInfo] = useLazyGetBrandQuery();

  const { register, handleSubmit } = useForm();
  const [loadingUpdateBrand, setLoadingUpdateBrand] = useState();
  const [loadingBrand, setLoadingBrand] = useState();
  const [nameBrand, setNameBrand] = useState();
  const [nameBrandSearch] = useDebounce(nameBrand, 500);
  const [brandInfo, setBrandInfo] = useState([]);
  const [upBrand, setUpBrand] = useState([]);
  const [dataBrand, setDataBrand] = useState({
    brandName: brandDetail.brandName || "",
  });

  const brandUptd = async (upBrand) => {
    setLoadingUpdateBrand(true);
    upBrand.idBrand = brandDetail.idBrand;
    upBrand.brandName = dataBrand.brandName.toLowerCase();
    const changeBrand = await updtBrand({
      idBrand: brandDetail.idBrand,
      dataBrand: upBrand,
    });
    setUpBrand(changeBrand.data || changeBrand.error.data);
    setTimeout(() => {
      setLoadingUpdateBrand(false);
    }, 1000);
    if (changeBrand.data.successStatus === true) {
      setTimeout(() => {
        setBrandPopUp(false);
      }, 3000);
    }
  };

  //Buscar marca antes de cadastrar
  const getBrand = async (dataBrand) => {
    setLoadingBrand(true);
    const nameBrandInfo = await getBrandInfo(dataBrand.toLowerCase());
    setBrandInfo(nameBrandInfo.data || nameBrandInfo.error.data);
    setTimeout(setLoadingBrand(false), 1000);
  };

  useEffect(() => {
    if (nameBrandSearch?.length === 0) {
      setBrandInfo(nameBrandSearch);
    } else if (nameBrandSearch) {
      getBrand(nameBrandSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameBrandSearch]);
  return (
    <DivUpdateBrand show={brandPopUp}>
      <FormBrand onSubmit={handleSubmit(brandUptd)}>
        <DivBtnClose>
          <BtnClose type="button" onClick={() => setBrandPopUp(false)}>
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgBrand>
          <LabelBrand>Nome</LabelBrand>

          <InputBrand
            value={dataBrand.brandName}
            {...register("brandName", {
              onChange: (e) => {
                setDataBrand({
                  ...dataBrand,
                  brandName: e.target.value,
                });
                setNameBrand(e.target.value);
              },
            })}
          />
        </DivOrgBrand>
        {loadingBrand ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          brandInfo?.successStatus && (
            <DivOrgResults>
              <InfoResult>{brandInfo.message}</InfoResult>
            </DivOrgResults>
          )
        )}
        <DivBtnBrand>
          <BtnRemoveBrand type="button" onClick={() => setBrandPopUp(false)}>
            Cancelar
          </BtnRemoveBrand>
          <SubmitBrand type="submit">Salvar</SubmitBrand>
        </DivBtnBrand>
        {loadingUpdateBrand ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (upBrand.errorStatus && (
            <DivOrgResults>
              <InfoResult>{upBrand.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (upBrand.successStatus && (
            <DivOrgResults>
              <InfoResult>{upBrand.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormBrand>
    </DivUpdateBrand>
  );
}
