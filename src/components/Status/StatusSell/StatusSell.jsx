import React, { useEffect, useState } from "react";
import {
  Control,
  Title,
  Total,
  LinkOrder,
  DivOrgLoading,
} from "./StatusSellStyle";
import { ClipLoader } from "react-spinners";

export default function StatusSell(props) {
  const infoSells = props.dataInfoHome;

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
  return (
    <Control>
      <Title>Vendas Realizadas Hoje</Title>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        <>
          <Total>{infoSells?.resumeToday?.qtdSell || 0}</Total>
        </>
      )}
      <LinkOrder to="/comercial">Realizar Venda</LinkOrder>
    </Control>
  );
}
