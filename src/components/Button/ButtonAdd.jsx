import React from "react";
import { BtnAdd, LinkPage } from "./ButtonStyle";
import { Add } from "@styled-icons/material";

export default function ButtonAdd() {
  return (
    <BtnAdd>
      <LinkPage type="button" to="stock-item">
        <Add />
      </LinkPage>
    </BtnAdd>
  );
}
