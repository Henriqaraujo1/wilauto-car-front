import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  DivFin,
  DivOrgTitle,
  TitleStatusFin,
  ValueToday,
  DivOrgLoading,
  DivReport,
  ReportOne,
  ReportTitle,
  BtnMore,
} from "./StatusExpenseStyle.js";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export default function StatusExpense(props) {
  const infoActualExpenses = props.expenseByMonth;
  const loading = props.loading;

  const [showList, setShowList] = useState();
  const [listExpenses, setListExpenses] = useState([]);

  const createCard = (infoExpense) => {
    setShowList(true);
    if (showList) {
      setListExpenses(infoExpense);
    }
  };

  useEffect(() => {
    if (infoActualExpenses) {
      createCard(infoActualExpenses);
    } else {
      createCard([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoActualExpenses]);

  return (
    <DivFin>
      <DivOrgTitle>
        <TitleStatusFin>Despesas</TitleStatusFin>
      </DivOrgTitle>
      {/* <DivOrgExpenses> */}
      {loading ? (
        <DivOrgLoading>
          <ClipLoader size={40} speedMultiplier={3} color="#000" />
        </DivOrgLoading>
      ) : (
        listExpenses.length === 0 ? (
          <DivReport
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          loop={false}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
        >
          
              <ReportOne>
                <ReportTitle>Não pagas</ReportTitle>
                <ValueToday
                  displayType="text"
                  value={0}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                />

                <BtnMore to={"/financial/debits"}>Detalhes</BtnMore>
              </ReportOne>
              <ReportOne>
                <ReportTitle>Pagas</ReportTitle>
                <ValueToday
                  displayType="text"
                  value={0}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                />

                <BtnMore to={"/financial/debits"}>Detalhes</BtnMore>
              </ReportOne>
            
          
        </DivReport>
        ) : (
          <DivReport
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          loop={false}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
        >
          {listExpenses?.map((infoExpenses, index) => {
            return (
              <ReportOne key={index}>
                <ReportTitle>{infoExpenses.nameExpense}</ReportTitle>
                <ValueToday
                  displayType="text"
                  value={infoExpenses.totalExpense}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                />

                <BtnMore to={"/financial/debits"}>Detalhes</BtnMore>
              </ReportOne>
            );
          })}
        </DivReport>
        )

      )}
    </DivFin>
  );
}
