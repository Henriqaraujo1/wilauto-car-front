import React, { useEffect, useState } from "react";
import {
  DivOpenCashier,
  BtnOpenCashier,
  FormCash,
  TitleOpenCashier,
  DivOrgOpenCashier,
  LabelOpenCashier,
  InputCashier,
  DivBtn,
  StatusCashier,
  DivOrgLoading,
  DivOrgStatus,
  DivOrgBtn,
  InfoUsername,
  DivOrgPopUp,
  DivBtnClose,
  BtnClose,
} from "./OpenCashierStyle";

import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCashier } from "../../../store/financial/cashier/cashier.actions";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function OpenCashier(props) {
  const infoCashier = props.infoCashier;

  const dispatch = useDispatch();
  const date = new FormatDatesFront();
  const infoUser = useSelector((state) => state.persisted.auth);



  const [valueCashier, setValueCashier] = useState("");
  const [user, setUser] = useState({
    username: "",
    idUser: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusCashier, setStatusCashier] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  const { handleSubmit } = useForm();

  const sendCashier = async (dataCashier) => {
    setLoading(true);
    dataCashier.initialValueOpen = valueCashier;
    dataCashier.status = "aberto";
    dataCashier.idUser = user.idUser;

    // ! - ate o momento ele somente cria o caixa, mas não trata o retorno
    if (dataCashier.initialValueOpen < 0) {
      window.alert("O valor do caixa não pode ser menor que zero");
    } else {
      await dispatch(createCashier(dataCashier));
      setStatusCashier("Aberto");
      setTimeout(() => {
        setLoading(false);
        props.getCashiersToday(date.getDateNow());
      }, 1500);
    }
  };

  const checkCashierStatus = async (dataCashier) => {
    if (dataCashier?.cashierToday.status === "aberto") {
      setLoading(true);
      setStatusCashier("Caixa aberto");
      setValueCashier(dataCashier?.cashierToday.initialValueOpen);
      setDisableInput(true);
      setButtonDisable(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(true);
      setStatusCashier("Aguardando abrir Caixa");
      setValueCashier("");
      setDisableInput(false);
      setButtonDisable(false);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    checkCashierStatus(infoCashier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCashier]);

  useEffect(() => {
    if (infoUser.isAuthenticated) {
      setUser({
        username: infoUser.user.username || infoUser.user,
        idUser: infoUser.idUser,
      });
    }
  }, [infoUser]);

  return (
    <DivOrgPopUp show={props.showOpenCashier}>
      <DivOpenCashier>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setShowOpenCashier(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <TitleOpenCashier>Abrir Caixa</TitleOpenCashier>
        <FormCash onSubmit={handleSubmit(sendCashier)}>
          <DivOrgOpenCashier>
            <LabelOpenCashier>Valor em Caixa</LabelOpenCashier>
            <InputCashier
              disabled={disableInput}
              value={valueCashier}
              placeholder="R$"
              decimalSeparator=","
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              prefix={"R$"}
              onValueChange={(values, sourceInfo) => {
                setValueCashier(Number(values.value));
              }}
            />
          </DivOrgOpenCashier>
          <DivOrgOpenCashier>
            <LabelOpenCashier>Usuario</LabelOpenCashier>
            <InfoUsername>{user?.username}</InfoUsername>
          </DivOrgOpenCashier>
          <DivOrgOpenCashier>
            <LabelOpenCashier>Data</LabelOpenCashier>
            <InfoUsername>
              {infoCashier?.cashierToday.dateOpen}
            </InfoUsername>
          </DivOrgOpenCashier>
          <DivOrgBtn>
            <DivBtn>
              <BtnOpenCashier type="submit" disabled={buttonDisable}>
                Abrir Caixa
              </BtnOpenCashier>
            </DivBtn>

            <DivOrgStatus>
              <StatusCashier>Status: </StatusCashier>

              {loading ? (
                <DivOrgLoading>
                  <ClipLoader speedMultiplier={3} color={"#000"} />
                </DivOrgLoading>
              ) : (
                statusCashier && <StatusCashier>{statusCashier}</StatusCashier>
              )}
            </DivOrgStatus>
          </DivOrgBtn>
        </FormCash>
      </DivOpenCashier>
    </DivOrgPopUp>
  );
}
