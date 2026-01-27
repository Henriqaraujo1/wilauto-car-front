import React, { useEffect, useState } from "react";
import {
  DivRep,
  DivReport,
  ReportOne,
  ReportTitle,
  ReportValue,
  BtnMore,
  TitleStatusReport,
  DivOrgLoading,
  DivOrgTitle,
} from "./StatusReportStyle";
import { ClipLoader } from "react-spinners";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export default function SimpleReport(props) {
  const allRegisters = props.dataInfoHome?.allRegisters;

  const [loading, setLoading] = useState(true);
  const [listRegisters, setListRegisters] = useState([]); // ✅ MODIFICADO: removido showList

  useEffect(() => {
    if (allRegisters) {
      setListRegisters(allRegisters); // ✅ MODIFICADO: simplificação da lógica
    }
  }, [allRegisters]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // ✅ MODIFICADO: corrigido uso do setTimeout
    return () => clearTimeout(timer); // ✅ MODIFICADO: limpeza para evitar memória presa
  }, []);

  const shouldLoop = listRegisters.length > 1;

  return (
    <DivRep>
      <DivOrgTitle>
        <TitleStatusReport>Cadastros</TitleStatusReport>
      </DivOrgTitle>
      {/* <DivCard> */}
      {loading ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        <DivReport
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          loop={shouldLoop} // ✅ MODIFICADO
          navigation={shouldLoop} // ✅ MODIFICADO: evita mostrar navegação sem necessidade
          modules={[EffectFlip, Pagination, Navigation]}
        >
          {listRegisters.map((registersInfo, index) => {
            return (
              // <SwiperSlide key={index}>
                <ReportOne key={index}>
                  <ReportTitle>{registersInfo?.nameRegister}</ReportTitle>
                  <ReportValue>{registersInfo?.countRegister || 0}</ReportValue>

                  <BtnMore to={registersInfo?.path}>Detalhes</BtnMore>
                </ReportOne>
              // </SwiperSlide>
            );
          })}
        </DivReport>
      )}
      {/* </DivCard> */}
    </DivRep>
  );
}
