import { useEffect, useState } from "react";
import { Close, DeleteForever, Edit, Search } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import {
  BtnEdit,
  BtnRemove,
  DivBtnEdit,
  DivBtnSearch,
  DivIdPosition,
  DivPosition,
  DivPositionInfo,
  DivSearchPosition,
  DivTableSearch,
  DivInfo,
  TitleSearchPosition,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgInfo,
  DivOrgCard,
  DivFilter,
  CodInput,
  DivOrgFilter,
  BtnCancel,
} from "./SearchWorkPositionStyle";
import UpdatePosition from "../../Update/UpdateWorkPosition/UpdateWorkPosition";
import DeletePosition from "../../DeleteComponent/DeletePosition/DeletePosition";

export default function SearchPosition({
  positionsInfo,
  isLoading,
  isFetching,
  disableFilter,
}) {
  const [positionPopUp, setPositionPopUp] = useState(false);
  const [delPositionOption, setDelPositionOption] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState();
  const [filterCodPosition, setFilterCodPosition] = useState("");
  const [filterNamePosition, setFilterNamePosition] = useState("");
  const [filterInfoPosition, setFilterInfoPosition] = useState([]);

  const [showList, setShowList] = useState(false);

  const [dataPositionUpdate, setDataPositionUpdate] = useState([]);

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
    if (!positionsInfo) return setFilterInfoPosition([]);

    let filtered = positionsInfo;

    const filterCod = Number(filterCodPosition);
    if (filterCodPosition && !isNaN(filterCod)) {
      filtered = filtered.filter(
        (position) => position.idPosition === filterCod
      );
    }

    if (filterNamePosition.length > 0) {
      filtered = filtered.filter((position) =>
        position.namePosition.includes(filterNamePosition.toLocaleLowerCase())
      );
    }

    setFilterInfoPosition(filtered);
  }, [positionsInfo, filterCodPosition, filterNamePosition]);

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
    <DivSearchPosition>
      <DivFilter>
        <TitleSearchPosition>Consultar Profissões</TitleSearchPosition>
        <DivOrgFilter show={disableFilter}>
          <NameLabel>Nome</NameLabel>
          <NameInput
            value={filterNamePosition}
            onChange={(e) => setFilterNamePosition(e.target.value)}
          />
          <NameLabel>Codigo</NameLabel>
          <CodInput
            value={filterCodPosition}
            onValueChange={(values) => {
              setFilterCodPosition(parseInt(values.value));
            }}
          />
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCodPosition("");
                setFilterNamePosition("");
                setFilterInfoPosition(positionsInfo);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivOrgFilter>
      </DivFilter>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoPosition?.map((positionsInfo, index) => {
            return (
              <DivPosition key={index}>
                <DivOrgCard>
                  <DivInfo>
                    <DivIdPosition>{index + 1}</DivIdPosition>
                    <DivPositionInfo>
                      <SpanName>
                        Profissão: {parseName(positionsInfo.namePosition)}
                      </SpanName>
                      <DivOrgInfo>
                        <SpanCod>Codigo: {positionsInfo.idPosition}</SpanCod>
                        {/* <SpanCod>Valor: {positionsInfo.valuePosition}</SpanCod> */}
                      </DivOrgInfo>
                    </DivPositionInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setPositionPopUp(!positionPopUp);
                        setDataPositionUpdate(positionsInfo);
                        setSelectedPosition(positionsInfo);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    <BtnRemove
                      onClick={() => {
                        setDelPositionOption(!delPositionOption);
                        setSelectedPosition(positionsInfo);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {delPositionOption &&
                  positionsInfo.idPosition === selectedPosition.idPosition && (
                    <DeletePosition
                      selectedPosition={selectedPosition}
                      delPositionOption={delPositionOption}
                      setDelPositionOption={setDelPositionOption}
                    />
                  )}
              </DivPosition>
            );
          })
        )}
        {positionPopUp && (
          <UpdatePosition
            dataPositionUpdate={dataPositionUpdate}
            PositionPopUp={positionPopUp}
            setPositionPopUp={setPositionPopUp}
          />
        )}
      </DivTableSearch>
    </DivSearchPosition>
  );
}
