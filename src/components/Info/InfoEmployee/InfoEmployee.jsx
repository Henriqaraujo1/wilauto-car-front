import React from "react";
import {
  DivOrgEmployee,
  DivInfoEmployee,
  InfoEmployeeResult,
  DivBtnClose,
  BtnClose,
  DivOrgInfo,
} from "./InfoEmployeeStyle";
import { Close } from "@styled-icons/material";

export default function InfoEmployee(props) {
  const employeeInfo = props.selectedEmployeeView;

  const parseName = (oneName) => {
    const firstName = oneName || "";
    var fullName = "";
    fullName = firstName;

    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  return (
    <DivOrgEmployee show={props.employeeView}>
      <DivInfoEmployee>
        <DivOrgInfo>
          <InfoEmployeeResult>
            Profissão: {parseName(employeeInfo?.namePosition)}
          </InfoEmployeeResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoEmployeeResult>
            Percentual de Venda: {employeeInfo?.percentSell} %
          </InfoEmployeeResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoEmployeeResult>
            Status: {employeeInfo?.status}
          </InfoEmployeeResult>
        </DivOrgInfo>

        <DivOrgInfo>
          <InfoEmployeeResult>
            Telefone: {employeeInfo?.numberPhone}
          </InfoEmployeeResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoEmployeeResult>
            E-mail: {employeeInfo?.email}
          </InfoEmployeeResult>
        </DivOrgInfo>
        <DivOrgInfo>
          <InfoEmployeeResult>
            Data de Contratação: {employeeInfo?.dateAdmission}
          </InfoEmployeeResult>
        </DivOrgInfo>
      </DivInfoEmployee>
      <DivBtnClose>
        <BtnClose onClick={() => props.setEmployeeView(false)}>
          <Close />
        </BtnClose>
      </DivBtnClose>
    </DivOrgEmployee>
  );
}
