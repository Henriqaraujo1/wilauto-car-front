import React, { useEffect, useState } from "react";
import {
  DivPosition,
  TitlePosition,
  DivScreenPosition,
} from "./WorkPositionStyle";
import NewPosition from "../../components/Forms/NewWorkPosition/NewWorkPosition";
import SearchPosition from "../../components/Search/SearchWorkPosition/SearchWorkPosition";

import { useGetAllPositionQuery } from "../../store/registers/workPosition/position.api";

export default function PositionRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: positions,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllPositionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (positions?.errorStatus === true) {
      alert(positions?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [positions]);
  return (
    <DivPosition>
      <TitlePosition>Cadastro de Profissão</TitlePosition>
      <DivScreenPosition>
        <NewPosition />
        <SearchPosition
          positionsInfo={positions?.positions}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenPosition>
    </DivPosition>
  );
}
