import { useEffect, useState } from "react";
import {
  DivNewPosition,
  FormPosition,
  DivOrgPosition,
  LabelPosition,
  InputPosition,
  SubmitPosition,
  TitleNewPosition,
  DivBtnPosition,
  BtnRemovePosition,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./NewWorkPositionStyle";
import { useForm } from "react-hook-form";
import {
  useCreatePositionMutation,
  useLazyGetInfoPositionQuery,
} from "../../../store/registers/workPosition/position.api";

import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewPosition() {
  // * CreateUser RTX
  const [
    createPosition,
    {
      isLoading: positionLoading,
      isError: positionIsError,
      error: positionInfoError,
    },
  ] = useCreatePositionMutation();

  // * GetEmail
  const [getInfoPosition] = useLazyGetInfoPositionQuery();

  const [positionInfo, setPositionInfo] = useState([]);
  const [namePosition, setNamePosition] = useState("");
  const [positionError, setPositionError] = useState([]);
  const [namePositionSearch] = useDebounce(namePosition, 500);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  // Cadastrar Position
  const newPosition = async (dataPosition) => {
    setLoading(true);
    dataPosition.namePosition = dataPosition.namePosition.toLowerCase();
    const newPositionWork = await createPosition(dataPosition);
    setPositionInfo(newPositionWork.data || newPositionWork.error.data);
    setTimeout(setLoading(false), 150);
  };

  const verifyPosition = async (namePosition) => {
    const positionExists = await getInfoPosition(namePosition.toLowerCase());

    setPositionError(positionExists.data || positionExists.error.data);
  };

  useEffect(() => {
    if (namePositionSearch?.length === 0) {
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
      // setLoading(true)
    }
  }, [positionError.codeStatus]);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setPositionInfo([]);
        setPositionError([]);
      }, 2000);
    }
  }, [formState, reset, setPositionInfo]);

  return (
    <DivNewPosition>
      <TitleNewPosition>Nova Profissão</TitleNewPosition>
      <FormPosition id="form-position" onSubmit={handleSubmit(newPosition)}>
        <DivOrgPosition>
          <LabelPosition>Nome da Profissão</LabelPosition>
          <InputPosition
            type="text"
            maxLength={30}
            {...register("namePosition", {
              onChange: (e) => {
                setNamePosition(e.target.value);
              },
            })}
          />
        </DivOrgPosition>
        {positionError.codeStatus === 200 && (
          <DivOrgResults>
            <InfoResult>Profissão já cadastrada</InfoResult>
          </DivOrgResults>
        )}
        <DivBtnPosition>
          <BtnRemovePosition type="reset">Cancelar</BtnRemovePosition>
          <SubmitPosition type="submit" disabled={disableBtn}>
            Cadastrar
          </SubmitPosition>
        </DivBtnPosition>
      </FormPosition>
      {loading ? (
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
    </DivNewPosition>
  );
}
