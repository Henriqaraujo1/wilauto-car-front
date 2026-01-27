import React, { useEffect } from "react";
import {
  DivOrgScreen,
  DivChangeOrder,
  TitleChangeOrder,
  DivChangeItems,
  DivItem,
  DivTotal,
  DivName,
  DivPrice,
  Item,
  QtdItem,
  CodItem,
  NameItem,
  PriceUnit,
  Qtd,
  PriceTotal,
  DivBtn,
  BtnChange,
  DivDiscount,
  Discount,
  DivInfo,
  DivQtd,
  DivOrgDiscount,
} from "./ChangeOrderStyle";
import CloseOrder from "../CloseOrder/CloseOrder";

import { useLocation, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function ChangeOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  let { orderInfo } = 0;
  // let {detailOrder} = 0
  orderInfo = location.state || {};
  // detailOrder = location.state;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listOrder = orderInfo.orderInfo || [];
  const infoOrder = orderInfo.detailOrder || [];

  useEffect(() => {
    if (!location.state || listOrder.length <= 0) {
      navigate("/comercial");
    }
  }, [location.state, navigate, listOrder]);

  return (
    <DivOrgScreen>
      <DivChangeOrder>
        <TitleChangeOrder>Detalhes do Pedido</TitleChangeOrder>
        <DivChangeItems>
          {listOrder.map((product, id) => {
            return (
              <Item key={id}>
                <DivItem>
                  <QtdItem>{id + 1}</QtdItem>
                  <DivName>
                    <NameItem>{product.nameProduct}</NameItem>
                    <CodItem>Cod. {product.codProd}</CodItem>
                  </DivName>
                </DivItem>
                <DivInfo>
                  <DivPrice>
                    <PriceUnit>Preço Un</PriceUnit>
                    <PriceUnit>
                      <NumericFormat
                        displayType="text"
                        value={product.priceSell}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$"}
                      />
                    </PriceUnit>
                  </DivPrice>
                  <DivQtd>
                    <Qtd>QTD</Qtd>
                      <Qtd>{product.qtd}</Qtd>
                  </DivQtd>
                  {product.valueDiscount > 0 && (
                    <DivDiscount>
                      <Discount>Descontos</Discount>
                      <DivOrgDiscount>
                        <Discount>
                          <NumericFormat
                            customInput={Discount}
                            displayType="text"
                            value={product.valueDiscount}
                            decimalSeparator=","
                            thousandSeparator="."
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={"US$ "}
                          />
                        </Discount>
                      </DivOrgDiscount>
                    </DivDiscount>
                  )}

                  <DivTotal>
                    <PriceTotal>Total</PriceTotal>
                    <PriceTotal>
                      <NumericFormat
                        displayType="text"
                        value={product.priceWithDiscount}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$ "}
                      />
                    </PriceTotal>
                  </DivTotal>
                </DivInfo>
              </Item>
            );
          })}
        </DivChangeItems>
        <DivBtn>
          <BtnChange to="/comercial" state={{ orderChange: orderInfo }}>
            Alterar
          </BtnChange>
        </DivBtn>
      </DivChangeOrder>
      {location.state && (
        <>
          <CloseOrder listOrder={listOrder} infoOrder={infoOrder} />
        </>
      )}
    </DivOrgScreen>
  );
}
