import React, { useEffect, useState } from "react";
import {
  DivCloseCashier,
  BtnCloseCashier,
  TitleCloseCashier,
  FormClose,
  DivOrgClose,
  InputBigClose,
  LabelClose,
  InputCashier,
  DivOrgBtn,
  DivBtn,
  DivOrgStatus,
  StatusCashier,
  DivOrgLoading,
  InfoUsername,
  DivOrgPopUp,
  DivBtnClose,
  BtnClose,
} from "./CloseCashierStyle";

import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeCashier } from "../../store/financial/cashier/cashier.actions";
import { Close } from "@styled-icons/material";
import FormatDatesFront from "../../utils/formatDateFront.mjs";

export default function CloseCashier(props) {
  const infoCashier = props.infoCashier?.cashierToday;
  const valueFinal = props.valueFinal;

  const dispatch = useDispatch();
  const date = new FormatDatesFront();

  const infoUser = useSelector((state) => state.persisted.auth);
  const [valueCashier, setValueCashier] = useState("");
  const [user, setUser] = useState({
    username: "",
    idUser: 0,
  });
  const [loading, setLoading] = useState(false);
  const [statusCashier, setStatusCashier] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const closedCashier = async (dataCashier) => {
    setLoading(true);
    dataCashier.valueClosed = valueCashier;
    dataCashier.status = "fechado";
    dataCashier.idCashier = infoCashier?.idCashier;
    dataCashier.idUser = user.idUser;

    if (dataCashier.valueClosed > valueFinal) {
      window.alert("O valor informado no caixa está diferente do sistema");
    } else {
      const finishCashier = await dispatch(closeCashier(dataCashier));
      setStatusCashier(finishCashier.payload);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const checkCashierStatus = async (dataCashier) => {
      if (dataCashier?.status === "fechado") {
      setLoading(true);
      setStatusCashier({ message: "Aguardando novo Caixa" });

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(true);
      setStatusCashier({ message: "Aguardando fechar Caixa" });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    checkCashierStatus(infoCashier);
  }, [infoCashier]);

  useEffect(() => {
    setLoading(true);
    if (statusCashier?.codeStatus) {
      setTimeout(() => {
        props.getCashiersToday(date.getDateNow());
        reset();
        setValueCashier("");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCashier]);

  useEffect(() => {
    if (infoUser.isAuthenticated) {
      setUser({
        username: infoUser.user.username || infoUser.user,
        idUser: infoUser.idUser,
      });
    }
  }, [infoUser]);

  return (
    <DivOrgPopUp show={props.showCloseCashier}>
      <DivCloseCashier>
        <DivBtnClose>
          <BtnClose
            type="button"
            onClick={() => {
              props.setShowCloseCashier(false);
            }}
          >
            <Close />
          </BtnClose>
        </DivBtnClose>
        <TitleCloseCashier>Fechar Caixa</TitleCloseCashier>
        <FormClose onSubmit={handleSubmit(closedCashier)}>
          <DivOrgClose>
            <LabelClose>Valor em Caixa</LabelClose>
            <InputCashier
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
          </DivOrgClose>
          <DivOrgClose>
            <LabelClose>Usuario</LabelClose>
            <InfoUsername>{user.username}</InfoUsername>
          </DivOrgClose>
          <DivOrgClose>
            <LabelClose>Data do Caixa</LabelClose>
            <InfoUsername>{infoCashier?.dateOpen}</InfoUsername>
          </DivOrgClose>
          <DivOrgClose>
            <LabelClose>Observações</LabelClose>
            <InputBigClose maxLength="30" {...register("observation")} />
          </DivOrgClose>
          <DivOrgBtn>
            <DivBtn>
              <BtnCloseCashier type="submit">Fechar Caixa</BtnCloseCashier>
            </DivBtn>
            <DivOrgStatus>
              <StatusCashier>Status Caixa: </StatusCashier>

              {loading ? (
                <DivOrgLoading>
                  <ClipLoader speedMultiplier={3} color={"#000"} />
                </DivOrgLoading>
              ) : (
                statusCashier && (
                  <StatusCashier>{statusCashier.message}</StatusCashier>
                )
              )}
            </DivOrgStatus>
          </DivOrgBtn>
        </FormClose>
      </DivCloseCashier>
    </DivOrgPopUp>
  );
}
