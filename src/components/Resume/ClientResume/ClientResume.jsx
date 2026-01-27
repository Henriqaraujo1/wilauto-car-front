import React, { useEffect, useState } from "react";
import {
  DivInfoClient,
  DivInfoClientTable,
  DivInfoClientCard,
  DivDetailClient,
  DivIdClient,
  DivInfoDetailsClient,
  DivBtn,
  IdSpan,
  NameClient,
  Value,
  InfoValue,
  LinkPage,
  DivOrgLoading,
  PriceBuyed,
  DivOrgValues,
  DivOrgInfo,
  DivFilter,
  DivOrgFilter,
  LabelFilter,
  InputFilter,
  DivOrgSales,
  DivOrgPageSell,
  BtnPageSell,
  FormatCPF,
  DivOrgInputFilter,
} from "./ClientResumeStyle";

import { ClipLoader } from "react-spinners";

export default function ClientResume({
  ordersClients,
  disableFilter,
}) {
  const infoClientFinancial = ordersClients;

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showList, setShowList] = useState(false);
  const [filterNameClient, setFilterNameClient] = useState("");
  const [filterCpfClient, setFilterCpfClient] = useState("");
  const [filterInfoClient, setFilterInfoClient] = useState([]);

  const createListOrders = (dataClient) => {
    setLoadingOrders(true);
    setShowList(true);
    if (showList) {
      setFilterInfoClient(dataClient.orders);
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
    if (!infoClientFinancial?.orders) return setFilterInfoClient([]);

    let filtered = infoClientFinancial?.orders;

    if (filterNameClient.length > 0) {
      filtered = filtered.filter((client) =>
        client.nameClient.toLowerCase().includes(filterNameClient.toLowerCase())
      );
    }

    if (filterCpfClient.length > 0) {
      filtered = filtered.filter((client) => {
        return String(client.cpf).startsWith(String(filterCpfClient));
      });
    }

    setFilterInfoClient(filtered);
  }, [infoClientFinancial, filterNameClient, filterCpfClient]);

  useEffect(() => {
    createListOrders(infoClientFinancial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoClientFinancial]);

  return (
    <DivOrgSales>
      <DivFilter show={disableFilter}>
        <DivOrgPageSell>
          <BtnPageSell
            to="resume-sell"
            // state={{ productStock: productStock }}
          >
            Vendas mês
          </BtnPageSell>
        </DivOrgPageSell>
        <DivOrgFilter>
          <DivOrgInputFilter>
            <LabelFilter>Nome</LabelFilter>
            <InputFilter
              value={filterNameClient}
              onChange={(e) => setFilterNameClient(e.target.value)}
            />
          </DivOrgInputFilter>
          <DivOrgInputFilter>
            <LabelFilter>CPF</LabelFilter>
            <FormatCPF
              value={filterCpfClient}
              format="###.###.###-##"
              allowEmptyFormatting
              mask="_"
              onValueChange={(values) => {
                setFilterCpfClient(values.value);
              }}
            />
          </DivOrgInputFilter>
        </DivOrgFilter>
      </DivFilter>
      <DivInfoClient>
        <DivInfoClientTable>
          {loadingOrders ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#FFF"} />
            </DivOrgLoading>
          ) : (
            filterInfoClient.map((infoOrders, index) => {
              return (
                <DivInfoClientCard key={index}>
                  <DivDetailClient>
                    <DivIdClient>
                      <IdSpan>{index + 1}</IdSpan>
                    </DivIdClient>
                    <DivInfoDetailsClient>
                      <NameClient>
                        {parseName(infoOrders.nameClient, infoOrders.lastName)}
                      </NameClient>
                      <DivOrgInfo>
                        <DivOrgValues>
                          <Value>Total Faturado</Value>
                          <PriceBuyed
                            displayType="text"
                            value={infoOrders?.totalBuyed || 0}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues>
                        {/* <DivOrgValues>
                          <Value>Total Recebido</Value>
                          <PriceBuyed
                            displayType="text"
                            value={infoOrders.totalPayed || 0}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues> */}
                        {/* <DivOrgValues>
                          <Value>Total a Receber</Value>
                          <PriceBuyed
                            displayType="text"
                            value={infoOrders.totalReceive || 0}
                            decimalSeparator=","
                            fixedDecimalScale
                            thousandSeparator="."
                            decimalScale={2}
                            prefix={"R$ "}
                          />
                        </DivOrgValues> */}
                        <DivOrgValues>
                          <Value>Total de compras</Value>
                          <InfoValue>{infoOrders.totalOrders || 0}</InfoValue>
                        </DivOrgValues>
                      </DivOrgInfo>
                    </DivInfoDetailsClient>
                  </DivDetailClient>
                  <DivBtn>
                    {/* <BtnDetail>Pagamento</BtnDetail> */}
                    <LinkPage
                      to="resume-clients"
                      state={{ idClient: infoOrders.idClient}}
                    >
                      Pedidos
                    </LinkPage>
                  </DivBtn>
                </DivInfoClientCard>
              );
            })
          )}
        </DivInfoClientTable>
      </DivInfoClient>
    </DivOrgSales>
  );
}
