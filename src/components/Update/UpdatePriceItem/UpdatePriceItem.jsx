import React, { useState } from "react";
import {
  DivOrgItem,
  DivInfoItem,
  InfoItemResult,
  DivBtnClose,
  BtnClose,
  FormItem,
  DivOrgInput,
  LabelItem,
  InputItem,
  DivOrgTitle,
  DivOrgSubmit,
  BtnCancel,
  BtnSubmit,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
} from "./UpdatePriceItemStyle";
import { Close } from "@styled-icons/material";
import { useDispatch } from "react-redux";
import { updateItemEntryStock } from "../../../store/stock/itemEntryStock/newItemStock.action";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

export default function UpdateItem(props) {
  const itemInfo = props.selectedItemView;
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();


  const [newPriceItem, setNewPrice] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [infoNewItem, setInfoNewItem] = useState([]);
  const [dataItem] = useState({
    idStockEntry: itemInfo.idStockEntry,
    priceUnit: itemInfo.priceUnit || "",
    qtd: itemInfo.qtd || "",
    priceTotal: itemInfo.priceTotal || "",
  });

  const updtPriceItem = async () => {
    setLoadingPrice(true);
    if (newPriceItem.length > 0) {
      const valueDolar = newPriceItem * itemInfo.valueDolar;
      const newTotal = dataItem.qtd * valueDolar;
      dataItem.priceTotal = newTotal;
      dataItem.priceUnit = newPriceItem;
    }

    const updtPrice = await dispatch(updateItemEntryStock(dataItem));

    setInfoNewItem(updtPrice.payload);

    setTimeout(() => {
      setLoadingPrice(false);
    }, 1000);
    setTimeout(() => {
      props.setItemView(false);
      props.getProductEntry(itemInfo.idProduct);
    }, 3000);
  };

  return (
    <DivOrgItem show={props.itemView}>
      <DivBtnClose>
        <BtnClose onClick={() => props.setItemView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
      <DivInfoItem>
        <DivOrgTitle>
          <InfoItemResult>
            Alterar o preço do produto {itemInfo.nameProduct}
          </InfoItemResult>
        </DivOrgTitle>
        <FormItem onSubmit={handleSubmit(updtPriceItem)}>
          <DivOrgInput>
            <LabelItem>Novo Preço Unitario</LabelItem>
            <InputItem
              value={dataItem.priceUnit}
              placeholder=""
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              fixedDecimalScale
              prefix={"US$ "}
              onValueChange={(values, sourceInfo) => {
                setNewPrice(values.value);
              }}
            />
          </DivOrgInput>
          <DivOrgSubmit>
            <BtnCancel type="button" onClick={() => props.setItemView(false)}>
              Cancelar
            </BtnCancel>
            <BtnSubmit type="submit">Atualizar</BtnSubmit>
          </DivOrgSubmit>
          {loadingPrice ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#000"} />
            </DivOrgLoading>
          ) : (
            (infoNewItem.codeStatus === 404 && (
              <DivOrgResults>
                <InfoResult>{infoNewItem.message}</InfoResult>
              </DivOrgResults>
            )) ||
            (infoNewItem.codeStatus === 200 && (
              <DivOrgResults>
                <InfoResult>{infoNewItem.message}</InfoResult>
              </DivOrgResults>
            ))
          )}
        </FormItem>
      </DivInfoItem>
    </DivOrgItem>
  );
}
