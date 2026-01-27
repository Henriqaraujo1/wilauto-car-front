import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Close,
  DeleteForever,
  Edit,
  Search,
  Visibility,
} from "@styled-icons/material";

import {
  DivSearchExpense,
  TitleExpense,
  FilterLabel,
  FilterInput,
  BtnSearch,
  TableExpense,
  DivExpense,
  IdExpense,
  TypeExpense,
  DivExpenseInfo,
  DivExpenseEdit,
  BtnEdit,
  BtnRemove,
  BtnView,
  DivInfo,
  DivOrgCard,
  DivOrgLoading,
  LabelExpense,
  DivOrgFilter,
  DivOrgId,
  DivOrgExpenseName,
  BtnFilterAnimation,
  DivOrgAnimationFilter,
  InfoFilter,
  BtnCancel,
  DivOrgBtnFilter,
  DivFilter,
  DivOrgInput,
  SelectOption,
  Options,
  DivOrgTitle,
  BtnCloseFilter,
} from "./SearchExpenseStyle";

import { getAllCategory } from "../../../store/registers/category/category.actions";

import UpdateExpense from "../../Update/UpdateExpense/UpdateExpense";
import InfoExpense from "../../Info/InfoExpense/InfoExpense";
import DeleteExpense from "../../DeleteComponent/DeleteExpense/DeleteExpense";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import FormatDatesFront from "../../../utils/formatDateFront.mjs";

