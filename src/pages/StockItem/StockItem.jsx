import { useEffect, useState } from "react";
import {
  DivStockItem,
  TitleStockItem,
  DivScreenStockItem,
} from "./StockItemStyles";
import NewItem from "../../components/Forms/NewItem/NewItem";
import { allProviders } from "../../store/registers/provider/provider.actions";
import { useDispatch } from "react-redux";
import { useGetAllProductQuery } from "../../store/registers/products/product.api";

export default function StockItem() {
  const dispatch = useDispatch();

  const {
    data: productsInfo,
    // isFetching,
    // isLoading,
    // refetch,
  } = useGetAllProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [providersInfo, setProvidersInfo] = useState([]);

  const getListProviders = async () => {
    const listProviders = await dispatch(allProviders());
    setProvidersInfo(listProviders.payload);
  };

  useEffect(() => {
    getListProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInfo]);

  return (
    <DivStockItem>
      <TitleStockItem>Adicionar Item no Estoque</TitleStockItem>
      <DivScreenStockItem>
        <NewItem providersData={providersInfo} productsInfo={productsInfo} />
      </DivScreenStockItem>
    </DivStockItem>
  );
}
