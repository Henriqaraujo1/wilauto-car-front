import React, { useEffect, useState } from "react";
import { Title } from "../Status/StatusSell/StatusSellStyle";
import {
  DivCloseOrder,
  DivLocal,
  FormFinal,
  DivTotal,
  DivOrder,
  TitleOrder,
  PriceOrder,
  Line,
  DivOrgOrder,
  DivOptions,
  DivOrgSelect,
  SelectOptionsToPay,
  SelectDescont,
  ChangeInput,
  DivInputChange,
  ChangeLabel,
  BtnFinish,
  OptionsPay,
  TitleLocal,
  DivBtnDelivery,
  BtnDelivery,
  BtnGetOrder,
  DivOrgClientInfo,
  DivOrgStreet,
  InfoStreet,
  DivOrgDistrict,
  InfoDistrict,
  DivOrgComplement,
  InfoComplement,
  DivOrgNotDelivery,
  InfoNotDelivery,
  ValuePay,
  DivOrgValuePay,
  DivOrgChangeValue,
  DivFormDelivery,
  DivOrgLocal,
  ButtonNewLocal,
  DivOrgInputs,
  NewStreet,
  NewLocalNumber,
  NewComplement,
  NewDistrict,
  NewCity,
  DivOrgNewStreet,
  DivOrgNewComplement,
  DivOrgNewDistrict,
  SelectOptionNewState,
  Options,
  BtnAddLocal,
  CloseNewLocal,
  DivBtnLocal,
  DivOrgBtnNewLocal,
  DivOrgBtnClose,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
  DivBtnDistrict,
  BtnCreateDistrict,
  DivOrgNewDelivery,
  DivOrgInput,
  TitleNewDelivery,
  ValueDelivery,
  LabelDelivery,
  DivOrgValue,
  LoadingInfo,
  SelectOption,
  DivAlerts,
  TitleAlert,
  Alerts,
  BtnBudget,
  DivOrgBtnOrder,
} from "./CloseOrderStyle";

import { useForm } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { checkoutOrder } from "../../store/commercial/finishOrder.actions";
import { useDispatch } from "react-redux";
import { Close, Add } from "@styled-icons/material";
import FinishOrderAnimation from "../Animations/FinishOrderAnimation";
import {
  createDelivery,
  getNameDelivery,
} from "../../store/registers/delivery/delivery.actions";
import { ClipLoader } from "react-spinners";
import { allEmployees } from "../../store/registers/employee/employee.actions";
import PrintBudget from "../PrintBudget/PrintBudget";
import { createBudgetOrder } from "../../store/budget/budget.actions";
import { getClientCEP } from "../../store/registers/clients/clients.actions";
import { useDebounce } from "use-debounce";

