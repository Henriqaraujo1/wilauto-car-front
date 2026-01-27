import { useEffect, useState } from "react";
import { Close, DeleteForever, Edit } from "@styled-icons/material";
import { ClipLoader } from "react-spinners";
import {
  BtnEdit,
  BtnRemove,
  DivBtnEdit,
  DivBtnSearch,
  DivIdBrand,
  DivBrand,
  DivBrandInfo,
  DivSearch,
  DivSearchBrand,
  DivTableSearch,
  DivInfo,
  TitleSearchBrand,
  NameInput,
  NameLabel,
  SpanCod,
  SpanName,
  DivOrgLoading,
  DivOrgCard,
  CodInput,
  DivBtnFilter,
  BtnCancel,
} from "./SearchBrandStyle";
import UpdateBrand from "../../Update/UpdateBrand/UpdateBrand";
// import InfoBrand from "../Info/InfoBrand/InfoBrand";
import DeleteBrand from "../../DeleteComponent/DeleteBrand/DeleteBrand";

export default function SearchBrand({
  brandsInfo,
  disableFilter,
  isLoading,
  isFetching,
}) {
  const [brandPopUp, setBrandPopUp] = useState(false);
  const [delBrandOption, setDelBrandOption] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();

  const [filterCodBrand, setFilterCodBrand] = useState("");
  const [filterNameBrand, setFilterNameBrand] = useState("");
  const [filterInfoBrand, setFilterInfoBrand] = useState([]);

  const [showList, setShowList] = useState(false);

  const [dataBrandUpdate, setDataBrandUpdate] = useState();

  // ! - usar para formatar dois nomes Ex. (henrique silva)
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
    if (!brandsInfo) return setFilterInfoBrand([]);

    let filtered = brandsInfo;

    const filterCod = Number(filterCodBrand);
    if (filterCodBrand && !isNaN(filterCod)) {
      filtered = filtered.filter((brand) => brand.idBrand === filterCod);
    }

    if (filterNameBrand.length > 0) {
      const name = filterNameBrand.toLowerCase();
      filtered = filtered.filter((brand) =>
        brand.brandName.toLowerCase().includes(name)
      );
    }

    setFilterInfoBrand(filtered);
  }, [brandsInfo, filterCodBrand, filterNameBrand]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      const timer = setTimeout(() => {
        setShowList(true);
      }, 250); // 250ms de delay
      return () => clearTimeout(timer);
    } else {
      setShowList(false);
    }
  }, [isLoading, isFetching]);

  return (
    <DivSearchBrand>
      <DivSearch>
        <TitleSearchBrand>Consulta Categoria de Produto</TitleSearchBrand>
        <DivBtnFilter show={disableFilter}>
          <NameLabel>Nome</NameLabel>
          <NameInput
            value={filterNameBrand}
            onChange={(e) => setFilterNameBrand(e.target.value)}
          />
          <NameLabel>Codigo</NameLabel>
          <CodInput
            value={filterCodBrand}
            onValueChange={(values) => {
              setFilterCodBrand(parseInt(values.value));
            }}
          />
          <DivBtnSearch>
            <BtnCancel
              type="button"
              onClick={() => {
                setFilterCodBrand("");
                setFilterNameBrand("");
                setFilterInfoBrand(brandsInfo);
              }}
            >
              <Close />
            </BtnCancel>
          </DivBtnSearch>
        </DivBtnFilter>
      </DivSearch>
      <DivTableSearch>
        {!showList ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoBrand.map((infoBrand, index) => {
            return (
              <DivBrand key={infoBrand.idBrand}>
                <DivOrgCard>
                  <DivInfo>
                    <DivIdBrand>{index + 1}</DivIdBrand>
                    <DivBrandInfo>
                      <SpanName>{parseName(infoBrand.brandName)}</SpanName>
                      <SpanCod>Codigo: {infoBrand.idBrand}</SpanCod>
                    </DivBrandInfo>
                  </DivInfo>
                  <DivBtnEdit>
                    <BtnEdit
                      onClick={() => {
                        setBrandPopUp(!brandPopUp);
                        setDataBrandUpdate(infoBrand);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    <BtnRemove
                      type="button"
                      onClick={() => {
                        setDelBrandOption(!delBrandOption);
                        setSelectedBrand(infoBrand);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivBtnEdit>
                </DivOrgCard>
                {delBrandOption &&
                  infoBrand.idBrand === selectedBrand.idBrand && (
                    <DeleteBrand
                      selectedBrand={selectedBrand}
                      delBrandOption={delBrandOption}
                      setDelBrandOption={setDelBrandOption}
                    />
                  )}
              </DivBrand>
            );
          })
        )}
        {brandPopUp && (
          <UpdateBrand
            dataBrandUpdate={dataBrandUpdate}
            brandPopUp={brandPopUp}
            setBrandPopUp={setBrandPopUp}
          />
        )}
      </DivTableSearch>
    </DivSearchBrand>
  );
}
