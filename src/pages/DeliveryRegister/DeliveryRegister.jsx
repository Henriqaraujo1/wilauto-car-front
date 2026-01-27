import React, { useEffect, useState } from "react";
import {
  DivDelivery,
  TitleDelivery,
  DivScreenDelivery,
} from "./DeliveryRegisterStyle";
import NewDelivery from "../../components/Forms/NewDelivery/NewDelivery";
import SearchDelivery from "../../components/Search/SearchDelivery/SearchDelivery";

import { useGetAllDeliveryQuery } from "../../store/registers/delivery/delivery.api";

export default function DeliveryRegister() {
  const [disableFilter, setDisableFilter] = useState(false);
  const {
    data: deliverys,
    isFetching,
    isLoading,
    // refetch,
  } = useGetAllDeliveryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (deliverys?.errorStatus === true) {
      alert(deliverys?.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [deliverys]);
  return (
    <DivDelivery>
      <TitleDelivery>Preço do Delivery</TitleDelivery>
      <DivScreenDelivery>
        <NewDelivery />
        <SearchDelivery
          deliverysInfo={deliverys?.allDeliverys}
          disableFilter={disableFilter}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </DivScreenDelivery>
    </DivDelivery>
  );
}