export default function CloseOrder(props) {
  const dispatch = useDispatch();
  const [infoClientLocal, setInfoClientLocal] = useState(
    props.infoOrder.infoClient
  );

  const [showChange, setShowChange] = useState("");
  const [showDescont, setShowDescont] = useState("");
  const [showDelivery, setShowDelivery] = useState(true);
  const [showFormDelivery, setShowFormDelivery] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [statusOrder, setStatusOrder] = useState(null);

  const [infoDeliveryValue, setInfoDeliveryValue] = useState();
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [valueDelivery, setValueDelivery] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [valueToDelivery, setValueToDelivery] = useState(0);

  const [clientPayed, setClientPayed] = useState(0);
  const [infoEmployee, setInfoEmployee] = useState([]);
  const [optionsEmployee, setOptionsEmployee] = useState();
  const [employee, setEmployee] = useState([]);
  const [employeeOff, setEmployeeOff] = useState(false);
  const [isClearable] = useState(true);

  const [infoFinishOrder, setInfoFinishOrder] = useState({});
  const [infoFinishBudget, setInfoFinishBudget] = useState({});
  const [closeBtn, setCloseBtn] = useState(false);
  const [trueAnimation, setTrueAnimation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const [showBudget, setShowBudget] = useState(false);
  const [trueBudget, setTrueBudget] = useState(false);

  const [infoAddres, setInfoAddress] = useState(null);
  const [cepClient, setCepClient] = useState(null);
  const [cepSearch] = useDebounce(cepClient, 500);

  const [registerLocal, setRegisterLocal] = useState({
    nameClient: infoClientLocal?.nameClient || "Cliente Não registrado",
    idClient: infoClientLocal?.idClient,
    street: infoClientLocal?.street || "",
    localNumber: infoClientLocal?.localNumber || "",
    complement: infoClientLocal?.complement || "",
    district: infoClientLocal?.district || "",
    city: infoClientLocal?.city || "",
    state: infoClientLocal?.state || "",
    cep: cepClient,
  });

  const [valueDiscount, setValueDiscount] = useState({});
  const [valuePayed, setValuePayed] = useState({});
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      valueDiscount: 0,
      valueDelivery: 0,
      valueClientPayed: 0,
      valueWithDiscount: 0,
      valueNoDiscount: 0,
      valueChange: 0,
      percentDiscount: 0,
    },
  });

  const infoProducts = props.listOrder;
  const infoOrder = props.infoOrder;

  const getEmployee = async () => {
    const allEmployeesInfo = await dispatch(allEmployees());

    setInfoEmployee(allEmployeesInfo.payload.employee);
  };

  const handleChangeValue = (event) => {
    const getSelected = event.target.value;
    setShowChange(getSelected);
  };
  const handleChangeDescont = (event) => {
    const getDescont = event.target.value;
    setShowDescont(getDescont);
  };
  const handleChangeDelivery = () => {
    setShowDelivery(true);
    getValueDelivery(
      registerLocal?.district.toLowerCase(),
      registerLocal?.city.toLowerCase()
    );
  };
  const handleChangeNotDelivery = () => {
    setShowDelivery(false);
    setValueToDelivery(0);
  };

  const getCepClientInfo = async (cepInfo) => {
    const infoClient = await dispatch(getClientCEP(cepInfo));

    setInfoAddress(infoClient.payload);
  };

  const checkLocal = () => {
    if (Object.keys(infoClientLocal).length === 1) {
      setShowFormDelivery(!showFormDelivery);
    }
  };

  const registerNewLocal = () => {
    setInfoClientLocal(registerLocal);
  };

  const getValueDelivery = async (districtName, cityName) => {
    setLoadingDelivery(true);
    const infoDistrict = {
      districtName,
      cityName,
    };
    const infoDelivery = await dispatch(getNameDelivery(infoDistrict));

    setInfoDeliveryValue(infoDelivery.payload);
    setValueToDelivery(
      infoDelivery.payload.districtDelivery?.valueDelivery || 0
    );
    setTimeout(() => {
      setLoadingDelivery(false);
    }, 1000);
  };

  const createNewDelivery = async () => {
    const dataDelivery = {
      districtName: registerLocal.district.toLowerCase(),
      cityName: registerLocal.city.toLowerCase(),
      valueDelivery: valueDelivery,
    };

    const newDelivery = await dispatch(createDelivery(dataDelivery));
    setInfoDeliveryValue(newDelivery.payload);
  };

  // ! -Receber os valores do pedido */

  let discount = Number(valueDiscount);
  let priceOrder = infoOrder.valueOrder + valueToDelivery;

  useEffect(() => {
    setClientPayed(Number(valuePayed));
  }, [valuePayed]);

  const finishOrder = async (dataOrder) => {
    if (registerLocal.length > 0) {
      dataOrder.infoClient = registerLocal;
    } else {
      dataOrder.infoClient = registerLocal;
    }
    if (valueToDelivery > 0) {
      dataOrder.valueDelivery = valueToDelivery;
    } else {
      dataOrder.valueDelivery = 0;
    }
    dataOrder.itensOrder = infoProducts;
    dataOrder.idOrder = infoOrder.numberOrder;
    dataOrder.valueClientPayed = clientPayed;
    dataOrder.qtdItens = infoOrder.qtdItens;
    dataOrder.sizeItens = infoOrder.sizeItens;

    dataOrder.idOrder = infoOrder.numberOrder;
    dataOrder.idEmployee = employee.value;
    dataOrder.percentComission = employee.percentComission;
    if (dataOrder.idEmployee === undefined) {
      setEmployeeOff(true);
    } else {
      setEmployeeOff(false);
    }

    console.log(dataOrder);

    if (statusOrder === "pedido") {
      const newOrder = await dispatch(checkoutOrder(dataOrder));

      console.log(newOrder.payload);
      setInfoFinishOrder(newOrder.payload);
    } else {
      delete dataOrder.idOrder;
      const newBudget = await dispatch(createBudgetOrder(dataOrder));

      setInfoFinishBudget(newBudget.payload);
    }
  };

  const sendEmployee = (employee) => {
    console.log(employee);
    setEmployee(employee);
    setEmployeeOff(false);
  };

  useEffect(() => {
    if (infoFinishOrder.codeStatus === 200) {
      // ! - Chama a animação de finalizar o pedido
      setShowAnimation(!showAnimation);
      setTrueAnimation(!trueAnimation);
    }

    if (infoFinishBudget.codeStatus === 200) {
      setShowBudget(!showBudget);
      setTrueBudget(!trueBudget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoFinishOrder.codeStatus, infoFinishBudget.codeStatus]);

  useEffect(() => {
    let totalOrder;
    if (discount > 0) {
      const valueDiscount = discount;
      totalOrder = priceOrder - discount;
      var percentDiscount = ((priceOrder - discount) / priceOrder) * 100;

      setValue("percentDiscount", Number(percentDiscount.toFixed(2)));
      setValue("valueWithDiscount", Number(totalOrder.toFixed(2)));
      setValue("valueDiscount", Number(valueDiscount));
      setValue("valueNoDiscount", Number(priceOrder.toFixed(2)));
    } else {
      totalOrder = priceOrder;
      setValue("percentDiscount", 0);
      setValue("valueWithDiscount", Number(totalOrder.toFixed(2)));
      setValue("valueNoDiscount", Number(priceOrder.toFixed(2)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount, priceOrder]);

  let moneySelect = showChange;

  useEffect(() => {
    let totalChange;
    if (moneySelect === "dinheiro" && clientPayed > 0 && valuePayed > 0) {
      let valueWithDiscount = watch("valueWithDiscount");
      totalChange = clientPayed - valueWithDiscount;

      setValue("valueChange", Number(totalChange.toFixed(2)));
      setValue("valueNoDiscount", Number(priceOrder.toFixed(2)));
    } else {
      let valueFinal = watch("valueWithDiscount");
      setValue("valueChange", 0);
      setClientPayed(Number(valueFinal.toFixed(2)));
      setValue("valueNoDiscount", Number(priceOrder.toFixed(2)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moneySelect, clientPayed]);

  useEffect(() => {
    if (showDescont.length === 0 || showDescont === "nao") {
      setValue("valueDiscount", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDescont, setValue, clientPayed]);

  useEffect(() => {
    checkLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (registerLocal?.district?.length > 0) {
      getValueDelivery(
        registerLocal?.district.toLowerCase(),
        registerLocal?.city.toLowerCase()
      );
    } else {
      setValueDelivery(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerLocal.district, registerLocal.city]);

  useEffect(() => {
    if (valueDelivery < 0 || valueDelivery === undefined) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [valueDelivery]);

  useEffect(() => {
    getEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (infoEmployee.length > 0) {
      const listEmployee = infoEmployee.map((employee) => ({
        value: employee.idEmployee,
        label: employee.firstName + " " + employee.lastName,
        percentComission: employee.percentSell,
      }));
      setOptionsEmployee(listEmployee);
    }
  }, [infoEmployee]);

  useEffect(() => {
    if (cepSearch?.length > 0) {
      getCepClientInfo(cepSearch);
    } else {
      setInfoAddress(null);
    }
  }, [cepSearch]);

  useEffect(() => {
    if (infoAddres) {
      setValue("street", infoAddres.logradouro || "");
      setValue("district", infoAddres.bairro || "");
      setValue("city", infoAddres.localidade || "");
      setValue("state", infoAddres.uf || "");

      setRegisterLocal((prev) => ({
        ...prev,
        street: infoAddres.logradouro || "",
        district: infoAddres.bairro || "",
        city: infoAddres.localidade || "",
        state: infoAddres.uf || "",
        cep: cepClient,
      }));
    }
  }, [infoAddres]);

  return (
    <DivCloseOrder>
      <Title>
        Finalizar Pedido de <br /> {registerLocal?.nameClient}
      </Title>
      <FormFinal onSubmit={handleSubmit(finishOrder)}>
        <DivLocal>
          <TitleLocal>Endereço</TitleLocal>
          <DivBtnDelivery>
            <BtnDelivery type="button" onClick={() => handleChangeDelivery()}>
              Entregar
            </BtnDelivery>
            <BtnGetOrder
              type="button"
              onClick={() => handleChangeNotDelivery()}
            >
              Retirar
            </BtnGetOrder>
          </DivBtnDelivery>
          {showDelivery ? (
            <DivOrgClientInfo>
              <DivOrgLocal showDiv={showDiv}>
                <DivOrgStreet>
                  <InfoStreet>Rua: {registerLocal.street}</InfoStreet>
                  <InfoStreet> Nº {registerLocal.localNumber}</InfoStreet>
                </DivOrgStreet>
                <DivOrgComplement>
                  <InfoComplement>
                    Complemento: {registerLocal.complement}
                  </InfoComplement>
                </DivOrgComplement>
                <DivOrgDistrict>
                  <InfoDistrict>Bairro: {registerLocal.district}</InfoDistrict>
                  <InfoDistrict>
                    Cidade: {registerLocal.city}/{registerLocal.state}
                  </InfoDistrict>
                </DivOrgDistrict>
              </DivOrgLocal>
              <DivFormDelivery showDiv={showDiv}>
                <DivBtnLocal showDiv={showDiv}>
                  <DivOrgBtnNewLocal>
                    <ButtonNewLocal
                      type="button"
                      closeBtn={closeBtn}
                      onClick={() => {
                        setShowDiv(!showDiv);
                        setCloseBtn(!closeBtn);
                      }}
                    >
                      Alterar Endereço
                    </ButtonNewLocal>
                  </DivOrgBtnNewLocal>
                  <DivOrgBtnClose>
                    <CloseNewLocal
                      showDiv={showDiv}
                      onClick={() => {
                        setShowDiv(!showDiv);
                        setCloseBtn(!closeBtn);
                      }}
                    >
                      <Close />
                    </CloseNewLocal>
                  </DivOrgBtnClose>
                </DivBtnLocal>
                <DivOrgInputs showDiv={showDiv}>
                  <DivOrgNewStreet>
                    <PatternFormat
                      placeholder="CEP"
                      value={cepClient}
                      customInput={NewCity}
                      format="#####-###"
                      onValueChange={(values) => {
                        setCepClient(values.value);
                      }}
                    />
                    <NewStreet
                      placeholder="Rua"
                      value={registerLocal.street}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          street: e.target.value,
                        })
                      }
                    />
                    <NewLocalNumber
                      placeholder="Nº"
                      value={registerLocal.localNumber}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          localNumber: e.target.value,
                        })
                      }
                    />
                  </DivOrgNewStreet>
                  <DivOrgNewComplement>
                    <NewComplement
                      placeholder="Complemento"
                      value={registerLocal.complement}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          complement: e.target.value,
                        })
                      }
                    />
                  </DivOrgNewComplement>
                  <DivOrgNewDistrict>
                    <NewDistrict
                      placeholder="Bairro"
                      value={registerLocal.district}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          district: e.target.value,
                        })
                      }
                    />
                    <NewCity
                      placeholder="Cidade"
                      value={registerLocal.city}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          city: e.target.value,
                        })
                      }
                    />
                    <SelectOptionNewState
                      value={registerLocal.state}
                      onChange={(e) =>
                        setRegisterLocal({
                          ...registerLocal,
                          state: e.target.value,
                        })
                      }
                    >
                      <Options value="">Selecione</Options>
                      <Options value="AC">AC</Options>
                      <Options value="AL">AL</Options>
                      <Options value="AP">AP</Options>
                      <Options value="AM">AM</Options>
                      <Options value="BA">BA</Options>
                      <Options value="CE">CE</Options>
                      <Options value="DF">DF</Options>
                      <Options value="ES">ES</Options>
                      <Options value="GO">GO</Options>
                      <Options value="MA">MA</Options>
                      <Options value="MT">MT</Options>
                      <Options value="MS">MS</Options>
                      <Options value="MG">MG</Options>
                      <Options value="PA">PA</Options>
                      <Options value="PB">PB</Options>
                      <Options value="PR">PR</Options>
                      <Options value="PE">PE</Options>
                      <Options value="PI">PI</Options>
                      <Options value="RJ">RJ</Options>
                      <Options value="RN">RN</Options>
                      <Options value="RS">RS</Options>
                      <Options value="RO">RO</Options>
                      <Options value="RR">RR</Options>
                      <Options value="SC">SC</Options>
                      <Options value="SP">SP</Options>
                      <Options value="SE">SE</Options>
                      <Options value="TO">TO</Options>
                    </SelectOptionNewState>
                    <BtnAddLocal
                      type="button"
                      onClick={() => {
                        registerNewLocal();
                        setShowDiv(!showDiv);
                        setCloseBtn(!closeBtn);
                      }}
                    >
                      Adicionar
                    </BtnAddLocal>
                  </DivOrgNewDistrict>
                </DivOrgInputs>
              </DivFormDelivery>
            </DivOrgClientInfo>
          ) : (
            <DivOrgNotDelivery>
              <InfoNotDelivery>Cliente irá retirar na loja.</InfoNotDelivery>
            </DivOrgNotDelivery>
          )}
          {loadingDelivery ? (
            <DivOrgLoading>
              <ClipLoader speedMultiplier={3} color={"#000"} />
              <LoadingInfo>Calculando Valor da Entrega</LoadingInfo>
            </DivOrgLoading>
          ) : (
            infoDeliveryValue?.codeStatus === 404 && (
              <DivOrgResults>
                <InfoResult>{infoDeliveryValue?.message}</InfoResult>
                <DivOrgNewDelivery>
                  <TitleNewDelivery>Adicionar Bairro</TitleNewDelivery>
                  <DivOrgInput>
                    <DivOrgValue>
                      <LabelDelivery>Valor da Entrega</LabelDelivery>
                      <ValueDelivery
                        placeholder="R$"
                        maxLength={16}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={"R$"}
                        onValueChange={(values) => {
                          setValueDelivery(Number(values.value).toFixed(2));
                        }}
                      />
                    </DivOrgValue>
                    <DivBtnDistrict>
                      <BtnCreateDistrict
                        type="button"
                        disabled={disableButton}
                        onClick={() => {
                          createNewDelivery();
                        }}
                      >
                        <Add />
                      </BtnCreateDistrict>
                    </DivBtnDistrict>
                  </DivOrgInput>
                </DivOrgNewDelivery>
              </DivOrgResults>
            )
          )}
        </DivLocal>
        <DivTotal>
          <Title>Resumo</Title>
          <DivOrder>
            <DivOrgOrder>
              <TitleOrder>Vendedor</TitleOrder>
              <SelectOption
                name="employee"
                placeholder="Selecione"
                options={optionsEmployee}
                isClearable={isClearable}
                onChange={sendEmployee}
              />
            </DivOrgOrder>
            {employeeOff && (
              <DivAlerts>
                <TitleAlert>AVISO !!</TitleAlert>
                <Alerts>
                  Necessario associar um vendedor ou funcionario a venda !!
                </Alerts>
              </DivAlerts>
            )}

            <DivOrgOrder>
              {/* Altera o valor da entrega apos encontrar o local */}
              <TitleOrder>Entrega</TitleOrder>
              <NumericFormat
                customInput={PriceOrder}
                displayType="text"
                value={valueToDelivery || 0}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgOrder>
            <DivOrgOrder>
              {/* Valor total do pedido sem a entrega */}
              <TitleOrder>Pedido</TitleOrder>
              <NumericFormat
                customInput={PriceOrder}
                displayType="text"
                value={infoOrder.valueOrder}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
              {/* <PriceOrder>R$ {watch("valueOrder") || 0}</PriceOrder> */}
            </DivOrgOrder>
            <DivOrgOrder>
              {/* Soma do valor da entrega com total do pedido */}
              <TitleOrder>Quantidade (Itens)</TitleOrder>
              <TitleOrder>{infoOrder.sizeItens}</TitleOrder>
            </DivOrgOrder>
            <DivOrgSelect>
              <TitleOrder>Desconto ?</TitleOrder>
              <SelectDescont
                {...register("discountOption", {
                  required: true,
                })}
                onChange={(e) => handleChangeDescont(e)}
              >
                <OptionsPay value="">Selecione</OptionsPay>
                <OptionsPay value="sim">Sim</OptionsPay>
                <OptionsPay value="nao">Não</OptionsPay>
              </SelectDescont>
            </DivOrgSelect>
            {showDescont === "sim" && (
              <DivOrgOrder>
                <TitleOrder>Desconto</TitleOrder>
                <NumericFormat
                  customInput={ChangeInput}
                  decimalSeparator=","
                  thousandSeparator="."
                  fixedDecimalScale
                  decimalScale={2}
                  prefix={"R$ "}
                  onValueChange={(values) => {
                    setValueDiscount(values.value);
                    setValue("valueDiscount", parseInt(values.value));
                  }}
                />
              </DivOrgOrder>
            )}
            <Line />
            <DivOrgOrder>
              {/* Soma do valor da entrega com total do pedido */}
              <TitleOrder>Total</TitleOrder>
              <NumericFormat
                customInput={PriceOrder}
                displayType="text"
                value={watch("valueWithDiscount")}
                decimalSeparator=","
                thousandSeparator="."
                fixedDecimalScale
                decimalScale={2}
                prefix={"R$ "}
              />
            </DivOrgOrder>

            <DivOrgOrder>
              <TitleOrder>Forma de Pagamento</TitleOrder>
              <DivOptions>
                {/* Opções para pagamento */}
                <SelectOptionsToPay
                  {...register("formPayment", {
                    required: true,
                  })}
                  onChange={(e) => handleChangeValue(e)}
                >
                  <OptionsPay value="">Selecione</OptionsPay>
                  <OptionsPay value="dinheiro">Dinheiro</OptionsPay>
                  <OptionsPay value="boleto">Boleto</OptionsPay>
                  <OptionsPay value="debito">Debito</OptionsPay>
                  <OptionsPay value="credito">Credito</OptionsPay>
                  <OptionsPay value="pix">Pix</OptionsPay>
                </SelectOptionsToPay>
              </DivOptions>
            </DivOrgOrder>
            {showChange === "dinheiro" && (
              <DivInputChange>
                <DivOrgValuePay>
                  <ChangeLabel>Valor Pago</ChangeLabel>
                  <NumericFormat
                    maxLength={16}
                    customInput={ValuePay}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$"}
                    onValueChange={(values) => {
                      setValuePayed(values.value);
                    }}
                  />
                </DivOrgValuePay>
                <DivOrgChangeValue>
                  {/* Subtrai o valor em caso de pagamento em dinheiro */}
                  <TitleOrder>Troco</TitleOrder>
                  <NumericFormat
                    customInput={PriceOrder}
                    displayType="text"
                    value={watch("valueChange")}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    decimalScale={2}
                    prefix={"R$ "}
                  />
                </DivOrgChangeValue>
              </DivInputChange>
            )}
            <DivOrgBtnOrder>
              <BtnFinish
                type="submit"
                disabled={employeeOff}
                onClick={() => setStatusOrder("pedido")}
              >
                Finalizar Pedido
              </BtnFinish>
              <BtnBudget
                type="submit"
                onClick={() => setStatusOrder("orçamento")}
              >
                Orçamento
              </BtnBudget>
            </DivOrgBtnOrder>
            <FinishOrderAnimation
              infoClientLocal={infoClientLocal}
              showAnimation={showAnimation}
              setShowAnimation={setShowAnimation}
              trueAnimation={trueAnimation}
              setTrueAnimation={setTrueAnimation}
              infoFinishOrder={infoFinishOrder}
              employee={employee}
            />
            <PrintBudget
              infoClientLocal={infoClientLocal}
              infoFinishBudget={infoFinishBudget}
              setTrueBudget={setTrueBudget}
              trueBudget={trueBudget}
              employee={employee}
              setShowBudget={setShowBudget}
              showBudget={showBudget}
            />
          </DivOrder>
        </DivTotal>
      </FormFinal>
    </DivCloseOrder>
  );
}
