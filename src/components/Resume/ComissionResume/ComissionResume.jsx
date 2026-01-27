import React, { useEffect, useState } from "react";
import {
  DivComission,
  DivComissionTable,
  DivComissionCard,
  DivDetailClient,
  DivIdClient,
  DivInfoDetailsClient,
  DivBtn,
  IdSpan,
  NameClient,
  Value,
  InfoValue,
  LinkPage,
  DivOrgLoading,
  PriceBuyed,
  DivOrgValues,
  DivOrgInfo,
  DivFilter,
  DivOrgFilter,
  LabelFilter,
  InputFilter,
  BtnFilter,
  DivOrgBtn,
  BtnCancel,
  DivOrgSales,
  DivFilterSelect,
  SelectOption,
  DivOrgBtnComission,
  BtnComission,
} from "./ComissionResumeStyle";

import { ClipLoader } from "react-spinners";
import { Close, Search } from "@styled-icons/material";
import { allPosition } from "../../../store/registers/workPosition/position.actions";
import { useDispatch } from "react-redux";
import NewComission from "../../Forms/NewComission/NewComission";

export default function ComissionResume(props) {
  const infoComissions = props.infoComissions;
  const dispatch = useDispatch();

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filterNameClient, setFilterNameClient] = useState("");
  const [filterComission, setFilterComission] = useState([]);
  const [createComission, setCreateComission] = useState([]);

  const [showComission, setShowComission] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [infoPosition, setInfoPositions] = useState([]);
  const [optionsPosition, setOptionsPosition] = useState();
  const [position, setPosition] = useState([]);
  const [isClearable] = useState(true);

  const createListOrders = (dataClient) => {
    setLoadingOrders(true);
    setShowList(true);
    if (showList) {
      setFilterComission(dataClient);
    }
    setTimeout(() => {
      setLoadingOrders(false);
    }, 1000);
  };

  const getInfoPositions = async () => {
    const listPosition = await dispatch(allPosition());
    setInfoPositions(listPosition.payload);
  };

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

  const sendPosition = (position) => {
    setPosition(position);
  };

  const filterClientResume = () => {
    const filterList = infoComissions
      .filter((comission) =>
        filterNameClient.length > 0
          ? comission.nameEmployee.includes(filterNameClient)
          : comission
      )
      .filter((comission) =>
        position ? comission.idPosition === position.value : comission
      );

    setFilterComission(filterList);
  };

  const sendComissions = () => {
    const comissionsData = {};
    infoComissions.forEach((comissions) => {
      const {
        idComissionNoPayed,
        nameEmployee,
        totalComissionNoPayed,
        idEmployee,
      } = comissions;

      if (!comissionsData[idEmployee]) {
        comissionsData[idEmployee] = {
          idComissionNoPayed: [],
          nameEmployee: "",
          totalComissionNoPayed: 0,
          idEmployee: 0,
        };
      }

      comissionsData[idEmployee].idComissionNoPayed = idComissionNoPayed;
      comissionsData[idEmployee].nameEmployee = nameEmployee;
      comissionsData[idEmployee].totalComissionNoPayed = totalComissionNoPayed;
      comissionsData[idEmployee].idEmployee = idEmployee;
    });

    const organizeComission = [];
    for (const [, currentComission] of Object.entries(comissionsData)) {
      organizeComission.push(currentComission);
    }

    setCreateComission(organizeComission);
  };

  useEffect(() => {
    getInfoPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createListOrders(infoComissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoComissions]);

  useEffect(() => {
    if (infoPosition?.positions?.length > 0) {
      const listPosition = infoPosition?.positions.map((position) => ({
        value: position.idPosition,
        label: position.namePosition,
      }));
      setOptionsPosition(listPosition);
    }
  }, [infoPosition]);

  useEffect(() => {
    if (infoComissions?.length > 0) {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }, [infoComissions]);

  return (
    <DivOrgSales>
      <DivFilter show={props.disableFilter}>
        <DivOrgBtnComission show={showFilter}>
          <BtnComission
            type="button"
            onClick={() => {
              setShowComission(!showComission);
              sendComissions();
            }}
          >
            Gerar Comissões
          </BtnComission>
        </DivOrgBtnComission>

        <DivOrgFilter>
          <DivFilterSelect>
            <SelectOption
              name="position"
              placeholder="Selecione por função"
              options={optionsPosition}
              isClearable={isClearable}
              onChange={sendPosition}
            />
          </DivFilterSelect>
          <LabelFilter>Nome</LabelFilter>
          <InputFilter
            value={filterNameClient}
            onChange={(e) => setFilterNameClient(e.target.value)}
          />
          <DivOrgBtn>
            <BtnFilter type="button" onClick={filterClientResume}>
              <Search />
            </BtnFilter>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterNameClient("");
                setFilterComission(infoComissions);
              }}
            >
              <Close />
            </BtnCancel>
          </DivOrgBtn>
        </DivOrgFilter>
      </DivFilter>
      <DivComission>
        <DivComissionTable>
          {loadingOrders ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterComission?.map((comissions, index) => {
              return (
                <DivComissionCard key={index}>
                  <DivDetailClient>
                    <DivIdClient>
                      <IdSpan>{index + 1}</IdSpan>
                    </DivIdClient>
                    <DivInfoDetailsClient>
                      <NameClient>
                        {parseName(comissions.nameEmployee)} -{" "}
                        {parseName(comissions.namePosition)}
                      </NameClient>
                      <DivOrgInfo>
                        <DivOrgValues>
                          <Value>Comissão</Value>
                          <InfoValue>{comissions.percentComission} %</InfoValue>
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>QTd Vendida</Value>
                          <InfoValue>{comissions.totalSells}</InfoValue>
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>Total Comissão Paga</Value>
                          <PriceBuyed
                            displayType="text"
                            value={comissions.totalComissionPayed}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>Total Comissão Não paga</Value>
                          <PriceBuyed
                            displayType="text"
                            value={comissions.totalComissionNoPayed}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>Total Vendido</Value>
                          <PriceBuyed
                            displayType="text"
                            value={comissions.totalOrder}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                      </DivOrgInfo>
                    </DivInfoDetailsClient>
                  </DivDetailClient>
                  <DivBtn>
                    {/* <BtnDetail>Pagamento</BtnDetail> */}
                    <LinkPage
                      to="resume-comission"
                      state={{ infoComission: comissions }}
                    >
                      Vendas
                    </LinkPage>
                  </DivBtn>
                </DivComissionCard>
              );
            })
          )}
          <NewComission
            showComission={showComission}
            setShowComission={setShowComission}
            createComission={createComission}
            periodDate={props.periodDate}
            setResetFilter={props.setResetFilter}
          />
        </DivComissionTable>
      </DivComission>
    </DivOrgSales>
  );
}
