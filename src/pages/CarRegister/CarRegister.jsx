import {
  BtnClose,
  DivBtnClose,
  DivCarRegister,
  DivScreenCar,
  TitleCar,
} from "./CarRegister.style";
// import { useEffect, useState } from "react";
// import { useGetSubCarByIdCarQuery } from "../../store/registers/subItems/subItems.api";
import SearchCar from "../../components/Search/SearchCar/SearchCar";
import NewCar from "../../components/Forms/NewCar/NewCar";
import { Close } from "@styled-icons/material";
import { useLazyGetCarByClientQuery } from "../../store/registers/cars/cars.api";
import { useEffect, useState } from "react";

export default function CarRegister({ carPopUp, dataClientCar, setCarPopUp }) {
  const [disableFilter, setDisableFilter] = useState(false);

  const [getCarClients, { data: carsList, isLoading }] =
    useLazyGetCarByClientQuery();

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    if (lastName.length > 0) {
      var fullName = firstName.concat(" ", lastName);
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  const reloadCars = () => {
    if (dataClientCar?.idClient) {
      getCarClients(dataClientCar.idClient);
    }
  };

  useEffect(() => {
    if (!dataClientCar?.idClient) {
      getCarClients(dataClientCar?.idClient);
    }

    if (carsList?.codeStatus === 404) {
      setDisableFilter(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataClientCar, carsList]);

  return (
    <DivCarRegister show={carPopUp}>
      <DivBtnClose>
        <BtnClose type="button" onClick={() => setCarPopUp(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <TitleCar>
        Cadastro de carros do{" "}
        {parseName(dataClientCar?.clientName, dataClientCar?.lastName)}
      </TitleCar>
      <DivScreenCar>
        <NewCar dataClientCar={dataClientCar} />

        <SearchCar
          carsList={carsList?.cars}
          isLoading={isLoading}
          disableFilter={disableFilter}
          onUpdated={reloadCars}
        />
      </DivScreenCar>
    </DivCarRegister>
  );
}
