import {
  BtnClose,
  BtnPrint,
  CodTag,
  DivGridPrint,
  DivOrgBtn,
  DivOrgBtnClose,
  DivOrgExampleInfo,
  DivOrgImg,
  DivOrgPrint,
  DivOrgTitle,
  DivPrintTag,
  DivTag,
  ImageTag,
  PriceTag,
  TitleTag,
  TitleUpdate,
} from "./PrintTagStyle";
import { Close } from "@styled-icons/material";
import Logo from "../../../images/LogoInicio.png";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useEffect } from "react";
import { useState } from "react";

export default function PrintTag(props) {
  const listTag = props.allTags;
  const [tags, setTags] = useState([]);

  const printRef = useRef();
  const printOrder = useReactToPrint({
    content: () => printRef.current,
  });

  const createListTag = (infoTag) => {
    const allTagsToPrint = [];
    infoTag.forEach((tag) => {
      if ("qtdItems" in tag) {
        for (var i = 0; i < tag.qtdItems; i++) {
          allTagsToPrint.push(tag);
        }
      } else if ("qtdItems" in tag) {
        for (var j = 0; j < tag.qtdItems; j++) {
          allTagsToPrint.push(tag);
        }
      }
      setTags(allTagsToPrint);
    });
  };

  useEffect(() => {
    createListTag(listTag);
  }, [listTag]);

  return (
    <DivPrintTag show={props.popUpPrint}>
      <DivOrgTitle>
        <TitleUpdate>Imprimir Etiquetas</TitleUpdate>
      </DivOrgTitle>
      <DivOrgPrint>
        <DivOrgBtnClose>
          <BtnClose onClick={() => props.setPopUpPrint(false)}>
            <Close />
          </BtnClose>
        </DivOrgBtnClose>
        <DivGridPrint ref={printRef}>
          {tags.map((tagInfo, id) => {
            return (
              <DivTag key={id}>
                <DivOrgImg>
                  {/* <ImageTag src={Logo} alt="logo etiqueta" /> */}
                  <DivOrgTitle>
                    <TitleTag>{tagInfo.nameProduct}</TitleTag>
                    <PriceTag
                      displayType="text"
                      value={tagInfo.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgTitle>
                </DivOrgImg>
                <DivOrgExampleInfo>
                  <CodTag value={String(tagInfo.codProd)} width={4} />
                </DivOrgExampleInfo>
              </DivTag>
            );
          })}
        </DivGridPrint>
      </DivOrgPrint>
      <DivOrgBtn>
        <BtnPrint type="button" onClick={printOrder}>
          Imprimir
        </BtnPrint>
      </DivOrgBtn>
    </DivPrintTag>
  );
}
