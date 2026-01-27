import {
  DivProductRegister,
  DivScreenProduct,
  TitleProduct,
} from "./ProductSubItems.style";
import NewSubItem from "../../components/Forms/NewSubItem/NewSubItem";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSubProductByIdProductQuery } from "../../store/registers/subItems/subItems.api";
import SearchSubProduct from "../../components/Search/SearchSubProduct/SearchSubProduct";

export default function ProductSubItems() {
  const [disableFilter, setDisableFilter] = useState(false);
  const [infoAllSubProduct, setInfoAllSubProducts] = useState([]);
  const location = useLocation();
  const [dataProduct] = useState(location.state?.idProduct);

  const { data } = useGetSubProductByIdProductQuery(
    dataProduct?.idProduct,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Atualiza o estado sempre que a API retornar algo novo
  useEffect(() => {
    if (data) {
      setInfoAllSubProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (infoAllSubProduct?.errorStatus === true) {
      setDisableFilter(true);
    } else {
      setDisableFilter(false);
    }
  }, [infoAllSubProduct]);

  return (
    <DivProductRegister>
      <TitleProduct>
        Cadastro de sub items para {dataProduct.nameProduct}
      </TitleProduct>
      <DivScreenProduct>
        <NewSubItem infoProduct={dataProduct} />

        <SearchSubProduct
          subProductByProduct={infoAllSubProduct?.product}
          disableFilter={disableFilter}
        />
      </DivScreenProduct>
    </DivProductRegister>
  );
}
