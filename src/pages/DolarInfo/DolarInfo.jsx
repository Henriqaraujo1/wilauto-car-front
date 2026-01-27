import {
  DivOrgTitle,
  DivOrgDolar,
  DivScreenAccount,
  TitleAccount,
} from "./DolarInfo.style";
import DolarConfig from "../../components/Configs/DolarConfig/DolarConfig";
import { useGetDolarValueQuery } from "../../store/infoCompany/currencyCoin/currencyCoin.api";

export default function DolarInfo() {
  const { data: dolarValue } = useGetDolarValueQuery({
      refetchOnMountOrArgChange: true,
  });

  return (
    <DivOrgDolar>
      <DivOrgTitle>
        <TitleAccount>Cotação do Dólar</TitleAccount>
      </DivOrgTitle>
      <DivScreenAccount>
        <DolarConfig cotationDolar={dolarValue} />
      </DivScreenAccount>
    </DivOrgDolar>
  );
}
