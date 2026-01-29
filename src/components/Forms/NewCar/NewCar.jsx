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
  SelectType,
  InputSmall,
  InputCodCar,
  SelectOption,
  Options,
  DivItemStockEntry,
} from "./NewCar.style";
import { NumericFormat, PatternFormat } from "react-number-format";
import { Controller } from "react-hook-form";
// import TableNewCar from "../../Tables/TableNewCar/TableNewCar";
import { useForm } from "react-hook-form";
import {
  useCreateCarMutation,
  useLazyGetCarPlateQuery,
} from "../../../store/registers/cars/cars.api";

// import {
//   useLazyGetIdSubCarQuery,
//   useLazyGetNameSubCarQuery,
//   useNewSubCarMutation,
// } from "../../../store/registers/subItems/subItems.api";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "use-debounce";

export default function NewCar({ carPopUp, dataClientCar }) {
  const [carPlateInfo, setCarPlateInfo] = useState([]);
  const [carInfo, setCarInfo] = useState(null);
  const [carCreated, setCarCreated] = useState([]);
  const [loadingCar, setLoadingCar] = useState(false);
  const [loadingNewCar, setLoadingNewCar] = useState(false);
  const [carPlateSearch] = useDebounce(carPlateInfo, 500);
  const [buttonHide, setButtonHide] = useState(false);

  // // Info Money
  // const [valueProfit, setValueProfit] = useState(0);
  // const [valueBuy, setValueBuy] = useState(0);

  // CreateCar and
  const [createCar] = useCreateCarMutation();

  // * GetNameCode
  const [getCarPlate] = useLazyGetCarPlateQuery();

  const { register, handleSubmit, reset, formState } = useForm();

  const getInfoCar = async (plate) => {
    setLoadingCar(true);
    const infoCar = await getCarPlate(plate);

    setCarInfo(infoCar.data || infoCar.error.data);
    setTimeout(() => {
      setLoadingCar(false);
    }, 250);
  };

  const newCar = async (dataCar) => {
    setLoadingNewCar(false);
    dataCar.idClient = dataClientCar?.idClient;
    const createCarClient = await createCar(dataCar);

    setCarCreated(createCarClient.data || createCarClient.error.data);
    setTimeout(() => {
      setLoadingNewCar(false);
    }, 250);
  };

  useEffect(() => {
    if (carPlateSearch?.length > 0) {
      getInfoCar(carPlateSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carPlateSearch]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setCarPlateInfo([]);
        setCarCreated([]);
      }, 5000);
    }
  }, [formState, reset]);

  useEffect(() => {
    if (carInfo?.codeStatus === 200) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
  }, [carInfo]);

  return (
    <DivNewCar show={carPopUp}>
      <DivItemStockEntry>
        <FormCar onSubmit={handleSubmit(newCar)}>
          <DivFormCar>
            <DivOrgCar>
              <LabelCar>Nº da Placa</LabelCar>
              <InputCodCar
                type="text"
                placeholder="ABC1234 ou ABC1D23"
                {...register("carPlate", {
                  required: true,
                  onChange: (e) => {
                    let value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                      .slice(0, 7);

                    // Atualiza o valor manualmente
                    e.target.value = value;
                    setCarPlateInfo(e.target.value);
                  },
                  validate: (value) =>
                    /^[A-Z]{3}\d{4}$/.test(value) || // antiga
                    /^[A-Z]{3}\d[A-Z]\d{2}$/.test(value) // Mercosul
                      ? true
                      : "Placa inválida",
                })}
              />
            </DivOrgCar>
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
                  required: true,
                })}
              />
            </DivOrgCar>
            <DivOrgCar>
              <LabelCar>Marca</LabelCar>
              <InputCodCar
                type="text"
                placeholder="Ford / VW"
                maxLength={100}
                {...register("brand", {
                  required: true,
                })}
              />
            </DivOrgCar>
            <DivOrgCar>
              <LabelCar>Ano</LabelCar>
              <InputCodCar
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                {...register("yearCar", {
                  required: true,
                  onChange: (e) => {
                    let value = e.target.value
                      .replace(/\D/g, "") // só números
                      .slice(0, 4); // no máximo 4 dígitos

                    e.target.value = value;
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
            <DivBtnCar>
              <BtnRemoveCar type="reset">Cancelar</BtnRemoveCar>
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
