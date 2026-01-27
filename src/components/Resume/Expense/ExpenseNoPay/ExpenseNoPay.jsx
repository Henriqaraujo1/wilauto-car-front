import React, { useEffect, useState } from "react";
import {
  DivExpenseNoPay,
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
} from "./ExpenseNoPayStyle.js";
import { ClipLoader } from "react-spinners";

export default function ExpenseNoPay(props) {
  const expensesNoPay = props.dataExpense;
  const loading = props.loading;



  const [expenseData, setExpenseData] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(expensesNoPay?.codeStatus === 200) {
      setExpenseData(expensesNoPay?.expensesNoPayed)
      setErrors()
    } else {
      setExpenseData([])
      setErrors(expensesNoPay)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expensesNoPay?.codeStatus])

  return (
    <DivExpenseNoPay>
      <DivTitle>
        <TitleExpense>Despesas Não pagas</TitleExpense>
      </DivTitle>
      <DivInfoExpense>
        <DivInfo>
          <InfoCard>Total a Pagar</InfoCard>
          {loading ? (
            <DivOrgLoading>
              <ClipLoader size={20} speedMultiplier={3} color="#000" />
            </DivOrgLoading>
          ) : (
            <FormatValue
              value={expenseData?.totalNoPayed || 0}
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
              value={expenseData?.highExpenseNoPayed || 0}
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
    </DivExpenseNoPay>
  );
}
