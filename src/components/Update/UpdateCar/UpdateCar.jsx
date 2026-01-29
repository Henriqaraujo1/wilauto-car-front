import { Close } from "@styled-icons/material";
import { useEffect, useState } from "react";
import {
  DivNewCar,
  FormCar,
  DivFormCar,
  DivOrgCar,
  LabelCar,
  InputCarName,
  DivBtnCar,
  BtnRemoveCar,
  SubmitCar,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  InputCodCar,
  DivItemStockEntry,
  ErrorMessage,
  DivBtnClose,
  BtnClose,
} from "./UpdateCar.style";

import { useForm } from "react-hook-form";
import {
  useUpdateCarMutation,
  useLazyGetCarPlateQuery,
} from "../../../store/registers/cars/cars.api";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";

export default function UpdateCar({
  dataCarsUpdate,
  carPopUp,
  setCarPopUp,
  onUpdated,
}) {
  const [carPlateInfo, setCarPlateInfo] = useState([]);
  const [carInfo, setCarInfo] = useState(null);
  const [carCreated, setCarCreated] = useState([]);
  const [loadingCar, setLoadingCar] = useState(false);
  const [loadingNewCar, setLoadingNewCar] = useState(false);
  const [carPlateSearch] = useDebounce(carPlateInfo, 500);
  const [buttonHide, setButtonHide] = useState(false);

  const [dataCar, setDataCar] = useState({
    idCar: dataCarsUpdate?.idCar,
    carPlate: dataCarsUpdate?.carPlate || "",
    model: dataCarsUpdate?.model || "",
    brand: dataCarsUpdate?.brand || "",
    yearCar: dataCarsUpdate?.yearCar || "",
  });

  // UpdateCar and
  const [updateCar] = useUpdateCarMutation();

  // * GetNameCode
  const [getCarPlate] = useLazyGetCarPlateQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const getInfoCar = async (plate) => {
    setLoadingCar(true);
    const infoCar = await getCarPlate(plate);

    setCarInfo(infoCar.data || infoCar.error.data);
    setTimeout(() => {
      setLoadingCar(false);
    }, 250);
  };

  const upCar = async () => {
    try {
      setLoadingNewCar(true);

      const payload = {
        idCar: dataCarsUpdate.idCar,
        infoCar: {
          ...dataCar,
          idClient: dataCarsUpdate.idClient,
        },
      };

      const result = await updateCar(payload).unwrap();

      setCarCreated(result);

      setCarPopUp(false); // fecha popup
      onUpdated(); // recarrega lista no pai
    } catch (err) {
      setCarCreated(err?.data || err);
    } finally {
      setLoadingNewCar(false);
    }
  };

  useEffect(() => {
    if (carPlateSearch?.length > 0) {
      getInfoCar(carPlateSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carPlateSearch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {}, 5000);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (carInfo?.codeStatus === 200) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
  }, [carInfo]);

  useEffect(() => {
    if (dataCar?.carPlate) {
      setValue("carPlate", dataCar.carPlate, {
        shouldValidate: true,
      });
    }
    if (dataCar?.model) {
      setValue("model", dataCar.model, {
        shouldValidate: true,
      });
    }
    if (dataCar?.brand) {
      setValue("brand", dataCar.brand, {
        shouldValidate: true,
      });
    }
    if (dataCar?.yearCar) {
      setValue("yearCar", dataCar.yearCar, {
        shouldValidate: true,
      });
    }
  }, [dataCar, setValue]);

  return (
    <DivNewCar show={carPopUp}>
      <DivItemStockEntry>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              setCarPopUp(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <FormCar onSubmit={handleSubmit(upCar)}>
          <DivFormCar>
            <DivOrgCar>
              <LabelCar>Nº da Placa</LabelCar>
              <InputCodCar
                type="text"
                placeholder="ABC1234 ou ABC1D23"
                {...register("carPlate", {
                  required: "Digita a placa do carro",
                  onChange: (e) => {
                    let value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                      .slice(0, 7);

                    // Atualiza o valor manualmente
                    e.target.value = value;
                    (setCarPlateInfo(e.target.value),
                      setDataCar({
                        ...dataCar,
                        carPlate: e.target.value,
                      }));
                  },
                  validate: (value) =>
                    /^[A-Z]{3}\d{4}$/.test(value) || // antiga
                    /^[A-Z]{3}\d[A-Z]\d{2}$/.test(value) // Mercosul
                      ? true
                      : "Placa inválida",
                })}
              />
            </DivOrgCar>
            {errors.carPlate && (
              <ErrorMessage>{errors.carPlate.message}</ErrorMessage>
            )}
            {loadingCar ? (
              <DivOrgLoading>
                <ClipLoader speedMultiplier={3} />
              </DivOrgLoading>
            ) : (
              carInfo?.codeStatus === 200 && (
                <DivOrgResults>
                  <InfoResult>
                    Carro já cadastrado, use outra placa para cadastrar esse
                    carro.
                  </InfoResult>
                </DivOrgResults>
              )
            )}
            <DivOrgCar>
              <LabelCar>Modelo</LabelCar>
              <InputCarName
                type="text"
                maxLength={100}
                {...register("model", {
                  required: "Digite o modelo do carro",
                  onChange: (e) => {
                    setDataCar({
                      ...dataCar,
                      model: e.target.value,
                    });
                  },
                })}
              />
            </DivOrgCar>
            {errors.model && (
              <ErrorMessage>{errors.model.message}</ErrorMessage>
            )}
            <DivOrgCar>
              <LabelCar>Marca</LabelCar>
              <InputCodCar
                type="text"
                placeholder="Ford / VW"
                maxLength={100}
                {...register("brand", {
                  required: "Digite o fabricante do carro",
                  onChange: (e) => {
                    setDataCar({
                      ...dataCar,
                      brand: e.target.value,
                    });
                  },
                })}
              />
            </DivOrgCar>
            {errors.brand && (
              <ErrorMessage>{errors.brand.message}</ErrorMessage>
            )}
            <DivOrgCar>
              <LabelCar>Ano</LabelCar>
              <InputCodCar
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                {...register("yearCar", {
                  required: "Digite o ano do carro",
                  onChange: (e) => {
                    let value = e.target.value
                      .replace(/\D/g, "") // só números
                      .slice(0, 4); // no máximo 4 dígitos

                    e.target.value = value;
                    setDataCar({
                      ...dataCar,
                      yearCar: e.target.value,
                    });
                  },
                  validate: (value) => {
                    if (value.length !== 4) return "Ano inválido";

                    const year = Number(value);
                    const currentYear = new Date().getFullYear() + 1;

                    return year >= 1900 && year <= currentYear
                      ? true
                      : "Ano fora do intervalo";
                  },
                })}
              />
            </DivOrgCar>
            {errors.yearCar && (
              <ErrorMessage>{errors.yearCar.message}</ErrorMessage>
            )}
            <DivBtnCar>
              <BtnRemoveCar type="reset" onClick={() => setCarPopUp(false)}>Cancelar</BtnRemoveCar>
              <SubmitCar type="submit" disabled={buttonHide}>
                Cadastrar
              </SubmitCar>
            </DivBtnCar>
          </DivFormCar>
        </FormCar>

        {loadingNewCar ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          (carCreated.errorStatus && (
            <DivOrgResults>
              <InfoResult>{carCreated.message}</InfoResult>
            </DivOrgResults>
          )) ||
          (carCreated.successStatus && (
            <DivOrgResults>
              <InfoResult>{carCreated.message}</InfoResult>
            </DivOrgResults>
          ))
        )}
      </DivItemStockEntry>
      {/* <TableNewCar /> */}
    </DivNewCar>
  );
}
