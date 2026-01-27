import React, { useState } from "react";
import { Close } from "@styled-icons/material";
import {
  DivItemStockOut,
  FormItemStockOut,
  DivOrgItemStockOut,
  LabelItemStockOut,
  InputMedium,
  InputSmall,
  LabelResult,
  TextItemStockOut,
  SubmitFormItemStockOut,
  DivBtnClose,
  BtnClose,
  TitleProductOut,
  Line,
  TitleProductOutChange,
  DivOrgDetails,
  DivOrgLoading,
  DivOrgResults,
  InfoResults,
  DivBtnSubmit,
  FormatValue,
} from "./UpdateProductOutStyle";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updtProductOut } from "../../../store/stock/ItemOutStock/itemOut.actions";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function UpdateProductOut(props) {
  const productOutDetail = props.dataItemOutUpdate;

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      priceTotal: 0,
    },
  });

  const [loadingUpStockOut, setLoadingUpStockOut] = useState();
  const [productInfo, setProductInfo] = useState([]);
  const [alertQtd, setAlertQtd] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [dataProductOut, setDataProductOut] = useState({
    dateOut: productOutDetail.dateOut || "",
    details: productOutDetail.details || "",
    idProduct: productOutDetail.idProduct || "",
    idStockOut: productOutDetail.idStockOut || "",
    nameProduct: productOutDetail.nameProduct || "",
    dueDateProduct: productOutDetail.dueDateProduct || "",
    priceUnit: productOutDetail.priceUnit || "",
    productBatch: productOutDetail.productBatch || "",
    qtdRemoveByBatch: productOutDetail.qtdRemoveByBatch || "",
    qtdRemoveNoBatch: productOutDetail.qtdRemoveNoBatch || "",
    reason: productOutDetail.reason || "",
    valueTotalRemove: productOutDetail.valueTotalRemove || "",
  });

  const [newQtd, setNewQtd] = useState(0);
  const [changeQtd, setChangeQtd] = useState(0);
  const [newTotalChange, setNewTotalChange] = useState(0);

  const productUpdt = async (infoUpdate) => {
    setLoadingUpStockOut(true);
    const updateProductOut = {
      idStockOut: dataProductOut.idStockOut,
      idProduct: dataProductOut.idProduct,
      priceUnit: dataProductOut.priceUnit,
      devolutionInfo: {},
    };
    if (changeQtd > 0) {
      if (dataProductOut.qtdRemoveByBatch > 0) {
        updateProductOut.qtdRemoveByBatch = Number(changeQtd);
        updateProductOut.productBatch = dataProductOut.productBatch;
      } else if (dataProductOut.qtdRemoveNoBatch > 0) {
        updateProductOut.qtdRemoveNoBatch = Number(changeQtd);
      }

      updateProductOut.valueTotalRemove = Number(newTotalChange.toFixed(2));
      updateProductOut.devolutionInfo.priceTotal =
        Number(newQtd) * updateProductOut.priceUnit;
      updateProductOut.devolutionInfo.newQtd = Number(newQtd);
      updateProductOut.devolutionInfo.dueDateProduct =
        dataProductOut.dueDateProduct;
    }
    updateProductOut.reasonUpdate = infoUpdate.reasonUpdate;

    const upProduct = await dispatch(updtProductOut(updateProductOut));

    setProductInfo(upProduct.payload);
    setTimeout(() => setLoadingUpStockOut(false), 1000);
    setTimeout(() => {
      props.setLoadingItemOut(true);
      props.setUpdtProductPopUp(false);
    }, 3000);
  };

  const upQtd = Number(changeQtd);
  // let newTotal = 0;

  useEffect(() => {
    var removeQtd = 0;
    if (dataProductOut.qtdRemoveByBatch > 0) {
      if (upQtd >= dataProductOut.qtdRemoveByBatch) {
        setAlertQtd("Quantidade maior ou igual que o valor já removido");
        setDisableButton(true);
      } else {
        removeQtd = dataProductOut.qtdRemoveByBatch - upQtd;
        setNewQtd(removeQtd);
        setAlertQtd("");
        setDisableButton(false);
      }
    } else if (dataProductOut.qtdRemoveNoBatch > 0) {
      if (upQtd >= dataProductOut.qtdRemoveNoBatch) {
        setAlertQtd("Quantidade maior ou igual que o valor já removido");
        setDisableButton(true);
      } else {
        removeQtd = dataProductOut.qtdRemoveNoBatch - upQtd;
        setNewQtd(removeQtd);
        setAlertQtd("");
        setDisableButton(false);
      }
    }
  }, [
    upQtd,
    setNewQtd,
    dataProductOut.qtdRemoveByBatch,
    dataProductOut.qtdRemoveNoBatch,
  ]);

  useEffect(() => {
    setNewTotalChange(dataProductOut.priceUnit * upQtd);
  }, [upQtd, dataProductOut.priceUnit]);

  return (
    <DivItemStockOut show={props.updtProductPopUp}>
      <DivBtnClose>
        <TitleProductOut>Alterar Saida do Estoque</TitleProductOut>
        <BtnClose onClick={() => props.setUpdtProductPopUp(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <FormItemStockOut onSubmit={handleSubmit(productUpdt)}>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Quantidade removida</LabelItemStockOut>
          <LabelItemStockOut>
            {dataProductOut.qtdRemoveByBatch || dataProductOut.qtdRemoveNoBatch}
          </LabelItemStockOut>
        </DivOrgItemStockOut>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Quantidade à alterar</LabelItemStockOut>
          <InputSmall
            min="0"
            type="number"
            step="any"
            {...register("changeQtd", {
              onChange: (e) => {
                setChangeQtd(e.target.value);
              },
            })}
          />
          <LabelItemStockOut>Quantidade a devoler ao estoque</LabelItemStockOut>
          <LabelItemStockOut>{newQtd}</LabelItemStockOut>
        </DivOrgItemStockOut>
        {alertQtd && (
          <DivOrgResults>
            <InfoResults>{alertQtd}</InfoResults>
          </DivOrgResults>
        )}
        {dataProductOut?.productBatch !== "0" ? (
          <DivOrgItemStockOut>
            <LabelItemStockOut>Lote</LabelItemStockOut>
            <LabelItemStockOut>{dataProductOut.productBatch}</LabelItemStockOut>
            <LabelItemStockOut>Validade</LabelItemStockOut>
            <LabelItemStockOut>
              {dataProductOut.dueDateProduct}
            </LabelItemStockOut>
          </DivOrgItemStockOut>
        ) : (
          <></>
        )}

        <DivOrgItemStockOut>
          <LabelItemStockOut>Preço Unitario</LabelItemStockOut>
          <FormatValue
            placeholder="R$"
            customInput={InputSmall}
            displayType="text"
            value={dataProductOut.priceUnit}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
          <LabelItemStockOut>Preço Total</LabelItemStockOut>
          <FormatValue
            placeholder="R$"
            customInput={LabelResult}
            displayType="text"
            value={dataProductOut.valueTotalRemove}
            decimalSeparator=","
            thousandSeparator="."
            fixedDecimalScale
            decimalScale={2}
            prefix={"R$ "}
          />
        </DivOrgItemStockOut>
        <Line />
        <TitleProductOutChange>Nova Alteração</TitleProductOutChange>
        <DivOrgItemStockOut>
          <LabelItemStockOut>Preço Unitario</LabelItemStockOut>
          <FormatValue
            placeholder="R$   "
            customInput={InputSmall}
            displayType="text"
            value={dataProductOut.priceUnit}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
          />
          <LabelItemStockOut>Preço Total</LabelItemStockOut>
          <FormatValue
            placeholder="R$"
            customInput={LabelResult}
            displayType="text"
            value={newTotalChange}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            prefix={"R$ "}
            // onValueChange={(values, sourceInfo) => {
            //   setPriceSell(values.value)
            // }}
          />
        </DivOrgItemStockOut>
        <DivOrgDetails>
          <LabelItemStockOut>Motivo</LabelItemStockOut>
          <InputMedium
            value={dataProductOut.reason}
            {...register("reason", {
              required: true,
              onChange: (e) => {
                setDataProductOut({
                  ...dataProductOut,
                  reason: e.target.value,
                });
              },
            })}
          />
        </DivOrgDetails>
        <DivOrgDetails>
          <LabelItemStockOut>Detalhes</LabelItemStockOut>
          <TextItemStockOut
            maxLength={70}
            value={dataProductOut.details}
            {...register("detail", {
              required: true,
              onChange: (e) => {
                setDataProductOut({
                  ...dataProductOut,
                  details: e.target.value,
                });
              },
            })}
          ></TextItemStockOut>
        </DivOrgDetails>
        <DivOrgDetails>
          <LabelItemStockOut>Motivo da Alteração</LabelItemStockOut>
          <InputMedium {...register("reasonUpdate")} />
        </DivOrgDetails>
        <DivBtnSubmit>
          <SubmitFormItemStockOut type="submit" disabled={disableButton}>
            Alterar
          </SubmitFormItemStockOut>
        </DivBtnSubmit>
        {loadingUpStockOut ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#000"} />
          </DivOrgLoading>
        ) : (
          (productInfo.errorStatus && (
            <DivOrgResults>
              <InfoResults>{productInfo.message}</InfoResults>
            </DivOrgResults>
          )) ||
          (productInfo.successStatus && (
            <DivOrgResults>
              <InfoResults>{productInfo.message}</InfoResults>
            </DivOrgResults>
          ))
        )}
      </FormItemStockOut>
    </DivItemStockOut>
  );
}
