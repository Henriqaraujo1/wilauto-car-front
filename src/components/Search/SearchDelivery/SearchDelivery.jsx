import React, { useEffect, useState } from "react";
import { Close, DeleteForever, Edit, Search } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import {
  BtnEdit,
  BtnRemove,
  BtnSearch,
  DivBtnEdit,
  DivBtnSearch,
  DivIdDelivery,
  DivDelivery,
  DivDeliveryInfo,
  DivSearchDelivery,
  DivTableSearch,
  DivInfo,
  TitleSearchDelivery,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  // DivOrgInfo,
  DivOrgCard,
  DivOrgPrices,
  // DivOrgCod,
  DivOrgId,
  FormatValueDeliveryText,
  DivFilter,
  DivOrgInputs,
  // CodInput,
  BtnCancel,
  CityInput,
  DivOrgFilter,
} from "./SearchDeliveryStyle";
import UpdateDelivery from "../../Update/UpdateDelivery/UpdateDelivery";
import DeleteDelivery from "../../DeleteComponent/DeleteDelivery/DeleteDelivery";

export default function SearchDelivery({
  deliverysInfo,
  disableFilter,
  isLoading,
  isFetching,
}) {
  const [deliveryPopUp, setDeliveryPopUp] = useState(false);
  const [delDeliveryOption, setDelDeliveryOption] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState();
  const [filterCodDelivery, setFilterCodDelivery] = useState("");
  const [filterDistrictDelivery, setFilterDistrictDelivery] = useState("");
  const [filterCityDelivery, setFilterCityDelivery] = useState("");
  const [filterInfoDelivery, setFilterInfoDelivery] = useState([]);
  const [showList, setShowList] = useState(false);
  // const [filterValueDelivery, setFilterValueDelivery] = useState("");

  const [dataDeliveryUpdate, setDataDeliveryUpdate] = useState([]);

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (!deliverysInfo) return setFilterInfoDelivery([]);

    let filtered = deliverysInfo;
    const filterCod = Number(filterCodDelivery);
    if (filterCodDelivery && !isNaN(filterCod)) {
      filtered = filtered.filter(
        (delivery) => delivery.idDelivery === filterCod
      );
    }

    if (filterDistrictDelivery.length > 0) {
      filtered = filtered.filter((delivery) =>
        delivery.districtName.includes(
          filterDistrictDelivery.toLocaleLowerCase()
        )
      );
    }
    if (filterCityDelivery.length > 0) {
      filtered = filtered.filter((delivery) =>
        delivery.cityName.toLowerCase().includes(filterCityDelivery.toLowerCase())
      );
    }

    setFilterInfoDelivery(filtered);
  }, [
    deliverysInfo,
    filterCodDelivery,
    filterCityDelivery,
    filterDistrictDelivery,
  ]);

    useEffect(() => {
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchDelivery>
      <DivFilter>
        <TitleSearchDelivery>Consulta Delivery</TitleSearchDelivery>
        <DivOrgFilter show={disableFilter}>
          <DivOrgInputs>
            <NameLabel>Bairro</NameLabel>
            <NameInput
              value={filterDistrictDelivery}
              onChange={(e) => setFilterDistrictDelivery(e.target.value)}
            />
          </DivOrgInputs>
          <DivOrgInputs>
            <NameLabel>Cidade</NameLabel>
            <CityInput
              value={filterCityDelivery}
              onChange={(e) => setFilterCityDelivery(e.target.value)}
            />
            <DivBtnSearch>
              <BtnCancel
                type="button"
                onClick={() => {
                  setFilterCityDelivery("");
                  setFilterCodDelivery("");
                  setFilterDistrictDelivery("");
                  setFilterInfoDelivery(deliverysInfo);
                }}
              >
                <Close />
              </BtnCancel>
            </DivBtnSearch>
          </DivOrgInputs>
        </DivOrgFilter>
      </DivFilter>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoDelivery.map((deliverysInfo, index) => {
            return (
              <DivDelivery key={index}>
                <DivOrgCard>
                  <DivOrgId>
                    <DivIdDelivery>{deliverysInfo.idDelivery}</DivIdDelivery>
                    {/* <DivIdDelivery>1000</DivIdDelivery> */}
                  </DivOrgId>
                  <DivInfo>
                    <DivDeliveryInfo>
                      <SpanName>
                        Bairro: {parseName(deliverysInfo.districtName)}
                      </SpanName>
                      <SpanName>
                        Cidade: {parseName(deliverysInfo.cityName)}
                      </SpanName>

                      {/* <DivOrgInfo> */}
                      {/* <DivOrgCod>
                          <SpanCod>Codigo: {deliverysInfo.idDelivery}</SpanCod>
                        </DivOrgCod> */}
                      <DivOrgPrices>
                        <SpanCod>Valor do frete</SpanCod>
                        <FormatValueDeliveryText
                          displayType="text"
                          value={deliverysInfo.valueDelivery}
                          decimalSeparator=","
                          thousandSeparator="."
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={"R$ "}
                        />
                      </DivOrgPrices>
                      {/* </DivOrgInfo> */}
                    </DivDeliveryInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setDeliveryPopUp(!deliveryPopUp);
                        setDataDeliveryUpdate(deliverysInfo);
                        setSelectedDelivery(deliverysInfo);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {deliveryPopUp &&
                      deliverysInfo.idDelivery ===
                        selectedDelivery.idDelivery && (
                        <UpdateDelivery
                          dataDeliveryUpdate={dataDeliveryUpdate}
                          DeliveryPopUp={deliveryPopUp}
                          setDeliveryPopUp={setDeliveryPopUp}
                        />
                      )}
                    <BtnRemove
                      onClick={() => {
                        setDelDeliveryOption(!delDeliveryOption);
                        setSelectedDelivery(deliverysInfo);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {delDeliveryOption &&
                  deliverysInfo.idDelivery === selectedDelivery.idDelivery && (
                    <DeleteDelivery
                      selectedDelivery={selectedDelivery}
                      delDeliveryOption={delDeliveryOption}
                      setDelDeliveryOption={setDelDeliveryOption}
                    />
                  )}
              </DivDelivery>
            );
          })
        )}
      </DivTableSearch>
    </DivSearchDelivery>
  );
}