export default function SearchExpense(props) {
  const expenseListInfo = props.infoMonth;

  const dispatch = useDispatch();
  const formatDate = new FormatDatesFront();

  // State para categorias
  const [categorysInfo, setCategorysInfo] = useState([]);

  //States para apagar e abrir tela de apagar
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [delExpenseOption, setDelExpenseOption] = useState(false);

  // State para filtros
  const [filterNameExpense, setFilterNameExpense] = useState("");
  const [filterStatusExpense, setFilterStatusExpense] = useState("");
  const [filterCategoryExpense, setFilterCategoryExpense] = useState("");
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateFinish, setFilterDateFinish] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [filterPaymentDate, setFilterPaymentDate] = useState("");
  const [filterInfoExpense, setFilterInfoExpense] = useState([]);

  // State para visualizar mais info
  const [expenseView, setExpenseView] = useState(false);
  const [selectExpenseView, setSelectExpenseView] = useState([]);
  // const [dataExpenseView, setDataExpenseView] = useState([]);

  // State para editar
  const [dataExpenseUpdate, setDataExpenseUpdate] = useState();
  const [expensePopUp, setExpensePopUp] = useState(false);

  // Estado para animação do filtro
  const [showAnimation, setShowAnimation] = useState(true);

  // State para carregamentos
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingExpense, setLoadingExpense] = useState(false);

  const createListExpense = (dataExpense) => {
    setLoading(true);
    setShowList(true);
    if (showList && dataExpense) {
      setFilterInfoExpense(dataExpense);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getListCategorys = async () => {
    const listCategory = await dispatch(getAllCategory());
    setCategorysInfo(listCategory.payload.allCategories || []);
  };

  const parseName = (oneName) => {
    if (oneName) {
      const firstName = oneName || "";

      var fullName = firstName.concat(" ");

      const formatName = fullName.split(" ");
      for (var i = 0; i < formatName.length; i++) {
        formatName[i] =
          formatName[i].charAt(0).toUpperCase() + formatName[i].slice(1);
      }
      let result = formatName?.join(" ");

      return result;
    }
  };

  const filterExpense = () => {
    const filterList = expenseListInfo
      .filter((expense) =>
        filterCategoryExpense
          ? parseName(expense.categoryName) === filterCategoryExpense
          : expense
      )
      .filter((expense) =>
        filterNameExpense
          ? expense.expenseType.includes(
              filterNameExpense.toLocaleLowerCase()
            )
          : expense
      )
      .filter((expense) =>
        filterPayment ? expense.formPayment === filterPayment : expense
      )
      .filter((expense) =>
        filterStatusExpense ? expense.status === filterStatusExpense : expense
      )
      .filter((expense) =>
        filterDateStart
          ? formatDate.compareDatesAfter(
              expense.dateCreated,
              filterDateStart
            ) >= 0
          : expense
      )
      .filter((expense) =>
        filterDateFinish
          ? formatDate.compareDatesAfter(
              expense.dateCreated,
              filterDateFinish
            ) <= 0
          : expense
      )
      .filter((expense) =>
        filterDueDate
          ? formatDate.compareDatesAfter(expense.dueDate, filterDueDate) <= 0
          : expense
      )
      .filter((expense) =>
        filterPaymentDate
          ? formatDate.compareDatesAfter(
              expense.datePayment,
              filterPaymentDate
            ) <= 0
          : expense
      );

    if (filterList) {
      setFilterInfoExpense(filterList);
    }
  };

  const resetInputs = () => {
    setFilterCategoryExpense("");
    setFilterDateFinish("");
    setFilterDateStart("");
    setFilterDueDate("");
    setFilterNameExpense("");
    setFilterPayment("");
    setFilterStatusExpense("");
    setFilterInfoExpense(expenseListInfo);
  };

  useEffect(() => {
    getListCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (expenseListInfo?.length > 0) {
      createListExpense(expenseListInfo);
    } else {
      createListExpense([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseListInfo]);

  useEffect(() => {
    setLoading(true);
    if (loadingExpense) {
      props.setLoadingExpense(true)
    }
    setTimeout(() => {
      setLoading(false)
      setLoadingExpense(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingExpense]);

  return (
    <DivSearchExpense>
      <DivOrgTitle>
        <TitleExpense>Consulta de Despesas</TitleExpense>
        <BtnCloseFilter
          showAnimation={showAnimation}
          type="button"
          onClick={() => setShowAnimation(!showAnimation)}
        >
          <Close />
        </BtnCloseFilter>
      </DivOrgTitle>
      <DivOrgAnimationFilter showAnimation={showAnimation}>
        <InfoFilter>Filtro</InfoFilter>
        <BtnFilterAnimation onClick={() => setShowAnimation(!showAnimation)}>
          <ArrowLeft />
        </BtnFilterAnimation>
      </DivOrgAnimationFilter>
      <DivFilter showAnimation={showAnimation}>
        <DivOrgFilter>
          {/* <DivOrgInputs> */}
          <DivOrgInput>
            <FilterLabel>Tipo de Despesa</FilterLabel>
            <FilterInput
              value={filterNameExpense}
              onChange={(e) => setFilterNameExpense(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Status</FilterLabel>
            <SelectOption
              value={filterStatusExpense}
              onChange={(e) => {
                setFilterStatusExpense(e.target.value);
              }}
            >
              <Options value="">Selecione</Options>
              <Options value="pago">Pago</Options>
              <Options value="nao pago">Não pago</Options>
            </SelectOption>
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Categoria</FilterLabel>
            <SelectOption
              value={filterCategoryExpense}
              onChange={(e) => {
                setFilterCategoryExpense(e.target.value);
              }}
            >
              <Options value="">Selecione</Options>
              {categorysInfo.map((infoCategory, index) => {
                return (
                  <Options
                    key={index}
                    value={parseName(infoCategory.categoryName)}
                  >
                    {parseName(infoCategory.categoryName)}
                  </Options>
                );
              })}
            </SelectOption>
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Forma pagament</FilterLabel>
            <SelectOption
              value={filterPayment}
              onChange={(e) => {
                setFilterPayment(e.target.value);
              }}
            >
              <Options value="">Selecione</Options>
              <Options value="debito">Débito</Options>
              <Options value="credito">Crédito</Options>
              <Options value="pix">PIX</Options>
              <Options value="avista">À vista</Options>
            </SelectOption>
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Data Inicio</FilterLabel>
            <FilterInput
              type="date"
              value={filterDateStart}
              onChange={(e) => setFilterDateStart(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Data Final</FilterLabel>
            <FilterInput
              type="date"
              value={filterDateFinish}
              onChange={(e) => setFilterDateFinish(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Pago ate</FilterLabel>
            <FilterInput
              type="date"
              value={filterPaymentDate}
              onChange={(e) => setFilterPaymentDate(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgInput>
            <FilterLabel>Vencimento ate</FilterLabel>
            <FilterInput
              type="date"
              value={filterDueDate}
              onChange={(e) => setFilterDueDate(e.target.value)}
            />
          </DivOrgInput>
          <DivOrgBtnFilter>
            <BtnSearch
              type="button"
              onClick={filterExpense}
              disabled={props.disableFilter}
            >
              <Search />
            </BtnSearch>
            <BtnCancel
              type="button"
              onClick={resetInputs}
              disabled={props.disableFilter}
            >
              <Close />
            </BtnCancel>
          </DivOrgBtnFilter>
          {/* </DivOrgInputs> */}
        </DivOrgFilter>
      </DivFilter>
      <TableExpense showAnimation={showAnimation}>
        {loading ? (
          <DivOrgLoading>
            <ClipLoader speedMultiplier={3} color={"#FFF"} />
          </DivOrgLoading>
        ) : (
          filterInfoExpense.map((infoExpense, index) => {
            return (
              <DivExpense key={index}>
                <DivOrgCard>
                  <DivOrgId>
                    <IdExpense>{index + 1}</IdExpense>
                  </DivOrgId>
                  <DivInfo>
                    <DivOrgExpenseName>
                      <TypeExpense>
                        {parseName(infoExpense.expenseType)}
                      </TypeExpense>
                    </DivOrgExpenseName>
                    <DivExpenseInfo>
                      <LabelExpense>
                        Valor
                        <br />
                        {infoExpense.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </LabelExpense>
                      <LabelExpense>
                        Destinatario: {infoExpense.destination}
                      </LabelExpense>
                      <LabelExpense>
                        Status: {parseName(infoExpense.status)}
                      </LabelExpense>
                    </DivExpenseInfo>
                  </DivInfo>
                  <DivExpenseEdit>
                    {/* Cria um pop-up para edição */}
                    <BtnEdit
                      onClick={() => {
                        setExpensePopUp(!expensePopUp);
                        setDataExpenseUpdate(infoExpense);
                      }}
                    >
                      <Edit />
                    </BtnEdit>
                    {expensePopUp &&
                      infoExpense.idExpense === dataExpenseUpdate.idExpense && (
                        <UpdateExpense
                          setLoadingExpense={setLoadingExpense}
                          dataExpenseUpdate={dataExpenseUpdate}
                          expensePopUp={expensePopUp}
                          setExpensePopUp={setExpensePopUp}
                        />
                      )}
                    <BtnView
                      onClick={() => {
                        setExpenseView(!expenseView);
                        setSelectExpenseView(infoExpense);
                      }}
                    >
                      <Visibility />
                    </BtnView>
                    <BtnRemove
                      onClick={() => {
                        setDelExpenseOption(!delExpenseOption);
                        setSelectedExpense(infoExpense);
                      }}
                    >
                      <DeleteForever />
                    </BtnRemove>
                  </DivExpenseEdit>
                </DivOrgCard>
                {expenseView &&
                  infoExpense.idExpense === selectExpenseView.idExpense && (
                    <InfoExpense
                      selectExpenseView={selectExpenseView}
                      expenseView={expenseView}
                      setExpenseView={setExpenseView}
                    />
                  )}
                {delExpenseOption &&
                  infoExpense.idExpense === selectedExpense.idExpense && (
                    <DeleteExpense
                      setLoadingExpense={setLoadingExpense}
                      selectedExpense={selectedExpense}
                      delExpenseOption={delExpenseOption}
                      setDelExpenseOption={setDelExpenseOption}
                    />
                  )}
              </DivExpense>
            );
          })
        )}
      </TableExpense>
    </DivSearchExpense>
  );
}
