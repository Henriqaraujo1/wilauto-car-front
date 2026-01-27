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
  DivOrgCardProduct,
  ValueProduct,
  DivOrgInfo,
  DivOrgFilter,
  SelectOption,
  DivFilterSelect,
} from "./TablePrintProduct.style";

import ExcelPrintProduct from "./FilePrint/ExcelPrintProduct";

export default function TablePrintProducts({ productsInfo, infoCategorys }) {
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [isClearable] = useState(true);

  const [optionsBrand, setOptionsBrand] = useState();
  const [printPopUp, setPrintPopUp] = useState(false);
  const [brandCod, setBrandCod] = useState([]);

  const sendBrand = (brand) => {
    setBrandCod(brand);
  };

useEffect(() => {
  if (!productsInfo) return;

  let filtered = [...productsInfo];

  const filterBrand = Number(brandCod?.value);
  if (brandCod?.value && !isNaN(filterBrand)) {
    filtered = filtered.filter((product) => product.idBrand === filterBrand);
  }

  setSelectedProduct(filtered);
}, [brandCod, productsInfo]);


  useEffect(() => {
    if (infoCategorys?.length > 0) {
      const listBrand = infoCategorys?.map((brand) => ({
        value: brand.idBrand,
        label: brand.brandName,
      }));
      setOptionsBrand(listBrand);
    }
  }, [infoCategorys]);

  return (
    <DivTableItems>
      <DivOrgFilter>
        <DivFilterSelect>
          <SelectOption
            // name="brand"
            placeholder="Filtre por Categoria"
            options={optionsBrand}
            isClearable={isClearable}
            onChange={sendBrand}
          />
        </DivFilterSelect>
      </DivOrgFilter>
      <DivDetailsItens>
        {selectedProduct?.map((product, index) => {
          return (
            <DivItemAdd key={index}>
              <DivOrgCardProduct>
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
                    <TitleNumber>Preço Venda</TitleNumber>
                    <ValueProduct
                      displayType="text"
                      value={product.priceSell}
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      prefix={"R$ "}
                    />
                  </DivOrgNumbers>
                </DivOrgDetails>
              </DivOrgCardProduct>
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
      <ExcelPrintProduct
        printPopUp={printPopUp}
        infoProduct={selectedProduct}
        setPrintPopUp={setPrintPopUp}
        brandCod={brandCod}
      />
    </DivTableItems>
  );
}
