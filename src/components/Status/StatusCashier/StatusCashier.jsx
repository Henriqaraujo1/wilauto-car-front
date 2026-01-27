import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  DivFin,
  Cashier,
  ValueToday,
  CashierReceiveTitle,
  TitleStatusFin,
  DivOrgResume,
  ResumeInfo,
  DivOrgLoading,
  DivOrgBtn,
  BtnDetails,
  DivOrgTitle,
} from "./StatusCashierStyle";

export default function StatusCashier(props) {
  const infoCashier = props.infoCashier;
  const [changeColor, setChangeColor] = useState(false)

  const loading = props.loading;

  useEffect(() => {
    if(infoCashier?.errorStatus === true) {
      setChangeColor(true)
    } else {
      setChangeColor(false)
    }
  }, [infoCashier])


  return (
    <DivFin>
      <DivOrgTitle>
        <TitleStatusFin>Caixa</TitleStatusFin>
      </DivOrgTitle>

      <Cashier changeColor={changeColor}>
        <CashierReceiveTitle>Status: {infoCashier.message}</CashierReceiveTitle>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} />
          </DivOrgLoading>
        ) : (
          <>
            <DivOrgResume>
              <ResumeInfo>
                Caixa Atual {""}
                <ValueToday
                  displayType="text"
                  placeholder=""
                  value={infoCashier?.cashierNow || 0}
                  decimalSeparator=","
                  fixedDecimalScale
                  thousandSeparator="."
                  decimalScale={2}
                  prefix={"R$ "}
                />
              </ResumeInfo>
            </DivOrgResume>
          </>
        )}
      </Cashier>
      <DivOrgBtn>
        <BtnDetails to="/financial/cashier">Abrir Caixa</BtnDetails>
      </DivOrgBtn>
    </DivFin>
  );
}
