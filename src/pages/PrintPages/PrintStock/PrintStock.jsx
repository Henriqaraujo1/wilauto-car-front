import { useEffect, useState } from "react";
import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./PrintStock.style";
import TablePrintStock from "../../../components/Tables/PrintsTable/TablePrintStock/TablePrintStock";
import { allStock } from "../../../store/stock/stockNow/stockNow.actions";
import { useDispatch } from "react-redux";

export default function PrintStock() {
  const dispatch = useDispatch();
  const [stockNow, setStockNow] = useState(null);

  const getStockNow = async () => {
    const stock = await dispatch(allStock());
    setStockNow(stock.payload);
  };

  useEffect(() => {
    getStockNow();
  }, []);

  return (
    <DivProductRegister>
      <TitleProduct>Gerar Tabela do Estoque atual</TitleProduct>
      <DivScreenProduct>
        <TablePrintStock stockInfo={stockNow?.productStock} />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
