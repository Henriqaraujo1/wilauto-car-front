import { useEffect, useState } from "react";
import UpdateCar from "../../Update/UpdateCar/UpdateCar";
import InfoCar from "../../Info/InfoCar/InfoCar";
import {
  Edit,
  DeleteForever,
  Visibility,
  Close,
  FormatListBulleted,
} from "@styled-icons/material";
import {
  BtnEdit,
  BtnRemove,
  BtnView,
  TitleCar,
  DivBtnEdit,
  DivBtnSearch,
  DivCar,
  DivCarInfo,
  DivSearch,
  DivSearchCar,
  DivTableSearch,
  DivInfo,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgCard,
  IdCar,
  DivOrgId,
  DivBtnFilter,
  BtnCancel,
  CodInput,
  DivOrgBtnTable,
  BtnPrices,
  BtnItems,
} from "./SearchCar.style";

import { ClipLoader } from "react-spinners";

export default function SearchCar({
  carsList,
  isLoading,
  disableFilter,
  onUpdated,
}) {
  const [carPopUp, setCarPopUp] = useState(false);
  // const [selectedCarView, setSelectedCarView] = useState();
  const [filterCarPlate, setFilterCarPlate] = useState("");
  const [filterInfoCar, setFilterInfoCar] = useState([]);

  // const [subCarView, setCarView] = useState(false);
  const [showList, setShowList] = useState(false);

  const [dataCarsUpdate, setDataCarsUpdate] = useState([]);

  const parseName = (oneName) => {
    const fullName = oneName;

    const formatName = fullName.split(" ");
    for (var i = 0; i < formatName.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName.join(" ");

    return result;
  };

  useEffect(() => {
    if (!carsList) return setFilterInfoCar([]);

    let filtered = carsList;

    if (filterCarPlate.length > 0) {
      filtered = filtered.filter((car) =>
        car.carPlate.toLowerCase().includes(filterCarPlate.toLowerCase()),
      );
    }

    setFilterInfoCar(filtered);
  }, [carsList, filterCarPlate]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading]);

  return (
    <DivSearchCar>
      <DivSearch>
        <TitleCar>Consulta dos Carros</TitleCar>
        <DivBtnFilter show={disableFilter}>
          <NameLabel>Placa</NameLabel>
          <CodInput
            type="text" // ← obrigatório
            inputMode="text" // ← garante teclado normal
            placeholder="ABC1234 ou ABC1D23"
            value={filterCarPlate}
            onChange={(e) => {
              const value = e.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 7);

              setFilterCarPlate(value);
            }}
          />
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCarPlate("");
                setFilterInfoCar(carsList);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoCar.map((infoCar, index) => {
            return (
              <DivCar key={index}>
                <DivOrgCard>
                  <DivInfo>
                    <DivOrgId>
                      <IdCar>{index + 1}</IdCar>
                    </DivOrgId>
                    <DivCarInfo>
                      <SpanName>{parseName(infoCar?.model)}</SpanName>
                      <SpanCod>Placa: {infoCar?.carPlate}</SpanCod>
                      <SpanCod>Ano: {infoCar?.yearCar}</SpanCod>
                      <SpanCod>Fabricante: {infoCar?.brand}</SpanCod>
                    </DivCarInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      type="button"
                      onClick={() => {
                        setCarPopUp(!carPopUp);
                        setDataCarsUpdate(infoCar);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {/* <BtnView
                      type="button"
                      onClick={() => {
                        setCarView(!subCarView);
                        setSelectedCarView(infoCar);
                      }}
                    >
                      <Visibility />
                    </BtnView> */}
                  </DivBtnEdit>
                </DivOrgCard>
                {carPopUp && infoCar.idCar === dataCarsUpdate.idCar && (
                  <UpdateCar
                    dataCarsUpdate={dataCarsUpdate}
                    carPopUp={carPopUp}
                    setCarPopUp={setCarPopUp}
                    onUpdated={onUpdated}
                  />
                )}
                {/* {subCarView && infoCar.idCar === selectedCarView.idCar && (
                  <InfoCar
                    selectedCarView={selectedCarView}
                    subCarView={subCarView}
                    setCarView={setCarView}
                  />
                )} */}
              </DivCar>
            );
          })
        )}
      </DivTableSearch>
      <DivOrgBtnTable>
        <BtnPrices type="button" to="print-subCars">
          Tabela de Preços
        </BtnPrices>
      </DivOrgBtnTable>
    </DivSearchCar>
  );
}
