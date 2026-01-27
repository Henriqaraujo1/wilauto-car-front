import React, { useEffect, useState } from "react";
// imports do Swiper
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  DivRep,
  DivStock,
  StockOne,
  StockTitle,
  StockValue,
  BtnMore,
  TitleStatusStock,
  DivOrgLoading,
  DivOrgTitle,
} from "./StatusStockStyle";
import { ClipLoader } from "react-spinners";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export default function StatusStock(props) {
  const allStock = props.dataInfoHome?.allStock;

  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState();
  const [listStock, setListStock] = useState([]);

  const createCard = (dataRegisters) => {
    setShowList(true);
    if (showList) {
      setListStock(dataRegisters);
    }
  };

  useEffect(() => {
    createCard(allStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStock]);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <DivRep>
      <DivOrgTitle>
        <TitleStatusStock>Estoque</TitleStatusStock>
      </DivOrgTitle>
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        <DivStock
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          loop={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
        >
          {listStock.map((infoStock, index) => {
            return (
              <StockOne key={index}>
                <StockTitle>{infoStock.nameRegister}</StockTitle>
                <StockValue>{infoStock?.countRegister}</StockValue>

                <BtnMore to={infoStock?.path}>Detalhes</BtnMore>
              </StockOne>
            );
          })}
        </DivStock>
      )}
    </DivRep>
  );
}
