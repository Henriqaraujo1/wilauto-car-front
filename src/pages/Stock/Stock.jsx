import { useEffect, useState } from "react";
import { DivStock, TitleStock } from "./StockStyle";
import TableStock from "../../components/Tables/TableStock/TableStock";
import { useDispatch } from "react-redux";
import { allStock } from "../../store/stock/stockNow/stockNow.actions";

export default function Stock() {
  const dispatch = useDispatch();
  const [stockNow, setStockNow] = useState([]);
  const [disableFilter, setDisableFilter] = useState(false);

  const getStockNow = async () => {
    const stock = await dispatch(allStock());
    setStockNow(stock.payload);
  };

  useEffect(() => {
    getStockNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stockNow.errorStatus) {
      alert(stockNow.message);
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [stockNow]);

  return (
    <DivStock>
      <TitleStock>Estoque</TitleStock>
      <TableStock
        stockNow={stockNow.productStock}
        disableFilter={disableFilter}
      />
    </DivStock>
  );
}
