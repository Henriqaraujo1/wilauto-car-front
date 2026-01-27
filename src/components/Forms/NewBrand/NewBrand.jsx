import { useEffect, useState } from "react";
import {
  FormBrand,
  DivOrgBrand,
  LabelBrand,
  InputBrand,
  SubmitBrand,
  TitleNewBrand,
  DivBtnBrand,
  BtnRemoveBrand,
  DivOrgResults,
  InfoResult,
  DivOrgLoading,
} from "./NewBrandStyle";
import { DivNewBrand } from "./NewBrandStyle";
import { useForm } from "react-hook-form";
import {
  useCreateBrandMutation,
  useLazyGetBrandQuery,
} from "../../../store/registers/brand/brand.api";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";

export default function NewBrand() {
  const [brandInfo, setBrandInfo] = useState([]);
  const [brandCreated, setBrandCreated] = useState([]);
  const [nameBrand, setNameBrand] = useState();
  const [loadingBrand, setLoadingBrand] = useState();
  const [buttonHide, setButtonHide] = useState(false);
  const [nameBrandSearch] = useDebounce(nameBrand, 500);
  const [loadingNewBrand, setLoadingNewBrand] = useState(false);
  const [loadingListBrand, setLoadingListBrand] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  // * Create Brand
  // * CreateUser RTX
  const [
    createBrand,
    { isLoading: brandLoading, isError: brandIsError, error: brandError },
  ] = useCreateBrandMutation();

  // * GetBrandIfno
  const [getBrandInfo] = useLazyGetBrandQuery();

  //Buscar marca antes de cadastrar
  const getBrand = async (dataBrand) => {
    setLoadingBrand(true);
    const nameBrandInfo = await getBrandInfo(dataBrand.toLowerCase());
    setBrandInfo(nameBrandInfo.data || nameBrandInfo.error.data);
    setTimeout(setLoadingBrand(false), 1000);
  };
  // Cadastrar Categoria de Produto
  const newBrand = async (dataBrand) => {
    setLoadingNewBrand(true);
    const brand = { brandName: dataBrand.brandName.toLowerCase() };
    const brandCreate = await createBrand(brand);
    setBrandCreated(brandCreate.data || brandCreate.error.data);
    setTimeout(setLoadingNewBrand(false), 150);
    setTimeout(setLoadingListBrand(true), 1500);
  };

  useEffect(() => {
    if (nameBrandSearch?.length === 0) {
      setBrandInfo(nameBrandSearch);
    } else if (nameBrandSearch) {
      getBrand(nameBrandSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameBrandSearch]);

  useEffect(() => {
    if (brandInfo.successStatus) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandInfo.successStatus]);


  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(reset(), 1000);
      setTimeout(() => {
        setBrandInfo([]);
        setBrandInfo([]);
        setBrandCreated([]);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, formState]);

  return (
    <DivNewBrand>
      <TitleNewBrand>Cadastrar Categoria de Produto</TitleNewBrand>
      <FormBrand onSubmit={handleSubmit(newBrand)}>
        <DivOrgBrand>
          <LabelBrand>Nome</LabelBrand>
          <InputBrand
            maxLength={30}
            {...register("brandName", {
              onChange: (e) => {
                setNameBrand(e.target.value);
              },
            })}
          />
        </DivOrgBrand>
        {loadingBrand ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          brandInfo.successStatus && (
            <DivOrgResults>
              <InfoResult>{brandInfo.message}</InfoResult>
            </DivOrgResults>
          )
        )}
        <DivBtnBrand>
          <BtnRemoveBrand type="reset">Cancelar</BtnRemoveBrand>
          <SubmitBrand type="submit" disabled={buttonHide}>
            Cadastrar
          </SubmitBrand>
        </DivBtnBrand>
      </FormBrand>
      {loadingNewBrand ? (
        <DivOrgLoading>
          <ClipLoader speedMultiplier={3} />
        </DivOrgLoading>
      ) : (
        (brandCreated.errorStatus && (
          <DivOrgResults>
            <InfoResult>{brandCreated.message}</InfoResult>
          </DivOrgResults>
        )) ||
        (brandCreated.successStatus && (
          <DivOrgResults>
            <InfoResult>{brandCreated.message}</InfoResult>
          </DivOrgResults>
        ))
      )}
    </DivNewBrand>
  );
}
