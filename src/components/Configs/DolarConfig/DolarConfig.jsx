import {
  DivOrgInfo,
  InfoLabel,
  InputDolar,
  DivScreenDolar,
  BtnDolarConfirm,
  DivOrgBtn,
  DivOrgLoading,
  DivOrgResults,
  InfoResult,
  DivOrgInfoDolar,
  InfoDolarDay,
} from "./DolarConfig.style";
import {
  useCreateDolarMutation,
  useGetDolarValueQuery,
} from "../../../store/infoCompany/currencyCoin/currencyCoin.api";
import { useEffect, useState } from "react";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";
import { ClipLoader } from "react-spinners";

export default function DolarConfig({ cotationDolar }) {
  const dataInfo = new FormatDatesFront();
  const today = dataInfo.getDateWithHour();
  const [dolar, setDolar] = useState(null);
  const [dolarDay, setDolarDay] = useState(null);
  const [infoDolar, setInfoDolar] = useState([]);
  const [createNewDolar] = useCreateDolarMutation();
  const [loadingDolar, setLoadingDolar] = useState(false);

  const newDolar = async () => {
    setLoadingDolar(true);
    if (dolar <= 0) {
      alert("Por favor insira o valor do dolar");
    } else {
      let dolarCotation = {
        valueDolar: dolar,
      };

      const dolarInfo = await createNewDolar(dolarCotation);
      setInfoDolar(dolarInfo.data || dolarInfo.error.data);
      setTimeout(() => {
        setLoadingDolar(false);
        // setInfoDolar(null)
      }, 500);
    }
  };

  const checkDolarDay = () => {
    const dolarValue = cotationDolar
    if (dolarValue) {
      const testeDate = dataInfo.compareDatesDolar(
        dolarValue?.dolar?.dateCotation,
        today
      );
      if (testeDate === 0) {
        setDolarDay(dolarValue);
      }
    }
  };

  useEffect(() => {
    checkDolarDay();
  }, [cotationDolar]);

  return (
    <DivScreenDolar>
      <DivOrgInfo>
        {dolarDay?.codeStatus === 200 && (
          <DivOrgInfoDolar>
            <InfoDolarDay>
              Já exite uma cotação do dia de hoje, mas pode ser alterada se
              necessário
            </InfoDolarDay>
          </DivOrgInfoDolar>
        )}
        <InfoLabel>Valor do Dólar Hoje</InfoLabel>
        <InputDolar
          placeholder="R$"
          value={dolarDay?.dolar.valueDolar || 0}
          mask="_"
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          decimalScale={2}
          prefix={"R$"}
          onValueChange={(values, sourceInfo) => {
            setDolar(Number(values.value));
          }}
        />
      </DivOrgInfo>
      <DivOrgBtn>
        <BtnDolarConfirm type="button" onClick={newDolar}>
          Salvar
        </BtnDolarConfirm>
      </DivOrgBtn>
      {loadingDolar ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (infoDolar.errorStatus && (
          <DivOrgResults>
            <InfoResult>{infoDolar.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (infoDolar.successStatus && (
          <DivOrgResults>
            <InfoResult>{infoDolar.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivScreenDolar>
  );
}
