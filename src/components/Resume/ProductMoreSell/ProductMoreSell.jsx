import React, { useEffect, useState } from "react";
import {
  DivInfoProductMoreSell,
  DivInfoProductMoreSellTable,
  DivInfoProductMoreSellCard,
  DivDetailProductMoreSell,
  DivIdProductMoreSell,
  DivInfoDetailsProductMoreSell,
  DivBtn,
  IdSpan,
  NameProductMoreSell,
  Value,
  InfoValue,
  // LinkPage,
  DivOrgLoading,
  PriceBuyed,
  DivOrgValues,
  DivOrgInfo,
  DivFilter,
  DivOrgFilter,
  LabelFilter,
  InputFilter,
  BtnFilter,
  DivOrgBtn,
  BtnCancel,
  DivOrgSales,
  // DivOrgPageSell,
  // BtnPageSell,
} from "./ProductMoreSell.style";

import { ClipLoader } from "react-spinners";
import { Close, Search } from "@styled-icons/material";

export default function ProductMoreSell(props) {
  const infoProductMoreSell = props.infoProducts;

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filterNameProductMoreSell, setFilterNameProductMoreSell] =
    useState("");
  const [filterProductMoreSell, setFilterInfoProductMoreSell] = useState([]);

  const createListOrders = (dataProductMoreSell) => {
    setLoadingOrders(true);
    setShowList(true);
    if (showList) {
      setFilterInfoProductMoreSell(dataProductMoreSell);
    }
    setTimeout(() => {
      setLoadingOrders(false);
    }, 1000);
  };

  const parseName = (oneName, secondName) => {
    const firstName = oneName || "";
    const lastName = secondName || "";
    var fullName = "";
    if (lastName.length > 0) {
      fullName = firstName.concat(" ", lastName);
    } else {
      fullName = firstName;
    }
    const formatName = fullName?.split(" ");
    for (var i = 0; i < formatName?.length; i++) {
      formatName[i] =
        formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
    }
    let result = formatName?.join(" ");

    return result;
  };

  useEffect(() => {
    if (!infoProductMoreSell) return setFilterInfoProductMoreSell([]);

    let filtered = infoProductMoreSell;

    if (filterNameProductMoreSell.length > 0) {
      filtered = filtered.filter((product) =>
        product.nameProduct.includes(
          filterNameProductMoreSell.toLocaleLowerCase()
        )
      );
    }

    setFilterInfoProductMoreSell(filtered);
  }, [infoProductMoreSell, filterNameProductMoreSell]);

  useEffect(() => {
    createListOrders(infoProductMoreSell);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoProductMoreSell]);

  return (
    <DivOrgSales>
      <DivFilter show={props.disableFilter}>
        <DivOrgFilter>
          <LabelFilter>Nome</LabelFilter>
          <InputFilter
            value={filterNameProductMoreSell}
            onChange={(e) => setFilterNameProductMoreSell(e.target.value)}
          />
        </DivOrgFilter>
      </DivFilter>
      <DivInfoProductMoreSell>
        <DivInfoProductMoreSellTable>
          {loadingOrders ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterProductMoreSell?.map((product, index) => {
              return (
                <DivInfoProductMoreSellCard key={index}>
                  <DivDetailProductMoreSell>
                    <DivIdProductMoreSell>
                      <IdSpan>{index + 1}</IdSpan>
                    </DivIdProductMoreSell>
                    <DivInfoDetailsProductMoreSell>
                      <NameProductMoreSell>
                        {parseName(product.nameProduct)}
                      </NameProductMoreSell>
                      <DivOrgInfo>
                        <DivOrgValues>
                          <Value>Total Vendido</Value>
                          <PriceBuyed
                            displayType="text"
                            value={product.totalSell}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        <DivOrgValues>
                          <Value>QTD Vendida</Value>
                          <InfoValue>{product.qtdSell}</InfoValue>
                        </DivOrgValues>
                      </DivOrgInfo>
                    </DivInfoDetailsProductMoreSell>
                  </DivDetailProductMoreSell>
                  <DivBtn>
                    {/* <BtnDetail>Pagamento</BtnDetail> */}
                    {/* <LinkPage
                      to="resume-product"
                      state={{ idProductMoreSell: product.idProductMoreSell }}
                    >
                      Pedidos
                    </LinkPage> */}
                  </DivBtn>
                </DivInfoProductMoreSellCard>
              );
            })
          )}
        </DivInfoProductMoreSellTable>
      </DivInfoProductMoreSell>
    </DivOrgSales>
  );
}
