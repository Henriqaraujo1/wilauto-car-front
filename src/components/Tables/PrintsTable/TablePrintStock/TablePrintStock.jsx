import { useEffect, useState } from "react";
import {
  CodeItem,
  DivDetailsItens,
  DivOrgDetails,
  DivItemDetails,
  DivIdItem,
  DivInfoItem,
  DivItemAdd,
  DivOrgNumbers,
  DivTableItems,
  Id,
  NameItem,
  TitleNumber,
  BtnAddStock,
  DivOrgBtn,
  DivOrgCardStock,
  DivOrgInfo,
} from "./TablePrintStock.style";

import ExcelPrintStock from "./FilePrint/ExcelPrintStock";

export default function TablePrintStock({ stockInfo }) {
  const [selectedStock, setSelectedStock] = useState([]);
  const [printPopUp, setPrintPopUp] = useState(false);

  useEffect(() => {
    setSelectedStock(stockInfo);
  }, [stockInfo]);

  return (
    <DivTableItems>
      <DivDetailsItens>
        {selectedStock?.map((product, index) => {
          return (
            <DivItemAdd key={index}>
              <DivOrgCardStock>
                <DivItemDetails>
                  <DivIdItem>
                    <Id>{index + 1}</Id>
                  </DivIdItem>
                  <DivInfoItem>
                    <NameItem>{product.nameProduct}</NameItem>
                    <CodeItem>Codigo: {product.codProd}</CodeItem>
                  </DivInfoItem>
                </DivItemDetails>
                <DivOrgDetails>
                  <DivOrgNumbers>
                    <TitleNumber>Quantidade em estoque</TitleNumber>
                    {product?.totalQtd > 1 ? (
                      <CodeItem>{product?.totalQtd} Kg</CodeItem>
                    ) : (
                      <CodeItem>{product?.totalQtd} g</CodeItem>
                    )}
                  </DivOrgNumbers>
                </DivOrgDetails>
              </DivOrgCardStock>
            </DivItemAdd>
          );
        })}
      </DivDetailsItens>
      <DivOrgInfo>
        <DivOrgBtn>
          <BtnAddStock type="button" onClick={() => setPrintPopUp(!printPopUp)}>
            Gerar Tabela em Excel
          </BtnAddStock>
        </DivOrgBtn>
      </DivOrgInfo>
      <ExcelPrintStock
        printPopUp={printPopUp}
        infoStock={selectedStock}
        setPrintPopUp={setPrintPopUp}
      />
    </DivTableItems>
  );
}
