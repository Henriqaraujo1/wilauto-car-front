import React, { useState } from "react";
import {
  DivOrgCardDelete,
  DivOrgBtnClose,
  BtnClose,
  DivOrgLabel,
  DivOrgBtn,
  BtnConfirm,
  BtnCancel,
  LabelDelete,
  DivOrgDelete,
  InfoResult,
  DivOrgResults,
  DivOrgLoading,
} from "./DeleteProductStyle";
import { Close } from "@styled-icons/material";
import { useDeleteProductMutation } from "../../../store/registers/products/product.api";
import { ClipLoader } from "react-spinners";

export default function DeleteProduct({
  selectedProduct,
  delProductOption,
  setDelProductOption,
}) {
  const [message, setMessage] = useState(null);

  const [deleteProduct, { isLoading: productLoading }] =
    useDeleteProductMutation();

  const formatName = (name = "") =>
    name
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

  const handleDelete = async () => {
    try {
      setMessage(null);

      await deleteProduct(selectedProduct.idProduct).unwrap();

      setMessage({
        type: "success",
        text: "Produto deletado com sucesso!",
      });

      setTimeout(() => {
        setDelProductOption(false);
        setMessage(null);
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.data?.message ||
          "Erro inesperado ao deletar o produto.",
      });
    }
  };

  return (
    <DivOrgDelete>
      <DivOrgBtnClose>
        <BtnClose onClick={() => setDelProductOption(false)} disabled={productLoading}>
          <Close />
        </BtnClose>
      </DivOrgBtnClose>

      <DivOrgCardDelete showDiv={delProductOption}>
        <DivOrgLabel>
          <LabelDelete>
            Deseja apagar o produto:{" "}
            {formatName(selectedProduct?.nameProduct)}
          </LabelDelete>
        </DivOrgLabel>

        <DivOrgBtn>
          <BtnConfirm onClick={handleDelete} disabled={productLoading}>
            {productLoading ? "Deletando..." : "Sim"}
          </BtnConfirm>

          <BtnCancel
            onClick={() => setDelProductOption(false)}
            disabled={productLoading}
          >
            Não
          </BtnCancel>
        </DivOrgBtn>
      </DivOrgCardDelete>

      {productLoading && (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={2} />
        </DivOrgLoading>
      )}

      {message && (
        <DivOrgResults>
          <InfoResult isError={message.type === "error"}>
            {message.text}
          </InfoResult>
        </DivOrgResults>
      )}
    </DivOrgDelete>
  );
}
