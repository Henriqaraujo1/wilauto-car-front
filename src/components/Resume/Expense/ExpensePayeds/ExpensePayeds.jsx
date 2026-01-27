import React, { useEffect, useState } from "react";
import {
  DivExpensePayeds,
  DivTitle,
  TitleExpense,
  InfoFilter,
  FormatValue,
  DivInfoExpense,
  DivInfo,
  InfoCard,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./ExpensePayedsStyle.js";
import { ClipLoader } from "react-spinners";

export default function ExpensePayeds(props) {
  const expensesPayed = props.dataExpense;
  const loading = props.loading;

  const [expenseData, setExpenseData] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(expensesPayed?.codeStatus === 200) {
      setExpenseData(expensesPayed?.expenses)
      setErrors()
    } else {
      setExpenseData([])
      setErrors(expensesPayed)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesPayed?.codeStatus])
  
  return (
    <DivExpensePayeds>
      <DivTitle>
        <TitleExpense>Despesas Pagas</TitleExpense>
      </DivTitle>
      <DivInfoExpense>
        <DivInfo>
          <InfoCard>Total Pago</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={expenseData?.totalPayed || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Total Despesas</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <InfoFilter>{expenseData?.totalExpenses || 0}</InfoFilter>
          )}
        </DivInfo>
        <DivInfo>
          <InfoCard>Maior Despesa</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={expenseData?.highExpensePayed || 0}
              displayType="text"
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$ "}
            />
          )}
        </DivInfo>
      </DivInfoExpense>
      {errors && (
        <DivOrgResults>
          <InfoResult>{errors.message}</InfoResult>
        </DivOrgResults>
      )}
    </DivExpensePayeds>
  );
}
