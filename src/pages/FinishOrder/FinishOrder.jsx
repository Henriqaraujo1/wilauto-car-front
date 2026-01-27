import React from "react";
import { DivFinishOrder } from "./FinishOrderStyle";
import ChangeOrder from "../../components/ChangeOrder/ChangeOrder";
import { useLocation } from "react-router-dom";

export default function FinishOrder() {
  const location = useLocation();
  let { orderInfo } = 0;
  orderInfo = location.state;

  return (
    <DivFinishOrder>
      <ChangeOrder orderInfo={orderInfo} />
    </DivFinishOrder>
  );
}
