import React, { useEffect, useState } from "react";
import {
  DivUpdatePosition,
  FormPosition,
  DivOrgPosition,
  LabelPosition,
  InputPosition,
  SubmitPosition,
  DivBtnPosition,
  BtnRemovePosition,
  DivBtnClose,
  BtnClose,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdateWorkPositionStyle";

import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/material";

import {
  useLazyGetInfoPositionQuery,
  useUpPositionMutation,
} from "../../../store/registers/workPosition/position.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function UpdatePosition({
  dataPositionUpdate,
  PositionPopUp,
  setPositionPopUp,
}) {
  const positionDetail = dataPositionUpdate;

  const [
    updtPosition,
    { isLoading: positionLoading, isError: positionIsError },
  ] = useUpPositionMutation();
  const [getInfoPosition] = useLazyGetInfoPositionQuery();

  const { register, handleSubmit } = useForm();
  const [positionInfo, setPositionInfo] = useState([]);
  const [namePosition, setNamePosition] = useState("");
  const [positionError, setPositionError] = useState([]);
  const [namePositionSearch] = useDebounce(namePosition, 500);
  const [disableBtn, setDisableBtn] = useState(false);

  const [loadingUpdatePosition, setLoadingUpdatePosition] = useState();
  // const [valuePosition, setValuePosition] = useState();
  const [dataPosition, setDataPosition] = useState({
    idPosition: positionDetail.idPosition || "",
    namePosition: positionDetail.namePosition || "",
  });

  const positionUptd = async () => {
    setLoadingUpdatePosition(true);
    const upPosition = await updtPosition({
      idPosition: positionDetail.idPosition,
      dataPosition: dataPosition,
    });
    setPositionInfo(upPosition.data || upPosition.error.data);
    setTimeout(() => {
      setLoadingUpdatePosition(false);
    }, 500);
    if (upPosition.data.successStatus === true) {
      setTimeout(() => {
        setPositionPopUp(false);
      }, 3000);
    }
  };

  const verifyPosition = async (namePosition) => {
    const positionExists = await getInfoPosition(namePosition.toLowerCase());
    setPositionError(positionExists.data || positionExists.error.data);
  };

  useEffect(() => {
    if (namePositionSearch.length === 0) {
      setPositionError(namePositionSearch);
    }

    if (namePositionSearch) {
      verifyPosition(namePositionSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namePositionSearch]);

  useEffect(() => {
    if (positionError.codeStatus === 200) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [positionError.codeStatus]);

  return (
    <DivUpdatePosition show={PositionPopUp}>
      <FormPosition type="button" onSubmit={handleSubmit(positionUptd)}>
        <DivBtnClose>
          <BtnClose
            onClick={() => {
              setPositionPopUp(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <DivOrgPosition>
          <LabelPosition>Codigo Profissão</LabelPosition>
          <LabelPosition>{dataPosition.idPosition}</LabelPosition>
        </DivOrgPosition>
        <DivOrgPosition>
          <LabelPosition>Profissão</LabelPosition>
          <InputPosition
            value={dataPosition.namePosition}
            {...register("namePosition", {
              onChange: (e) => {
                setDataPosition({
                  ...dataPosition,
                  namePosition: e.target.value,
                });
                setNamePosition(e.target.value);
              },
            })}
          />
        </DivOrgPosition>
        {positionError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Já existe uma categoria com esse nome</InfoResult>
          </DivOrgResults>
        )}
        <DivBtnPosition>
          <BtnRemovePosition
            type="cancel"
            onClick={() => {
              setPositionPopUp(false);
            }}
          >
            Cancelar
          </BtnRemovePosition>
          <SubmitPosition type="submit" disabled={disableBtn}>
            Salvar
          </SubmitPosition>
        </DivBtnPosition>
        {loadingUpdatePosition ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (positionInfo.errorStatus && (
            <DivOrgResults>
              <InfoResult>{positionInfo.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (positionInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{positionInfo.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </FormPosition>
    </DivUpdatePosition>
  );
}
